import React from 'react';
import logo from './logo.svg';
import './App.css';
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Word from "./Word";

function App() {
  return (
    <Container fluid='lg'>
      <Row>
        <Col lg={8}>
          <h4 className='dict-header'>
            Words
          </h4>
          <Word/>
          <hr/>
          <Word/>
        </Col>
        <Col lg={4}>
          <h4 className='dict-header'>
            Kanji
          </h4>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
