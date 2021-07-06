using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities.Identity;
using Core.Interfaces;
using Core.Specifications;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data
{
    public class UsersRepository : IUsersRepository
    {
        private readonly UserManager<AppUser> _userManager;
        public UsersRepository(UserManager<AppUser> userManager)
        {
            _userManager = userManager;
        }

        public async Task<int> CountAsync(ISpecification<AppUser> spec)
        {
            return await ApplySpecification(spec).CountAsync();
        }

        public Task<AppUser> GetByEmailAsync(int id)
        {
            throw new System.NotImplementedException();
        }

        public async Task<AppUser> GetEntityWithSpec(ISpecification<AppUser> spec)
        {
            return await ApplySpecification(spec).FirstOrDefaultAsync();
        }

        public async Task<IReadOnlyList<AppUser>> ListAllAsync()
        {
            return await _userManager.Users.ToListAsync();
        }

        public async Task<IReadOnlyList<AppUser>> ListAsync(ISpecification<AppUser> spec)
        {
            var query = ApplySpecification(spec);

            return await query.ToListAsync();
        }

        private IQueryable<AppUser> ApplySpecification(ISpecification<AppUser> spec)
        {
            return UserSpecificationEvaluator<AppUser>.GetQuery(_userManager.Users.AsQueryable(), spec);
        }
    }
}