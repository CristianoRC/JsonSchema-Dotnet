using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using API.Schemas;

namespace API.Models;

[Schema(nameof(Person))]
public class Person
{
    [Required]
    public string FirstName { get; set; }

    [Display(Name = "Olá Mundo - Display name" )]
    public string MiddleName { get; set; }

    [Required]
    public string LastName { get; set; }

    [Required]
    public Gender Gender { get; set; }

    [Range(2, 5)]
    public int NumberWithRange { get; set; }

    public DateTime Birthday { get; set; }

    public Company Company { get; set; }

    public Collection<Car> Cars { get; set; }
}