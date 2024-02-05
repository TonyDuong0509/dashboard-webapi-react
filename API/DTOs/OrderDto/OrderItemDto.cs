namespace API.DTOs.OrderDto
{
    public class OrderItemDto
    {
        public int ProductId { get; set; }
        public string Name { get; set; }
        public string PictureUrl { get; set; }
        public double COD { get; set; }
        public int Quantity { get; set; }
    }
}