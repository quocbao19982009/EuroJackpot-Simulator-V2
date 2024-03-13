using API.Entities;

namespace API.Interfaces;

public interface IGamesRepository
{
    Task<IEnumerable<Game>> GetGamesAsync();
    void AddGame(Game game);
    Task<bool> SaveAllAsync();
}
