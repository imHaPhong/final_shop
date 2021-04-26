import React, { useState } from "react";
import { connect } from "react-redux";
import { Alert, Icon } from "rsuite";
import { userEditMenu } from "../../middlerware/restaurantMiddleware";

const SubMenuItem = ({
  setShow,
  itemValue,
  isEditing,
  setIsEditing,
  userEditMenu,
  setRenderList,
  setRightMenuTitle
}) => {
  const [isHover, setIsHover] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [inputValue, setInputValue] = useState(itemValue.menuTitle);

  const userEditHandler = async (id) => {
    if (inputValue === "") {
      return Alert.error("can not empty", 3000);
    }
    const resData = await userEditMenu({ id: id, menuTitile: inputValue });
    setIsEdit(false);
    if (!resData.isUpdate) {
      return Alert.error(resData.msg, 3000);
    }
    setInputValue(inputValue);
    Alert.success(resData.msg, 3000);
  };
  return (
    <div
      className="submenu"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      {isEdit === true ? (
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      ) : (
        <span onClick={() =>{
          setRenderList(itemValue.id)
          setRightMenuTitle(inputValue)
        } }>{inputValue}</span>
      )}
      {isHover && (
        <span>
          {isEdit === true ? (
            <Icon icon="check" onClick={() => userEditHandler(itemValue.id)} />
          ) : (
            <>
              <Icon icon="edit2" onClick={() => setIsEdit(true)} />
              <Icon icon="trash-o" onClick={() => setShow(itemValue)} />
            </>
          )}
        </span>
      )}
    </div>
  );
};

export default connect(null, { userEditMenu })(SubMenuItem);
