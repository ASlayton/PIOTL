using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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

        public List<Event> GetEvent()
        {
            using (var db = _db.GetConnection())
            {
                string sql = "Select * From Events";
                return db.Query<Event>(sql).ToList();
            }
        }

        // Get Single Event 
        public Event GetEventById(int EventId)
        {
            using (var db = _db.GetConnection())
            {
                var sql = db.QueryFirstOrDefault<Event>(@"SELECT * From Events Where Id = @id", new { id = EventId });
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
                                       SET [purchasedAt] = @purchasedAt
                                          ,[decommissionedAt] = @decommissionedAt
                                          ,[isNew] = @isNew
                                          ,[isWorking] = @isWorking
                                          ,[Make] = @make
                                          ,[Model] = @model
                                            Where Id = @id", Event);
                return sql == 1;
            }
        }

        public async Task<EventWithEmployeeId> PostEventAndAssignToEmployee(EventWithEmployeeId Event)
        {
            var insertedEvent = new EventWithEmployeeId(await PostEvent(Event));
            using (var db = _db.GetConnection())
            {
                var updated = db.Execute(@"UPDATE Employees
                                            SET EventId = @EventId
                                            WHERE id = @EmployeeId", new { EventId = insertedEvent.Id, Event.EmployeeId });
                if (updated == 1) insertedEvent.EmployeeId = Event.EmployeeId;
                return insertedEvent;
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
                                       (@purchasedAt
                                       ,@decommissionedAt
                                       ,@isNew
                                       ,@isWorking
                                       ,@make
                                       ,@model)", Event);

            }
        }
    }
}
