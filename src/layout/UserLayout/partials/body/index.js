import React from "react";
import { connect } from "react-redux";
import { Col, Grid, Row } from "rsuite";
import Post from "../../../../components/Post";
import BodyLeft from "../bodyleft";
import BodyRight from "./bodyright";

const UserBody = ({ content }) => {
  return (
    <div className="container" style={{ position: "relative" }}>
      <Grid fluid>
        <Row gutter={26}>
          <Col smHidden={true} md={6}>
            <BodyLeft />
          </Col>
          <Col xs={24} sm={24} md={12}>
            <div className="boder">{content}</div>
          </Col>
          <Col xs={24} sm={24} md={6} smHidden={true}>
            <BodyRight />
          </Col>
        </Row>
      </Grid>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps)(UserBody);
