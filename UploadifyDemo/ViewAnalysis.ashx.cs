using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace UploadifyDemo
{
    /// <summary>
    /// ViewAnalysis 的摘要说明
    /// </summary>
    public class ViewAnalysis : IHttpHandler
    {
        static List<AnalysisModel> list = new List<AnalysisModel>();
        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            string url = context.Request["url"];
            var model = list.FirstOrDefault(x => x.Url == url);
            if (model != null)
                model.ViewCount++;
            else
            {
                list.Add(new AnalysisModel { Url = url, ViewCount = 1 });
            }
            context.Response.Write(model.ViewCount.ToString());
        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
        class AnalysisModel
        {
            public string Url { get; set; }
            public int ViewCount { get; set; }
        }
    }
}