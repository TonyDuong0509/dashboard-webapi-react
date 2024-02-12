using API.Entities;

namespace API.Extensions
{
    public static class CustomerExtensions
    {
        public static IQueryable<Customer> Search(this IQueryable<Customer> query, string searchTerm)
        {
            if (string.IsNullOrEmpty(searchTerm)) return query;

            var lowerCaseSearchTerm = searchTerm.Trim().ToLower();

            return query.Where(x => x.FullName.ToLower().Contains(lowerCaseSearchTerm) || x.PhoneNumber.ToLower().Contains(lowerCaseSearchTerm));
        }
    }
}