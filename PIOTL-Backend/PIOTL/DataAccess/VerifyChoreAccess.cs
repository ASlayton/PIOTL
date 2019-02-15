using Dapper;
using PIOTL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PIOTL.DataAccess
{
    public class VerifyChoreAccess
    {
        DatabaseInterface _db;

        public VerifyChoreAccess(DatabaseInterface db)
        {
            _db = db;
        }

        //Get list of all chores needing to be verified
        public List<VerifyChore> GetRequestByFamilyId(int famId)
        {
            using (var db = _db.GetConnection())
            {
                var sql = db.Query<VerifyChore>(@"select * from VerifyChore where familyId = @id", new { id = famId }).ToList();
                return sql;
            }
        }

        // Delete Verification request

        public bool DeleteById(int requestId)
        {
            using (var db = _db.GetConnection())
            {
                var sql = db.Execute("Delete from VerifyChore Where Id = @id", new { id = requestId });
                return sql == 1;
            }
        }

        // Post new Memo

        public async Task<VerifyChore> PostRequest(VerifyChore VerifyChore)
        {
            using (var db = _db.GetConnection())
            {
                return await db.QueryFirstOrDefaultAsync<VerifyChore>(@"INSERT INTO [dbo].[VerifyChore]
                
                                 OUTPUT INSERTED.*
                                 VALUES
                                       (@choreListId
                                       ,@requestedBy
                                       ,@FamilyId
                                       ,@type)", VerifyChore);

            }
        }
    }
}
