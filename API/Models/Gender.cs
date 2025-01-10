using System.Text.Json.Serialization;
using Newtonsoft.Json.Converters;

namespace API.Models;

//TODO: Verificar para deixar essa config global
[JsonConverter(typeof(StringEnumConverter))]
public enum Gender
{
    Male,
    Female
}