using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using ManageLibrary.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace ManageLibrary.Services
{
    public class UserService : IUserService
    {
        public UserService(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        private List<User> _users = new List<User>
        {
            new User { Id = 1, FirstName = "Carl", LastName = "Johnson", Username = "test", Password = "test" },
            new User { Id = 2, FirstName = "Sony", LastName = "Whites", Username = "sample", Password = "123456" }
        };

        public User Authenticate(string username, string password)
        {
            var user = _users.SingleOrDefault(x => x.Username == username && x.Password == password);

            if(user == null)
            {
                return null;
            }

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(Configuration.GetValue<string>("AuthorityManagement:Secret"));
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[] {
                    new Claim(ClaimTypes.Name, user.Id.ToString())
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);

            user.Token = tokenHandler.WriteToken(token);
            user.Password = null;

            return user;
        }

        public IEnumerable<User> GetUsersForClient()
        {
            foreach(var user in _users)
            {
                user.Password = null;
            }

            return _users;
        }
    }
}
