using API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class DataContext : IdentityDbContext<AppUser, AppRole, int,
        IdentityUserClaim<int>, AppUserRole, IdentityUserLogin<int>,
        IdentityRoleClaim<int>, IdentityUserToken<int>>
{
        // Setting up DataContext
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Game> Games { get; set; }
        public DbSet<Lottery> Lotteries { get; set; }
        public DbSet<BalanceTransaction> BalanceTransactions { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
                base.OnModelCreating(modelBuilder);
                // Because Game has 2 foreign keys to Lottery, we need to specify the relationship
                modelBuilder.Entity<Game>()
                       .HasOne(g => g.ResultLottery)
                       .WithOne(l => l.Game)
                       .HasForeignKey<Game>(g => g.ResultLotteryId);

                modelBuilder.Entity<AppUser>()
                        .HasMany(ur => ur.UserRoles)
                        .WithOne(u => u.User)
                        .HasForeignKey(ur => ur.UserId)
                        .IsRequired();

                modelBuilder.Entity<AppRole>()
                        .HasMany(ur => ur.UserRoles)
                        .WithOne(u => u.Role)
                        .HasForeignKey(ur => ur.RoleId)
                        .IsRequired();
        }
}