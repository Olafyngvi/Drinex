using System.Threading;
using System.Threading.Tasks;
using Core.Entities.Identity;

namespace Core.Interfaces
{
    public interface ITokenService
    {
        Task<string> CreateToken(AppUser user);
        Task<string> CreateGoogleToken(string displayNamem, string email);
    }
}