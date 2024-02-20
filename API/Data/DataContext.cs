using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class DataContext : DbContext
{
    // Setting up DataContext
    public DataContext(DbContextOptions options) : base(options)
    {
    }

    public DbSet<Lottery> Lotteries { get; set; }
}