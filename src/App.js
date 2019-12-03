import React, { Component } from 'react'
import { Layout, Typography, Row, Col } from 'antd'
import './App.css'

import NoteForm from './components/NoteForm'
import NotesList from './components/NotesList'

export class App extends Component {
  render() {
    return (
      <div className="App">
        <Layout>
          <Typography.Title style={{ textAlign: "center" }}>React-Redux Notes app</Typography.Title>
          <Row>
            <Col span={16} style={{ paddingLeft: "1em", paddingRight: "0.5em" }}>
              <NotesList />
            </Col>
            <Col span={8} className="justifyCenter" style={{ paddingRight: "1em", paddingLeft: "0.5em" }}>
              <NoteForm />
            </Col>
          </Row>
        </Layout>
      </div>
    )
  }
}

export default App
