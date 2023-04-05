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
        public string GetParkingMessage()
        {
            if (IsTodayDateEven())
            {
                return "Inatt slår det över till ojämnt datum, det innebär att du endast får parkera på gatunummer med jämnt husnummer";
            }
            else
            {
                return "Inatt slår det över till jämnt datum, det innebär att du endast får parkera på gatunummer med ojämnt husnummer";
            }
        }

        public IActionResult Index()
        {
            ViewBag.TodaysDate = GetTodaysDate();
            bool EvanDay = IsTodayDateEven();
            ViewBag.ParkingMessage = GetParkingMessage();
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