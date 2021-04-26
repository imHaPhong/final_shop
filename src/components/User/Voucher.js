import React from "react";
import { connect } from "react-redux";
import { Alert, Icon, Radio, Tooltip, Whisper } from "rsuite";
import { userGetVoucher } from "../../middlerware/userMiddlerware";

const Voucher = ({
  isCheck = false,
  isDisable = false,
  voucherData,
  userGetVoucher,
  ...props
}) => {
  const {
    maxDisCount,
    endDate,
    voucherDetail,
    voucherDescription,
    _id,
    minBill,
    discount,
  } = voucherData;
  const clickHandler = async (id) => {
    const data = await userGetVoucher(id);
    console.log(data);
    if (data.isSuccess) {
      return Alert.success(data.msg, 3000);
    }
    return Alert.info(data.msg, 3000);
  };

  return (
    <div className="voucherCotnainer" style={{ color: "#BBBBBB" }}>
      <div className={`voucher-left ${isDisable ? "disable" : ""}`}>
        <div className="list-dots">
          <div className="dots"></div>
          <div className="dots"></div>
          <div className="dots"></div>
          <div className="dots"></div>
          <div className="dots"></div>
          <div className="dots"></div>
          <div className="dots"></div>
        </div>
        <span>{voucherDetail}</span>
      </div>
      <div className="voucher-right">
        <span className="vouvherRight-header">
          <span>
            <span className="voucher-detial">{`Giảm ${discount}% to da ${maxDisCount}$`}</span>
            <span>{`Cho đơn hàng từ ${minBill}$`}</span>
          </span>
          <span className="voucherTips">
            <Whisper
              placement="top"
              trigger="hover"
              speaker={<Tooltip>{voucherDescription}</Tooltip>}
            >
              <Icon icon="info" />
            </Whisper>
          </span>
        </span>

        <span className="vouvherRight-header bottom">
          <span className="voucher-exp">{`HSD: ${new Date(
            endDate
          ).toLocaleDateString()}`}</span>
          {!isCheck && (
            <span className="vBtn" onClick={() => clickHandler(_id)}>
              Save
            </span>
          )}
          {isCheck && !isDisable && (
            <input
              type="radio"
              name="selectVoucher"
              onClick={() =>
                props.setIdClickHandler(_id, maxDisCount, discount)
              }
            />
          )}
        </span>
      </div>
    </div>
  );
};

export default connect(null, { userGetVoucher })(Voucher);
