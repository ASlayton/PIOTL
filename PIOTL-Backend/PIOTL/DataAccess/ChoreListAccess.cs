﻿using System.Collections.Generic;
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

        public List<ChoresListByUser> GetAllChoresListsbyUser(int userId)
        {
            using (var db = _db.GetConnection())
            {
                var sql = db.Query<ChoresListByUser>(@"
                              SELECT 
                                cl.id as Id,
                                cl.dateDue as DateDue,
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
                              WHERE cl.assignedTo = @id;", new { id = userId }).ToList();
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
        public bool UpdateChoresList(BaseChoresList ChoresList)
        {
            using (var db = _db.GetConnection())
            {
                var sql = db.Execute(@"UPDATE [dbo].[ChoresList]
                                       SET [dateAssigned] = @DateAssigned
                                          ,[completed] = @completed
                                          ,[assignedBy] = @assignedBy
                                          ,[assignedTo] = @assignedTo
                                          ,[type] = @type
                                          ,[familyId] = @familyId
                                       WHERE ChoresList.id = @id", ChoresList);
                return sql == 1;
            }
        }

        // Post new ChoresList

        public async Task<BaseChoresList> PostChoresList(BaseChoresList BaseChoresList)
        {
            using (var db = _db.GetConnection())
            {
                return await db.QueryFirstOrDefaultAsync<BaseChoresList>(@"
                                 INSERT INTO [dbo].[ChoresList]
                                        (
                                        [dateAssigned]
                                        ,[dateDue]
                                        ,[completed]
                                        ,[assignedTo]
                                        ,[assignedBy]
                                        ,[type]
                                        ,[familyId])
                                 VALUES
                                       (@dateAssigned
                                       ,@dateDue
                                       ,@completed
                                       ,@assignedTo
                                       ,@assignedBy
                                       ,@type
                                       ,@familyId)", BaseChoresList);

            }
        }
    }
}
