using EnrollmentSystem.Entities;
using Microsoft.AspNetCore.Mvc;

namespace EnrollmentSystem.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class StudentController : ControllerBase
    {
        private readonly ApplicationDbContext _db;

        private readonly ILogger<StudentController> _logger;

        public StudentController(ILogger<StudentController> logger
            , ApplicationDbContext db)
        {
            _logger = logger;
            _db = db;
        }

        [HttpPost]
        public IActionResult SaveStudent(Student student)
        {
            _db.Students.Add(student);
            _db.SaveChanges();

            return Ok(student);
        }

        [HttpGet]
        public IActionResult GetStudents()
        {
            var students = _db.Students.ToList();
            return Ok(students);
        }

        [HttpDelete]
        public IActionResult GetStudents(int studentId)
        {
            var student = _db.Students
                .FirstOrDefault(s => s.Id == studentId);

            _db.Students.Remove(student!);
            _db.SaveChanges();

            return Ok();
        }
    }
}