import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { Icon } from "rsuite";
import { getListRestaurant } from "../../middlerware/userMiddlerware";

const PostFindRestaurant = ({ getListRestaurant, setAddress }) => {
  const [inputValue, setInputValue] = useState("");
  const [listData, setListData] = useState([]);
  const [isSelect, setIsselect] = useState(true);
  const [selectedData, setSelectedData] = useState("");

  const userSelectedData = (data) => {};

  const typingInput = useRef(null);

  useEffect(() => {
    const tempData = inputValue;
    if (typingInput.current) {
      clearTimeout(typingInput.current);
    }
    typingInput.current = setTimeout(async () => {
      const data = await getListRestaurant(tempData);
      setListData(data.listRestaurantName);
    }, 300);

    return () => {
      setListData([]);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue]);

  return (
    <div className="restaurantFind">
      {isSelect && (
        <>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Your are in"
          />
          {listData.length > 0 && (
            <ul>
              {listData.map((el) => (
                <li
                  onClick={() => {
                    setIsselect(false);
                    setSelectedData(el.restaurantName);
                    setAddress({ id: el._id, rName: el.restaurantName });
                  }}
                >
                  {el.restaurantName}
                </li>
              ))}
            </ul>
          )}
        </>
      )}
      {!isSelect && (
        <span className="selectTag">
          <span>{selectedData}</span>
          <Icon
            icon="close"
            onClick={() => {
              setInputValue("");
              setIsselect(true);
            }}
          />
        </span>
      )}
    </div>
  );
};

export default connect(null, { getListRestaurant })(PostFindRestaurant);
