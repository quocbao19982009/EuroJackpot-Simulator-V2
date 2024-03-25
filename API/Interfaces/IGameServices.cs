using API.DTOs;
using API.Entities;

namespace API.Interfaces
{
    public interface IGameService
    {
        Task<GameDto> CreateGameAsync(IEnumerable<LotteryInput> tickets, int UserId);
        Task<IEnumerable<GameDto>> GetAllGamesAsync();
        Task<IEnumerable<GameDto>> GetGamesByUserIdAsync(int userId);
    }
}