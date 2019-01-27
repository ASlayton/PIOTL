using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PIOTL.Models;


namespace PIOTL.DataAccess
{
    public class MemoAccess
    {
        DatabaseInterface _db;

        public MemoAccess(DatabaseInterface db)
        {
            _db = db;
        }

        //Get all Memos

        public List<Memo> GetMemo()
        {
            using (var db = _db.GetConnection())
            {
                string sql = "Select * From Memos";
                return db.Query<Memo>(sql).ToList();
            }
        }

        // Get Single Memo 
        public Memo GetMemoById(int MemoId)
        {
            using (var db = _db.GetConnection())
            {
                var sql = db.QueryFirstOrDefault<Memo>(@"SELECT * From Memos Where Id = @id", new { id = MemoId });
                return sql;
            }
        }

        // Delete Single Memo

        public bool DeleteById(int MemoId)
        {
            using (var db = _db.GetConnection())
            {
                var sql = db.Execute("Delete from Memos Where Id = @id", new { id = MemoId });
                return sql == 1;
            }
        }

        // Update Memo
        public bool UpdateMemo(Memo Memo)
        {
            using (var db = _db.GetConnection())
            {
                var sql = db.Execute(@"UPDATE [dbo].[Memos]
                                       SET [purchasedAt] = @purchasedAt
                                          ,[decommissionedAt] = @decommissionedAt
                                          ,[isNew] = @isNew
                                          ,[isWorking] = @isWorking
                                          ,[Make] = @make
                                          ,[Model] = @model
                                            Where Id = @id", Memo);
                return sql == 1;
            }
        }

        public async Task<MemoWithEmployeeId> PostMemoAndAssignToEmployee(MemoWithEmployeeId Memo)
        {
            var insertedMemo = new MemoWithEmployeeId(await PostMemo(Memo));
            using (var db = _db.GetConnection())
            {
                var updated = db.Execute(@"UPDATE Employees
                                            SET MemoId = @MemoId
                                            WHERE id = @EmployeeId", new { MemoId = insertedMemo.Id, Memo.EmployeeId });
                if (updated == 1) insertedMemo.EmployeeId = Memo.EmployeeId;
                return insertedMemo;
            }
        }

        // Post new Memo

        public async Task<Memo> PostMemo(Memo Memo)
        {
            using (var db = _db.GetConnection())
            {
                return await db.QueryFirstOrDefaultAsync<Memo>(@"INSERT INTO [dbo].[Memos]
                
                                 OUTPUT INSERTED.*
                                 VALUES
                                       (@purchasedAt
                                       ,@decommissionedAt
                                       ,@isNew
                                       ,@isWorking
                                       ,@make
                                       ,@model)", Memo);

            }
        }
    }
}
