using TodoApi.Models;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<TodoContext>(
    options => options.UseSqlServer(
        builder.Configuration.GetConnectionString(nameof(TodoContext))));

builder.Services.AddCors(c =>
{
    c.AddPolicy("AllowOrigin", opt => opt.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowOrigin");

app.UseAuthorization();

app.MapControllers();

app.Run();
