
using Microsoft.EntityFrameworkCore;

namespace Models {


    public class ChessContext : DbContext {
        public DbSet<User> Users { get; set; }  
        public DbSet<Game> Games { get; set; }

        public ChessContext(DbContextOptions options) : base(options) {}
        
    }
}