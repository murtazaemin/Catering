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
            var ingredients = c.Ingredients.ToList();
            return View(ingredients);
        }
    }
}