import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Content,
  Dropdown,
  Footer,
  Header,
  Icon,
  Nav,
  Navbar,
  Sidebar,
  Sidenav,
} from "rsuite";

const RestaurantLayout = ({ children }) => {
  const headerStyles = {
    padding: 18,
    fontSize: 16,
    height: 56,
    background: "#34c3ff",
    color: " #fff",
    whiteSpace: "nowrap",
    overflow: "hidden",
  };

  const iconStyles = {
    width: 56,
    height: 56,
    lineHeight: "56px",
    textAlign: "center",
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
              <Link to="/restaurant/setting">
                <Dropdown.Item>Settings</Dropdown.Item>
              </Link>
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

  const [expand, setExpand] = useState(true);

  const handleToggle = () => {
    setExpand((p) => !p);
  };

  return (
    <Container style={{ height: "100vh" }}>
      <Sidebar
        style={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "white",
          justifyContent: "space-between",
        }}
        width={expand ? 260 : 56}
        collapsible
      >
        <Sidenav expanded={expand} defaultOpenKeys={["3"]} appearance="subtle">
          <Sidenav.Header>
            <div style={headerStyles}>
              <Icon
                icon="logo-analytics"
                size="lg"
                style={{ verticalAlign: 0 }}
              />
              <span style={{ marginLeft: 12 }}> myFood admin</span>
            </div>
          </Sidenav.Header>
          <Sidenav.Body>
            <Nav>
              <Link to="/restaurant/"  >
                <Nav.Item eventKey="1"   icon={<Icon icon="dashboard" />}>
                  Home
                </Nav.Item>
              </Link>
              <Link to="/admin/restaurant">
                <Nav.Item eventKey="1" icon={<Icon icon="book2" />}>
                  Restaurant reported
                </Nav.Item>
              </Link>
              <Link to="/restaurant/post">
                <Nav.Item eventKey="2" icon={<Icon icon="order-form" />}>
                Review post reported
                </Nav.Item>
              </Link>
      
          
            </Nav>
          </Sidenav.Body>
        </Sidenav>
        <NavToggle expand={expand} onChange={handleToggle} />
      </Sidebar>
      <Container>
        <Header>
        </Header>
        <Content>{children}</Content>
        <Footer></Footer>
      </Container>
    </Container>
  );
};

export default RestaurantLayout;
