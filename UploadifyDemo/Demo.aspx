<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Demo.aspx.cs" Inherits="UploadifyDemo.Demo" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title></title>
    <script src="Scripts/jquery/jquery-1.8.2.js"></script>
    <script src="Scripts/lhgdialog/lhgdialog.min.js"></script>
    <link href="Scripts/lhgdialog/skins/blue.css" rel="stylesheet" />
    <script src="Scripts/syspub.js"></script>
    <script src="Scripts/viewAnalysis.js"></script>
    <script type="text/javascript">
        $(function() {
            $("#btnOK7").click(function() {
                OpenDivDialog(
                    "上传", "/Uploadify/FileUploader.aspx?fileUrl=/UploadFiles/Test/&extension=*&parentDivDialogID=", 460, 510, "UploadFiles");
            });
            $("#btnTest").click(function() {
                window.showModalDialog("/Uploadify/FileUploader.aspx?fileUrl=/UploadFiles/Test/&extension=*&parentDivDialogID=", "width=460px&height=510px");
            });
        });
        function UploadFilesOK(data) {
            $("#tt").html("");
            $("#tt").append("<tr></tr>");
            $.each(data, function (i, v) {
                $("#tt").append("<tr></tr>");
                for (var p in v) {
                    if (i == 0) {
                        $("#tt tr:first").append("<td align='center'>" + p + "</td>");
                    }
                    $("#tt tr:last").append("<td>" + v[p] + "</td>");
                }
            });
        }
    </script>
</head>
<body>
    <form id="form1" runat="server">
    <div>
        <input type="button" value="文件上传" id="btnOK7" class="tj_btn1" />
        <input type="button" value="文件上传ModelDialog" id="btnTest" class="tj_btn1" />
    </div>
        <table id="tt">

        </table>
    </form>
</body>
</html>
