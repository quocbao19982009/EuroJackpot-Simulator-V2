using API.Entities;

namespace API.Interfaces
{
    public interface IBalanceTransactionRepository
    {
        Task AddTransactionAsync(BalanceTransaction transaction);
        Task<IEnumerable<BalanceTransaction>> GetTransactionsByUserIdAsync(int userId);
        Task<bool> SaveAllAsync();
    }
}