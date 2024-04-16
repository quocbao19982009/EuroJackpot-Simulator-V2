namespace API.Interfaces;

public interface IUnitOfWork
{
    IGamesRepository GameRepository { get; }
    Task<bool> Complete();
}