import React from "react";
import { Icon } from "rsuite";

const AdminWidget = () => {
  const WidgetItem = () => {
    return <div></div>;
  };

  return (
    <div>
      <div className="widget-header">
        <div className="widget-list">
          <span className="widget-item">
            <span className="widget-item-header">Number restaurant</span>
            <span className="widget-item-footer">
              <Icon icon="bar-chart" />
              20
            </span>
          </span>

          <span className="widget-item">
            <span className="widget-item-header">Create new</span>
            <span className="widget-item-footer">
              <Icon icon="bar-chart" />
        <span>
              5
        </span>
            </span>
          </span>

          <span className="widget-item">
            <span className="widget-item-header">Daily revenue</span>
            <span className="widget-item-footer">
              <Icon icon="bar-chart" />
        <span>
        40,000 / <span style={{fontSize: "3rem"}}>250,000 đ</span>

        </span>
            </span>
          </span>
          
          <span className="widget-item">
            <span className="widget-item-header">Month revenue</span>
            <span className="widget-item-footer">
              <Icon icon="bar-chart" />
        <span>
        360,000 / <span style={{fontSize: "3rem"}}>7000,000 đ</span>

        </span>
            </span>
          </span>
         
        </div>
      </div>
    </div>
  );
};

export default AdminWidget;
