using Dapper;
using PIOTL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PIOTL.DataAccess
{
    public class FamilyAccess
    {
        DatabaseInterface _db;

        public FamilyAccess(DatabaseInterface db)
        {
            _db = db;
        }

        // Get Single Family by name
        public Family GetFamilyByName(string name)
        {
            using (var db = _db.GetConnection())
            {
                var sql = db.QueryFirstOrDefault<Family>(@"SELECT * From Family Where name = @name", new { name });
                return sql;
            }
        }

        // Get Single Family by id
        public Family GetFamilyById(int id)
        {
            using (var db = _db.GetConnection())
            {
                var sql = db.QueryFirstOrDefault<Family>(@"SELECT * From Family Where id = @id", new { id });
                return sql;
            }
        }

        // Post new family

        public async Task<Family> PostFamily(Family Family)
        {
            using (var db = _db.GetConnection())
            {
                return await db.QueryFirstOrDefaultAsync<Family>(@"INSERT INTO [dbo].[Family]
                
                                 OUTPUT INSERTED.*
                                 VALUES
                                       (@name)", Family);

            }
        }
    }
}
