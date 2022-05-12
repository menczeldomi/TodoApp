import React from 'react';
import { Button, Card, Row, Col, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class TodoForm extends React.Component {
  render() {
    return (
      <Card>
        <Form onSubmit={this.props.handleSubmit} className="form my-2 mx-3">
          <Row>
            <Form.Group as={Col} controlId="formTitle">
              <Form.Label className="my-0">Todo Title</Form.Label>
              <Form.Control required type="text" onChange={this.props.handleTitleChange} value={this.props.title} placeholder="Enter the Todo's title" />
            </Form.Group>
            <Form.Group as={Col} controlId="formDeadline">
              <Form.Label className="my-0">Deadline</Form.Label>
              <Form.Control required type="text" onChange={this.props.handleDeadlineChange} value={this.props.deadline} placeholder="Enter the deadline" />
            </Form.Group>
            <Form.Group as={Col} controlId="formStatus">
              <Form.Label className="my-0">Status</Form.Label>
              <Form.Select onChange={this.props.handleStatusChange} value={this.props.status}>
                <option value="Todo">Todo</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
                <option value="Inactive">Inactive</option>
              </Form.Select>
            </Form.Group>
          </Row>
          <Row className="my-2">
            <Form.Group as={Col} controlId="formDescription">
              <Form.Label className="my-0">Description</Form.Label>
              <Form.Control as="textarea" rows={2} onChange={this.props.handleDescriptionChange} value={this.props.description} placeholder="Description (optional)" />
            </Form.Group>
          </Row>
          <Button variant="primary" type="submit">Add Todo</Button>
        </Form>
      </Card>
    );
  }
}

export default TodoForm;
