using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class DataContext : DbContext
{
    // Setting up DataContext
    public DataContext(DbContextOptions options) : base(options)
    {
    }

    public DbSet<Game> Games { get; set; }
    public DbSet<Lottery> Lotteries { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        // Because Game has 2 foreign keys to Lottery, we need to specify the relationship
        modelBuilder.Entity<Game>()
               .HasOne(g => g.ResultLottery)
               .WithOne(l => l.Game)
               .HasForeignKey<Game>(g => g.ResultLotteryId);
    }
}