using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PIOTL.Models;


namespace PIOTL.DataAccess
{
    public class UserAccess
    {
        DatabaseInterface _db;

        public UserAccess(DatabaseInterface db)
        {
            _db = db;
        }

        //Get all Users

        public List<User> GetUser()
        {
            using (var db = _db.GetConnection())
            {
                string sql = "Select * From Users";
                return db.Query<User>(sql).ToList();
            }
        }

        // Get Single User 
        public User GetUserById(int UserId)
        {
            using (var db = _db.GetConnection())
            {
                var sql = db.QueryFirstOrDefault<User>(@"SELECT * From Users Where Id = @id", new { id = UserId });
                return sql;
            }
        }

        // Delete Single User

        public bool DeleteById(int UserId)
        {
            using (var db = _db.GetConnection())
            {
                var sql = db.Execute("Delete from Users Where Id = @id", new { id = UserId });
                return sql == 1;
            }
        }

        // Update User
        public bool UpdateUser(User User)
        {
            using (var db = _db.GetConnection())
            {
                var sql = db.Execute(@"UPDATE [dbo].[Users]
                                       SET [purchasedAt] = @purchasedAt
                                          ,[decommissionedAt] = @decommissionedAt
                                          ,[isNew] = @isNew
                                          ,[isWorking] = @isWorking
                                          ,[Make] = @make
                                          ,[Model] = @model
                                            Where Id = @id", User);
                return sql == 1;
            }
        }

        public async Task<UserWithEmployeeId> PostUserAndAssignToEmployee(UserWithEmployeeId User)
        {
            var insertedUser = new UserWithEmployeeId(await PostUser(User));
            using (var db = _db.GetConnection())
            {
                var updated = db.Execute(@"UPDATE Employees
                                            SET UserId = @UserId
                                            WHERE id = @EmployeeId", new { UserId = insertedUser.Id, User.EmployeeId });
                if (updated == 1) insertedUser.EmployeeId = User.EmployeeId;
                return insertedUser;
            }
        }

        // Post new User

        public async Task<User> PostUser(User User)
        {
            using (var db = _db.GetConnection())
            {
                return await db.QueryFirstOrDefaultAsync<User>(@"INSERT INTO [dbo].[Users]
                
                                 OUTPUT INSERTED.*
                                 VALUES
                                       (@purchasedAt
                                       ,@decommissionedAt
                                       ,@isNew
                                       ,@isWorking
                                       ,@make
                                       ,@model)", User);

            }
        }
    }
}
