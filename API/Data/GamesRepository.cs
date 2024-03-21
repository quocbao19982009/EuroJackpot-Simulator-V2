using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class GamesRepository(DataContext context) : IGamesRepository
{
    private readonly DataContext _context = context;
    public void AddGame(Game game)
    {
        _context.Games.Add(game);
    }

    public async Task<IEnumerable<Game>> GetAllGamesAsync()
    {
        // For relation, you would need to have Included the related entities
        return await _context.Games.Include(game => game.ResultLottery).Include(game => game.LotteriesPlayed).ToListAsync();
    }

    public async Task<bool> SaveAllAsync()
    {
        return await _context.SaveChangesAsync() > 0;
    }
}