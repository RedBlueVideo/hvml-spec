/*jshint laxcomma:true, smarttabs:true */
//(function () {
//"use strict";
var xmlDoc;
var xmlloaded = false;

function nsResolver(prefix) {
  var ns = {
    'ovml': 'http://vocab.nospoon.tv/ovml#',
    'xlink': 'http://www.w3.org/1999/xlink'
  };
  return ns[prefix] || null;
}

function readXML() {
  var nsResolver = document.createNSResolver( xmlDoc.ownerDocument === null ? xmlDoc.documentElement : xmlDoc.ownerDocument.documentElement );
  var xpathResult = document.evaluate( "//file[@label='intro-choice']", xmlDoc, nsResolver, XPathResult.ANY_TYPE, null );
  console.log(xpathResult);
}

function initLibrary()
{
    importXML("../examples/redblue.ovml.xml");
}

function importXML(xmlfile)
{
  var xmlhttp;
    try
    {
        xmlhttp = new XMLHttpRequest();
        xmlhttp.open("GET", xmlfile, false);
    }
    catch (Exception)
    {
        var ie = (typeof window.ActiveXObject != 'undefined');

        if (ie)
        {
            xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
            xmlDoc.async = false;
            while(xmlDoc.readyState != 4) {}
            xmlDoc.load(xmlfile);
            readXML();
            xmlloaded = true;
        }
        else
        {
            xmlDoc = document.implementation.createDocument("", "", null);
            xmlDoc.onload = readXML;
            xmlDoc.load(xmlfile);
            xmlloaded = true;
        }
    }

    if (!xmlloaded)
    {
        xmlhttp.setRequestHeader('Content-Type', 'text/xml');
        xmlhttp.send("");
        xmlDoc = xmlhttp.responseXML;
        readXML();
        xmlloaded = true;
    }
}

initLibrary();
//})();