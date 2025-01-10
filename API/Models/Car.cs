﻿using System.ComponentModel.DataAnnotations;

namespace API.Models;

[Schema(nameof(Car))]
public class Car
{
    [Required] 
    public string Name { get; set; }

    [RegularExpression("[A-Z]{3}[0-9][0-9A-Z][0-9]{2}", ErrorMessage = "Placa no formato incorreto.")]
    public string Plate { get; set; }

    public Company Manufacturer { get; set; }
}