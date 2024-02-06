
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
                    Name = "Vân Elysia",
                    Description =
                        "KBE - 7/2/2024: Đã thanh toán",
                    COD = 20000,
                    PictureUrl = "/images/products/p1.jpg",
                    Brand = "Khách hàng",
                    Type = "SEA",
                    Weight = 0,
                    Quantity = 1,
                     isWeighed = false,
                    Date = DateTime.Now,

                },
                new Product
                {
                    Name = "Zalo Turbo",
                    Description = "KBE - 7/2/2024: Đã thanh toán",
                    COD = 1548000,
                    PictureUrl = "/images/products/p2.jpg",
                    Brand = "Khách hàng",
                    Type = "SEA",
                    Weight = 20.85,
                    Quantity = 2,
                     isWeighed = false,
                    Date = DateTime.Now,

                },
                new Product
                {
                    Name = "Bé Ty",
                    Description =
                        "KBE - 7/2/2024: Có 2 kiện",
                    COD = 0,
                    PictureUrl = "/images/products/p3.jpg",
                    Brand = "Khách hàng",
                    Type = "SEA",
                    Weight = 13.1,
                    Quantity = 2,
                     isWeighed = false,
                    Date = DateTime.Now,

                },
                new Product
                {
                    Name = "Fb Nguyen Lina",
                    Description =
                        "KBE - 7/2/2024: 1 kiện Vali",
                    COD = 0,
                    PictureUrl = "/images/products/p4.jpg",
                    Brand = "Khách hàng",
                    Type = "SEA",
                    Weight = 26.6,
                    Quantity = 1,
                     isWeighed = false,
                    Date = DateTime.Now,

                },
                new Product
                {
                    Name = "Narima Phan Hồng Vân",
                    Description =
                        "KBE - 7/2/2024: 1 kiện carton",
                    COD = 0,
                    PictureUrl = "/images/products/p5.jpg",
                    Brand = "Khách hàng",
                    Type = "SEA",
                    Weight = 8.85,
                    Quantity = 1,
                     isWeighed = false,
                    Date = DateTime.Now,

                },
                new Product
                {
                    Name = "JN Lim",
                    Description =
                        "KBE - 7/2/2024: 1 kiện carton",
                    COD = 0,
                    PictureUrl = "/images/products/p6.jpg",
                    Brand = "Khách hàng",
                    Type = "SEA",
                    Weight = 2.55,
                    Quantity = 1,
                     isWeighed = false,
                    Date = DateTime.Now,

                },
                new Product
                {
                    Name = "Tuyết Anh - kiện 1",
                    Description =
                        "KBE - 7/2/2024: 2 kiện carton",
                    COD = 0,
                    PictureUrl = "/images/products/p7.jpg",
                    Brand = "Khách hàng",
                    Type = "SEA",
                    Weight = 4.2,
                    Quantity = 1,
                     isWeighed = false,
                    Date = DateTime.Now,

                },
                new Product
                {
                    Name = "Tuyết Anh - kiện 2",
                    Description =
                        "KBE - 7/2/2024: 2 kiện carton",
                    COD = 0,
                    PictureUrl = "/images/products/p8.jpg",
                    Brand = "Khách hàng",
                    Type = "SEA",
                    Weight = 1.75,
                    Quantity = 1,
                     isWeighed = false,
                    Date = DateTime.Now,

                },
                new Product
                {
                    Name = "Peter Nguyễn Văn Tú",
                    Description =
                       "KBE - 7/2/2024: 1 kiện carton",
                    COD = 0,
                    PictureUrl = "/images/products/p9.jpg",
                    Brand = "Khách hàng",
                    Type = "SEA",
                    Weight = 34.4,
                    Quantity = 1,
                     isWeighed = false,
                    Date = DateTime.Now,

                },
                new Product
                {
                    Name = "Fb Yumi Thảo",
                    Description =
                        "KBE - 7/2/2024: 3 kiện carton. Đã thanh toán",
                    COD = 0,
                    PictureUrl = "/images/products/p10.jpg",
                    Brand = "Khách hàng",
                    Type = "SEA",
                    Weight = 0,
                    Quantity = 3,
                     isWeighed = false,
                    Date = DateTime.Now,

                },
                new Product
                {
                    Name = "Phương Châm",
                    Description =
                       "KBE - 7/2/2024: 1 kiện carton",
                    COD = 0,
                    PictureUrl = "/images/products/p11.jpg",
                    Brand = "Khách hàng",
                    Type = "SEA",
                    Weight = 1,
                    Quantity = 1,
                     isWeighed = false,
                    Date = DateTime.Now,

                }
            };

            foreach (var product in products)
            {
                context.Products.Add(product);
            }

            context.SaveChanges();
        }
    }
}