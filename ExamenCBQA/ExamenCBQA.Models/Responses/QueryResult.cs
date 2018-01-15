using System.Net;

namespace ExamenCBQA.Models.Responses
{
    public class QueryResult<T>
    {
        public QueryResult()
        {
            StatusCode = HttpStatusCode.OK;
        }

        public bool HasError
        {
            get;
            set;
        }

        public string Message
        {
            get;
            set;
        }

        public HttpStatusCode StatusCode
        {
            get;
            set;
        }

        public T Data
        {
            get;
            set;
        }
    }
}
