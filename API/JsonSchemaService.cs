using System.Reflection;
using NJsonSchema;
using NJsonSchema.CodeGeneration.CSharp;

namespace API;

public static class JsonSchemaService
{
    private static readonly Dictionary<string, string> _schemas = new(StringComparer.OrdinalIgnoreCase);

    public static void RegisterSchema(string name, string jsonSchema)
    {
        _schemas[name] = jsonSchema;
    }

    public static string? GetJsonSchema(string schemaName)
    {
        return _schemas.TryGetValue(schemaName, out var schema) ? schema : null;
    }

    public static string GenerateCSharpCode(string schemaName)
    {
        if (!_schemas.TryGetValue(schemaName, out var jsonSchema))
            throw new KeyNotFoundException($"Schema '{schemaName}' não encontrado.");

        var schema = JsonSchema.FromJsonAsync(jsonSchema).Result;
        var generator = new CSharpGenerator(schema);
        return generator.GenerateFile();
    }

    public static void ValidateDuplicatedSchemaNames()
    {
        var duplicates = _schemas
            .GroupBy(x => x.Key, StringComparer.OrdinalIgnoreCase)
            .Where(g => g.Count() > 1)
            .ToList();

        if (duplicates.Count == 0)
            return;
        
        var duplicateMessages = duplicates.Select(g =>
            $"Schema '{g.Key}' está sendo usado múltiplas vezes");
        var exceptionMessage = $"Foram encontrados schemas com nomes duplicados:\n{string.Join("\n", duplicateMessages)}";
        throw new DuplicateSchemaException(exceptionMessage);
    }
}