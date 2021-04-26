import React from "react";
import { useLocation, useParams } from "react-router";
import {
  Checkbox,
  CheckboxGroup,
  FormGroup,
  Radio,
  RadioGroup,
  Rate,
} from "rsuite";
import Header from "../../components/User/Header";
import ListFood from "../../components/User/ListFood";

const Search = () => {
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  const { id } = useParams();
  const query = useQuery();
  console.log(query.get("q"));
  console.log(id);
  
  const location = useLocation();


  const userFilter = (by) => {
    console.log(location);
  }

  return (
    <div>
      <Header />
      <div className="search-container">
        <div className="search-left">
          <RadioGroup name="radioList">
            <FormGroup controlId="radioList">
              <p style={{fontSize: "1.8rem"}}>Type</p>
              <Radio value="A" onClick={userFilter}>Fast food</Radio>
              <Radio value="B">Sea food</Radio>
            </FormGroup>
          </RadioGroup>

          <FormGroup controlId="radioList">
            <RadioGroup name="radioList">
            <p style={{fontSize: "1.8rem"}}>Rating</p>
              <Radio value="5">
                <Rate defaultValue={5} allowHalf readOnly size="xs" />
              </Radio>
              <Radio value="4">
                <Rate defaultValue={4} allowHalf readOnly size="xs" />
              </Radio>
              <Radio value="3">
                <Rate defaultValue={3} allowHalf readOnly size="xs" />
              </Radio>
              <Radio value="2">
                <Rate defaultValue={2} allowHalf readOnly size="xs" />
              </Radio>
              <Radio value="1">
                <Rate defaultValue={1} allowHalf readOnly size="xs" />
              </Radio>
            </RadioGroup>
          </FormGroup>
        </div>
        <div className="search-right">
            <ListFood/>
        </div>
      </div>
    </div>
  );
};

export default Search;
