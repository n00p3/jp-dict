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
              <span className='kanji'>{this.props.kanji[0].literal}</span>
            </Row>
            <Row>
              <Badge className='word-badge' variant='primary'>
                JLPT {this.props.kanji[0].jlpt}
              </Badge>
              <Badge className='word-badge' variant='secondary'>
                Stroke count {this.props.kanji[0].strokecount}
              </Badge>
              <Badge className='word-badge' variant='secondary'>
                SKIP {this.props.kanji[0].skip1} {this.props.kanji[0].skip2} {this.props.kanji[0].skip3}
              </Badge>
            </Row>
          </Col>
          <Col>
            {this.props.kanji[0].meaning}
            <dl>
              {
                this.props.kanji[0].kunReading !== null && this.props.kanji[0].kunReading !== '' &&
                <>
                  <dt>Kunyomi</dt>
                  <dd>{this.props.kanji[0].kunReading}</dd>
                </>
              }
              {
                this.props.kanji[0].onReading !== null && this.props.kanji[0].onReading !== '' &&
                <>
                  <dt>Onyomi</dt>
                  <dd>{this.props.kanji[0].onReading}</dd>
                </>
              }
            </dl>
          </Col>
        </Row>
      </Container>
    )
  }
}