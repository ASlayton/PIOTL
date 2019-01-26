using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PIOTL.Models
{
    public class Chore
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Room { get; set; }
        public int Interval { get; set; }
        public double WorthAmt { get; set; }
    }
}
