using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PIOTL.Models
{
    public class Message
    {
        public int Id { get; set; }
        public int SentFrom { get; set; }
        public int SentTo { get; set; }
        public string Messages { get; set; }
        public DateTime DateCreated { get; set; }
    }
}
