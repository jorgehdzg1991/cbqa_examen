using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Linq;
using Dapper;
using ExamenCBQA.Models;
using MySql.Data.MySqlClient;

namespace ExamenCBQA.DataAccess
{
    public static class PersonDAO
    {
        static string ConnectionString =
            ConfigurationManager.ConnectionStrings["ConexionMysql"].ToString();

        public static List<Person> GetAll()
        {
            using (var cnn = new MySqlConnection(ConnectionString))
            {
                return cnn.Query<Person>("proc_person_getall", commandType: CommandType.StoredProcedure)
                          .AsList();
            }
        }

        public static Person GetById(int id)
        {
            using (var cnn = new MySqlConnection(ConnectionString))
            {
                var parameters = new DynamicParameters();

                parameters.Add("p_id", id);

                return cnn.Query<Person>("proc_person_getbyid", parameters, commandType: CommandType.StoredProcedure).FirstOrDefault();
            }
        }

        public static Person Insert(Person person)
        {
            using (var cnn = new MySqlConnection(ConnectionString))
            {
                var parameters = new DynamicParameters();

                parameters.Add("p_id", dbType: DbType.Int32, direction: ParameterDirection.Output);
                parameters.Add("p_first_name", person.FirstName);
                parameters.Add("p_last_name", person.LastName);
                parameters.Add("p_gender", person.Gender);
                parameters.Add("p_age", person.Age);

                cnn.Execute("proc_person_ins", parameters, commandType: CommandType.StoredProcedure);

                person.Id = parameters.Get<int>("p_id");

                return person;
            }
        }

        public static Person Update(Person person)
        {
            var personExists = GetById(person.Id) != null;

            if (personExists)
            {
                using (var cnn = new MySqlConnection(ConnectionString))
                {
                    var parameters = new DynamicParameters();

                    parameters.Add("p_id", person.Id);
                    parameters.Add("p_first_name", person.FirstName);
                    parameters.Add("p_last_name", person.LastName);
                    parameters.Add("p_gender", person.Gender);
                    parameters.Add("p_age", person.Age);

                    cnn.Execute("proc_person_upd", parameters, commandType: CommandType.StoredProcedure);

                    return person;
                }
            }

            return null;
        }

        public static bool Delete(int id)
        {
            var personExists = GetById(id) != null;

            if (personExists)
            {
                using (var cnn = new MySqlConnection(ConnectionString))
                {
                    var parameters = new DynamicParameters();

                    parameters.Add("p_id", id);

                    cnn.Execute("proc_person_del", parameters, commandType: CommandType.StoredProcedure);

                    return true;
                }
            }

            return false;
        }
    }
}
