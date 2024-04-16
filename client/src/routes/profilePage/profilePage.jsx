import Chat from "../../components/chat/Chat";
import List from "../../components/list/List";
import "./profilePage.scss";
import apiRequest from "../../lib/apiRequest";
import { Await, Link, useLoaderData, useNavigate } from "react-router-dom";
import { Suspense, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import Loader from "../../components/loader/loader";

function ProfilePage() {
  const data = useLoaderData();

  const { updateUser, currentUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await apiRequest.post("/auth/logout");
      updateUser(null);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <section className="profilePage">
      <section className="details">
        <div className="title">
          <h1>User Information</h1>
          <Link to="/profile/update">
            <button>Update Profile</button>
          </Link>
        </div>
        <div className="info">
          <span>
            Avatar:
            <img src={currentUser.avatar || "noavatar.jpg"} alt="" />
          </span>
          <span>
            Username: <b>{currentUser.username}</b>
          </span>
          <span>
            E-mail: <b>{currentUser.email}</b>
          </span>
          <button onClick={handleLogout}>Logout</button>
        </div>
        <div className="title">
          <h1>My List</h1>
          <Link to="/add">
            <button>Create New Post</button>
          </Link>
        </div>
        <Suspense fallback={<Loader />}>
          <Await
            resolve={data.postResponse}
            errorElement={<p>Error loading posts!</p>}
          >
            {(postResponse) => <List posts={postResponse.data.userPosts} />}
          </Await>
        </Suspense>
        <div className="title">
          <h1>Saved List</h1>
        </div>
        <Suspense fallback={<Loader />}>
          <Await
            resolve={data.postResponse}
            errorElement={<p>Error loading posts!</p>}
          >
            {(postResponse) => <List posts={postResponse.data.savedPosts} />}
          </Await>
        </Suspense>
      </section>
      <div className="chatContainer">
        <Suspense fallback={<Loader />}>
          <Await
            resolve={data.chatResponse}
            errorElement={<p>Error loading chats!</p>}
          >
            {(chatResponse) => <Chat chats={chatResponse.data} />}
          </Await>
        </Suspense>
      </div>
    </section>
  );
}

export default ProfilePage;
