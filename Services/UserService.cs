using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ManageLibrary.Entities;
using Microsoft.Extensions.Configuration;

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
            new User { Id = 1, FirstName = "Carl", LastName = "Johnson", Username = "test", Password = "test" }
        };

        public User Authenticate(string username, string password)
        {
            
            throw new NotImplementedException();
        }
    }
}
