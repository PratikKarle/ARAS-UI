using Microsoft.AspNetCore.Mvc;
using Aras.IOM;
using System;
using System.Collections.Generic;

namespace ArasAPIs.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LoginController : ControllerBase
    {
        [HttpPost("Login")]
        public IActionResult Login([FromBody] LoginRequest request)
        {
            LoginRequest l1 = new LoginRequest();
            string serverUrl = "http://27.107.8.194:86/Aras28New/";
            string database = "28_Demo";
            string loginname = "admin";
            string password = "607920b64fe136f9ab2389e371852af2";

            try
            {
                HttpServerConnection connection = IomFactory.CreateHttpServerConnection(
                    serverUrl,
                    database,
                    loginname,
                    password
                );

                Item loginResult = connection.Login();
                Innovator innovator = loginResult.getInnovator();

                Item inBasketItems = innovator.applyMethod("t_InBasketTaskGet", "<username>" + request.username + "</username>");

                var itemsList = new List<Dictionary<string, object>>();
                for (int i = 0; i < inBasketItems.getItemCount(); i++)
                {
                    Item item = inBasketItems.getItemByIndex(i);

                    var itemData = new Dictionary<string, object>
                    {
                        { "instructions", item.getProperty("instructions", null) },
                        { "my_assignment", item.getProperty("my_assignment", string.Empty) },
                        { "name", item.getProperty("name", string.Empty) },
                        { "start_date", item.getProperty("start_date", string.Empty) },
                        { "due_date", item.getProperty("due_date", string.Empty) },
                        { "status", item.getProperty("status", string.Empty) }
                    };

                    itemsList.Add(itemData);
                }

                return Ok(new
                {
                    Message = "Login successful.",
                    value = itemsList
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    Message = "An error occurred while logging in.",
                    Error = ex.Message,
                    InnerError = ex.InnerException?.Message
                });
            }
        }
    }
    public class LoginRequest
    {
        public string username { get; set; }

    }

}
