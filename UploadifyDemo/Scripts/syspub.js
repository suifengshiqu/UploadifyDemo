


//�򿪲㴰��
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
        //���½���Ϣ��򿪵�ʱ�򣬵������رջ���ʧȥ����
        //���Ե��������ʱ������Ϣ����ʱʧЧ���رյ����㣬��Ϣ����������
        //win == win.parent�Ƿ�ֹ����ѡ�ֱ�Ӵ򿪣�����ѭ����ȥ
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
//�رղ㴰��
//api���ڵ���ҳ�����õģ���������ҳ��api.close�ᴥ��OpenMoreDivDialog�����close�¼�
function CloseDivDialog() {
    api.close();
    return false;
}
//�Զ�����Ϣ��
//dTitle:���⣬dText����
//dType����Ϊ alert�����棬success:�ɹ�,error:ʧ��
//defaultCon:ָ�������ڵ�ĳ���ؼ���ý���
var W = null; //W���ڵ���ҳ�����õģ���������ҳ��
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
                    //��ָ���ĸ����ڵĿؼ���ý���
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
//�ڵ�ǰ���֮ǰ��ĳ����Ŀؼ�ָ��ֵ
//����dialogDivID��Ҫ��ȡ���Ǹ����ID
//controlID��Ҫ��ֵ�Ŀؼ�
function GetReturn(dialogDivID, controlID) {
    var iBox = api.get(dialogDivID, 1), iW = iBox.iwin, iD = iW.document;
    return iD.getElementById(controlID);
}
//��ʾ��ѯ��
function ShowQueryBox() {
    var objDiv, objHid;
    //��ʾ��ѯ��
    objDiv = $("#divQuery");
    if (objDiv) { objDiv.show(); }
    //������ͼ״̬
    objHid = $("#hidQueryDisplay");
    if (objHid) { objHid.val("block"); }
    //�����б��
    objDiv = $("#divDataList");
    if (objDiv) { objDiv.hide(); }
    //������ͼ״̬
    objHid = $("#hidListDisplay");
    if (objHid) { objHid.val("none"); }
}
//���ز�ѯ��
function HidQueryBox() {
    //���ز�ѯ��
    var objDiv = $("#divQuery");
    if (objDiv) { objDiv.hide(); }
    //������ͼ״̬
    objHid = $("#hidQueryDisplay");
    if (objHid) { objHid.val("none"); }
    //��ʾ�б��
    var objDiv = $("#divDataList");
    if (objDiv) { objDiv.show(); }
    //������ͼ״̬
    objHid = $("#hidListDisplay");
    if (objHid) { objHid.val("block"); }
}
//ע����¼
function Logout() {
    $.dialog.confirm("ȷ��Ҫע����¼��", function () {
        this.close();
        parent.location.href = "/loginOut.aspx";
        return false;
    }, function () {
        //ִ��ȡ������
        this.close();
        return false;
    });
}
//���س�����һ���ؼ�
//defaultCon1ΪĬ�ϻ�ý���Ŀؼ���Ψһ��ʶ
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
            //��������Ϊdisabled=true����type="hidden"���ԵĿؼ�
            i = next(i, controls);
            if ($(controls[i]).attr("type") == "submit") {
                $(defaultCon1).focus();
                return true;
            }
            else {
                if (controls[i] != null || controls[i] != undefined) {
                    controls[i].focus();
                } else {
                    OpenDMessage("����", "�������ѡ��", "error", null);
                }
            }
            return false;
        }
        else {
            return true;
        }
    });
    //����Ϊdisabled="disabled"����type="hidden"��ȡ�������㣬Ҫ���������򱨴�
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
//����������� maxLength-��󳤶�;controlId-�ؼ�ID
function CheckFontLength(controlID, maxLength) {
    var objControl = $("#" + controlID);
    var controlValLength = GetRealLength(objControl.val());
    var curr = maxLength - controlValLength;
    if ($("#sFontLength")) {
        $("#sFontLength").html(curr.toString());
    }
    if (controlValLength > maxLength) {
        // �������Ƶ������˾ͽ� �ı����е����ݰ��涨������ ��ȡ
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
//�ж��ַ������ȣ�ȫ��/����ж�
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
//��ֹBackspace��������һҳ
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
//ѡ�
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
//��ȡURL��ֵ
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null)
        return unescape(r[2]);
    return null;
}
