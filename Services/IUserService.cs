using ManageLibrary.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ManageLibrary.Services
{
    public interface IUserService
    {
        User Authenticate(string username, string password);
    }
}
