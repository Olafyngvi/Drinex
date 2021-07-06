using System.Threading.Tasks;
using Core.Entities;

namespace Core.Interfaces
{
    public interface IMailService
    {
        Task SendEmailAsync(Entities.OrderAggregate.Contact contact);
        Task SendWelcomeEmailAsync(Entities.OrderAggregate.Contact contact);
        Task SendOrderMailAsync(int orderNumber,string items, decimal total, string address);
        Task SendPasswordResetMailAsync(Message message);
    }
}