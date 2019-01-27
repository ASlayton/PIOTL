using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PIOTL.Models;


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
                                       SET [purchasedAt] = @purchasedAt
                                          ,[decommissionedAt] = @decommissionedAt
                                          ,[isNew] = @isNew
                                          ,[isWorking] = @isWorking
                                          ,[Make] = @make
                                          ,[Model] = @model
                                            Where Id = @id", Message);
                return sql == 1;
            }
        }

        public async Task<MessageWithEmployeeId> PostMessageAndAssignToEmployee(MessageWithEmployeeId Message)
        {
            var insertedMessage = new MessageWithEmployeeId(await PostMessage(Message));
            using (var db = _db.GetConnection())
            {
                var updated = db.Execute(@"UPDATE Employees
                                            SET MessageId = @MessageId
                                            WHERE id = @EmployeeId", new { MessageId = insertedMessage.Id, Message.EmployeeId });
                if (updated == 1) insertedMessage.EmployeeId = Message.EmployeeId;
                return insertedMessage;
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
                                       (@purchasedAt
                                       ,@decommissionedAt
                                       ,@isNew
                                       ,@isWorking
                                       ,@make
                                       ,@model)", Message);

            }
        }
    }
}
