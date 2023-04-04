using Datumparkering.Models;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace Datumparkering.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

            public DateTime GetTodaysDate()
            {
                return DateTime.Now.Date;
            }
        public IActionResult Index()
        {
            ViewBag.TodaysDate = GetTodaysDate();
            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}