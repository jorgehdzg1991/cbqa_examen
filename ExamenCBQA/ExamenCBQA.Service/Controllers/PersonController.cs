using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using ExamenCBQA.BusinessLogic;
using ExamenCBQA.Models;

namespace ExamenCBQA.Service.Controllers
{
    [EnableCors("*", "*", "*")]
    [RoutePrefix("api/v1/persons")]
    public class PersonController : ApiController
    {
        [HttpGet]
        [Route("getAll")]
        public HttpResponseMessage GetAll()
        {
            var response = PersonBL.GetAll();
            return Request.CreateResponse(response.StatusCode, response);
        }

        [HttpGet]
        [Route("getById/{id}")]
        public HttpResponseMessage GetById(int id)
        {
            var response = PersonBL.GetById(id);
            return Request.CreateResponse(response.StatusCode, response);
        }

        [HttpPost]
        [Route("create")]
        public HttpResponseMessage Create(Person person)
        {
            var response = PersonBL.Insert(person);
            return Request.CreateResponse(response.StatusCode, response);
        }

        [HttpPut]
        [Route("update")]
        public HttpResponseMessage Update(Person person)
        {
            var response = PersonBL.Update(person);
            return Request.CreateResponse(response.StatusCode, response);
        }

        [HttpDelete]
        [Route("delete/{id}")]
        public HttpResponseMessage Delete(int id)
        {
            var response = PersonBL.Delete(id);
            return Request.CreateResponse(response.StatusCode, response);
        }
    }
}
