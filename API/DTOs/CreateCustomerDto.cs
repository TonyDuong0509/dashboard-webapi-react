using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class CreateCustomerDto
    {
        [Required]
        public string FullName { get; set; }
        [Required]
        public string PhoneNumber { get; set; }
        [Required]
        public string Address { get; set; }
        public string Description { get; set; }
    }
}