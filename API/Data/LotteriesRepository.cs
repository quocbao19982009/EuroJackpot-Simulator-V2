using API.Data;
using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class LotteriesRepository(DataContext context) : ILotteriesRepository
{
    private readonly DataContext _context = context;

    public void AddLottery(Lottery lottery)
    {
        _context.Lotteries.Add(lottery);
    }

    public async Task<IEnumerable<Lottery>> GetLotteriesAsync()
    {
        return await _context.Lotteries.ToArrayAsync();
    }

    public async Task<bool> SaveAllAsync()
    {
        return await _context.SaveChangesAsync() > 0;
    }
}
