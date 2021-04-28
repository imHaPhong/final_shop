import React, { useEffect, useRef, useState } from "react";
import NumberFormat from "react-number-format";
import { connect } from "react-redux";
import { Alert, Icon, Input } from "rsuite";
import {
  userEditSubMenu,
  userDeleteSubMenu,
} from "../../middlerware/restaurantMiddleware";
const MiTem = ({
  itemData,
  userEditSubMenu,
  renderList,
  userDeleteSubMenu,
  setSubmenu,
}) => {
  const [editMode, setEditMode] = useState(true);
  const [inputValue, setInputvalue] = useState({
    name: itemData.name,
    price: itemData.price,
  });

  const userInput = useRef();
  const dishImg = useRef();

  const userEditAvt = () => {
    dishImg.current.src = URL.createObjectURL(userInput.current.files[0]);
  };

  const userEditMenu = async () => {
    const resData = await userEditSubMenu({
      img:
        dishImg.current.src !== itemData.img
          ? userInput.current.files[0]
          : null,
      itemId: renderList,
      subMenuId: itemData._id,
      name: inputValue.name,
      price: inputValue.price,
    });
    Alert.success(resData.msg, 3000);
    setEditMode(!editMode);
  };

  const userDeleteSubMenuHandler = async (id) => {
    const resData = await userDeleteSubMenu({ id: renderList, submenu: id });
    Alert.info(resData.msg, 3000);
    setSubmenu((p) => p.filter((el) => el._id !== id));
  };

  return (
    <div className="r-menuContainer">
      <div className="r-menuItem">
        <div className="r-menuItem-editMode">
          <div>
            {" "}
            <label htmlFor="item-avt">
              <img src={itemData.img} alt="img" ref={dishImg} />
              {editMode === false && <Icon icon="camera" />}
            </label>
            {editMode === false && (
              <input
                type="file"
                id="item-avt"
                hidden={true}
                ref={userInput}
                onChange={userEditAvt}
              />
            )}
          </div>
          {editMode === true ? (
            <span style={{ cursor: "pointer" }}>{inputValue.name}</span>
          ) : (
            <Input
              value={inputValue.name}
              onChange={(e) =>
                setInputvalue((p) => ({
                  ...p,
                  name: e,
                }))
              }
            />
          )}
        </div>
        {editMode === true ? (
          <span className="r-menuItem-price"> <NumberFormat value={inputValue.price} displayType={'text'} thousandSeparator={true}  /> đ</span>
        ) : (
          <Input
            type="number"
            value={inputValue.price}
            onChange={(e) =>
              setInputvalue((p) => ({
                ...p,
                price: e,
              }))
            }
          />
        )}
      </div>
      <div>
        {editMode === true ? (
          <Icon icon="edit2" onClick={() => setEditMode(!editMode)} />
        ) : (
          <Icon icon="check" onClick={userEditMenu} />
        )}
        <Icon
          icon="trash2"
          onClick={() => userDeleteSubMenuHandler(itemData._id)}
        />
      </div>
    </div>
  );
};

export default connect(null, { userEditSubMenu, userDeleteSubMenu })(MiTem);
