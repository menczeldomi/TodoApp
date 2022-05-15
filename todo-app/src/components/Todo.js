import React from 'react';
import { Card, Row, Col, Button, ButtonGroup, DropdownButton, Badge, Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function Todo({todo, todos, setTodos, sortTodos}) {
  
  function deleteTodo() {
    fetch('http://localhost:5084/api/Todo/'+todo.id, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    });
    const updatedTodos = [...todos];
    setTodos(updatedTodos.filter(t => t.id !== todo.id));
  }

  function updateStatus(newStatus) {
    const updatedTodos = [...todos];
    updatedTodos.find(t => t.id === todo.id).index = sortTodos(newStatus).length;
    updatedTodos.find(t => t.id === todo.id).status = newStatus;
    setTodos(updatedTodos);
    //updateTodo(updatedTodo);
  }

  function updateIndex(newIndex) {
    console.log(newIndex);
    if (newIndex >= 0 && newIndex <= sortTodos(todo.status).length - 1) {
      const updatedTodos = [...todos];
      updatedTodos.find(t => t.index === newIndex).index = todo.index;
      updatedTodos.find(t => t.id === todo.id).index = newIndex;
      setTodos(updatedTodos);
      //updateTodo(updatedTodo);
    }
  }

  function updateTodo(updatedTodo) {
    fetch("http://localhost:5084/api/Todo/"+todo.id, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        index: updatedTodo.index,
        title: updatedTodo.title,
        status: updatedTodo.status,
        deadline: updatedTodo.deadline,
        description: updatedTodo.description
      })
    })
  }

  return(
    <Card className="my-2">
      <Card.Header as="h5">
        <Row>
          <Col> {todo.title} <Badge pill bg="secondary">{todo.deadline}</Badge></Col>
        </Row>
        <Row className="my-1">
          <Col>
            <ButtonGroup size="sm">
              <Button variant="outline-secondary" onClick={() => updateIndex(todo.index - 1)}>Up</Button>
              <Button variant="outline-secondary" onClick={() => updateIndex(todo.index + 1)}>Down</Button>
              <Button variant="outline-secondary" onClick={deleteTodo}>Delete</Button>
              <DropdownButton variant="outline-secondary" as={ButtonGroup} title={todo.status} id="bg-nested-dropdown">
                <Dropdown.Item onClick={() => updateStatus("Todo")}>Todo</Dropdown.Item>
                <Dropdown.Item onClick={() => updateStatus("In Progress")}>In Progress</Dropdown.Item>
                <Dropdown.Item onClick={() => updateStatus("Done")}>Done</Dropdown.Item>
                <Dropdown.Item onClick={() => updateStatus("Inactive")}>Inactive</Dropdown.Item>
              </DropdownButton>
            </ButtonGroup>
          </Col>
        </Row>
      </Card.Header>
      <Card.Body>
        <Card.Text>{todo.description}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Todo;
