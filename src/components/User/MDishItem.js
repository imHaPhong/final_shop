import React from "react";
import { connect } from "react-redux";
import { useParams } from "react-router";
import { Icon, Panel } from "rsuite";
import {
  addProOderAction,
  removePreOderAction,
  updatePreOderAction,
} from "../../store/action/oderAction/oderAction";

const MDishItem = ({
  menuQtn,
  title,
  data,
  isList = false,
  updatePreOder,
  removePreOder,
  addPreOder,
  preOder,
}) => {
  const { id } = useParams();
  console.log(data);
  const saveValue = (dishData) => {
    var dish = [];
    dish = JSON.parse(localStorage.getItem("dish") || "[]");
    let dList;
    const check = dish.map((el) => {
      if (el.id === dishData.id) {
        return true;
      }
      return false;
    });

    if (check.includes(true)) {
      updatePreOder(dishData);
      dList = dish.map((el) => {
        if (el.id === dishData.id) {
          el.qtn += 1;
        }
        return el;
      });
    } else {
      dish.push(dishData);
      addPreOder(dishData);
    }
    if (dList) {
      dish = dList;
    }

    localStorage.setItem("dish", JSON.stringify(dish));
  };

  const addToLocal = (data) => {
    var rawData = JSON.parse(localStorage.getItem("dish") || []);
    rawData = rawData.map((el) => {
      if (el.id === data.id) {
        el.qtn += 1;
      }
      return el;
    });
    console.log(rawData);
    localStorage.setItem("dish", JSON.stringify(rawData));
  };

  const removeToLocal = (data) => {
    var rawData = JSON.parse(localStorage.getItem("dish") || []);
    rawData = rawData.map((el, index) => {
      if (el.id === data.id && el.qtn > 0) {
        el.qtn -= 1;
      }
      if (el.qtn === 0) {
        return null;
      }
      return el;
    });
    rawData = rawData.filter((el) => el !== null);
    localStorage.setItem("dish", JSON.stringify(rawData));
  };

  const clickHandler = (action, data) => {
    if (action === "Add") {
      updatePreOder(data);
      addToLocal(data);
    } else {
      removePreOder(data);
      removeToLocal(data);
    }
  };

  const DishItem = ({ dishData }) => {
    var qtn = 0;
    preOder.map((el) => {
      if (el.id === dishData._id) {
        qtn = el.qtn;
      }
    });
    return (
      <div
        className={`m-fd-dishContainer  ${
          isList ? `m-fd-disContainer-list` : ``
        }`}
      >
        <img src={dishData.img} alt="anh nha" />
        {isList && (
          <>
            <div className="m-fd-info">
              <div className="m-fd-dishTitle">{dishData.name}</div>
              <span className="m-fd-dishOderQtn">
                <Icon icon="shopping-cart" />
                <span>100+</span>
              </span>
              <span>{dishData.price}</span>
            </div>
          </>
        )}
        {!isList && (
          <>
            {" "}
            <div className="m-fd-dishTitle">{dishData.name}</div>
            <span className="m-fd-dishOderQtn">
              <Icon icon="shopping-cart" />
              <span>100+</span>
            </span>
          </>
        )}
        <span className="m-fd-dishfooter">
          {!isList && <span>{dishData.price}</span>}
          <span className="m-fd-qtn">
            <Icon
              icon="minus-circle"
              style={{
                color: "red",
                visibility: `${qtn > 0 ? `visible` : `hidden`}`,
              }}
              onClick={() =>
                clickHandler("remove", {
                  id: dishData._id,
                  rid: id,
                  img: dishData.img,
                  qtn: 1,
                  name: dishData.name,
                  price: dishData.price,
                })
              }
            />
            {qtn > 0 && <>{qtn}</>}
            <Icon
              icon="plus-circle"
              onClick={() =>
                saveValue({
                  img: dishData.img,
                  rid: id,
                  id: dishData._id,
                  price: dishData.price,
                  name: dishData.name,
                  qtn: 1,
                })
              }
            />
          </span>
        </span>
      </div>
    );
  };

  return (
    <div>
      <Panel
        expdefaultExpandedanded
        collapsible
        header={`${title} - ${menuQtn} dish`}
      >
        <div className={`m-fd-grid ${isList ? ` m-fd-flex` : ``}`}>
          {data.items.map((el) => (
            <DishItem dishData={el} />
          ))}
        </div>
      </Panel>{" "}
    </div>
  );
};

const mapStateToProps = (sate) => {
  return {
    preOder: sate.preOder,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removePreOder: (data) => {
      dispatch(removePreOderAction(data));
    },
    updatePreOder: (data) => {
      dispatch(updatePreOderAction(data));
    },
    addPreOder: (data) => {
      dispatch(addProOderAction(data));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(MDishItem);
