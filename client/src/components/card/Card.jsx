import { Link } from "react-router-dom";
import "./card.scss";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

function Card({ item }) {
  const { currentUser } = useContext(AuthContext);
  return (
    <div className="card">
      <Link to={`/${item?.id}`} className="imgContainer">
        <img src={item?.images[0]} alt="" />
        <span className="type">
          for {item.type === "buy" ? "Purchase" : "Rent"}
        </span>
      </Link>
      <div className="textContainer">
        <h2 className="title">
          <Link to={`/${item?.id}`}>{item?.title}</Link>
        </h2>
        <p className="address">
          <img src="./pin.png" alt="" />
          <span>{item?.address}</span>
        </p>
        <p className="price">${item?.price}</p>
        <div className="bottom">
          <div className="features">
            <div className="feature">
              <img src="./bed.png" alt="" />
              <span>{item?.bedroom} Bedroom</span>
            </div>
            <div className="feature">
              <img src="./bath.png" alt="" />
              <span>{item?.bathroom} Bathroom</span>
            </div>
          </div>
          <div className="icons">
            {currentUser?.id !== item.userId && (
              <Link to={`/profile?receiverId=${item.userId}`}>
                <button>{item?.type}</button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
