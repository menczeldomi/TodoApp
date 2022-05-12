import React from 'react';
import { Button, ButtonGroup, DropdownButton, Dropdown, Card, Badge, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class TodoList extends React.Component {
  render() {
    return (
      <Card className="my-2">
        <Card.Header>
          <h5>
            {this.props.name} <Badge bg="secondary">{this.props.todos.length}</Badge>
          </h5>
        </Card.Header>
        <Card.Body>
          {this.props.todos.map((todo) => 
            <Card className="my-2">
              <Card.Header as="h5">
                <Row>
                  <Col> {todo.title} <Badge pill bg="secondary">{todo.deadline}</Badge></Col>
                </Row>
                <Row className="my-1">
                  <Col>
                    <ButtonGroup size="sm">
                      <Button variant="outline-secondary">Up</Button>
                      <Button variant="outline-secondary">Down</Button>
                      <Button variant="outline-secondary">Delete</Button>
                      <DropdownButton variant="outline-secondary" as={ButtonGroup} title={todo.status} id="bg-nested-dropdown">
                        <Dropdown.Item>ToDo</Dropdown.Item>
                        <Dropdown.Item>In Progress</Dropdown.Item>
                        <Dropdown.Item>Done</Dropdown.Item>
                        <Dropdown.Item>Inactive</Dropdown.Item>
                      </DropdownButton>
                    </ButtonGroup>
                  </Col>
                </Row>
              </Card.Header>
              <Card.Body>
                <Card.Text>{todo.description}</Card.Text>
              </Card.Body>
            </Card>
          )}
        </Card.Body>
      </Card>
    );
  }
}

export default TodoList;
