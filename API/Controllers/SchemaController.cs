using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("[controller]")]
public class SchemaController : Controller
{
    public IActionResult Index()
    {
        return Ok();
    }
}