namespace API;

[AttributeUsage(AttributeTargets.Class)]
public sealed class SchemaAttribute(string name) : Attribute
{
    public string Name { get; } = name;
}
