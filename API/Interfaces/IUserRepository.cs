using API.Entities;

namespace API.Interfaces;

public interface IUserRepository
{
    Task<AppUser> GetUserByIdAsync(int id);
    Task<List<AppUser>> GetUsersAsync();
    Task<AppUser?> GetUserByEmailAsync(string email);
    Task<bool> UpdateUserAsync(AppUser user);
}