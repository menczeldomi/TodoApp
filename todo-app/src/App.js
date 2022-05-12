import React from 'react';
import { Container, Card, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      id: 0,
      title: "",
      status: "Todo",
      deadline: "",
      description: ""
    };
  }

  componentDidMount() {
    fetch("http://localhost:5084/api/Todo")
      .then(res => res.json())
      .then(
        (result) => {
          const updatedTodos = this.state.todos;
          result.forEach(todo => {
            const newTodo = {
              id: todo.id,
              index: todo.index,
              title: todo.title,
              status: todo.status,
              deadline: todo.deadline,
              description: todo.description
            };
            updatedTodos.push(newTodo);
          });
          this.setState({todos: updatedTodos});
        }
      )
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const newTodo = {
      id: null,
      index: this.sortTodos(this.state.status).length,
      title: this.state.title,
      status: this.state.status,
      deadline: this.state.deadline,
      description: this.state.description
    };

    fetch("http://localhost:5084/api/Todo", {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        index: newTodo.index,
        title: newTodo.title,
        status: newTodo.status,
        deadline: newTodo.deadline,
        description: newTodo.description
      })
    })
    .then(res => res.json())
    .then((result) => {
      newTodo.id = result.id;
    })

    const updatedTodos = this.state.todos;
    updatedTodos.push(newTodo);

    this.setState({todos: updatedTodos});
    this.setState({title: ""});
    this.setState({status: "Todo"});
    this.setState({deadline: ""});
    this.setState({description: ""});
  }

  handleTitleChange = (event) => {
    this.setState({title: event.target.value});
  }
  handleStatusChange = (event) => {
    this.setState({status: event.target.value});
  }
  handleDeadlineChange = (event) => {
    this.setState({deadline: event.target.value});
  }
  handleDescriptionChange = (event) => {
    this.setState({description: event.target.value});
  }

  deleteTodo = (id) => {
    const updatedTodos = this.state.todos.filter((todo) => todo.id !== id);
    fetch('http://localhost:5084/api/Todo/'+id, { 
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    });
    this.setState({todos: updatedTodos});
  }

  updateStatus = (index, newStatus) => {
    const updatedTodos = this.state.todos;
    updatedTodos[index].status = newStatus;
    this.setState({todos: updatedTodos});

    const updatedTodo = this.state.todos[index];
    fetch("http://localhost:5084/api/Todo/"+updatedTodo.id, {
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

  sortTodos = (status) => {
    return this.state.todos.filter((todo) => todo.status === status);
  }

  orderByIndex = (todos) => {
    return todos.sort((a, b) => {
        return a.index - b.index;
      });
  }

  render() {
    return (
    <Container className="p-2 my-2">
      <Card className="my-2">
        <Card.Body><h1 className="text-center">To-Do App</h1></Card.Body>
      </Card>
      <TodoForm 
        handleSubmit={this.handleSubmit}
        handleTitleChange={this.handleTitleChange} title={this.state.title}
        handleStatusChange={this.handleStatusChange} status={this.state.status}
        handleDeadlineChange={this.handleDeadlineChange} deadline={this.state.deadline}
        handleDescriptionChange={this.handleDescriptionChange} description={this.state.description} />
      <Row>
        <Col lg={true}><TodoList name="Todos" todos={this.orderByIndex(this.sortTodos("Todo"))}></TodoList></Col>
        <Col lg={true}><TodoList name="In Progress" todos={this.orderByIndex(this.sortTodos("In Progress"))}></TodoList></Col>
        <Col lg={true}><TodoList name="Done" todos={this.orderByIndex(this.sortTodos("Done"))}></TodoList></Col>
        <Col lg={true}><TodoList name="Inactive" todos={this.orderByIndex(this.sortTodos("Inactive"))}></TodoList></Col>
      </Row>
    </Container>
    );
  }
}

export default App;