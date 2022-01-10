

using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Models {


    public class User {

        

        [Key]
        public int ID { get; set; }
        [MaxLength(60)]
        public string Username { get; set; }

        [MaxLength(60)]
        [Required]
        public string Password { get; set; }

        [MaxLength(180)]
        [Required]
        public string PasswordText { get; set; }

        public virtual List<Game> Games {get;set;}
    }
}