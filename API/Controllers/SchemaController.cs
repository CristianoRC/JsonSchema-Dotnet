using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("[controller]")]
public class SchemaController : Controller
{
    [HttpGet]
    public IActionResult Index([FromQuery] string schemaName)
    {
        var jsonSchema = JsonSchemaService.GetJsonSchema(schemaName);
        if (string.IsNullOrEmpty(jsonSchema))
            return NotFound($"Schema '{schemaName}' não encontrado");
        return Ok(jsonSchema);
    }
}