import React, { useCallback, useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { Loader } from "rsuite";
import PlaceholderParagraph from "rsuite/lib/Placeholder/PlaceholderParagraph";
import CreatePost from "../components/CreatePost";
import Header from "../components/Header";
import Post from "../components/Post";
import Posts from "../components/Posts";
import { UserLayout } from "../layout/UserLayout/UserLayout";
import { getNewPost } from "../middlerware/userMiddlerware";
import { socket } from "../config/socket";
import BodyLeft from "../layout/UserLayout/partials/bodyleft/index";

const Home = ({ getNewPost, auth }) => {
  const [newPost, setNewPost] = useState(null);
  const [pages, setPage] = useState({
    page: 0,
    limit: 3,
  });

  const [hasMore, setHasMore] = useState(true);

  const postRef = useRef();

  const lastPost = useCallback(
    (node) => {
      if (postRef.current) postRef.current.disconnect();
      postRef.current = new IntersectionObserver(async (entries) => {
        if (entries[0].isIntersecting) {
          setPage({
            ...pages,
            page: Number(pages.page) + 1,
          });
          if (hasMore) {
            let post = await getNewPost(pages);
            if (post.length === 0) return setHasMore(false);
            setNewPost(newPost.concat(post));
          }
        }
      });
      if (node) postRef.current.observe(node);
    },
    [newPost]
  );

  useEffect(() => {
    if (auth.auth) {
      let post;
      const data = async () => {
        post = await getNewPost(pages);
        if (post.length === 0) {
          setHasMore(false);
        }
        setNewPost(post);
      };
      data();
    }
  }, [auth.auth]);

  useEffect(() => {
    socket.on("newPosts", (data) => {
      if (data.action === "newPosts") {
        let post;
        const data = async () => {
          post = await getNewPost();
          setNewPost(post);
        };
        data();
      }
    });
  }, []);

  return (
    <div>
      <UserLayout>
        {auth.auth && <CreatePost />}
        {!auth.auth && <BodyLeft />}
        {!newPost && auth.auth && (
          <div style={{ position: "relative", height: "50vh" }}>
            <Loader size="lg" center content="loading" />
          </div>
        )}
        {newPost && auth.auth && (
          <div className="boder">
            {newPost.map((el, index) => (
              <Post data={el} index={index} />
            ))}
            <div ref={lastPost} style={{ visibility: "visible" }}></div>
          </div>
        )}
      </UserLayout>
    </div>
  );
};

const mapStateToProp = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProp, { getNewPost })(Home);
