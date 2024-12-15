using api.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.TagHelpers;

namespace api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PlantsController : ControllerBase
    {
        private static List<Plant> _plants = new List<Plant>(); // Simularemos la persistencia en memoria por ahora

        // GET: api/plants
        [HttpGet]
        public IActionResult GetPlants()
        {
            return Ok(_plants);
        }

        // POST: api/plants
        [HttpPost]
        public IActionResult AddPlant(Plant plant)
        {
            // Validación del modelo
            if (!ValidatePlant(plant))
            {
                return BadRequest(ModelState);
            }

            // Asignar un ID único a la planta (puedes usar un GUID)
            plant = plant with { Id = Guid.NewGuid().ToString() };

            _plants.Add(plant);
            return CreatedAtAction(nameof(GetPlants), new { id = plant.Id }, plant);
        }

        // PUT: api/plants/:id/water
        [HttpPut("{id}/water")]
        public IActionResult WaterPlant(string id)
        {
            var plant = _plants.FirstOrDefault(p => p.Id == id);
            if (plant == null)
            {
                return NotFound();
            }

            // Actualizar la fecha del último riego
            var index = _plants.IndexOf(plant);
            _plants[index] = plant with { LastWateredDate = DateTime.Now };

            return NoContent();
        }

        // GET: api/plants/due
        [HttpGet("due")]
        public IEnumerable<Plant> GetPlantsDueForWatering()
        {
            // Implementar la lógica para calcular las plantas que necesitan riego
            // basándose en la frecuencia de riego y la última fecha de riego.

            return _plants.Where(p =>
                DateTime.Today >= p.LastWateredDate.AddDays(p.WateringFrequencyDays)
            );
        }

        // Metodo para validar los datos
        private bool ValidatePlant(Plant plant)
        {
            // Validar que el nombre no sea nulo ni vacío
            if (string.IsNullOrEmpty(plant.Name))
            {
                ModelState.AddModelError(nameof(plant.Name), "El nombre de la planta es obligatorio.");
                return false;
            }

            // Validar que el tipo de planta sea válido
            string[] validTypes = { "succulent", "tropical", "herb", "cacti" };
            if (!validTypes.Contains(plant.Type))
            {
                ModelState.AddModelError(nameof(plant.Type), "El tipo de planta debe ser 'succulent', 'tropical', 'herb' o 'cacti'.");
                return false;
            }

            // Validar que la frecuencia de riego sea mayor que cero
            if (plant.WateringFrequencyDays <= 0)
            {
                ModelState.AddModelError(nameof(plant.WateringFrequencyDays), "La frecuencia de riego debe ser mayor que cero.");
                return false;
            }

            return true;
        }
    }
}
