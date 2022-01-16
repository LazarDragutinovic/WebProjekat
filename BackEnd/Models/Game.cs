


using System;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Models
{
    
    public class Game 
    {


        [Key]
        public int ID { get; set; }
        public char state { get; set; }
        public int difficulty { get; set; }
        

        public int Moves { get; set; }
        [MaxLength(60)]
        [Required]
        public string Name { get; set; }
        [MaxLength(64)]
        public string Board { get; set; }
        [JsonIgnore]
        public User User { get; set; }
    }
}