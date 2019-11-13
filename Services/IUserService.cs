using ManageLibrary.Entities;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ManageLibrary.Services
{
    public interface IUserService
    {
        string Authenticate(string username, string password);
    }
}
