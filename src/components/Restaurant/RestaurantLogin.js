import React, { useRef, useState } from "react";
import { connect } from "react-redux";
import {
  Alert,
  Button,
  ButtonToolbar,
  ControlLabel,
  Form,
  FormControl,
  FormGroup,
  HelpBlock,
  Schema,
} from "rsuite";
import {
  formCheck,
  createAccount,
  restaunrantLogin,
  checkToken
} from "../../middlerware/restaurantMiddleware";

const RestaurantLogin = ({ formCheck, createAccount, restaunrantLogin,checkToken }) => {
  const [login, setLogin] = useState(true);

  const INITIAL_STATE = {
    email: "",
    password: "",
    verifyPassword: "",
    types: "",
    address: "",
    restaurantName: "",
    location: ""
  };

  
  function showPosition(position) {
     ;
    setFormData(p => ({ ...p, location: `${position.coords.latitude},${position.coords.longitude}`}))
  }

  const addLocation = () => {
    navigator.geolocation.getCurrentPosition(showPosition);

  }

  const [formData, setFormData] = useState(INITIAL_STATE);
  const { StringType } = Schema.Types;

  const form = useRef();

  const onSubmitHandle = async () => {
    const emailCheck = form.current.checkForField("email");
    const passwordCheck = form.current.checkForField("password");
    if (login) {
      if (emailCheck && passwordCheck) {
        let loginData = await restaunrantLogin({
          email: formData.email,
          password: formData.password,
        });
        if (loginData.isLogin) {
          setFormData(INITIAL_STATE);
          localStorage.setItem("auth_token", loginData.token);
          window.location.href = "/restaurant"
          return Alert.success(loginData.msg, 3000);
        }
        return Alert.error(loginData.msg, 3000);
      }
    }
    if (form.current.check()) {
      let loginData;
      formData.location =  formData.location.split(',')

      loginData = await createAccount(formData);
      console.log(loginData);
      if (loginData.isLogin) {
        setFormData(INITIAL_STATE);
        return Alert.success(loginData.msg, 3000);
      }
      return Alert.error(loginData.msg, 3000);
    }
  };

  const model = Schema.Model({
    email: StringType()
      .addRule(async (value, data) => {
        if (!login) {
          const a = await formCheck({ email: value });
          return a;
        }
      }, "Email has been exist")
      .isEmail("Please enter a valid email address.")
      .isRequired("This field is required."),
    password: StringType()
      .minLength(6, "Password require min 6 character.")
      .isRequired("This field is required."),
    verifyPassword: StringType()
      .addRule((value, data) => {
        return value === data.password;
      }, "Verify password not match with password")
      .isRequired("This field is required."),
    types: StringType().isRequired("This field is required."),
    restaurantName: StringType()
      .minLength(2, "Restaurant name min 2 character")
      .isRequired("This field is required."),
      address: StringType().isRequired("This field is required."),
      location: StringType().isRequired("This field is required."),
  });

  return (
    <div>
      <div className="r-login-container ">
        <h1>{login === true ? "Login" : "Create account"}</h1>
        <Form
          ref={form}
          model={model}
          onChange={(value) => setFormData(value)}
          formValue={formData}
        >
          <FormGroup>
            <ControlLabel>Email</ControlLabel>
            <FormControl name="email" checkAsync />
            <HelpBlock tooltip>Required</HelpBlock>
          </FormGroup>
          <FormGroup>
            <ControlLabel>Password</ControlLabel>
            <FormControl name="password" type="password" />
            <HelpBlock tooltip>Required</HelpBlock>
          </FormGroup>
          {login === false && (
            <>
              <FormGroup>
                <ControlLabel>Verify password</ControlLabel>
                <FormControl type="password" name="verifyPassword" />
                <HelpBlock tooltip>Required</HelpBlock>
              </FormGroup>
              <FormGroup>
                <ControlLabel>Restaurant name</ControlLabel>
                <FormControl name="restaurantName" />
                <HelpBlock tooltip>Required</HelpBlock>
              </FormGroup>
              <FormGroup>
                <ControlLabel>Restaurant type</ControlLabel>
                <FormControl name="types" />
                <HelpBlock tooltip>Required</HelpBlock>
              </FormGroup>
              <FormGroup>
                <ControlLabel>Address</ControlLabel>
                <FormControl name="address" />
                <HelpBlock tooltip>Required</HelpBlock>
              </FormGroup>
  
              <FormGroup>
                <ControlLabel>Add location</ControlLabel>
                <FormControl  readOnly={true} name="location" />

                <Button onClick={addLocation} fluid>Add</Button>
              </FormGroup>
            </>
          )}
          {login === true ? (
            <span onClick={() => setLogin(!login)} className="link">
              Create Account
            </span>
          ) : (
            <span onClick={() => setLogin(!login)} className="link">
              Back to login
            </span>
          )}
          <ButtonToolbar>
            <Button
              appearance="primary"
              type="submit"
              block
              onClick={onSubmitHandle}
            >
              {login === true ? "Login" : "Create account"}
            </Button>
          </ButtonToolbar>
        </Form>
      </div>
    </div>
  );
};

export default connect(null, { formCheck, createAccount, restaunrantLogin, checkToken })(
  RestaurantLogin
);
