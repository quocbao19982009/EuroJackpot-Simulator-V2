using System.Text.Json;
using API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class Seed
{

    public static async Task SeedUsers(UserManager<AppUser> userManager, RoleManager<AppRole> roleManager)
    {
        // If there is already a user, return
        if (await userManager.Users.AnyAsync())
        {
            Console.WriteLine("Users already exist in the database.");
            return;
        }

        var userData = await File.ReadAllTextAsync("Data/UserSeedData.json");
        var options = new JsonSerializerOptions { PropertyNameCaseInsensitive = true }; // This is to ignore the case of the property
        var users = JsonSerializer.Deserialize<List<AppUser>>(userData, options) ?? throw new Exception("No users found in the seed data.");

        // Set roles in Database
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
            user.UserName = user.UserName.ToLower();
            user.Email = user.Email.ToLower();
            user.Created = DateTime.SpecifyKind(user.Created, DateTimeKind.Utc);
            await userManager.CreateAsync(user, "password");
            await userManager.AddToRoleAsync(user, "Member");
        }
        // Creating Admin
        var admin = new AppUser
        {
            UserName = "admin"
        };

        await userManager.CreateAsync(admin, "admin");
        await userManager.AddToRoleAsync(admin, "Admin");
    }

}
