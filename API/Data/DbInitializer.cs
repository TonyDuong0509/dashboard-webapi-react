
using API.Entities;
using Microsoft.AspNetCore.Identity;

namespace API.Data
{
    public static class DbInitializer
    {
        public static async Task Initialize(StoreContext context, UserManager<User> userManager)
        {
            if (!userManager.Users.Any())
            {
                var user = new User
                {
                    UserName = "vietphil247",
                    Email = "vietphil247@gmail.com"
                };

                await userManager.CreateAsync(user, "Pa$$W0rd");
                await userManager.AddToRoleAsync(user, "Member");

                var admin = new User
                {
                    UserName = "admin",
                    Email = "admin@gmail.com"
                };

                await userManager.CreateAsync(admin, "AdminPa$$W0rd");
                await userManager.AddToRolesAsync(admin, new[] { "Admin", "Member" });
            }

            if (context.Products.Any()) return;

            var products = new List<Product>
            {
                new Product
                {
                    Name = "Product 1",
                    Description =
                        "Have 2 carton boxes",
                    COD = 20000,
                    PictureUrl = "/images/products/p1.png",
                    Brand = "SHOPEE",
                    Type = "Sea",
                    Weight = 5.5,
                    Quantity = 1,
                    Date = DateTime.Now,
                    IsGone = "Shipped",
                },
                new Product
                {
                    Name = "Product 2",
                    Description = "Just has 1 carton box",
                    COD = 200000,
                    PictureUrl = "/images/products/p2.png",
                    Brand = "GHTK",
                    Type = "Air",
                    Weight = 10,
                    Quantity = 1,
                    Date = DateTime.Now,
                    IsGone = "Shipped",
                },
                new Product
                {
                    Name = "Product 3",
                    Description =
                        "Have 2 carton boxes",
                    COD = 1800000,
                    PictureUrl = "/images/products/p3.png",
                    Brand = "VIETNAM POST",
                    Type = "Sea",
                    Weight = 7.9,
                    Quantity = 1,
                    Date = DateTime.Now,
                    IsGone = "At Home",
                },
                new Product
                {
                    Name = "Product 4",
                    Description =
                        "Have 3 carton boxes",
                    COD = 300000,
                    PictureUrl = "/images/products/p4.png",
                    Brand = "Customer",
                    Type = "Sea",
                    Weight = 16,
                    Quantity = 2,
                    Date = DateTime.Now,
                    IsGone = "Shipped",
                },
                new Product
                {
                    Name = "Product 5",
                    Description =
                        "Just has 1 carton box",
                    COD = 0,
                    PictureUrl = "/images/products/p5.jpg",
                    Brand = "VIETTEL POST",
                    Type = "Air",
                    Weight = 2,
                    Quantity = 1,
                    Date = DateTime.Now,
                    IsGone = "At Home",
                },
                new Product
                {
                    Name = "Product 6",
                    Description =
                        "Just has 1 carton box",
                    COD = 0,
                    PictureUrl = "/images/products/p5.jpg",
                    Brand = "VIETTEL POST",
                    Type = "Air",
                    Weight = 2,
                    Quantity = 1,
                    Date = DateTime.Now,
                    IsGone = "Shipped",
                },
                new Product
                {
                    Name = "Product 7",
                    Description =
                        "Just has 1 carton box",
                    COD = 0,
                    PictureUrl = "/images/products/p5.jpg",
                    Brand = "VIETTEL POST",
                    Type = "Air",
                    Weight = 2,
                    Quantity = 1,
                    Date = DateTime.Now,
                    IsGone = "At Home",
                },
                new Product
                {
                    Name = "Product 8",
                    Description =
                        "Just has 1 carton box",
                    COD = 0,
                    PictureUrl = "/images/products/p5.jpg",
                    Brand = "VIETTEL POST",
                    Type = "Air",
                    Weight = 2,
                    Quantity = 1,
                    Date = DateTime.Now,
                    IsGone = "At Home",
                },
                new Product
                {
                    Name = "Product 9",
                    Description =
                        "Just has 1 carton box",
                    COD = 0,
                    PictureUrl = "/images/products/p5.jpg",
                    Brand = "VIETTEL POST",
                    Type = "Air",
                    Weight = 2,
                    Quantity = 1,
                    Date = DateTime.Now,
                    IsGone = "Shipped",
                },
                new Product
                {
                    Name = "Product 10",
                    Description =
                        "Just has 1 carton box",
                    COD = 0,
                    PictureUrl = "/images/products/p5.jpg",
                    Brand = "VIETTEL POST",
                    Type = "Air",
                    Weight = 2,
                    Quantity = 1,
                    Date = DateTime.Now,
                    IsGone = "At Home",
                },
                new Product
                {
                    Name = "Product 11",
                    Description =
                        "Just has 1 carton box",
                    COD = 0,
                    PictureUrl = "/images/products/p5.jpg",
                    Brand = "VIETTEL POST",
                    Type = "Air",
                    Weight = 2,
                    Quantity = 1,
                    Date = DateTime.Now,
                    IsGone = "At Home",
                },
                new Product
                {
                    Name = "Product 12",
                    Description =
                        "Just has 1 carton box",
                    COD = 0,
                    PictureUrl = "/images/products/p5.jpg",
                    Brand = "VIETTEL POST",
                    Type = "Air",
                    Weight = 2,
                    Quantity = 1,
                    Date = DateTime.Now,
                    IsGone = "At Home",
                },
                new Product
                {
                    Name = "Product 13",
                    Description =
                        "Just has 1 carton box",
                    COD = 0,
                    PictureUrl = "/images/products/p5.jpg",
                    Brand = "VIETTEL POST",
                    Type = "Air",
                    Weight = 2,
                    Quantity = 1,
                    Date = DateTime.Now,
                    IsGone = "Shipped",
                },
                new Product
                {
                    Name = "Product 14",
                    Description =
                        "Just has 1 carton box",
                    COD = 0,
                    PictureUrl = "/images/products/p5.jpg",
                    Brand = "VIETTEL POST",
                    Type = "Air",
                    Weight = 2,
                    Quantity = 1,
                    Date = DateTime.Now,
                    IsGone = "At Home",
                },
                new Product
                {
                    Name = "Product 15",
                    Description =
                        "Just has 1 carton box",
                    COD = 0,
                    PictureUrl = "/images/products/p5.jpg",
                    Brand = "VIETTEL POST",
                    Type = "Air",
                    Weight = 2,
                    Quantity = 1,
                    Date = DateTime.Now,
                    IsGone = "At Home",
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