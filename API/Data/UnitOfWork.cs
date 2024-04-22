using API.Data;
using API.Interfaces;

public class UnitOfWork : IUnitOfWork
{
    private readonly DataContext _context;
    private IGamesRepository _gamesRepository;

    public UnitOfWork(DataContext context)
    {
        _context = context;
        _gamesRepository = new GamesRepository(_context);
    }


    public IGamesRepository GameRepository
    {
        get
        {
            _gamesRepository ??= new GamesRepository(_context);
            return _gamesRepository;
        }
    }

    public async Task<bool> Complete()
    {
        return await _context.SaveChangesAsync() > 0;
    }
}