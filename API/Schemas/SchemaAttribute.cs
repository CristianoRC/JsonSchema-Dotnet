namespace API.Schemas;

[AttributeUsage(AttributeTargets.Class)]
public sealed class SchemaAttribute(string name) : Attribute
{
    public string Name { get; } = name;
}
