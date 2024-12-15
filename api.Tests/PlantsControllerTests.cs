using api.Controllers;
using Xunit;
using api.Models;
using Microsoft.AspNetCore.Mvc;

namespace api.Tests
{
    public class PlantsControllerTests
    {
        private readonly PlantsController _controller;

        public PlantsControllerTests()
        {
            _controller = new PlantsController();
        }

        [Fact]
        public void GetPlants_ReturnsOkResult()
        {
            // Act
            var result = _controller.GetPlants();

            // Assert
            Assert.NotNull(result);
            Assert.IsAssignableFrom<IEnumerable<Plant>>(result);
        }

        [Fact]
        public void AddPlant_ReturnsCreatedAtActionResult()
        {
            // Arrange
            var plant = new Plant(
                "1", "Planta de prueba", "succulent", 7, DateTime.Now, "Sala"
            );

            // Act
            var result = _controller.AddPlant(plant);

            // Assert
            var createdAtActionResult = Assert.IsType<CreatedAtActionResult>(result);
            Assert.Equal("GetPlants", createdAtActionResult.ActionName);
        }

        [Fact]
        public void WaterPlant_ExistingPlant_ReturnsNoContent()
        {
            // Arrange
            var plantId = "1";
            _controller.AddPlant(new Plant(
                plantId, "Planta de prueba", "succulent", 7, DateTime.Now, "Sala"
            ));

            // Act
            var result = _controller.WaterPlant(plantId);

            // Assert
            Assert.IsType<NoContentResult>(result);
        }

        [Fact]
        public void WaterPlant_NonExistingPlant_ReturnsNotFound()
        {
            // Arrange
            var plantId = "2";

            // Act
            var result = _controller.WaterPlant(plantId);

            // Assert
            Assert.IsType<NotFoundResult>(result);
        }

        [Fact]
        public void WaterPlant_ExistingPlant_UpdatesLastWateredDate()
        {
            // Arrange
            var plant = new Plant(
                "1", "Planta de prueba", "succulent", 7, DateTime.Now.AddDays(-10), "Sala"
            );
            _controller.AddPlant(plant); // Agregar la planta

            // Obtener el ID real de la planta (que se generó en AddPlant)
            var getPlant = _controller.GetPlants();
            var plantId = "";
            if (getPlant is OkObjectResult okResult)
            {
                var plants = okResult.Value as IEnumerable<Plant>;
                plantId = plants.FirstOrDefault().Id; // Ahora puedes usar FirstOrDefault en 'plants'
            }

            // Act
            var result = _controller.WaterPlant(plantId);
            Plant updatedPlant = null;
            if (result is OkObjectResult okResultWP)
            {
                var plants = okResultWP.Value as IEnumerable<Plant>;
                updatedPlant = plants.FirstOrDefault(); // Ahora puedes usar FirstOrDefault en 'plants'
            }

            // Assert
            Assert.IsType<NoContentResult>(result);
            Assert.True(updatedPlant.LastWateredDate > DateTime.Now.AddDays(-1));
        }

        [Fact]
        public void GetPlantsDueForWatering_ReturnsCorrectPlants()
        {
            // Arrange
            _controller.AddPlant(new Plant(
                "1", "Planta 1", "succulent", 7, DateTime.Now.AddDays(-8), "Sala"
            ));
            _controller.AddPlant(new Plant(
                "2", "Planta 2", "tropical", 3, DateTime.Now.AddDays(-2), "Cocina"
            ));

            // Act
            var result = _controller.GetPlantsDueForWatering();

            // Assert
            Assert.NotNull(result);
            Assert.IsAssignableFrom<IEnumerable<Plant>>(result);
            var plants = Assert.IsAssignableFrom<IEnumerable<Plant>>(result.ToList());
            Assert.Single(plants);
            Assert.Equal("Planta 1", plants.First().Name);
        }

        [Fact]
        public void GetPlantsDueForWatering_ReturnsPlantDueToday()
        {
            // Arrange
            var today = DateTime.Today;
            _controller.AddPlant(new Plant(
                "1", "Planta Hoy", "succulent", 1, today.AddDays(-1), "Sala"
            ));

            // Act
            var result = _controller.GetPlantsDueForWatering();

            // Assert
            Assert.NotNull(result);
            Assert.IsAssignableFrom<IEnumerable<Plant>>(result);
            var plants = Assert.IsAssignableFrom<IEnumerable<Plant>>(result.ToList());
            Assert.Single(plants);
            Assert.Equal("Planta Hoy", plants.First().Name);
        }

        [Fact]
        public void WaterPlant_InvalidPlantId_ReturnsNotFound()
        {
            // Arrange
            var plantId = "999"; // ID que no existe

            // Act
            var result = _controller.WaterPlant(plantId);

            // Assert
            Assert.IsType<NotFoundResult>(result);
        }

        [Fact]
        public void AddPlant_InvalidData_ReturnsBadRequest()
        {
            // Arrange
            var plant = new Plant(
                "", "Planta Inválida", "tipo_invalido", -1, DateTime.Now, "Sala"
            );

            // Act
            var result = _controller.AddPlant(plant);

            // Assert
            Assert.IsType<BadRequestObjectResult>(result);
        }
    }

}
