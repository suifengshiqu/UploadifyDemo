using System;
using System.Web.UI;

namespace UploadifyDemo.Uploadify
{
    public partial class FileUploader : Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                hidParentDivDialogID.Value = Request.QueryString["parentDivDialogID"];
                hidExts.Value = Request.QueryString["extension"].Replace(".", "*.").Replace("|", ";");
                hidFileUrl.Value = Request.QueryString["fileUrl"];
            }
        }
    }
}