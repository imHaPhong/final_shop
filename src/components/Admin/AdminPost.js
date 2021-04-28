import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Button, ButtonToolbar, Dropdown, Icon, IconButton, Input, Modal, Rate } from "rsuite";
import { userVote, userSendReport, } from "../../middlerware/userMiddlerware";
import { adminDelete, adminIgnore } from "../../middlerware/adminMiddlerware";
import { io } from "socket.io-client";
import { Link } from "react-router-dom";
import { socket } from "../../config/socket";

const Post = ({ data, user, userVote, isAdmin =false, adminDelete,adminIgnore, reId }) => {
  const { _id, date, title, body, image = [], vote, tag, rId, rating } = data;

  const adminDeletex = () => {
    adminDelete({pId: _id})
  }
  const adminIgnorex = () => {
    adminIgnore({rId:reId })
  }

  return (
    <div className="post ">
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
  
  </ButtonToolbar></div> : <div className="admin-action">
           <Icon icon="trash" onClick={adminDeletex} />
           <Icon icon="check" onClick={adminIgnorex} />
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

      <div className="breakline"></div>
    </div>
  );
};



export default connect(null, { userVote, userSendReport, adminDelete,adminIgnore })(Post);
