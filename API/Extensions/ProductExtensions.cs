using API.Entities;

namespace API.Extensions
{
    public static class ProductExtensions
    {
        public static IQueryable<Product> Sort(this IQueryable<Product> query, string orderBy)
        {
            if (string.IsNullOrEmpty(orderBy)) return query.OrderBy(x => x.Name);

            query = orderBy switch
            {
                "weight" => query.OrderBy(x => x.Weight),
                "weightDesc" => query.OrderByDescending(x => x.Weight),
                _ => query.OrderBy(x => x.Name)
            };

            return query;
        }

        public static IQueryable<Product> Search(this IQueryable<Product> query, string searchTerm)
        {
            if (string.IsNullOrEmpty(searchTerm)) return query;

            var lowerCaseSearchTerm = searchTerm.Trim().ToLower();

            return query.Where(x => x.Name.ToLower().Contains(lowerCaseSearchTerm));
        }

        public static IQueryable<Product> Filter(this IQueryable<Product> query, string brands, string types, bool status)
        {
            var brandList = new List<string>();
            var typeList = new List<string>();
            var statusList = new List<bool>();

            if (!string.IsNullOrEmpty(brands)) brandList.AddRange(brands.ToLower().Split(",").ToList());
            if (!string.IsNullOrEmpty(types)) typeList.AddRange(types.ToLower().Split(",").ToList());
            if (status == true)
            {
                List<bool> statusTempList = new List<bool> { status };
                statusList.AddRange(statusTempList);
            }

            query = query.Where(x => brandList.Count == 0 || brandList.Contains(x.Brand.ToLower()));
            query = query.Where(x => typeList.Count == 0 || typeList.Contains(x.Type.ToLower()));
            query = query.Where(x => statusList.Count == 0 || statusList.Contains(x.Status));

            return query;
        }
    }
}