using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class BalanceTransactionRepository : IBalanceTransactionRepository
{
    private readonly DataContext _context;

    public BalanceTransactionRepository(DataContext context)
    {
        _context = context;
    }

    public async Task AddTransactionAsync(BalanceTransaction transaction)
    {
        await _context.BalanceTransactions.AddAsync(transaction);
    }

    public async Task<IEnumerable<BalanceTransaction>> GetTransactionsByUserIdAsync(int userId)
    {
        return await _context.BalanceTransactions
            .Where(transaction => transaction.UserId == userId)
            .ToListAsync();
    }

    public async Task<bool> SaveAllAsync()
    {
        return await _context.SaveChangesAsync() > 0;
    }
}