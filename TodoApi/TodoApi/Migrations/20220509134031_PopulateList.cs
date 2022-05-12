using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TodoApi.Migrations
{
    public partial class PopulateList : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Todos",
                columns: new[] { "Id", "Deadline", "Description", "Status", "Title" },
                values: new object[,]
                {
                    { 1, "Tomorow", null, "Todo", "First Todo" },
                    { 2, "Today", null, "In Progress", "Second Todo" },
                    { 3, "05-15", null, "Todo", "Third Todo" },
                    { 4, "Monday", null, "Done", "Fourth Todo" }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Todos",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Todos",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Todos",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Todos",
                keyColumn: "Id",
                keyValue: 4);
        }
    }
}
