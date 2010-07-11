
/* * ====================================================================
 * About: This a a compressed JS file from the Sarissa library. 
 * see http://dev.abiss.gr/sarissa
 * 
 * Copyright: Manos Batsis, http://dev.abiss.gr
 * 
 * Licence:
 * Sarissa is free software distributed under the GNU GPL version 2 
 * or higher, GNU LGPL version 2.1 or higher and Apache Software 
 * License 2.0 or higher. The licenses are available online see: 
 * http://www.gnu.org  
 * http://www.apache.org
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY 
 * KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE 
 * WARRANTIES OF MERCHANTABILITY,FITNESS FOR A PARTICULAR PURPOSE 
 * AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR 
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR 
 * OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE 
 * SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 * ====================================================================*/

function Sarissa(){}
Sarissa.VERSION="0.9.9.4";Sarissa.PARSED_OK="Document contains no parsing errors";Sarissa.PARSED_EMPTY="Document is empty";Sarissa.PARSED_UNKNOWN_ERROR="Not well-formed or other error";Sarissa.IS_ENABLED_TRANSFORM_NODE=false;Sarissa.REMOTE_CALL_FLAG="gr.abiss.sarissa.REMOTE_CALL_FLAG";Sarissa._lastUniqueSuffix=0;Sarissa._getUniqueSuffix=function(){return Sarissa._lastUniqueSuffix++;};Sarissa._SARISSA_IEPREFIX4XSLPARAM="";Sarissa._SARISSA_HAS_DOM_IMPLEMENTATION=document.implementation&&true;Sarissa._SARISSA_HAS_DOM_CREATE_DOCUMENT=Sarissa._SARISSA_HAS_DOM_IMPLEMENTATION&&document.implementation.createDocument;Sarissa._SARISSA_HAS_DOM_FEATURE=Sarissa._SARISSA_HAS_DOM_IMPLEMENTATION&&document.implementation.hasFeature;Sarissa._SARISSA_IS_MOZ=Sarissa._SARISSA_HAS_DOM_CREATE_DOCUMENT&&Sarissa._SARISSA_HAS_DOM_FEATURE;Sarissa._SARISSA_IS_SAFARI=navigator.userAgent.toLowerCase().indexOf("safari")!=-1||navigator.userAgent.toLowerCase().indexOf("konqueror")!=-1;Sarissa._SARISSA_IS_SAFARI_OLD=Sarissa._SARISSA_IS_SAFARI&&(parseInt((navigator.userAgent.match(/AppleWebKit\/(\d+)/)||{})[1],10)<420);Sarissa._SARISSA_IS_IE=document.all&&window.ActiveXObject&&navigator.userAgent.toLowerCase().indexOf("msie")>-1&&navigator.userAgent.toLowerCase().indexOf("opera")==-1;Sarissa._SARISSA_IS_OPERA=navigator.userAgent.toLowerCase().indexOf("opera")!=-1;if(!window.Node||!Node.ELEMENT_NODE){Node={ELEMENT_NODE:1,ATTRIBUTE_NODE:2,TEXT_NODE:3,CDATA_SECTION_NODE:4,ENTITY_REFERENCE_NODE:5,ENTITY_NODE:6,PROCESSING_INSTRUCTION_NODE:7,COMMENT_NODE:8,DOCUMENT_NODE:9,DOCUMENT_TYPE_NODE:10,DOCUMENT_FRAGMENT_NODE:11,NOTATION_NODE:12};}
if(Sarissa._SARISSA_IS_SAFARI_OLD){HTMLHtmlElement=document.createElement("html").constructor;Node=HTMLElement={};HTMLElement.prototype=HTMLHtmlElement.__proto__.__proto__;HTMLDocument=Document=document.constructor;var x=new DOMParser();XMLDocument=x.constructor;Element=x.parseFromString("<Single />","text/xml").documentElement.constructor;x=null;}
if(typeof XMLDocument=="undefined"&&typeof Document!="undefined"){XMLDocument=Document;}
if(Sarissa._SARISSA_IS_IE){Sarissa._SARISSA_IEPREFIX4XSLPARAM="xsl:";var _SARISSA_DOM_PROGID="";var _SARISSA_XMLHTTP_PROGID="";var _SARISSA_DOM_XMLWRITER="";Sarissa.pickRecentProgID=function(idList){var bFound=false,e;var o2Store;for(var i=0;i<idList.length&&!bFound;i++){try{var oDoc=new ActiveXObject(idList[i]);o2Store=idList[i];bFound=true;}catch(objException){e=objException;}}
if(!bFound){throw"Could not retrieve a valid progID of Class: "+idList[idList.length-1]+". (original exception: "+e+")";}
idList=null;return o2Store;};_SARISSA_DOM_PROGID=null;_SARISSA_THREADEDDOM_PROGID=null;_SARISSA_XSLTEMPLATE_PROGID=null;_SARISSA_XMLHTTP_PROGID=null;XMLHttpRequest=function(){if(!_SARISSA_XMLHTTP_PROGID){_SARISSA_XMLHTTP_PROGID=Sarissa.pickRecentProgID(["Msxml2.XMLHTTP.6.0","MSXML2.XMLHTTP.3.0","MSXML2.XMLHTTP","Microsoft.XMLHTTP"]);}
return new ActiveXObject(_SARISSA_XMLHTTP_PROGID);};Sarissa.getDomDocument=function(sUri,sName){if(!_SARISSA_DOM_PROGID){_SARISSA_DOM_PROGID=Sarissa.pickRecentProgID(["Msxml2.DOMDocument.6.0","Msxml2.DOMDocument.3.0","MSXML2.DOMDocument","MSXML.DOMDocument","Microsoft.XMLDOM"]);}
var oDoc=new ActiveXObject(_SARISSA_DOM_PROGID);if(sName){var prefix="";if(sUri){if(sName.indexOf(":")>1){prefix=sName.substring(0,sName.indexOf(":"));sName=sName.substring(sName.indexOf(":")+1);}else{prefix="a"+Sarissa._getUniqueSuffix();}}
if(sUri){oDoc.loadXML('<'+prefix+':'+sName+" xmlns:"+prefix+"=\""+sUri+"\""+" />");}else{oDoc.loadXML('<'+sName+" />");}}
return oDoc;};Sarissa.getParseErrorText=function(oDoc){var parseErrorText=Sarissa.PARSED_OK;if(oDoc&&oDoc.parseError&&oDoc.parseError.errorCode&&oDoc.parseError.errorCode!=0){parseErrorText="XML Parsing Error: "+oDoc.parseError.reason+"\nLocation: "+oDoc.parseError.url+"\nLine Number "+oDoc.parseError.line+", Column "+
oDoc.parseError.linepos+":\n"+oDoc.parseError.srcText+"\n";for(var i=0;i<oDoc.parseError.linepos;i++){parseErrorText+="-";}
parseErrorText+="^\n";}
else if(oDoc.documentElement===null){parseErrorText=Sarissa.PARSED_EMPTY;}
return parseErrorText;};Sarissa.setXpathNamespaces=function(oDoc,sNsSet){oDoc.setProperty("SelectionLanguage","XPath");oDoc.setProperty("SelectionNamespaces",sNsSet);};XSLTProcessor=function(){if(!_SARISSA_XSLTEMPLATE_PROGID){_SARISSA_XSLTEMPLATE_PROGID=Sarissa.pickRecentProgID(["Msxml2.XSLTemplate.6.0","MSXML2.XSLTemplate.3.0"]);}
this.template=new ActiveXObject(_SARISSA_XSLTEMPLATE_PROGID);this.processor=null;};XSLTProcessor.prototype.importStylesheet=function(xslDoc){if(!_SARISSA_THREADEDDOM_PROGID){_SARISSA_THREADEDDOM_PROGID=Sarissa.pickRecentProgID(["MSXML2.FreeThreadedDOMDocument.6.0","MSXML2.FreeThreadedDOMDocument.3.0"]);}
xslDoc.setProperty("SelectionLanguage","XPath");xslDoc.setProperty("SelectionNamespaces","xmlns:xsl='http://www.w3.org/1999/XSL/Transform'");var converted=new ActiveXObject(_SARISSA_THREADEDDOM_PROGID);try{converted.resolveExternals=true;converted.setProperty("AllowDocumentFunction",true);}
catch(e){}
if(xslDoc.url&&xslDoc.selectSingleNode("//xsl:*[local-name() = 'import' or local-name() = 'include']")!=null){converted.async=false;converted.load(xslDoc.url);}
else{converted.loadXML(xslDoc.xml);}
converted.setProperty("SelectionNamespaces","xmlns:xsl='http://www.w3.org/1999/XSL/Transform'");var output=converted.selectSingleNode("//xsl:output");if(output){this.outputMethod=output.getAttribute("method");}
else{delete this.outputMethod;}
this.template.stylesheet=converted;this.processor=this.template.createProcessor();this.paramsSet=[];};XSLTProcessor.prototype.transformToDocument=function(sourceDoc){var outDoc;if(_SARISSA_THREADEDDOM_PROGID){this.processor.input=sourceDoc;outDoc=new ActiveXObject(_SARISSA_DOM_PROGID);this.processor.output=outDoc;this.processor.transform();return outDoc;}
else{if(!_SARISSA_DOM_XMLWRITER){_SARISSA_DOM_XMLWRITER=Sarissa.pickRecentProgID(["Msxml2.MXXMLWriter.6.0","Msxml2.MXXMLWriter.3.0","MSXML2.MXXMLWriter","MSXML.MXXMLWriter","Microsoft.XMLDOM"]);}
this.processor.input=sourceDoc;outDoc=new ActiveXObject(_SARISSA_DOM_XMLWRITER);this.processor.output=outDoc;this.processor.transform();var oDoc=new ActiveXObject(_SARISSA_DOM_PROGID);oDoc.loadXML(outDoc.output+"");return oDoc;}};XSLTProcessor.prototype.transformToFragment=function(sourceDoc,ownerDoc){this.processor.input=sourceDoc;this.processor.transform();var s=this.processor.output;var f=ownerDoc.createDocumentFragment();var container;if(this.outputMethod=='text'){f.appendChild(ownerDoc.createTextNode(s));}else if(ownerDoc.body&&ownerDoc.body.innerHTML){container=ownerDoc.createElement('div');container.innerHTML=s;while(container.hasChildNodes()){f.appendChild(container.firstChild);}}
else{var oDoc=new ActiveXObject(_SARISSA_DOM_PROGID);if(s.substring(0,5)=='<?xml'){s=s.substring(s.indexOf('?>')+2);}
var xml=''.concat('<my>',s,'</my>');oDoc.loadXML(xml);container=oDoc.documentElement;while(container.hasChildNodes()){f.appendChild(container.firstChild);}}
return f;};XSLTProcessor.prototype.setParameter=function(nsURI,name,value){value=value?value:"";if(nsURI){this.processor.addParameter(name,value,nsURI);}else{this.processor.addParameter(name,value);}
nsURI=""+(nsURI||"");if(!this.paramsSet[nsURI]){this.paramsSet[nsURI]=[];}
this.paramsSet[nsURI][name]=value;};XSLTProcessor.prototype.getParameter=function(nsURI,name){nsURI=""+(nsURI||"");if(this.paramsSet[nsURI]&&this.paramsSet[nsURI][name]){return this.paramsSet[nsURI][name];}else{return null;}};XSLTProcessor.prototype.clearParameters=function(){for(var nsURI in this.paramsSet){for(var name in this.paramsSet[nsURI]){if(nsURI!=""){this.processor.addParameter(name,"",nsURI);}else{this.processor.addParameter(name,"");}}}
this.paramsSet=[];};}else{if(Sarissa._SARISSA_HAS_DOM_CREATE_DOCUMENT){Sarissa.__handleLoad__=function(oDoc){Sarissa.__setReadyState__(oDoc,4);};_sarissa_XMLDocument_onload=function(){Sarissa.__handleLoad__(this);};Sarissa.__setReadyState__=function(oDoc,iReadyState){oDoc.readyState=iReadyState;oDoc.readystate=iReadyState;if(oDoc.onreadystatechange!=null&&typeof oDoc.onreadystatechange=="function"){oDoc.onreadystatechange();}};Sarissa.getDomDocument=function(sUri,sName){var oDoc=document.implementation.createDocument(sUri?sUri:null,sName?sName:null,null);if(!oDoc.onreadystatechange){oDoc.onreadystatechange=null;}
if(!oDoc.readyState){oDoc.readyState=0;}
oDoc.addEventListener("load",_sarissa_XMLDocument_onload,false);return oDoc;};if(window.XMLDocument){}
else if(Sarissa._SARISSA_HAS_DOM_FEATURE&&window.Document&&!Document.prototype.load&&document.implementation.hasFeature('LS','3.0')){Sarissa.getDomDocument=function(sUri,sName){var oDoc=document.implementation.createDocument(sUri?sUri:null,sName?sName:null,null);return oDoc;};}
else{Sarissa.getDomDocument=function(sUri,sName){var oDoc=document.implementation.createDocument(sUri?sUri:null,sName?sName:null,null);if(oDoc&&(sUri||sName)&&!oDoc.documentElement){oDoc.appendChild(oDoc.createElementNS(sUri,sName));}
return oDoc;};}}}
if(!window.DOMParser){if(Sarissa._SARISSA_IS_SAFARI){DOMParser=function(){};DOMParser.prototype.parseFromString=function(sXml,contentType){var xmlhttp=new XMLHttpRequest();xmlhttp.open("GET","data:text/xml;charset=utf-8,"+encodeURIComponent(sXml),false);xmlhttp.send(null);return xmlhttp.responseXML;};}else if(Sarissa.getDomDocument&&Sarissa.getDomDocument()&&Sarissa.getDomDocument(null,"bar").xml){DOMParser=function(){};DOMParser.prototype.parseFromString=function(sXml,contentType){var doc=Sarissa.getDomDocument();doc.loadXML(sXml);return doc;};}}
if((typeof(document.importNode)=="undefined")&&Sarissa._SARISSA_IS_IE){try{document.importNode=function(oNode,bChildren){var tmp;if(oNode.nodeName=='#text'){return document.createTextNode(oNode.data);}
else{if(oNode.nodeName=="tbody"||oNode.nodeName=="tr"){tmp=document.createElement("table");}
else if(oNode.nodeName=="td"){tmp=document.createElement("tr");}
else if(oNode.nodeName=="option"){tmp=document.createElement("select");}
else{tmp=document.createElement("div");}
if(bChildren){tmp.innerHTML=oNode.xml?oNode.xml:oNode.outerHTML;}else{tmp.innerHTML=oNode.xml?oNode.cloneNode(false).xml:oNode.cloneNode(false).outerHTML;}
return tmp.getElementsByTagName("*")[0];}};}catch(e){}}
if(!Sarissa.getParseErrorText){Sarissa.getParseErrorText=function(oDoc){var parseErrorText=Sarissa.PARSED_OK;if((!oDoc)||(!oDoc.documentElement)){parseErrorText=Sarissa.PARSED_EMPTY;}else if(oDoc.documentElement.tagName=="parsererror"){parseErrorText=oDoc.documentElement.firstChild.data;parseErrorText+="\n"+oDoc.documentElement.firstChild.nextSibling.firstChild.data;}else if(oDoc.getElementsByTagName("parsererror").length>0){var parsererror=oDoc.getElementsByTagName("parsererror")[0];parseErrorText=Sarissa.getText(parsererror,true)+"\n";}else if(oDoc.parseError&&oDoc.parseError.errorCode!=0){parseErrorText=Sarissa.PARSED_UNKNOWN_ERROR;}
return parseErrorText;};}
Sarissa.getText=function(oNode,deep){var s="";var nodes=oNode.childNodes;for(var i=0;i<nodes.length;i++){var node=nodes[i];var nodeType=node.nodeType;if(nodeType==Node.TEXT_NODE||nodeType==Node.CDATA_SECTION_NODE){s+=node.data;}else if(deep===true&&(nodeType==Node.ELEMENT_NODE||nodeType==Node.DOCUMENT_NODE||nodeType==Node.DOCUMENT_FRAGMENT_NODE)){s+=Sarissa.getText(node,true);}}
return s;};if(!window.XMLSerializer&&Sarissa.getDomDocument&&Sarissa.getDomDocument("","foo",null).xml){XMLSerializer=function(){};XMLSerializer.prototype.serializeToString=function(oNode){return oNode.xml;};}
Sarissa.stripTags=function(s){return s?s.replace(/<[^>]+>/g,""):s;};Sarissa.clearChildNodes=function(oNode){while(oNode.firstChild){oNode.removeChild(oNode.firstChild);}};Sarissa.copyChildNodes=function(nodeFrom,nodeTo,bPreserveExisting){if(Sarissa._SARISSA_IS_SAFARI&&nodeTo.nodeType==Node.DOCUMENT_NODE){nodeTo=nodeTo.documentElement;}
if((!nodeFrom)||(!nodeTo)){throw"Both source and destination nodes must be provided";}
if(!bPreserveExisting){Sarissa.clearChildNodes(nodeTo);}
var ownerDoc=nodeTo.nodeType==Node.DOCUMENT_NODE?nodeTo:nodeTo.ownerDocument;var nodes=nodeFrom.childNodes;var i;if(typeof(ownerDoc.importNode)!="undefined"){for(i=0;i<nodes.length;i++){nodeTo.appendChild(ownerDoc.importNode(nodes[i],true));}}else{for(i=0;i<nodes.length;i++){nodeTo.appendChild(nodes[i].cloneNode(true));}}};Sarissa.moveChildNodes=function(nodeFrom,nodeTo,bPreserveExisting){if((!nodeFrom)||(!nodeTo)){throw"Both source and destination nodes must be provided";}
if(!bPreserveExisting){Sarissa.clearChildNodes(nodeTo);}
var nodes=nodeFrom.childNodes;if(nodeFrom.ownerDocument==nodeTo.ownerDocument){while(nodeFrom.firstChild){nodeTo.appendChild(nodeFrom.firstChild);}}else{var ownerDoc=nodeTo.nodeType==Node.DOCUMENT_NODE?nodeTo:nodeTo.ownerDocument;var i;if(typeof(ownerDoc.importNode)!="undefined"){for(i=0;i<nodes.length;i++){nodeTo.appendChild(ownerDoc.importNode(nodes[i],true));}}else{for(i=0;i<nodes.length;i++){nodeTo.appendChild(nodes[i].cloneNode(true));}}
Sarissa.clearChildNodes(nodeFrom);}};Sarissa.xmlize=function(anyObject,objectName,indentSpace){indentSpace=indentSpace?indentSpace:'';var s=indentSpace+'<'+objectName+'>';var isLeaf=false;if(!(anyObject instanceof Object)||anyObject instanceof Number||anyObject instanceof String||anyObject instanceof Boolean||anyObject instanceof Date){s+=Sarissa.escape(""+anyObject);isLeaf=true;}else{s+="\n";var isArrayItem=anyObject instanceof Array;for(var name in anyObject){s+=Sarissa.xmlize(anyObject[name],(isArrayItem?"array-item key=\""+name+"\"":name),indentSpace+"   ");}
s+=indentSpace;}
return(s+=(objectName.indexOf(' ')!=-1?"</array-item>\n":"</"+objectName+">\n"));};Sarissa.escape=function(sXml){return sXml.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&apos;");};Sarissa.unescape=function(sXml){return sXml.replace(/&apos;/g,"'").replace(/&quot;/g,"\"").replace(/&gt;/g,">").replace(/&lt;/g,"<").replace(/&amp;/g,"&");};Sarissa.updateCursor=function(oTargetElement,sValue){if(oTargetElement&&oTargetElement.style&&oTargetElement.style.cursor!=undefined){oTargetElement.style.cursor=sValue;}};Sarissa.updateContentFromURI=function(sFromUrl,oTargetElement,xsltproc,callback,skipCache){try{Sarissa.updateCursor(oTargetElement,"wait");var xmlhttp=new XMLHttpRequest();xmlhttp.open("GET",sFromUrl,true);xmlhttp.onreadystatechange=function(){if(xmlhttp.readyState==4){try{var oDomDoc=xmlhttp.responseXML;if(oDomDoc&&Sarissa.getParseErrorText(oDomDoc)==Sarissa.PARSED_OK){Sarissa.updateContentFromNode(xmlhttp.responseXML,oTargetElement,xsltproc);if(callback){callback(sFromUrl,oTargetElement);}}
else{throw Sarissa.getParseErrorText(oDomDoc);}}
catch(e){if(callback){callback(sFromUrl,oTargetElement,e);}
else{throw e;}}}};if(skipCache){var oldage="Sat, 1 Jan 2000 00:00:00 GMT";xmlhttp.setRequestHeader("If-Modified-Since",oldage);}
xmlhttp.send("");}
catch(e){Sarissa.updateCursor(oTargetElement,"auto");if(callback){callback(sFromUrl,oTargetElement,e);}
else{throw e;}}};Sarissa.updateContentFromNode=function(oNode,oTargetElement,xsltproc){try{Sarissa.updateCursor(oTargetElement,"wait");Sarissa.clearChildNodes(oTargetElement);var ownerDoc=oNode.nodeType==Node.DOCUMENT_NODE?oNode:oNode.ownerDocument;if(ownerDoc.parseError&&ownerDoc.parseError.errorCode!=0){var pre=document.createElement("pre");pre.appendChild(document.createTextNode(Sarissa.getParseErrorText(ownerDoc)));oTargetElement.appendChild(pre);}
else{if(xsltproc){oNode=xsltproc.transformToDocument(oNode);}
if(oTargetElement.tagName.toLowerCase()=="textarea"||oTargetElement.tagName.toLowerCase()=="input"){oTargetElement.value=new XMLSerializer().serializeToString(oNode);}
else{try{oTargetElement.appendChild(oTargetElement.ownerDocument.importNode(oNode,true));}
catch(e){oTargetElement.innerHTML=new XMLSerializer().serializeToString(oNode);}}}}
catch(e){throw e;}
finally{Sarissa.updateCursor(oTargetElement,"auto");}};Sarissa.formToQueryString=function(oForm){var qs="";for(var i=0;i<oForm.elements.length;i++){var oField=oForm.elements[i];var sFieldName=oField.getAttribute("name")?oField.getAttribute("name"):oField.getAttribute("id");if(sFieldName&&((!oField.disabled)||oField.type=="hidden")){switch(oField.type){case"hidden":case"text":case"textarea":case"password":qs+=sFieldName+"="+encodeURIComponent(oField.value)+"&";break;case"select-one":qs+=sFieldName+"="+encodeURIComponent(oField.options[oField.selectedIndex].value)+"&";break;case"select-multiple":for(var j=0;j<oField.length;j++){var optElem=oField.options[j];if(optElem.selected===true){qs+=sFieldName+"[]"+"="+encodeURIComponent(optElem.value)+"&";}}
break;case"checkbox":case"radio":if(oField.checked){qs+=sFieldName+"="+encodeURIComponent(oField.value)+"&";}
break;}}}
return qs.substr(0,qs.length-1);};Sarissa.updateContentFromForm=function(oForm,oTargetElement,xsltproc,callback){try{Sarissa.updateCursor(oTargetElement,"wait");var params=Sarissa.formToQueryString(oForm)+"&"+Sarissa.REMOTE_CALL_FLAG+"=true";var xmlhttp=new XMLHttpRequest();var bUseGet=oForm.getAttribute("method")&&oForm.getAttribute("method").toLowerCase()=="get";if(bUseGet){xmlhttp.open("GET",oForm.getAttribute("action")+"?"+params,true);}
else{xmlhttp.open('POST',oForm.getAttribute("action"),true);xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");xmlhttp.setRequestHeader("Content-length",params.length);xmlhttp.setRequestHeader("Connection","close");}
xmlhttp.onreadystatechange=function(){try{if(xmlhttp.readyState==4){var oDomDoc=xmlhttp.responseXML;if(oDomDoc&&Sarissa.getParseErrorText(oDomDoc)==Sarissa.PARSED_OK){Sarissa.updateContentFromNode(xmlhttp.responseXML,oTargetElement,xsltproc);if(callback){callback(oForm,oTargetElement);}}
else{throw Sarissa.getParseErrorText(oDomDoc);}}}
catch(e){if(callback){callback(oForm,oTargetElement,e);}
else{throw e;}}};xmlhttp.send(bUseGet?"":params);}
catch(e){Sarissa.updateCursor(oTargetElement,"auto");if(callback){callback(oForm,oTargetElement,e);}
else{throw e;}}
return false;};Sarissa.FUNCTION_NAME_REGEXP=new RegExp("");Sarissa.getFunctionName=function(oFunc,bForce){var name;if(!name){if(bForce){name="SarissaAnonymous"+Sarissa._getUniqueSuffix();window[name]=oFunc;}
else{name=null;}}
if(name){window[name]=oFunc;}
return name;};Sarissa.setRemoteJsonCallback=function(url,callback,callbackParam){if(!callbackParam){callbackParam="callback";}
var callbackFunctionName=Sarissa.getFunctionName(callback,true);var id="sarissa_json_script_id_"+Sarissa._getUniqueSuffix();var oHead=document.getElementsByTagName("head")[0];var scriptTag=document.createElement('script');scriptTag.type='text/javascript';scriptTag.id=id;scriptTag.onload=function(){};if(url.indexOf("?")!=-1){url+=("&"+callbackParam+"="+callbackFunctionName);}
else{url+=("?"+callbackParam+"="+callbackFunctionName);}
scriptTag.src=url;oHead.appendChild(scriptTag);return id;};


/* * ====================================================================
 * About: This a a compressed JS file from the Sarissa library. 
 * see http://dev.abiss.gr/sarissa
 * 
 * Copyright: Manos Batsis, http://dev.abiss.gr
 * 
 * Licence:
 * Sarissa is free software distributed under the GNU GPL version 2 
 * or higher, GNU LGPL version 2.1 or higher and Apache Software 
 * License 2.0 or higher. The licenses are available online see: 
 * http://www.gnu.org  
 * http://www.apache.org
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY 
 * KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE 
 * WARRANTIES OF MERCHANTABILITY,FITNESS FOR A PARTICULAR PURPOSE 
 * AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR 
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR 
 * OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE 
 * SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 * ====================================================================*/

if(Sarissa._SARISSA_HAS_DOM_FEATURE&&document.implementation.hasFeature("XPath","3.0")){SarissaNodeList=function(i){this.length=i;};SarissaNodeList.prototype=[];SarissaNodeList.prototype.constructor=Array;SarissaNodeList.prototype.item=function(i){return(i<0||i>=this.length)?null:this[i];};SarissaNodeList.prototype.expr="";if(window.XMLDocument&&(!XMLDocument.prototype.setProperty)){XMLDocument.prototype.setProperty=function(x,y){};}
Sarissa.setXpathNamespaces=function(oDoc,sNsSet){oDoc._sarissa_useCustomResolver=true;var namespaces=sNsSet.indexOf(" ")>-1?sNsSet.split(" "):[sNsSet];oDoc._sarissa_xpathNamespaces=[];for(var i=0;i<namespaces.length;i++){var ns=namespaces[i];var colonPos=ns.indexOf(":");var assignPos=ns.indexOf("=");if(colonPos>0&&assignPos>colonPos+1){var prefix=ns.substring(colonPos+1,assignPos);var uri=ns.substring(assignPos+2,ns.length-1);oDoc._sarissa_xpathNamespaces[prefix]=uri;}else{throw"Bad format on namespace declaration(s) given";}}};XMLDocument.prototype._sarissa_useCustomResolver=false;XMLDocument.prototype._sarissa_xpathNamespaces=[];XMLDocument.prototype.selectNodes=function(sExpr,contextNode,returnSingle){var nsDoc=this;var nsresolver;if(this._sarissa_useCustomResolver){nsresolver=function(prefix){var s=nsDoc._sarissa_xpathNamespaces[prefix];if(s){return s;}
else{throw"No namespace URI found for prefix: '"+prefix+"'";}};}
else{nsresolver=this.createNSResolver(this.documentElement);}
var result=null;if(!returnSingle){var oResult=this.evaluate(sExpr,(contextNode?contextNode:this),nsresolver,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);var nodeList=new SarissaNodeList(oResult.snapshotLength);nodeList.expr=sExpr;for(var i=0;i<nodeList.length;i++){nodeList[i]=oResult.snapshotItem(i);}
result=nodeList;}
else{result=this.evaluate(sExpr,(contextNode?contextNode:this),nsresolver,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;}
return result;};Element.prototype.selectNodes=function(sExpr){var doc=this.ownerDocument;if(doc.selectNodes){return doc.selectNodes(sExpr,this);}
else{throw"Method selectNodes is only supported by XML Elements";}};XMLDocument.prototype.selectSingleNode=function(sExpr,contextNode){var ctx=contextNode?contextNode:null;return this.selectNodes(sExpr,ctx,true);};Element.prototype.selectSingleNode=function(sExpr){var doc=this.ownerDocument;if(doc.selectSingleNode){return doc.selectSingleNode(sExpr,this);}
else{throw"Method selectNodes is only supported by XML Elements";}};Sarissa.IS_ENABLED_SELECT_NODES=true;}

/*
 * jQuery JavaScript Library v1.3.2
 * http://jquery.com/
 *
 * Copyright (c) 2009 John Resig
 * Dual licensed under the MIT and GPL licenses.
 * http://docs.jquery.com/License
 *
 * Date: 2009-02-19 17:34:21 -0500 (Thu, 19 Feb 2009)
 * Revision: 6246
 */
(function(){var l=this,g,y=l.jQuery,p=l.$,o=l.jQuery=l.$=function(E,F){return new o.fn.init(E,F)},D=/^[^<]*(<(.|\s)+>)[^>]*$|^#([\w-]+)$/,f=/^.[^:#\[\.,]*$/;o.fn=o.prototype={init:function(E,H){E=E||document;if(E.nodeType){this[0]=E;this.length=1;this.context=E;return this}if(typeof E==="string"){var G=D.exec(E);if(G&&(G[1]||!H)){if(G[1]){E=o.clean([G[1]],H)}else{var I=document.getElementById(G[3]);if(I&&I.id!=G[3]){return o().find(E)}var F=o(I||[]);F.context=document;F.selector=E;return F}}else{return o(H).find(E)}}else{if(o.isFunction(E)){return o(document).ready(E)}}if(E.selector&&E.context){this.selector=E.selector;this.context=E.context}return this.setArray(o.isArray(E)?E:o.makeArray(E))},selector:"",jquery:"1.3.2",size:function(){return this.length},get:function(E){return E===g?Array.prototype.slice.call(this):this[E]},pushStack:function(F,H,E){var G=o(F);G.prevObject=this;G.context=this.context;if(H==="find"){G.selector=this.selector+(this.selector?" ":"")+E}else{if(H){G.selector=this.selector+"."+H+"("+E+")"}}return G},setArray:function(E){this.length=0;Array.prototype.push.apply(this,E);return this},each:function(F,E){return o.each(this,F,E)},index:function(E){return o.inArray(E&&E.jquery?E[0]:E,this)},attr:function(F,H,G){var E=F;if(typeof F==="string"){if(H===g){return this[0]&&o[G||"attr"](this[0],F)}else{E={};E[F]=H}}return this.each(function(I){for(F in E){o.attr(G?this.style:this,F,o.prop(this,E[F],G,I,F))}})},css:function(E,F){if((E=="width"||E=="height")&&parseFloat(F)<0){F=g}return this.attr(E,F,"curCSS")},text:function(F){if(typeof F!=="object"&&F!=null){return this.empty().append((this[0]&&this[0].ownerDocument||document).createTextNode(F))}var E="";o.each(F||this,function(){o.each(this.childNodes,function(){if(this.nodeType!=8){E+=this.nodeType!=1?this.nodeValue:o.fn.text([this])}})});return E},wrapAll:function(E){if(this[0]){var F=o(E,this[0].ownerDocument).clone();if(this[0].parentNode){F.insertBefore(this[0])}F.map(function(){var G=this;while(G.firstChild){G=G.firstChild}return G}).append(this)}return this},wrapInner:function(E){return this.each(function(){o(this).contents().wrapAll(E)})},wrap:function(E){return this.each(function(){o(this).wrapAll(E)})},append:function(){return this.domManip(arguments,true,function(E){if(this.nodeType==1){this.appendChild(E)}})},prepend:function(){return this.domManip(arguments,true,function(E){if(this.nodeType==1){this.insertBefore(E,this.firstChild)}})},before:function(){return this.domManip(arguments,false,function(E){this.parentNode.insertBefore(E,this)})},after:function(){return this.domManip(arguments,false,function(E){this.parentNode.insertBefore(E,this.nextSibling)})},end:function(){return this.prevObject||o([])},push:[].push,sort:[].sort,splice:[].splice,find:function(E){if(this.length===1){var F=this.pushStack([],"find",E);F.length=0;o.find(E,this[0],F);return F}else{return this.pushStack(o.unique(o.map(this,function(G){return o.find(E,G)})),"find",E)}},clone:function(G){var E=this.map(function(){if(!o.support.noCloneEvent&&!o.isXMLDoc(this)){var I=this.outerHTML;if(!I){var J=this.ownerDocument.createElement("div");J.appendChild(this.cloneNode(true));I=J.innerHTML}return o.clean([I.replace(/ jQuery\d+="(?:\d+|null)"/g,"").replace(/^\s*/,"")])[0]}else{return this.cloneNode(true)}});if(G===true){var H=this.find("*").andSelf(),F=0;E.find("*").andSelf().each(function(){if(this.nodeName!==H[F].nodeName){return}var I=o.data(H[F],"events");for(var K in I){for(var J in I[K]){o.event.add(this,K,I[K][J],I[K][J].data)}}F++})}return E},filter:function(E){return this.pushStack(o.isFunction(E)&&o.grep(this,function(G,F){return E.call(G,F)})||o.multiFilter(E,o.grep(this,function(F){return F.nodeType===1})),"filter",E)},closest:function(E){var G=o.expr.match.POS.test(E)?o(E):null,F=0;return this.map(function(){var H=this;while(H&&H.ownerDocument){if(G?G.index(H)>-1:o(H).is(E)){o.data(H,"closest",F);return H}H=H.parentNode;F++}})},not:function(E){if(typeof E==="string"){if(f.test(E)){return this.pushStack(o.multiFilter(E,this,true),"not",E)}else{E=o.multiFilter(E,this)}}var F=E.length&&E[E.length-1]!==g&&!E.nodeType;return this.filter(function(){return F?o.inArray(this,E)<0:this!=E})},add:function(E){return this.pushStack(o.unique(o.merge(this.get(),typeof E==="string"?o(E):o.makeArray(E))))},is:function(E){return !!E&&o.multiFilter(E,this).length>0},hasClass:function(E){return !!E&&this.is("."+E)},val:function(K){if(K===g){var E=this[0];if(E){if(o.nodeName(E,"option")){return(E.attributes.value||{}).specified?E.value:E.text}if(o.nodeName(E,"select")){var I=E.selectedIndex,L=[],M=E.options,H=E.type=="select-one";if(I<0){return null}for(var F=H?I:0,J=H?I+1:M.length;F<J;F++){var G=M[F];if(G.selected){K=o(G).val();if(H){return K}L.push(K)}}return L}return(E.value||"").replace(/\r/g,"")}return g}if(typeof K==="number"){K+=""}return this.each(function(){if(this.nodeType!=1){return}if(o.isArray(K)&&/radio|checkbox/.test(this.type)){this.checked=(o.inArray(this.value,K)>=0||o.inArray(this.name,K)>=0)}else{if(o.nodeName(this,"select")){var N=o.makeArray(K);o("option",this).each(function(){this.selected=(o.inArray(this.value,N)>=0||o.inArray(this.text,N)>=0)});if(!N.length){this.selectedIndex=-1}}else{this.value=K}}})},html:function(E){return E===g?(this[0]?this[0].innerHTML.replace(/ jQuery\d+="(?:\d+|null)"/g,""):null):this.empty().append(E)},replaceWith:function(E){return this.after(E).remove()},eq:function(E){return this.slice(E,+E+1)},slice:function(){return this.pushStack(Array.prototype.slice.apply(this,arguments),"slice",Array.prototype.slice.call(arguments).join(","))},map:function(E){return this.pushStack(o.map(this,function(G,F){return E.call(G,F,G)}))},andSelf:function(){return this.add(this.prevObject)},domManip:function(J,M,L){if(this[0]){var I=(this[0].ownerDocument||this[0]).createDocumentFragment(),F=o.clean(J,(this[0].ownerDocument||this[0]),I),H=I.firstChild;if(H){for(var G=0,E=this.length;G<E;G++){L.call(K(this[G],H),this.length>1||G>0?I.cloneNode(true):I)}}if(F){o.each(F,z)}}return this;function K(N,O){return M&&o.nodeName(N,"table")&&o.nodeName(O,"tr")?(N.getElementsByTagName("tbody")[0]||N.appendChild(N.ownerDocument.createElement("tbody"))):N}}};o.fn.init.prototype=o.fn;function z(E,F){if(F.src){o.ajax({url:F.src,async:false,dataType:"script"})}else{o.globalEval(F.text||F.textContent||F.innerHTML||"")}if(F.parentNode){F.parentNode.removeChild(F)}}function e(){return +new Date}o.extend=o.fn.extend=function(){var J=arguments[0]||{},H=1,I=arguments.length,E=false,G;if(typeof J==="boolean"){E=J;J=arguments[1]||{};H=2}if(typeof J!=="object"&&!o.isFunction(J)){J={}}if(I==H){J=this;--H}for(;H<I;H++){if((G=arguments[H])!=null){for(var F in G){var K=J[F],L=G[F];if(J===L){continue}if(E&&L&&typeof L==="object"&&!L.nodeType){J[F]=o.extend(E,K||(L.length!=null?[]:{}),L)}else{if(L!==g){J[F]=L}}}}}return J};var b=/z-?index|font-?weight|opacity|zoom|line-?height/i,q=document.defaultView||{},s=Object.prototype.toString;o.extend({noConflict:function(E){l.$=p;if(E){l.jQuery=y}return o},isFunction:function(E){return s.call(E)==="[object Function]"},isArray:function(E){return s.call(E)==="[object Array]"},isXMLDoc:function(E){return E.nodeType===9&&E.documentElement.nodeName!=="HTML"||!!E.ownerDocument&&o.isXMLDoc(E.ownerDocument)},globalEval:function(G){if(G&&/\S/.test(G)){var F=document.getElementsByTagName("head")[0]||document.documentElement,E=document.createElement("script");E.type="text/javascript";if(o.support.scriptEval){E.appendChild(document.createTextNode(G))}else{E.text=G}F.insertBefore(E,F.firstChild);F.removeChild(E)}},nodeName:function(F,E){return F.nodeName&&F.nodeName.toUpperCase()==E.toUpperCase()},each:function(G,K,F){var E,H=0,I=G.length;if(F){if(I===g){for(E in G){if(K.apply(G[E],F)===false){break}}}else{for(;H<I;){if(K.apply(G[H++],F)===false){break}}}}else{if(I===g){for(E in G){if(K.call(G[E],E,G[E])===false){break}}}else{for(var J=G[0];H<I&&K.call(J,H,J)!==false;J=G[++H]){}}}return G},prop:function(H,I,G,F,E){if(o.isFunction(I)){I=I.call(H,F)}return typeof I==="number"&&G=="curCSS"&&!b.test(E)?I+"px":I},className:{add:function(E,F){o.each((F||"").split(/\s+/),function(G,H){if(E.nodeType==1&&!o.className.has(E.className,H)){E.className+=(E.className?" ":"")+H}})},remove:function(E,F){if(E.nodeType==1){E.className=F!==g?o.grep(E.className.split(/\s+/),function(G){return !o.className.has(F,G)}).join(" "):""}},has:function(F,E){return F&&o.inArray(E,(F.className||F).toString().split(/\s+/))>-1}},swap:function(H,G,I){var E={};for(var F in G){E[F]=H.style[F];H.style[F]=G[F]}I.call(H);for(var F in G){H.style[F]=E[F]}},css:function(H,F,J,E){if(F=="width"||F=="height"){var L,G={position:"absolute",visibility:"hidden",display:"block"},K=F=="width"?["Left","Right"]:["Top","Bottom"];function I(){L=F=="width"?H.offsetWidth:H.offsetHeight;if(E==="border"){return}o.each(K,function(){if(!E){L-=parseFloat(o.curCSS(H,"padding"+this,true))||0}if(E==="margin"){L+=parseFloat(o.curCSS(H,"margin"+this,true))||0}else{L-=parseFloat(o.curCSS(H,"border"+this+"Width",true))||0}})}if(H.offsetWidth!==0){I()}else{o.swap(H,G,I)}return Math.max(0,Math.round(L))}return o.curCSS(H,F,J)},curCSS:function(I,F,G){var L,E=I.style;if(F=="opacity"&&!o.support.opacity){L=o.attr(E,"opacity");return L==""?"1":L}if(F.match(/float/i)){F=w}if(!G&&E&&E[F]){L=E[F]}else{if(q.getComputedStyle){if(F.match(/float/i)){F="float"}F=F.replace(/([A-Z])/g,"-$1").toLowerCase();var M=q.getComputedStyle(I,null);if(M){L=M.getPropertyValue(F)}if(F=="opacity"&&L==""){L="1"}}else{if(I.currentStyle){var J=F.replace(/\-(\w)/g,function(N,O){return O.toUpperCase()});L=I.currentStyle[F]||I.currentStyle[J];if(!/^\d+(px)?$/i.test(L)&&/^\d/.test(L)){var H=E.left,K=I.runtimeStyle.left;I.runtimeStyle.left=I.currentStyle.left;E.left=L||0;L=E.pixelLeft+"px";E.left=H;I.runtimeStyle.left=K}}}}return L},clean:function(F,K,I){K=K||document;if(typeof K.createElement==="undefined"){K=K.ownerDocument||K[0]&&K[0].ownerDocument||document}if(!I&&F.length===1&&typeof F[0]==="string"){var H=/^<(\w+)\s*\/?>$/.exec(F[0]);if(H){return[K.createElement(H[1])]}}var G=[],E=[],L=K.createElement("div");o.each(F,function(P,S){if(typeof S==="number"){S+=""}if(!S){return}if(typeof S==="string"){S=S.replace(/(<(\w+)[^>]*?)\/>/g,function(U,V,T){return T.match(/^(abbr|br|col|img|input|link|meta|param|hr|area|embed)$/i)?U:V+"></"+T+">"});var O=S.replace(/^\s+/,"").substring(0,10).toLowerCase();var Q=!O.indexOf("<opt")&&[1,"<select multiple='multiple'>","</select>"]||!O.indexOf("<leg")&&[1,"<fieldset>","</fieldset>"]||O.match(/^<(thead|tbody|tfoot|colg|cap)/)&&[1,"<table>","</table>"]||!O.indexOf("<tr")&&[2,"<table><tbody>","</tbody></table>"]||(!O.indexOf("<td")||!O.indexOf("<th"))&&[3,"<table><tbody><tr>","</tr></tbody></table>"]||!O.indexOf("<col")&&[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"]||!o.support.htmlSerialize&&[1,"div<div>","</div>"]||[0,"",""];L.innerHTML=Q[1]+S+Q[2];while(Q[0]--){L=L.lastChild}if(!o.support.tbody){var R=/<tbody/i.test(S),N=!O.indexOf("<table")&&!R?L.firstChild&&L.firstChild.childNodes:Q[1]=="<table>"&&!R?L.childNodes:[];for(var M=N.length-1;M>=0;--M){if(o.nodeName(N[M],"tbody")&&!N[M].childNodes.length){N[M].parentNode.removeChild(N[M])}}}if(!o.support.leadingWhitespace&&/^\s/.test(S)){L.insertBefore(K.createTextNode(S.match(/^\s*/)[0]),L.firstChild)}S=o.makeArray(L.childNodes)}if(S.nodeType){G.push(S)}else{G=o.merge(G,S)}});if(I){for(var J=0;G[J];J++){if(o.nodeName(G[J],"script")&&(!G[J].type||G[J].type.toLowerCase()==="text/javascript")){E.push(G[J].parentNode?G[J].parentNode.removeChild(G[J]):G[J])}else{if(G[J].nodeType===1){G.splice.apply(G,[J+1,0].concat(o.makeArray(G[J].getElementsByTagName("script"))))}I.appendChild(G[J])}}return E}return G},attr:function(J,G,K){if(!J||J.nodeType==3||J.nodeType==8){return g}var H=!o.isXMLDoc(J),L=K!==g;G=H&&o.props[G]||G;if(J.tagName){var F=/href|src|style/.test(G);if(G=="selected"&&J.parentNode){J.parentNode.selectedIndex}if(G in J&&H&&!F){if(L){if(G=="type"&&o.nodeName(J,"input")&&J.parentNode){throw"type property can't be changed"}J[G]=K}if(o.nodeName(J,"form")&&J.getAttributeNode(G)){return J.getAttributeNode(G).nodeValue}if(G=="tabIndex"){var I=J.getAttributeNode("tabIndex");return I&&I.specified?I.value:J.nodeName.match(/(button|input|object|select|textarea)/i)?0:J.nodeName.match(/^(a|area)$/i)&&J.href?0:g}return J[G]}if(!o.support.style&&H&&G=="style"){return o.attr(J.style,"cssText",K)}if(L){J.setAttribute(G,""+K)}var E=!o.support.hrefNormalized&&H&&F?J.getAttribute(G,2):J.getAttribute(G);return E===null?g:E}if(!o.support.opacity&&G=="opacity"){if(L){J.zoom=1;J.filter=(J.filter||"").replace(/alpha\([^)]*\)/,"")+(parseInt(K)+""=="NaN"?"":"alpha(opacity="+K*100+")")}return J.filter&&J.filter.indexOf("opacity=")>=0?(parseFloat(J.filter.match(/opacity=([^)]*)/)[1])/100)+"":""}G=G.replace(/-([a-z])/ig,function(M,N){return N.toUpperCase()});if(L){J[G]=K}return J[G]},trim:function(E){return(E||"").replace(/^\s+|\s+$/g,"")},makeArray:function(G){var E=[];if(G!=null){var F=G.length;if(F==null||typeof G==="string"||o.isFunction(G)||G.setInterval){E[0]=G}else{while(F){E[--F]=G[F]}}}return E},inArray:function(G,H){for(var E=0,F=H.length;E<F;E++){if(H[E]===G){return E}}return -1},merge:function(H,E){var F=0,G,I=H.length;if(!o.support.getAll){while((G=E[F++])!=null){if(G.nodeType!=8){H[I++]=G}}}else{while((G=E[F++])!=null){H[I++]=G}}return H},unique:function(K){var F=[],E={};try{for(var G=0,H=K.length;G<H;G++){var J=o.data(K[G]);if(!E[J]){E[J]=true;F.push(K[G])}}}catch(I){F=K}return F},grep:function(F,J,E){var G=[];for(var H=0,I=F.length;H<I;H++){if(!E!=!J(F[H],H)){G.push(F[H])}}return G},map:function(E,J){var F=[];for(var G=0,H=E.length;G<H;G++){var I=J(E[G],G);if(I!=null){F[F.length]=I}}return F.concat.apply([],F)}});var C=navigator.userAgent.toLowerCase();o.browser={version:(C.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/)||[0,"0"])[1],safari:/webkit/.test(C),opera:/opera/.test(C),msie:/msie/.test(C)&&!/opera/.test(C),mozilla:/mozilla/.test(C)&&!/(compatible|webkit)/.test(C)};o.each({parent:function(E){return E.parentNode},parents:function(E){return o.dir(E,"parentNode")},next:function(E){return o.nth(E,2,"nextSibling")},prev:function(E){return o.nth(E,2,"previousSibling")},nextAll:function(E){return o.dir(E,"nextSibling")},prevAll:function(E){return o.dir(E,"previousSibling")},siblings:function(E){return o.sibling(E.parentNode.firstChild,E)},children:function(E){return o.sibling(E.firstChild)},contents:function(E){return o.nodeName(E,"iframe")?E.contentDocument||E.contentWindow.document:o.makeArray(E.childNodes)}},function(E,F){o.fn[E]=function(G){var H=o.map(this,F);if(G&&typeof G=="string"){H=o.multiFilter(G,H)}return this.pushStack(o.unique(H),E,G)}});o.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(E,F){o.fn[E]=function(G){var J=[],L=o(G);for(var K=0,H=L.length;K<H;K++){var I=(K>0?this.clone(true):this).get();o.fn[F].apply(o(L[K]),I);J=J.concat(I)}return this.pushStack(J,E,G)}});o.each({removeAttr:function(E){o.attr(this,E,"");if(this.nodeType==1){this.removeAttribute(E)}},addClass:function(E){o.className.add(this,E)},removeClass:function(E){o.className.remove(this,E)},toggleClass:function(F,E){if(typeof E!=="boolean"){E=!o.className.has(this,F)}o.className[E?"add":"remove"](this,F)},remove:function(E){if(!E||o.filter(E,[this]).length){o("*",this).add([this]).each(function(){o.event.remove(this);o.removeData(this)});if(this.parentNode){this.parentNode.removeChild(this)}}},empty:function(){o(this).children().remove();while(this.firstChild){this.removeChild(this.firstChild)}}},function(E,F){o.fn[E]=function(){return this.each(F,arguments)}});function j(E,F){return E[0]&&parseInt(o.curCSS(E[0],F,true),10)||0}var h="jQuery"+e(),v=0,A={};o.extend({cache:{},data:function(F,E,G){F=F==l?A:F;var H=F[h];if(!H){H=F[h]=++v}if(E&&!o.cache[H]){o.cache[H]={}}if(G!==g){o.cache[H][E]=G}return E?o.cache[H][E]:H},removeData:function(F,E){F=F==l?A:F;var H=F[h];if(E){if(o.cache[H]){delete o.cache[H][E];E="";for(E in o.cache[H]){break}if(!E){o.removeData(F)}}}else{try{delete F[h]}catch(G){if(F.removeAttribute){F.removeAttribute(h)}}delete o.cache[H]}},queue:function(F,E,H){if(F){E=(E||"fx")+"queue";var G=o.data(F,E);if(!G||o.isArray(H)){G=o.data(F,E,o.makeArray(H))}else{if(H){G.push(H)}}}return G},dequeue:function(H,G){var E=o.queue(H,G),F=E.shift();if(!G||G==="fx"){F=E[0]}if(F!==g){F.call(H)}}});o.fn.extend({data:function(E,G){var H=E.split(".");H[1]=H[1]?"."+H[1]:"";if(G===g){var F=this.triggerHandler("getData"+H[1]+"!",[H[0]]);if(F===g&&this.length){F=o.data(this[0],E)}return F===g&&H[1]?this.data(H[0]):F}else{return this.trigger("setData"+H[1]+"!",[H[0],G]).each(function(){o.data(this,E,G)})}},removeData:function(E){return this.each(function(){o.removeData(this,E)})},queue:function(E,F){if(typeof E!=="string"){F=E;E="fx"}if(F===g){return o.queue(this[0],E)}return this.each(function(){var G=o.queue(this,E,F);if(E=="fx"&&G.length==1){G[0].call(this)}})},dequeue:function(E){return this.each(function(){o.dequeue(this,E)})}});
/*
 * Sizzle CSS Selector Engine - v0.9.3
 *  Copyright 2009, The Dojo Foundation
 *  Released under the MIT, BSD, and GPL Licenses.
 *  More information: http://sizzlejs.com/
 */
(function(){var R=/((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^[\]]*\]|['"][^'"]*['"]|[^[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?/g,L=0,H=Object.prototype.toString;var F=function(Y,U,ab,ac){ab=ab||[];U=U||document;if(U.nodeType!==1&&U.nodeType!==9){return[]}if(!Y||typeof Y!=="string"){return ab}var Z=[],W,af,ai,T,ad,V,X=true;R.lastIndex=0;while((W=R.exec(Y))!==null){Z.push(W[1]);if(W[2]){V=RegExp.rightContext;break}}if(Z.length>1&&M.exec(Y)){if(Z.length===2&&I.relative[Z[0]]){af=J(Z[0]+Z[1],U)}else{af=I.relative[Z[0]]?[U]:F(Z.shift(),U);while(Z.length){Y=Z.shift();if(I.relative[Y]){Y+=Z.shift()}af=J(Y,af)}}}else{var ae=ac?{expr:Z.pop(),set:E(ac)}:F.find(Z.pop(),Z.length===1&&U.parentNode?U.parentNode:U,Q(U));af=F.filter(ae.expr,ae.set);if(Z.length>0){ai=E(af)}else{X=false}while(Z.length){var ah=Z.pop(),ag=ah;if(!I.relative[ah]){ah=""}else{ag=Z.pop()}if(ag==null){ag=U}I.relative[ah](ai,ag,Q(U))}}if(!ai){ai=af}if(!ai){throw"Syntax error, unrecognized expression: "+(ah||Y)}if(H.call(ai)==="[object Array]"){if(!X){ab.push.apply(ab,ai)}else{if(U.nodeType===1){for(var aa=0;ai[aa]!=null;aa++){if(ai[aa]&&(ai[aa]===true||ai[aa].nodeType===1&&K(U,ai[aa]))){ab.push(af[aa])}}}else{for(var aa=0;ai[aa]!=null;aa++){if(ai[aa]&&ai[aa].nodeType===1){ab.push(af[aa])}}}}}else{E(ai,ab)}if(V){F(V,U,ab,ac);if(G){hasDuplicate=false;ab.sort(G);if(hasDuplicate){for(var aa=1;aa<ab.length;aa++){if(ab[aa]===ab[aa-1]){ab.splice(aa--,1)}}}}}return ab};F.matches=function(T,U){return F(T,null,null,U)};F.find=function(aa,T,ab){var Z,X;if(!aa){return[]}for(var W=0,V=I.order.length;W<V;W++){var Y=I.order[W],X;if((X=I.match[Y].exec(aa))){var U=RegExp.leftContext;if(U.substr(U.length-1)!=="\\"){X[1]=(X[1]||"").replace(/\\/g,"");Z=I.find[Y](X,T,ab);if(Z!=null){aa=aa.replace(I.match[Y],"");break}}}}if(!Z){Z=T.getElementsByTagName("*")}return{set:Z,expr:aa}};F.filter=function(ad,ac,ag,W){var V=ad,ai=[],aa=ac,Y,T,Z=ac&&ac[0]&&Q(ac[0]);while(ad&&ac.length){for(var ab in I.filter){if((Y=I.match[ab].exec(ad))!=null){var U=I.filter[ab],ah,af;T=false;if(aa==ai){ai=[]}if(I.preFilter[ab]){Y=I.preFilter[ab](Y,aa,ag,ai,W,Z);if(!Y){T=ah=true}else{if(Y===true){continue}}}if(Y){for(var X=0;(af=aa[X])!=null;X++){if(af){ah=U(af,Y,X,aa);var ae=W^!!ah;if(ag&&ah!=null){if(ae){T=true}else{aa[X]=false}}else{if(ae){ai.push(af);T=true}}}}}if(ah!==g){if(!ag){aa=ai}ad=ad.replace(I.match[ab],"");if(!T){return[]}break}}}if(ad==V){if(T==null){throw"Syntax error, unrecognized expression: "+ad}else{break}}V=ad}return aa};var I=F.selectors={order:["ID","NAME","TAG"],match:{ID:/#((?:[\w\u00c0-\uFFFF_-]|\\.)+)/,CLASS:/\.((?:[\w\u00c0-\uFFFF_-]|\\.)+)/,NAME:/\[name=['"]*((?:[\w\u00c0-\uFFFF_-]|\\.)+)['"]*\]/,ATTR:/\[\s*((?:[\w\u00c0-\uFFFF_-]|\\.)+)\s*(?:(\S?=)\s*(['"]*)(.*?)\3|)\s*\]/,TAG:/^((?:[\w\u00c0-\uFFFF\*_-]|\\.)+)/,CHILD:/:(only|nth|last|first)-child(?:\((even|odd|[\dn+-]*)\))?/,POS:/:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^-]|$)/,PSEUDO:/:((?:[\w\u00c0-\uFFFF_-]|\\.)+)(?:\((['"]*)((?:\([^\)]+\)|[^\2\(\)]*)+)\2\))?/},attrMap:{"class":"className","for":"htmlFor"},attrHandle:{href:function(T){return T.getAttribute("href")}},relative:{"+":function(aa,T,Z){var X=typeof T==="string",ab=X&&!/\W/.test(T),Y=X&&!ab;if(ab&&!Z){T=T.toUpperCase()}for(var W=0,V=aa.length,U;W<V;W++){if((U=aa[W])){while((U=U.previousSibling)&&U.nodeType!==1){}aa[W]=Y||U&&U.nodeName===T?U||false:U===T}}if(Y){F.filter(T,aa,true)}},">":function(Z,U,aa){var X=typeof U==="string";if(X&&!/\W/.test(U)){U=aa?U:U.toUpperCase();for(var V=0,T=Z.length;V<T;V++){var Y=Z[V];if(Y){var W=Y.parentNode;Z[V]=W.nodeName===U?W:false}}}else{for(var V=0,T=Z.length;V<T;V++){var Y=Z[V];if(Y){Z[V]=X?Y.parentNode:Y.parentNode===U}}if(X){F.filter(U,Z,true)}}},"":function(W,U,Y){var V=L++,T=S;if(!U.match(/\W/)){var X=U=Y?U:U.toUpperCase();T=P}T("parentNode",U,V,W,X,Y)},"~":function(W,U,Y){var V=L++,T=S;if(typeof U==="string"&&!U.match(/\W/)){var X=U=Y?U:U.toUpperCase();T=P}T("previousSibling",U,V,W,X,Y)}},find:{ID:function(U,V,W){if(typeof V.getElementById!=="undefined"&&!W){var T=V.getElementById(U[1]);return T?[T]:[]}},NAME:function(V,Y,Z){if(typeof Y.getElementsByName!=="undefined"){var U=[],X=Y.getElementsByName(V[1]);for(var W=0,T=X.length;W<T;W++){if(X[W].getAttribute("name")===V[1]){U.push(X[W])}}return U.length===0?null:U}},TAG:function(T,U){return U.getElementsByTagName(T[1])}},preFilter:{CLASS:function(W,U,V,T,Z,aa){W=" "+W[1].replace(/\\/g,"")+" ";if(aa){return W}for(var X=0,Y;(Y=U[X])!=null;X++){if(Y){if(Z^(Y.className&&(" "+Y.className+" ").indexOf(W)>=0)){if(!V){T.push(Y)}}else{if(V){U[X]=false}}}}return false},ID:function(T){return T[1].replace(/\\/g,"")},TAG:function(U,T){for(var V=0;T[V]===false;V++){}return T[V]&&Q(T[V])?U[1]:U[1].toUpperCase()},CHILD:function(T){if(T[1]=="nth"){var U=/(-?)(\d*)n((?:\+|-)?\d*)/.exec(T[2]=="even"&&"2n"||T[2]=="odd"&&"2n+1"||!/\D/.test(T[2])&&"0n+"+T[2]||T[2]);T[2]=(U[1]+(U[2]||1))-0;T[3]=U[3]-0}T[0]=L++;return T},ATTR:function(X,U,V,T,Y,Z){var W=X[1].replace(/\\/g,"");if(!Z&&I.attrMap[W]){X[1]=I.attrMap[W]}if(X[2]==="~="){X[4]=" "+X[4]+" "}return X},PSEUDO:function(X,U,V,T,Y){if(X[1]==="not"){if(X[3].match(R).length>1||/^\w/.test(X[3])){X[3]=F(X[3],null,null,U)}else{var W=F.filter(X[3],U,V,true^Y);if(!V){T.push.apply(T,W)}return false}}else{if(I.match.POS.test(X[0])||I.match.CHILD.test(X[0])){return true}}return X},POS:function(T){T.unshift(true);return T}},filters:{enabled:function(T){return T.disabled===false&&T.type!=="hidden"},disabled:function(T){return T.disabled===true},checked:function(T){return T.checked===true},selected:function(T){T.parentNode.selectedIndex;return T.selected===true},parent:function(T){return !!T.firstChild},empty:function(T){return !T.firstChild},has:function(V,U,T){return !!F(T[3],V).length},header:function(T){return/h\d/i.test(T.nodeName)},text:function(T){return"text"===T.type},radio:function(T){return"radio"===T.type},checkbox:function(T){return"checkbox"===T.type},file:function(T){return"file"===T.type},password:function(T){return"password"===T.type},submit:function(T){return"submit"===T.type},image:function(T){return"image"===T.type},reset:function(T){return"reset"===T.type},button:function(T){return"button"===T.type||T.nodeName.toUpperCase()==="BUTTON"},input:function(T){return/input|select|textarea|button/i.test(T.nodeName)}},setFilters:{first:function(U,T){return T===0},last:function(V,U,T,W){return U===W.length-1},even:function(U,T){return T%2===0},odd:function(U,T){return T%2===1},lt:function(V,U,T){return U<T[3]-0},gt:function(V,U,T){return U>T[3]-0},nth:function(V,U,T){return T[3]-0==U},eq:function(V,U,T){return T[3]-0==U}},filter:{PSEUDO:function(Z,V,W,aa){var U=V[1],X=I.filters[U];if(X){return X(Z,W,V,aa)}else{if(U==="contains"){return(Z.textContent||Z.innerText||"").indexOf(V[3])>=0}else{if(U==="not"){var Y=V[3];for(var W=0,T=Y.length;W<T;W++){if(Y[W]===Z){return false}}return true}}}},CHILD:function(T,W){var Z=W[1],U=T;switch(Z){case"only":case"first":while(U=U.previousSibling){if(U.nodeType===1){return false}}if(Z=="first"){return true}U=T;case"last":while(U=U.nextSibling){if(U.nodeType===1){return false}}return true;case"nth":var V=W[2],ac=W[3];if(V==1&&ac==0){return true}var Y=W[0],ab=T.parentNode;if(ab&&(ab.sizcache!==Y||!T.nodeIndex)){var X=0;for(U=ab.firstChild;U;U=U.nextSibling){if(U.nodeType===1){U.nodeIndex=++X}}ab.sizcache=Y}var aa=T.nodeIndex-ac;if(V==0){return aa==0}else{return(aa%V==0&&aa/V>=0)}}},ID:function(U,T){return U.nodeType===1&&U.getAttribute("id")===T},TAG:function(U,T){return(T==="*"&&U.nodeType===1)||U.nodeName===T},CLASS:function(U,T){return(" "+(U.className||U.getAttribute("class"))+" ").indexOf(T)>-1},ATTR:function(Y,W){var V=W[1],T=I.attrHandle[V]?I.attrHandle[V](Y):Y[V]!=null?Y[V]:Y.getAttribute(V),Z=T+"",X=W[2],U=W[4];return T==null?X==="!=":X==="="?Z===U:X==="*="?Z.indexOf(U)>=0:X==="~="?(" "+Z+" ").indexOf(U)>=0:!U?Z&&T!==false:X==="!="?Z!=U:X==="^="?Z.indexOf(U)===0:X==="$="?Z.substr(Z.length-U.length)===U:X==="|="?Z===U||Z.substr(0,U.length+1)===U+"-":false},POS:function(X,U,V,Y){var T=U[2],W=I.setFilters[T];if(W){return W(X,V,U,Y)}}}};var M=I.match.POS;for(var O in I.match){I.match[O]=RegExp(I.match[O].source+/(?![^\[]*\])(?![^\(]*\))/.source)}var E=function(U,T){U=Array.prototype.slice.call(U);if(T){T.push.apply(T,U);return T}return U};try{Array.prototype.slice.call(document.documentElement.childNodes)}catch(N){E=function(X,W){var U=W||[];if(H.call(X)==="[object Array]"){Array.prototype.push.apply(U,X)}else{if(typeof X.length==="number"){for(var V=0,T=X.length;V<T;V++){U.push(X[V])}}else{for(var V=0;X[V];V++){U.push(X[V])}}}return U}}var G;if(document.documentElement.compareDocumentPosition){G=function(U,T){var V=U.compareDocumentPosition(T)&4?-1:U===T?0:1;if(V===0){hasDuplicate=true}return V}}else{if("sourceIndex" in document.documentElement){G=function(U,T){var V=U.sourceIndex-T.sourceIndex;if(V===0){hasDuplicate=true}return V}}else{if(document.createRange){G=function(W,U){var V=W.ownerDocument.createRange(),T=U.ownerDocument.createRange();V.selectNode(W);V.collapse(true);T.selectNode(U);T.collapse(true);var X=V.compareBoundaryPoints(Range.START_TO_END,T);if(X===0){hasDuplicate=true}return X}}}}(function(){var U=document.createElement("form"),V="script"+(new Date).getTime();U.innerHTML="<input name='"+V+"'/>";var T=document.documentElement;T.insertBefore(U,T.firstChild);if(!!document.getElementById(V)){I.find.ID=function(X,Y,Z){if(typeof Y.getElementById!=="undefined"&&!Z){var W=Y.getElementById(X[1]);return W?W.id===X[1]||typeof W.getAttributeNode!=="undefined"&&W.getAttributeNode("id").nodeValue===X[1]?[W]:g:[]}};I.filter.ID=function(Y,W){var X=typeof Y.getAttributeNode!=="undefined"&&Y.getAttributeNode("id");return Y.nodeType===1&&X&&X.nodeValue===W}}T.removeChild(U)})();(function(){var T=document.createElement("div");T.appendChild(document.createComment(""));if(T.getElementsByTagName("*").length>0){I.find.TAG=function(U,Y){var X=Y.getElementsByTagName(U[1]);if(U[1]==="*"){var W=[];for(var V=0;X[V];V++){if(X[V].nodeType===1){W.push(X[V])}}X=W}return X}}T.innerHTML="<a href='#'></a>";if(T.firstChild&&typeof T.firstChild.getAttribute!=="undefined"&&T.firstChild.getAttribute("href")!=="#"){I.attrHandle.href=function(U){return U.getAttribute("href",2)}}})();if(document.querySelectorAll){(function(){var T=F,U=document.createElement("div");U.innerHTML="<p class='TEST'></p>";if(U.querySelectorAll&&U.querySelectorAll(".TEST").length===0){return}F=function(Y,X,V,W){X=X||document;if(!W&&X.nodeType===9&&!Q(X)){try{return E(X.querySelectorAll(Y),V)}catch(Z){}}return T(Y,X,V,W)};F.find=T.find;F.filter=T.filter;F.selectors=T.selectors;F.matches=T.matches})()}if(document.getElementsByClassName&&document.documentElement.getElementsByClassName){(function(){var T=document.createElement("div");T.innerHTML="<div class='test e'></div><div class='test'></div>";if(T.getElementsByClassName("e").length===0){return}T.lastChild.className="e";if(T.getElementsByClassName("e").length===1){return}I.order.splice(1,0,"CLASS");I.find.CLASS=function(U,V,W){if(typeof V.getElementsByClassName!=="undefined"&&!W){return V.getElementsByClassName(U[1])}}})()}function P(U,Z,Y,ad,aa,ac){var ab=U=="previousSibling"&&!ac;for(var W=0,V=ad.length;W<V;W++){var T=ad[W];if(T){if(ab&&T.nodeType===1){T.sizcache=Y;T.sizset=W}T=T[U];var X=false;while(T){if(T.sizcache===Y){X=ad[T.sizset];break}if(T.nodeType===1&&!ac){T.sizcache=Y;T.sizset=W}if(T.nodeName===Z){X=T;break}T=T[U]}ad[W]=X}}}function S(U,Z,Y,ad,aa,ac){var ab=U=="previousSibling"&&!ac;for(var W=0,V=ad.length;W<V;W++){var T=ad[W];if(T){if(ab&&T.nodeType===1){T.sizcache=Y;T.sizset=W}T=T[U];var X=false;while(T){if(T.sizcache===Y){X=ad[T.sizset];break}if(T.nodeType===1){if(!ac){T.sizcache=Y;T.sizset=W}if(typeof Z!=="string"){if(T===Z){X=true;break}}else{if(F.filter(Z,[T]).length>0){X=T;break}}}T=T[U]}ad[W]=X}}}var K=document.compareDocumentPosition?function(U,T){return U.compareDocumentPosition(T)&16}:function(U,T){return U!==T&&(U.contains?U.contains(T):true)};var Q=function(T){return T.nodeType===9&&T.documentElement.nodeName!=="HTML"||!!T.ownerDocument&&Q(T.ownerDocument)};var J=function(T,aa){var W=[],X="",Y,V=aa.nodeType?[aa]:aa;while((Y=I.match.PSEUDO.exec(T))){X+=Y[0];T=T.replace(I.match.PSEUDO,"")}T=I.relative[T]?T+"*":T;for(var Z=0,U=V.length;Z<U;Z++){F(T,V[Z],W)}return F.filter(X,W)};o.find=F;o.filter=F.filter;o.expr=F.selectors;o.expr[":"]=o.expr.filters;F.selectors.filters.hidden=function(T){return T.offsetWidth===0||T.offsetHeight===0};F.selectors.filters.visible=function(T){return T.offsetWidth>0||T.offsetHeight>0};F.selectors.filters.animated=function(T){return o.grep(o.timers,function(U){return T===U.elem}).length};o.multiFilter=function(V,T,U){if(U){V=":not("+V+")"}return F.matches(V,T)};o.dir=function(V,U){var T=[],W=V[U];while(W&&W!=document){if(W.nodeType==1){T.push(W)}W=W[U]}return T};o.nth=function(X,T,V,W){T=T||1;var U=0;for(;X;X=X[V]){if(X.nodeType==1&&++U==T){break}}return X};o.sibling=function(V,U){var T=[];for(;V;V=V.nextSibling){if(V.nodeType==1&&V!=U){T.push(V)}}return T};return;l.Sizzle=F})();o.event={add:function(I,F,H,K){if(I.nodeType==3||I.nodeType==8){return}if(I.setInterval&&I!=l){I=l}if(!H.guid){H.guid=this.guid++}if(K!==g){var G=H;H=this.proxy(G);H.data=K}var E=o.data(I,"events")||o.data(I,"events",{}),J=o.data(I,"handle")||o.data(I,"handle",function(){return typeof o!=="undefined"&&!o.event.triggered?o.event.handle.apply(arguments.callee.elem,arguments):g});J.elem=I;o.each(F.split(/\s+/),function(M,N){var O=N.split(".");N=O.shift();H.type=O.slice().sort().join(".");var L=E[N];if(o.event.specialAll[N]){o.event.specialAll[N].setup.call(I,K,O)}if(!L){L=E[N]={};if(!o.event.special[N]||o.event.special[N].setup.call(I,K,O)===false){if(I.addEventListener){I.addEventListener(N,J,false)}else{if(I.attachEvent){I.attachEvent("on"+N,J)}}}}L[H.guid]=H;o.event.global[N]=true});I=null},guid:1,global:{},remove:function(K,H,J){if(K.nodeType==3||K.nodeType==8){return}var G=o.data(K,"events"),F,E;if(G){if(H===g||(typeof H==="string"&&H.charAt(0)==".")){for(var I in G){this.remove(K,I+(H||""))}}else{if(H.type){J=H.handler;H=H.type}o.each(H.split(/\s+/),function(M,O){var Q=O.split(".");O=Q.shift();var N=RegExp("(^|\\.)"+Q.slice().sort().join(".*\\.")+"(\\.|$)");if(G[O]){if(J){delete G[O][J.guid]}else{for(var P in G[O]){if(N.test(G[O][P].type)){delete G[O][P]}}}if(o.event.specialAll[O]){o.event.specialAll[O].teardown.call(K,Q)}for(F in G[O]){break}if(!F){if(!o.event.special[O]||o.event.special[O].teardown.call(K,Q)===false){if(K.removeEventListener){K.removeEventListener(O,o.data(K,"handle"),false)}else{if(K.detachEvent){K.detachEvent("on"+O,o.data(K,"handle"))}}}F=null;delete G[O]}}})}for(F in G){break}if(!F){var L=o.data(K,"handle");if(L){L.elem=null}o.removeData(K,"events");o.removeData(K,"handle")}}},trigger:function(I,K,H,E){var G=I.type||I;if(!E){I=typeof I==="object"?I[h]?I:o.extend(o.Event(G),I):o.Event(G);if(G.indexOf("!")>=0){I.type=G=G.slice(0,-1);I.exclusive=true}if(!H){I.stopPropagation();if(this.global[G]){o.each(o.cache,function(){if(this.events&&this.events[G]){o.event.trigger(I,K,this.handle.elem)}})}}if(!H||H.nodeType==3||H.nodeType==8){return g}I.result=g;I.target=H;K=o.makeArray(K);K.unshift(I)}I.currentTarget=H;var J=o.data(H,"handle");if(J){J.apply(H,K)}if((!H[G]||(o.nodeName(H,"a")&&G=="click"))&&H["on"+G]&&H["on"+G].apply(H,K)===false){I.result=false}if(!E&&H[G]&&!I.isDefaultPrevented()&&!(o.nodeName(H,"a")&&G=="click")){this.triggered=true;try{H[G]()}catch(L){}}this.triggered=false;if(!I.isPropagationStopped()){var F=H.parentNode||H.ownerDocument;if(F){o.event.trigger(I,K,F,true)}}},handle:function(K){var J,E;K=arguments[0]=o.event.fix(K||l.event);K.currentTarget=this;var L=K.type.split(".");K.type=L.shift();J=!L.length&&!K.exclusive;var I=RegExp("(^|\\.)"+L.slice().sort().join(".*\\.")+"(\\.|$)");E=(o.data(this,"events")||{})[K.type];for(var G in E){var H=E[G];if(J||I.test(H.type)){K.handler=H;K.data=H.data;var F=H.apply(this,arguments);if(F!==g){K.result=F;if(F===false){K.preventDefault();K.stopPropagation()}}if(K.isImmediatePropagationStopped()){break}}}},props:"altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode metaKey newValue originalTarget pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target toElement view wheelDelta which".split(" "),fix:function(H){if(H[h]){return H}var F=H;H=o.Event(F);for(var G=this.props.length,J;G;){J=this.props[--G];H[J]=F[J]}if(!H.target){H.target=H.srcElement||document}if(H.target.nodeType==3){H.target=H.target.parentNode}if(!H.relatedTarget&&H.fromElement){H.relatedTarget=H.fromElement==H.target?H.toElement:H.fromElement}if(H.pageX==null&&H.clientX!=null){var I=document.documentElement,E=document.body;H.pageX=H.clientX+(I&&I.scrollLeft||E&&E.scrollLeft||0)-(I.clientLeft||0);H.pageY=H.clientY+(I&&I.scrollTop||E&&E.scrollTop||0)-(I.clientTop||0)}if(!H.which&&((H.charCode||H.charCode===0)?H.charCode:H.keyCode)){H.which=H.charCode||H.keyCode}if(!H.metaKey&&H.ctrlKey){H.metaKey=H.ctrlKey}if(!H.which&&H.button){H.which=(H.button&1?1:(H.button&2?3:(H.button&4?2:0)))}return H},proxy:function(F,E){E=E||function(){return F.apply(this,arguments)};E.guid=F.guid=F.guid||E.guid||this.guid++;return E},special:{ready:{setup:B,teardown:function(){}}},specialAll:{live:{setup:function(E,F){o.event.add(this,F[0],c)},teardown:function(G){if(G.length){var E=0,F=RegExp("(^|\\.)"+G[0]+"(\\.|$)");o.each((o.data(this,"events").live||{}),function(){if(F.test(this.type)){E++}});if(E<1){o.event.remove(this,G[0],c)}}}}}};o.Event=function(E){if(!this.preventDefault){return new o.Event(E)}if(E&&E.type){this.originalEvent=E;this.type=E.type}else{this.type=E}this.timeStamp=e();this[h]=true};function k(){return false}function u(){return true}o.Event.prototype={preventDefault:function(){this.isDefaultPrevented=u;var E=this.originalEvent;if(!E){return}if(E.preventDefault){E.preventDefault()}E.returnValue=false},stopPropagation:function(){this.isPropagationStopped=u;var E=this.originalEvent;if(!E){return}if(E.stopPropagation){E.stopPropagation()}E.cancelBubble=true},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=u;this.stopPropagation()},isDefaultPrevented:k,isPropagationStopped:k,isImmediatePropagationStopped:k};var a=function(F){var E=F.relatedTarget;while(E&&E!=this){try{E=E.parentNode}catch(G){E=this}}if(E!=this){F.type=F.data;o.event.handle.apply(this,arguments)}};o.each({mouseover:"mouseenter",mouseout:"mouseleave"},function(F,E){o.event.special[E]={setup:function(){o.event.add(this,F,a,E)},teardown:function(){o.event.remove(this,F,a)}}});o.fn.extend({bind:function(F,G,E){return F=="unload"?this.one(F,G,E):this.each(function(){o.event.add(this,F,E||G,E&&G)})},one:function(G,H,F){var E=o.event.proxy(F||H,function(I){o(this).unbind(I,E);return(F||H).apply(this,arguments)});return this.each(function(){o.event.add(this,G,E,F&&H)})},unbind:function(F,E){return this.each(function(){o.event.remove(this,F,E)})},trigger:function(E,F){return this.each(function(){o.event.trigger(E,F,this)})},triggerHandler:function(E,G){if(this[0]){var F=o.Event(E);F.preventDefault();F.stopPropagation();o.event.trigger(F,G,this[0]);return F.result}},toggle:function(G){var E=arguments,F=1;while(F<E.length){o.event.proxy(G,E[F++])}return this.click(o.event.proxy(G,function(H){this.lastToggle=(this.lastToggle||0)%F;H.preventDefault();return E[this.lastToggle++].apply(this,arguments)||false}))},hover:function(E,F){return this.mouseenter(E).mouseleave(F)},ready:function(E){B();if(o.isReady){E.call(document,o)}else{o.readyList.push(E)}return this},live:function(G,F){var E=o.event.proxy(F);E.guid+=this.selector+G;o(document).bind(i(G,this.selector),this.selector,E);return this},die:function(F,E){o(document).unbind(i(F,this.selector),E?{guid:E.guid+this.selector+F}:null);return this}});function c(H){var E=RegExp("(^|\\.)"+H.type+"(\\.|$)"),G=true,F=[];o.each(o.data(this,"events").live||[],function(I,J){if(E.test(J.type)){var K=o(H.target).closest(J.data)[0];if(K){F.push({elem:K,fn:J})}}});F.sort(function(J,I){return o.data(J.elem,"closest")-o.data(I.elem,"closest")});o.each(F,function(){if(this.fn.call(this.elem,H,this.fn.data)===false){return(G=false)}});return G}function i(F,E){return["live",F,E.replace(/\./g,"`").replace(/ /g,"|")].join(".")}o.extend({isReady:false,readyList:[],ready:function(){if(!o.isReady){o.isReady=true;if(o.readyList){o.each(o.readyList,function(){this.call(document,o)});o.readyList=null}o(document).triggerHandler("ready")}}});var x=false;function B(){if(x){return}x=true;if(document.addEventListener){document.addEventListener("DOMContentLoaded",function(){document.removeEventListener("DOMContentLoaded",arguments.callee,false);o.ready()},false)}else{if(document.attachEvent){document.attachEvent("onreadystatechange",function(){if(document.readyState==="complete"){document.detachEvent("onreadystatechange",arguments.callee);o.ready()}});if(document.documentElement.doScroll&&l==l.top){(function(){if(o.isReady){return}try{document.documentElement.doScroll("left")}catch(E){setTimeout(arguments.callee,0);return}o.ready()})()}}}o.event.add(l,"load",o.ready)}o.each(("blur,focus,load,resize,scroll,unload,click,dblclick,mousedown,mouseup,mousemove,mouseover,mouseout,mouseenter,mouseleave,change,select,submit,keydown,keypress,keyup,error").split(","),function(F,E){o.fn[E]=function(G){return G?this.bind(E,G):this.trigger(E)}});o(l).bind("unload",function(){for(var E in o.cache){if(E!=1&&o.cache[E].handle){o.event.remove(o.cache[E].handle.elem)}}});(function(){o.support={};var F=document.documentElement,G=document.createElement("script"),K=document.createElement("div"),J="script"+(new Date).getTime();K.style.display="none";K.innerHTML='   <link/><table></table><a href="/a" style="color:red;float:left;opacity:.5;">a</a><select><option>text</option></select><object><param/></object>';var H=K.getElementsByTagName("*"),E=K.getElementsByTagName("a")[0];if(!H||!H.length||!E){return}o.support={leadingWhitespace:K.firstChild.nodeType==3,tbody:!K.getElementsByTagName("tbody").length,objectAll:!!K.getElementsByTagName("object")[0].getElementsByTagName("*").length,htmlSerialize:!!K.getElementsByTagName("link").length,style:/red/.test(E.getAttribute("style")),hrefNormalized:E.getAttribute("href")==="/a",opacity:E.style.opacity==="0.5",cssFloat:!!E.style.cssFloat,scriptEval:false,noCloneEvent:true,boxModel:null};G.type="text/javascript";try{G.appendChild(document.createTextNode("window."+J+"=1;"))}catch(I){}F.insertBefore(G,F.firstChild);if(l[J]){o.support.scriptEval=true;delete l[J]}F.removeChild(G);if(K.attachEvent&&K.fireEvent){K.attachEvent("onclick",function(){o.support.noCloneEvent=false;K.detachEvent("onclick",arguments.callee)});K.cloneNode(true).fireEvent("onclick")}o(function(){var L=document.createElement("div");L.style.width=L.style.paddingLeft="1px";document.body.appendChild(L);o.boxModel=o.support.boxModel=L.offsetWidth===2;document.body.removeChild(L).style.display="none"})})();var w=o.support.cssFloat?"cssFloat":"styleFloat";o.props={"for":"htmlFor","class":"className","float":w,cssFloat:w,styleFloat:w,readonly:"readOnly",maxlength:"maxLength",cellspacing:"cellSpacing",rowspan:"rowSpan",tabindex:"tabIndex"};o.fn.extend({_load:o.fn.load,load:function(G,J,K){if(typeof G!=="string"){return this._load(G)}var I=G.indexOf(" ");if(I>=0){var E=G.slice(I,G.length);G=G.slice(0,I)}var H="GET";if(J){if(o.isFunction(J)){K=J;J=null}else{if(typeof J==="object"){J=o.param(J);H="POST"}}}var F=this;o.ajax({url:G,type:H,dataType:"html",data:J,complete:function(M,L){if(L=="success"||L=="notmodified"){F.html(E?o("<div/>").append(M.responseText.replace(/<script(.|\s)*?\/script>/g,"")).find(E):M.responseText)}if(K){F.each(K,[M.responseText,L,M])}}});return this},serialize:function(){return o.param(this.serializeArray())},serializeArray:function(){return this.map(function(){return this.elements?o.makeArray(this.elements):this}).filter(function(){return this.name&&!this.disabled&&(this.checked||/select|textarea/i.test(this.nodeName)||/text|hidden|password|search/i.test(this.type))}).map(function(E,F){var G=o(this).val();return G==null?null:o.isArray(G)?o.map(G,function(I,H){return{name:F.name,value:I}}):{name:F.name,value:G}}).get()}});o.each("ajaxStart,ajaxStop,ajaxComplete,ajaxError,ajaxSuccess,ajaxSend".split(","),function(E,F){o.fn[F]=function(G){return this.bind(F,G)}});var r=e();o.extend({get:function(E,G,H,F){if(o.isFunction(G)){H=G;G=null}return o.ajax({type:"GET",url:E,data:G,success:H,dataType:F})},getScript:function(E,F){return o.get(E,null,F,"script")},getJSON:function(E,F,G){return o.get(E,F,G,"json")},post:function(E,G,H,F){if(o.isFunction(G)){H=G;G={}}return o.ajax({type:"POST",url:E,data:G,success:H,dataType:F})},ajaxSetup:function(E){o.extend(o.ajaxSettings,E)},ajaxSettings:{url:location.href,global:true,type:"GET",contentType:"application/x-www-form-urlencoded",processData:true,async:true,xhr:function(){return l.ActiveXObject?new ActiveXObject("Microsoft.XMLHTTP"):new XMLHttpRequest()},accepts:{xml:"application/xml, text/xml",html:"text/html",script:"text/javascript, application/javascript",json:"application/json, text/javascript",text:"text/plain",_default:"*/*"}},lastModified:{},ajax:function(M){M=o.extend(true,M,o.extend(true,{},o.ajaxSettings,M));var W,F=/=\?(&|$)/g,R,V,G=M.type.toUpperCase();if(M.data&&M.processData&&typeof M.data!=="string"){M.data=o.param(M.data)}if(M.dataType=="jsonp"){if(G=="GET"){if(!M.url.match(F)){M.url+=(M.url.match(/\?/)?"&":"?")+(M.jsonp||"callback")+"=?"}}else{if(!M.data||!M.data.match(F)){M.data=(M.data?M.data+"&":"")+(M.jsonp||"callback")+"=?"}}M.dataType="json"}if(M.dataType=="json"&&(M.data&&M.data.match(F)||M.url.match(F))){W="jsonp"+r++;if(M.data){M.data=(M.data+"").replace(F,"="+W+"$1")}M.url=M.url.replace(F,"="+W+"$1");M.dataType="script";l[W]=function(X){V=X;I();L();l[W]=g;try{delete l[W]}catch(Y){}if(H){H.removeChild(T)}}}if(M.dataType=="script"&&M.cache==null){M.cache=false}if(M.cache===false&&G=="GET"){var E=e();var U=M.url.replace(/(\?|&)_=.*?(&|$)/,"$1_="+E+"$2");M.url=U+((U==M.url)?(M.url.match(/\?/)?"&":"?")+"_="+E:"")}if(M.data&&G=="GET"){M.url+=(M.url.match(/\?/)?"&":"?")+M.data;M.data=null}if(M.global&&!o.active++){o.event.trigger("ajaxStart")}var Q=/^(\w+:)?\/\/([^\/?#]+)/.exec(M.url);if(M.dataType=="script"&&G=="GET"&&Q&&(Q[1]&&Q[1]!=location.protocol||Q[2]!=location.host)){var H=document.getElementsByTagName("head")[0];var T=document.createElement("script");T.src=M.url;if(M.scriptCharset){T.charset=M.scriptCharset}if(!W){var O=false;T.onload=T.onreadystatechange=function(){if(!O&&(!this.readyState||this.readyState=="loaded"||this.readyState=="complete")){O=true;I();L();T.onload=T.onreadystatechange=null;H.removeChild(T)}}}H.appendChild(T);return g}var K=false;var J=M.xhr();if(M.username){J.open(G,M.url,M.async,M.username,M.password)}else{J.open(G,M.url,M.async)}try{if(M.data){J.setRequestHeader("Content-Type",M.contentType)}if(M.ifModified){J.setRequestHeader("If-Modified-Since",o.lastModified[M.url]||"Thu, 01 Jan 1970 00:00:00 GMT")}J.setRequestHeader("X-Requested-With","XMLHttpRequest");J.setRequestHeader("Accept",M.dataType&&M.accepts[M.dataType]?M.accepts[M.dataType]+", */*":M.accepts._default)}catch(S){}if(M.beforeSend&&M.beforeSend(J,M)===false){if(M.global&&!--o.active){o.event.trigger("ajaxStop")}J.abort();return false}if(M.global){o.event.trigger("ajaxSend",[J,M])}var N=function(X){if(J.readyState==0){if(P){clearInterval(P);P=null;if(M.global&&!--o.active){o.event.trigger("ajaxStop")}}}else{if(!K&&J&&(J.readyState==4||X=="timeout")){K=true;if(P){clearInterval(P);P=null}R=X=="timeout"?"timeout":!o.httpSuccess(J)?"error":M.ifModified&&o.httpNotModified(J,M.url)?"notmodified":"success";if(R=="success"){try{V=o.httpData(J,M.dataType,M)}catch(Z){R="parsererror"}}if(R=="success"){var Y;try{Y=J.getResponseHeader("Last-Modified")}catch(Z){}if(M.ifModified&&Y){o.lastModified[M.url]=Y}if(!W){I()}}else{o.handleError(M,J,R)}L();if(X){J.abort()}if(M.async){J=null}}}};if(M.async){var P=setInterval(N,13);if(M.timeout>0){setTimeout(function(){if(J&&!K){N("timeout")}},M.timeout)}}try{J.send(M.data)}catch(S){o.handleError(M,J,null,S)}if(!M.async){N()}function I(){if(M.success){M.success(V,R)}if(M.global){o.event.trigger("ajaxSuccess",[J,M])}}function L(){if(M.complete){M.complete(J,R)}if(M.global){o.event.trigger("ajaxComplete",[J,M])}if(M.global&&!--o.active){o.event.trigger("ajaxStop")}}return J},handleError:function(F,H,E,G){if(F.error){F.error(H,E,G)}if(F.global){o.event.trigger("ajaxError",[H,F,G])}},active:0,httpSuccess:function(F){try{return !F.status&&location.protocol=="file:"||(F.status>=200&&F.status<300)||F.status==304||F.status==1223}catch(E){}return false},httpNotModified:function(G,E){try{var H=G.getResponseHeader("Last-Modified");return G.status==304||H==o.lastModified[E]}catch(F){}return false},httpData:function(J,H,G){var F=J.getResponseHeader("content-type"),E=H=="xml"||!H&&F&&F.indexOf("xml")>=0,I=E?J.responseXML:J.responseText;if(E&&I.documentElement.tagName=="parsererror"){throw"parsererror"}if(G&&G.dataFilter){I=G.dataFilter(I,H)}if(typeof I==="string"){if(H=="script"){o.globalEval(I)}if(H=="json"){I=l["eval"]("("+I+")")}}return I},param:function(E){var G=[];function H(I,J){G[G.length]=encodeURIComponent(I)+"="+encodeURIComponent(J)}if(o.isArray(E)||E.jquery){o.each(E,function(){H(this.name,this.value)})}else{for(var F in E){if(o.isArray(E[F])){o.each(E[F],function(){H(F,this)})}else{H(F,o.isFunction(E[F])?E[F]():E[F])}}}return G.join("&").replace(/%20/g,"+")}});var m={},n,d=[["height","marginTop","marginBottom","paddingTop","paddingBottom"],["width","marginLeft","marginRight","paddingLeft","paddingRight"],["opacity"]];function t(F,E){var G={};o.each(d.concat.apply([],d.slice(0,E)),function(){G[this]=F});return G}o.fn.extend({show:function(J,L){if(J){return this.animate(t("show",3),J,L)}else{for(var H=0,F=this.length;H<F;H++){var E=o.data(this[H],"olddisplay");this[H].style.display=E||"";if(o.css(this[H],"display")==="none"){var G=this[H].tagName,K;if(m[G]){K=m[G]}else{var I=o("<"+G+" />").appendTo("body");K=I.css("display");if(K==="none"){K="block"}I.remove();m[G]=K}o.data(this[H],"olddisplay",K)}}for(var H=0,F=this.length;H<F;H++){this[H].style.display=o.data(this[H],"olddisplay")||""}return this}},hide:function(H,I){if(H){return this.animate(t("hide",3),H,I)}else{for(var G=0,F=this.length;G<F;G++){var E=o.data(this[G],"olddisplay");if(!E&&E!=="none"){o.data(this[G],"olddisplay",o.css(this[G],"display"))}}for(var G=0,F=this.length;G<F;G++){this[G].style.display="none"}return this}},_toggle:o.fn.toggle,toggle:function(G,F){var E=typeof G==="boolean";return o.isFunction(G)&&o.isFunction(F)?this._toggle.apply(this,arguments):G==null||E?this.each(function(){var H=E?G:o(this).is(":hidden");o(this)[H?"show":"hide"]()}):this.animate(t("toggle",3),G,F)},fadeTo:function(E,G,F){return this.animate({opacity:G},E,F)},animate:function(I,F,H,G){var E=o.speed(F,H,G);return this[E.queue===false?"each":"queue"](function(){var K=o.extend({},E),M,L=this.nodeType==1&&o(this).is(":hidden"),J=this;for(M in I){if(I[M]=="hide"&&L||I[M]=="show"&&!L){return K.complete.call(this)}if((M=="height"||M=="width")&&this.style){K.display=o.css(this,"display");K.overflow=this.style.overflow}}if(K.overflow!=null){this.style.overflow="hidden"}K.curAnim=o.extend({},I);o.each(I,function(O,S){var R=new o.fx(J,K,O);if(/toggle|show|hide/.test(S)){R[S=="toggle"?L?"show":"hide":S](I)}else{var Q=S.toString().match(/^([+-]=)?([\d+-.]+)(.*)$/),T=R.cur(true)||0;if(Q){var N=parseFloat(Q[2]),P=Q[3]||"px";if(P!="px"){J.style[O]=(N||1)+P;T=((N||1)/R.cur(true))*T;J.style[O]=T+P}if(Q[1]){N=((Q[1]=="-="?-1:1)*N)+T}R.custom(T,N,P)}else{R.custom(T,S,"")}}});return true})},stop:function(F,E){var G=o.timers;if(F){this.queue([])}this.each(function(){for(var H=G.length-1;H>=0;H--){if(G[H].elem==this){if(E){G[H](true)}G.splice(H,1)}}});if(!E){this.dequeue()}return this}});o.each({slideDown:t("show",1),slideUp:t("hide",1),slideToggle:t("toggle",1),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"}},function(E,F){o.fn[E]=function(G,H){return this.animate(F,G,H)}});o.extend({speed:function(G,H,F){var E=typeof G==="object"?G:{complete:F||!F&&H||o.isFunction(G)&&G,duration:G,easing:F&&H||H&&!o.isFunction(H)&&H};E.duration=o.fx.off?0:typeof E.duration==="number"?E.duration:o.fx.speeds[E.duration]||o.fx.speeds._default;E.old=E.complete;E.complete=function(){if(E.queue!==false){o(this).dequeue()}if(o.isFunction(E.old)){E.old.call(this)}};return E},easing:{linear:function(G,H,E,F){return E+F*G},swing:function(G,H,E,F){return((-Math.cos(G*Math.PI)/2)+0.5)*F+E}},timers:[],fx:function(F,E,G){this.options=E;this.elem=F;this.prop=G;if(!E.orig){E.orig={}}}});o.fx.prototype={update:function(){if(this.options.step){this.options.step.call(this.elem,this.now,this)}(o.fx.step[this.prop]||o.fx.step._default)(this);if((this.prop=="height"||this.prop=="width")&&this.elem.style){this.elem.style.display="block"}},cur:function(F){if(this.elem[this.prop]!=null&&(!this.elem.style||this.elem.style[this.prop]==null)){return this.elem[this.prop]}var E=parseFloat(o.css(this.elem,this.prop,F));return E&&E>-10000?E:parseFloat(o.curCSS(this.elem,this.prop))||0},custom:function(I,H,G){this.startTime=e();this.start=I;this.end=H;this.unit=G||this.unit||"px";this.now=this.start;this.pos=this.state=0;var E=this;function F(J){return E.step(J)}F.elem=this.elem;if(F()&&o.timers.push(F)&&!n){n=setInterval(function(){var K=o.timers;for(var J=0;J<K.length;J++){if(!K[J]()){K.splice(J--,1)}}if(!K.length){clearInterval(n);n=g}},13)}},show:function(){this.options.orig[this.prop]=o.attr(this.elem.style,this.prop);this.options.show=true;this.custom(this.prop=="width"||this.prop=="height"?1:0,this.cur());o(this.elem).show()},hide:function(){this.options.orig[this.prop]=o.attr(this.elem.style,this.prop);this.options.hide=true;this.custom(this.cur(),0)},step:function(H){var G=e();if(H||G>=this.options.duration+this.startTime){this.now=this.end;this.pos=this.state=1;this.update();this.options.curAnim[this.prop]=true;var E=true;for(var F in this.options.curAnim){if(this.options.curAnim[F]!==true){E=false}}if(E){if(this.options.display!=null){this.elem.style.overflow=this.options.overflow;this.elem.style.display=this.options.display;if(o.css(this.elem,"display")=="none"){this.elem.style.display="block"}}if(this.options.hide){o(this.elem).hide()}if(this.options.hide||this.options.show){for(var I in this.options.curAnim){o.attr(this.elem.style,I,this.options.orig[I])}}this.options.complete.call(this.elem)}return false}else{var J=G-this.startTime;this.state=J/this.options.duration;this.pos=o.easing[this.options.easing||(o.easing.swing?"swing":"linear")](this.state,J,0,1,this.options.duration);this.now=this.start+((this.end-this.start)*this.pos);this.update()}return true}};o.extend(o.fx,{speeds:{slow:600,fast:200,_default:400},step:{opacity:function(E){o.attr(E.elem.style,"opacity",E.now)},_default:function(E){if(E.elem.style&&E.elem.style[E.prop]!=null){E.elem.style[E.prop]=E.now+E.unit}else{E.elem[E.prop]=E.now}}}});if(document.documentElement.getBoundingClientRect){o.fn.offset=function(){if(!this[0]){return{top:0,left:0}}if(this[0]===this[0].ownerDocument.body){return o.offset.bodyOffset(this[0])}var G=this[0].getBoundingClientRect(),J=this[0].ownerDocument,F=J.body,E=J.documentElement,L=E.clientTop||F.clientTop||0,K=E.clientLeft||F.clientLeft||0,I=G.top+(self.pageYOffset||o.boxModel&&E.scrollTop||F.scrollTop)-L,H=G.left+(self.pageXOffset||o.boxModel&&E.scrollLeft||F.scrollLeft)-K;return{top:I,left:H}}}else{o.fn.offset=function(){if(!this[0]){return{top:0,left:0}}if(this[0]===this[0].ownerDocument.body){return o.offset.bodyOffset(this[0])}o.offset.initialized||o.offset.initialize();var J=this[0],G=J.offsetParent,F=J,O=J.ownerDocument,M,H=O.documentElement,K=O.body,L=O.defaultView,E=L.getComputedStyle(J,null),N=J.offsetTop,I=J.offsetLeft;while((J=J.parentNode)&&J!==K&&J!==H){M=L.getComputedStyle(J,null);N-=J.scrollTop,I-=J.scrollLeft;if(J===G){N+=J.offsetTop,I+=J.offsetLeft;if(o.offset.doesNotAddBorder&&!(o.offset.doesAddBorderForTableAndCells&&/^t(able|d|h)$/i.test(J.tagName))){N+=parseInt(M.borderTopWidth,10)||0,I+=parseInt(M.borderLeftWidth,10)||0}F=G,G=J.offsetParent}if(o.offset.subtractsBorderForOverflowNotVisible&&M.overflow!=="visible"){N+=parseInt(M.borderTopWidth,10)||0,I+=parseInt(M.borderLeftWidth,10)||0}E=M}if(E.position==="relative"||E.position==="static"){N+=K.offsetTop,I+=K.offsetLeft}if(E.position==="fixed"){N+=Math.max(H.scrollTop,K.scrollTop),I+=Math.max(H.scrollLeft,K.scrollLeft)}return{top:N,left:I}}}o.offset={initialize:function(){if(this.initialized){return}var L=document.body,F=document.createElement("div"),H,G,N,I,M,E,J=L.style.marginTop,K='<div style="position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;"><div></div></div><table style="position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;" cellpadding="0" cellspacing="0"><tr><td></td></tr></table>';M={position:"absolute",top:0,left:0,margin:0,border:0,width:"1px",height:"1px",visibility:"hidden"};for(E in M){F.style[E]=M[E]}F.innerHTML=K;L.insertBefore(F,L.firstChild);H=F.firstChild,G=H.firstChild,I=H.nextSibling.firstChild.firstChild;this.doesNotAddBorder=(G.offsetTop!==5);this.doesAddBorderForTableAndCells=(I.offsetTop===5);H.style.overflow="hidden",H.style.position="relative";this.subtractsBorderForOverflowNotVisible=(G.offsetTop===-5);L.style.marginTop="1px";this.doesNotIncludeMarginInBodyOffset=(L.offsetTop===0);L.style.marginTop=J;L.removeChild(F);this.initialized=true},bodyOffset:function(E){o.offset.initialized||o.offset.initialize();var G=E.offsetTop,F=E.offsetLeft;if(o.offset.doesNotIncludeMarginInBodyOffset){G+=parseInt(o.curCSS(E,"marginTop",true),10)||0,F+=parseInt(o.curCSS(E,"marginLeft",true),10)||0}return{top:G,left:F}}};o.fn.extend({position:function(){var I=0,H=0,F;if(this[0]){var G=this.offsetParent(),J=this.offset(),E=/^body|html$/i.test(G[0].tagName)?{top:0,left:0}:G.offset();J.top-=j(this,"marginTop");J.left-=j(this,"marginLeft");E.top+=j(G,"borderTopWidth");E.left+=j(G,"borderLeftWidth");F={top:J.top-E.top,left:J.left-E.left}}return F},offsetParent:function(){var E=this[0].offsetParent||document.body;while(E&&(!/^body|html$/i.test(E.tagName)&&o.css(E,"position")=="static")){E=E.offsetParent}return o(E)}});o.each(["Left","Top"],function(F,E){var G="scroll"+E;o.fn[G]=function(H){if(!this[0]){return null}return H!==g?this.each(function(){this==l||this==document?l.scrollTo(!F?H:o(l).scrollLeft(),F?H:o(l).scrollTop()):this[G]=H}):this[0]==l||this[0]==document?self[F?"pageYOffset":"pageXOffset"]||o.boxModel&&document.documentElement[G]||document.body[G]:this[0][G]}});o.each(["Height","Width"],function(I,G){var E=I?"Left":"Top",H=I?"Right":"Bottom",F=G.toLowerCase();o.fn["inner"+G]=function(){return this[0]?o.css(this[0],F,false,"padding"):null};o.fn["outer"+G]=function(K){return this[0]?o.css(this[0],F,false,K?"margin":"border"):null};var J=G.toLowerCase();o.fn[J]=function(K){return this[0]==l?document.compatMode=="CSS1Compat"&&document.documentElement["client"+G]||document.body["client"+G]:this[0]==document?Math.max(document.documentElement["client"+G],document.body["scroll"+G],document.documentElement["scroll"+G],document.body["offset"+G],document.documentElement["offset"+G]):K===g?(this.length?o.css(this[0],J):null):this.css(J,typeof K==="string"?K:K+"px")}})})();


/**
 * xslTransform
 * Tools for XSLT transformations; jQuery wrapper for Sarissa <http://sarissa.sourceforge.net/>.
 * See jQuery.fn.log below for documentation on $.log().
 * See jQuery.fn.getTransform below for documention on the $.getTransform().
 * See var DEBUG below for turning debugging/logging on and off.
 *
 * @version   20071214
 * @since     2006-07-05
 * @copyright Copyright (c) 2006 Glyphix Studio, Inc. http://www.glyphix.com
 * @author    Brad Brizendine <brizbane@gmail.com>, Matt Antone <antone@glyphix.com>
 * @license   MIT http://www.opensource.org/licenses/mit-license.php
 * @requires  >= jQuery 1.0.3			http://jquery.com/
 * @requires  jquery.debug.js			http://jquery.glyphix.com/
 * @requires  >= sarissa.js 0.9.7.6		http://sarissa.sourceforge.net/
 *
 * @example
 * var r = $.xsl.transform('path-to-xsl.xsl','path-to-xml.xml');
 * @desc Perform a transformation and place the results in var r
 *
 * @example
 * var r = $.xsl.transform('path-to-xsl.xsl','path-to-xml.xml');
 * var str = $.xsl.serialize( r );
 * @desc Perform a transformation, then turn the result into a string
 *
 * @example
 * var doc = $.xsl.load('path-to-xml.xml');
 * @desc Load an xml file and return a parsed xml object
 *
 * @example
 * var xml = '<xmldoc><foo>bar</foo></xmldoc>';
 * var doc = $.xsl.load(xml);
 * @desc Load an xml string and return a parsed xml object
 */

(function($){

	/*
	 * JQuery XSLT transformation plugin.
	 * Replaces all matched elements with the results of an XSLT transformation.
	 * See xslTransform above for more documentation.
	 *
	 * @example
	 * @desc See the xslTransform-example/index.html
	 *
	 * @param xsl String the url to the xsl file
	 * @param xml String the url to the xml file
	 * @param options Object various switches you can send to this function
	 * 		+ params: an object of key/value pairs to be sent to xsl as parameters
	 * 		+ xpath: defines the root node within the provided xml file
	 * 		+ eval: if true, will attempt to eval javascript found in the transformed result
	 *		+ callback: if a Function, evaluate it when transformation is complete
	 * @returns
	 */
	$.fn.getTransform = function( xsl, xml, options ){
		var settings = {
			params: {},		// object of key/value pairs ... parameters to send to the XSL stylesheet
			xpath: '',		// xpath, used to send only a portion of the XML file to the XSL stylesheet
			eval: true,		// evaluate <script> blocks found in the transformed result
			callback: ''	// callback function, to be run on completion of the transformation
		};
		// initialize options hash; override the defaults with supplied options
		$.extend( settings, options );
		$.log( 'getTransform: ' + xsl + '::' + xml + '::' + settings.toString() );

		// must have both xsl and xml
		if( !xsl || !xml ){
			$.log( 'getTransform: missing xsl or xml' );
			return;
		}

		// run the jquery magic on all matched elements
		return this.each( function(){
			// perform the transformation
			var trans = $.xsl.transform( xsl, xml, settings );

			// make sure we have something
			if( !trans.string ){
				$.log('Received nothing from the transformation');
				return false;
			}

			// ie can fail if there's an xml declaration line in the returned result
			var re = trans.string.match(/<\?xml.*?\?>/);
			if( re ){
				trans.string = trans.string.replace( re, '' );
				$.log( 'getTransform(): found an xml declaration and removed it' );
			}

			// place the result in the element
			// 20070202: jquery 1.1.1 can get a "a.appendChild is not a function" error using html() sometimes ...
			//		no idea why yet, so adding a fallback to innerHTML
			//		::warning:: ie6 has trouble with javascript events such as onclick assigned statically within the html when using innerHTML
			try{
				$(this).html( trans.string );
			}catch(e){
				$.log( 'getTransform: error placing results of transform into element, falling back to innerHTML: ' + e.toString() );
				$(this)[0].innerHTML = trans.string;
			}

			// there might not be a scripts property
			if( settings.eval && trans.scripts ){
				if( trans.scripts.length > 0 ){
					$.log( 'Found text/javascript in transformed result' );
					// use jquery's globaleval to avoid security issues in adobe air
					$.globalEval( trans.scripts );
				}
			}

			// run the callback if it's a native function
			if( settings.callback && $.isFunction(settings.callback) ){
				settings.callback.apply();
			}

		});

	};

	// xsl scope
	$.xsl = {

		// version
		version: 20071214,

		// init ... test for requirements
		init: function(){
			// check for v1.0.4 / v1.1 or later of jQuery
			try{
				parseFloat($.fn.jquery) >= 1;
			}catch(e){
				alert('xslTransform requires jQuery 1.0.4 or greater ... please load it prior to xslTransform');
			}
			// check for Sarissa
			try{
				Sarissa;
			}catch(e){
				alert('Missing Sarissa ... please load it prior to xslTransform');
			}
			// if no log function, create a blank one
			if( !$.log ){
				$.log = function(){};
				$.fn.debug = function(){};
			}
			// log the version
			$.log( 'xslTransform:init(): version ' + this.version );
		},

		// initialize Sarissa's serializer
		XMLSerializer: new XMLSerializer(),

		/*
		 * serialize
		 * Turns the provided object into a string and returns it.
		 *
		 * @param data Mixed
		 * @returns String
		 */
		serialize: function( data ){
			$.log( 'serialize(): received ' + typeof(data) );
			// if it's already a string, no further processing required
			if( typeof(data) == 'string' ){
				$.log( 'data is already a string: ' + data );
				return data;
			}
			return this.XMLSerializer.serializeToString( data );
		},

		/*
		 * xmlize
		 * Turns the provided javascript object into an xml document and returns it.
		 *
		 * @param data Mixed
		 * @returns String
		 */
		xmlize: function( data, root ){
			$.log( 'xmlize(): received ' + typeof(data) );
			root = root || 'root';
			return Sarissa.xmlize(data,root);
		},

		/*
		 * load
		 * Attempts to load xml data by automatically sensing the type of the provided data.
		 *
		 * @param xml Mixed the xml data
		 * @returns Object
		 */
		load: function( xml ){
			$.log( 'load(): received ' + typeof(xml) );
			// the result
			var r;

			// if it's an object, assume it's already an XML object, so just return it
			if( typeof(xml) == 'object' ){
				return xml;
			}

			// if it's a string, determine if it's xml data or a path
			// assume that the first character is an opening caret if it's XML data
			if( xml.substring(0,1) == '<' ){
				r = this.loadString( xml );
			}else{
				r = this.loadFile( xml );
			}

			if( r ){
				// the following two lines are needed to get IE (msxml3) to run xpath ... set it on all xml data
				r.setProperty( 'SelectionNamespaces', 'xmlns:xsl="http://www.w3.org/1999/XSL/Transform"' );
				r.setProperty( 'SelectionLanguage', 'XPath' );
				return r;
			}else{
				$.log( 'Unable to load ' + xml );
				return false;
			}
		},

		/*
		 * loadString
		 * Parses an XML string and returns the result.
		 *
		 * @param str String the xml string to turn into a parsed XML object
		 * @returns Object
		 */
		loadString: function( str ){
			$.log( 'loadString(): ' + str + '::' + typeof(str) );

			// use Sarissa to generate an XML doc
			var p = new DOMParser();
			var xml = p.parseFromString( str, 'text/xml' );
			if( !xml ){
				$.log( 'loadString(): parseFromString() failed' );
				return false;
			}
			return xml;
		},

		/*
		 * loadFile
		 * Attempts to retrieve the requested path, specified by url.
		 * If url is an object, it's assumed it's already loaded, and just returns it.
		 *
		 * @param url Mixed
		 * @returns Object
		 */
		loadFile: function( url ){
			$.log( 'loadFile(): ' + url + '::' + typeof(url) );

			if( !url ){
				$.log( 'ERROR: loadFile() missing url' );
				return false;
			}

			// variable to hold ajax results
			var doc;
			/* ajax functionality provided by jQuery is commented, since it can't handle file:///
			// function to receive data on successful download ... semicolon after brace is necessary for packing
			this.xhrsuccess = function(data,str){
				$.log( 'loadFile() completed successfully (' + str + ')' );
				doc = data;
				return true;
			};
			// function to handle downloading error ... semicolon after brace is necessary for packing
			this.xhrerror = function(xhr,err){
				// set debugging to true in order to force the display of this error
				window.DEBUG = true;
				$.log( 'loadFile() failed to load the requested file: (' + err + ') - xml: ' + xhr.responseXML + ' - text: ' + xhr.responseText );
				doc = null;
				return false;
			};

			// make asynchronous ajax call and call functions defined above on success/error
			$.ajax({
				type:		'GET',
				url:		url,
				async:		false,
				success:	this.xhrsuccess,
				error:		this.xhrerror
			});
			*/

			var xmlhttp = new XMLHttpRequest();
			xmlhttp.open('GET', url, false);
			xmlhttp.send('');
			doc = xmlhttp.responseXML;

			// check for total failure
			if( !doc ){
				$.log( 'ERROR: document ' + url + ' not found (404), or unable to load' );
				return false;
			}
			// check for success but no data
			if( doc.length == 0 ){
				$.log( 'ERROR: document ' + url + ' loaded in loadFile() has no data' );
				return false;
			}
			return doc;
		},

		/*
		 * transform
		 * Central transformation function: takes an xml doc and an xsl doc.
		 *
		 * @param xsl Mixed the xsl transformation document
		 * @param xml Mixed the xml document to be transformed
		 * @param options Object various switches you can send to this function
		 * 		+ params: an object of key/value pairs to be sent to xsl as parameters
		 * 		+ xpath: defines the root node within the provided xml file
		 * @returns Object the results of the transformation
		 * 		+ xsl: the raw xsl doc
		 * 		+ doc: the raw results of the transform
		 * 		+ string: the serialized doc
		 */
		transform: function( xsl, xml, options ){
			$.log( 'transform(): ' + xsl + '::' + xml + '::' + (options ? options.toString() : 'no options provided') );

			// set up request and result
			var request = {
				// the source and loaded object for xml
				xsl: {
					source: xsl,
					doc: null
				},
				// the source and loaded object for xsl
				xml: {
					source: xml,
					doc: null
				},
				// the options
				options: options || {},
				// the result doc and string
				result: {
					doc: null,
					string: '',
					scripts: null,
					error: ''
				}
			}

			// set up error handler
			var err = function( what ){
				var docerr = '', srcerr = '';
				// build the src error string
				srcerr = (typeof(request[what].source) == 'string') ? ' (' + what + ' loaded from provided path)' : ' (' + what + ' loaded from provided object)';
				// build the text error string
				docerr = (typeof(request[what].doc) == 'object') ? '[success]' : '[failure]';
				// include the root node if we have a doc object and it's xml
				if( what == 'xml' && typeof(request[what].doc) == 'object' ){
					docerr += ' root node of "' + request[what].doc.getElementsByTagName('*')[0].nodeName + '"';
				}
				return docerr + ' ' + srcerr;
			}

			// load the files
			try{
				request.xsl.doc = this.load(xsl);
				request.xml.doc = this.load(xml);
			}catch(e){
				$.log('Unable to load either xsl [' + err('xsl') + '] or xml [' + err('xml') + ']');
				throw( err('xsl') + '::' + err('xml') );
				return false;
			}

			// if we have an xpath, replace xml.doc with the results of running it
			// as of 2007-12-03, IE throws a "msxml6: the parameter is incorrect" error, so removing this
			if( request.options.xpath && request.xml.doc && !jQuery.browser.msie ){
				// run the xpath
				request.xml.doc = request.xml.doc.selectSingleNode( request.options.xpath.toString() );
				$.log( 'transform(): xpath has been run...resulting doc: ' + (this.serialize(request.xml.doc)) );
			}

			// attach the processor
			var processor = new XSLTProcessor();
			// stylesheet must be imported before parameters can be added
			processor.importStylesheet( request.xsl.doc );
			// add parameters to the processor
			if( request.options.params && processor ){
				$.log( 'transform(): received xsl params: ' + request.options.params.toString() );
				for( key in request.options.params ){
					// name and value must be strings; first parameter is namespace
					var p = request.options.params[key] ? request.options.params[key].toString() : request.options.params[key];
					try{
						processor.setParameter( null, key.toString(), p );
					}catch(e){
						$.log('Unable to set parameter "' + key + '"');
						return false;
					}
					$.log( 'set parameter "' + key.toString() + '" to "' + p + '"' );
				}
			}

			// perform the transformation
			try{
				request.result.doc = processor.transformToDocument( request.xml.doc );
				// handle transform error
				request.result.error = Sarissa.getParseErrorText( request.result.doc );
				if( request.result.error != Sarissa.PARSED_OK ){
					// throw the error text
					request.result.error = 'transform(): error in transformation: ' + request.result.error + ' :: using xsl: ' + err('xsl') + ' => xml: ' + err('xml');
					$.log(request.result.error);
				}
			}catch(e){
				request.result.error = 'Unable to perform transformation :: using xsl: ' + err('xsl') + ' => xml: ' + err('xml');
				$.log(request.result.error);
				throw(request.result.error);
				return request.result;
			}

			// if we made it this far, the transformation was successful
			request.result.string = this.serialize( request.result.doc );
			// store reference to all scripts found in the doc (not result.string)
			request.result.scripts = jQuery('script',request.result.doc).text();

			return request.result;
		}
	};

	// initialize the $.xsl object
	$.xsl.init();

})(jQuery);
