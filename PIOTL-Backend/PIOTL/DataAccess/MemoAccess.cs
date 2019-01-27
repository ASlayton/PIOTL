using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PIOTL.Models;
using Dapper;


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

        public List<Memo> GetAllMemos()
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
                                       SET [UserId] = @userId
                                          ,[Message] = @message
                                          ,[DateCreated] = @dateCreated
                                            Where Id = @id", Memo);
                return sql == 1;
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
                                       (@userId
                                       ,@message
                                       ,@DateCreated)", Memo);

            }
        }
    }
}
