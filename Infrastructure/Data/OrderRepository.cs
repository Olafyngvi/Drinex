using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities.OrderAggregate;
using Core.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data
{
    public class OrderRepository : IOrderRepository
    {
        private readonly StoreContext _context;
        public OrderRepository(StoreContext context)
        {
            _context = context;
        }

        public async Task<IReadOnlyList<Order>> GetOrdersAsync(OrderStatus status)
        {
             return await _context.Orders
                .Include(p => p.ShipToAddress)
                .Include(p => p.OrderItems)
                .Include(p => p.DeliveryMethod)
                .Where(x => x.Status == status)
                .ToListAsync();
        }
    }
}