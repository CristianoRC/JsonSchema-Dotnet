using API.Models;
using API.Schemas;
using Microsoft.AspNetCore.Mvc;
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
    public async Task<IActionResult> CreateClassByJsonSchema([FromBody] JsonSchemaToCsharp jsonSchemaRequest)
    {
        //var schema = await JsonSchema.FromUrlAsync("http://localhost:5000/Schema?schemaName=person");
        var schema = await JsonSchema.FromJsonAsync(jsonSchemaRequest.JsonSchema);
        var settings = new CSharpGeneratorSettings()
        {
            Namespace = jsonSchemaRequest.Namespace,
            ClassStyle = CSharpClassStyle.Poco
        };
        var generator = new CSharpGenerator(schema, settings);
        var code = generator.GenerateFile();
        return Ok(code);
    }
}