using API.Models;
using Microsoft.AspNetCore.Mvc;
using NJsonSchema;

namespace API.Controllers;

[ApiController]
[Route("[controller]")]
public class SchemaController : Controller
{
    [HttpGet]
    public IActionResult Index()
    {
        var schema = JsonSchema.FromType<Person>();
        var schemaData = schema.ToJson();
        return Ok(schemaData);
    }
}