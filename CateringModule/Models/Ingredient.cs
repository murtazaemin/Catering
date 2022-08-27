using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace CateringModule.Models
{
    public class Ingredient: BaseEntity
    {
        [Key]
        public int ingredient_id { get; set; }
        public string ingredient_name { get; set; }
        public string ingredient_description { get; set; }
        public string ingredient_unit { get; set; }
        public decimal unit_price { get; set; }
        public int unit_calorie { get; set; }
        public int min_quantity { get; set; }
        public int max_quantity { get; set; }
        public int tax_rate { get; set; }
        public string accounting_code { get; set; }

        public virtual ICollection<FoodIngredient> FoodIngredients { get; set; }
    }
}