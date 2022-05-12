using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TodoApi.Migrations
{
    public partial class IndexChange : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Todos",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Todos",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.AddColumn<int>(
                name: "Index",
                table: "Todos",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Index",
                table: "Todos");

            migrationBuilder.InsertData(
                table: "Todos",
                columns: new[] { "Id", "Deadline", "Description", "Status", "Title" },
                values: new object[] { 3, "05-15", null, "Todo", "Third Todo" });

            migrationBuilder.InsertData(
                table: "Todos",
                columns: new[] { "Id", "Deadline", "Description", "Status", "Title" },
                values: new object[] { 4, "Monday", null, "Done", "Fourth Todo" });
        }
    }
}
