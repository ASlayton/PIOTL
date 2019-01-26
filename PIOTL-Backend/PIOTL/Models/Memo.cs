using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PIOTL.Models
{
    public class Memo
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string Message { get; set; }
        public DateTime DateCreated { get; set; }
    }
}
