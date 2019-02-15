using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PIOTL.Models
{
    public class VerifyChore
    {
        public int Id { get; set; }
        public int ChoreListId { get; set; }
        public int RequestedBy { get; set; }
        public int FamilyId { get; set; }
        public int Type { get; set; }
    }
}
