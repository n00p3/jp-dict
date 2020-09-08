import React from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Badge from "react-bootstrap/Badge";
import './Kanji.css';

export default class Kanji extends React.Component {
  render() {
    return (
      <Container>
        <Row>
          <Col lg={4}>
            <Row>
              <span className='kanji'>字</span>
            </Row>
            <Row>
              <Badge className='word-badge' variant='primary'>
                Common word
              </Badge>
              <Badge className='word-badge' variant='primary'>
                Common word
              </Badge>
              <Badge className='word-badge' variant='primary'>
                Common word
              </Badge>
            </Row>
          </Col>
          <Col>
            character, letter, word, section of village
            <dl>
              <dt>Onyomi</dt>
              <dd>あざ、 あざな、 -な</dd>
              <dt>Kunyomi</dt>
              <dd>ジ</dd>
            </dl>
          </Col>
        </Row>
      </Container>
    )
  }
}