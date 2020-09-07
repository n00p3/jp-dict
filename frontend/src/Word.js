import React from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Badge from "react-bootstrap/Badge";
import './Word.css';

export default class Word extends React.Component {
  render() {
    return (
      <Container>
        <Row>
          <Col lg={2}>
            <Row>
              <span className='word'>漢字</span>
            </Row>
            <Row>
              <Badge className='word-badge' variant='primary'>
                Common word
              </Badge>
            </Row>
            <Row>
              <Badge className='word-badge' variant='secondary'>
                JLPT N5
              </Badge>
            </Row>
          </Col>
          <Col>
            <dl>
              <dt>Noun</dt>
              <dd>First word definition</dd>
              <dt>Noun</dt>
              <dd>Second word definition</dd>
            </dl>
          </Col>
        </Row>
      </Container>
    )
  }
}