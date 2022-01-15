
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Models;
using System;

namespace BackEnd.Controllers {


    [ApiController]
    [Route("[controller]")]
    public class GameController : ControllerBase {

        private ChessContext context;
        public GameController(ChessContext Context) {
            context = Context;
        }

        [HttpPost]
        [Route("AddGame/{state}/{difficulty}/{Board}/{userId}/{name}/{moves}")]
        public async Task<ActionResult> Dodaj(string state, int difficulty, string Board,int userId,string name, int moves) {

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
            game.Moves = moves;
            context.Games.Add(game);
            await context.SaveChangesAsync();
            return Ok("Uspesno sacuvana igra");
            
        }

        [HttpGet]
        [Route("GetGames/{userId}")]
        public async Task<ActionResult> GetGames(int userId) {
            try {
                return  Ok(await context.Games.Where(g => g.User.ID == userId && g.state == 'u').ToListAsync());
            }
            catch(Exception e) {
                return BadRequest(e.Message);
            }
        }


        [HttpGet]
        [Route("GetStats/{userId}")]
        public ActionResult GetStats(int userId) {
            var user = context.Users.Include(u => u.Games).Where(u=> u.ID == userId).FirstOrDefault();
            if (user == null) {
                return BadRequest("Nema tog korisnika");
            }
            else {
                int avrgmoves = 0;
                int avrgftaken = 0;
                int avrgflost = 0;
                int wins = 0;
                int totalGamse = 0;
                foreach (Game g in user.Games) {
                    int ftaken = 16;
                    int flost = 16;
                    if(g.state == 'w') {
                        wins++;
                        totalGamse++;
                        avrgmoves+= g.Moves;
                        foreach(char c in g.Board.ToCharArray()) {
                            if (c != 'E' && char.IsUpper(c)) ftaken--;
                            else if (c != 'E' && char.IsLower(c)) flost--;
                        }
                    }
                    else if(g.state == 'l') {
                        totalGamse++;
                        avrgmoves += g.Moves;
                        foreach(char c in g.Board.ToCharArray()) {
                            if (c != 'E' && char.IsUpper(c)) ftaken--;
                            else if (c != 'E' && char.IsLower(c)) flost--;
                        }

                    }
                    avrgftaken += ftaken;
                    avrgflost += flost;
                }
                
                if (user.Games.Count() != 0) {
                    avrgmoves /= user.Games.Count();
                    avrgflost /= user.Games.Count();
                    avrgftaken /= user.Games.Count();
                }
                double winrate = (wins * 100.0)/ totalGamse;
                return Ok(new {Winrate = winrate, TotalGamse = totalGamse, Wins=wins, Loses = totalGamse - wins, AverageMoves = avrgmoves, AverageFiguresTaken = avrgftaken, AverageFiguresLost= avrgflost});
            }
        }

       
    }
}