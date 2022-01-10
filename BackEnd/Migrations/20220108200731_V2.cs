using Microsoft.EntityFrameworkCore.Migrations;

namespace BackEnd.Migrations
{
    public partial class V2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Username",
                table: "Games",
                type: "nvarchar(60)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Games_Username",
                table: "Games",
                column: "Username");

            migrationBuilder.AddForeignKey(
                name: "FK_Games_Users_Username",
                table: "Games",
                column: "Username",
                principalTable: "Users",
                principalColumn: "Username",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Games_Users_Username",
                table: "Games");

            migrationBuilder.DropIndex(
                name: "IX_Games_Username",
                table: "Games");

            migrationBuilder.DropColumn(
                name: "Username",
                table: "Games");
        }
    }
}
