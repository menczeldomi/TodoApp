using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Collections.Generic;
using System.Threading.Tasks;
using TodoApi.Controllers;
using TodoApi.Models;

namespace TodoApi.Tests
{
    [TestClass]
    public class TestTodoApiController
    {
        private readonly TodoContext _context;
        private readonly TodoController _controller;

        public TestTodoApiController()
        {
            var connection = new SqliteConnection("DataSource=:memory:");
            connection.Open();
            var options = new DbContextOptionsBuilder<TodoContext>().UseSqlite(connection).Options;
            _context = new TodoContext(options);

            _context.Database.EnsureCreated();

            _context.Todos.Add(new Todo{ Id = 1, Title = "Todo1" });
            _context.Todos.Add(new Todo { Id = 2, Title = "Todo2" });
            _context.Todos.Add(new Todo { Id = 3, Title = "Todo3" });
            _context.SaveChangesAsync();

            _controller = new TodoController(_context);
        }

        [TestMethod]
        public void GetAllTodosTest()
        {
            var todos = _controller.GetTodos().Result.Value as List<Todo>;

            Assert.IsNotNull(todos);
            Assert.AreEqual(3, todos.Count);
        }

        [TestMethod]
        public void GetTodoByIdTest()
        {
            var todo1 = _controller.GetTodo(1).Result.Value;
            Assert.IsNotNull(todo1);
            Assert.AreEqual(1, todo1.Id);
            Assert.AreEqual("Todo1", todo1.Title);

            var todo2 = _controller.GetTodo(2).Result.Value;
            Assert.IsNotNull(todo2);
            Assert.AreEqual(2, todo2.Id);
            Assert.AreEqual("Todo2", todo2.Title);

            var todo3 = _controller.GetTodo(3).Result.Value;
            Assert.IsNotNull(todo3);
            Assert.AreEqual(3, todo3.Id);
            Assert.AreEqual("Todo3", todo3.Title);
        }

        [TestMethod]
        public async Task PostTodoTest()
        {
            await _controller.PostTodo(new Todo { Title = "Todo4" });

            var todos = _controller.GetTodos().Result.Value as List<Todo>;
            Assert.IsNotNull(todos);
            Assert.AreEqual(4, todos.Count);
        }

        [TestMethod]
        public async Task PutTodoByIdTest()
        {
            var todo1 = _controller.GetTodo(1).Result.Value;
            Assert.IsNotNull(todo1);
            todo1.Title = "ChangedTodo";
            await _controller.PutTodo(1, todo1);

            todo1 = _controller.GetTodo(1).Result.Value;
            Assert.IsNotNull(todo1);
            Assert.AreEqual(1, todo1.Id);
            Assert.AreEqual("ChangedTodo", todo1.Title);
        }

        [TestMethod]
        public async Task DeleteTodoByIdTest()
        {
            await _controller.DeleteTodo(1);

            var todos = _controller.GetTodos().Result.Value as List<Todo>;
            Assert.IsNotNull(todos);
            Assert.AreEqual(2, todos.Count);
            Assert.AreEqual(2, todos[0].Id);
            Assert.AreEqual(3, todos[1].Id);
        }

    }
}