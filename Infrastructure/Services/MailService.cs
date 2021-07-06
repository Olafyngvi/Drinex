using System.IO;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;
using Core.Entities;
using Core.Entities.OrderAggregate;
using Core.Interfaces;
using Microsoft.Extensions.Configuration;
using MimeKit;

namespace Infrastructure.Services
{
    public class MailService : IMailService
    {
        private readonly string mailFrom;
        private readonly string mailFromPassword;
        private readonly string mailTo;
        public MailService(IConfiguration config)
        {
            mailFrom = config.GetSection("Mail:mailFrom").Value;
            mailFromPassword = config.GetSection("Mail:fromPassword").Value;
            mailTo = config.GetSection("Mail:receiverMail").Value;
        }

        public async Task SendEmailAsync(Contact contact)
        {
            var fromAddress = new MailAddress(mailFrom, "Drinex Computers");
            var toAddress = new MailAddress(mailTo, "Poštovani");
            string fromPassword = mailFromPassword;
            const string subject = "UPIT";
            string body = contact.Mail
                          + "\n" +
                          contact.Name +
                          "\n" +
                          contact.PhoneNumber +
                          "\n" +
                          "Poštovani, \n" +
                          contact.Message
                           + "\nLijep pozdrav";
            var smtp = new SmtpClient
            {
                Host = "smtp.gmail.com",
                Port = 587,
                EnableSsl = true,
                DeliveryMethod = SmtpDeliveryMethod.Network,
                UseDefaultCredentials = false,
                Credentials = new NetworkCredential(fromAddress.Address, fromPassword)
            };
            var message = new MailMessage(fromAddress, toAddress);
            message.IsBodyHtml = true;
            message.Subject = subject;
            message.Body = body;

            await smtp.SendMailAsync(message);
        }

        public async Task SendOrderMailAsync(int orderNumber, string items, decimal total, string address)
        {
            string FilePath = Directory.GetCurrentDirectory() + "\\Templates\\Order.html";
            StreamReader str = new StreamReader(FilePath);
            string MailText = str.ReadToEnd();
            str.Close();
            MailText = MailText.Replace("[orderNumber]", orderNumber.ToString()).Replace("[items]", items).Replace("[total]", total.ToString()).Replace("[address]", address);
            var fromAddress = new MailAddress(mailFrom, "Drinex Computers");
            var toAddress = new MailAddress(mailTo, "");
            string fromPassword = mailFromPassword;
            const string subject = "Nova narudžba";
            var smtp = new SmtpClient
            {
                Host = "smtp.gmail.com",
                Port = 587,
                EnableSsl = true,
                DeliveryMethod = SmtpDeliveryMethod.Network,
                UseDefaultCredentials = false,
                Credentials = new NetworkCredential(fromAddress.Address, fromPassword)
            };
            var message = new MailMessage(fromAddress, toAddress);
            message.IsBodyHtml = true;
            message.Subject = subject;
            message.Body = MailText;
            await smtp.SendMailAsync(message);
        }

        public async Task SendPasswordResetMailAsync(Message message)
        {

            await SendPasswordReset(message);
        }

        public async Task SendWelcomeEmailAsync(Contact contact)
        {
            string FilePath = Directory.GetCurrentDirectory() + "\\Templates\\ContactChanged.html";
            StreamReader str = new StreamReader(FilePath);
            string MailText = str.ReadToEnd();
            str.Close();
            MailText = MailText.Replace("[ImePrezime]", contact.Name).Replace("[Email]", contact.Mail).Replace("[Telefon]", contact.PhoneNumber).Replace("[Poruka]", contact.Message);
            var fromAddress = new MailAddress(mailFrom, "Drinex Computers");
            var toAddress = new MailAddress(mailTo, "Poštovani");
            string fromPassword = mailFromPassword;
            const string subject = "Pitanje";
            var smtp = new SmtpClient
            {
                Host = "smtp.gmail.com",
                Port = 587,
                EnableSsl = true,
                DeliveryMethod = SmtpDeliveryMethod.Network,
                UseDefaultCredentials = false,
                Credentials = new NetworkCredential(fromAddress.Address, fromPassword)
            };
            var message = new MailMessage(fromAddress, toAddress);
            message.IsBodyHtml = true;
            message.Subject = subject;
            message.Body = MailText;
            await smtp.SendMailAsync(message);
        }

        private async Task SendPasswordReset(Message message)
        {
            string FilePath = Directory.GetCurrentDirectory() + "\\Templates\\PasswordReset.html";
            StreamReader str = new StreamReader(FilePath);
            string MailText = str.ReadToEnd();
            str.Close();
            MailText = MailText.Replace("[tekst]", message.To[0].ToString()).Replace("[link]", message.Content);
            var fromAddress = new MailAddress(mailFrom, "Drinex Computers");
            var toAddress = new MailAddress(message.To[0].ToString(), "");
            var subject = message.Subject;
            var smtp = new SmtpClient
            {
                Host = "smtp.gmail.com",
                Port = 587,
                EnableSsl = true,
                DeliveryMethod = SmtpDeliveryMethod.Network,
                UseDefaultCredentials = false,
                Credentials = new NetworkCredential(mailFrom, mailFromPassword)
            };
            var mail = new MailMessage(fromAddress, toAddress);
            mail.IsBodyHtml = true;
            mail.Subject = subject;
            mail.Body = MailText;
            await smtp.SendMailAsync(mail);
        }
    }
}