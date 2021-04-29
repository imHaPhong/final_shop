import React, { useRef, useState } from "react";
import { Button, ButtonGroup, Form, Icon, IconButton, Panel, Steps } from "rsuite";
import PlaceholderParagraph from "rsuite/lib/Placeholder/PlaceholderParagraph";
import CreateAccountForm from "../../components/User/CreateAccountForm";
import AvatarEditor from "react-avatar-editor";
import AddInfo from "../../components/User/AddInfo";
import { userUpdate } from "../../middlerware/userMiddlerware";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const RegisterPage = ({userUpdate}) => {
  const [step, setStep] = useState(0);

  const onChange = (nextStep) => {
    setStep(nextStep < 0 ? 0 : nextStep > 2 ? 2 : nextStep);
  };

  const img = useRef()
  const imgInput = useRef()


  const userUploadAvatar = async () => {
    await userUpdate(
      {
        avatar: imgInput.current.files[0],
      },  () => {
        setStep(p => p+=1)
      })
      console.log("alo");

  }

  const [hasSrc, setHasSrc] = useState(false)

  const onNext = () => onChange(step + 1);
  const onPrevious = () => onChange(step - 1);
  const RenderByStep = ({ step }) => {
    switch (step) {
      case 0:
        return <CreateAccountForm setStep={setStep}/>;
      case 1:
        return (
          <div
            style={{
              height: "713px",
              display: "flex",
              alignItems: "center",
              flexDirection: "column"
            }}
          >
            <h4 style={{paddingBottom: "50px"}}>
            Add your avatar to make you stand out
            </h4>
            <input ref={imgInput} id="userInput" type="file" hidden={true} onChange={(e) => {
 const imgLink = URL.createObjectURL(e.target.files[0]);
console.log(imgLink);
 img.current.src = imgLink;
 setHasSrc(true)
            }} />
        <label htmlFor="userInput" >
        <img style={{maxWidth: "200px", height: "200px"}} src="https://icons.iconarchive.com/icons/custom-icon-design/silky-line-user/512/user2-add-icon.png" alt="" ref={img} />
    {hasSrc &&     <IconButton icon={<Icon icon="angle-double-right"/>} placement="right" onClick={userUploadAvatar} block appearance="primary" style={{marginTop: "100px"}}>
          Next
        </IconButton>}
        </label>
          </div>
        );
      default:
        return <AddInfo setStep={setStep} />;
    }
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div style={{ width: "50%" }}>
        {/* <CreateAccountForm /> */}
        <Steps current={step}>
          <Steps.Item title="Create account" />
          <Steps.Item title="Add avatar" />
          <Steps.Item title="Add address" />
        </Steps>
        <hr />
        <div>
          <RenderByStep step={step} />
        </div>
        <hr />
       {step === 1 &&  <ButtonGroup>
        <Button disabled={step === 0}>
            <Link to="/user">
              Skip
            </Link>
          </Button>
        </ButtonGroup>}
       {/* {step === 2 &&  <ButtonGroup>
        <Button disabled={step === 0}>
            <Link to="/user">
              Done
            </Link>
          </Button>
        </ButtonGroup>} */}
     
      </div>
    </div>
  );
};

export default connect(null, {userUpdate})(RegisterPage);
