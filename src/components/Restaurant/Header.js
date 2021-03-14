import React from "react";
import { Link } from "react-router-dom";
import { Button, ButtonGroup, Dropdown, Icon, IconButton } from "rsuite";

const Header = () => {
  return (
    <nav className="rcontainer">
      <div className="rheader-container">
        <div className="rheader-left">
          <ul>
            <li className="rbtn active">
              <Icon icon="home" />
              <Link to="/restaurant">Home</Link>
            </li>
            <li className="rbtn">
              <Icon icon="home" />
              <Link to="/restaurant/oder">Home</Link>
            </li>
            <li className="rbtn">
              <Icon icon="home" />
              <Link to="/restaurant/processing">Processing</Link>
            </li>
            <li className="rbtn">
              <Icon icon="home" />
              <span>Home</span>
            </li>
          </ul>
        </div>
        <div className="rheader-right">
          <div className="rbtn">
            <ButtonGroup>
              <Button>Setting</Button>
              <Dropdown
                placement="bottomEnd"
                renderTitle={() => {
                  return <IconButton icon={<Icon icon="cog" />} />;
                }}
              >
                <Dropdown.Item icon={<Icon icon="save" />}>
                  Save as...
                </Dropdown.Item>
                <Dropdown.Item icon={<Icon icon="save" />}>
                  Save & New
                </Dropdown.Item>
              </Dropdown>
            </ButtonGroup>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
