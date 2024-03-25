using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    /// <inheritdoc />
    public partial class AddRelationUserWithGame : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "AppUserId",
                table: "Games",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Games_AppUserId",
                table: "Games",
                column: "AppUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Games_AspNetUsers_AppUserId",
                table: "Games",
                column: "AppUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Games_AspNetUsers_AppUserId",
                table: "Games");

            migrationBuilder.DropIndex(
                name: "IX_Games_AppUserId",
                table: "Games");

            migrationBuilder.DropColumn(
                name: "AppUserId",
                table: "Games");
        }
    }
}
