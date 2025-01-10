using System.ComponentModel.DataAnnotations;
using API.Schemas;

namespace API.Models;

[Schema(nameof(Car))]
public class Car
{
    [Required] 
    public string Name { get; set; }

    [RegularExpression("[A-Z]{3}[0-9][0-9A-Z][0-9]{2}", ErrorMessage = "Placa no formato incorreto.")]
    public string Plate { get; set; }

    [Required]
    public DateOnly Date { get; set; }

    public Company Manufacturer { get; set; }
}