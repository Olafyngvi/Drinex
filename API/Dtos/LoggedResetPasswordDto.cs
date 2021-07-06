using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace API.Dtos
{
    public class LoggedResetPasswordDto
    {
        [Required(ErrorMessage = "Lozinka je obavezna")]
        public string Password { get; set; }

        [Required]
        [RegularExpression("^(?=.*[a-zA-Z])(?=.*[0-9])[A-Za-z0-9]{6,64}$", 
            ErrorMessage = "Lozinka može sadržavati slova i brojeve i mora sadržavati barem 6 karaktera")]
        public string NewPassword { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

    }
}