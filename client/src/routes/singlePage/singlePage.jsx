import "./singlePage.scss";
import Slider from "../../components/slider/Slider";
import Map from "../../components/map/Map";
import { useNavigate, useLoaderData, Link } from "react-router-dom";
import DOMPurify from "dompurify";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest";

function SinglePage() {
  const post = useLoaderData();
  const [saved, setSaved] = useState(post.isSaved);
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSave = async () => {
    if (!currentUser) {
      navigate("/login");
    }
    // AFTER REACT 19 UPDATE TO USEOPTIMISTIK HOOK
    setSaved((prev) => !prev);
    try {
      await apiRequest.post("/users/save", { postId: post.id });
    } catch (err) {
      console.log(err);
      setSaved((prev) => !prev);
    }
  };

  return (
    <section className="singlePage">
      <div className="details">
        <div className="wrapper">
          {post && <Slider images={post?.images} />}
          <div className="info">
            <div className="top">
              <div className="post">
                <h2>{post?.title}</h2>
                <div className="address">
                  <img src="pin.png" alt="" />
                  <span>{post?.address}</span>
                </div>
                <div className="price">${post?.price}</div>
              </div>
              <Link to={"/profile"}>
                <div className="user">
                  <img src={post?.user?.avatar || "./noavatar.jpg"} alt="" />
                  <span>{post?.user?.username}</span>
                </div>
              </Link>
            </div>
            {currentUser && currentUser.id !== post.userId && (
              <div className="buttonContainer">
                <Link
                  to={`/profile?receiverId=${post.userId}&productTitle=${post.title}&type=${post.type}`}
                >
                  <button>
                    <img src="./chat.png" alt="" /> Send a Message
                  </button>
                </Link>
                <button
                  onClick={handleSave}
                  style={{ backgroundColor: saved ? "#fece51" : "white" }}
                  className="saveBtn"
                >
                  <img src="./save.png" alt="" /> {saved ? "Unsave" : "Save"}
                </button>
              </div>
            )}
            <div
              className="bottom"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(post?.postDetail?.desc),
              }}
            >
              {/* <p>{post?.postDetail?.description}</p> */}
            </div>
          </div>
        </div>
      </div>
      <div className="features">
        <div className="wrapper">
          <h3 className="title">General</h3>
          <div className="listVertical">
            <div className="feature">
              <img src="./utility.png" alt="" />
              <div className="featText">
                <span>Utilities</span>
                <p>{post?.postDetail?.utilities} is responsible</p>
              </div>
            </div>
            <div className="feature">
              <img src="./pet.png" alt="" />
              <div className="featText">
                <span>Pet policy</span>
                <p>{post?.postDetail?.pet}</p>
              </div>
            </div>
            <div className="feature">
              <img src="./fee.png" alt="" />
              <div className="featText">
                <span>Property Fees</span>
                <p>{post?.postDetail?.income}</p>
              </div>
            </div>
          </div>

          <h3 className="title">Sizes</h3>
          <div className="sizes">
            <div className="size">
              <img src="./size.png" alt="" />
              <span>{post?.postDetail?.size}sqft</span>
            </div>
            <div className="size">
              <img src="./bed.png" alt="" />
              <span>{post?.bedroom} Bedrooms</span>
            </div>
            <div className="size">
              <img src="./bath.png" alt="" />
              <span>{post?.bathroom} Bathrooms</span>
            </div>
          </div>

          <h3 className="title">Near by Places</h3>
          <div className="listHorizontal">
            {post?.postDetail?.school && (
              <div className="feature">
                <img src="./school.png" alt="" />
                <div className="featText">
                  <span>School</span>
                  <p>{post?.postDetail?.school}m away</p>
                </div>
              </div>
            )}
            {post?.postDetail?.bus && (
              <div className="feature">
                <img src="./pet.png" alt="" />
                <div className="featText">
                  <span>Bus STop</span>
                  <p>{post?.postDetail?.bus}m away</p>
                </div>
              </div>
            )}
            {post?.postDetail?.restaurant && (
              <div className="feature">
                <img src="./fee.png" alt="" />
                <div className="featText">
                  <span>Restuarant</span>
                  <p>{post?.postDetail?.restaurant}m away</p>
                </div>
              </div>
            )}
          </div>
          <h3 className="title">Locations</h3>
          <div className="mapContainer">
            <Map items={[post]} />
          </div>
          {currentUser && currentUser.id !== post.userId && (
            <div className="buttonContainer">
              <Link
                to={`/profile?receiverId=${post.userId}&productTitle=${post.title}&type=${post.type}`}
              >
                <button>
                  <img src="./chat.png" alt="" /> Send a Message
                </button>
              </Link>
              <button
                onClick={handleSave}
                style={{ backgroundColor: saved ? "#fece51" : "white" }}
                className="saveBtn"
              >
                <img src="./save.png" alt="" /> {saved ? "Unsave" : "Save"}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default SinglePage;
