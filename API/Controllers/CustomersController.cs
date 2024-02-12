using API.Data;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.RequestHelpers;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class CustomersController : BaseApiController
    {
        private readonly StoreContext _context;
        private readonly IMapper _mapper;
        public CustomersController(StoreContext context, IMapper mapper)
        {
            this._mapper = mapper;
            this._context = context;
        }

        [HttpGet]

        public async Task<ActionResult<PagedList<Customer>>> GetCustomers([FromQuery] CustomerParams customerParams)
        {
            var query = _context.Customers
                .Search(customerParams.SearchTerm)
                .AsQueryable();

            var customers = await PagedList<Customer>.ToPagedList(query, customerParams.PageNumber, customerParams.PageSize);

            Response.AddPaginationHeader(customers.MetaData);

            return customers;
        }

        [HttpGet("{id}", Name = "GetCustomer")]
        public async Task<ActionResult<Customer>> GetCustomer(int id)
        {
            var customer = await _context.Customers.FindAsync(id);

            if (customer == null) return NotFound();

            return customer;
        }

        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<ActionResult<Customer>> CreateCustomer([FromForm] CreateCustomerDto customerDto)
        {
            var customer = _mapper.Map<Customer>(customerDto);

            _context.Customers.Add(customer);

            var result = await _context.SaveChangesAsync() > 0;
            if (result) return CreatedAtRoute("GetCustomer", new { Id = customer.Id }, customer);

            return BadRequest(new ProblemDetails { Title = "Problem creating new customer" });
        }

        [Authorize(Roles = "Admin")]
        [HttpPut]
        public async Task<ActionResult<Customer>> UpdateCustomer([FromForm] UpdateCustomerDto customerDto)
        {
            var customer = await _context.Customers.FindAsync(customerDto.Id);

            if (customer == null) return NotFound();

            _mapper.Map(customerDto, customer);

            var result = await _context.SaveChangesAsync() > 0;
            if (result) return Ok(customer);

            return BadRequest(new ProblemDetails { Title = "Problem updating customer" });
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteCustomer(int id)
        {
            var customer = await _context.Customers.FindAsync(id);

            if (customer == null) return NotFound();

            _context.Customers.Remove(customer);

            var result = await _context.SaveChangesAsync() > 0;
            if (result) return Ok(customer);

            return BadRequest(new ProblemDetails { Title = "Problem deleting customer" });
        }
    }
}