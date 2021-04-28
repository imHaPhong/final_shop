import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Button, ButtonToolbar, Dropdown, Icon, IconButton, Input, Modal, Rate } from "rsuite";
import { userVote, userSendReport } from "../../middlerware/userMiddlerware";
import { io } from "socket.io-client";
import { Link } from "react-router-dom";
import { socket } from "../../config/socket";

const Post = ({ data, user, userVote, isAdmin =true, userSendReport }) => {
  const { _id, date, title, body, image = [], vote, tag, rId, rating } = data;

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

  const [isOpen, setIsOpen] = useState(false);
  
  const close = () => {
    setIsOpen(false);
  }

  const [userInputValue, setUserInputValue] = useState('')

  const userSendReportx = async () => {
    await userSendReport({uId: user._id, pId: _id, content: userInputValue})
  }

  return (
    <div className="post ">
      <Modal size="md" show={isOpen} onHide={close}>
          <Modal.Header>
            <Modal.Title>Report</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Input type="text" value={userInputValue} onChange={(e) => setUserInputValue(e)}/>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={userSendReportx} appearance="primary">
              Ok
            </Button>
            <Button onClick={close} appearance="subtle">
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      {image.length !== 0 && (
        <div className="post-img-container">
          {image.map((img) => (
            <img src={img} alt="img" className="boder post-img" />
          ))}
        </div>
      )}
      <span className="post-title">
        {title}
        <span className="">
         {isAdmin ? <div className="post-option"><Rate value={rating} readOnly size="sm" />      <ButtonToolbar>
        <Dropdown placement="bottomEnd" renderTitle={() => {
        return <Icon icon="ellipsis-h" />;
      }} noCaret>
        <Dropdown.Item onClick={() => setIsOpen(true)}>Reporter</Dropdown.Item>
        </Dropdown>

  </ButtonToolbar></div> : <div className="admin-action">
           <Icon icon="trash" />
           <Icon icon="check" />
           </div>}
        </span>
      </span>
      <div>
 
      </div>
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
      {isAdmin? <div className="post-bottom">
        <div className="post-tags">
          <Icon
            icon={`${voted ? "heart" : "heart-o"}`}
            onClick={() => userVoteHandler(_id)}
          />{" "}
          {listVote.length}
        </div>
        <div className="post-readmore"></div>
      </div>: <div></div>}
      <div className="breakline"></div>
    </div>
  );
};

const mapStateToPorps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToPorps, { userVote, userSendReport })(Post);
