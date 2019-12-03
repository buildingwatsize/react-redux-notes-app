import React from 'react'
import { connect } from 'react-redux'
import { addNote, addTag, removeTag } from '../redux/actions/actions'

import { Card, Typography, Button, Input, Form, Select, DatePicker, List } from 'antd'
const { Option } = Select
class NoteForm extends React.Component {
  state = {
    title: "",
    content: "",
    tags: [],
    dueDate: null,
    tagMode: false,
    tagname: ""
  }

  toggleMode = (e) => {
    this.setState((state) => ({ tagMode: !state.tagMode }))
  }

  handleChange = (name) => (e) => {
    this.setState({
      [name]: e.target.value
    })
  }

  handleSelectTags = (tags) => {
    this.setState({
      tags
    })
  }

  onChangeDatePicker = (valueMoment, dateString) => {
    // console.log('Selected Time: ', valueMoment);
    // console.log('Formatted Selected Time: ', dateString);
    this.setState({
      dueDate: valueMoment
    })
  }

  handleSubmitForm = (e) => {
    e.preventDefault()
    if (this.state.title !== "" && this.state.content !== "") {
      this.props.addNote(this.state.title, this.state.content, this.state.tags, this.state.dueDate ? this.state.dueDate.format() : "")
      this.setState({
        title: "",
        content: "",
        tags: [],
        dueDate: null
      })
    }
  }

  handleSubmitTagForm = (e) => {
    e.preventDefault()
    if (this.state.tagname !== "") {
      this.props.addTag(this.state.tagname)
      this.setState({ tagname: "" })
    }
  }

  render() {
    return (
      <Card className="fullWidth">
        {this.state.tagMode ?
          <>
            <Typography.Title level={3}>Configuration <Button onClick={this.toggleMode} style={{ float: "right" }}>Back</Button></Typography.Title>
            <Typography.Title level={4}>Add Tag</Typography.Title>
            <Form onSubmit={this.handleSubmitTagForm}>
              <Form.Item label="Tag Name:">
                <Input
                  type="text"
                  value={this.state.tagname}
                  onChange={this.handleChange("tagname")}
                  placeholder="Input Tag Name"
                />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" disabled={this.state.tagname === ""}>Add Tag</Button>
              </Form.Item>
            </Form>

            <Typography.Title level={4}>Tag List</Typography.Title>
            <List
              bordered
              size="small"
              dataSource={this.props.tags}
              renderItem={item => (
                <List.Item
                  key={item.id}
                  actions={[
                    <Button type="danger" onClick={() => this.props.removeTag(item.id)} shape="circle" icon="delete" />
                  ]}
                >
                  <List.Item.Meta title={item.tagname} />
                </List.Item>
              )}
            />
          </>
          : <>
            <Typography.Title level={3}>Add a Note <Button onClick={this.toggleMode} style={{ float: "right" }}>Configuration</Button></Typography.Title>
            <Form onSubmit={this.handleSubmitForm}>
              <Form.Item label="Title:">
                <Input
                  type="text"
                  value={this.state.title}
                  onChange={this.handleChange("title")}
                  placeholder="Input Title"
                />
              </Form.Item>

              <Form.Item label="Content:">
                <Input.TextArea
                  value={this.state.content}
                  onChange={this.handleChange("content")}
                  placeholder="Input Content"
                  autoSize={{ minRows: 5, maxRows: 5 }}
                />
              </Form.Item>

              <Form.Item label="Tags: (Optional)">
                <Select
                  showSearch
                  mode="multiple"
                  placeholder="Select Tag(s)"
                  optionFilterProp="children"
                  onChange={this.handleSelectTags}
                  value={this.state.tags}
                  filterOption={(input, option) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {this.props.tags.map((item) => (
                    <Option key={item.id} value={item.tagname}>{item.tagname}</Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item label="Due Date: (Optional)">
                <DatePicker showTime placeholder="Select Time" onChange={this.onChangeDatePicker} value={this.state.dueDate} />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" disabled={this.state.title === "" || this.state.content === ""}>Add Note</Button>
              </Form.Item>

            </Form>
          </>
        }
      </Card>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    tags: state.tags,
  }
}

const mapDispatchToProps = {
  addNote: addNote,
  addTag: addTag,
  removeTag: removeTag
}

export default connect(mapStateToProps, mapDispatchToProps)(NoteForm)