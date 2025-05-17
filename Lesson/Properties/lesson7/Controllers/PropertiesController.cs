using lesson7.Contracts;
using lesson7.Entities;
using Microsoft.AspNetCore.Mvc;

namespace lesson7.Controllers;

[ApiController]
[Route("api/properties")]
public class PropertiesController : ControllerBase
{
    private static List<Entities.Property> Properties = [];

    [HttpPost]
    public IActionResult Create( [FromBody] CreatePropertyRequest createPropertyRequest )
    {
        var property = new Entities.Property(createPropertyRequest.Name);

        return Created();
    }

    [HttpGet]
    public IActionResult GetAll()
    {
        IEnumerable<Contracts.Property> propertiesResponse
            = Properties.Select( x => new Contracts.Property( x.Id, x.Name ) );

        return Ok( propertiesResponse );
    }

    [HttpGet("{propertyId:guid}")]
    public IActionResult Get([FromRoute]Guid propertyId)
    {
        var property = Properties.FirstOrDefault( x => x.Id == propertyId);
        if (property is null)
        {
            return NotFound();
        }

        Contracts.Property propertyResponse =  new Contracts.Property(property.Id, property.Name);

        return Ok(propertyResponse);
    }

    [HttpPut]
    public IActionResult Update()
    {
        return Ok();
    }
}
