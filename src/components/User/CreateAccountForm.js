import React, { useRef, useState } from "react";
import { connect } from "react-redux";
import {
  Alert,
  Button,
  ControlLabel,
  Form,
  FormControl,
  FormGroup,
  HelpBlock,
  Schema,
} from "rsuite";
import { UserLayout } from "../../layout/UserLayout/UserLayout";
import { isUserExist, createAccount } from "../../middlerware/userMiddlerware";
import MyApp from "./Payal";

const CreateAccountForm = ({ isUserExist, createAccount,setStep }) => {
  const INITAL_STATE = {
    userName: "",
    email: "",
    cemail: "",
    password: "",
    cpassword: "",
  };
  const [enable, setEnable] = useState(true);
  const [formError, setFormError] = useState(null);
  const [formValue, setFormValue] = useState(INITAL_STATE);

  const form = useRef();

  const { StringType, NumberType } = Schema.Types;

  const asyncUserExist = async (data) => {
    return await isUserExist(data);
  };

  const model = Schema.Model({
    userName: StringType()
      .addRule((value, data) => {
        return asyncUserExist({ userName: value });
      }, "User exist")
      .isRequired("This field is required"),
    email: StringType()
      .addRule((value, data) => {
        return asyncUserExist({ email: value });
      }, "Email exist")
      .isEmail("Please inout email")
      .isRequired("This field is required"),
    cemail: StringType()
      .addRule((value, data) => {
        if (value !== data.email) {
          return false;
        }
        return true;
      }, "The two email do not match")
      .isEmail()
      .isRequired(),
    password: StringType().isRequired("This field is required"),
    cpassword: StringType()
      .addRule((value, data) => {
        if (value !== data.password) {
          return false;
        }

        return true;
      }, "The two passwords do not match")
      .isRequired("This field is required."),
  });

  const userSubmit = async () => {
    if (form.current.check()) {
      const loginData = await createAccount(formValue);
      if (loginData.isLogin) {
        setFormValue(INITAL_STATE);
        setStep(p => p = p +1)
        return Alert.success(loginData.msg, 3000);
      }
      return Alert.error(loginData.msg, 3000);
    }
  };

  const onError = (data) => {
    console.log("Err: " + data);
  };

  const onCancel = (data) => {
    console.log("user cancel");
  };

  const onSuccess = (data) => {
    console.log(data);
  };

  return (
    <div>
      <Form
        fluid
        model={model}
        style={{ background: "white", padding: "2.8rem 2rem" }}
        onChange={(formValue) => setFormValue(formValue)}
        formValue={formValue}
        ref={form}
      >
        <FormGroup>
          <ControlLabel>User name</ControlLabel>
          <FormControl checkAsync name="userName" className="defaul-input" />
          <HelpBlock>required</HelpBlock>
        </FormGroup>
        <FormGroup>
          <ControlLabel>Email</ControlLabel>
          <FormControl
            checkAsync
            name="email"
            type="email"
            className="defaul-input"
          />
          <HelpBlock>required</HelpBlock>
        </FormGroup>
        <FormGroup>
          <ControlLabel>Confirm email</ControlLabel>
          <FormControl name="cemail" type="email" className="defaul-input" />
          <HelpBlock>required</HelpBlock>
        </FormGroup>
        <FormGroup>
          <ControlLabel>Password</ControlLabel>
          <FormControl
            name="password"
            type="password"
            className="defaul-input"
          />
        </FormGroup>
        <FormGroup>
          <ControlLabel>Confirm password</ControlLabel>
          <FormControl
            name="cpassword"
            type="password"
            className="defaul-input"
          />
        </FormGroup>
        <FormGroup>
          <Button
            block
            appearance="primary"
            type="submit"
            className="btn"
            onClick={userSubmit}
          >
            Submit
          </Button>
        </FormGroup>
        {/* <MyApp onSuccess={onSuccess} onCancel={onCancel} onError={onError} /> */}
      </Form>
    </div>
  );
};

export default connect(null, { isUserExist, createAccount })(CreateAccountForm);
