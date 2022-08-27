namespace CateringModule.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class update_tables : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.FoodIngredients", "ingredient_quantity", c => c.Decimal(nullable: false, precision: 18, scale: 2));
            AddColumn("dbo.FoodIngredients", "created_at", c => c.DateTime(nullable: false));
            AddColumn("dbo.FoodIngredients", "updated_at", c => c.DateTime());
        }
        
        public override void Down()
        {
            DropColumn("dbo.FoodIngredients", "updated_at");
            DropColumn("dbo.FoodIngredients", "created_at");
            DropColumn("dbo.FoodIngredients", "ingredient_quantity");
        }
    }
}
