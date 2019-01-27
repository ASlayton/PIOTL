using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PIOTL.Models;


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

        public List<Grocery> GetGrocery()
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
                var sql = db.Execute(@"UPDATE [dbo].[Grocerys]
                                       SET [purchasedAt] = @purchasedAt
                                          ,[decommissionedAt] = @decommissionedAt
                                          ,[isNew] = @isNew
                                          ,[isWorking] = @isWorking
                                          ,[Make] = @make
                                          ,[Model] = @model
                                            Where Id = @id", Grocery);
                return sql == 1;
            }
        }

        public async Task<GroceryWithEmployeeId> PostGroceryAndAssignToEmployee(GroceryWithEmployeeId Grocery)
        {
            var insertedGrocery = new GroceryWithEmployeeId(await PostGrocery(Grocery));
            using (var db = _db.GetConnection())
            {
                var updated = db.Execute(@"UPDATE Employees
                                            SET GroceryId = @GroceryId
                                            WHERE id = @EmployeeId", new { GroceryId = insertedGrocery.Id, Grocery.EmployeeId });
                if (updated == 1) insertedGrocery.EmployeeId = Grocery.EmployeeId;
                return insertedGrocery;
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
                                       (@purchasedAt
                                       ,@decommissionedAt
                                       ,@isNew
                                       ,@isWorking
                                       ,@make
                                       ,@model)", Grocery);

            }
        }
    }
}
