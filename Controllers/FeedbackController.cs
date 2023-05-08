using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Collections.Generic;
using System.IO;

namespace Datumparkering.Controllers

{
    public class FeedbackController : Controller
    {
        [HttpPost]
        public IActionResult SendFeedback([FromForm] string feedbackMessage)
        {
            if (!string.IsNullOrEmpty(feedbackMessage))
            {
                // Lägg till feedbackMessage i JSON-filen
                string jsonFilePath = Path.Combine("wwwroot", "feedbacks.json");
                List<string> feedbacks;

                // Läs in befintliga feedbacks från JSON-filen
                using (StreamReader file = System.IO.File.OpenText(jsonFilePath))
                {
                    JsonSerializer serializer = new JsonSerializer();
                    feedbacks = (List<string>)serializer.Deserialize(file, typeof(List<string>));
                }

                // Lägg till det nya meddelandet i feedbacks-listan
                feedbacks.Add(feedbackMessage);

                // Spara feedbacks-listan tillbaka till JSON-filen
                using (StreamWriter file = System.IO.File.CreateText(jsonFilePath))
                {
                    JsonSerializer serializer = new JsonSerializer();
                    serializer.Serialize(file, feedbacks);
                }

                return Ok(new { status = "success" });
            }
            else
            {
                return BadRequest(new { status = "error", message = "Message is empty" });
            }
        }
    }
}
