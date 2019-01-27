using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PIOTL.Models;
using Dapper;


namespace PIOTL.DataAccess
{
    public class GroceryAccess
    {
        DatabaseInterface _db;

        public GroceryAccess(DatabaseInterface db)
        {
            _db = db;
        }

        //Get all Grocerys

        public List<Grocery> GetAllGrocery()
        {
            using (var db = _db.GetConnection())
            {
                string sql = "Select * From Grocerys";
                return db.Query<Grocery>(sql).ToList();
            }
        }

        // Get Single Grocery 
        public Grocery GetGroceryById(int GroceryId)
        {
            using (var db = _db.GetConnection())
            {
                var sql = db.QueryFirstOrDefault<Grocery>(@"SELECT * From Grocerys Where Id = @id", new { id = GroceryId });
                return sql;
            }
        }

        // Delete Single Grocery

        public bool DeleteById(int GroceryId)
        {
            using (var db = _db.GetConnection())
            {
                var sql = db.Execute("Delete from Grocerys Where Id = @id", new { id = GroceryId });
                return sql == 1;
            }
        }

        // Update Grocery
        public bool UpdateGrocery(Grocery Grocery)
        {
            using (var db = _db.GetConnection())
            {
                var sql = db.Execute(@"UPDATE [dbo].[Grocery]
                                       SET [name] = @name
                                          ,[type] = @type
                                          ,[Quantity] = @quantity
                                          ,[AddedBy] = @addedBy
                                          ,[Approved] = @approved
                                          ,[DateAdded] = @dateAdded", Grocery);
                return sql == 1;
            }
        }

        // Post new Grocery

        public async Task<Grocery> PostGrocery(Grocery Grocery)
        {
            using (var db = _db.GetConnection())
            {
                return await db.QueryFirstOrDefaultAsync<Grocery>(@"INSERT INTO [dbo].[Grocerys]
                
                                 OUTPUT INSERTED.*
                                 VALUES
                                       (@name
                                       ,@type
                                       ,@quantity
                                       ,@addedBy
                                       ,@Approved
                                       ,@DateAdded)", Grocery);

            }
        }
    }
}
