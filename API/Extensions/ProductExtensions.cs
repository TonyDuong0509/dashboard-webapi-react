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

        public static IQueryable<Product> Filter(this IQueryable<Product> query, string brands, string types, string isGone)
        {
            var brandList = new List<string>();
            var typeList = new List<string>();
            var isGoneList = new List<string>();

            if (!string.IsNullOrEmpty(brands)) brandList.AddRange(brands.ToLower().Split(",").ToList());
            if (!string.IsNullOrEmpty(types)) typeList.AddRange(types.ToLower().Split(",").ToList());
            if (!string.IsNullOrEmpty(isGone)) isGoneList.AddRange(isGone.ToLower().Split(",").ToList());

            query = query.Where(x => brandList.Count == 0 || brandList.Contains(x.Brand.ToLower()));
            query = query.Where(x => typeList.Count == 0 || typeList.Contains(x.Type.ToLower()));
            query = query.Where(x => isGoneList.Count == 0 || isGoneList.Contains(x.IsGone.ToLower()));

            return query;
        }
    }
}