using API.Models;
using API.Schemas;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using NJsonSchema;
using NJsonSchema.CodeGeneration.CSharp;

namespace API.Controllers;

//TODO: Adicionar cache nessa request!
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

    [HttpPost]
    public async Task<IActionResult> CreateClassByJsonSchema([FromBody] object jsonSchema)
    {
        var schema = await JsonSchema.FromUrlAsync("http://localhost:5000/Schema?schemaName=person");
        var settings = new CSharpGeneratorSettings()
        {
            //Namespace = 
        };
        var generator = new CSharpGenerator(schema, settings);
        var code = generator.GenerateFile();
        return Ok(code);
    }
}