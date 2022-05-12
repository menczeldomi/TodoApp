using Microsoft.EntityFrameworkCore;

namespace TodoApi.Models
{
    public class TodoContext : DbContext
    {
        public TodoContext(DbContextOptions<TodoContext> options)
            : base(options)
        {
        }

        public DbSet<Todo> Todos => Set<Todo>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Todo>(entity =>
            {
                entity.HasData(
                    new Todo { Id = 1, Index = 0, Title = "First Todo", Deadline = "Tomorow", Status = "Todo" },
                    new Todo { Id = 2, Index = 0, Title = "Second Todo", Deadline = "Today", Status = "In Progress" });
        });
        }
    }
}
