using API.DTOs;
using API.Entities;

namespace API.Interfaces
{
    public interface IGameService
    {
        Task<GameDto> CreateGameAsync(IEnumerable<LotteryInput> tickets);
    }
}