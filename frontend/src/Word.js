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
              <span className='word'>
                  <ruby>
                      {this.props.word.word}
                    <rp>(</rp><rt>{this.props.word.reading}</rt><rp>)</rp>
                  </ruby>
              </span>
            </Row>
            {/*<Row>*/}
              {/*<Badge className='word-badge' variant='primary'>*/}
              {/*  Common word*/}
              {/*</Badge>*/}
            {/*</Row>*/}
            {/*<Row>*/}
            {/*  <Badge className='word-badge' variant='secondary'>*/}
            {/*    JLPT N5*/}
            {/*  </Badge>*/}
            {/*</Row>*/}
          </Col>
          <Col>
            <dl>
              {this.props.word.jmdict.map((jmdictEntry, i) => {
                return <React.Fragment key={'fragment-jmdict-' + i}>
                  <dt key={'dt-jmdict-' + i}>{jmdictEntry.position}</dt>
                  <dd key={'dd-jmdict-' + i}>
                    {jmdictEntry.gloss}
                  </dd>
                </React.Fragment>
              })
              }
            </dl>
          </Col>
        </Row>
      </Container>
    )
  }
}