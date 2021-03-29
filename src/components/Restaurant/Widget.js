import React from "react";
import { Icon } from "rsuite";

const Widget = () => {
  const WidgetItem = () => {
    return <div></div>;
  };

  return (
    <div>
      <div className="widget-header">
        <div className="widget-list">
          <span className="widget-item">
            <span className="widget-item-header">Total vist</span>
            <span className="widget-item-footer">
              <Icon icon="bar-chart" />
              200
            </span>
          </span>
          <span className="widget-item">
            <span className="widget-item-header">Total vist</span>
            <span className="widget-item-footer">
              <Icon icon="bar-chart" />
              200
            </span>
          </span>
          <span className="widget-item">
            <span className="widget-item-header">Total vist</span>
            <span className="widget-item-footer">
              <Icon icon="bar-chart" />
              200
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Widget;
