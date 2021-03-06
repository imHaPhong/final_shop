import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import {
  Alert,
  ButtonToolbar,
  Col,
  Grid,
  Icon,
  IconButton,
  InputNumber,
  Modal,
  Row,
} from "rsuite";
import MenuItem from "./MenuItem";
import {
  userDelete,
  getRestaurantInfo,
  addMenuTitle,
  userAddMenu,
} from "../../middlerware/restaurantMiddleware";
import SubMenuItem from "./SubMenuItem";
import { Redirect } from "react-router-dom";

const Menu = ({ getRestaurantInfo, addMenuTitle, userDelete, userAddMenu }) => {
  const [menu, setMenu] = useState([]);
  const [menuTitle, setMenuTitlte] = useState({});
  const [currentTitle, setCurrentTitle] = useState(0);
  const [topHover, setTopHover] = useState(0);
  const [addTitle, setAddTitle] = useState({ state: false, content: "" });
  const [itemHover, setItemHover] = useState();
  const [isEditing, setIsEditing] = useState(false);
  const listRef = useRef();
  const [rightMenutitle, setRightMenuTitle] = useState("")


  const [open, setOpen] = useState(false);
  const [modalData, setModalData] = useState("");

  const [titleData, setTitleData] = useState();
  const [renderList, setRenderList] = useState();
  const [addDishValue, setAddDishValue] = useState({ name: "", price: 0 });
  const userSelectFileRef = useRef();
  const addDishAvt = useRef();
  const [isReload, setIsReload] = useState(false);
  const [isAddSubMenu, setIsAddSubMenu] = useState(false);
  const userAddDish = async () => {
    if(!userSelectFileRef.current.files[0]) {
      Alert.info("Please choose dish image", 3000)
      return
    }
    if(addDishValue.name === "") {
      Alert.info("Please enter dish name", 3000)
      return
    }
  
    const dataUpload = {
      img: userSelectFileRef.current.files[0],
      itemId: renderList,
      name: addDishValue.name,
      price: addDishValue.price,
    };
    const resData = await userAddMenu(dataUpload);
    Alert.success(resData.msg, 3000);
    setAddDishValue({ name: "", price: 0 });
    addDishAvt.current.src =
      "https://static.thenounproject.com/png/187803-200.png";
    setIsReload(!isReload);
  };
  const uploadFile = ["image/jpeg","image/png", "image/jpg"]
  const userUploadImg = () => {
    console.log();
     if(!uploadFile.includes(userSelectFileRef.current.files[0].type)) {
       Alert.info("Please select image file")
       return
     }
    var file = userSelectFileRef.current.files[0];
    addDishAvt.current.src = URL.createObjectURL(file);
  };

  const setShow = (data) => {
    setOpen((p) => !p);
    setModalData(data.menuTitle);

    setTitleData(data);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        let title = await getRestaurantInfo();
      var arr = title.menu.map((el) => ({
        id: el._id,
        menuTitle: el.menuTitle,
      }));
      setMenuTitlte(arr);
      } catch (error) {
        window.location.href = "/rLogin";

      }
    };
    getData();
  }, []);

  const addTitleHandle = (e) => {
    setAddTitle((p) => ({
      ...p,
      content: e.target.value,
    }));
  };

  const userAddTitleHandle = () => {
    const getData = async () => {
      const data = await addMenuTitle({
        menuTitle: { menuTitle: addTitle.content },
      });
      setAddTitle(p => ({
        ...p,
        content: ""
      }))
      setMenuTitlte((p) => p.concat(data));
    };
    getData();
  };

  const userDeleteHandler = () => {
    const getData = async () => {
      const result = await userDelete({ menu: titleData.id });
      if (!result.isDelete) {
        return Alert.error("Can not delete", 3000);
      }
      setMenuTitlte(menuTitle.filter((el) => el.id !== titleData.id));
      console.log(menuTitle);
      setOpen(false);
      Alert.success("Delete success", 3000);
    };
    getData();
  };

  const userEnter = (e) => {
    if(e.keyCode  === 13) {
      userAddTitleHandle()
    }
  }

  return (
    <div className="rcontainer r-bodyContainer">
      <Modal show={open}>
        <Modal.Title>Delete list category?</Modal.Title>
        <Modal.Body>
          B???n ???? x??a <span style={{ fontWeight: "bold" }}>{modalData}</span> s???n
          ph???m
        </Modal.Body>
        <Modal.Footer>
          <ButtonToolbar>
            <IconButton
              icon={<Icon icon="trash" />}
              onClick={userDeleteHandler}
              placement="left"
            >
              Delete
            </IconButton>
            <IconButton
              icon={<Icon icon="undo" />}
              placement="left"
              onClick={() => setOpen(false)}
            >
              Cancel
            </IconButton>
          </ButtonToolbar>
        </Modal.Footer>
      </Modal>
      <Grid fluid style={{ height: "100%" }}>
        <Row className="r-bodyBoder">
          <Col xsHidden md={4} className="spread-vertical">
            <div className="r-menuLeft">
              <ul ref={listRef}>
                <li
                  onMouseEnter={() => setTopHover(true)}
                  onMouseLeave={() => setTopHover(false)}
                >
                  <span>Menu</span>
                  {topHover === true && (
                    <Icon
                      icon="plus"
                      onClick={() =>
                        setAddTitle((p) => ({
                          ...p,
                          state: true,
                        }))
                      }
                    />
                  )}
                </li>
                {menuTitle.length > 0 &&
                  menuTitle.map((el, index) => (
                    <SubMenuItem
                    setRightMenuTitle={setRightMenuTitle}
                      setRenderList={setRenderList}
                      setShow={setShow}
                      itemValue={el}
                      key={index}
                      setIsEditing={setIsEditing}
                      isEditing={isEditing}
                    />
                  ))}
                <li></li>

                {addTitle.state === true && (
                  <li>
                    <input
                      type="text"
                      onChange={addTitleHandle}
                      value={addTitle.content}
                      onKeyDown={(e) => userEnter(e)}
                    />
                    <Icon icon="check" onClick={userAddTitleHandle} />
                    <Icon
                      icon="close"
                      onClick={() =>
                        setAddTitle((p) => ({
                          ...p,
                          state: false,
                        }))
                      }
                    />
                  </li>
                )}
              </ul>
            </div>
          </Col>
          <Col xs={24} md={20} style={{ padding: "5rem" }}>
        
            <div className="r-menuRight">
              <div className="r-menuRight-btn-header">
                <span>                {rightMenutitle || "Empty selection"}</span>
                  {rightMenutitle !== "" &&    <Icon
                  icon="plus-square-o"
                  onClick={() => setIsAddSubMenu(true)}
                />}
              </div>
              <MenuItem
                renderList={renderList}
                setIsAddSubMenu={setIsAddSubMenu}
                isReload={isReload}
              />
              {isAddSubMenu === true && (
                <span className="r-menu-add-item">
                  <label htmlFor="inputFile">
                    <img
                      ref={addDishAvt}
                      src="https://static.thenounproject.com/png/187803-200.png"
                      alt=""
                    />
                  </label>
                  <input
                    ref={userSelectFileRef}
                    type="file"
                    hidden
                    id="inputFile"
                    onChange={userUploadImg}
                  />
                  <label htmlFor="dishName">Dish name:</label>{" "}
                  <input
                    type="text"
                    id="dishName"
                    value={addDishValue.name}
                    onChange={(e) =>
                      setAddDishValue((p) => ({
                        ...p,
                        name: e.target.value,
                      }))
                    }
                  />
                  <label htmlFor="price">Price: </label>
                  <div>
                  <InputNumber
                    id="price"
                    value={addDishValue.price}
                    onChange={(e) =>
                      setAddDishValue((p) => ({
                        ...p,
                        price: e
                      }))
                    }
                  />
                  </div>
                  <span>
                    <Icon icon="check" onClick={userAddDish} />
                    <Icon icon="close" onClick={() => setIsAddSubMenu(false)} />
                  </span>
                </span>
              )}
            </div>
          </Col>
        </Row>
      </Grid>
    </div>
  );
};

export default connect(null, {
  getRestaurantInfo,
  addMenuTitle,
  userDelete,
  userAddMenu,
})(Menu);
