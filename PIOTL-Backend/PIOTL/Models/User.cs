using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PIOTL.Models
{
    public class User
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string FirebaseID { get; set; }
        public int FamilyId { get; set; }
        public bool Adult { get; set; }
        public double Earned { get; set; }
    }
}
