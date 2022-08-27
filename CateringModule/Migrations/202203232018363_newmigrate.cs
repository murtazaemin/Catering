namespace CateringModule.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class newmigrate : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.FoodIngredients",
                c => new
                    {
                        food_id = c.Int(nullable: false),
                        ingredient_id = c.Int(nullable: false),
                    })
                .PrimaryKey(t => new { t.food_id, t.ingredient_id })
                .ForeignKey("dbo.Foods", t => t.food_id, cascadeDelete: true)
                .ForeignKey("dbo.Ingredients", t => t.ingredient_id, cascadeDelete: true)
                .Index(t => t.food_id)
                .Index(t => t.ingredient_id);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.FoodIngredients", "ingredient_id", "dbo.Ingredients");
            DropForeignKey("dbo.FoodIngredients", "food_id", "dbo.Foods");
            DropIndex("dbo.FoodIngredients", new[] { "ingredient_id" });
            DropIndex("dbo.FoodIngredients", new[] { "food_id" });
            DropTable("dbo.FoodIngredients");
        }
    }
}
