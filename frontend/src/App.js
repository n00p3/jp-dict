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
import Navbar from "react-bootstrap/Navbar";

class App extends React.Component {
  state = {
    searchInputRef: null,
    searchInputValue: '',
    words: [],
    kanji: [],
  }

  constructor(props) {
    super(props);
    this.state.searchInputRef = React.createRef();

    this.searchInputChangedDebounced = _.debounce(this.searchInputChanged, 500).bind(this);
  }

  searchInputChanged() {
    RestHelper.getAll(this.state.searchInputRef.current.value)
      .then(n => n.json())
      .then(n => {
        this.setState(() => ({
          words: n.words,
          kanji: n.kanji,
        }))
      })
  }

  render() {
    return (
      <>
        <Container fluid='lg'>
          <Row>
            <h1>Japanese Dictionary</h1>
          </Row>
          <Row>
            <Form style={{width: '100%'}}>
              <Form.Group>
                <Form.Control
                  type='input'
                  maxLength={200}
                  placeholder='Search anything...'
                  onChange={this.searchInputChangedDebounced}
                  ref={this.state.searchInputRef}
                />
              </Form.Group>
            </Form>
          </Row>
          <Row>
            {/*TODO: Tokenized sentence here*/}
          </Row>
          <Row>
            <Col lg={8}>
              <h4 className='dict-header'>
                Words
              </h4>
              {
                this.state.words.map((word, i) => {
                  return <React.Fragment key={'fragment-word-' + i}>
                    <Word
                      word={word}
                      key={'word-' + i}
                    />
                    <hr key={'hr-word-' + i}/>
                  </React.Fragment>
                })
              }
            </Col>
            <Col lg={4}>
              <h4 className='dict-header'>
                Kanji
              </h4>
              {
                this.state.kanji.map((kanji, i) => {
                  return <React.Fragment key={'fragment-kanji-' + i}>
                    <Kanji
                      kanji={kanji}
                      key={'kanji-' + i}
                    />
                    <hr key={'hr-kanji-' + i}/>
                  </React.Fragment>
                })
              }
            </Col>
          </Row>
        </Container>
        <div style={{height: '3em'}}>

        </div>
        <footer>
          <div className="fixed-bottom">
            <Navbar color="dark" dark>
              <Container>
                <Row style={{margin: 'auto'}}>
                  <Col md='auto'>
                    <p>This project uses JMDict and KANJIDIC which are under <a href='#' target='blank'>
                      Creative Commons Attribution-ShareAlike Licence (V3.0)
                      <br/>
                    </a> For more information check <a href='https://github.com/n00p3/jp-dict' target='blank'>project's
                      repository</a>
                    </p>
                  </Col>
                </Row>
              </Container>
            </Navbar>
          </div>
        </footer>
      </>
    );
  }
}

export default App;
