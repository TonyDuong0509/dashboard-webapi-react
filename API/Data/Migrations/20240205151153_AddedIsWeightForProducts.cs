using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddedIsWeightForProducts : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsGone",
                table: "Products");

            migrationBuilder.AddColumn<bool>(
                name: "isWeighed",
                table: "Products",
                type: "INTEGER",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "isWeighed",
                table: "Products");

            migrationBuilder.AddColumn<string>(
                name: "IsGone",
                table: "Products",
                type: "TEXT",
                nullable: true);
        }
    }
}
