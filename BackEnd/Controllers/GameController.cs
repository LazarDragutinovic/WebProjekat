


using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Models;

namespace BackEnd.Controllers {


    [ApiController]
    [Route("[controller]")]
    public class GameController : ControllerBase {

        private ChessContext context;
        public GameController(ChessContext Context) {
            context = Context;
        }

        [HttpPost]
        [Route("AddGame/{state}/{difficulty}/{Board}/{userId}/{name}")]
        public async Task<ActionResult> Dodaj(string state, int difficulty, string Board,int userId,string name) {

            // if (state != 'w' && state != 'l' && state != 'u') {
            //     return BadRequest("Los state");
            // }
            if (difficulty <= 0 || difficulty >=5) return BadRequest("Los difficulty");

            if(Board.Length != 64) return BadRequest("Los board");

            User user = await context.Users.FindAsync(userId);
            Game game = new Game();
            game.state = state.ToCharArray()[0];
            game.Board = Board;
            game.difficulty = difficulty;
            game.User = user;
            game.Name = name;
            context.Games.Add(game);
            await context.SaveChangesAsync();
            return Ok("Uspesno sacuvan korisnik");
            
        }

       
    }
}