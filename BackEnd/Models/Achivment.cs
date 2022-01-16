


using System;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Models {
    public class Achivment {
        [Key]
        public int Id { get; set; }
        [Required]
        [MaxLength]
        public string Name { get; set; }
        public string Tier { get; set; }
        public DateTime DateOfAchivment { get; set; }

        [Range(0,100)]
        public int Compleated {get;set;}
        [JsonIgnore]
        public User User { get; set; }
    }
}