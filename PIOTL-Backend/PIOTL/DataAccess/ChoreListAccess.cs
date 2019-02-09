using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PIOTL.Models;
using Dapper;
using System;
using PIOTL.Helpers;

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
                string sql = @"SELECT
                                cl.id as Id,
                                cl.dateDue as DateDue,
                                cl.assignedTo as AssignedTo,
                                cl.completed as Completed,
                                rm.name as Room,
                                ch.name as Type,
                                ch.worthAmt as Worth
                              FROM ChoresList cl
                              JOIN Chores ch
                                ON cl.type = ch.id
                              JOIN Rooms rm
                                ON ch.room = rm.id";
                return db.Query<ChoresList>(sql).ToList();
            }
        }

        //Get all ChoresLists for certain user

        public List<ChoresList> GetAllChoresListbyUser(int userId)
        {
            using (var db = _db.GetConnection())
            {
                var sql = db.Query<ChoresList>(@"
                              SELECT 
                                cl.id as Id,
                                cl.dateDue as DateDue,
                                cl.assignedTo as AssignedTo,
                                cl.completed as Completed,
                                rm.name as Room,
                                ch.name as Type,
                                ch.worthAmt as Worth
                              FROM ChoresList cl
                              JOIN Chores ch
                                ON cl.type = ch.id
                              JOIN Rooms rm
                                ON ch.room = rm.id
                              WHERE cl.assignedTo = 1;", new { id = userId }).ToList();
                return sql;
            }
        }

        //Get all ChoresLists for certain user for the current week

        public List<ChoresListByUser> GetAllChoresListbyUserWeek(int userId)
        {
            using (var db = _db.GetConnection())
            {
                var myStart = DateTime.Now.FirstDayOfWeek();
                var myEnd = DateTime.Now.LastDayOfWeek();
                var sql = db.Query<ChoresListByUser>(@"
                              SELECT 
                                cl.dateAssigned as DateAssigned,
                                cl.assignedTo as AssignedTo,
                                cl.completed as Completed,
                                rm.name as Room,
                                ch.name as Type,
                                ch.worthAmt as Worth
                              FROM ChoresList cl
                              JOIN Chores ch
                                ON cl.type = ch.id
                              JOIN Rooms rm
                                ON ch.room = rm.id
                              WHERE cl.assignedTo = 1
                              AND cl.dateAssigned between @myStart and @myEnd
                              AND cl.completed = 0
                              ;", new { id = userId, myStart = myStart, myEnd = myEnd }).ToList();
                return sql;
            }
        }
        //Get all ChoresLists for certain user for the current week

        public List<ChoresListByUser> GetAllChoresListbyUserToday(int userId)
        {
            using (var db = _db.GetConnection())
            {
                var myDate = DateTime.Now;
                var sql = db.Query<ChoresListByUser>(@"
                              SELECT 
                                cl.dateAssigned as DateAssigned,
                                cl.assignedTo as AssignedTo,
                                cl.completed as Completed,
                                rm.name as RoomName,
                                ch.name as Type,
                                ch.worthAmt as Worth
                              FROM ChoresList cl
                              JOIN Chores ch
                                ON cl.type = ch.id
                              JOIN Rooms rm
                                ON ch.room = rm.id
                              WHERE cl.assignedTo = 1
                              AND cl.dateAssigned = @myDate
                              AND cl.completed = 0
                              ;", new { id = userId, myDate }).ToList();
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
                                       ,@dateDue
                                       ,@completed
                                       ,@assignedTo
                                       ,@assignedBy
                                       ,@type
                                       ,@familyId)", ChoresList);

            }
        }
    }
}
