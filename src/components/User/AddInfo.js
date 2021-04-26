import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Icon, Input, InputGroup } from "rsuite";
import { userAddAddress } from "../../middlerware/userMiddlerware";
import Header from "./Header";

const AddInfo = ({userAddAddress}) => {
  const [hasAddress, setHasAddress] = useState([])
  const [value, setValue] = useState("")


  const addAddress = () => {
    userAddAddress({ address: value });
    setHasAddress(p => p.concat(value))
    setValue("")
  }

  const useEnter = (e) => {
    if(e.keyCode === 13){
      addAddress()
    }
  }

  return (
    <div style={{ height: "713px" }}>
      <h3>New address</h3>
     {hasAddress.length > 0 &&  <div>
        {hasAddress.map(el => {
          return <h4>
            {el}
        </h4>
        })}
      </div>}
      <InputGroup inside>
      <Input onKeyDown={useEnter} value={value} onChange={(e) => setValue(e)}/>
      <InputGroup.Button>
      <Icon icon="check" onClick={addAddress}/>
      </InputGroup.Button>
      </InputGroup>
     {hasAddress.length >0 &&  <Button block style={{marginTop: "20px"}} color="green">
        <Link to="/user" style={{color: "white"}} >Finish</Link>
      </Button>}
    </div>
  );
};

export default connect(null, {userAddAddress})(AddInfo);
