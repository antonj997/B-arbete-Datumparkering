using Datumparkering.Models;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using System;
using System.Net.Http;
using System.Threading.Tasks;
using Newtonsoft.Json.Linq;
using System.Text.RegularExpressions;

namespace Datumparkering.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private string? _connectionString;
        private readonly IConfiguration configuration;

        //public HomeController(ILogger<HomeController> logger)
        //{
        //    _logger = logger;
        //}
        public HomeController(IConfiguration configuration)
        {
            this.configuration = configuration;
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
        public string GetParkingMessage(int houseNumber)
        {
            bool isOddHouseNumber = houseNumber % 2 != 0;
            bool isTodayDateEven = DateTime.Now.Day % 2 == 0;

            if (isOddHouseNumber && !isTodayDateEven || !isOddHouseNumber && isTodayDateEven)
            {
                return "Inatt mellan 00:00-07:00 får du stå på denna adress.";
            }
            else
            {
                return "Inatt mellan 00:00-07:00 får du inte stå här.";
            }
        }
       
        public string CanIParkHere()
        {
            int sampleHouseNumber = 123; // Byt ut mot det faktiska husnumret
            return GetParkingMessage(sampleHouseNumber);
        }
        public string ShowParkingRules()
        {
            string text = "Datumparkering gäller nattetid från 1 oktober till 31 maj mellan klockan 00.00 och 07.00. Och det gäller bara inom zonen för datumparkering som innefattar hela centrala Östersund, Lugnvik, Odensala, Torvalla och den tätbebyggda delen av Frösön (se karta).\n\nDatumparkering gäller även på markerade parkeringsrutor.\n\nOm du parkerar på dagtid spelar det ingen roll vilken sida av gatan du står på, så länge det är tillåtet att parkera där.\n\nDatumparkering är ett parkeringsförbud som innebär att du alla dagar under perioden 1 oktober till 31 maj, mellan klockan 00.00-07.00:\n\n- inte får parkera på sida med jämnt gatunummer på natt med jämnt datum.\n- inte får parkera på sida med udda gatunummer på natt med udda datum.";

            return text;
        }
        
      

        public IActionResult Index()
        {
            ViewBag.apiConnectionString = configuration.GetConnectionString("GoogleMapsApiKey");

            ViewBag.TodaysDate = GetTodaysDate();
            bool EvanDay = IsTodayDateEven();
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