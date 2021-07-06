using System.ComponentModel.DataAnnotations;

namespace API.Dtos
{
    public class RegisterDto
    {
        [Required]
        public string DisplayName { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [RegularExpression("^(?=.*[a-zA-Z])(?=.*[0-9])[A-Za-z0-9]{6,64}$", 
            ErrorMessage = "Lozinka može sadržavati slova i brojeve i mora sadržavati barem 6 karaktera")]
        public string Password { get; set; }
    }
}