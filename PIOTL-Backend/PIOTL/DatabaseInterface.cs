using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace PIOTL
{
    public class DatabaseInterface
    {
        private string _connectionString;

        public DatabaseInterface(IConfiguration config, string databaseName)
        {
            _connectionString = config.GetSection(databaseName).Value;
        }

        public SqlConnection GetConnection()
        {
            return new SqlConnection(_connectionString);
        }
    }
}