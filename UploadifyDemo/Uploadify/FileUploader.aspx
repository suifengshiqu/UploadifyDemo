<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="FileUploader.aspx.cs" Inherits="UploadifyDemo.Uploadify.FileUploader" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title></title>
    <script src="/Scripts/jquery/jquery-1.8.2.js"></script>
    <link href="/Scripts/uploadify/uploadify.css" rel="stylesheet" />
    <script src="/Scripts/uploadify/jquery.uploadify.js"></script>
    <script src="/Scripts/jquery/jquery.json-2.4.js"></script>
    <script src="/Scripts/lhgdialog/lhgdialog.min.js"></script>
    <link href="/Scripts/lhgdialog/skins/blue.css" rel="stylesheet" />
    <script src="/Scripts/syspub.js"></script>
    <script type="text/javascript">
        var api = frameElement.api, W = api.opener; api.lock();
        var parentWin = null;
        $(document).ready(function () {
            var parentDivDialogId = $("#hidParentDivDialogID").val();
            parentWin = parentDivDialogId.length == 0 ? W : api.get(parentDivDialogId, 1).content;
        });
        function UploadFiles() {
            $("#file_upload").uploadify("upload", "*");
            $(".uploadify-btn-ok").val("上传中...").attr({ "disabled": "disabled" });;
            return false;
        }
    </script>
</head>
<body>
    <form id="form1" runat="server">
        <div class="file_upload_page" style="margin: 5px;">
            <div class="file_upload_con">
                <input id="file_upload" name="file_upload" type="file" multiple="true" />
                <script type="text/javascript">
                    var fileArr = [];
                    $(document).ready(function () {
                        $("#file_upload").uploadify({
                            'swf': '/Scripts/uploadify/uploadify.swf',
                            'uploader': '/Uploadify/UploadHandler.ashx?fileUrl=' + $("#hidFileUrl").val(),
                            'cancelImg': '/Scripts/uploadify/uploadify-cancel.png',
                            'folder': $("#hidFileUrl").val(),
                            'auto': false,
                            'fileSizeLimit': '0',
                            'height': 21,
                            'width': 70,
                            'multi': 'true',
                            'buttonText': '选择文件',
                            'removeCompleted': false,
                            'fileTypeDesc': '可选类型',
                            'fileTypeExts': $("#hidExts").val(),
                            'onUploadSuccess': function (file, data) {
                                fileArr.push($.evalJSON(data));
                            },
                            'onQueueComplete': function () {
                                if (fileArr.length > 0) {
                                    parentWin.UploadFilesOK(fileArr);
                                    CloseDivDialog();
                                }
                            },
                            'onCancel': function () {
                                // alert(file);
                            },
                            'onError': function () {

                            }
                        });
                    });
                </script>
            </div>
        </div>
        <input class="uploadify-btn-ok" type="button" value="确定" onclick="return UploadFiles()" />
        <input class="uploadify-btn-close" type="button" value="关闭" onclick="CloseDivDialog();" />
        <input type="hidden" runat="server" id="hidParentDivDialogID" />
        <input type="hidden" runat="server" id="hidExts" />
        <input type="hidden" runat="server" id="hidFileUrl" />
    </form>
</body>
</html>
