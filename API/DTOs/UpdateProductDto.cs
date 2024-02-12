using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class UpdateProductDto
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Description { get; set; }
        [Required]
        public double COD { get; set; }
        public double Weight { get; set; }
        [Required]
        public IFormFile File { get; set; }
        [Required]
        public string Type { get; set; }
        [Required]
        public string Brand { get; set; }
        [Required]
        [Range(0, 200)]
        public int Quantity { get; set; }
        public bool isWeighed { get; set; }
    }
}