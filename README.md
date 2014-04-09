UploadifyDemo
=============

UploadifyDemo(上传实例)
1、	文件结构说明：
   1）	Scripts 文件夹下为上传控件所需要引用的js文件，可以根据项目中的   实际需要放置在相应的文件夹下。
   2）	Uploadify 文件夹下为上传文件页面，放置在项目中的公共引用位置即可。
   3）	Demo.aspx 为测试页面。
   4）	*特别说明本上传控件由于数据返回JSON格式需要，需要引用jquery.json-2.4.js文件。
2、	使用方法：
1）	在父页面中为控件绑定上传控件如下：
 
url参数说明：
  a)	fileUrl：文件上传后保存到服务器端的相对路径文件夹。
  b)	extension：上传文件类型（默认为*）。
  c)	parentDicDialogID：此参数为父页面为弹出层页面时需要指定当前弹出层的ID。
2）	文件上传完成后的回传方法：
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
 方法中参数data为上传文件列表中的文件信息，类型为JSON格式，上传失败可以用data.length == 0 判断。
Json格式如下：
[
 {
   fileName: “文件名称”, 
   uploadFileName: “文件上传后的名称”, 
   extenName: “后缀名”, 
   attSize: “文件大小”, 
   fileUrl: “上传后文件的相对路径”
 }
]

 
