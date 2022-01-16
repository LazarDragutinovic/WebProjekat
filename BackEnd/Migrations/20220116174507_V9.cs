using Microsoft.EntityFrameworkCore.Migrations;

namespace BackEnd.Migrations
{
    public partial class V9 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Achivment_Users_UserID",
                table: "Achivment");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Achivment",
                table: "Achivment");

            migrationBuilder.RenameTable(
                name: "Achivment",
                newName: "Achivments");

            migrationBuilder.RenameIndex(
                name: "IX_Achivment_UserID",
                table: "Achivments",
                newName: "IX_Achivments_UserID");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Achivments",
                table: "Achivments",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Achivments_Users_UserID",
                table: "Achivments",
                column: "UserID",
                principalTable: "Users",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Achivments_Users_UserID",
                table: "Achivments");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Achivments",
                table: "Achivments");

            migrationBuilder.RenameTable(
                name: "Achivments",
                newName: "Achivment");

            migrationBuilder.RenameIndex(
                name: "IX_Achivments_UserID",
                table: "Achivment",
                newName: "IX_Achivment_UserID");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Achivment",
                table: "Achivment",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Achivment_Users_UserID",
                table: "Achivment",
                column: "UserID",
                principalTable: "Users",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
