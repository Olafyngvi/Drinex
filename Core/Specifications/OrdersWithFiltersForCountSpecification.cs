using Core.Entities.OrderAggregate;

namespace Core.Specifications
{
    public class OrdersWithFiltersForCountSpecification : BaseSpecifcation<Order>
    {
        public OrdersWithFiltersForCountSpecification(OrderSpecParams orderParams) : base(x =>
        (string.IsNullOrEmpty(orderParams.Search) || x.ShipToAddress.FirstName.ToLower().Contains(orderParams.Search) || x.ShipToAddress.LastName.ToLower().Contains(orderParams.Search)) && (orderParams.status.ToString() == "None" || x.Status.Equals(orderParams.status)))
        {
        }
    }
}