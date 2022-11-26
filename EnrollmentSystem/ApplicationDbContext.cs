using EnrollmentSystem.Entities;
using Microsoft.EntityFrameworkCore;

namespace EnrollmentSystem
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Student> Students { get; set; }
    }
}
