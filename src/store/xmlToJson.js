const converter = (xml, rstr) => {
  if(window.DOMParser) {
    var getxml = new DOMParser();
    var xmlDoc = getxml.parseFromString(xml,"text/xml");
  }
  else {
    var xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
    xmlDoc.async = "false";
  }
  var json_str = convertFunc(xmlDoc);
  return json_str;
}

const convertFunc = xml => {
    var obj = {};

    if (xml.nodeType == 1) {
        if (xml.attributes.length > 0) {
        for (var j = 0; j < xml.attributes.length; j++) {
          var attribute = xml.attributes.item(j);
          obj[attribute.nodeName] = attribute.nodeValue;
        }
      }
    } else if (xml.nodeType == 3) {
      obj = xml.nodeValue.trim();
    }

    if (xml.hasChildNodes()) {
      for (var i = 0; i < xml.childNodes.length; i++) {
        var item = xml.childNodes.item(i);
        var nodeName = item.nodeName;
        if (typeof(obj[nodeName]) == "undefined") {
          var tmp = convertFunc(item);
          if (tmp !== "") // if not empty string
            obj[nodeName] = tmp;
        } else {
          if (typeof(obj[nodeName].push) == "undefined") {
            var old = obj[nodeName];
            obj[nodeName] = [];
            obj[nodeName].push(old);
          }
          var tmp = convertFunc(item);
          if (tmp !== "")
            obj[nodeName].push(tmp);
        }
      }
    }
    if (!Array.isArray(obj) && typeof obj == 'object') {
      var keys = Object.keys(obj);
      if (keys.length == 1 && keys[0] == '#text') return obj['#text'];
      if (keys.length === 0) return null;
    }
    return obj;
}

export default converter;
