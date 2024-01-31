
using API.Entities;

namespace API.Data
{
    public static class DbInitializer
    {
        public static void Initialize(StoreContext context)
        {
            if (context.Products.Any()) return;

            var products = new List<Product>
            {
                new Product
                {
                    Name = "Product 1",
                    Description =
                        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    COD = 20000,
                    PictureUrl = "/images/products/p1.png",
                    Brand = "Shopee",
                    Type = "Carton",
                    Weight = 5.5,
                    Quantity = 1,
                    Date = DateTime.Now
                },
                new Product
                {
                    Name = "Product 2",
                    Description = "Nunc viverra imperdiet enim. Fusce est. Vivamus a tellus.",
                    COD = 15000,
                    PictureUrl = "/images/products/p2.png",
                    Brand = "GHTK",
                    Type = "Styrofoam",
                    Weight = 10,
                    Quantity = 1,
                    Date = DateTime.Now
                },
                new Product
                {
                    Name = "Product 3",
                    Description =
                        "Suspendisse dui purus, scelerisque at, vulputate vitae, pretium mattis, nunc. Mauris eget neque at sem venenatis eleifend. Ut nonummy.",
                    COD = 18000,
                    PictureUrl = "/images/products/p3.png",
                    Brand = "VNPOST",
                    Type = "Styrofoam",
                    Weight = 7.9,
                    Quantity = 1,
                    Date = DateTime.Now
                },
                new Product
                {
                    Name = "Product 4",
                    Description =
                        "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin pharetra nonummy pede. Mauris et orci.",
                    COD = 30000,
                    PictureUrl = "/images/products/p4.png",
                    Brand = "Customer",
                    Type = "Carton",
                    Weight = 16,
                    Quantity = 3,
                    Date = DateTime.Now
                },
            };

            foreach (var product in products)
            {
                context.Products.Add(product);
            }

            context.SaveChanges();
        }
    }
}