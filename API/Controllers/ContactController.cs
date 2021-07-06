using System;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;
using Core.Entities.OrderAggregate;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace API.Controllers
{
    public class ContactController : BaseApiController
    {

        private readonly IMailService _mailService;
        public ContactController(IConfiguration config, IMailService mailService)
        {
            _mailService = mailService;
        }

        [HttpPost]
        public async Task<IActionResult> GetMessage(Contact contact)
        {
          try
          {
            await _mailService.SendWelcomeEmailAsync(contact);
            return Ok();
          } catch (Exception)
            {
            throw;
          }
            
        }
    }
}