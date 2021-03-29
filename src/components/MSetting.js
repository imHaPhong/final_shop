import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import {
  Button,
  ControlLabel,
  Form,
  FormControl,
  FormGroup,
  Icon,
  Input,
  Loader,
  Panel,
  Schema,
} from "rsuite";
import PlaceholderParagraph from "rsuite/lib/Placeholder/PlaceholderParagraph";
import { UserLayout } from "../layout/UserLayout/UserLayout";
import Header from "./Header";
import { userUpdate, userAddAddress } from "../middlerware/userMiddlerware";

const MSetting = ({ user, userUpdate, userAddAddress }) => {
  const headerRef = useRef();

  const [isEdit, setIsEdit] = useState(false);
  const [usenameInput, setUserNameInput] = useState("user.username");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    cNewPassword: "",
  });
  const [useAddress, setUserAddress] = useState("");
  useEffect(() => {
    setUserNameInput(user.username);
  }, [user]);
  const useUpdateUsername = async () => {
    setIsEdit(false);
    setLoading(true);
    if (avtRef.current.src !== user.uAvatar) {
      return userUpdate(
        {
          avatar: userInputRef.current.files[0],
          userName: usenameInput,
        },
        () => {
          setLoading(false);
        }
      );
    }
    userUpdate({ userName: usenameInput }, () => {
      setLoading(false);
    });
  };

  const userAddAddressHandle = () => {
    setUserAddress("");
    userAddAddress({ address: useAddress });
  };

  const userUpdatePassword = async () => {
    if (formData.newPassword !== formData.cNewPassword) {
      return;
    }
    setLoading(true);
    userUpdate(
      {
        currentPassword: formData.currentPassword,
        password: formData.newPassword,
      },
      () => {
        setLoading(false);
      }
    );
  };

  const [avt, setAvt] = useState();

  const avtRef = useRef();
  const userInputRef = useRef();

  const userSelectAvt = (e) => {
    avtRef.current.src = URL.createObjectURL(userInputRef.current.files[0]);
  };
  const { StringType } = Schema.Types;

  const model = Schema.Model({
    currentPassword: StringType().isRequired("This must be requried"),
    newPassword: StringType(),
    cNewPassword: StringType()
      .addRule((value, data) => {
        if (value !== data.newPassword) {
          return false;
        }
        return true;
      }, "The two passwords do not match")
      .isRequired("This field is required."),
  });

  return (
    <>
      <Header />
      {loading && (
        <div className="loader">
          <Loader content="Loading" speed="fast" center size="lg" />
        </div>
      )}
      <div
        className="m-setting"
        ref={headerRef}
        style={{
          height: `${window.innerHeight - 92}px`,
        }}
      >
        <span className="m-setting-tittle">Setting</span>
        <span className="m-user-info">
          <label htmlFor="user-avatar">
            <img src={avt || user.uAvatar} alt="" ref={avtRef} />
          </label>
          {isEdit ? (
            <>
              <input
                type="file"
                id="user-avatar"
                ref={userInputRef}
                style={{ display: "none" }}
                onChange={userSelectAvt}
              />
              <Input
                block
                value={usenameInput}
                onChange={(e) => setUserNameInput(e)}
              />{" "}
              <Icon icon="check" onClick={useUpdateUsername} />
            </>
          ) : (
            <>
              <span className="m-usernameDisplay">{user.username}</span>
              <Icon icon="edit2" onClick={() => setIsEdit(true)} />
            </>
          )}
        </span>
        <Panel header="Change password" collapsible bordered>
          <Form
            fluid
            model={model}
            onChange={(value) => setFormData(value)}
            formValue={formData}
          >
            <FormGroup>
              <ControlLabel>Current password</ControlLabel>
              <FormControl type="password" name="currentPassword" />
            </FormGroup>
            <FormGroup>
              <ControlLabel>New password</ControlLabel>
              <FormControl type="password" name="newPassword" />
            </FormGroup>
            <FormGroup>
              <ControlLabel>New password</ControlLabel>
              <FormControl type="password" name="cNewPassword" />
            </FormGroup>
            <Button block appearance="primary" onClick={userUpdatePassword}>
              Save
            </Button>
          </Form>
        </Panel>
        <Panel header="Address" collapsible bordered>
          {user.userAddress.map((el, index) => (
            <div key={index}>{el}</div>
          ))}
          <div className="m-setting-addrss">
            <Input
              type="text"
              value={useAddress}
              onChange={(e) => setUserAddress(e)}
            />
            <Icon icon="plus-square" onClick={userAddAddressHandle} />
          </div>
        </Panel>
        <Panel header="Panel title" collapsible bordered>
          <PlaceholderParagraph />
        </Panel>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps, { userUpdate, userAddAddress })(
  MSetting
);
