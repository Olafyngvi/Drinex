using Core.Entities;

namespace Core.Specifications
{
    public class ProductsWithFiltersForCountSpecification : BaseSpecifcation<Product>
    {
        public ProductsWithFiltersForCountSpecification(ProductSpecParams productParams)  : base(x => 
            ((string.IsNullOrEmpty(productParams.Search) || x.Name.ToLower().Contains(productParams.Search)) ||
            (string.IsNullOrEmpty(productParams.Search) || x.Sifra.ToLower().Contains(productParams.Search))) &&
            (!productParams.BrandId.HasValue || x.ProductBrandId == productParams.BrandId) &&
            (!productParams.TypeId.HasValue || x.ProductTypeId == productParams.TypeId) &&
            (!productParams.Izdvojen.HasValue || productParams.Izdvojen == x.Izdvojen) &&
            (!productParams.Novo.HasValue || productParams.Novo == x.Novo) &&
            (!productParams.Sale.HasValue || productParams.Sale == x.Sale)
            )
        {
            
        }
        
    }
}
