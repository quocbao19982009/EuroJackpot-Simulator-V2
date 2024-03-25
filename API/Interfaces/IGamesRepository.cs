using API.Entities;

namespace API.Interfaces;

public interface IGamesRepository
{
    Task<IEnumerable<Game>> GetAllGamesAsync();
    void AddGame(Game game);
    Task<bool> SaveAllAsync();
    Task<IEnumerable<Game>> GetGamesByUserIdAsync(int userId);
}
