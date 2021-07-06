using Core.Entities.Identity;

namespace Core.Specifications
{
    public class UsersWithFiltersForCountSpecification : BaseSpecifcation<AppUser>
    {
        public UsersWithFiltersForCountSpecification(UsersSpecParams usersParams)  : base(x => 
            (string.IsNullOrEmpty(usersParams.Search) || x.DisplayName.ToLower().Contains(usersParams.Search)))
        {
        }
    }
}