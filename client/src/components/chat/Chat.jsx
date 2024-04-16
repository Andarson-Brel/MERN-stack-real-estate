import "./chat.scss";
import Excerpt from "../excerpt/Excerpt";
import { useContext, useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import { fetchChats } from "../../lib/apiContext";
import { useNotificationStore } from "../../lib/notificationStore";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest";
import { format } from "timeago.js";
import { SocketContext } from "../../context/SocketContext";
import Loader from "../loader/loader";
import { useSearchParams } from "react-router-dom";

function Chat() {
  const [chat, setChat] = useState(null);
  const [isFocused, setIsFocused] = useState(false);
  const [chatCreated, setChatCreated] = useState(false);
  const [messageText, setMessageText] = useState("");

  const [searchParams, setSearchPrams] = useSearchParams();
  const receiverId = searchParams.get("receiverId");
  const productType = searchParams.get("type");
  const productTitle = searchParams.get("productTitle");

  const messageEndRef = useRef();
  const decrease = useNotificationStore((state) => state.decrease);
  const { currentUser } = useContext(AuthContext);
  const { data: chats, isLoading } = useQuery({
    queryFn: () => fetchChats(),
  });
  const { socket } = useContext(SocketContext);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  const handleOpenChat = async (id, receiver) => {
    try {
      const res = await apiRequest.get(`/chats/${id}`);
      if (!res.data.seenBy.includes(currentUser.id)) {
        decrease();
      }
      if (res.status === 200) {
        // console.log(res.data);
        setChat({ ...res.data, receiver });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const text = formData.get("text");
    if (!text) return;
    try {
      const res = await apiRequest.post(`/messages/${chat.id}`, { text });
      if (res.status === 200) {
        setChat((prev) => ({
          ...prev,
          messages: [...prev.messages, res.data],
        }));
        e.target.reset();
        socket.emit("sendMessage", {
          receiverId: chat.receiver.id,
          data: res.data,
        });
      }
      // console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const read = async () => {
      try {
        await apiRequest.put("/chats/read/" + chat.id);
      } catch (err) {
        console.log(err);
      }
    };

    if (chat && socket) {
      socket.on("getMessage", (data) => {
        if (chat.id === data.chatId) {
          setChat((prev) => ({ ...prev, messages: [...prev.messages, data] }));
          read();
        }
      });
    }
    return () => {
      socket?.off("getMessage");
    };
  }, [socket, chat]);

  useEffect(() => {
    const openChatForReceiver = async () => {
      if (receiverId && chats && !chatCreated) {
        setChatCreated(true);
        const targetChat = chats.find(
          (chat) => chat.receiver.id === receiverId
        );
        if (targetChat) {
          // Chat found, open it
          handleOpenChat(targetChat.id, targetChat.receiver);
          if (productType && productTitle) {
            setIsFocused(true);
            setMessageText(
              `Hello, I want to ${productType} your listing of ${productTitle}`
            );
          }
          setSearchPrams("");
        } else {
          // Chat not found, create a new chat
          try {
            const res = await apiRequest.post("/chats", { receiverId });
            if (res.status === 200) {
              // New chat created successfully, open it
              handleOpenChat(res.data.id, res.data.receiver);
              setSearchPrams("");
            } else {
              console.log("Failed to create chat:", res.data.message);
            }
          } catch (error) {
            console.log("Error creating chat:", error);
          }
        }
      }
    };

    openChatForReceiver();
  }, [receiverId, chats, chatCreated]);

  return (
    <div className="chat">
      <section className="messages">
        <h1>Messages</h1>

        {isLoading ? (
          <Loader />
        ) : (
          chats?.map((chat) => {
            return (
              <div
                className="message"
                key={chat.id}
                style={{
                  backgroundColor: chat.seenBy.includes(currentUser.id)
                    ? "white"
                    : "#fecd514e",
                }}
                onClick={() => handleOpenChat(chat.id, chat.receiver)}
              >
                <img
                  src={
                    chat.receiver.avatar ||
                    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                  }
                  alt=""
                />
                <div className="content">
                  <span
                    className="
                  userName"
                  >
                    <b>{chat.receiver.username}</b>
                  </span>

                  <Excerpt text={chat.lastMessage} maxLength={30} />
                </div>
              </div>
            );
          })
        )}
      </section>
      {chat && (
        <section className="chatBox">
          <div className="top">
            <div className="user">
              <img
                src={
                  chat?.receiver?.avatar ||
                  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                }
                alt=""
              />
              <span className="username">{chat?.receiver?.username}</span>
            </div>
            <span className="close" onClick={() => setChat(null)}>
              X
            </span>
          </div>
          <div className="center">
            {chat.messages.map((message) => (
              <div
                className="chatMessage "
                key={message.id}
                style={{
                  alignSelf:
                    message.userId === currentUser.id
                      ? "flex-end"
                      : "flex-start",
                  textAlign:
                    message.userId === currentUser.id ? "right" : "left",
                }}
              >
                <p>{message.text}</p>
                <span>{format(message.createdAt)}</span>
              </div>
            ))}
            <div ref={messageEndRef}></div>
          </div>

          <form className="bottom" onSubmit={handleSubmit}>
            <textarea
              name="text"
              id="myTextarea"
              placeholder={isFocused ? "" : "Type Message"}
              onFocus={handleFocus}
              onBlur={handleBlur}
              defaultValue={messageText}
            ></textarea>

            <button type="submit">Send</button>
          </form>
        </section>
      )}
    </div>
  );
}

export default Chat;
