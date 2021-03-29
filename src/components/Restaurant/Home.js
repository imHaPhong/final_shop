import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import {
  Button,
  ButtonGroup,
  DatePicker,
  Icon,
  Input,
  InputGroup,
  Loader,
} from "rsuite";

import {
  restaurantGetInfo,
  restaurantUpdateInfo,
} from "../../middlerware/restaurantMiddleware";

const Home = ({ restaurantGetInfo, restaurantUpdateInfo }) => {
  const INIT_INPUT = {
    avatar: "",
    restaurantName: "",
    address: "",
    avatarURL: "",
    timeAcitve: [],
  };

  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userInput, setUserInput] = useState(INIT_INPUT);

  useEffect(() => {
    restaurantGetInfo().then((result) => {
      setUserInput({
        avatarURL: result.avatar,
        restaurantName: result.restaurantName,
        address: result.address,
        timeAcitve: result.timeAcitve,
        avatar: "",
      });
    });
  }, []);

  const resAvt = useRef();

  const userSelectAvt = (e) => {
    const img = URL.createObjectURL(e.target.files[0]);
    resAvt.current.src = img;
    setUserInput((p) => ({
      ...p,
      avatar: e.target.files[0],
    }));
  };

  const useSubmit = () => {
    setIsEdit(false);
    restaurantUpdateInfo(userInput);
  };

  const userUpdateInput = (key, data) => {
    setUserInput((p) => ({
      ...p,
      [key]: data,
    }));
  };

  const userUpdateSelect = (key, data) => {
    const time = new Date(data).toLocaleTimeString().split(":");
    const temp = userInput.timeAcitve;
    temp[key] = `${time[0]}:${time[1]}`;
    setUserInput((p) => ({
      ...p,
      timeAcitve: temp,
    }));
  };

  return (
    <>
      {loading && <Loader content="Loading..." center size="lg" />}
      <div className="fd-hero rsm-container">
        <div className="fd-hero-img">
          {isEdit === true && (
            <input
              type="file"
              id="rUpdateImg"
              hidden
              onChange={(e) => userSelectAvt(e)}
            />
          )}
          <label htmlFor="rUpdateImg">
            <img ref={resAvt} src={userInput.avatarURL} alt="food detail" />
          </label>
        </div>
        <div className="fd-hero-detail">
          <div style={{ alignSelf: "flex-end" }}>
            {!isEdit && (
              <Icon
                icon="edit2"
                style={{ fontSize: "2rem" }}
                onClick={() => setIsEdit(true)}
              />
            )}
            {isEdit && (
              <Icon
                icon="check"
                style={{ fontSize: "2rem" }}
                onClick={useSubmit}
              />
            )}
          </div>
          <div>
            <span className="fd-name">
              {!isEdit ? (
                <span>{userInput.restaurantName}</span>
              ) : (
                <Input
                  value={userInput.restaurantName}
                  onChange={(e) => userUpdateInput("restaurantName", e)}
                />
              )}
            </span>
            <span className="fd-address">
              {!isEdit ? (
                <span>{userInput.address}</span>
              ) : (
                <Input
                  value={userInput.address}
                  onChange={(e) => userUpdateInput("address", e)}
                />
              )}
            </span>
            <div className="fd-detail">
              {!isEdit ? (
                <span className="fd-time-open">
                  From: {userInput.timeAcitve[0]} To: {userInput.timeAcitve[1]}
                </span>
              ) : (
                <span className="fd-time-open">
                  From:
                  <DatePicker
                    format="hh:mm"
                    showMeridian
                    ranges={[]}
                    onChange={(e) => userUpdateSelect("0", e)}
                  />
                  To:
                  <DatePicker
                    format="hh:mm"
                    showMeridian
                    ranges={[{ label: "Now", value: new Date() }]}
                    onChange={(e) => userUpdateSelect("1", e)}
                  />
                </span>
              )}
            </div>
          </div>

          <div className="fd-hero-detail-footer">
            <span className="fd-detail_title">Prepare</span>
            <span>12 Min</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default connect(null, { restaurantGetInfo, restaurantUpdateInfo })(Home);
