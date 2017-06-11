!function(e){"use strict";"function"==typeof define&&define.amd?define(["jquery"],e):e("undefined"!=typeof jQuery?jQuery:window.Zepto)}(function(e){"use strict";function t(t){var r=t.data;t.isDefaultPrevented()||(t.preventDefault(),e(t.target).ajaxSubmit(r))}function r(t){var r=t.target,a=e(r);if(!a.is("[type=submit],[type=image]")){var n=a.closest("[type=submit]");if(0===n.length)return;r=n[0]}var i=this;if(i.clk=r,"image"==r.type)if(void 0!==t.offsetX)i.clk_x=t.offsetX,i.clk_y=t.offsetY;else if("function"==typeof e.fn.offset){var o=a.offset();i.clk_x=t.pageX-o.left,i.clk_y=t.pageY-o.top}else i.clk_x=t.pageX-r.offsetLeft,i.clk_y=t.pageY-r.offsetTop;setTimeout(function(){i.clk=i.clk_x=i.clk_y=null},100)}function a(){if(e.fn.ajaxSubmit.debug){var t="[jquery.form] "+Array.prototype.join.call(arguments,"");window.console&&window.console.log?window.console.log(t):window.opera&&window.opera.postError&&window.opera.postError(t)}}var n={};n.fileapi=void 0!==e("<input type='file'/>").get(0).files,n.formdata=void 0!==window.FormData;var i=!!e.fn.prop;e.fn.attr2=function(){if(!i)return this.attr.apply(this,arguments);var e=this.prop.apply(this,arguments);return e&&e.jquery||"string"==typeof e?e:this.attr.apply(this,arguments)},e.fn.ajaxSubmit=function(t){function r(r){var a,n,i=e.param(r,t.traditional).split("&"),o=i.length,s=[];for(a=0;o>a;a++)i[a]=i[a].replace(/\+/g," "),n=i[a].split("="),s.push([decodeURIComponent(n[0]),decodeURIComponent(n[1])]);return s}function o(a){for(var n=new FormData,i=0;i<a.length;i++)n.append(a[i].name,a[i].value);if(t.extraData){var o=r(t.extraData);for(i=0;i<o.length;i++)o[i]&&n.append(o[i][0],o[i][1])}t.data=null;var s=e.extend(!0,{},e.ajaxSettings,t,{contentType:!1,processData:!1,cache:!1,type:u||"POST"});t.uploadProgress&&(s.xhr=function(){var r=e.ajaxSettings.xhr();return r.upload&&r.upload.addEventListener("progress",function(e){var r=0,a=e.loaded||e.position,n=e.total;e.lengthComputable&&(r=Math.ceil(a/n*100)),t.uploadProgress(e,a,n,r)},!1),r}),s.data=null;var c=s.beforeSend;return s.beforeSend=function(e,r){r.data=t.formData?t.formData:n,c&&c.call(this,e,r)},e.ajax(s)}function s(r){function n(e){var t=null;try{e.contentWindow&&(t=e.contentWindow.document)}catch(r){a("cannot get iframe.contentWindow document: "+r)}if(t)return t;try{t=e.contentDocument?e.contentDocument:e.document}catch(r){a("cannot get iframe.contentDocument: "+r),t=e.document}return t}function o(){function t(){try{var e=n(g).readyState;a("state="+e),e&&"uninitialized"==e.toLowerCase()&&setTimeout(t,50)}catch(r){a("Server abort: ",r," (",r.name,")"),s(k),j&&clearTimeout(j),j=void 0}}var r=f.attr2("target"),i=f.attr2("action"),o="multipart/form-data",c=f.attr("enctype")||f.attr("encoding")||o;w.setAttribute("target",p),(!u||/post/i.test(u))&&w.setAttribute("method","POST"),i!=m.url&&w.setAttribute("action",m.url),m.skipEncodingOverride||u&&!/post/i.test(u)||f.attr({encoding:"multipart/form-data",enctype:"multipart/form-data"}),m.timeout&&(j=setTimeout(function(){T=!0,s(D)},m.timeout));var l=[];try{if(m.extraData)for(var d in m.extraData)m.extraData.hasOwnProperty(d)&&l.push(e.isPlainObject(m.extraData[d])&&m.extraData[d].hasOwnProperty("name")&&m.extraData[d].hasOwnProperty("value")?e('<input type="hidden" name="'+m.extraData[d].name+'">').val(m.extraData[d].value).appendTo(w)[0]:e('<input type="hidden" name="'+d+'">').val(m.extraData[d]).appendTo(w)[0]);m.iframeTarget||v.appendTo("body"),g.attachEvent?g.attachEvent("onload",s):g.addEventListener("load",s,!1),setTimeout(t,15);try{w.submit()}catch(h){var x=document.createElement("form").submit;x.apply(w)}}finally{w.setAttribute("action",i),w.setAttribute("enctype",c),r?w.setAttribute("target",r):f.removeAttr("target"),e(l).remove()}}function s(t){if(!x.aborted&&!F){if(M=n(g),M||(a("cannot access response document"),t=k),t===D&&x)return x.abort("timeout"),void S.reject(x,"timeout");if(t==k&&x)return x.abort("server abort"),void S.reject(x,"error","server abort");if(M&&M.location.href!=m.iframeSrc||T){g.detachEvent?g.detachEvent("onload",s):g.removeEventListener("load",s,!1);var r,i="success";try{if(T)throw"timeout";var o="xml"==m.dataType||M.XMLDocument||e.isXMLDoc(M);if(a("isXml="+o),!o&&window.opera&&(null===M.body||!M.body.innerHTML)&&--O)return a("requeing onLoad callback, DOM not available"),void setTimeout(s,250);var u=M.body?M.body:M.documentElement;x.responseText=u?u.innerHTML:null,x.responseXML=M.XMLDocument?M.XMLDocument:M,o&&(m.dataType="xml"),x.getResponseHeader=function(e){var t={"content-type":m.dataType};return t[e.toLowerCase()]},u&&(x.status=Number(u.getAttribute("status"))||x.status,x.statusText=u.getAttribute("statusText")||x.statusText);var c=(m.dataType||"").toLowerCase(),l=/(json|script|text)/.test(c);if(l||m.textarea){var f=M.getElementsByTagName("textarea")[0];if(f)x.responseText=f.value,x.status=Number(f.getAttribute("status"))||x.status,x.statusText=f.getAttribute("statusText")||x.statusText;else if(l){var p=M.getElementsByTagName("pre")[0],h=M.getElementsByTagName("body")[0];p?x.responseText=p.textContent?p.textContent:p.innerText:h&&(x.responseText=h.textContent?h.textContent:h.innerText)}}else"xml"==c&&!x.responseXML&&x.responseText&&(x.responseXML=X(x.responseText));try{E=_(x,c,m)}catch(y){i="parsererror",x.error=r=y||i}}catch(y){a("error caught: ",y),i="error",x.error=r=y||i}x.aborted&&(a("upload aborted"),i=null),x.status&&(i=x.status>=200&&x.status<300||304===x.status?"success":"error"),"success"===i?(m.success&&m.success.call(m.context,E,"success",x),S.resolve(x.responseText,"success",x),d&&e.event.trigger("ajaxSuccess",[x,m])):i&&(void 0===r&&(r=x.statusText),m.error&&m.error.call(m.context,x,i,r),S.reject(x,"error",r),d&&e.event.trigger("ajaxError",[x,m,r])),d&&e.event.trigger("ajaxComplete",[x,m]),d&&!--e.active&&e.event.trigger("ajaxStop"),m.complete&&m.complete.call(m.context,x,i),F=!0,m.timeout&&clearTimeout(j),setTimeout(function(){m.iframeTarget?v.attr("src",m.iframeSrc):v.remove(),x.responseXML=null},100)}}}var c,l,m,d,p,v,g,x,y,b,T,j,w=f[0],S=e.Deferred();if(S.abort=function(e){x.abort(e)},r)for(l=0;l<h.length;l++)c=e(h[l]),i?c.prop("disabled",!1):c.removeAttr("disabled");if(m=e.extend(!0,{},e.ajaxSettings,t),m.context=m.context||m,p="jqFormIO"+(new Date).getTime(),m.iframeTarget?(v=e(m.iframeTarget),b=v.attr2("name"),b?p=b:v.attr2("name",p)):(v=e('<iframe name="'+p+'" src="'+m.iframeSrc+'" />'),v.css({position:"absolute",top:"-1000px",left:"-1000px"})),g=v[0],x={aborted:0,responseText:null,responseXML:null,status:0,statusText:"n/a",getAllResponseHeaders:function(){},getResponseHeader:function(){},setRequestHeader:function(){},abort:function(t){var r="timeout"===t?"timeout":"aborted";a("aborting upload... "+r),this.aborted=1;try{g.contentWindow.document.execCommand&&g.contentWindow.document.execCommand ("Stop")}catch(n){}v.attr("src",m.iframeSrc),x.error=r,m.error&&m.error.call(m.context,x,r,t),d&&e.event.trigger("ajaxError",[x,m,r]),m.complete&&m.complete.call(m.context,x,r)}},d=m.global,d&&0===e.active++&&e.event.trigger("ajaxStart"),d&&e.event.trigger("ajaxSend",[x,m]),m.beforeSend&&m.beforeSend.call(m.context,x,m)===!1)return m.global&&e.active--,S.reject(),S;if(x.aborted)return S.reject(),S;y=w.clk,y&&(b=y.name,b&&!y.disabled&&(m.extraData=m.extraData||{},m.extraData[b]=y.value,"image"==y.type&&(m.extraData[b+".x"]=w.clk_x,m.extraData[b+".y"]=w.clk_y)));var D=1,k=2,A=e("meta[name=csrf-token]").attr("content"),L=e("meta[name=csrf-param]").attr("content");L&&A&&(m.extraData=m.extraData||{},m.extraData[L]=A),m.forceSync?o():setTimeout(o,10);var E,M,F,O=50,X=e.parseXML||function(e,t){return window.ActiveXObject?(t=new ActiveXObject("Microsoft.XMLDOM"),t.async="false",t.loadXML(e)):t=(new DOMParser).parseFromString(e,"text/xml"),t&&t.documentElement&&"parsererror"!=t.documentElement.nodeName?t:null},C=e.parseJSON||function(e){return window.eval("("+e+")")},_=function(t,r,a){var n=t.getResponseHeader("content-type")||"",i="xml"===r||!r&&n.indexOf("xml")>=0,o=i?t.responseXML:t.responseText;return i&&"parsererror"===o.documentElement.nodeName&&e.error&&e.error("parsererror"),a&&a.dataFilter&&(o=a.dataFilter(o,r)),"string"==typeof o&&("json"===r||!r&&n.indexOf("json")>=0?o=C(o):("script"===r||!r&&n.indexOf("javascript")>=0)&&e.globalEval(o)),o};return S}if(!this.length)return a("ajaxSubmit: skipping submit process - no element selected"),this;var u,c,l,f=this;"function"==typeof t?t={success:t}:void 0===t&&(t={}),u=t.type||this.attr2("method"),c=t.url||this.attr2("action"),l="string"==typeof c?e.trim(c):"",l=l||window.location.href||"",l&&(l=(l.match(/^([^#]+)/)||[])[1]),t=e.extend(!0,{url:l,success:e.ajaxSettings.success,type:u||e.ajaxSettings.type,iframeSrc:/^https/i.test(window.location.href||"")?"javascript:false":"about:blank"},t);var m={};if(this.trigger("form-pre-serialize",[this,t,m]),m.veto)return a("ajaxSubmit: submit vetoed via form-pre-serialize trigger"),this;if(t.beforeSerialize&&t.beforeSerialize(this,t)===!1)return a("ajaxSubmit: submit aborted via beforeSerialize callback"),this;var d=t.traditional;void 0===d&&(d=e.ajaxSettings.traditional);var p,h=[],v=this.formToArray(t.semantic,h);if(t.data&&(t.extraData=t.data,p=e.param(t.data,d)),t.beforeSubmit&&t.beforeSubmit(v,this,t)===!1)return a("ajaxSubmit: submit aborted via beforeSubmit callback"),this;if(this.trigger("form-submit-validate",[v,this,t,m]),m.veto)return a("ajaxSubmit: submit vetoed via form-submit-validate trigger"),this;var g=e.param(v,d);p&&(g=g?g+"&"+p:p),"GET"==t.type.toUpperCase()?(t.url+=(t.url.indexOf("?")>=0?"&":"?")+g,t.data=null):t.data=g;var x=[];if(t.resetForm&&x.push(function(){f.resetForm()}),t.clearForm&&x.push(function(){f.clearForm(t.includeHidden)}),!t.dataType&&t.target){var y=t.success||function(){};x.push(function(r){var a=t.replaceTarget?"replaceWith":"html";e(t.target)[a](r).each(y,arguments)})}else t.success&&x.push(t.success);if(t.success=function(e,r,a){for(var n=t.context||this,i=0,o=x.length;o>i;i++)x[i].apply(n,[e,r,a||f,f])},t.error){var b=t.error;t.error=function(e,r,a){var n=t.context||this;b.apply(n,[e,r,a,f])}}if(t.complete){var T=t.complete;t.complete=function(e,r){var a=t.context||this;T.apply(a,[e,r,f])}}var j=e("input[type=file]:enabled",this).filter(function(){return""!==e(this).val()}),w=j.length>0,S="multipart/form-data",D=f.attr("enctype")==S||f.attr("encoding")==S,k=n.fileapi&&n.formdata;a("fileAPI :"+k);var A,L=(w||D)&&!k;t.iframe!==!1&&(t.iframe||L)?t.closeKeepAlive?e.get(t.closeKeepAlive,function(){A=s(v)}):A=s(v):A=(w||D)&&k?o(v):e.ajax(t),f.removeData("jqxhr").data("jqxhr",A);for(var E=0;E<h.length;E++)h[E]=null;return this.trigger("form-submit-notify",[this,t]),this},e.fn.ajaxForm=function(n){if(n=n||{},n.delegation=n.delegation&&e.isFunction(e.fn.on),!n.delegation&&0===this.length){var i={s:this.selector,c:this.context};return!e.isReady&&i.s?(a("DOM not ready, queuing ajaxForm"),e(function(){e(i.s,i.c).ajaxForm(n)}),this):(a("terminating; zero elements found by selector"+(e.isReady?"":" (DOM not ready)")),this)}return n.delegation?(e(document).off("submit.form-plugin",this.selector,t).off("click.form-plugin",this.selector,r).on("submit.form-plugin",this.selector,n,t).on("click.form-plugin",this.selector,n,r),this):this.ajaxFormUnbind().bind("submit.form-plugin",n,t).bind("click.form-plugin",n,r)},e.fn.ajaxFormUnbind=function(){return this.unbind("submit.form-plugin click.form-plugin")},e.fn.formToArray=function(t,r){var a=[];if(0===this.length)return a;var i,o=this[0],s=this.attr("id"),u=t?o.getElementsByTagName("*"):o.elements;if(u&&!/MSIE [678]/.test(navigator.userAgent)&&(u=e(u).get()),s&&(i=e(':input[form="'+s+'"]').get(),i.length&&(u=(u||[]).concat(i))),!u||!u.length)return a;var c,l,f,m,d,p,h;for(c=0,p=u.length;p>c;c++)if(d=u[c],f=d.name,f&&!d.disabled)if(t&&o.clk&&"image"==d.type)o.clk==d&&(a.push({name:f,value:e(d).val(),type:d.type}),a.push({name:f+".x",value:o.clk_x},{name:f+".y",value:o.clk_y}));else if(m=e.fieldValue(d,!0),m&&m.constructor==Array)for(r&&r.push(d),l=0,h=m.length;h>l;l++)a.push({name:f,value:m[l]});else if(n.fileapi&&"file"==d.type){r&&r.push(d);var v=d.files;if(v.length)for(l=0;l<v.length;l++)a.push({name:f,value:v[l],type:d.type});else a.push({name:f,value:"",type:d.type})}else null!==m&&"undefined"!=typeof m&&(r&&r.push(d),a.push({name:f,value:m,type:d.type,required:d.required}));if(!t&&o.clk){var g=e(o.clk),x=g[0];f=x.name,f&&!x.disabled&&"image"==x.type&&(a.push({name:f,value:g.val()}),a.push({name:f+".x",value:o.clk_x},{name:f+".y",value:o.clk_y}))}return a},e.fn.formSerialize=function(t){return e.param(this.formToArray(t))},e.fn.fieldSerialize=function(t){var r=[];return this.each(function(){var a=this.name;if(a){var n=e.fieldValue(this,t);if(n&&n.constructor==Array)for(var i=0,o=n.length;o>i;i++)r.push({name:a,value:n[i]});else null!==n&&"undefined"!=typeof n&&r.push({name:this.name,value:n})}}),e.param(r)},e.fn.fieldValue=function(t){for(var r=[],a=0,n=this.length;n>a;a++){var i=this[a],o=e.fieldValue(i,t);null===o||"undefined"==typeof o||o.constructor==Array&&!o.length||(o.constructor==Array?e.merge(r,o):r.push(o))}return r},e.fieldValue=function(t,r){var a=t.name,n=t.type,i=t.tagName.toLowerCase();if(void 0===r&&(r=!0),r&&(!a||t.disabled||"reset"==n||"button"==n||("checkbox"==n||"radio"==n)&&!t.checked||("submit"==n||"image"==n)&&t.form&&t.form.clk!=t||"select"==i&&-1==t.selectedIndex))return null;if("select"==i){var o=t.selectedIndex;if(0>o)return null;for(var s=[],u=t.options,c="select-one"==n,l=c?o+1:u.length,f=c?o:0;l>f;f++){var m=u[f];if(m.selected){var d=m.value;if(d||(d=m.attributes&&m.attributes.value&&!m.attributes.value.specified?m.text:m.value),c)return d;s.push(d)}}return s}return e(t).val()},e.fn.clearForm=function(t){return this.each(function(){e("input,select,textarea",this).clearFields(t)})},e.fn.clearFields=e.fn.clearInputs=function(t){var r=/^(?:color|date|datetime|email|month|number|password|range|search|tel|text|time|url|week)$/i;return this.each(function(){var a=this.type,n=this.tagName.toLowerCase();r.test(a)||"textarea"==n?this.value="":"checkbox"==a||"radio"==a?this.checked=!1:"select"==n?this.selectedIndex=-1:"file"==a?/MSIE/.test(navigator.userAgent)?e(this).replaceWith(e(this).clone(!0)):e(this).val(""):t&&(t===!0&&/hidden/.test(a)||"string"==typeof t&&e(this).is(t))&&(this.value="")})},e.fn.resetForm=function(){return this.each(function(){("function"==typeof this.reset||"object"==typeof this.reset&&!this.reset.nodeType)&&this.reset()})},e.fn.enable=function(e){return void 0===e&&(e=!0),this.each(function(){this.disabled=!e})},e.fn.selected=function(t){return void 0===t&&(t=!0),this.each(function(){var r=this.type;if("checkbox"==r||"radio"==r)this.checked=t;else if("option"==this.tagName.toLowerCase()){var a=e(this).parent("select");t&&a[0]&&"select-one"==a[0].type&&a.find("option").selected(!1),this.selected=t}})},e.fn.ajaxSubmit.debug=!1});
(function($){
'use strict';
if(typeof _wpcf7=='undefined'||_wpcf7===null){
return;
}
_wpcf7=$.extend({
cached: 0
}, _wpcf7);
$.fn.wpcf7InitForm=function(){
this.ajaxForm({
beforeSubmit: function(arr, $form, options){
$form.wpcf7ClearResponseOutput();
$form.find('[aria-invalid]').attr('aria-invalid', 'false');
$form.find('img.ajax-loader').css({ visibility: 'visible' });
return true;
},
beforeSerialize: function($form, options){
$form.find('[placeholder].placeheld').each(function(i, n){
$(n).val('');
});
return true;
},
data: { '_wpcf7_is_ajax_call': 1 },
dataType: 'json',
success: $.wpcf7AjaxSuccess,
error: function(xhr, status, error, $form){
var e=$('<div class="ajax-error"></div>').text(error.message);
$form.after(e);
}});
if(_wpcf7.cached){
this.wpcf7OnloadRefill();
}
this.wpcf7ToggleSubmit();
this.find('.wpcf7-submit').wpcf7AjaxLoader();
this.find('.wpcf7-acceptance').click(function(){
$(this).closest('form').wpcf7ToggleSubmit();
});
this.find('.wpcf7-exclusive-checkbox').wpcf7ExclusiveCheckbox();
this.find('.wpcf7-list-item.has-free-text').wpcf7ToggleCheckboxFreetext();
this.find('[placeholder]').wpcf7Placeholder();
if(_wpcf7.jqueryUi&&! _wpcf7.supportHtml5.date){
this.find('input.wpcf7-date[type="date"]').each(function(){
$(this).datepicker({
dateFormat: 'yy-mm-dd',
minDate: new Date($(this).attr('min')),
maxDate: new Date($(this).attr('max'))
});
});
}
if(_wpcf7.jqueryUi&&! _wpcf7.supportHtml5.number){
this.find('input.wpcf7-number[type="number"]').each(function(){
$(this).spinner({
min: $(this).attr('min'),
max: $(this).attr('max'),
step: $(this).attr('step')
});
});
}
this.find('.wpcf7-character-count').wpcf7CharacterCount();
this.find('.wpcf7-validates-as-url').change(function(){
$(this).wpcf7NormalizeUrl();
});
this.find('.wpcf7-recaptcha').wpcf7Recaptcha();
};
$.wpcf7AjaxSuccess=function(data, status, xhr, $form){
if(! $.isPlainObject(data)||$.isEmptyObject(data)){
return;
}
var $responseOutput=$form.find('div.wpcf7-response-output');
$form.wpcf7ClearResponseOutput();
$form.find('.wpcf7-form-control').removeClass('wpcf7-not-valid');
$form.removeClass('invalid spam sent failed');
if(data.captcha){
$form.wpcf7RefillCaptcha(data.captcha);
}
if(data.quiz){
$form.wpcf7RefillQuiz(data.quiz);
}
if(data.invalids){
$.each(data.invalids, function(i, n){
$form.find(n.into).wpcf7NotValidTip(n.message);
$form.find(n.into).find('.wpcf7-form-control').addClass('wpcf7-not-valid');
$form.find(n.into).find('[aria-invalid]').attr('aria-invalid', 'true');
});
$responseOutput.addClass('wpcf7-validation-errors');
$form.addClass('invalid');
$(data.into).trigger('wpcf7:invalid');
$(data.into).trigger('invalid.wpcf7');
}else if(1==data.spam){
$form.find('[name="g-recaptcha-response"]').each(function(){
if(''==$(this).val()){
var $recaptcha=$(this).closest('.wpcf7-form-control-wrap');
$recaptcha.wpcf7NotValidTip(_wpcf7.recaptcha.messages.empty);
}});
$responseOutput.addClass('wpcf7-spam-blocked');
$form.addClass('spam');
$(data.into).trigger('wpcf7:spam');
$(data.into).trigger('spam.wpcf7');
}else if(1==data.mailSent){
$responseOutput.addClass('wpcf7-mail-sent-ok');
$form.addClass('sent');
if(data.onSentOk){
$.each(data.onSentOk, function(i, n){ eval(n) });
}
$(data.into).trigger('wpcf7:mailsent');
$(data.into).trigger('mailsent.wpcf7');
}else{
$responseOutput.addClass('wpcf7-mail-sent-ng');
$form.addClass('failed');
$(data.into).trigger('wpcf7:mailfailed');
$(data.into).trigger('mailfailed.wpcf7');
}
if(data.onSubmit){
$.each(data.onSubmit, function(i, n){ eval(n) });
}
$(data.into).trigger('wpcf7:submit');
$(data.into).trigger('submit.wpcf7');
if(1==data.mailSent){
$form.resetForm();
}
$form.find('[placeholder].placeheld').each(function(i, n){
$(n).val($(n).attr('placeholder'));
});
$responseOutput.append(data.message).slideDown('fast');
$responseOutput.attr('role', 'alert');
$.wpcf7UpdateScreenReaderResponse($form, data);
};
$.fn.wpcf7ExclusiveCheckbox=function(){
return this.find('input:checkbox').click(function(){
var name=$(this).attr('name');
$(this).closest('form').find('input:checkbox[name="' + name + '"]').not(this).prop('checked', false);
});
};
$.fn.wpcf7Placeholder=function(){
if(_wpcf7.supportHtml5.placeholder){
return this;
}
return this.each(function(){
$(this).val($(this).attr('placeholder'));
$(this).addClass('placeheld');
$(this).focus(function(){
if($(this).hasClass('placeheld'))
$(this).val('').removeClass('placeheld');
});
$(this).blur(function(){
if(''==$(this).val()){
$(this).val($(this).attr('placeholder'));
$(this).addClass('placeheld');
}});
});
};
$.fn.wpcf7AjaxLoader=function(){
return this.each(function(){
var loader=$('<img class="ajax-loader" />')
.attr({ src: _wpcf7.loaderUrl, alt: _wpcf7.sending })
.css('visibility', 'hidden');
$(this).after(loader);
});
};
$.fn.wpcf7ToggleSubmit=function(){
return this.each(function(){
var form=$(this);
if(this.tagName.toLowerCase()!='form'){
form=$(this).find('form').first();
}
if(form.hasClass('wpcf7-acceptance-as-validation')){
return;
}
var submit=form.find('input:submit');
if(! submit.length) return;
var acceptances=form.find('input:checkbox.wpcf7-acceptance');
if(! acceptances.length) return;
submit.removeAttr('disabled');
acceptances.each(function(i, n){
n=$(n);
if(n.hasClass('wpcf7-invert')&&n.is(':checked')
|| ! n.hasClass('wpcf7-invert')&&! n.is(':checked')){
submit.attr('disabled', 'disabled');
}});
});
};
$.fn.wpcf7ToggleCheckboxFreetext=function(){
return this.each(function(){
var $wrap=$(this).closest('.wpcf7-form-control');
if($(this).find(':checkbox, :radio').is(':checked')){
$(this).find(':input.wpcf7-free-text').prop('disabled', false);
}else{
$(this).find(':input.wpcf7-free-text').prop('disabled', true);
}
$wrap.find(':checkbox, :radio').change(function(){
var $cb=$('.has-free-text', $wrap).find(':checkbox, :radio');
var $freetext=$(':input.wpcf7-free-text', $wrap);
if($cb.is(':checked')){
$freetext.prop('disabled', false).focus();
}else{
$freetext.prop('disabled', true);
}});
});
};
$.fn.wpcf7CharacterCount=function(){
return this.each(function(){
var $count=$(this);
var name=$count.attr('data-target-name');
var down=$count.hasClass('down');
var starting=parseInt($count.attr('data-starting-value'), 10);
var maximum=parseInt($count.attr('data-maximum-value'), 10);
var minimum=parseInt($count.attr('data-minimum-value'), 10);
var updateCount=function($target){
var length=$target.val().length;
var count=down ? starting - length:length;
$count.attr('data-current-value', count);
$count.text(count);
if(maximum&&maximum < length){
$count.addClass('too-long');
}else{
$count.removeClass('too-long');
}
if(minimum&&length < minimum){
$count.addClass('too-short');
}else{
$count.removeClass('too-short');
}};
$count.closest('form').find(':input[name="' + name + '"]').each(function(){
updateCount($(this));
$(this).keyup(function(){
updateCount($(this));
});
});
});
};
$.fn.wpcf7NormalizeUrl=function(){
return this.each(function(){
var val=$.trim($(this).val());
if(val&&! val.match(/^[a-z][a-z0-9.+-]*:/i)){
val=val.replace(/^\/+/, '');
val='http://' + val;
}
$(this).val(val);
});
};
$.fn.wpcf7NotValidTip=function(message){
return this.each(function(){
var $into=$(this);
$into.find('span.wpcf7-not-valid-tip').remove();
$into.append('<span role="alert" class="wpcf7-not-valid-tip">' + message + '</span>');
if($into.is('.use-floating-validation-tip *')){
$('.wpcf7-not-valid-tip', $into).mouseover(function(){
$(this).wpcf7FadeOut();
});
$(':input', $into).focus(function(){
$('.wpcf7-not-valid-tip', $into).not(':hidden').wpcf7FadeOut();
});
}});
};
$.fn.wpcf7FadeOut=function(){
return this.each(function(){
$(this).animate({
opacity: 0
}, 'fast', function(){
$(this).css({'z-index': -100});
});
});
};
$.fn.wpcf7OnloadRefill=function(){
return this.each(function(){
var url=$(this).attr('action');
if(0 < url.indexOf('#')){
url=url.substr(0, url.indexOf('#'));
}
var id=$(this).find('input[name="_wpcf7"]').val();
var unitTag=$(this).find('input[name="_wpcf7_unit_tag"]').val();
$.getJSON(url,
{ _wpcf7_is_ajax_call: 1, _wpcf7: id, _wpcf7_request_ver: $.now() },
function(data){
if(data&&data.captcha){
$('#' + unitTag).wpcf7RefillCaptcha(data.captcha);
}
if(data&&data.quiz){
$('#' + unitTag).wpcf7RefillQuiz(data.quiz);
}}
);
});
};
$.fn.wpcf7RefillCaptcha=function(captcha){
return this.each(function(){
var form=$(this);
$.each(captcha, function(i, n){
form.find(':input[name="' + i + '"]').clearFields();
form.find('img.wpcf7-captcha-' + i).attr('src', n);
var match=/([0-9]+)\.(png|gif|jpeg)$/.exec(n);
form.find('input:hidden[name="_wpcf7_captcha_challenge_' + i + '"]').attr('value', match[1]);
});
});
};
$.fn.wpcf7RefillQuiz=function(quiz){
return this.each(function(){
var form=$(this);
$.each(quiz, function(i, n){
form.find(':input[name="' + i + '"]').clearFields();
form.find(':input[name="' + i + '"]').siblings('span.wpcf7-quiz-label').text(n[0]);
form.find('input:hidden[name="_wpcf7_quiz_answer_' + i + '"]').attr('value', n[1]);
});
});
};
$.fn.wpcf7ClearResponseOutput=function(){
return this.each(function(){
$(this).find('div.wpcf7-response-output').hide().empty().removeClass('wpcf7-mail-sent-ok wpcf7-mail-sent-ng wpcf7-validation-errors wpcf7-spam-blocked').removeAttr('role');
$(this).find('span.wpcf7-not-valid-tip').remove();
$(this).find('img.ajax-loader').css({ visibility: 'hidden' });
});
};
$.fn.wpcf7Recaptcha=function(){
return this.each(function(){
var events='wpcf7:spam wpcf7:mailsent wpcf7:mailfailed';
$(this).closest('div.wpcf7').on(events, function(e){
if(recaptchaWidgets&&grecaptcha){
$.each(recaptchaWidgets, function(index, value){
grecaptcha.reset(value);
});
}});
});
};
$.wpcf7UpdateScreenReaderResponse=function($form, data){
$('.wpcf7 .screen-reader-response').html('').attr('role', '');
if(data.message){
var $response=$form.siblings('.screen-reader-response').first();
$response.append(data.message);
if(data.invalids){
var $invalids=$('<ul></ul>');
$.each(data.invalids, function(i, n){
if(n.idref){
var $li=$('<li></li>').append($('<a></a>').attr('href', '#' + n.idref).append(n.message));
}else{
var $li=$('<li></li>').append(n.message);
}
$invalids.append($li);
});
$response.append($invalids);
}
$response.attr('role', 'alert').focus();
}};
$.wpcf7SupportHtml5=function(){
var features={};
var input=document.createElement('input');
features.placeholder='placeholder' in input;
var inputTypes=['email', 'url', 'tel', 'number', 'range', 'date'];
$.each(inputTypes, function(index, value){
input.setAttribute('type', value);
features[value]=input.type!=='text';
});
return features;
};
$(function(){
_wpcf7.supportHtml5=$.wpcf7SupportHtml5();
$('div.wpcf7 > form').wpcf7InitForm();
});
})(jQuery);