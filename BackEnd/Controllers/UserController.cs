using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Models;

namespace BackEnd.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {

        public ChessContext context;
        public UserController(ChessContext Context) {
            context = Context;
        }
       
        [HttpGet]
        [Route("Password/{username}")]
        public ActionResult PasswordText(string username) {
            User user = context.Users.Where(u=>u.Username == username).FirstOrDefault();
            if(user == null) return BadRequest(new {Message = "Nema tog korisnika"});
            return Ok(new {Message=user.PasswordText});
        }

        [HttpDelete]
        [Route("Delete/{userId}")]
        public ActionResult Delete(int userId) {
            
            try {
            User user = context.Users.Include(u=>u.Games).Include(u=>u.Achivments).Where(user=> user.ID == userId).FirstOrDefault();
            if (user == null) return BadRequest(new {Message="No user to be deleted"});
            
            context.Remove(user);
            context.SaveChanges();
            return Ok(new {Message="User deleted successfully"});
            }
            catch(Exception e) {
                return BadRequest(new {Message = e.Message});
            }
        }
        [HttpGet]
        [Route("Login/{username}/{password}")]
        public ActionResult Login(string username, string password) {
            var dbuser = context.Users.Where(u=> u.Username == username).FirstOrDefault();
            if (dbuser == null) {
                return BadRequest(new {Message = "Pogresan Username."});
            }
            else if (dbuser.Password != password) {
                return BadRequest(new {Message = "Pogresna Sifra."});
            }
            return Ok(dbuser);
        }

        [HttpPost]
        [Route("AddUser")]
        public async Task<ActionResult> Dodaj([FromBody] User user) {
            if(user.Username.Length < 10) {
                return BadRequest();
            }
            if(!char.IsLetter(user.Username.ToCharArray()[0])) {
                return BadRequest();
            }
            if(user.Password.Length < 8) return BadRequest("Losa Lozinka");
                        
            context.Users.Add(user);
            await context.SaveChangesAsync();
            return Ok(new {Id = user.ID, Username = user.Username});
        }

        [HttpGet]
        [Route("PreuzmiKorisnika/{username}")]

        public async Task<ActionResult> Preuzmi(string username) {

            try {
                User user = await context.Users.FindAsync(username);
                if(user != null) {
                    return Ok(user);
                }
                return BadRequest("Nema Korisnika");
            }
            catch(Exception e) {
                return BadRequest(e.Message);
            }
        }
        [HttpGet]
        [Route("PreuzmiKorisnike")]
        public ActionResult Korisnici() {
            try {
                var korisnici = context.Users.Include(p=>p.Games);
                return Ok(korisnici);
            }
            catch(Exception e) {
                return BadRequest(e.Message);
            }
        }
        
    }
}
