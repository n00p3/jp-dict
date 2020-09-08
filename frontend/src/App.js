import React from 'react';
import logo from './logo.svg';
import './App.css';
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Word from "./Word";
import Kanji from "./Kanji";
import * as _ from 'lodash';
import RestHelper from "./RestHelper";

class App extends React.Component {
  state = {
    searchInputRef: null,
    searchInputValue: '',
  }

  constructor(props) {
    super(props);
    this.state.searchInputRef = React.createRef();

    this.searchInputChangedDebounced = _.debounce(this.searchInputChanged, 500).bind(this);
  }

  searchInputChanged() {
    RestHelper.getAll(this.state.searchInputRef.current.value)
      .then(n => n.json())
      .then(n => console.log(n))
  }

  render() {
    return (
      <Container fluid='lg'>
        <Row style={{marginTop: '5em'}}>
          <Form style={{width: '100%'}}>
            <Form.Group>
              <Form.Control
                type='input'
                placeholder='Search anything...'
                onChange={this.searchInputChangedDebounced}
                ref={this.state.searchInputRef}
              />
            </Form.Group>
          </Form>
        </Row>
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
            <Kanji/>
            <hr/>
            <Kanji/>
            <hr/>
            <Kanji/>
            <hr/>
            <Kanji/>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;
