using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PIOTL.Models
{
    public class ChoresList
    {
        public int Id { get; set; }
        public DateTime DateAssigned { get; set; }
        public DateTime DateDue { get; set; }
        public int Completed { get; set; }
        public double AssignedTo { get; set; }
        public double AssignedBy { get; set; }
        public double Type { get; set;}
    }

    public class ChoresListByUser
    {
        public int Id { get; set; }
        public int AssignedTo { get; set; }
        public DateTime DateAssigned { get; set; }
        public Boolean Completed { get; set; }
        public string RoomName { get; set; }
        public string Type { get; set; }
        public double Worth { get; set; }
    }
}
