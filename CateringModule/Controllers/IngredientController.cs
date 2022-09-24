using CateringModule.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CateringModule.Controllers
{
    public class IngredientController : Controller
    {
        Context c = new Context(); 
        // GET: Ingredient
        public ActionResult Index()
        {
            //var ingredients = c.Ingredients.ToList();
            return View();
        }

        public JsonResult GetIngredientList()
        {
            var draw = Request.Form.GetValues("draw").FirstOrDefault();
            var start = Request.Form.GetValues("start").FirstOrDefault();
            var length = Request.Form.GetValues("length").FirstOrDefault();

            int pagesize = length != null ? Convert.ToInt32(length) : 0;
            int skip = start != null ? Convert.ToInt32(start) : 0;


            var totalCount = c.Ingredients.Count();

            var test = c.Ingredients.OrderByDescending(x => x.created_at).Skip(skip).Take(pagesize);

            List<Ingredient> data = test.ToList();



            return Json(new { draw = draw, recordsFiltered = totalCount, recordsTotal = totalCount, data = data }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult AddIngredient(Ingredient ingredient)
        {
            c.Ingredients.Add(ingredient);
            var Result = c.SaveChanges();

            if (Result > 0)
                return Json("1");
            else
                return Json("0");
        }
        [HttpPost]
        public JsonResult EditIngredient(Ingredient ingredient)
        {
            Console.WriteLine("güncelleme fonk çalıştı");
            var ingredients_edit = c.Ingredients.FirstOrDefault(x => x.ingredient_id == ingredient.ingredient_id);

            ingredients_edit.ingredient_name = ingredient.ingredient_name;
            ingredients_edit.ingredient_description = ingredient.ingredient_description;
            ingredients_edit.ingredient_unit = ingredient.ingredient_unit;
            ingredients_edit.unit_price = ingredient.unit_price;
            ingredients_edit.unit_calorie = ingredient.unit_calorie;
            ingredients_edit.min_quantity = ingredient.min_quantity;
            ingredients_edit.max_quantity = ingredient.max_quantity;
            ingredients_edit.tax_rate = ingredient.tax_rate;
            ingredients_edit.accounting_code = ingredient.accounting_code;


            var Result = c.SaveChanges();
            if (Result > 0)
                return Json("1");
            else
                return Json("0");
        }


        [HttpPost]
        public JsonResult DeleteIngredient(int id)
        {
            var ıngredient = c.Ingredients.Find(id);
            c.Ingredients.Remove(ıngredient);
            var Result = c.SaveChanges();
            if (Result > 0)
                return Json("1");
            else
                return Json("0");
        }


    }
}