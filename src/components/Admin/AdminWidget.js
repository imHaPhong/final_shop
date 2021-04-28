import React, { useEffect, useState } from "react";
import NumberFormat from "react-number-format";
import { connect } from "react-redux";
import { Icon, Input, InputGroup } from "rsuite";
import {adminGetInfo, addAmount} from "../../middlerware/adminMiddlerware"

const AdminWidget = ({adminGetInfo, addAmount}) => {

  const [valueSales, setValueSales] = useState({dailySales: 0, monthlySales: 0})

  const [sales, setSales] = useState({dailySales: 0, monthlySales: 0})
  const [edit, setEdit] = useState(false)
  const [showEdit, setShowEdit] = useState({daily: true, monthly: true})
  const [vistor, setVistor] = useState({daily: 0, monthly: 0})

  const addAmountx = async (index) => {
    if(index < 1) {
      addAmount({data: valueSales.dailySales, addIndex: 0})
      setShowEdit(p => (
        {
          ...p,
          daily: false
        }
      ))
    } else {
      addAmount({data: valueSales.monthlySales, addIndex: 1})
      setShowEdit(p => (
        {
          ...p,
          monthly: false
        }
      ))
    }
  }

  useEffect(() => {
    const getData = async () =>{
      const data = await adminGetInfo()
      setValueSales({dailySales: data.info.setDailySales, monthlySales: data.info.setMonthSales})
      setSales({dailySales: data.info.dailySales, monthlySales: data.info.monthlySales})
      setShowEdit({
        daily:  data.info.setDailySales > 0 ? false : true,
        monthly: data.info.setMonthSales > 0 ? false : true,
      })
      setVistor({daily: data.createNew, monthly: data.totalRestaurant})
    }
    getData()
  },[])

  return (
    <div>
      <div className="widget-header">
        <div className="widget-list">
          <span className="widget-item">
            <span className="widget-item-header">New restaurant</span>
            <span className="widget-item-footer">
              <Icon icon="bar-chart" />
              {vistor.daily}
            </span>
          </span>

          <span className="widget-item">
            <span className="widget-item-header">Total restaurant</span>
            <span className="widget-item-footer">
              <Icon icon="bar-chart" />
        <span>
        {vistor.monthly}

        </span>
            </span>
          </span>

      
          <span className="widget-item">
            <span className="widget-item-header">Daily Salse</span>
            <span className="widget-item-footer">
              <Icon icon="bar-chart" />
        <span>
        {/* <Icon style={{fontSize: "2rem", marginLeft: "2rem"}} icon="edit2"/> */}
        {showEdit.daily === false ? <>    <NumberFormat value={sales.dailySales}  displayType={'text'} thousandSeparator={true}  /> / <span style={{fontSize: "3rem"}}> <NumberFormat value={valueSales.dailySales}  displayType={'text'} thousandSeparator={true}  />
đ</span>  </> :     <div className="amount">
    <InputGroup >
    <Input type="number" placeholder="Add amount" value={valueSales.dailySales} onChange={(e) => setValueSales(p => ({...p, dailySales: e}))} />
    <InputGroup.Button onClick={() => addAmountx('0')}>
      <Icon icon="check" />
    </InputGroup.Button>
  </InputGroup>
    </div> }

        </span>
            </span>
          </span>
          
          <span className="widget-item">
            <span className="widget-item-header">Month Salse</span>
            <span className="widget-item-footer">
              <Icon icon="bar-chart" />
        <span>
        {showEdit.monthly === false && <>  <NumberFormat value={sales.monthlySales}  displayType={'text'} thousandSeparator={true}  /> / <span style={{fontSize: "3rem"}}><NumberFormat value={valueSales.monthlySales}  displayType={'text'} thousandSeparator={true}  /> đ</span></> }
        {showEdit.monthly === true && <div className="amount">
    <InputGroup >
    <Input type="number" placeholder="Add amount" value={valueSales.monthlySales} onChange={(e) => setValueSales(p => ({...p, monthlySales: e}))} />
    <InputGroup.Button onClick={() => addAmountx('1')}>
      <Icon icon="check" />
    </InputGroup.Button>
  </InputGroup>
    </div>}

        </span>
            </span>
          </span>
       
         
        </div>
      </div>
    </div>
  );
};

export default connect(null, {adminGetInfo, addAmount})(AdminWidget);
