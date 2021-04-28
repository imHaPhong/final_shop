import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useLocation, useParams } from "react-router";
import {
  Checkbox,
  CheckboxGroup,
  FormGroup,
  Radio,
  RadioGroup,
  Rate,
} from "rsuite";
import FoodItem from "../../components/Share/FoodItem";
import Header from "../../components/User/Header";
import ListFood from "../../components/User/ListFood";
import {userSearch} from '../../middlerware/userMiddlerware'

const Search = ({userSearch}) => {
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  const [listMenu, setListMenu] = useState([])
  const [filter, setFyilter] = useState({type: null, rating: null})

  const { id } = useParams();
  const query = useQuery();
  const location = useLocation();

  useEffect(() => {
    const getData = async () => {
      setListMenu([]);

      console.log( );
      const data = await userSearch({restaurantName: query.get("q"), type: filter.type,  rating: filter.rating})
      setListMenu(data);
    }
    getData()
  },[query.get("q"), filter])

  const userFilter = (by) => {
    switch (by){
      case "x@gmail.com":
        setFyilter(p => ({...p, type: by}))
        return
      case "c@gmail.com":
        setFyilter(p => ({...p, type: by}))
        return
      case "ratingLv1":
        setFyilter(p => ({...p, rating: 5}))
        return
      case "ratingLv2":
        setFyilter(p => ({...p, rating: 4}))
        return
      case "ratingLv3":
        setFyilter(p => ({...p, rating: 3}))
        return
      case "ratingLv4":
        setFyilter(p => ({...p, rating: 2}))
        return
      case "ratingLv5":
        setFyilter(p => ({...p, rating: 1}))
        return
    }
  }

  return (
    <div>
      <Header />
      <div className="search-container">
        <div className="search-left">
          <RadioGroup name="radioList">
            <FormGroup controlId="radioList">
              <p style={{fontSize: "1.8rem"}}>Type</p>
              <Radio value="A" onClick={() => userFilter("x@gmail.com")}>Fast food</Radio>
              <Radio value="B" onClick={() => userFilter("c@gmail.com")}>Sea food</Radio>
            </FormGroup>
          </RadioGroup>

          <FormGroup controlId="radioList">
            <RadioGroup name="radioList">
            <p style={{fontSize: "1.8rem"}}>Rating</p>
              <Radio value="5">
                <Rate defaultValue={5} allowHalf readOnly size="xs"  onClick={() => userFilter("ratingLv1")}/>
              </Radio>
              <Radio value="4">
                <Rate defaultValue={4} allowHalf readOnly size="xs"  onClick={() => userFilter("ratingLv2")}/>
              </Radio>
              <Radio value="3">
                <Rate defaultValue={3} allowHalf readOnly size="xs"  onClick={() => userFilter("ratingLv3")}/>
              </Radio>
              <Radio value="2">
                <Rate defaultValue={2} allowHalf readOnly size="xs"  onClick={() => userFilter("ratingLv4")}/>
              </Radio>
              <Radio value="1">
                <Rate defaultValue={1} allowHalf readOnly size="xs"  onClick={() => userFilter("ratingLv5")}/>
              </Radio>
            </RadioGroup>
          </FormGroup>
        </div>
        <div className="search-right">
        <div className="food-list">
        {listMenu.length >= 0 &&
          listMenu.map((el, index) => {
            return <FoodItem key={index} restaurantData={el} />;
          })}
       
      </div>
      {listMenu.length === 0 && 
          <div style={{width:"100wh", display:"flex", alignItems: "center",justifyContent:"center", flexDirection: "column"}}>
             <h1>Not found</h1>
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNVmu7c2ZKKjzucqbhiR41QCHRmRqW41vlAQ&usqp=CAU" alt=""/>
         </div>}
        </div>
      </div>
    </div>
  );
};

export default connect(null, {userSearch})(Search);
