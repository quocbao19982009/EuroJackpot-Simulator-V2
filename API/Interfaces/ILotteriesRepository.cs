using API.Entities;

namespace API.Interfaces;

public interface ILotteriesRepository
{
    Task<IEnumerable<Lottery>> GetLotteriesAsync();
    void AddLottery(Lottery lottery);
    Task<bool> SaveAllAsync();
}
