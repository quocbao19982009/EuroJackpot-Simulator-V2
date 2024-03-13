using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    /// <inheritdoc />
    public partial class changeGameEntity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Games_Lotteries_ResultLotteryId",
                table: "Games");

            migrationBuilder.AlterColumn<int>(
                name: "ResultLotteryId",
                table: "Games",
                type: "INTEGER",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "INTEGER");

            migrationBuilder.AddForeignKey(
                name: "FK_Games_Lotteries_ResultLotteryId",
                table: "Games",
                column: "ResultLotteryId",
                principalTable: "Lotteries",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Games_Lotteries_ResultLotteryId",
                table: "Games");

            migrationBuilder.AlterColumn<int>(
                name: "ResultLotteryId",
                table: "Games",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "INTEGER",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Games_Lotteries_ResultLotteryId",
                table: "Games",
                column: "ResultLotteryId",
                principalTable: "Lotteries",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
