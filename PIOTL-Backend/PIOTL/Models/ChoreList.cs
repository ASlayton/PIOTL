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
        public bool Completed { get; set; }
        public int AssignedTo { get; set; }
        public string Room { get; set; }
        public int AssignedBy { get; set; }
        public string Type { get; set; }
        public double Worth { get; set; }
    }

    public class ChoresListByUser
    {
        public int Id { get; set; }
        public int AssignedTo { get; set; }
        public DateTime DateDue { get; set; }
        public bool Completed { get; set; }
        public string Room { get; set; }
        public string Type { get; set; }
        public double Worth { get; set; }
    }

    public class BaseChoresList
    {
        public int Id { get; set; }
        public DateTime DateAssigned { get; set; }
        public DateTime DateDue { get; set; }
        public bool Completed { get; set; }
        public int AssignedTo { get; set; }
        public int AssignedBy { get; set; }
        public int Type { get; set;}
        public int FamilyId { get; set; }
    }
}
