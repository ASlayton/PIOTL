using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PIOTL.Models;
using Dapper;


namespace PIOTL.DataAccess
{
    public class MessageAccess
    {
        DatabaseInterface _db;

        public MessageAccess(DatabaseInterface db)
        {
            _db = db;
        }

        //Get all Messages

        public List<Message> GetMessage()
        {
            using (var db = _db.GetConnection())
            {
                string sql = "Select * From Messages";
                return db.Query<Message>(sql).ToList();
            }
        }

        // Get Single Message 
        public Message GetMessageById(int MessageId)
        {
            using (var db = _db.GetConnection())
            {
                var sql = db.QueryFirstOrDefault<Message>(@"SELECT * From Messages Where Id = @id", new { id = MessageId });
                return sql;
            }
        }

        // Delete Single Message

        public bool DeleteById(int MessageId)
        {
            using (var db = _db.GetConnection())
            {
                var sql = db.Execute("Delete from Messages Where Id = @id", new { id = MessageId });
                return sql == 1;
            }
        }

        // Update Message
        public bool UpdateMessage(Message Message)
        {
            using (var db = _db.GetConnection())
            {
                var sql = db.Execute(@"UPDATE [dbo].[Messages]
                                       SET [sentFrom] = @sentFrom
                                          ,[sentTo] = @sentTo
                                          ,[Messages] = @messages
                                          ,[dateCreated] = @dateCreated
                                            Where Id = @id", Message);
                return sql == 1;
            }
        }

        // Post new Message

        public async Task<Message> PostMessage(Message Message)
        {
            using (var db = _db.GetConnection())
            {
                return await db.QueryFirstOrDefaultAsync<Message>(@"INSERT INTO [dbo].[Messages]
                
                                 OUTPUT INSERTED.*
                                 VALUES
                                       (@sentFrom
                                       ,@sentTo
                                       ,@Messages
                                       ,@DateCreated)", Message);

            }
        }
    }
}
