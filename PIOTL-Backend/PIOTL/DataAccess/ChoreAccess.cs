using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PIOTL.Models;


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

        public List<Chore> GetChore()
        {
            using (var db = _db.GetConnection())
            {
                string sql = "Select * From Chores";
                return db.Query<Chore>(sql).ToList();
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
                                       SET [purchasedAt] = @purchasedAt
                                          ,[decommissionedAt] = @decommissionedAt
                                          ,[isNew] = @isNew
                                          ,[isWorking] = @isWorking
                                          ,[Make] = @make
                                          ,[Model] = @model
                                            Where Id = @id", Chore);
                return sql == 1;
            }
        }

        public async Task<ChoreWithEmployeeId> PostChoreAndAssignToEmployee(ChoreWithEmployeeId Chore)
        {
            var insertedChore = new ChoreWithEmployeeId(await PostChore(Chore));
            using (var db = _db.GetConnection())
            {
                var updated = db.Execute(@"UPDATE Employees
                                            SET ChoreId = @ChoreId
                                            WHERE id = @EmployeeId", new { ChoreId = insertedChore.Id, Chore.EmployeeId });
                if (updated == 1) insertedChore.EmployeeId = Chore.EmployeeId;
                return insertedChore;
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
                                       (@purchasedAt
                                       ,@decommissionedAt
                                       ,@isNew
                                       ,@isWorking
                                       ,@make
                                       ,@model)", Chore);

            }
        }
    }
}
