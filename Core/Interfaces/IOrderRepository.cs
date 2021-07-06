using System.Collections.Generic;
using System.Threading.Tasks;
using Core.Entities.OrderAggregate;

namespace Core.Interfaces
{
    public interface IOrderRepository
    {
        Task<IReadOnlyList<Order>> GetOrdersAsync(OrderStatus status);
    }
}