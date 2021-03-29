import React, { useState } from "react";
import { Dropdown, Icon, Nav, Navbar, Sidenav } from "rsuite";
import Header from "../../components/Restaurant/Header";
import Menu from "../../components/Restaurant/Menu";

const RestaurantLayout = ({ children }) => {
  const [expand, setExpand] = useState(true);
  const iconStyles = {
    width: 56,
    height: 56,
    lineHeight: "56px",
    textAlign: "center",
  };

  const handleToggle = () => {
    setExpand((p) => !p);
  };

  const NavToggle = ({ expand, onChange }) => {
    return (
      <Navbar appearance="subtle" className="nav-toggle">
        <Navbar.Body>
          <Nav>
            <Dropdown
              placement="topStart"
              trigger="click"
              renderTitle={(children) => {
                return <Icon style={iconStyles} icon="cog" />;
              }}
            >
              <Dropdown.Item>Help</Dropdown.Item>
              <Dropdown.Item>Settings</Dropdown.Item>
              <Dropdown.Item>Sign out</Dropdown.Item>
            </Dropdown>
          </Nav>

          <Nav pullRight>
            <Nav.Item
              onClick={onChange}
              style={{ width: 56, textAlign: "center" }}
            >
              <Icon icon={expand ? "angle-left" : "angle-right"} />
            </Nav.Item>
          </Nav>
        </Navbar.Body>
      </Navbar>
    );
  };
  return (
    <div>
      <Header />
      <Sidenav
        style={{ display: "flex", flexDirection: "column" }}
        width={260}
        collapsible
      >
        <Sidenav.Body>
          <Nav>
            <Nav.Item eventKey="1" icon={<Icon icon="dashboard" />}>
              Dashboard
            </Nav.Item>
            <Nav.Item eventKey="2" icon={<Icon icon="user-analysis" />}>
              Dashboard
            </Nav.Item>
          </Nav>
        </Sidenav.Body>
        <NavToggle expand={expand} onChange={handleToggle} />
      </Sidenav>
      <div className="mt-3">{children}</div>
    </div>
  );
};

export default RestaurantLayout;
