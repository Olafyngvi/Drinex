using System.Collections.Generic;
using System.Threading.Tasks;
using Core.Entities.Identity;
using Core.Specifications;

namespace Core.Interfaces
{
    public interface IUsersRepository
    {
        Task<AppUser> GetByEmailAsync(int id);
        Task<IReadOnlyList<AppUser>> ListAllAsync();
        Task<AppUser> GetEntityWithSpec(ISpecification<AppUser> spec);
        Task<IReadOnlyList<AppUser>> ListAsync(ISpecification<AppUser> spec);
        Task<int> CountAsync(ISpecification<AppUser> spec);
    }
}