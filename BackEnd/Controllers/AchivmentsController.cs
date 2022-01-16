using System.Linq;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Models;
using System;

namespace BackEnd.Controllers {


    [ApiController]
    [Route("[controller]")]
    public class AchivmentsController : ControllerBase {

        private ChessContext context;
        public AchivmentsController(ChessContext Context) {
            context = Context;
        }

        [HttpGet]
        [Route("GetAchivments/{userId}")]
        public async Task<ActionResult> Achivments(int userId) {
            if(context.Users.Find(userId) == null) return BadRequest(new {Message = "Nema tog korisnika."});
            var achivments = await context.Achivments.Where(ac=>ac.User.ID == userId).ToListAsync();
            return Ok(achivments);
        }
        [HttpPost]
        [Route("AddAchivment/{userId}/{Name}/{Tier}/{Completed}")]
        public async Task<ActionResult> AddAchivment(int userId, string Name, string Tier,int Compleated) {
            var ach = new Achivment();
            try {
                User user = await context.Users.FindAsync(userId);
                if (user == null) return BadRequest(new {Message = "NemA tog korisnika"});
                ach.User = user;
                ach.Name = Name;
                ach.Tier = Tier;
                ach.Compleated = Compleated;
                context.Achivments.Add(ach);
                await context.SaveChangesAsync();
                return Ok(new {Message = "Uspesno sacuvan achivment"});

            }
            catch(Exception e) {
                return BadRequest(new {Message = e.Message});
            }
        }
        [HttpPut]
        [Route("UpdateAchivment/{achivmentId}/{compleated}")]
        public async Task<ActionResult> Update(int achivmentId,int compleated) {
            try {
                var ach = context.Achivments.Find(achivmentId);
                if (ach == null) return BadRequest(new {Message = "Nema tog achivmenta"});
                ach.Compleated = compleated;
                await context.SaveChangesAsync();
                return Ok(new {Message = "Sacuvane promene"});
            }   
            catch(Exception e) {
                return BadRequest(new {Message = e.Message});
            }        
        }
    

       
    }
}