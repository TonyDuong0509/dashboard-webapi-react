using API.Entities.OrderAggregate;

namespace API.DTOs.OrderDto
{
    public class OrderDto
    {
        public int Id { get; set; }
        public string BuyerId { get; set; }
        public ShippingAddress ShippingAddress { get; set; }
        public DateTime OrderDate { get; set; } = DateTime.UtcNow;
        public List<OrderItemDto> OrderItems { get; set; }
        public int TotalProducts { get; set; }
    }
}