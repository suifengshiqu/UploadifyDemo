


//打开层窗口
function OpenDivDialog(dTitle, dSrc, dWidth, dHeight, divDialogID) {
    if (W != undefined && W != null) {
        W.$.dialog({
            id: divDialogID,
            title: dTitle,
            content: "url:" + dSrc,
            lock: true,
            parent: api,
            height: dHeight,
            width: dWidth,
            close: function () {
                api.zindex().focus();
            }
        });
    } else {
        //右下角消息层打开的时候，弹出层会关闭或者失去焦点
        //所以当弹出层打开时，让消息层暂时失效，关闭弹出层，消息层正常运行
        //win == win.parent是防止在新选项卡直接打开，会死循环下去
        var win = window.parent;
        while (win.parent) {
            if (win.location.pathname != '/main.aspx') {
                if (win == win.parent) {
                    break;
                }
                win = win.parent;
            } else {
                $("#hidShowDivDialog", win.document).val("1");
                break;
            }
        };
        $.dialog({
            id: divDialogID,
            title: dTitle,
            content: "url:" + dSrc,
            lock: true,
            height: dHeight,
            width: dWidth,
            close: function () {
                $("#hidShowDivDialog", win.document).val("0");
            }
        });
    }
}
//关闭层窗口
//api是在弹出页面设置的，代表弹出的页面api.close会触发OpenMoreDivDialog里面的close事件
function CloseDivDialog() {
    api.close();
    return false;
}
//自定义消息框
//dTitle:标题，dText内容
//dType参数为 alert：警告，success:成功,error:失败
//defaultCon:指定父窗口的某个控件获得焦点
var W = null; //W是在弹出页面设置的，代表弹出的页面
function OpenDMessage(dTitle, dText, dType, defaultCon, divDialogID) {
    if (W != undefined && W != null) {
        W.$.dialog({
            id: "message",
            icon: dType + ".gif",
            content: dText,
            title: dTitle,
            lock: true,
            parent: api,
            ok: function () {
                api.zindex().focus();
                if (defaultCon != null) {
                    //让指定的父窗口的控件获得焦点
                    $(defaultCon).focus();
                }
                this.close();
                return false;
            }
        });
    } else {
        $.dialog({
            id: "message",
            icon: dType + ".gif",
            content: dText,
            title: dTitle,
            lock: true,
            ok: function () {
                this.close();
                if (defaultCon) {
                    defaultCon.focus();
                }
                return false;
            }
        });
    }
}
//在当前层给之前的某个层的控件指定值
//参数dialogDivID：要获取的那个层的ID
//controlID：要赋值的控件
function GetReturn(dialogDivID, controlID) {
    var iBox = api.get(dialogDivID, 1), iW = iBox.iwin, iD = iW.document;
    return iD.getElementById(controlID);
}
//显示查询层
function ShowQueryBox() {
    var objDiv, objHid;
    //显示查询层
    objDiv = $("#divQuery");
    if (objDiv) { objDiv.show(); }
    //设置视图状态
    objHid = $("#hidQueryDisplay");
    if (objHid) { objHid.val("block"); }
    //隐藏列表层
    objDiv = $("#divDataList");
    if (objDiv) { objDiv.hide(); }
    //设置视图状态
    objHid = $("#hidListDisplay");
    if (objHid) { objHid.val("none"); }
}
//隐藏查询层
function HidQueryBox() {
    //隐藏查询层
    var objDiv = $("#divQuery");
    if (objDiv) { objDiv.hide(); }
    //设置视图状态
    objHid = $("#hidQueryDisplay");
    if (objHid) { objHid.val("none"); }
    //显示列表层
    var objDiv = $("#divDataList");
    if (objDiv) { objDiv.show(); }
    //设置视图状态
    objHid = $("#hidListDisplay");
    if (objHid) { objHid.val("block"); }
}
//注销登录
function Logout() {
    $.dialog.confirm("确定要注销登录吗？", function () {
        this.close();
        parent.location.href = "/loginOut.aspx";
        return false;
    }, function () {
        //执行取消操作
        this.close();
        return false;
    });
}
//按回车到下一个控件
//defaultCon1为默认获得焦点的控件的唯一标识
function ToNextControl(defaultCon1, defaultCon2) {
    if ($(defaultCon1).attr("disabled") == "disabled") {
        $(defaultCon2).focus();
    } else {
        $(defaultCon1).focus();
    }
    $(":input").live("keypress", function (e) {
        var keyCode = e.keyCode ? e.keyCode : e.which ? e.which : e.charCode;
        if (keyCode == 13) {
            var i;
            var controls = this.form.elements;
            for (i = 0; i < controls.length; i++) {
                if (this == controls[i]) {
                    break;
                }
            }
            //跳过属性为disabled=true或者type="hidden"属性的控件
            i = next(i, controls);
            if ($(controls[i]).attr("type") == "submit") {
                $(defaultCon1).focus();
                return true;
            }
            else {
                if (controls[i] != null || controls[i] != undefined) {
                    controls[i].focus();
                } else {
                    OpenDMessage("错误", "请用鼠标选择！", "error", null);
                }
            }
            return false;
        }
        else {
            return true;
        }
    });
    //属性为disabled="disabled"或者type="hidden"获取不到焦点，要跳过，否则报错
    function next(g, controls) {
        if (g + 1 < controls.length) {
            while ($(controls[g + 1]).attr("disabled") == "disabled" || $(controls[g + 1]).attr("type") == "hidden") {
                g = g + 1;
            }
            g = g + 1;
        }
        return g;
    }
}
//检查字数长度 maxLength-最大长度;controlId-控件ID
function CheckFontLength(controlID, maxLength) {
    var objControl = $("#" + controlID);
    var controlValLength = GetRealLength(objControl.val());
    var curr = maxLength - controlValLength;
    if ($("#sFontLength")) {
        $("#sFontLength").html(curr.toString());
    }
    if (controlValLength > maxLength) {
        // 超过限制的字数了就将 文本框中的内容按规定的字数 截取
        if (maxLength - controlValLength < 0) {
            if ($("#sFontLength")) {
                $("#sFontLength").html("0");
            }
        }
        objControl.val(objControl.val().substring(0, maxLength));
        return false;
    }
    return true;
}
//判断字符串长度，全角/半角判断
function GetRealLength(str) {
    var length = str.length;
    var realLength = 0
    var temLength = 0;
    for (var i = 0; i < length; i++) {
        charCode = str.charCodeAt(i);
        if (charCode >= 0 && charCode <= 128) {
            temLength += 1;
        } else {
            realLength += 1;
        }
        if (temLength == 2) {
            realLength += 1;
            temLength = 0;
        }
    }
    return realLength;
}
//禁止Backspace键返回上一页
$(document).bind("keydown", function () {
    if (event.keyCode == 8) {
        var obj = document.activeElement;
        if (obj.type == "text" || obj.type == "textarea" || obj.type == "password") {
            if (obj.readOnly == false) {
                return true;
            }
        }
        return false;
    }
});
//选项卡
function Tab(index) {
    var i = 0;
    $("div[id^='tab_']").each(function () {
        $("#tab_nav" + i).removeClass();
        if (i == index) {
            $(this).show();
            $("#tab_nav" + i).addClass("tab_nav-on");
        } else {
            $(this).hide();
            $("#tab_nav" + i).addClass("tab_nav-off");
        }
        i++;
    });
}
//获取URL传值
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null)
        return unescape(r[2]);
    return null;
}
