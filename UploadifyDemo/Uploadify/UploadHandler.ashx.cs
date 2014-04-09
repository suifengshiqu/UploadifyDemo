using System;
using System.Collections.Generic;
using System.IO;
using System.Web;
using System.Web.Script.Serialization;

namespace UploadifyDemo.Uploadify
{
    /// <summary>
    /// UploadHandler 的摘要说明
    /// </summary>
    public class UploadHandler : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            string fileUrl = context.Request.QueryString["fileUrl"];
            HttpFileCollection files = context.Request.Files;
            //指定上传目录
            string dirName = context.Server.MapPath("~" + fileUrl);
            {
                if (!Directory.Exists(dirName))
                {
                    Directory.CreateDirectory(dirName);
                }
                string fileName = string.Empty;
                string extenName = string.Empty;
                string uploadFileName = string.Empty;
                string attSize = string.Empty;
                foreach (string file in files)
                {
                    var curFile = context.Request.Files[file];
                    fileName = Path.GetFileNameWithoutExtension(curFile.FileName);
                    extenName = Path.GetExtension(curFile.FileName);
                    uploadFileName = Guid.NewGuid().ToString() + extenName;
                    attSize = (curFile.ContentLength / 1024).ToString();

                    curFile.SaveAs(System.IO.Path.Combine(dirName, uploadFileName));
                }
                var dict = new Dictionary<string, object>();
                dict.Add("fileName", fileName);
                dict.Add("uploadFileName", uploadFileName);
                dict.Add("extenName", extenName);
                dict.Add("attSize", attSize);
                dict.Add("fileUrl", Path.Combine(fileUrl, uploadFileName));
                var jss = new JavaScriptSerializer();
                context.Response.Write(jss.Serialize(dict));
            }
        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}