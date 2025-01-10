using System.Reflection;
using NJsonSchema;

namespace API;

public static class JsonSchemaService
{
    public static string? GetJsonSchema(string schemaName)
    {
        var assembly = Assembly.GetExecutingAssembly();
        var schemaType = assembly.GetTypes()
            .FirstOrDefault(t => t.GetCustomAttributes<SchemaAttribute>()
                .Any(a => string.Equals(a.Name, schemaName, StringComparison.OrdinalIgnoreCase)));

        if (schemaType is null)
            return null;

        var schema = JsonSchema.FromType(schemaType);
        return schema.ToJson();
    }
}