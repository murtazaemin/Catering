using CateringModule.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CateringModule.Controllers
{
    public class FoodController : Controller
    {
        Context c = new Context();
        // GET: Food
        public ActionResult Index()
        {
            return View();
        }


        public JsonResult GetFoodList()
        {
            var draw = Request.Form.GetValues("draw").FirstOrDefault();
            var start = Request.Form.GetValues("start").FirstOrDefault();
            var length = Request.Form.GetValues("length").FirstOrDefault();

            int pagesize = length != null ? Convert.ToInt32(length) : 0;  
            int skip = start != null ? Convert.ToInt32(start) : 0;


            var totalCount = c.Foods.Count();

            List<Food> data = c.Foods.OrderByDescending(x => x.created_at).Skip(skip).Take(pagesize).ToList();

            return Json(new { draw = draw, recordsFiltered = totalCount, recordsTotal = totalCount, data = data}, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult AddFood(Food food)
        {
            c.Foods.Add(food);
            var Result = c.SaveChanges();

            if (Result > 0)
                return Json("1");
            else
                return Json("0");
        }
        

        [HttpPost]
        public JsonResult DeleteFood(int id) 
        {
        
            var food = c.Foods.Find(id);
            c.Foods.Remove(food);
            var Result = c.SaveChanges();
            if (Result > 0)
                return Json("1");
            else
                return Json("0");
        }

        [HttpPost]
        public JsonResult EditFood( Food food)
        {
            var food_edit = c.Foods.FirstOrDefault(x => x.food_id == food.food_id);

            food_edit.food_name = food.food_name;
            food_edit.food_description = food.food_description;
            food_edit.unit_portion = food.unit_portion;

            var Result = c.SaveChanges();
            if (Result > 0)
                return Json("1");
            else
                return Json("0");
        }

    }
}