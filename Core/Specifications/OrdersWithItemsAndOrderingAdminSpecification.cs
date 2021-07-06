using Core.Entities.OrderAggregate;

namespace Core.Specifications
{
    public class OrdersWithItemsAndOrderingAdminSpecification : BaseSpecifcation<Order>
    {
        public OrdersWithItemsAndOrderingAdminSpecification(OrderSpecParams orderParams) : base(x =>
        (string.IsNullOrEmpty(orderParams.Search) || x.ShipToAddress.FirstName.ToLower().Contains(orderParams.Search) || x.ShipToAddress.LastName.ToLower().Contains(orderParams.Search)) && (orderParams.status.ToString() == "None" || x.Status.Equals(orderParams.status)))
        {
            AddInclude(x => x.ShipToAddress);
            AddInclude(o => o.OrderItems);
            AddInclude(o => o.DeliveryMethod);
            AddOrderBy(x => x.OrderDate);
            ApplyPaging(orderParams.PageSize * (orderParams.PageIndex - 1), orderParams.PageSize);

        }
        public OrdersWithItemsAndOrderingAdminSpecification(int id) : base(x => x.Id == id)
        {
            AddInclude(x => x.ShipToAddress);
            AddInclude(o => o.OrderItems);
            AddInclude(o => o.DeliveryMethod);
        }
    }
}