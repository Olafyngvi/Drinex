using Core.Entities;

namespace Core.Specifications
{
    public class ProductWithPhotosSpecification : BaseSpecifcation<Product>
    {


        public ProductWithPhotosSpecification(int id) : base(x => x.Id == id)
        {
            AddInclude(x => x.ProductType);
            AddInclude(x => x.ProductBrand);
            AddInclude(x => x.Photos);
        }
    }
}