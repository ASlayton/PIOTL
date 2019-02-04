using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PIOTL.Models;
using Dapper;


namespace PIOTL.DataAccess
{
    public class ChoresListAccess
    {
        DatabaseInterface _db;

        public ChoresListAccess(DatabaseInterface db)
        {
            _db = db;
        }

        //Get all ChoresLists

        public List<ChoresList> GetAllChoresLists()
        {
            using (var db = _db.GetConnection())
            {
                string sql = "Select * From ChoresList";
                return db.Query<ChoresList>(sql).ToList();
            }
        }

        //Get all ChoresLists for certain user

        public List<ChoresList> GetAllChoresListbyUser(int userId)
        {
            using (var db = _db.GetConnection())
            {
                var sql = db.Query<ChoresList>(@"SELECT *
                                FROM ChoresList
                                WHERE ChoresList.assignedTo = @id;", new { id = userId }).ToList();
                return sql;
            }
        }

        // Get Single ChoresList 
        public ChoresList GetChoresListById(int ChoresListId)
        {
            using (var db = _db.GetConnection())
            {
                var sql = db.QueryFirstOrDefault<ChoresList>(@"SELECT * From ChoresList Where Id = @id", new { id = ChoresListId });
                return sql;
            }
        }

        // Delete Single ChoresList

        public bool DeleteById(int ChoresListId)
        {
            using (var db = _db.GetConnection())
            {
                var sql = db.Execute("Delete from ChoresList Where Id = @id", new { id = ChoresListId });
                return sql == 1;
            }
        }

        // Update ChoresList
        public bool UpdateChoresList(ChoresList ChoresList)
        {
            using (var db = _db.GetConnection())
            {
                var sql = db.Execute(@"UPDATE [dbo].[ChoresList]
                                       SET [dateAssigned] = @dateAssigned
                                          ,[completed] = @completed
                                          ,[assignedBy] = @assignedBy
                                          ,[assignedTo] = @assignedTo
                                          ,[type] = @type", ChoresList);
                return sql == 1;
            }
        }

        // Post new ChoresList

        public async Task<ChoresList> PostChoresList(ChoresList ChoresList)
        {
            using (var db = _db.GetConnection())
            {
                return await db.QueryFirstOrDefaultAsync<ChoresList>(@"INSERT INTO [dbo].[ChoresList]
                
                                 OUTPUT INSERTED.*
                                 VALUES
                                       (@dateAssigned
                                       ,@completed
                                       ,@assignedBy
                                       ,@assignedTo
                                       ,@type)", ChoresList);

            }
        }
    }
}
