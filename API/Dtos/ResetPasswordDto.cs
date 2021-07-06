using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace API.Dtos
{
    public class ResetPasswordDto
    {
        [Required]
        [RegularExpression("^(?=.*[a-zA-Z])(?=.*[0-9])[A-Za-z0-9]{6,64}$", 
            ErrorMessage = "Lozinka može sadržavati slova i brojeve i mora sadržavati barem 6 karaktera")]
        public string Password { get; set; }

        [Compare("Password", ErrorMessage = "Lozinka i potvrda lozinke se ne podudaraju.")]
        public string ConfirmPassword { get; set; }

        public string Email { get; set; }
        public string Token { get; set; }
    }
}