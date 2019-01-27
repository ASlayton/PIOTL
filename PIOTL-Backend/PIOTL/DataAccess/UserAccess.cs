using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PIOTL.Models;
using Dapper;


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
                                       SET [firstName] = @firstName
                                          ,[lastName] = @lastName
                                          ,[firebaseId] = @firebaseId
                                          ,[FamilyId] = @familyId
                                          ,[Adult] = @adult
                                          ,[Earned] = @earned
                                            Where Id = @id", User);
                return sql == 1;
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
                                       (@firstName
                                       ,@lastName
                                       ,@firebaseId
                                       ,@familyId
                                       ,@Adult
                                       ,@Earned)", User);

            }
        }
    }
}
