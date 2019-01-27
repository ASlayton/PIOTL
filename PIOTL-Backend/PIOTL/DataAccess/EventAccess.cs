using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using PIOTL.Models;

namespace PIOTL.DataAccess
{
    public class EventAccess
    {
        DatabaseInterface _db;

        public EventAccess(DatabaseInterface db)
        {
            _db = db;
        }

        //Get all Events

        public List<Event> GetAllEvents()
        {
            using (var db = _db.GetConnection())
            {
                string sql = "Select * From Events";
                return db.Query<Event>(sql).ToList();
            }
        }

        // Get Single Event 
        public Event GetEventById(int Id)
        {
            using (var db = _db.GetConnection())
            {
                var sql = db.QueryFirstOrDefault<Event>(@"SELECT * From Events Where Id = @id", new { id = Id });
                return sql;
            }
        }

        // Delete Single Event

        public bool DeleteById(int EventId)
        {
            using (var db = _db.GetConnection())
            {
                var sql = db.Execute("Delete from Events Where Id = @id", new { id = EventId });
                return sql == 1;
            }
        }

        // Update Event
        public bool UpdateEvent(Event Event)
        {
            using (var db = _db.GetConnection())
            {
                var sql = db.Execute(@"UPDATE [dbo].[Events]
                                       SET [Name] = @name
                                          ,[Type] = @type
                                          ,[description] = @description
                                          ,[AssignedTo] = @assignedTo
                                          ,[DateDue] = @dateDue
                                          ,[TimeStart] = @timeStart
                                          ,[TimeEnd] = @timeEnd
                                            Where Id = @id", Event);
                return sql == 1;
            }
        }

        // Post new Event

        public async Task<Event> PostEvent(Event Event)
        {
            using (var db = _db.GetConnection())
            {
                return await db.QueryFirstOrDefaultAsync<Event>(@"INSERT INTO [dbo].[Events]
                
                                 OUTPUT INSERTED.*
                                 VALUES
                                       (@name
                                       ,@type
                                       ,@description
                                       ,@assignedTo
                                       ,@dateDue
                                       ,@timeStart
                                       ,@timeEnd
                                  )", Event);

            }
        }
    }
}
