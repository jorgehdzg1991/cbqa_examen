using System;
using System.Collections.Generic;
using System.Net;
using ExamenCBQA.DataAccess;
using ExamenCBQA.Models;
using ExamenCBQA.Models.Responses;

namespace ExamenCBQA.BusinessLogic
{
    public static class PersonBL
    {
        public static QueryResult<List<Person>> GetAll()
        {
            var response = new QueryResult<List<Person>>();

            try
            {
                response.Data = PersonDAO.GetAll();
            }
            catch (Exception ex)
            {
                HandleError(response, ex);
            }

            return response;
        }

        public static QueryResult<Person> GetById(int id)
        {
            var response = new QueryResult<Person>();

            try
            {
                var person = PersonDAO.GetById(id);

                if (person != null)
                {
                    response.Data = person;
                }
                else
                {
                    response.HasError = true;
                    response.StatusCode = HttpStatusCode.NotFound;
                    response.Message = $"The person with the ID {id} does not exist in the database";
                }
            }
            catch (Exception ex)
            {
                HandleError(response, ex);
            }

            return response;
        }

        public static QueryResult<Person> Insert(Person person)
        {
            var response = new QueryResult<Person>();

            try
            {
                response.Data = PersonDAO.Insert(person);
            }
            catch (Exception ex)
            {
                HandleError(response, ex);
            }

            return response;
        }

        public static QueryResult<Person> Update(Person person)
        {
            var response = new QueryResult<Person>();

            try
            {
                var updatedPerson = PersonDAO.Update(person);

                if (updatedPerson != null)
                {
                    response.Data = updatedPerson;
                }
                else
                {
                    response.HasError = true;
                    response.StatusCode = HttpStatusCode.NotFound;
                    response.Message = $"The person with the ID {person.Id} does not exist in the database";
                }
            }
            catch (Exception ex)
            {
                HandleError(response, ex);
            }

            return response;
        }

        public static QueryResult<bool> Delete(int id)
        {
            var response = new QueryResult<bool>();

            try
            {
                var result = PersonDAO.Delete(id);

                if (result)
                {
                    response.Data = true;
                }
                else
                {
                    response.HasError = true;
                    response.StatusCode = HttpStatusCode.NotFound;
                    response.Message = $"The person with the ID {id} does not exist in the database";
                }
            }
            catch (Exception ex)
            {
                HandleError(response, ex);
            }

            return response;
        }

        static void HandleError<T>(QueryResult<T> response, Exception ex)
        {
            response.HasError = true;
            response.StatusCode = HttpStatusCode.InternalServerError;
            response.Message = ex.Message;
        }
    }
}
