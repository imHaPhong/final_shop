import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Icon, Input, InputGroup } from "rsuite";
 import {addAmount, restaurantGetInfo} from '../../middlerware/restaurantMiddleware'
const Widget = ({isSetAmount= false, addAmount, restaurantGetInfo}) => {
  const WidgetItem = () => {
    return <div></div>;
  };
  const [valueSales, setValueSales] = useState({dailySales: 0, monthlySales: 0})

  const [amount, setAmount] = useState(isSetAmount)
  const [edit, setEdit] = useState(false)

  const addAmountx = async (index) => {
    if(index < 1) {
      addAmount({data: valueSales.dailySales, addIndex: 0})
    } else {
      addAmount({data: valueSales.monthlySales, addIndex: 1})

    }
  }

  useEffect(() => {
    const getData = async () =>{
      const data = await restaurantGetInfo()
      console.log(data);
      setValueSales({dailySales: data.setDailySales, monthlySales: data.setMonthSales})
    }
    getData()
  },[])

  return (
    <div>
      <div className="widget-header">
        <div className="widget-list">
          <span className="widget-item">
            <span className="widget-item-header">Daily visit</span>
            <span className="widget-item-footer">
              <Icon icon="bar-chart" />
              200
            </span>
          </span>

          <span className="widget-item">
            <span className="widget-item-header">Total visit</span>
            <span className="widget-item-footer">
              <Icon icon="bar-chart" />
        <span>
              300
        </span>
            </span>
          </span>

      
          <span className="widget-item">
            <span className="widget-item-header">Daily Salse</span>
            <span className="widget-item-footer">
              <Icon icon="bar-chart" />
        <span>
        {/* <Icon style={{fontSize: "2rem", marginLeft: "2rem"}} icon="edit2"/> */}
        {valueSales.dailySales !== 0 ? <>  20,000 / <span style={{fontSize: "3rem"}}>{valueSales.dailySales} đ</span>  </> :     <div className="amount">
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
        {valueSales.monthlySales !== 0 && <>  20.000đ/ <span style={{fontSize: "3rem"}}>{valueSales.monthlySales} đ</span></> }
        {valueSales.monthlySales === 0 && <div className="amount">
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

export default connect(null, {addAmount, restaurantGetInfo})(Widget);
