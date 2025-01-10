using API.Models;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("[controller]")]
public class CarController : Controller
{
    [HttpPost]
    public IActionResult Create([FromBody] Car car)
    {
        if (ModelState.IsValid is false)
            return BadRequest(ModelState);

        return Created(string.Empty, car);
    }
}