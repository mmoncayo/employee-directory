import React from 'react';
import { Jumbotron, Container } from "react-bootstrap";
import "./style.css";

function Header() {
  return (
    <header>
      <Jumbotron className="header-background" >
      <Container className="text-center">
        <h1>Employee Directory</h1>
      </Container>
      </Jumbotron>
      <h3 className="text-center">Search Employees by Name</h3>
    </header>
  );
}

export default Header;