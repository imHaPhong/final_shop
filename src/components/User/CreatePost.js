import React, { useRef, useState } from "react";
import TextareaAutosize from "react-autosize-textarea";
import { connect } from "react-redux";
import { Alert, Icon, Loader, Rate, Uploader } from "rsuite";
import useOutsideClick from "../../utilities/custom-hooks/outSideClick";
import { createPosts } from "../../middlerware/userMiddlerware";
import PostFindRestaurant from "./PostFindRestaurant";

const CreatePost = ({ createPosts }) => {
  const [show, setShow] = useState(false);
  const [value, setValue] = useState({
    title: "",
    body: ""
  });

  const [fileData, setFileData] = useState([]);

  const [loading, setLoading] = useState(false);

  const [address, setAddress] = useState({});

  const [rateing, setRateing] = useState(0);

  const textChangeHandler = (e) => {
    setValue({ ...value, body: e.target.value });
  };
  const titleChangeHandler = (e) => {
    setValue({ ...value, title: e.target.value });
  };

  const ref = useRef();

  useOutsideClick(ref, () => {
    if (show && value.length === 0) {
      setShow(false);
    }
  });
  const ratingRef = useRef();

  const userSubmit = () => {
    if(value.title === "") {
      Alert.info("Please enter a title")
      return;
    }
    if(value.body === "") {
      Alert.info("Please enter a body")
      return;
    }
    if(value.rName === "") {
      Alert.info("Please enter a restaurant name")
      return;
    }
    if(rateing === 0) {
      Alert.info("Please select rating")
      return;
    }
    setLoading(true);

    const data = {
      title: value.title,
      body: value.body,
      img: fileData,
      tag: address.rName,
      rId: address.id,
      rating: rateing,
    };
    createPosts(data, () => {
      setShow(false);
      setValue({ title: "",
      body: ""});
      setFileData([]);
      setLoading(false);
      setRateing(0)
    });
    
  };

  const fileChange = (e) => {
    setFileData(
      fileData.concat({
        fileURL: URL.createObjectURL(e.target.files[0]),
        fileData: e.target.files[0],
      })
    );
  };

  return (
    <div className="createPost" ref={ref}>
      {show && (
        <>
          <input
            type="text"
            className="p-title"
            placeholder="Enter your title"
            onChange={titleChangeHandler}
            value={value.title}
          />
          <div className="user-selectRestaurant">
            {/* <span style={{ marginRight: "20px" }}>Your are in: </span> */}
            <PostFindRestaurant setAddress={setAddress} />
          </div>
        </>
      )}
      <TextareaAutosize
        rows={5}
        style={{ maxHeight: 500 }}
        onChangeCapture={textChangeHandler}
        onFocus={() => setShow(true)}
        placeholder="Say some thing..."
        value={value.body}
      />
      {show && (
        <div style={{ display: "flex", alignItems: "center" }}>
          <span style={{ padding: " 0 21px" }}>Rating:</span>
          <Rate
            defaultValue={rateing}
            allowHalf
            value={rateing}
            onChange={(e) => setRateing(e)}
          />
        </div>
      )}
      {fileData && (
        <div className="p-list-img">
          {fileData.map((file) => (
            <div className="p-add-img">
              <img src={file.fileURL} alt="sad" />
              <Icon
                icon="close-circle"
                onClick={() =>
                  setFileData(
                    fileData.filter((el) => el.fileURL !== file.fileURL)
                  )
                }
              />
            </div>
          ))}
          {fileData.length !== 0 && (
            <div className="p-list-addmore">
              <label htmlFor="userAvatar">
                <Icon icon="plus-square-o" />
              </label>
            </div>
          )}
        </div>
      )}

      {show && (
        <>
          <div className="breakline"></div>

          <div className="createPost-footer">
            <div className="cpFooter-left">
              <Icon icon="pencil" />
              <label htmlFor="userAvatar">
                <Icon icon="image" />
              </label>
              <input
                type="file"
                id="userAvatar"
                onChange={fileChange}
                hidden={true}
              />

              <Icon icon="logo-video" />
            </div>
            {value.length !== 0 && (
              <div className="cpFooter-right">
                <Icon icon="close-circle" />
                <span
                  className={`btn ${loading ? "disable" : ""}`}
                  onClick={userSubmit}
                >
                  <span>
                    Post
                    {loading && <Icon icon="spinner" />}
                  </span>
                </span>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default connect(null, { createPosts })(CreatePost);
