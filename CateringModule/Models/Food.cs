using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace CateringModule.Models
{
    public class Food: BaseEntity
    {
        [Key]
        public int food_id { get; set; }
        public string food_name { get; set; }
        public string food_description { get; set; }
        public int unit_portion { get; set; }

        //public virtual ICollection<FoodIngredient> FoodIngredients { get; set; }
    }
}