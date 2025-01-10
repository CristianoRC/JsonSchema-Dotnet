using System.ComponentModel.DataAnnotations;

namespace API.Models;

public class Car
{
    [Required]
    public string Name { get; set; }

    [RegularExpression("[A-Z]{3}[0-9][0-9A-Z][0-9]{2}")]
    public string Plate { get; set; }

    public Company Manufacturer { get; set; }
}