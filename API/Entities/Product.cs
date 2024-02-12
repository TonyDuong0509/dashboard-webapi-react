
namespace API.Entities
{
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public double COD { get; set; }
        public double Weight { get; set; }
        public string PictureUrl { get; set; }
        public string Type { get; set; }
        public string Brand { get; set; }
        public int Quantity { get; set; }
        public bool isWeighed { get; set; }
        public DateTime Date { get; set; } = DateTime.UtcNow;
        public string PublicId { get; set; }
    }
}