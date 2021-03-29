import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Alert, DateRangePicker, Icon, Tooltip, Whisper } from "rsuite";
import Header from "./Header";
import {
  userLoadVoucher,
  userGetVoucher,
} from "../middlerware/userMiddlerware";
import Voucher from "./Voucher";

const VoucherPage = ({ userLoadVoucher, userGetVoucher }) => {
  // const size2Px = (size) => {
  //   switch (size) {
  //     case "xs":
  //       return [320, 115, 1.6];
  //     case "md":
  //       return [600, 150, 2];
  //     default:
  //       return [300, 200];
  //   }
  // };
  // useEffect(() => {
  //   userLoadVoucher();
  // }, []);

  const [listVoucher, setListVoucher] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const data = await userLoadVoucher();
      setListVoucher(data);
    };
    getData();
  }, []);

  return (
    <div>
      <Header />
      <DateRangePicker onChange={(e) => console.log(e)} />
      <div className="vContainer">
        <div className="voucherList">
          {listVoucher && listVoucher.map((el) => <Voucher voucherData={el} />)}
        </div>
      </div>
    </div>
  );
};

export default connect(null, { userLoadVoucher, userGetVoucher })(VoucherPage);
