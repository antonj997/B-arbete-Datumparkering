using Datumparkering.Models;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Configuration.UserSecrets;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Hosting;
using Datumparkering.Infrastrukture;

namespace Datumparkering.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private string? _connectionString;


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
                return "Inatt slår det över till ojämnt datum, det innebär att du endast får parkera på gatunummer med jämnt husnummer mellan 00:00-07:00.";
            }
            else
            {
                return "Inatt slår det över till jämnt datum, det innebär att du endast får parkera på gatunummer med ojämnt husnummer mellan 00:00-07:00.";
            }
        }
        public string ShowParkingRules()
        {
            string text = "Datumparkering gäller nattetid från 1 oktober till 31 maj mellan klockan 00.00 och 07.00. Och det gäller bara inom zonen för datumparkering som innefattar hela centrala Östersund, Lugnvik, Odensala, Torvalla och den tätbebyggda delen av Frösön (se karta).\n\nDatumparkering gäller även på markerade parkeringsrutor.\n\nOm du parkerar på dagtid spelar det ingen roll vilken sida av gatan du står på, så länge det är tillåtet att parkera där.\n\nDatumparkering är ett parkeringsförbud som innebär att du alla dagar under perioden 1 oktober till 31 maj, mellan klockan 00.00-07.00:\n\n- inte får parkera på sida med jämnt gatunummer på natt med jämnt datum.\n- inte får parkera på sida med udda gatunummer på natt med udda datum.";

            return text;
        }
        
      

        public IActionResult Index()
        {
            MyApiConnection _apiConnection = new MyApiConnection();
            ViewBag.apiConnectionString = _apiConnection.GetConnectionString();
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