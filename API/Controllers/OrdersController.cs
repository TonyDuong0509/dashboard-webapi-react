using API.Data;
using API.DTOs.OrderDto;
using API.Entities;
using API.Entities.OrderAggregate;
using API.Extensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class OrdersController : BaseApiController
    {
        private readonly StoreContext _context;
        public OrdersController(StoreContext context)
        {
            this._context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<OrderDto>>> GetOrders()
        {
            var orders = await _context.Orders
                .ProjectOrderToOrderDto()
                .Where(x => x.BuyerId == User.Identity.Name)
                .ToListAsync();

            return orders;
        }

        [HttpGet("{id}", Name = "GetOrder")]
        public async Task<ActionResult<OrderDto>> GetOrder(int id)
        {
            var order = await _context.Orders
                .ProjectOrderToOrderDto()
                .Where(x => x.BuyerId == User.Identity.Name && x.Id == id)
                .FirstOrDefaultAsync();

            return order;
        }

        [HttpPost]
        public async Task<ActionResult<Order>> CreateOrder(CreateOrderDto orderDto)
        {
            var basket = await _context.Baskets
                .RetrieveBasketWithItems(User.Identity.Name)
                .FirstOrDefaultAsync();

            if (basket == null)
                return BadRequest(new ProblemDetails { Title = "Could not locate basket" });

            var items = new List<OrderItem>();

            foreach (var item in basket.Items)
            {
                var productItem = await _context.Products.FindAsync(item.ProductId);
                var itemOrdered = new ProductItemOrdered
                {
                    ProductId = productItem.Id,
                    Name = productItem.Name,
                    PictureUrl = productItem.PictureUrl
                };

                var orderItem = new OrderItem
                {
                    ItemOrdered = itemOrdered,
                    Weight = productItem.Weight,
                    COD = productItem.COD,
                    Quantity = productItem.Quantity,
                };
                items.Add(orderItem);
                productItem.Quantity -= item.Quantity;
            }

            var totalProducts = items.Sum(item => item.Quantity);

            var order = new Order
            {
                OrderItems = items,
                BuyerId = User.Identity.Name,
                ShippingAddress = orderDto.ShippingAddress,
                OrderDate = DateTime.UtcNow,
                TotalProducts = totalProducts
            };
            _context.Orders.Add(order);
            _context.Baskets.Remove(basket);

            if (orderDto.SaveAddress)
            {
                var user = await _context.Users
                    .Include(x => x.Address)
                    .FirstOrDefaultAsync(x => x.UserName == User.Identity.Name);

                var address = new UserAddress
                {
                    FullName = order.ShippingAddress.FullName,
                    DescriptionAddress = orderDto.ShippingAddress.DescriptionAddress
                };
                user.Address = address;
            }


            var result = await _context.SaveChangesAsync() > 0;
            if (result) return CreatedAtRoute("GetOrder", new { id = order.Id }, order.Id);

            return BadRequest("Problem creating order");
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteOrder(int id)
        {
            var order = await _context.Orders.FindAsync(id);
            if (order == null) return NotFound();

            _context.Orders.Remove(order);

            var result = await _context.SaveChangesAsync() > 0;
            if (result) return NoContent();

            return BadRequest(new ProblemDetails { Title = "Problem deleting order..." });
        }
    }
}