import React from "react";
import { Col, Row } from "react-bootstrap";

const employeeRow = (props) => {
  const { picture, firstName, lastName, email, cell } = props;
  const fullName = `${firstName} ${lastName}`;
  return (
    <React.Fragment>
      <Row className="border-bottom">
        <Col md lg="2">
          <img src={picture} alt={fullName + "portrait"} />
        </Col>
        <Col md lg="3" className="my-1">
          <span>{fullName}</span>
        </Col>
        <Col md lg="4" className="my-1">
          <span>{email}</span>
        </Col>
        <Col md lg="3" className="my-1">
          <span>{cell}</span>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default employeeRow;