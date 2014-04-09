$(function () {
    $.post("ViewAnalysis.ashx", { url: window.location.href }, function (data) {
        alert(data);
    });
})