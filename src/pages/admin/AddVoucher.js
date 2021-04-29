import React, { useState } from "react";
import { connect } from "react-redux";
import {
  Alert,
  Button,
  ControlLabel,
  DateRangePicker,
  Form,
  FormControl,
  FormGroup,
  Icon,
  InputNumber,
  Radio,
  RadioGroup,
  Schema,
  Toggle,
} from "rsuite";
import { createVoucher } from "../../middlerware/adminMiddlerware";

const AddVoucher = ({ createVoucher }) => {
  const [formValue, setFormValue] = useState({
    radio: "unlimited",
    isLimited: false,
    dateRangePicker: [new Date(), new Date()],
    qtn: 0,
    minBill: 0,
    maxDisCount: 0,
    voucherDetail: "",
    voucherDescription: "",
    discount: 0,
  });

  const { StringType, NumberType } = Schema.Types;

  const model = Schema.Model({
    voucherDetail: StringType().isRequired("This field is required."),
    voucherDescription: StringType().isRequired("This field is required."),
  });

  const handleSubmit = () => {
    if (formValue.voucherDetail === "") {
      Alert.info("Detail is required");
      return;
    }
    if (formValue.voucherDescription === "") {
      Alert.info("Description is required");
      return;
    }
    const isLitmitedx = formValue.radio === "unlimited";
    setFormValue((p) => ({ ...p, isLimited: isLitmitedx }));
    createVoucher(formValue);
  };

  return (
    <div className="addVoucher">
        <h2 style={{textAlign: "center", padding: "3rem"}}>Add voucher</h2>
      <Form
        model={model}
        formValue={formValue}
        onChange={(formValue) => setFormValue(formValue)}
      >
        <span className="m-2">
          <FormGroup>
            <ControlLabel>CheckPicker</ControlLabel>
            <FormControl
              name="dateRangePicker"
              label="Create Date"
              accepter={DateRangePicker}
            />
            <FormGroup>
              <ControlLabel>Radio</ControlLabel>
              <FormControl name="radio" accepter={RadioGroup}>
                <Radio value="unlimited">Unlimited</Radio>{" "}
                <Radio value="limited">Limited</Radio>
              </FormControl>
            </FormGroup>
          </FormGroup>
        </span>
        <span className="m-2">
          {formValue.radio === "limited" && (
            <FormGroup>
              <ControlLabel>Quantity</ControlLabel>
              <FormControl accepter={InputNumber} name="qtn" />
            </FormGroup>
          )}

          <FormGroup>
            <ControlLabel>Min bill</ControlLabel>
            <FormControl accepter={InputNumber} name="minBill" />
          </FormGroup>
        </span>
        <span className="m-2">
          <FormGroup>
            <ControlLabel>Max discount</ControlLabel>
            <FormControl accepter={InputNumber} name="maxDisCount" />
          </FormGroup>
          <FormGroup>
            <ControlLabel>Discount</ControlLabel>
            <FormControl fuild accepter={InputNumber} name="discount" />
          </FormGroup>
        </span>
        <span className="m-2">
          <FormGroup>
            <ControlLabel>Voucher description</ControlLabel>
            <FormControl name="voucherDescription" />
          </FormGroup>
          <FormGroup>
            <ControlLabel>Voucher detail</ControlLabel>
            <FormControl name="voucherDetail" />
          </FormGroup>
        </span>
        <span  className="m-2">
      
        </span>
      </Form>
      <Button style={{marginTop: "30px"}} appearance="primary" onClick={handleSubmit}>
            Submit
          </Button>
    </div>
  );
};

export default connect(null, { createVoucher })(AddVoucher);
