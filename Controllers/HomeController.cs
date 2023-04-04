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
        public bool IsTodayDateEven()
        {
            DateTime today = GetTodaysDate();
            int day = today.Day;
            return day % 2 == 0;
        }
        public bool IsParkingAllowed()
        {
            DateTime now = DateTime.Now;
            if (now.Month >= 10 || now.Month < 6)
            {
                if (now.Month == 10 && now.Day == 1 && now.Hour < 7)
                {
                    return false;
                }
                else if (now.Month == 5 && now.Day == 31 && now.Hour >= 7)
                {
                    return false;
                }
                else if (now.Hour >= 0 && now.Hour < 7)
                {
                    return true;
                }
            }
            return false;
        }
        public IActionResult Index()
        {
            ViewBag.TodaysDate = GetTodaysDate();
            bool EvanDay = IsTodayDateEven();
            bool isParkingAllowed = IsParkingAllowed();
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