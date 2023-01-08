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


        // Create
        [HttpPost]
        public IActionResult SaveStudent(Student student)
        {
            _db.Students.Add(student);
            _db.SaveChanges();

            return Ok(student);
        }

        [HttpPut]
        public async Task<IActionResult> UpdateStudent(Student student)
        {
            var currentStudent = _db.Students.FirstOrDefault(c => c.Id == student.Id);
            if (currentStudent != null)
            {
                currentStudent.FirstName = student.FirstName;
                currentStudent.LastName = student.LastName;
                currentStudent.DateOfBirth = student.DateOfBirth;
                currentStudent.Address = student.Address;

                _db.Students.Update(currentStudent);
                await _db.SaveChangesAsync();
            }

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