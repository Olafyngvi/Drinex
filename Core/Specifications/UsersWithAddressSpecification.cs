using Core.Entities.Identity;

namespace Core.Specifications
{
    public class UsersWithAddressSpecification : BaseSpecifcation<AppUser>
    {
        public UsersWithAddressSpecification(UsersSpecParams usersParams) : base(x => 
            (string.IsNullOrEmpty(usersParams.Search) || x.DisplayName.ToLower().Contains(usersParams.Search))
        )
        {
            AddInclude(x => x.Address);
            AddOrderBy(x => x.DisplayName);
            ApplyPaging(usersParams.PageSize * (usersParams.PageIndex - 1), usersParams.PageSize);

            if (!string.IsNullOrEmpty(usersParams.Sort))
            {
                switch (usersParams.Sort)
                {
                    case "nameAsc":
                        AddOrderBy(p => p.DisplayName);
                        break;
                    case "nameDesc":
                        AddOrderByDescending(p => p.DisplayName);
                        break;
                    default:
                        AddOrderBy(n => n.Email);
                        break;
                }
            }
        }

        public UsersWithAddressSpecification(string email) : base(x => x.Email == email)
        {
            AddInclude(x => x.Address);
        }
    }
}