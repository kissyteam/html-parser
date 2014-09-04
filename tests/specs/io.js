function createXHR() {
    if (typeof XMLHttpRequest != "undefined") {
        return new XMLHttpRequest();
    } else if (typeof ActiveXObject != "undefined") {
        if (typeof arguments.callee.activeXString != "string") {
            var versions = ["MSXML2.XMLHttp.6.0", "MSXML2.XMLHttp.3.0", "MSXML2.XMLHttp"];
            for (var i = 0, len = versions.length; i < len; i++) {
                try {
                    new ActiveXObect(versions[i]);
                    arguments.callee.activeXString = versions[i];
                    break;
                } catch (ex) {
                    //跳过
                }
            }
        }
        return new ActiveXObect(arguments.callee.activeXString);
    } else {
        throw new Error("No XHR object available.");
    }
}

module.exports = function (config) {
    var xmlhttp = createXHR();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            config.success(xmlhttp.responseText);
        }
    };
    xmlhttp.open("GET", config.url, false);
    xmlhttp.send();
};