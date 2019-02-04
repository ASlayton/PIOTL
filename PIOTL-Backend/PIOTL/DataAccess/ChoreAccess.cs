using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PIOTL.Models;
using Dapper;


namespace PIOTL.DataAccess
{
    public class ChoreAccess
    {
        DatabaseInterface _db;

        public ChoreAccess(DatabaseInterface db)
        {
            _db = db;
        }

        //Get all Chores

        public List<Chore> GetAllChores()
        {
            using (var db = _db.GetConnection())
            {
                string sql = "Select * From Choreslist";
                return db.Query<Chore>(sql).ToList();
            }
        }

        //Get all Chores for certain user

        public List<Chore> GetAllChoresbyUser(int userId)
        {
            using (var db = _db.GetConnection())
            {
                var sql = db.Query<Chore>(@"select * from Chores ch
                               join ChoresList cl
                               on cl.type = ch.id
                               where cl.assignedTo = @id; ", new { id = userId}).ToList();
                return sql;
            }
        }

        // Get Single Chore 
        public Chore GetChoreById(int ChoreId)
        {
            using (var db = _db.GetConnection())
            {
                var sql = db.QueryFirstOrDefault<Chore>(@"SELECT * From Chores Where Id = @id", new { id = ChoreId });
                return sql;
            }
        }

        // Delete Single Chore

        public bool DeleteById(int ChoreId)
        {
            using (var db = _db.GetConnection())
            {
                var sql = db.Execute("Delete from Chores Where Id = @id", new { id = ChoreId });
                return sql == 1;
            }
        }

        // Update Chore
        public bool UpdateChore(Chore Chore)
        {
            using (var db = _db.GetConnection())
            {
                var sql = db.Execute(@"UPDATE [dbo].[Chores]
                                       SET [name] = @name
                                          ,[room] = @room
                                          ,[Interval] = @interval
                                          ,[worthAmt] = @worthAmt", Chore);
                return sql == 1;
            }
        }

        // Post new Chore

        public async Task<Chore> PostChore(Chore Chore)
        {
            using (var db = _db.GetConnection())
            {
                return await db.QueryFirstOrDefaultAsync<Chore>(@"INSERT INTO [dbo].[Chores]
                
                                 OUTPUT INSERTED.*
                                 VALUES
                                       (@name
                                       ,@room
                                       ,@interval
                                       ,@worthAmt)", Chore);

            }
        }
    }
}
