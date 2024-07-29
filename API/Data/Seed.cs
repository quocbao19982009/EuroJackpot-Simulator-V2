using System.Text.Json;
using API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class Seed
{

    public static async Task SeedUsers(UserManager<AppUser> userManager, RoleManager<AppRole> roleManager)
    {
        if (await userManager.Users.AnyAsync())
        {
            Console.WriteLine("Users already exist in the database.");
            return;
        }

        var userData = await File.ReadAllTextAsync("Data/UserSeedData.json");
        var options = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };
        var users = JsonSerializer.Deserialize<List<AppUser>>(userData, options) ?? throw new Exception("No users found in the seed data.");

        var roles = new List<AppRole>{
            new AppRole{Name = "Member"},
            new AppRole{Name = "Admin"},
        };

        foreach (var role in roles)
        {
            await roleManager.CreateAsync(role);
        }

        foreach (var user in users)
        {
            var newAppUser = new AppUser();
            if (user.Email != null && user.UserName != null && await userManager.FindByEmailAsync(user.Email) == null)
            {
                newAppUser.UserName = user.UserName;
                newAppUser.Email = user.Email.ToLower();
                newAppUser.Created = DateTime.SpecifyKind(user.Created, DateTimeKind.Utc);
                newAppUser.Balance = user.Balance;
            }

            await userManager.CreateAsync(newAppUser, "password");
            await userManager.AddToRoleAsync(newAppUser, "Member");
        }

        var admin = new AppUser
        {
            UserName = "admin"
        };

        await userManager.CreateAsync(admin, "admin");
        await userManager.AddToRoleAsync(admin, "Admin");
    }

}
