using API.Entities.OrderAggregate;

namespace API.DTOs.OrderDto
{
    public class CreateOrderDto
    {
        public bool SaveAddress { get; set; }
        public ShippingAddress ShippingAddress { get; set; }
    }
}