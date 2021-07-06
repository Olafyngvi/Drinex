using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core.Entities;
using Core.Entities.OrderAggregate;
using Core.Interfaces;
using Core.Specifications;

namespace Infrastructure.Services
{
    public class OrderService : IOrderService
    {
        private readonly IBasketRepository _basketRepo;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IPaymentService _paymentService;
        private readonly IMailService _mailService;
        public OrderService(IBasketRepository basketRepo, IMailService mailService, IUnitOfWork unitOfWork, IPaymentService paymentService)
        {
            _paymentService = paymentService;
            _unitOfWork = unitOfWork;
            _basketRepo = basketRepo;
            _mailService = mailService;
        }

        public async Task<Order> CreateOrderAsync(string buyerEmail, int delieveryMethodId, string basketId, Address shippingAddress)
        {
            // get basket from repo
            var basket = await _basketRepo.GetBasketAsync(basketId);
            StringBuilder mailOrderContent = new StringBuilder();
            // get items from the product repo
            var items = new List<OrderItem>();
            foreach (var item in basket.Items)
            {
                var spec = new ProductWithPhotosSpecification(item.Id);
                var productItem = await _unitOfWork.Repository<Product>().GetEntityWithSpec(spec);
                var itemOrdered = new ProductItemOrdered(productItem.Id, productItem.Name, productItem.Photos.SingleOrDefault(x => Convert.ToInt32(x.IsMain) == 1)?.PictureUrl);
                mailOrderContent.Append($"<tr style=\"border-collapse:collapse\"><td width=\"80%\" style=\"padding:0;Margin:0\"><h4 style=\"Margin:0;line-height:120%;mso-line-height-rule:exactly;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif\">{productItem.Name}</h4></td><td width=\"20%\" style=\"padding:0;Margin:0\"><h4 style=\"Margin:0;float:left;line-height:120%;mso-line-height-rule:exactly;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif\">{item.Price} KM</h4></td><td width=\"20%\" style=\"padding:0;Margin:0\"><h4 style=\"Margin:0;line-height:120%;mso-line-height-rule:exactly;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif\">{item.Quantity}</h4></td></tr> ");
                var orderItem = new OrderItem(itemOrdered, productItem.Price, item.Quantity);
                items.Add(orderItem);
            }

            // get delivery method from repo
            var deliveryMethod = await _unitOfWork.Repository<DeliveryMethod>().GetByIdAsync(delieveryMethodId);

            // calc subtotal
            var subtotal = items.Sum(item => item.Price * item.Quantity);

            // check to see if order exists
            // var spec = new OrderByPaymentIntentWithItemsSpecification(basket.PaymentIntentId);
            //var existingOrder = await _unitOfWork.Repository<Order>().GetEntityWithSpec(spec);

            // create order
            var order = new Order(items, buyerEmail, shippingAddress, deliveryMethod, subtotal, basket.PaymentIntentId);
            _unitOfWork.Repository<Order>().Add(order);
            StringBuilder mailShippingInfo = 
            new StringBuilder($"<p>{shippingAddress.FirstName} {shippingAddress.LastName}</p><p>{shippingAddress.Street}</p><p>{shippingAddress.City}</p><p>{shippingAddress.ZipCode}</p><p>{shippingAddress.State}</p>");

            /*if (existingOrder != null)
            {
                _unitOfWork.Repository<Order>().Delete(existingOrder);
                await _paymentService.CreateOrUpdatePaymentIntent(basket.Id);
            }*/
                // Update Stock
            foreach (var item in basket.Items)
            {
                var productItem = await _unitOfWork.Repository<Product>().GetByIdAsync(item.Id);
                productItem.Stock -= item.Quantity;
                _unitOfWork.Repository<Product>().Update(productItem);
            }
            // TODO: save to db
            var result = await _unitOfWork.Complete();

            if (result <= 0)
            {
                return null;
            } 
            else 
            {
                // send mail
                await _mailService.SendOrderMailAsync(order.Id,mailOrderContent.ToString(),subtotal,mailShippingInfo.ToString());
                // return order
                return order;
            }
        }

        public async Task<IReadOnlyList<DeliveryMethod>> GetDeliveryMethodsAsync()
        {
            return await _unitOfWork.Repository<DeliveryMethod>().ListAllAsync();
        }

        public async Task<Order> GetOrderByIdAdminAsync(int id)
        {
            var spec = new OrdersWithItemsAndOrderingByIdSpecification(id);

            return await _unitOfWork.Repository<Order>().GetEntityWithSpec(spec);
        }

        public async Task<Order> GetOrderByIdAsync(int id, string buyerEmail)
        {
            var spec = new OrdersWithItemsAndOrderingSpecification(id, buyerEmail);

            return await _unitOfWork.Repository<Order>().GetEntityWithSpec(spec);
        }

        public async Task<IReadOnlyList<Order>> GetOrdersForUserAsync(string buyerEmail)
        {
            var spec = new OrdersWithItemsAndOrderingSpecification(buyerEmail);

            return await _unitOfWork.Repository<Order>().ListAsync(spec);
        }

        public async Task<Order> UpdateOrder(int id)
        {
            var spec = new OrdersWithItemsAndOrderingByIdSpecification(id);

            var order = await _unitOfWork.Repository<Order>().GetEntityWithSpec(spec);
            if (order != null)
                order.Status = OrderStatus.Shipped;
            
            _unitOfWork.Repository<Order>().Update(order);
            var result = await _unitOfWork.Complete();

            if (result <= 0)
            {
                return null;
            } 
            else 
            {
                // return order
                return order;
            }
        }
    }
}
