import React from 'react'
import { connect } from 'react-redux'
import { removeNote, restoreNote, showActiveNotes, showDeletedNotes } from '../redux/actions/actions'

import { Card, Typography, Button, List, Tag, Drawer, Checkbox, Row, Divider, Col, Icon, Input } from 'antd'

class NotesList extends React.Component {
  state = {
    visible: false,
    tagSelectedList: this.props.tags,
    indeterminate: false,
    checkAll: true,
    search: ""
  }

  handleClickShowEdit = (id) => (e) => {
    // this.props.editNote(id, title, content, tags, due_date)
  }

  handleClickSaveEdit = (id) => (e) => {
    // this.props.editNote(id, title, content, tags, due_date)
  }

  handleClickRemove = (id) => (e) => {
    this.props.removeNote(id)
  }

  handleClickRestore = (id) => (e) => {
    this.props.restoreNote(id)
  }

  handleSearch = (e) => {
    this.setState({ search: e.target.value })
  }

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  onChangeFilter = tagSelectedList => {
    let newTagSelectedList = this.props.tags.filter(tag => tagSelectedList.indexOf(tag.tagname) > -1)
    this.setState({
      tagSelectedList: newTagSelectedList,
      indeterminate: !!tagSelectedList.length && tagSelectedList.length < this.props.tags.length,
      checkAll: tagSelectedList.length === this.props.tags.length,
    })
  };

  onCheckAllFilter = e => {
    let newTagSelectedList = e.target.checked ? this.props.tags : []
    this.setState({
      tagSelectedList: newTagSelectedList,
      indeterminate: false,
      checkAll: e.target.checked,
    })
  };

  onResetFilter = (e) => {
    this.setState({
      tagSelectedList: this.props.tags,
      indeterminate: false,
      checkAll: true,
    })
  }

  componentDidUpdate(prevProps) {
    if (prevProps.tags !== this.props.tags) {
      this.setState({
        tagSelectedList: this.props.tags,
        indeterminate: false,
        checkAll: true,
      })
    }
  }

  render() {
    let visibility = this.props.visibility
    let noteData = this.props.notes.filter((note) => (note.status === visibility && this.state.tagSelectedList.filter((tag) => (note.tags.indexOf(tag.tagname) > -1)).length > 0))
    noteData.sort((a, b) => (b.created_at.localeCompare(a.created_at)))

    let notes
    if (this.state.search !== "") {
      let searchText = this.state.search.toLowerCase()
      notes = noteData.slice().filter((note) => note.title.toLowerCase().includes(searchText) || note.content.toLowerCase().includes(searchText))
    } else {
      notes = noteData.slice()
    }

    return (
      <Card style={{ minHeight: "600px" }}>
        <Typography.Title level={3}>Notes</Typography.Title>
        <Button.Group>
          <Button type={visibility === "ACTIVE" ? "primary" : "ghost"} onClick={this.props.showActiveNotes}>Show Active Notes</Button>
          <Button type={visibility !== "ACTIVE" ? "primary" : "ghost"} onClick={this.props.showDeletedNotes}>Show Deleted Notes</Button>
        </Button.Group>
        <Button.Group style={{ float: "right" }}>
          <Input
            placeholder="input search text"
            onChange={this.handleSearch}
            style={{
              width: "auto",
              borderRight: 0,
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0
            }} />
          <Button
            type="primary"
            onClick={this.showDrawer}
          >
            <Icon type="filter" theme={(this.state.checkAll) ? "" : "filled"} />
            Filter
          </Button>
        </Button.Group>

        <List
          bordered
          size="small"
          dataSource={notes}
          renderItem={item => (
            <List.Item
              key={item.id}
              actions={[
                <span>{item.created_at}</span>,
                <Button type="ghost" onClick={this.handleClickShowEdit(item.id)} shape="circle" icon="edit" />,
                item.status === "ACTIVE" ?
                  <Button type="danger" onClick={this.handleClickRemove(item.id)} shape="circle" icon="delete" />
                  : <Button type="primary" onClick={this.handleClickRestore(item.id)} shape="circle" icon="undo" />
              ]}
            >
              <List.Item.Meta
                title={<div>
                  <div>{item.title} {item.due_date && <Tag color="red">Due Date: {item.due_date}</Tag>}</div>
                </div>}
                description={<>
                  <strong>
                    Tags: {item.tags.map((tag) => (
                      <Tag key={tag} color="blue">{tag}</Tag>
                    ))}
                  </strong>
                  <div>{item.content}</div>
                </>}
              />
            </List.Item>
          )}
        />

        <Drawer
          title="Filter"
          placement="right"
          onClose={this.onClose}
          visible={this.state.visible}
          width={"33%"}
        >
          <Row>
            <Checkbox
              indeterminate={this.state.indeterminate}
              onChange={this.onCheckAllFilter}
              checked={this.state.checkAll}
            >
              Select all
            </Checkbox>
          </Row>

          <Divider />

          <Row>
            <Checkbox.Group style={{ width: '100%' }} onChange={this.onChangeFilter} value={this.state.tagSelectedList.map(tag => tag.tagname)}>
              <Row>
                {this.props.tags.map((item) => {
                  return (
                    <Col key={item.id} span={24}>
                      <Checkbox value={item.tagname}>{item.tagname}</Checkbox>
                    </Col>
                  )
                })}
              </Row>
            </Checkbox.Group>
          </Row>

          <Row
            style={{
              position: 'absolute',
              right: 0,
              bottom: 0,
              width: '100%',
              borderTop: '1px solid #e9e9e9',
              padding: '10px 16px',
              background: '#fff',
              textAlign: 'right',
            }}
          >
            <Button type="danger" onClick={this.onResetFilter} style={{ marginRight: 8, float: "left" }} icon={'reload'}>
              Reset
            </Button>
            <Button onClick={this.onClose} style={{ marginRight: 8 }}>
              Close
            </Button>
          </Row>
        </Drawer>

      </Card>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    tags: state.tags,
    notes: state.notes,
    visibility: state.visibility
  }
}

const mapDispatchToProps = {
  removeNote: removeNote,
  restoreNote: restoreNote,
  showActiveNotes: showActiveNotes,
  showDeletedNotes: showDeletedNotes
}

export default connect(mapStateToProps, mapDispatchToProps)(NotesList)