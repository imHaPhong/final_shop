import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { UserLayout } from "../layout/UserLayout/UserLayout";
import { getMyPost } from "../middlerware/userMiddlerware";
import Post from "./Post";

const Me = ({ user }) => {
  const [posts, setPosts] = useState([]);
  const [pages, setPage] = useState({
    page: 1,
    limit: 3,
  });
  useEffect(() => {
    const a = getMyPost({
      page: 1,
      limit: 3,
    });
    a().then((r) => {
      console.log(r);
      setPosts(r);
    });
  }, []);

  return (
    <UserLayout>
      {posts && posts.map((el, index) => <Post data={el} index={index} />)}
    </UserLayout>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps, { getMyPost })(Me);
