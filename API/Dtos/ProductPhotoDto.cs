using API.Helpers;
using Microsoft.AspNetCore.Http;

namespace API.Dtos
{
     public class ProductPhotoDto
     {
          
          [AllowedExtensions(new[] { ".jpg", ".png", ".jpeg" })]
          public IFormFile Photo { get; set; }
     }
}