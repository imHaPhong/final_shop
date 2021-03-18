import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Icon } from "rsuite";
import { userVote } from "../middlerware/userMiddlerware";
import { io } from "socket.io-client";
import { Link } from "react-router-dom";
import { socket } from "../config/socket";

const Post = ({ data, user, userVote }) => {
  const { _id, date, title, body, image = [], vote, tag, rId } = data;

  const [listVote, setListVote] = useState([]);

  useEffect(() => {
    setListVote(vote);
  }, []);

  useEffect(() => {
    // const socket = io("https://tuanna-final.herokuapp.com/", {
    //   transports: ["websocket", "polling", "flashsocket"],
    // });
    socket.on("voted", (data) => {
      if (data.action === "vote") {
        if (data._id === _id) {
          setListVote(data.votes);
        }
      }
    });
  });

  const voted = listVote.includes(user.uId);
  const userVoteHandler = (_id) => {
    userVote({ vote: _id });
  };

  return (
    <div className="post ">
      {image.length !== 0 && (
        <div className="post-img-container">
          {image.map((img) => (
            <img src={img} alt="img" className="boder post-img" />
          ))}
        </div>
      )}
      <span className="post-title">{title}</span>
      <div className="post-detail">
        <span>
          <Icon icon="calendar-o" />
          {`${new Date(date).toLocaleDateString()}`}
        </span>
        <span>
          <Icon icon="user-o" />
          {user.username}
        </span>
        <span>
          <Icon icon="tags" />
          <Link to={`/user/oder/${rId}`}>{tag}</Link>
        </span>
      </div>
      <div className="post-body">
        Ut tellus dolor, dapibus eget, elementum vel, cursus eleifend, elit.
        Aenean auctor wisi et urna. Aliquam erat volutpat. Duis ac turpis. Donec
        sit amet eros. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
        Mauris fermentum dictum magna.
      </div>
      <div className="post-bottom">
        <div className="post-tags">
          <Icon
            icon={`${voted ? "heart" : "heart-o"}`}
            onClick={() => userVoteHandler(_id)}
          />{" "}
          {listVote.length}
        </div>
        <div className="post-readmore">Continue Reading</div>
      </div>
      <div className="breakline"></div>
    </div>
  );
};

const mapStateToPorps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToPorps, { userVote })(Post);
