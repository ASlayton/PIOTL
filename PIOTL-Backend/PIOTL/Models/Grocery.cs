using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PIOTL.Models
{
    public class Grocery
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Type { get; set; }
        public int Quantity { get; set; }
        public int AddedBy { get; set; }
        public bool Approved { get; set; }
        public DateTime DateAdded { get; set; }
    }
}
