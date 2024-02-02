
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
                    Type = "Sea",
                    Weight = 5.5,
                    Quantity = 1,
                    Date = DateTime.Now,
                    Status = true,
                },
                new Product
                {
                    Name = "Product 2",
                    Description = "Nunc viverra imperdiet enim. Fusce est. Vivamus a tellus.",
                    COD = 15000,
                    PictureUrl = "/images/products/p2.png",
                    Brand = "GHTK",
                    Type = "Air",
                    Weight = 10,
                    Quantity = 1,
                    Date = DateTime.Now,
                    Status = true,
        },
                new Product
                {
                    Name = "Product 3",
                    Description =
                        "Suspendisse dui purus, scelerisque at, vulputate vitae, pretium mattis, nunc. Mauris eget neque at sem venenatis eleifend. Ut nonummy.",
                    COD = 1800000,
                    PictureUrl = "/images/products/p3.png",
                    Brand = "VNPOST",
                    Type = "Sea",
                    Weight = 7.9,
                    Quantity = 1,
                    Date = DateTime.Now,
                    Status = false,
    },
                new Product
                {
                    Name = "Product 4",
                    Description =
                        "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin pharetra nonummy pede. Mauris et orci.",
                    COD = 300000,
                    PictureUrl = "/images/products/p4.png",
                    Brand = "Customer",
                    Type = "Sea",
                    Weight = 16,
                    Quantity = 2,
                    Date = DateTime.Now,
                    Status = true,
},
                new Product
                {
                    Name = "Product 5",
                    Description =
                        "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin pharetra nonummy pede. Mauris et orci.",
                    COD = 0,
                    PictureUrl = "/images/products/p4.png",
                    Brand = "Customer",
                    Type = "Air",
                    Weight = 2,
                    Quantity = 1,
                    Date = DateTime.Now,
                    Status = false,
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