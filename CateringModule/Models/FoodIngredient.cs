using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace CateringModule.Models
{
    public class FoodIngredient: BaseEntity
    {
        [Key, Column(Order = 1)]
        public int food_id { get; set; }
        [Key, Column(Order = 2)]
        public int ingredient_id { get; set; }
        public decimal ingredient_quantity { get; set; }
        public virtual Food Foods { get; set; }
        public virtual Ingredient Ingredients { get; set; }
    }
}