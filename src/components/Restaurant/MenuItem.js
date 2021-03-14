import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Icon, Input } from "rsuite";
import {
  getSubmenu,
  userDeleteSubMenu,
} from "../../middlerware/restaurantMiddleware";
import MiTem from "./MiTem";

const MenuItem = ({ renderList, getSubmenu, isReload, userDeleteSubMenu }) => {
  const [submenu, setSubmenu] = useState();
  useEffect(() => {
    const getData = async () => {
      if (renderList) {
        const resData = await getSubmenu({ id: renderList });
        setSubmenu(resData[0].items);
      }
    };
    getData();
  }, [renderList, isReload]);

  return (
    <>
      {submenu && (
        <div className="">
          {submenu.map((el) => (
            <MiTem
              itemData={el}
              renderList={renderList}
              setSubmenu={setSubmenu}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default connect(null, { getSubmenu, userDeleteSubMenu })(MenuItem);
