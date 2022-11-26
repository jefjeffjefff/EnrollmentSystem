using System.ComponentModel.DataAnnotations;

namespace EnrollmentSystem.Entities
{
    public class Student
    {
        public int Id { get; set; }

        [Required]
        public string LastName { get; set; }

        [Required]
        public string FirstName { get; set; }

        [Required]
        public DateTime DateOfBirth { get; set; }

        public string Address { get; set; }
    }
}
