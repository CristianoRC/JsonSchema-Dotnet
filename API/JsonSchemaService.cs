﻿using System.Reflection;
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

    public static void ValidateDuplicatedSchemaNames()
    {
        var assembly = Assembly.GetExecutingAssembly();
        var typesWithSchemas = assembly.GetTypes()
            .SelectMany(t => t.GetCustomAttributes<SchemaAttribute>()
            .Select(a => new { Type = t, SchemaName = a.Name }))
            .GroupBy(x => x.SchemaName, StringComparer.OrdinalIgnoreCase);

        var duplicates = typesWithSchemas
            .Where(g => g.Count() > 1)
            .ToList();

        if (duplicates.Count == 0)
            return;
        
        var duplicateMessages = duplicates.Select(g =>
            $"Schema '{g.Key}' está sendo usado por múltiplos tipos: {string.Join(", ", g.Select(x => x.Type.Name))}");
        var exceptionMessage = $"Foram encontrados schemas com nomes duplicados:\n{string.Join("\n", duplicateMessages)}";
        throw new DuplicateSchemaException(exceptionMessage);
    }
}