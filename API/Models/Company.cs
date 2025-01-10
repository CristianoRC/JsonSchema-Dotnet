using System.ComponentModel.DataAnnotations;

namespace API.Models;

public class Company
{
    [Required]
    public string Name { get; set; }
}