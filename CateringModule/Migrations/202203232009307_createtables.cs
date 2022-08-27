namespace CateringModule.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class createtables : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Foods",
                c => new
                    {
                        food_id = c.Int(nullable: false, identity: true),
                        food_name = c.String(),
                        food_description = c.String(),
                        unit_portion = c.Int(nullable: false),
                        created_at = c.DateTime(nullable: false),
                        updated_at = c.DateTime(),
                    })
                .PrimaryKey(t => t.food_id);
            
            CreateTable(
                "dbo.Ingredients",
                c => new
                    {
                        ingredient_id = c.Int(nullable: false, identity: true),
                        ingredient_name = c.String(),
                        ingredient_description = c.String(),
                        ingredient_unit = c.String(),
                        unit_price = c.Decimal(nullable: false, precision: 18, scale: 2),
                        unit_calorie = c.Int(nullable: false),
                        min_quantity = c.Int(nullable: false),
                        max_quantity = c.Int(nullable: false),
                        tax_rate = c.Int(nullable: false),
                        accounting_code = c.String(),
                        created_at = c.DateTime(nullable: false),
                        updated_at = c.DateTime(),
                    })
                .PrimaryKey(t => t.ingredient_id);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.Ingredients");
            DropTable("dbo.Foods");
        }
    }
}
