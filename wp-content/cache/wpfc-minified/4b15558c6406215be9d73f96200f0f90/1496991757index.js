!function(a){"function"==typeof define&&define.amd?define(["jquery","./core","./widget","./position"],a):a(jQuery)}(function(a){return a.widget("ui.menu",{version:"1.11.4",defaultElement:"<ul>",delay:300,options:{icons:{submenu:"ui-icon-carat-1-e"},items:"> *",menus:"ul",position:{my:"left-1 top",at:"right top"},role:"menu",blur:null,focus:null,select:null},_create:function(){this.activeMenu=this.element,this.mouseHandled=!1,this.element.uniqueId().addClass("ui-menu ui-widget ui-widget-content").toggleClass("ui-menu-icons",!!this.element.find(".ui-icon").length).attr({role:this.options.role,tabIndex:0}),this.options.disabled&&this.element.addClass("ui-state-disabled").attr("aria-disabled","true"),this._on({"mousedown .ui-menu-item":function(a){a.preventDefault()},"click .ui-menu-item":function(b){var c=a(b.target);!this.mouseHandled&&c.not(".ui-state-disabled").length&&(this.select(b),b.isPropagationStopped()||(this.mouseHandled=!0),c.has(".ui-menu").length?this.expand (b):!this.element.is(":focus")&&a(this.document[0].activeElement).closest(".ui-menu").length&&(this.element.trigger("focus",[!0]),this.active&&1===this.active.parents(".ui-menu").length&&clearTimeout(this.timer)))},"mouseenter .ui-menu-item":function(b){if(!this.previousFilter){var c=a(b.currentTarget);c.siblings(".ui-state-active").removeClass("ui-state-active"),this.focus(b,c)}},mouseleave:"collapseAll","mouseleave .ui-menu":"collapseAll",focus:function(a,b){var c=this.active||this.element.find(this.options.items).eq(0);b||this.focus(a,c)},blur:function(b){this._delay(function(){a.contains(this.element[0],this.document[0].activeElement)||this.collapseAll(b)})},keydown:"_keydown"}),this.refresh(),this._on(this.document,{click:function(a){this._closeOnDocumentClick(a)&&this.collapseAll(a),this.mouseHandled=!1}})},_destroy:function(){this.element.removeAttr("aria-activedescendant").find(".ui-menu").addBack().removeClass("ui-menu ui-widget ui-widget-content ui-menu-icons ui-front").removeAttr("role").removeAttr("tabIndex").removeAttr("aria-labelledby").removeAttr("aria-expanded").removeAttr("aria-hidden").removeAttr("aria-disabled").removeUniqueId().show(),this.element.find(".ui-menu-item").removeClass("ui-menu-item").removeAttr("role").removeAttr("aria-disabled").removeUniqueId().removeClass("ui-state-hover").removeAttr("tabIndex").removeAttr("role").removeAttr("aria-haspopup").children().each(function(){var b=a(this);b.data("ui-menu-submenu-carat")&&b.remove()}),this.element.find(".ui-menu-divider").removeClass("ui-menu-divider ui-widget-content")},_keydown:function(b){var c,d,e,f,g=!0;switch(b.keyCode){case a.ui.keyCode.PAGE_UP:this.previousPage(b);break;case a.ui.keyCode.PAGE_DOWN:this.nextPage(b);break;case a.ui.keyCode.HOME:this._move("first","first",b);break;case a.ui.keyCode.END:this._move("last","last",b);break;case a.ui.keyCode.UP:this.previous(b);break;case a.ui.keyCode.DOWN:this.next(b);break;case a.ui.keyCode.LEFT:this.collapse(b);break;case a.ui.keyCode.RIGHT:this.active&&!this.active.is(".ui-state-disabled")&&this.expand (b);break;case a.ui.keyCode.ENTER:case a.ui.keyCode.SPACE:this._activate(b);break;case a.ui.keyCode.ESCAPE:this.collapse(b);break;default:g=!1,d=this.previousFilter||"",e=String.fromCharCode(b.keyCode),f=!1,clearTimeout(this.filterTimer),e===d?f=!0:e=d+e,c=this._filterMenuItems(e),c=f&&c.index(this.active.next())!==-1?this.active.nextAll(".ui-menu-item"):c,c.length||(e=String.fromCharCode(b.keyCode),c=this._filterMenuItems(e)),c.length?(this.focus(b,c),this.previousFilter=e,this.filterTimer=this._delay(function(){delete this.previousFilter},1e3)):delete this.previousFilter}g&&b.preventDefault()},_activate:function(a){this.active.is(".ui-state-disabled")||(this.active.is("[aria-haspopup='true']")?this.expand (a):this.select(a))},refresh:function(){var b,c,d=this,e=this.options.icons.submenu,f=this.element.find(this.options.menus);this.element.toggleClass("ui-menu-icons",!!this.element.find(".ui-icon").length),f.filter(":not(.ui-menu)").addClass("ui-menu ui-widget ui-widget-content ui-front").hide().attr({role:this.options.role,"aria-hidden":"true","aria-expanded":"false"}).each(function(){var b=a(this),c=b.parent(),d=a("<span>").addClass("ui-menu-icon ui-icon "+e).data("ui-menu-submenu-carat",!0);c.attr("aria-haspopup","true").prepend(d),b.attr("aria-labelledby",c.attr("id"))}),b=f.add(this.element),c=b.find(this.options.items),c.not(".ui-menu-item").each(function(){var b=a(this);d._isDivider(b)&&b.addClass("ui-widget-content ui-menu-divider")}),c.not(".ui-menu-item, .ui-menu-divider").addClass("ui-menu-item").uniqueId().attr({tabIndex:-1,role:this._itemRole()}),c.filter(".ui-state-disabled").attr("aria-disabled","true"),this.active&&!a.contains(this.element[0],this.active[0])&&this.blur()},_itemRole:function(){return{menu:"menuitem",listbox:"option"}[this.options.role]},_setOption:function(a,b){"icons"===a&&this.element.find(".ui-menu-icon").removeClass(this.options.icons.submenu).addClass(b.submenu),"disabled"===a&&this.element.toggleClass("ui-state-disabled",!!b).attr("aria-disabled",b),this._super(a,b)},focus:function(a,b){var c,d;this.blur(a,a&&"focus"===a.type),this._scrollIntoView(b),this.active=b.first(),d=this.active.addClass("ui-state-focus").removeClass("ui-state-active"),this.options.role&&this.element.attr("aria-activedescendant",d.attr("id")),this.active.parent().closest(".ui-menu-item").addClass("ui-state-active"),a&&"keydown"===a.type?this._close():this.timer=this._delay(function(){this._close()},this.delay),c=b.children(".ui-menu"),c.length&&a&&/^mouse/.test(a.type)&&this._startOpening(c),this.activeMenu=b.parent(),this._trigger("focus",a,{item:b})},_scrollIntoView:function(b){var c,d,e,f,g,h;this._hasScroll()&&(c=parseFloat(a.css(this.activeMenu[0],"borderTopWidth"))||0,d=parseFloat(a.css(this.activeMenu[0],"paddingTop"))||0,e=b.offset().top-this.activeMenu.offset().top-c-d,f=this.activeMenu.scrollTop(),g=this.activeMenu.height(),h=b.outerHeight(),e<0?this.activeMenu.scrollTop(f+e):e+h>g&&this.activeMenu.scrollTop(f+e-g+h))},blur:function(a,b){b||clearTimeout(this.timer),this.active&&(this.active.removeClass("ui-state-focus"),this.active=null,this._trigger("blur",a,{item:this.active}))},_startOpening:function(a){clearTimeout(this.timer),"true"===a.attr("aria-hidden")&&(this.timer=this._delay(function(){this._close(),this._open(a)},this.delay))},_open:function(b){var c=a.extend({of:this.active},this.options.position);clearTimeout(this.timer),this.element.find(".ui-menu").not(b.parents(".ui-menu")).hide().attr("aria-hidden","true"),b.show().removeAttr("aria-hidden").attr("aria-expanded","true").position(c)},collapseAll:function(b,c){clearTimeout(this.timer),this.timer=this._delay(function(){var d=c?this.element:a(b&&b.target).closest(this.element.find(".ui-menu"));d.length||(d=this.element),this._close(d),this.blur(b),this.activeMenu=d},this.delay)},_close:function(a){a||(a=this.active?this.active.parent():this.element),a.find(".ui-menu").hide().attr("aria-hidden","true").attr("aria-expanded","false").end().find(".ui-state-active").not(".ui-state-focus").removeClass("ui-state-active")},_closeOnDocumentClick:function(b){return!a(b.target).closest(".ui-menu").length},_isDivider:function(a){return!/[^\-\u2014\u2013\s]/.test(a.text())},collapse:function(a){var b=this.active&&this.active.parent().closest(".ui-menu-item",this.element);b&&b.length&&(this._close(),this.focus(a,b))},expand:function(a){var b=this.active&&this.active.children(".ui-menu ").find(this.options.items).first();b&&b.length&&(this._open(b.parent()),this._delay(function(){this.focus(a,b)}))},next:function(a){this._move("next","first",a)},previous:function(a){this._move("prev","last",a)},isFirstItem:function(){return this.active&&!this.active.prevAll(".ui-menu-item").length},isLastItem:function(){return this.active&&!this.active.nextAll(".ui-menu-item").length},_move:function(a,b,c){var d;this.active&&(d="first"===a||"last"===a?this.active["first"===a?"prevAll":"nextAll"](".ui-menu-item").eq(-1):this.active[a+"All"](".ui-menu-item").eq(0)),d&&d.length&&this.active||(d=this.activeMenu.find(this.options.items)[b]()),this.focus(c,d)},nextPage:function(b){var c,d,e;return this.active?void(this.isLastItem()||(this._hasScroll()?(d=this.active.offset().top,e=this.element.height(),this.active.nextAll(".ui-menu-item").each(function(){return c=a(this),c.offset().top-d-e<0}),this.focus(b,c)):this.focus(b,this.activeMenu.find(this.options.items)[this.active?"last":"first"]()))):void this.next(b)},previousPage:function(b){var c,d,e;return this.active?void(this.isFirstItem()||(this._hasScroll()?(d=this.active.offset().top,e=this.element.height(),this.active.prevAll(".ui-menu-item").each(function(){return c=a(this),c.offset().top-d+e>0}),this.focus(b,c)):this.focus(b,this.activeMenu.find(this.options.items).first()))):void this.next(b)},_hasScroll:function(){return this.element.outerHeight()<this.element.prop("scrollHeight")},select:function(b){this.active=this.active||a(b.target).closest(".ui-menu-item");var c={item:this.active};this.active.has(".ui-menu").length||this.collapseAll(b,!0),this._trigger("select",b,c)},_filterMenuItems:function(b){var c=b.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&"),d=new RegExp("^"+c,"i");return this.activeMenu.find(this.options.items).filter(".ui-menu-item").filter(function(){return d.test(a.trim(a(this).text()))})}})});
window.wp=window.wp||{},function(a,b){"use strict";function c(a,c){e(),a=b("<p>").html(a).text(),g&&"assertive"===c?g.text(a):f&&f.text(a)}function d(a){a=a||"polite";var c=b("<div>",{id:"wp-a11y-speak-"+a,"aria-live":a,"aria-relevant":"additions text","aria-atomic":"true","class":"screen-reader-text wp-a11y-speak-region"});return b(document.body).append(c),c}function e(){b(".wp-a11y-speak-region").text("")}var f,g;b(document).ready(function(){f=b("#wp-a11y-speak-polite"),g=b("#wp-a11y-speak-assertive"),f.length||(f=d("polite")),g.length||(g=d("assertive"))}),a.a11y=a.a11y||{},a.a11y.speak=c}(window.wp,window.jQuery);
!function(a){"function"==typeof define&&define.amd?define(["jquery","./core","./widget","./position","./menu"],a):a(jQuery)}(function(a){return a.widget("ui.autocomplete",{version:"1.11.4",defaultElement:"<input>",options:{appendTo:null,autoFocus:!1,delay:300,minLength:1,position:{my:"left top",at:"left bottom",collision:"none"},source:null,change:null,close:null,focus:null,open:null,response:null,search:null,select:null},requestIndex:0,pending:0,_create:function(){var b,c,d,e=this.element[0].nodeName.toLowerCase(),f="textarea"===e,g="input"===e;this.isMultiLine=!!f||!g&&this.element.prop("isContentEditable"),this.valueMethod=this.element[f||g?"val":"text"],this.isNewMenu=!0,this.element.addClass("ui-autocomplete-input").attr("autocomplete","off"),this._on(this.element,{keydown:function(e){if(this.element.prop("readOnly"))return b=!0,d=!0,void(c=!0);b=!1,d=!1,c=!1;var f=a.ui.keyCode;switch(e.keyCode){case f.PAGE_UP:b=!0,this._move("previousPage",e);break;case f.PAGE_DOWN:b=!0,this._move("nextPage",e);break;case f.UP:b=!0,this._keyEvent("previous",e);break;case f.DOWN:b=!0,this._keyEvent("next",e);break;case f.ENTER:this.menu.active&&(b=!0,e.preventDefault(),this.menu.select(e));break;case f.TAB:this.menu.active&&this.menu.select(e);break;case f.ESCAPE:this.menu.element.is(":visible")&&(this.isMultiLine||this._value(this.term),this.close(e),e.preventDefault());break;default:c=!0,this._searchTimeout(e)}},keypress:function(d){if(b)return b=!1,void(this.isMultiLine&&!this.menu.element.is(":visible")||d.preventDefault());if(!c){var e=a.ui.keyCode;switch(d.keyCode){case e.PAGE_UP:this._move("previousPage",d);break;case e.PAGE_DOWN:this._move("nextPage",d);break;case e.UP:this._keyEvent("previous",d);break;case e.DOWN:this._keyEvent("next",d)}}},input:function(a){return d?(d=!1,void a.preventDefault()):void this._searchTimeout(a)},focus:function(){this.selectedItem=null,this.previous=this._value()},blur:function(a){return this.cancelBlur?void delete this.cancelBlur:(clearTimeout(this.searching),this.close(a),void this._change(a))}}),this._initSource(),this.menu=a("<ul>").addClass("ui-autocomplete ui-front").appendTo(this._appendTo()).menu({role:null}).hide().menu("instance"),this._on(this.menu.element,{mousedown:function(b){b.preventDefault(),this.cancelBlur=!0,this._delay(function(){delete this.cancelBlur});var c=this.menu.element[0];a(b.target).closest(".ui-menu-item").length||this._delay(function(){var b=this;this.document.one("mousedown",function(d){d.target===b.element[0]||d.target===c||a.contains(c,d.target)||b.close()})})},menufocus:function(b,c){var d,e;return this.isNewMenu&&(this.isNewMenu=!1,b.originalEvent&&/^mouse/.test(b.originalEvent.type))?(this.menu.blur(),void this.document.one("mousemove",function(){a(b.target).trigger(b.originalEvent)})):(e=c.item.data("ui-autocomplete-item"),!1!==this._trigger("focus",b,{item:e})&&b.originalEvent&&/^key/.test(b.originalEvent.type)&&this._value(e.value),d=c.item.attr("aria-label")||e.value,void(d&&a.trim(d).length&&(this.liveRegion.children().hide(),a("<div>").text(d).appendTo(this.liveRegion))))},menuselect:function(a,b){var c=b.item.data("ui-autocomplete-item"),d=this.previous;this.element[0]!==this.document[0].activeElement&&(this.element.focus(),this.previous=d,this._delay(function(){this.previous=d,this.selectedItem=c})),!1!==this._trigger("select",a,{item:c})&&this._value(c.value),this.term=this._value(),this.close(a),this.selectedItem=c}}),this.liveRegion=a("<span>",{role:"status","aria-live":"assertive","aria-relevant":"additions"}).addClass("ui-helper-hidden-accessible").appendTo(this.document[0].body),this._on(this.window,{beforeunload:function(){this.element.removeAttr("autocomplete")}})},_destroy:function(){clearTimeout(this.searching),this.element.removeClass("ui-autocomplete-input").removeAttr("autocomplete"),this.menu.element.remove(),this.liveRegion.remove()},_setOption:function(a,b){this._super(a,b),"source"===a&&this._initSource(),"appendTo"===a&&this.menu.element.appendTo(this._appendTo()),"disabled"===a&&b&&this.xhr&&this.xhr.abort()},_appendTo:function(){var b=this.options.appendTo;return b&&(b=b.jquery||b.nodeType?a(b):this.document.find(b).eq(0)),b&&b[0]||(b=this.element.closest(".ui-front")),b.length||(b=this.document[0].body),b},_initSource:function(){var b,c,d=this;a.isArray(this.options.source)?(b=this.options.source,this.source=function(c,d){d(a.ui.autocomplete.filter(b,c.term))}):"string"==typeof this.options.source?(c=this.options.source,this.source=function(b,e){d.xhr&&d.xhr.abort(),d.xhr=a.ajax({url:c,data:b,dataType:"json",success:function(a){e(a)},error:function(){e([])}})}):this.source=this.options.source},_searchTimeout:function(a){clearTimeout(this.searching),this.searching=this._delay(function(){var b=this.term===this._value(),c=this.menu.element.is(":visible"),d=a.altKey||a.ctrlKey||a.metaKey||a.shiftKey;b&&(!b||c||d)||(this.selectedItem=null,this.search(null,a))},this.options.delay)},search:function(a,b){return a=null!=a?a:this._value(),this.term=this._value(),a.length<this.options.minLength?this.close(b):this._trigger("search",b)!==!1?this._search(a):void 0},_search:function(a){this.pending++,this.element.addClass("ui-autocomplete-loading"),this.cancelSearch=!1,this.source({term:a},this._response())},_response:function(){var b=++this.requestIndex;return a.proxy(function(a){b===this.requestIndex&&this.__response(a),this.pending--,this.pending||this.element.removeClass("ui-autocomplete-loading")},this)},__response:function(a){a&&(a=this._normalize(a)),this._trigger("response",null,{content:a}),!this.options.disabled&&a&&a.length&&!this.cancelSearch?(this._suggest(a),this._trigger("open")):this._close()},close:function(a){this.cancelSearch=!0,this._close(a)},_close:function(a){this.menu.element.is(":visible")&&(this.menu.element.hide(),this.menu.blur(),this.isNewMenu=!0,this._trigger("close",a))},_change:function(a){this.previous!==this._value()&&this._trigger("change",a,{item:this.selectedItem})},_normalize:function(b){return b.length&&b[0].label&&b[0].value?b:a.map(b,function(b){return"string"==typeof b?{label:b,value:b}:a.extend({},b,{label:b.label||b.value,value:b.value||b.label})})},_suggest:function(b){var c=this.menu.element.empty();this._renderMenu(c,b),this.isNewMenu=!0,this.menu.refresh(),c.show(),this._resizeMenu(),c.position(a.extend({of:this.element},this.options.position)),this.options.autoFocus&&this.menu.next()},_resizeMenu:function(){var a=this.menu.element;a.outerWidth(Math.max(a.width("").outerWidth()+1,this.element.outerWidth()))},_renderMenu:function(b,c){var d=this;a.each(c,function(a,c){d._renderItemData(b,c)})},_renderItemData:function(a,b){return this._renderItem(a,b).data("ui-autocomplete-item",b)},_renderItem:function(b,c){return a("<li>").text(c.label).appendTo(b)},_move:function(a,b){return this.menu.element.is(":visible")?this.menu.isFirstItem()&&/^previous/.test(a)||this.menu.isLastItem()&&/^next/.test(a)?(this.isMultiLine||this._value(this.term),void this.menu.blur()):void this.menu[a](b):void this.search(null,b)},widget:function(){return this.menu.element},_value:function(){return this.valueMethod.apply(this.element,arguments)},_keyEvent:function(a,b){this.isMultiLine&&!this.menu.element.is(":visible")||(this._move(a,b),b.preventDefault())}}),a.extend(a.ui.autocomplete,{escapeRegex:function(a){return a.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&")},filter:function(b,c){var d=new RegExp(a.ui.autocomplete.escapeRegex(c),"i");return a.grep(b,function(a){return d.test(a.label||a.value||a)})}}),a.widget("ui.autocomplete",a.ui.autocomplete,{options:{messages:{noResults:"No search results.",results:function(a){return a+(a>1?" results are":" result is")+" available, use up and down arrow keys to navigate."}}},__response:function(b){var c;this._superApply(arguments),this.options.disabled||this.cancelSearch||(c=b&&b.length?this.options.messages.results(b.length):this.options.messages.noResults,this.liveRegion.children().hide(),a("<div>").text(c).appendTo(this.liveRegion))}}),a.ui.autocomplete});
!function(a){"function"==typeof define&&define.amd?define(["jquery","./core","./mouse","./widget"],a):a(jQuery)}(function(a){return a.widget("ui.resizable",a.ui.mouse,{version:"1.11.4",widgetEventPrefix:"resize",options:{alsoResize:!1,animate:!1,animateDuration:"slow",animateEasing:"swing",aspectRatio:!1,autoHide:!1,containment:!1,ghost:!1,grid:!1,handles:"e,s,se",helper:!1,maxHeight:null,maxWidth:null,minHeight:10,minWidth:10,zIndex:90,resize:null,start:null,stop:null},_num:function(a){return parseInt(a,10)||0},_isNumber:function(a){return!isNaN(parseInt(a,10))},_hasScroll:function(b,c){if("hidden"===a(b).css("overflow"))return!1;var d=c&&"left"===c?"scrollLeft":"scrollTop",e=!1;return b[d]>0||(b[d]=1,e=b[d]>0,b[d]=0,e)},_create:function(){var b,c,d,e,f,g=this,h=this.options;if(this.element.addClass("ui-resizable"),a.extend(this,{_aspectRatio:!!h.aspectRatio,aspectRatio:h.aspectRatio,originalElement:this.element,_proportionallyResizeElements:[],_helper:h.helper||h.ghost||h.animate?h.helper||"ui-resizable-helper":null}),this.element[0].nodeName.match(/^(canvas|textarea|input|select|button|img)$/i)&&(this.element.wrap(a("<div class='ui-wrapper' style='overflow: hidden;'></div>").css({position:this.element.css("position"),width:this.element.outerWidth(),height:this.element.outerHeight(),top:this.element.css("top"),left:this.element.css("left")})),this.element=this.element.parent().data("ui-resizable",this.element.resizable("instance")),this.elementIsWrapper=!0,this.element.css({marginLeft:this.originalElement.css("marginLeft"),marginTop:this.originalElement.css("marginTop"),marginRight:this.originalElement.css("marginRight"),marginBottom:this.originalElement.css("marginBottom")}),this.originalElement.css({marginLeft:0,marginTop:0,marginRight:0,marginBottom:0}),this.originalResizeStyle=this.originalElement.css("resize"),this.originalElement.css("resize","none"),this._proportionallyResizeElements.push(this.originalElement.css({position:"static",zoom:1,display:"block"})),this.originalElement.css({margin:this.originalElement.css("margin")}),this._proportionallyResize()),this.handles=h.handles||(a(".ui-resizable-handle",this.element).length?{n:".ui-resizable-n",e:".ui-resizable-e",s:".ui-resizable-s",w:".ui-resizable-w",se:".ui-resizable-se",sw:".ui-resizable-sw",ne:".ui-resizable-ne",nw:".ui-resizable-nw"}:"e,s,se"),this._handles=a(),this.handles.constructor===String)for("all"===this.handles&&(this.handles="n,e,s,w,se,sw,ne,nw"),b=this.handles.split(","),this.handles={},c=0;c<b.length;c++)d=a.trim(b[c]),f="ui-resizable-"+d,e=a("<div class='ui-resizable-handle "+f+"'></div>"),e.css({zIndex:h.zIndex}),"se"===d&&e.addClass("ui-icon ui-icon-gripsmall-diagonal-se"),this.handles[d]=".ui-resizable-"+d,this.element.append(e);this._renderAxis=function(b){var c,d,e,f;b=b||this.element;for(c in this.handles)this.handles[c].constructor===String?this.handles[c]=this.element.children(this.handles[c]).first().show():(this.handles[c].jquery||this.handles[c].nodeType)&&(this.handles[c]=a(this.handles[c]),this._on(this.handles[c],{mousedown:g._mouseDown})),this.elementIsWrapper&&this.originalElement[0].nodeName.match(/^(textarea|input|select|button)$/i)&&(d=a(this.handles[c],this.element),f=/sw|ne|nw|se|n|s/.test(c)?d.outerHeight():d.outerWidth(),e=["padding",/ne|nw|n/.test(c)?"Top":/se|sw|s/.test(c)?"Bottom":/^e$/.test(c)?"Right":"Left"].join(""),b.css(e,f),this._proportionallyResize()),this._handles=this._handles.add(this.handles[c])},this._renderAxis(this.element),this._handles=this._handles.add(this.element.find(".ui-resizable-handle")),this._handles.disableSelection(),this._handles.mouseover(function(){g.resizing||(this.className&&(e=this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i)),g.axis=e&&e[1]?e[1]:"se")}),h.autoHide&&(this._handles.hide(),a(this.element).addClass("ui-resizable-autohide").mouseenter(function(){h.disabled||(a(this).removeClass("ui-resizable-autohide"),g._handles.show())}).mouseleave(function(){h.disabled||g.resizing||(a(this).addClass("ui-resizable-autohide"),g._handles.hide())})),this._mouseInit()},_destroy:function(){this._mouseDestroy();var b,c=function(b){a(b).removeClass("ui-resizable ui-resizable-disabled ui-resizable-resizing").removeData("resizable").removeData("ui-resizable").unbind(".resizable").find(".ui-resizable-handle").remove()};return this.elementIsWrapper&&(c(this.element),b=this.element,this.originalElement.css({position:b.css("position"),width:b.outerWidth(),height:b.outerHeight(),top:b.css("top"),left:b.css("left")}).insertAfter(b),b.remove()),this.originalElement.css("resize",this.originalResizeStyle),c(this.originalElement),this},_mouseCapture:function(b){var c,d,e=!1;for(c in this.handles)d=a(this.handles[c])[0],(d===b.target||a.contains(d,b.target))&&(e=!0);return!this.options.disabled&&e},_mouseStart:function(b){var c,d,e,f=this.options,g=this.element;return this.resizing=!0,this._renderProxy(),c=this._num(this.helper.css("left")),d=this._num(this.helper.css("top")),f.containment&&(c+=a(f.containment).scrollLeft()||0,d+=a(f.containment).scrollTop()||0),this.offset=this.helper.offset(),this.position={left:c,top:d},this.size=this._helper?{width:this.helper.width(),height:this.helper.height()}:{width:g.width(),height:g.height()},this.originalSize=this._helper?{width:g.outerWidth(),height:g.outerHeight()}:{width:g.width(),height:g.height()},this.sizeDiff={width:g.outerWidth()-g.width(),height:g.outerHeight()-g.height()},this.originalPosition={left:c,top:d},this.originalMousePosition={left:b.pageX,top:b.pageY},this.aspectRatio="number"==typeof f.aspectRatio?f.aspectRatio:this.originalSize.width/this.originalSize.height||1,e=a(".ui-resizable-"+this.axis).css("cursor"),a("body").css("cursor","auto"===e?this.axis+"-resize":e),g.addClass("ui-resizable-resizing"),this._propagate("start",b),!0},_mouseDrag:function(b){var c,d,e=this.originalMousePosition,f=this.axis,g=b.pageX-e.left||0,h=b.pageY-e.top||0,i=this._change[f];return this._updatePrevProperties(),!!i&&(c=i.apply(this,[b,g,h]),this._updateVirtualBoundaries(b.shiftKey),(this._aspectRatio||b.shiftKey)&&(c=this._updateRatio(c,b)),c=this._respectSize(c,b),this._updateCache(c),this._propagate("resize",b),d=this._applyChanges(),!this._helper&&this._proportionallyResizeElements.length&&this._proportionallyResize(),a.isEmptyObject(d)||(this._updatePrevProperties(),this._trigger("resize",b,this.ui()),this._applyChanges()),!1)},_mouseStop:function(b){this.resizing=!1;var c,d,e,f,g,h,i,j=this.options,k=this;return this._helper&&(c=this._proportionallyResizeElements,d=c.length&&/textarea/i.test(c[0].nodeName),e=d&&this._hasScroll(c[0],"left")?0:k.sizeDiff.height,f=d?0:k.sizeDiff.width,g={width:k.helper.width()-f,height:k.helper.height()-e},h=parseInt(k.element.css("left"),10)+(k.position.left-k.originalPosition.left)||null,i=parseInt(k.element.css("top"),10)+(k.position.top-k.originalPosition.top)||null,j.animate||this.element.css(a.extend(g,{top:i,left:h})),k.helper.height(k.size.height),k.helper.width(k.size.width),this._helper&&!j.animate&&this._proportionallyResize()),a("body").css("cursor","auto"),this.element.removeClass("ui-resizable-resizing"),this._propagate("stop",b),this._helper&&this.helper.remove(),!1},_updatePrevProperties:function(){this.prevPosition={top:this.position.top,left:this.position.left},this.prevSize={width:this.size.width,height:this.size.height}},_applyChanges:function(){var a={};return this.position.top!==this.prevPosition.top&&(a.top=this.position.top+"px"),this.position.left!==this.prevPosition.left&&(a.left=this.position.left+"px"),this.size.width!==this.prevSize.width&&(a.width=this.size.width+"px"),this.size.height!==this.prevSize.height&&(a.height=this.size.height+"px"),this.helper.css(a),a},_updateVirtualBoundaries:function(a){var b,c,d,e,f,g=this.options;f={minWidth:this._isNumber(g.minWidth)?g.minWidth:0,maxWidth:this._isNumber(g.maxWidth)?g.maxWidth:1/0,minHeight:this._isNumber(g.minHeight)?g.minHeight:0,maxHeight:this._isNumber(g.maxHeight)?g.maxHeight:1/0},(this._aspectRatio||a)&&(b=f.minHeight*this.aspectRatio,d=f.minWidth/this.aspectRatio,c=f.maxHeight*this.aspectRatio,e=f.maxWidth/this.aspectRatio,b>f.minWidth&&(f.minWidth=b),d>f.minHeight&&(f.minHeight=d),c<f.maxWidth&&(f.maxWidth=c),e<f.maxHeight&&(f.maxHeight=e)),this._vBoundaries=f},_updateCache:function(a){this.offset=this.helper.offset(),this._isNumber(a.left)&&(this.position.left=a.left),this._isNumber(a.top)&&(this.position.top=a.top),this._isNumber(a.height)&&(this.size.height=a.height),this._isNumber(a.width)&&(this.size.width=a.width)},_updateRatio:function(a){var b=this.position,c=this.size,d=this.axis;return this._isNumber(a.height)?a.width=a.height*this.aspectRatio:this._isNumber(a.width)&&(a.height=a.width/this.aspectRatio),"sw"===d&&(a.left=b.left+(c.width-a.width),a.top=null),"nw"===d&&(a.top=b.top+(c.height-a.height),a.left=b.left+(c.width-a.width)),a},_respectSize:function(a){var b=this._vBoundaries,c=this.axis,d=this._isNumber(a.width)&&b.maxWidth&&b.maxWidth<a.width,e=this._isNumber(a.height)&&b.maxHeight&&b.maxHeight<a.height,f=this._isNumber(a.width)&&b.minWidth&&b.minWidth>a.width,g=this._isNumber(a.height)&&b.minHeight&&b.minHeight>a.height,h=this.originalPosition.left+this.originalSize.width,i=this.position.top+this.size.height,j=/sw|nw|w/.test(c),k=/nw|ne|n/.test(c);return f&&(a.width=b.minWidth),g&&(a.height=b.minHeight),d&&(a.width=b.maxWidth),e&&(a.height=b.maxHeight),f&&j&&(a.left=h-b.minWidth),d&&j&&(a.left=h-b.maxWidth),g&&k&&(a.top=i-b.minHeight),e&&k&&(a.top=i-b.maxHeight),a.width||a.height||a.left||!a.top?a.width||a.height||a.top||!a.left||(a.left=null):a.top=null,a},_getPaddingPlusBorderDimensions:function(a){for(var b=0,c=[],d=[a.css("borderTopWidth"),a.css("borderRightWidth"),a.css("borderBottomWidth"),a.css("borderLeftWidth")],e=[a.css("paddingTop"),a.css("paddingRight"),a.css("paddingBottom"),a.css("paddingLeft")];b<4;b++)c[b]=parseInt(d[b],10)||0,c[b]+=parseInt(e[b],10)||0;return{height:c[0]+c[2],width:c[1]+c[3]}},_proportionallyResize:function(){if(this._proportionallyResizeElements.length)for(var a,b=0,c=this.helper||this.element;b<this._proportionallyResizeElements.length;b++)a=this._proportionallyResizeElements[b],this.outerDimensions||(this.outerDimensions=this._getPaddingPlusBorderDimensions(a)),a.css({height:c.height()-this.outerDimensions.height||0,width:c.width()-this.outerDimensions.width||0})},_renderProxy:function(){var b=this.element,c=this.options;this.elementOffset=b.offset(),this._helper?(this.helper=this.helper||a("<div style='overflow:hidden;'></div>"),this.helper.addClass(this._helper).css({width:this.element.outerWidth()-1,height:this.element.outerHeight()-1,position:"absolute",left:this.elementOffset.left+"px",top:this.elementOffset.top+"px",zIndex:++c.zIndex}),this.helper.appendTo("body").disableSelection()):this.helper=this.element},_change:{e:function(a,b){return{width:this.originalSize.width+b}},w:function(a,b){var c=this.originalSize,d=this.originalPosition;return{left:d.left+b,width:c.width-b}},n:function(a,b,c){var d=this.originalSize,e=this.originalPosition;return{top:e.top+c,height:d.height-c}},s:function(a,b,c){return{height:this.originalSize.height+c}},se:function(b,c,d){return a.extend(this._change.s.apply(this,arguments),this._change.e.apply(this,[b,c,d]))},sw:function(b,c,d){return a.extend(this._change.s.apply(this,arguments),this._change.w.apply(this,[b,c,d]))},ne:function(b,c,d){return a.extend(this._change.n.apply(this,arguments),this._change.e.apply(this,[b,c,d]))},nw:function(b,c,d){return a.extend(this._change.n.apply(this,arguments),this._change.w.apply(this,[b,c,d]))}},_propagate:function(b,c){a.ui.plugin.call(this,b,[c,this.ui()]),"resize"!==b&&this._trigger(b,c,this.ui())},plugins:{},ui:function(){return{originalElement:this.originalElement,element:this.element,helper:this.helper,position:this.position,size:this.size,originalSize:this.originalSize,originalPosition:this.originalPosition}}}),a.ui.plugin.add("resizable","animate",{stop:function(b){var c=a(this).resizable("instance"),d=c.options,e=c._proportionallyResizeElements,f=e.length&&/textarea/i.test(e[0].nodeName),g=f&&c._hasScroll(e[0],"left")?0:c.sizeDiff.height,h=f?0:c.sizeDiff.width,i={width:c.size.width-h,height:c.size.height-g},j=parseInt(c.element.css("left"),10)+(c.position.left-c.originalPosition.left)||null,k=parseInt(c.element.css("top"),10)+(c.position.top-c.originalPosition.top)||null;c.element.animate(a.extend(i,k&&j?{top:k,left:j}:{}),{duration:d.animateDuration,easing:d.animateEasing,step:function(){var d={width:parseInt(c.element.css("width"),10),height:parseInt(c.element.css("height"),10),top:parseInt(c.element.css("top"),10),left:parseInt(c.element.css("left"),10)};e&&e.length&&a(e[0]).css({width:d.width,height:d.height}),c._updateCache(d),c._propagate("resize",b)}})}}),a.ui.plugin.add("resizable","containment",{start:function(){var b,c,d,e,f,g,h,i=a(this).resizable("instance"),j=i.options,k=i.element,l=j.containment,m=l instanceof a?l.get(0):/parent/.test(l)?k.parent().get(0):l;m&&(i.containerElement=a(m),/document/.test(l)||l===document?(i.containerOffset={left:0,top:0},i.containerPosition={left:0,top:0},i.parentData={element:a(document),left:0,top:0,width:a(document).width(),height:a(document).height()||document.body.parentNode.scrollHeight}):(b=a(m),c=[],a(["Top","Right","Left","Bottom"]).each(function(a,d){c[a]=i._num(b.css("padding"+d))}),i.containerOffset=b.offset(),i.containerPosition=b.position(),i.containerSize={height:b.innerHeight()-c[3],width:b.innerWidth()-c[1]},d=i.containerOffset,e=i.containerSize.height,f=i.containerSize.width,g=i._hasScroll(m,"left")?m.scrollWidth:f,h=i._hasScroll(m)?m.scrollHeight:e,i.parentData={element:m,left:d.left,top:d.top,width:g,height:h}))},resize:function(b){var c,d,e,f,g=a(this).resizable("instance"),h=g.options,i=g.containerOffset,j=g.position,k=g._aspectRatio||b.shiftKey,l={top:0,left:0},m=g.containerElement,n=!0;m[0]!==document&&/static/.test(m.css("position"))&&(l=i),j.left<(g._helper?i.left:0)&&(g.size.width=g.size.width+(g._helper?g.position.left-i.left:g.position.left-l.left),k&&(g.size.height=g.size.width/g.aspectRatio,n=!1),g.position.left=h.helper?i.left:0),j.top<(g._helper?i.top:0)&&(g.size.height=g.size.height+(g._helper?g.position.top-i.top:g.position.top),k&&(g.size.width=g.size.height*g.aspectRatio,n=!1),g.position.top=g._helper?i.top:0),e=g.containerElement.get(0)===g.element.parent().get(0),f=/relative|absolute/.test(g.containerElement.css("position")),e&&f?(g.offset.left=g.parentData.left+g.position.left,g.offset.top=g.parentData.top+g.position.top):(g.offset.left=g.element.offset().left,g.offset.top=g.element.offset().top),c=Math.abs(g.sizeDiff.width+(g._helper?g.offset.left-l.left:g.offset.left-i.left)),d=Math.abs(g.sizeDiff.height+(g._helper?g.offset.top-l.top:g.offset.top-i.top)),c+g.size.width>=g.parentData.width&&(g.size.width=g.parentData.width-c,k&&(g.size.height=g.size.width/g.aspectRatio,n=!1)),d+g.size.height>=g.parentData.height&&(g.size.height=g.parentData.height-d,k&&(g.size.width=g.size.height*g.aspectRatio,n=!1)),n||(g.position.left=g.prevPosition.left,g.position.top=g.prevPosition.top,g.size.width=g.prevSize.width,g.size.height=g.prevSize.height)},stop:function(){var b=a(this).resizable("instance"),c=b.options,d=b.containerOffset,e=b.containerPosition,f=b.containerElement,g=a(b.helper),h=g.offset(),i=g.outerWidth()-b.sizeDiff.width,j=g.outerHeight()-b.sizeDiff.height;b._helper&&!c.animate&&/relative/.test(f.css("position"))&&a(this).css({left:h.left-e.left-d.left,width:i,height:j}),b._helper&&!c.animate&&/static/.test(f.css("position"))&&a(this).css({left:h.left-e.left-d.left,width:i,height:j})}}),a.ui.plugin.add("resizable","alsoResize",{start:function(){var b=a(this).resizable("instance"),c=b.options;a(c.alsoResize).each(function(){var b=a(this);b.data("ui-resizable-alsoresize",{width:parseInt(b.width(),10),height:parseInt(b.height(),10),left:parseInt(b.css("left"),10),top:parseInt(b.css("top"),10)})})},resize:function(b,c){var d=a(this).resizable("instance"),e=d.options,f=d.originalSize,g=d.originalPosition,h={height:d.size.height-f.height||0,width:d.size.width-f.width||0,top:d.position.top-g.top||0,left:d.position.left-g.left||0};a(e.alsoResize).each(function(){var b=a(this),d=a(this).data("ui-resizable-alsoresize"),e={},f=b.parents(c.originalElement[0]).length?["width","height"]:["width","height","top","left"];a.each(f,function(a,b){var c=(d[b]||0)+(h[b]||0);c&&c>=0&&(e[b]=c||null)}),b.css(e)})},stop:function(){a(this).removeData("resizable-alsoresize")}}),a.ui.plugin.add("resizable","ghost",{start:function(){var b=a(this).resizable("instance"),c=b.options,d=b.size;b.ghost=b.originalElement.clone(),b.ghost.css({opacity:.25,display:"block",position:"relative",height:d.height,width:d.width,margin:0,left:0,top:0}).addClass("ui-resizable-ghost").addClass("string"==typeof c.ghost?c.ghost:""),b.ghost.appendTo(b.helper)},resize:function(){var b=a(this).resizable("instance");b.ghost&&b.ghost.css({position:"relative",height:b.size.height,width:b.size.width})},stop:function(){var b=a(this).resizable("instance");b.ghost&&b.helper&&b.helper.get(0).removeChild(b.ghost.get(0))}}),a.ui.plugin.add("resizable","grid",{resize:function(){var b,c=a(this).resizable("instance"),d=c.options,e=c.size,f=c.originalSize,g=c.originalPosition,h=c.axis,i="number"==typeof d.grid?[d.grid,d.grid]:d.grid,j=i[0]||1,k=i[1]||1,l=Math.round((e.width-f.width)/j)*j,m=Math.round((e.height-f.height)/k)*k,n=f.width+l,o=f.height+m,p=d.maxWidth&&d.maxWidth<n,q=d.maxHeight&&d.maxHeight<o,r=d.minWidth&&d.minWidth>n,s=d.minHeight&&d.minHeight>o;d.grid=i,r&&(n+=j),s&&(o+=k),p&&(n-=j),q&&(o-=k),/^(se|s|e)$/.test(h)?(c.size.width=n,c.size.height=o):/^(ne)$/.test(h)?(c.size.width=n,c.size.height=o,c.position.top=g.top-m):/^(sw)$/.test(h)?(c.size.width=n,c.size.height=o,c.position.left=g.left-l):((o-k<=0||n-j<=0)&&(b=c._getPaddingPlusBorderDimensions(this)),o-k>0?(c.size.height=o,c.position.top=g.top-m):(o=k-b.height,c.size.height=o,c.position.top=g.top+f.height-o),n-j>0?(c.size.width=n,c.position.left=g.left-l):(n=j-b.width,c.size.width=n,c.position.left=g.left+f.width-n))}}),a.ui.resizable});
!function(a){"function"==typeof define&&define.amd?define(["jquery","./core","./mouse","./widget"],a):a(jQuery)}(function(a){return a.widget("ui.draggable",a.ui.mouse,{version:"1.11.4",widgetEventPrefix:"drag",options:{addClasses:!0,appendTo:"parent",axis:!1,connectToSortable:!1,containment:!1,cursor:"auto",cursorAt:!1,grid:!1,handle:!1,helper:"original",iframeFix:!1,opacity:!1,refreshPositions:!1,revert:!1,revertDuration:500,scope:"default",scroll:!0,scrollSensitivity:20,scrollSpeed:20,snap:!1,snapMode:"both",snapTolerance:20,stack:!1,zIndex:!1,drag:null,start:null,stop:null},_create:function(){"original"===this.options.helper&&this._setPositionRelative(),this.options.addClasses&&this.element.addClass("ui-draggable"),this.options.disabled&&this.element.addClass("ui-draggable-disabled"),this._setHandleClassName(),this._mouseInit()},_setOption:function(a,b){this._super(a,b),"handle"===a&&(this._removeHandleClassName(),this._setHandleClassName())},_destroy:function(){return(this.helper||this.element).is(".ui-draggable-dragging")?void(this.destroyOnClear=!0):(this.element.removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled"),this._removeHandleClassName(),void this._mouseDestroy())},_mouseCapture:function(b){var c=this.options;return this._blurActiveElement(b),!(this.helper||c.disabled||a(b.target).closest(".ui-resizable-handle").length>0)&&(this.handle=this._getHandle(b),!!this.handle&&(this._blockFrames(c.iframeFix===!0?"iframe":c.iframeFix),!0))},_blockFrames:function(b){this.iframeBlocks=this.document.find(b).map(function(){var b=a(this);return a("<div>").css("position","absolute").appendTo(b.parent()).outerWidth(b.outerWidth()).outerHeight(b.outerHeight()).offset(b.offset())[0]})},_unblockFrames:function(){this.iframeBlocks&&(this.iframeBlocks.remove(),delete this.iframeBlocks)},_blurActiveElement:function(b){var c=this.document[0];if(this.handleElement.is(b.target))try{c.activeElement&&"body"!==c.activeElement.nodeName.toLowerCase()&&a(c.activeElement).blur()}catch(d){}},_mouseStart:function(b){var c=this.options;return this.helper=this._createHelper(b),this.helper.addClass("ui-draggable-dragging"),this._cacheHelperProportions(),a.ui.ddmanager&&(a.ui.ddmanager.current=this),this._cacheMargins(),this.cssPosition=this.helper.css("position"),this.scrollParent=this.helper.scrollParent(!0),this.offsetParent=this.helper.offsetParent(),this.hasFixedAncestor=this.helper.parents().filter(function(){return"fixed"===a(this).css("position")}).length>0,this.positionAbs=this.element.offset(),this._refreshOffsets(b),this.originalPosition=this.position=this._generatePosition(b,!1),this.originalPageX=b.pageX,this.originalPageY=b.pageY,c.cursorAt&&this._adjustOffsetFromHelper(c.cursorAt),this._setContainment(),this._trigger("start",b)===!1?(this._clear(),!1):(this._cacheHelperProportions(),a.ui.ddmanager&&!c.dropBehaviour&&a.ui.ddmanager.prepareOffsets(this,b),this._normalizeRightBottom(),this._mouseDrag(b,!0),a.ui.ddmanager&&a.ui.ddmanager.dragStart(this,b),!0)},_refreshOffsets:function(a){this.offset={top:this.positionAbs.top-this.margins.top,left:this.positionAbs.left-this.margins.left,scroll:!1,parent:this._getParentOffset(),relative:this._getRelativeOffset()},this.offset.click={left:a.pageX-this.offset.left,top:a.pageY-this.offset.top}},_mouseDrag:function(b,c){if(this.hasFixedAncestor&&(this.offset.parent=this._getParentOffset()),this.position=this._generatePosition(b,!0),this.positionAbs=this._convertPositionTo("absolute"),!c){var d=this._uiHash();if(this._trigger("drag",b,d)===!1)return this._mouseUp({}),!1;this.position=d.position}return this.helper[0].style.left=this.position.left+"px",this.helper[0].style.top=this.position.top+"px",a.ui.ddmanager&&a.ui.ddmanager.drag(this,b),!1},_mouseStop:function(b){var c=this,d=!1;return a.ui.ddmanager&&!this.options.dropBehaviour&&(d=a.ui.ddmanager.drop(this,b)),this.dropped&&(d=this.dropped,this.dropped=!1),"invalid"===this.options.revert&&!d||"valid"===this.options.revert&&d||this.options.revert===!0||a.isFunction(this.options.revert)&&this.options.revert.call(this.element,d)?a(this.helper).animate(this.originalPosition,parseInt(this.options.revertDuration,10),function(){c._trigger("stop",b)!==!1&&c._clear()}):this._trigger("stop",b)!==!1&&this._clear(),!1},_mouseUp:function(b){return this._unblockFrames(),a.ui.ddmanager&&a.ui.ddmanager.dragStop(this,b),this.handleElement.is(b.target)&&this.element.focus(),a.ui.mouse.prototype._mouseUp.call(this,b)},cancel:function(){return this.helper.is(".ui-draggable-dragging")?this._mouseUp({}):this._clear(),this},_getHandle:function(b){return!this.options.handle||!!a(b.target).closest(this.element.find(this.options.handle)).length},_setHandleClassName:function(){this.handleElement=this.options.handle?this.element.find(this.options.handle):this.element,this.handleElement.addClass("ui-draggable-handle")},_removeHandleClassName:function(){this.handleElement.removeClass("ui-draggable-handle")},_createHelper:function(b){var c=this.options,d=a.isFunction(c.helper),e=d?a(c.helper.apply(this.element[0],[b])):"clone"===c.helper?this.element.clone().removeAttr("id"):this.element;return e.parents("body").length||e.appendTo("parent"===c.appendTo?this.element[0].parentNode:c.appendTo),d&&e[0]===this.element[0]&&this._setPositionRelative(),e[0]===this.element[0]||/(fixed|absolute)/.test(e.css("position"))||e.css("position","absolute"),e},_setPositionRelative:function(){/^(?:r|a|f)/.test(this.element.css("position"))||(this.element[0].style.position="relative")},_adjustOffsetFromHelper:function(b){"string"==typeof b&&(b=b.split(" ")),a.isArray(b)&&(b={left:+b[0],top:+b[1]||0}),"left"in b&&(this.offset.click.left=b.left+this.margins.left),"right"in b&&(this.offset.click.left=this.helperProportions.width-b.right+this.margins.left),"top"in b&&(this.offset.click.top=b.top+this.margins.top),"bottom"in b&&(this.offset.click.top=this.helperProportions.height-b.bottom+this.margins.top)},_isRootNode:function(a){return/(html|body)/i.test(a.tagName)||a===this.document[0]},_getParentOffset:function(){var b=this.offsetParent.offset(),c=this.document[0];return"absolute"===this.cssPosition&&this.scrollParent[0]!==c&&a.contains(this.scrollParent[0],this.offsetParent[0])&&(b.left+=this.scrollParent.scrollLeft(),b.top+=this.scrollParent.scrollTop()),this._isRootNode(this.offsetParent[0])&&(b={top:0,left:0}),{top:b.top+(parseInt(this.offsetParent.css("borderTopWidth"),10)||0),left:b.left+(parseInt(this.offsetParent.css("borderLeftWidth"),10)||0)}},_getRelativeOffset:function(){if("relative"!==this.cssPosition)return{top:0,left:0};var a=this.element.position(),b=this._isRootNode(this.scrollParent[0]);return{top:a.top-(parseInt(this.helper.css("top"),10)||0)+(b?0:this.scrollParent.scrollTop()),left:a.left-(parseInt(this.helper.css("left"),10)||0)+(b?0:this.scrollParent.scrollLeft())}},_cacheMargins:function(){this.margins={left:parseInt(this.element.css("marginLeft"),10)||0,top:parseInt(this.element.css("marginTop"),10)||0,right:parseInt(this.element.css("marginRight"),10)||0,bottom:parseInt(this.element.css("marginBottom"),10)||0}},_cacheHelperProportions:function(){this.helperProportions={width:this.helper.outerWidth(),height:this.helper.outerHeight()}},_setContainment:function(){var b,c,d,e=this.options,f=this.document[0];return this.relativeContainer=null,e.containment?"window"===e.containment?void(this.containment=[a(window).scrollLeft()-this.offset.relative.left-this.offset.parent.left,a(window).scrollTop()-this.offset.relative.top-this.offset.parent.top,a(window).scrollLeft()+a(window).width()-this.helperProportions.width-this.margins.left,a(window).scrollTop()+(a(window).height()||f.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top]):"document"===e.containment?void(this.containment=[0,0,a(f).width()-this.helperProportions.width-this.margins.left,(a(f).height()||f.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top]):e.containment.constructor===Array?void(this.containment=e.containment):("parent"===e.containment&&(e.containment=this.helper[0].parentNode),c=a(e.containment),d=c[0],void(d&&(b=/(scroll|auto)/.test(c.css("overflow")),this.containment=[(parseInt(c.css("borderLeftWidth"),10)||0)+(parseInt(c.css("paddingLeft"),10)||0),(parseInt(c.css("borderTopWidth"),10)||0)+(parseInt(c.css("paddingTop"),10)||0),(b?Math.max(d.scrollWidth,d.offsetWidth):d.offsetWidth)-(parseInt(c.css("borderRightWidth"),10)||0)-(parseInt(c.css("paddingRight"),10)||0)-this.helperProportions.width-this.margins.left-this.margins.right,(b?Math.max(d.scrollHeight,d.offsetHeight):d.offsetHeight)-(parseInt(c.css("borderBottomWidth"),10)||0)-(parseInt(c.css("paddingBottom"),10)||0)-this.helperProportions.height-this.margins.top-this.margins.bottom],this.relativeContainer=c))):void(this.containment=null)},_convertPositionTo:function(a,b){b||(b=this.position);var c="absolute"===a?1:-1,d=this._isRootNode(this.scrollParent[0]);return{top:b.top+this.offset.relative.top*c+this.offset.parent.top*c-("fixed"===this.cssPosition?-this.offset.scroll.top:d?0:this.offset.scroll.top)*c,left:b.left+this.offset.relative.left*c+this.offset.parent.left*c-("fixed"===this.cssPosition?-this.offset.scroll.left:d?0:this.offset.scroll.left)*c}},_generatePosition:function(a,b){var c,d,e,f,g=this.options,h=this._isRootNode(this.scrollParent[0]),i=a.pageX,j=a.pageY;return h&&this.offset.scroll||(this.offset.scroll={top:this.scrollParent.scrollTop(),left:this.scrollParent.scrollLeft()}),b&&(this.containment&&(this.relativeContainer?(d=this.relativeContainer.offset(),c=[this.containment[0]+d.left,this.containment[1]+d.top,this.containment[2]+d.left,this.containment[3]+d.top]):c=this.containment,a.pageX-this.offset.click.left<c[0]&&(i=c[0]+this.offset.click.left),a.pageY-this.offset.click.top<c[1]&&(j=c[1]+this.offset.click.top),a.pageX-this.offset.click.left>c[2]&&(i=c[2]+this.offset.click.left),a.pageY-this.offset.click.top>c[3]&&(j=c[3]+this.offset.click.top)),g.grid&&(e=g.grid[1]?this.originalPageY+Math.round((j-this.originalPageY)/g.grid[1])*g.grid[1]:this.originalPageY,j=c?e-this.offset.click.top>=c[1]||e-this.offset.click.top>c[3]?e:e-this.offset.click.top>=c[1]?e-g.grid[1]:e+g.grid[1]:e,f=g.grid[0]?this.originalPageX+Math.round((i-this.originalPageX)/g.grid[0])*g.grid[0]:this.originalPageX,i=c?f-this.offset.click.left>=c[0]||f-this.offset.click.left>c[2]?f:f-this.offset.click.left>=c[0]?f-g.grid[0]:f+g.grid[0]:f),"y"===g.axis&&(i=this.originalPageX),"x"===g.axis&&(j=this.originalPageY)),{top:j-this.offset.click.top-this.offset.relative.top-this.offset.parent.top+("fixed"===this.cssPosition?-this.offset.scroll.top:h?0:this.offset.scroll.top),left:i-this.offset.click.left-this.offset.relative.left-this.offset.parent.left+("fixed"===this.cssPosition?-this.offset.scroll.left:h?0:this.offset.scroll.left)}},_clear:function(){this.helper.removeClass("ui-draggable-dragging"),this.helper[0]===this.element[0]||this.cancelHelperRemoval||this.helper.remove(),this.helper=null,this.cancelHelperRemoval=!1,this.destroyOnClear&&this.destroy()},_normalizeRightBottom:function(){"y"!==this.options.axis&&"auto"!==this.helper.css("right")&&(this.helper.width(this.helper.width()),this.helper.css("right","auto")),"x"!==this.options.axis&&"auto"!==this.helper.css("bottom")&&(this.helper.height(this.helper.height()),this.helper.css("bottom","auto"))},_trigger:function(b,c,d){return d=d||this._uiHash(),a.ui.plugin.call(this,b,[c,d,this],!0),/^(drag|start|stop)/.test(b)&&(this.positionAbs=this._convertPositionTo("absolute"),d.offset=this.positionAbs),a.Widget.prototype._trigger.call(this,b,c,d)},plugins:{},_uiHash:function(){return{helper:this.helper,position:this.position,originalPosition:this.originalPosition,offset:this.positionAbs}}}),a.ui.plugin.add("draggable","connectToSortable",{start:function(b,c,d){var e=a.extend({},c,{item:d.element});d.sortables=[],a(d.options.connectToSortable).each(function(){var c=a(this).sortable("instance");c&&!c.options.disabled&&(d.sortables.push(c),c.refreshPositions(),c._trigger("activate",b,e))})},stop:function(b,c,d){var e=a.extend({},c,{item:d.element});d.cancelHelperRemoval=!1,a.each(d.sortables,function(){var a=this;a.isOver?(a.isOver=0,d.cancelHelperRemoval=!0,a.cancelHelperRemoval=!1,a._storedCSS={position:a.placeholder.css("position"),top:a.placeholder.css("top"),left:a.placeholder.css("left")},a._mouseStop(b),a.options.helper=a.options._helper):(a.cancelHelperRemoval=!0,a._trigger("deactivate",b,e))})},drag:function(b,c,d){a.each(d.sortables,function(){var e=!1,f=this;f.positionAbs=d.positionAbs,f.helperProportions=d.helperProportions,f.offset.click=d.offset.click,f._intersectsWith(f.containerCache)&&(e=!0,a.each(d.sortables,function(){return this.positionAbs=d.positionAbs,this.helperProportions=d.helperProportions,this.offset.click=d.offset.click,this!==f&&this._intersectsWith(this.containerCache)&&a.contains(f.element[0],this.element[0])&&(e=!1),e})),e?(f.isOver||(f.isOver=1,d._parent=c.helper.parent(),f.currentItem=c.helper.appendTo(f.element).data("ui-sortable-item",!0),f.options._helper=f.options.helper,f.options.helper=function(){return c.helper[0]},b.target=f.currentItem[0],f._mouseCapture(b,!0),f._mouseStart(b,!0,!0),f.offset.click.top=d.offset.click.top,f.offset.click.left=d.offset.click.left,f.offset.parent.left-=d.offset.parent.left-f.offset.parent.left,f.offset.parent.top-=d.offset.parent.top-f.offset.parent.top,d._trigger("toSortable",b),d.dropped=f.element,a.each(d.sortables,function(){this.refreshPositions()}),d.currentItem=d.element,f.fromOutside=d),f.currentItem&&(f._mouseDrag(b),c.position=f.position)):f.isOver&&(f.isOver=0,f.cancelHelperRemoval=!0,f.options._revert=f.options.revert,f.options.revert=!1,f._trigger("out",b,f._uiHash(f)),f._mouseStop(b,!0),f.options.revert=f.options._revert,f.options.helper=f.options._helper,f.placeholder&&f.placeholder.remove(),c.helper.appendTo(d._parent),d._refreshOffsets(b),c.position=d._generatePosition(b,!0),d._trigger("fromSortable",b),d.dropped=!1,a.each(d.sortables,function(){this.refreshPositions()}))})}}),a.ui.plugin.add("draggable","cursor",{start:function(b,c,d){var e=a("body"),f=d.options;e.css("cursor")&&(f._cursor=e.css("cursor")),e.css("cursor",f.cursor)},stop:function(b,c,d){var e=d.options;e._cursor&&a("body").css("cursor",e._cursor)}}),a.ui.plugin.add("draggable","opacity",{start:function(b,c,d){var e=a(c.helper),f=d.options;e.css("opacity")&&(f._opacity=e.css("opacity")),e.css("opacity",f.opacity)},stop:function(b,c,d){var e=d.options;e._opacity&&a(c.helper).css("opacity",e._opacity)}}),a.ui.plugin.add("draggable","scroll",{start:function(a,b,c){c.scrollParentNotHidden||(c.scrollParentNotHidden=c.helper.scrollParent(!1)),c.scrollParentNotHidden[0]!==c.document[0]&&"HTML"!==c.scrollParentNotHidden[0].tagName&&(c.overflowOffset=c.scrollParentNotHidden.offset())},drag:function(b,c,d){var e=d.options,f=!1,g=d.scrollParentNotHidden[0],h=d.document[0];g!==h&&"HTML"!==g.tagName?(e.axis&&"x"===e.axis||(d.overflowOffset.top+g.offsetHeight-b.pageY<e.scrollSensitivity?g.scrollTop=f=g.scrollTop+e.scrollSpeed:b.pageY-d.overflowOffset.top<e.scrollSensitivity&&(g.scrollTop=f=g.scrollTop-e.scrollSpeed)),e.axis&&"y"===e.axis||(d.overflowOffset.left+g.offsetWidth-b.pageX<e.scrollSensitivity?g.scrollLeft=f=g.scrollLeft+e.scrollSpeed:b.pageX-d.overflowOffset.left<e.scrollSensitivity&&(g.scrollLeft=f=g.scrollLeft-e.scrollSpeed))):(e.axis&&"x"===e.axis||(b.pageY-a(h).scrollTop()<e.scrollSensitivity?f=a(h).scrollTop(a(h).scrollTop()-e.scrollSpeed):a(window).height()-(b.pageY-a(h).scrollTop())<e.scrollSensitivity&&(f=a(h).scrollTop(a(h).scrollTop()+e.scrollSpeed))),e.axis&&"y"===e.axis||(b.pageX-a(h).scrollLeft()<e.scrollSensitivity?f=a(h).scrollLeft(a(h).scrollLeft()-e.scrollSpeed):a(window).width()-(b.pageX-a(h).scrollLeft())<e.scrollSensitivity&&(f=a(h).scrollLeft(a(h).scrollLeft()+e.scrollSpeed)))),f!==!1&&a.ui.ddmanager&&!e.dropBehaviour&&a.ui.ddmanager.prepareOffsets(d,b)}}),a.ui.plugin.add("draggable","snap",{start:function(b,c,d){var e=d.options;d.snapElements=[],a(e.snap.constructor!==String?e.snap.items||":data(ui-draggable)":e.snap).each(function(){var b=a(this),c=b.offset();this!==d.element[0]&&d.snapElements.push({item:this,width:b.outerWidth(),height:b.outerHeight(),top:c.top,left:c.left})})},drag:function(b,c,d){var e,f,g,h,i,j,k,l,m,n,o=d.options,p=o.snapTolerance,q=c.offset.left,r=q+d.helperProportions.width,s=c.offset.top,t=s+d.helperProportions.height;for(m=d.snapElements.length-1;m>=0;m--)i=d.snapElements[m].left-d.margins.left,j=i+d.snapElements[m].width,k=d.snapElements[m].top-d.margins.top,l=k+d.snapElements[m].height,r<i-p||q>j+p||t<k-p||s>l+p||!a.contains(d.snapElements[m].item.ownerDocument,d.snapElements[m].item)?(d.snapElements[m].snapping&&d.options.snap.release&&d.options.snap.release.call(d.element,b,a.extend(d._uiHash(),{snapItem:d.snapElements[m].item})),d.snapElements[m].snapping=!1):("inner"!==o.snapMode&&(e=Math.abs(k-t)<=p,f=Math.abs(l-s)<=p,g=Math.abs(i-r)<=p,h=Math.abs(j-q)<=p,e&&(c.position.top=d._convertPositionTo("relative",{top:k-d.helperProportions.height,left:0}).top),f&&(c.position.top=d._convertPositionTo("relative",{top:l,left:0}).top),g&&(c.position.left=d._convertPositionTo("relative",{top:0,left:i-d.helperProportions.width}).left),h&&(c.position.left=d._convertPositionTo("relative",{top:0,left:j}).left)),n=e||f||g||h,"outer"!==o.snapMode&&(e=Math.abs(k-s)<=p,f=Math.abs(l-t)<=p,g=Math.abs(i-q)<=p,h=Math.abs(j-r)<=p,e&&(c.position.top=d._convertPositionTo("relative",{top:k,left:0}).top),f&&(c.position.top=d._convertPositionTo("relative",{top:l-d.helperProportions.height,left:0}).top),g&&(c.position.left=d._convertPositionTo("relative",{top:0,left:i}).left),h&&(c.position.left=d._convertPositionTo("relative",{top:0,left:j-d.helperProportions.width}).left)),!d.snapElements[m].snapping&&(e||f||g||h||n)&&d.options.snap.snap&&d.options.snap.snap.call(d.element,b,a.extend(d._uiHash(),{snapItem:d.snapElements[m].item})),d.snapElements[m].snapping=e||f||g||h||n)}}),a.ui.plugin.add("draggable","stack",{start:function(b,c,d){var e,f=d.options,g=a.makeArray(a(f.stack)).sort(function(b,c){return(parseInt(a(b).css("zIndex"),10)||0)-(parseInt(a(c).css("zIndex"),10)||0)});g.length&&(e=parseInt(a(g[0]).css("zIndex"),10)||0,a(g).each(function(b){a(this).css("zIndex",e+b)}),this.css("zIndex",e+g.length))}}),a.ui.plugin.add("draggable","zIndex",{start:function(b,c,d){var e=a(c.helper),f=d.options;e.css("zIndex")&&(f._zIndex=e.css("zIndex")),e.css("zIndex",f.zIndex)},stop:function(b,c,d){var e=d.options;e._zIndex&&a(c.helper).css("zIndex",e._zIndex)}}),a.ui.draggable});
!function(a){"function"==typeof define&&define.amd?define(["jquery","./core","./widget"],a):a(jQuery)}(function(a){var b,c="ui-button ui-widget ui-state-default ui-corner-all",d="ui-button-icons-only ui-button-icon-only ui-button-text-icons ui-button-text-icon-primary ui-button-text-icon-secondary ui-button-text-only",e=function(){var b=a(this);setTimeout(function(){b.find(":ui-button").button("refresh")},1)},f=function(b){var c=b.name,d=b.form,e=a([]);return c&&(c=c.replace(/'/g,"\\'"),e=d?a(d).find("[name='"+c+"'][type=radio]"):a("[name='"+c+"'][type=radio]",b.ownerDocument).filter(function(){return!this.form})),e};return a.widget("ui.button",{version:"1.11.4",defaultElement:"<button>",options:{disabled:null,text:!0,label:null,icons:{primary:null,secondary:null}},_create:function(){this.element.closest("form").unbind("reset"+this.eventNamespace).bind("reset"+this.eventNamespace,e),"boolean"!=typeof this.options.disabled?this.options.disabled=!!this.element.prop("disabled"):this.element.prop("disabled",this.options.disabled),this._determineButtonType(),this.hasTitle=!!this.buttonElement.attr("title");var d=this,g=this.options,h="checkbox"===this.type||"radio"===this.type,i=h?"":"ui-state-active";null===g.label&&(g.label="input"===this.type?this.buttonElement.val():this.buttonElement.html()),this._hoverable(this.buttonElement),this.buttonElement.addClass(c).attr("role","button").bind("mouseenter"+this.eventNamespace,function(){g.disabled||this===b&&a(this).addClass("ui-state-active")}).bind("mouseleave"+this.eventNamespace,function(){g.disabled||a(this).removeClass(i)}).bind("click"+this.eventNamespace,function(a){g.disabled&&(a.preventDefault(),a.stopImmediatePropagation())}),this._on({focus:function(){this.buttonElement.addClass("ui-state-focus")},blur:function(){this.buttonElement.removeClass("ui-state-focus")}}),h&&this.element.bind("change"+this.eventNamespace,function(){d.refresh()}),"checkbox"===this.type?this.buttonElement.bind("click"+this.eventNamespace,function(){if(g.disabled)return!1}):"radio"===this.type?this.buttonElement.bind("click"+this.eventNamespace,function(){if(g.disabled)return!1;a(this).addClass("ui-state-active"),d.buttonElement.attr("aria-pressed","true");var b=d.element[0];f(b).not(b).map(function(){return a(this).button("widget")[0]}).removeClass("ui-state-active").attr("aria-pressed","false")}):(this.buttonElement.bind("mousedown"+this.eventNamespace,function(){return!g.disabled&&(a(this).addClass("ui-state-active"),b=this,void d.document.one("mouseup",function(){b=null}))}).bind("mouseup"+this.eventNamespace,function(){return!g.disabled&&void a(this).removeClass("ui-state-active")}).bind("keydown"+this.eventNamespace,function(b){return!g.disabled&&void(b.keyCode!==a.ui.keyCode.SPACE&&b.keyCode!==a.ui.keyCode.ENTER||a(this).addClass("ui-state-active"))}).bind("keyup"+this.eventNamespace+" blur"+this.eventNamespace,function(){a(this).removeClass("ui-state-active")}),this.buttonElement.is("a")&&this.buttonElement.keyup(function(b){b.keyCode===a.ui.keyCode.SPACE&&a(this).click()})),this._setOption("disabled",g.disabled),this._resetButton()},_determineButtonType:function(){var a,b,c;this.element.is("[type=checkbox]")?this.type="checkbox":this.element.is("[type=radio]")?this.type="radio":this.element.is("input")?this.type="input":this.type="button","checkbox"===this.type||"radio"===this.type?(a=this.element.parents().last(),b="label[for='"+this.element.attr("id")+"']",this.buttonElement=a.find(b),this.buttonElement.length||(a=a.length?a.siblings():this.element.siblings(),this.buttonElement=a.filter(b),this.buttonElement.length||(this.buttonElement=a.find(b))),this.element.addClass("ui-helper-hidden-accessible"),c=this.element.is(":checked"),c&&this.buttonElement.addClass("ui-state-active"),this.buttonElement.prop("aria-pressed",c)):this.buttonElement=this.element},widget:function(){return this.buttonElement},_destroy:function(){this.element.removeClass("ui-helper-hidden-accessible"),this.buttonElement.removeClass(c+" ui-state-active "+d).removeAttr("role").removeAttr("aria-pressed").html(this.buttonElement.find(".ui-button-text").html()),this.hasTitle||this.buttonElement.removeAttr("title")},_setOption:function(a,b){return this._super(a,b),"disabled"===a?(this.widget().toggleClass("ui-state-disabled",!!b),this.element.prop("disabled",!!b),void(b&&("checkbox"===this.type||"radio"===this.type?this.buttonElement.removeClass("ui-state-focus"):this.buttonElement.removeClass("ui-state-focus ui-state-active")))):void this._resetButton()},refresh:function(){var b=this.element.is("input, button")?this.element.is(":disabled"):this.element.hasClass("ui-button-disabled");b!==this.options.disabled&&this._setOption("disabled",b),"radio"===this.type?f(this.element[0]).each(function(){a(this).is(":checked")?a(this).button("widget").addClass("ui-state-active").attr("aria-pressed","true"):a(this).button("widget").removeClass("ui-state-active").attr("aria-pressed","false")}):"checkbox"===this.type&&(this.element.is(":checked")?this.buttonElement.addClass("ui-state-active").attr("aria-pressed","true"):this.buttonElement.removeClass("ui-state-active").attr("aria-pressed","false"))},_resetButton:function(){if("input"===this.type)return void(this.options.label&&this.element.val(this.options.label));var b=this.buttonElement.removeClass(d),c=a("<span></span>",this.document[0]).addClass("ui-button-text").html(this.options.label).appendTo(b.empty()).text(),e=this.options.icons,f=e.primary&&e.secondary,g=[];e.primary||e.secondary?(this.options.text&&g.push("ui-button-text-icon"+(f?"s":e.primary?"-primary":"-secondary")),e.primary&&b.prepend("<span class='ui-button-icon-primary ui-icon "+e.primary+"'></span>"),e.secondary&&b.append("<span class='ui-button-icon-secondary ui-icon "+e.secondary+"'></span>"),this.options.text||(g.push(f?"ui-button-icons-only":"ui-button-icon-only"),this.hasTitle||b.attr("title",a.trim(c)))):g.push("ui-button-text-only"),b.addClass(g.join(" "))}}),a.widget("ui.buttonset",{version:"1.11.4",options:{items:"button, input[type=button], input[type=submit], input[type=reset], input[type=checkbox], input[type=radio], a, :data(ui-button)"},_create:function(){this.element.addClass("ui-buttonset")},_init:function(){this.refresh()},_setOption:function(a,b){"disabled"===a&&this.buttons.button("option",a,b),this._super(a,b)},refresh:function(){var b="rtl"===this.element.css("direction"),c=this.element.find(this.options.items),d=c.filter(":ui-button");c.not(":ui-button").button(),d.button("refresh"),this.buttons=c.map(function(){return a(this).button("widget")[0]}).removeClass("ui-corner-all ui-corner-left ui-corner-right").filter(":first").addClass(b?"ui-corner-right":"ui-corner-left").end().filter(":last").addClass(b?"ui-corner-left":"ui-corner-right").end().end()},_destroy:function(){this.element.removeClass("ui-buttonset"),this.buttons.map(function(){return a(this).button("widget")[0]}).removeClass("ui-corner-left ui-corner-right").end().button("destroy")}}),a.ui.button});
!function(a){"function"==typeof define&&define.amd?define(["jquery","./core","./widget","./button","./draggable","./mouse","./position","./resizable"],a):a(jQuery)}(function(a){return a.widget("ui.dialog",{version:"1.11.4",options:{appendTo:"body",autoOpen:!0,buttons:[],closeOnEscape:!0,closeText:"Close",dialogClass:"",draggable:!0,hide:null,height:"auto",maxHeight:null,maxWidth:null,minHeight:150,minWidth:150,modal:!1,position:{my:"center",at:"center",of:window,collision:"fit",using:function(b){var c=a(this).css(b).offset().top;c<0&&a(this).css("top",b.top-c)}},resizable:!0,show:null,title:null,width:300,beforeClose:null,close:null,drag:null,dragStart:null,dragStop:null,focus:null,open:null,resize:null,resizeStart:null,resizeStop:null},sizeRelatedOptions:{buttons:!0,height:!0,maxHeight:!0,maxWidth:!0,minHeight:!0,minWidth:!0,width:!0},resizableRelatedOptions:{maxHeight:!0,maxWidth:!0,minHeight:!0,minWidth:!0},_create:function(){this.originalCss={display:this.element[0].style.display,width:this.element[0].style.width,minHeight:this.element[0].style.minHeight,maxHeight:this.element[0].style.maxHeight,height:this.element[0].style.height},this.originalPosition={parent:this.element.parent(),index:this.element.parent().children().index(this.element)},this.originalTitle=this.element.attr("title"),this.options.title=this.options.title||this.originalTitle,this._createWrapper(),this.element.show().removeAttr("title").addClass("ui-dialog-content ui-widget-content").appendTo(this.uiDialog),this._createTitlebar(),this._createButtonPane(),this.options.draggable&&a.fn.draggable&&this._makeDraggable(),this.options.resizable&&a.fn.resizable&&this._makeResizable(),this._isOpen=!1,this._trackFocus()},_init:function(){this.options.autoOpen&&this.open()},_appendTo:function(){var b=this.options.appendTo;return b&&(b.jquery||b.nodeType)?a(b):this.document.find(b||"body").eq(0)},_destroy:function(){var a,b=this.originalPosition;this._untrackInstance(),this._destroyOverlay(),this.element.removeUniqueId().removeClass("ui-dialog-content ui-widget-content").css(this.originalCss).detach(),this.uiDialog.stop(!0,!0).remove(),this.originalTitle&&this.element.attr("title",this.originalTitle),a=b.parent.children().eq(b.index),a.length&&a[0]!==this.element[0]?a.before(this.element):b.parent.append(this.element)},widget:function(){return this.uiDialog},disable:a.noop,enable:a.noop,close:function(b){var c,d=this;if(this._isOpen&&this._trigger("beforeClose",b)!==!1){if(this._isOpen=!1,this._focusedElement=null,this._destroyOverlay(),this._untrackInstance(),!this.opener.filter(":focusable").focus().length)try{c=this.document[0].activeElement,c&&"body"!==c.nodeName.toLowerCase()&&a(c).blur()}catch(e){}this._hide(this.uiDialog,this.options.hide,function(){d._trigger("close",b)})}},isOpen:function(){return this._isOpen},moveToTop:function(){this._moveToTop()},_moveToTop:function(b,c){var d=!1,e=this.uiDialog.siblings(".ui-front:visible").map(function(){return+a(this).css("z-index")}).get(),f=Math.max.apply(null,e);return f>=+this.uiDialog.css("z-index")&&(this.uiDialog.css("z-index",f+1),d=!0),d&&!c&&this._trigger("focus",b),d},open:function(){var b=this;return this._isOpen?void(this._moveToTop()&&this._focusTabbable()):(this._isOpen=!0,this.opener=a(this.document[0].activeElement),this._size(),this._position(),this._createOverlay(),this._moveToTop(null,!0),this.overlay&&this.overlay.css("z-index",this.uiDialog.css("z-index")-1),this._show(this.uiDialog,this.options.show,function(){b._focusTabbable(),b._trigger("focus")}),this._makeFocusTarget(),void this._trigger("open"))},_focusTabbable:function(){var a=this._focusedElement;a||(a=this.element.find("[autofocus]")),a.length||(a=this.element.find(":tabbable")),a.length||(a=this.uiDialogButtonPane.find(":tabbable")),a.length||(a=this.uiDialogTitlebarClose.filter(":tabbable")),a.length||(a=this.uiDialog),a.eq(0).focus()},_keepFocus:function(b){function c(){var b=this.document[0].activeElement,c=this.uiDialog[0]===b||a.contains(this.uiDialog[0],b);c||this._focusTabbable()}b.preventDefault(),c.call(this),this._delay(c)},_createWrapper:function(){this.uiDialog=a("<div>").addClass("ui-dialog ui-widget ui-widget-content ui-corner-all ui-front "+this.options.dialogClass).hide().attr({tabIndex:-1,role:"dialog"}).appendTo(this._appendTo()),this._on(this.uiDialog,{keydown:function(b){if(this.options.closeOnEscape&&!b.isDefaultPrevented()&&b.keyCode&&b.keyCode===a.ui.keyCode.ESCAPE)return b.preventDefault(),void this.close(b);if(b.keyCode===a.ui.keyCode.TAB&&!b.isDefaultPrevented()){var c=this.uiDialog.find(":tabbable"),d=c.filter(":first"),e=c.filter(":last");b.target!==e[0]&&b.target!==this.uiDialog[0]||b.shiftKey?b.target!==d[0]&&b.target!==this.uiDialog[0]||!b.shiftKey||(this._delay(function(){e.focus()}),b.preventDefault()):(this._delay(function(){d.focus()}),b.preventDefault())}},mousedown:function(a){this._moveToTop(a)&&this._focusTabbable()}}),this.element.find("[aria-describedby]").length||this.uiDialog.attr({"aria-describedby":this.element.uniqueId().attr("id")})},_createTitlebar:function(){var b;this.uiDialogTitlebar=a("<div>").addClass("ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix").prependTo(this.uiDialog),this._on(this.uiDialogTitlebar,{mousedown:function(b){a(b.target).closest(".ui-dialog-titlebar-close")||this.uiDialog.focus()}}),this.uiDialogTitlebarClose=a("<button type='button'></button>").button({label:this.options.closeText,icons:{primary:"ui-icon-closethick"},text:!1}).addClass("ui-dialog-titlebar-close").appendTo(this.uiDialogTitlebar),this._on(this.uiDialogTitlebarClose,{click:function(a){a.preventDefault(),this.close(a)}}),b=a("<span>").uniqueId().addClass("ui-dialog-title").prependTo(this.uiDialogTitlebar),this._title(b),this.uiDialog.attr({"aria-labelledby":b.attr("id")})},_title:function(a){this.options.title||a.html("&#160;"),a.text(this.options.title)},_createButtonPane:function(){this.uiDialogButtonPane=a("<div>").addClass("ui-dialog-buttonpane ui-widget-content ui-helper-clearfix"),this.uiButtonSet=a("<div>").addClass("ui-dialog-buttonset").appendTo(this.uiDialogButtonPane),this._createButtons()},_createButtons:function(){var b=this,c=this.options.buttons;return this.uiDialogButtonPane.remove(),this.uiButtonSet.empty(),a.isEmptyObject(c)||a.isArray(c)&&!c.length?void this.uiDialog.removeClass("ui-dialog-buttons"):(a.each(c,function(c,d){var e,f;d=a.isFunction(d)?{click:d,text:c}:d,d=a.extend({type:"button"},d),e=d.click,d.click=function(){e.apply(b.element[0],arguments)},f={icons:d.icons,text:d.showText},delete d.icons,delete d.showText,a("<button></button>",d).button(f).appendTo(b.uiButtonSet)}),this.uiDialog.addClass("ui-dialog-buttons"),void this.uiDialogButtonPane.appendTo(this.uiDialog))},_makeDraggable:function(){function b(a){return{position:a.position,offset:a.offset}}var c=this,d=this.options;this.uiDialog.draggable({cancel:".ui-dialog-content, .ui-dialog-titlebar-close",handle:".ui-dialog-titlebar",containment:"document",start:function(d,e){a(this).addClass("ui-dialog-dragging"),c._blockFrames(),c._trigger("dragStart",d,b(e))},drag:function(a,d){c._trigger("drag",a,b(d))},stop:function(e,f){var g=f.offset.left-c.document.scrollLeft(),h=f.offset.top-c.document.scrollTop();d.position={my:"left top",at:"left"+(g>=0?"+":"")+g+" top"+(h>=0?"+":"")+h,of:c.window},a(this).removeClass("ui-dialog-dragging"),c._unblockFrames(),c._trigger("dragStop",e,b(f))}})},_makeResizable:function(){function b(a){return{originalPosition:a.originalPosition,originalSize:a.originalSize,position:a.position,size:a.size}}var c=this,d=this.options,e=d.resizable,f=this.uiDialog.css("position"),g="string"==typeof e?e:"n,e,s,w,se,sw,ne,nw";this.uiDialog.resizable({cancel:".ui-dialog-content",containment:"document",alsoResize:this.element,maxWidth:d.maxWidth,maxHeight:d.maxHeight,minWidth:d.minWidth,minHeight:this._minHeight(),handles:g,start:function(d,e){a(this).addClass("ui-dialog-resizing"),c._blockFrames(),c._trigger("resizeStart",d,b(e))},resize:function(a,d){c._trigger("resize",a,b(d))},stop:function(e,f){var g=c.uiDialog.offset(),h=g.left-c.document.scrollLeft(),i=g.top-c.document.scrollTop();d.height=c.uiDialog.height(),d.width=c.uiDialog.width(),d.position={my:"left top",at:"left"+(h>=0?"+":"")+h+" top"+(i>=0?"+":"")+i,of:c.window},a(this).removeClass("ui-dialog-resizing"),c._unblockFrames(),c._trigger("resizeStop",e,b(f))}}).css("position",f)},_trackFocus:function(){this._on(this.widget(),{focusin:function(b){this._makeFocusTarget(),this._focusedElement=a(b.target)}})},_makeFocusTarget:function(){this._untrackInstance(),this._trackingInstances().unshift(this)},_untrackInstance:function(){var b=this._trackingInstances(),c=a.inArray(this,b);c!==-1&&b.splice(c,1)},_trackingInstances:function(){var a=this.document.data("ui-dialog-instances");return a||(a=[],this.document.data("ui-dialog-instances",a)),a},_minHeight:function(){var a=this.options;return"auto"===a.height?a.minHeight:Math.min(a.minHeight,a.height)},_position:function(){var a=this.uiDialog.is(":visible");a||this.uiDialog.show(),this.uiDialog.position(this.options.position),a||this.uiDialog.hide()},_setOptions:function(b){var c=this,d=!1,e={};a.each(b,function(a,b){c._setOption(a,b),a in c.sizeRelatedOptions&&(d=!0),a in c.resizableRelatedOptions&&(e[a]=b)}),d&&(this._size(),this._position()),this.uiDialog.is(":data(ui-resizable)")&&this.uiDialog.resizable("option",e)},_setOption:function(a,b){var c,d,e=this.uiDialog;"dialogClass"===a&&e.removeClass(this.options.dialogClass).addClass(b),"disabled"!==a&&(this._super(a,b),"appendTo"===a&&this.uiDialog.appendTo(this._appendTo()),"buttons"===a&&this._createButtons(),"closeText"===a&&this.uiDialogTitlebarClose.button({label:""+b}),"draggable"===a&&(c=e.is(":data(ui-draggable)"),c&&!b&&e.draggable("destroy"),!c&&b&&this._makeDraggable()),"position"===a&&this._position(),"resizable"===a&&(d=e.is(":data(ui-resizable)"),d&&!b&&e.resizable("destroy"),d&&"string"==typeof b&&e.resizable("option","handles",b),d||b===!1||this._makeResizable()),"title"===a&&this._title(this.uiDialogTitlebar.find(".ui-dialog-title")))},_size:function(){var a,b,c,d=this.options;this.element.show().css({width:"auto",minHeight:0,maxHeight:"none",height:0}),d.minWidth>d.width&&(d.width=d.minWidth),a=this.uiDialog.css({height:"auto",width:d.width}).outerHeight(),b=Math.max(0,d.minHeight-a),c="number"==typeof d.maxHeight?Math.max(0,d.maxHeight-a):"none","auto"===d.height?this.element.css({minHeight:b,maxHeight:c,height:"auto"}):this.element.height(Math.max(0,d.height-a)),this.uiDialog.is(":data(ui-resizable)")&&this.uiDialog.resizable("option","minHeight",this._minHeight())},_blockFrames:function(){this.iframeBlocks=this.document.find("iframe").map(function(){var b=a(this);return a("<div>").css({position:"absolute",width:b.outerWidth(),height:b.outerHeight()}).appendTo(b.parent()).offset(b.offset())[0]})},_unblockFrames:function(){this.iframeBlocks&&(this.iframeBlocks.remove(),delete this.iframeBlocks)},_allowInteraction:function(b){return!!a(b.target).closest(".ui-dialog").length||!!a(b.target).closest(".ui-datepicker").length},_createOverlay:function(){if(this.options.modal){var b=!0;this._delay(function(){b=!1}),this.document.data("ui-dialog-overlays")||this._on(this.document,{focusin:function(a){b||this._allowInteraction(a)||(a.preventDefault(),this._trackingInstances()[0]._focusTabbable())}}),this.overlay=a("<div>").addClass("ui-widget-overlay ui-front").appendTo(this._appendTo()),this._on(this.overlay,{mousedown:"_keepFocus"}),this.document.data("ui-dialog-overlays",(this.document.data("ui-dialog-overlays")||0)+1)}},_destroyOverlay:function(){if(this.options.modal&&this.overlay){var a=this.document.data("ui-dialog-overlays")-1;a?this.document.data("ui-dialog-overlays",a):this.document.unbind("focusin").removeData("ui-dialog-overlays"),this.overlay.remove(),this.overlay=null}}})});
jQuery(document).ready(function($){
var load_ui_css=false;
$('#start-time').each(function(i, el){
$(el).addClass('em-time-input em-time-start').next('#end-time').addClass('em-time-input em-time-end').parent().addClass('em-time-range');
});
if($(".em-time-input").length > 0){
em_setup_timepicker('body');
}
$('.em-calendar-wrapper a').unbind("click");
$('.em-calendar-wrapper a').undelegate("click");
$('.em-calendar-wrapper').delegate('a.em-calnav, a.em-calnav', 'click', function(e){
e.preventDefault();
$(this).closest('.em-calendar-wrapper').prepend('<div class="loading" id="em-loading"></div>');
var url=em_ajaxify($(this).attr('href'));
$(this).closest('.em-calendar-wrapper').load(url, function(){$(this).trigger('em_calendar_load');});
});
$(document).delegate('.em-toggle', 'click change', function(e){
e.preventDefault();
var el=$(this);
var rel=el.attr('rel').split(':');
if(el.hasClass('show-search')){
if(rel.length > 1){ el.closest(rel[1]).find(rel[0]).slideUp(); }else{ $(rel[0]).slideUp(); }
el.find('.show, .show-advanced').show();
el.find('.hide, .hide-advanced').hide();
el.removeClass('show-search');
}else{
if(rel.length > 1){ el.closest(rel[1]).find(rel[0]).slideDown(); }else{ $(rel[0]).slideDown(); }
el.find('.show, .show-advanced').hide();
el.find('.hide, .hide-advanced').show();
el.addClass('show-search');
}});
if(EM.search_term_placeholder){
if('placeholder' in document.createElement('input')){
$('input.em-events-search-text, input.em-search-text').attr('placeholder', EM.search_term_placeholder);
}else{
$('input.em-events-search-text, input.em-search-text').blur(function(){
if(this.value=='') this.value=EM.search_term_placeholder;
}).focus(function(){
if(this.value==EM.search_term_placeholder) this.value='';
}).trigger('blur');
}}
$('.em-search-form select[name=country]').change(function(){
var el=$(this);
$('.em-search select[name=state]').html('<option value="">'+EM.txt_loading+'</option>');
$('.em-search select[name=region]').html('<option value="">'+EM.txt_loading+'</option>');
$('.em-search select[name=town]').html('<option value="">'+EM.txt_loading+'</option>');
if(el.val()!=''){
el.closest('.em-search-location').find('.em-search-location-meta').slideDown();
var data={
action:'search_states',
country:el.val(),
return_html:true
};
$('.em-search select[name=state]').load(EM.ajaxurl, data);
data.action='search_regions';
$('.em-search select[name=region]').load(EM.ajaxurl, data);
data.action='search_towns';
$('.em-search select[name=town]').load(EM.ajaxurl, data);
}else{
el.closest('.em-search-location').find('.em-search-location-meta').slideUp();
}});
$('.em-search-form select[name=region]').change(function(){
$('.em-search select[name=state]').html('<option value="">'+EM.txt_loading+'</option>');
$('.em-search select[name=town]').html('<option value="">'+EM.txt_loading+'</option>');
var data={
action:'search_states',
region:$(this).val(),
country:$('.em-search-form select[name=country]').val(),
return_html:true
};
$('.em-search select[name=state]').load(EM.ajaxurl, data);
data.action='search_towns';
$('.em-search select[name=town]').load(EM.ajaxurl, data);
});
$('.em-search-form select[name=state]').change(function(){
$('.em-search select[name=town]').html('<option value="">'+EM.txt_loading+'</option>');
var data={
action:'search_towns',
state:$(this).val(),
region:$('.em-search-form select[name=region]').val(),
country:$('.em-search-form select[name=country]').val(),
return_html:true
};
$('.em-search select[name=town]').load(EM.ajaxurl, data);
});
$(document).delegate('.em-search-form, .em-events-search-form', 'submit', function(e){
var form=$(this);
if(this.em_search&&this.em_search.value==EM.txt_search){ this.em_search.value=''; }
var results_wrapper=form.closest('.em-search-wrapper').find('.em-search-ajax');
if(results_wrapper.length==0) results_wrapper=$('.em-search-ajax');
if(results_wrapper.length > 0){
results_wrapper.append('<div class="loading" id="em-loading"></div>');
var submitButton=form.find('.em-search-submit');
submitButton.data('buttonText', submitButton.val()).val(EM.txt_searching);
var img=submitButton.children('img');
if(img.length > 0) img.attr('src', img.attr('src').replace('search-mag.png', 'search-loading.gif'));
var vars=form.serialize();
$.ajax(EM.ajaxurl, {
type:'POST',
dataType:'html',
data:vars,
success:function(responseText){
submitButton.val(submitButton.data('buttonText'));
if(img.length > 0) img.attr('src', img.attr('src').replace('search-loading.gif', 'search-mag.png'));
results_wrapper.replaceWith(responseText);
if(form.find('input[name=em_search]').val()==''){ form.find('input[name=em_search]').val(EM.txt_search); }
results_wrapper=form.closest('.em-search-wrapper').find('.em-search-ajax');
if(results_wrapper.length==0) results_wrapper=$('.em-search-ajax');
jQuery(document).triggerHandler('em_search_ajax', [vars, results_wrapper, e]);
}});
e.preventDefault();
return false;
}});
if($('.em-search-ajax').length > 0){
$(document).delegate('.em-search-ajax a.page-numbers', 'click', function(e){
var a=$(this);
var data=a.closest('.em-pagination').attr('data-em-ajax');
var wrapper=a.closest('.em-search-ajax');
var wrapper_parent=wrapper.parent();
var qvars=a.attr('href').split('?');
var vars=qvars[1];
if(data!=''){
vars=vars!='' ? vars+'&'+data:data;
}
wrapper.append('<div class="loading" id="em-loading"></div>');
$.ajax(EM.ajaxurl, {
type:'POST',
dataType:'html',
data:vars,
success:function(responseText){
wrapper.replaceWith(responseText);
wrapper=wrapper_parent.find('.em-search-ajax');
jQuery(document).triggerHandler('em_search_ajax', [vars, wrapper, e]);
}});
e.preventDefault();
return false;
});
}
$('.events-table').on('click', '.em-event-delete', function(){
if(!confirm("Are you sure you want to delete?")){ return false; }
window.location.href=this.href;
});
$('#event-form #event-image-delete, #location-form #location-image-delete').on('click', function(){
var el=$(this);
if(el.is(':checked')){
el.closest('.event-form-image, .location-form-image').find('#event-image-img, #location-image-img').hide();
}else{
el.closest('.event-form-image, .location-form-image').find('#event-image-img, #location-image-img').show();
}});
if($("#em-tickets-form").length > 0){
$('#event-rsvp').click(function(event){
if(!this.checked){
confirmation=confirm(EM.disable_bookings_warning);
if(confirmation==false){
event.preventDefault();
}else{
$('#event-rsvp-options').hide();
}}else{
$('#event-rsvp-options').fadeIn();
}});
if($('input#event-rsvp').is(":checked")){
$("div#rsvp-data").fadeIn();
}else{
$("div#rsvp-data").hide();
}
var reset_ticket_forms=function(){
$('#em-tickets-form table tbody tr.em-tickets-row').show();
$('#em-tickets-form table tbody tr.em-tickets-row-form').hide();
};
if($('#em-recurrence-checkbox').length > 0){
$('#em-recurrence-checkbox').change(function(){
if($('#em-recurrence-checkbox').is(':checked')){
$('#em-tickets-form .ticket-dates-from-recurring, #em-tickets-form .ticket-dates-to-recurring, #event-rsvp-options .em-booking-date-recurring').show();
$('#em-tickets-form .ticket-dates-from-normal, #em-tickets-form .ticket-dates-to-normal, #event-rsvp-options .em-booking-date-normal, #em-tickets-form .hidden').hide();
}else{
$('#em-tickets-form .ticket-dates-from-normal, #em-tickets-form .ticket-dates-to-normal, #event-rsvp-options .em-booking-date-normal').show();
$('#em-tickets-form .ticket-dates-from-recurring, #em-tickets-form .ticket-dates-to-recurring, #event-rsvp-options .em-booking-date-recurring, #em-tickets-form .hidden').hide();
}}).trigger('change');
}else if($('#em-form-recurrence').length > 0){
$('#em-tickets-form .ticket-dates-from-recurring, #em-tickets-form .ticket-dates-to-recurring, #event-rsvp-options .em-booking-date-recurring').show();
$('#em-tickets-form .ticket-dates-from-normal, #em-tickets-form .ticket-dates-to-normal, #event-rsvp-options .em-booking-date-normal, #em-tickets-form .hidden').hide();
}else{
$('#em-tickets-form .ticket-dates-from-recurring, #em-tickets-form .ticket-dates-to-recurring, #event-rsvp-options .em-booking-date-recurring, #em-tickets-form .hidden').hide();
}
$("#em-tickets-add").click(function(e){
e.preventDefault();
reset_ticket_forms();
var tickets=$('#em-tickets-form table tbody');
var rowNo=tickets.length+1;
var slot=tickets.first().clone(true).attr('id','em-ticket-'+ rowNo).appendTo($('#em-tickets-form table'));
slot.find('*[name]').each(function(index,el){
el=$(el);
el.attr('name', el.attr('name').replace('em_tickets[0]','em_tickets['+rowNo+']'));
});
slot.show().find('.ticket-actions-edit').trigger('click');
slot.find('.em-date-input-loc').datepicker('destroy').removeAttr('id');
slot.find('.em-time-input').unbind().each(function(index, el){ this.timePicker=false; });
em_setup_datepicker(slot);
em_setup_timepicker(slot);
$('html, body').animate({ scrollTop: slot.offset().top - 30 });
});
$(document).delegate('.ticket-actions-edit', 'click', function(e){
e.preventDefault();
reset_ticket_forms();
var tbody=$(this).closest('tbody');
tbody.find('tr.em-tickets-row').hide();
tbody.find('tr.em-tickets-row-form').fadeIn();
return false;
});
$(document).delegate('.ticket-actions-edited', 'click', function(e){
e.preventDefault();
var tbody=$(this).closest('tbody');
var rowNo=tbody.attr('id').replace('em-ticket-','');
tbody.find('.em-tickets-row').fadeIn();
tbody.find('.em-tickets-row-form').hide();
tbody.find('*[name]').each(function(index,el){
el=$(el);
if(el.attr('name')=='ticket_start_pub'){
tbody.find('span.ticket_start').text(el.attr('value'));
}else if(el.attr('name')=='ticket_end_pub'){
tbody.find('span.ticket_end').text(el.attr('value'));
}else if(el.attr('name')=='em_tickets['+rowNo+'][ticket_type]'){
if(el.find(':selected').val()=='members'){
tbody.find('span.ticket_name').prepend('* ');
}}else if(el.attr('name')=='em_tickets['+rowNo+'][ticket_start_recurring_days]'){
var text=tbody.find('select.ticket-dates-from-recurring-when').val()=='before' ? '-'+el.attr('value'):el.attr('value');
if(el.attr('value')!=''){
tbody.find('span.ticket_start_recurring_days').text(text);
tbody.find('span.ticket_start_recurring_days_text, span.ticket_start_time').removeClass('hidden').show();
}else{
tbody.find('span.ticket_start_recurring_days').text(' - ');
tbody.find('span.ticket_start_recurring_days_text, span.ticket_start_time').removeClass('hidden').hide();
}}else if(el.attr('name')=='em_tickets['+rowNo+'][ticket_end_recurring_days]'){
var text=tbody.find('select.ticket-dates-to-recurring-when').val()=='before' ? '-'+el.attr('value'):el.attr('value');
if(el.attr('value')!=''){
tbody.find('span.ticket_end_recurring_days').text(text);
tbody.find('span.ticket_end_recurring_days_text, span.ticket_end_time').removeClass('hidden').show();
}else{
tbody.find('span.ticket_end_recurring_days').text(' - ');
tbody.find('span.ticket_end_recurring_days_text, span.ticket_end_time').removeClass('hidden').hide();
}}else{
tbody.find('.'+el.attr('name').replace('em_tickets['+rowNo+'][','').replace(']','').replace('[]','')).text(el.attr('value'));
}});
$(document).triggerHandler('em_maps_tickets_edit', [tbody, rowNo, true]);
$('html, body').animate({ scrollTop: tbody.parent().offset().top - 30 });
return false;
});
$(document).delegate('.em-ticket-form select.ticket_type','change', function(e){
var el=$(this);
if(el.find('option:selected').val()=='members'){
el.closest('.em-ticket-form').find('.ticket-roles').fadeIn();
}else{
el.closest('.em-ticket-form').find('.ticket-roles').hide();
}});
$(document).delegate('.em-ticket-form .ticket-options-advanced','click', function(e){
e.preventDefault();
var el=$(this);
if(el.hasClass('show')){
el.closest('.em-ticket-form').find('.em-ticket-form-advanced').fadeIn();
el.find('.show,.show-advanced').hide();
el.find('.hide,.hide-advanced').show();
}else{
el.closest('.em-ticket-form').find('.em-ticket-form-advanced').hide();
el.find('.show,.show-advanced').show();
el.find('.hide,.hide-advanced').hide();
}
el.toggleClass('show');
});
$('.em-ticket-form').each(function(){
var show_advanced=false;
var el=$(this);
el.find('.em-ticket-form-advanced input[type="text"]').each(function(){ if(this.value!='') show_advanced=true; });
if(el.find('.em-ticket-form-advanced input[type="checkbox"]:checked').length > 0){ show_advanced=true; }
el.find('.em-ticket-form-advanced option:selected').each(function(){ if(this.value!='') show_advanced=true; });
if(show_advanced) el.find('.ticket-options-advanced').trigger('click');
});
$(document).delegate('.ticket-actions-delete', 'click', function(e){
e.preventDefault();
var el=$(this);
var tbody=el.closest('tbody');
if(tbody.find('input.ticket_id').val() > 0){
el.text('Deleting...');
$.getJSON($(this).attr('href'), {'em_ajax_action':'delete_ticket', 'id':tbody.find('input.ticket_id').val()}, function(data){
if(data.result){
tbody.remove();
}else{
el.text('Delete');
alert(data.error);
}});
}else{
tbody.remove();
}
return false;
});
}
if($('#em-bookings-table').length > 0){
$(document).delegate('#em-bookings-table .tablenav-pages a', 'click', function(){
var el=$(this);
var form=el.parents('#em-bookings-table form.bookings-filter');
var match=el.attr('href').match(/#[0-9]+/);
if(match!=null&&match.length > 0){
var pno=match[0].replace('#','');
form.find('input[name=pno]').val(pno);
}else{
form.find('input[name=pno]').val(1);
}
form.trigger('submit');
return false;
});
var em_bookings_settings_dialog={
modal:true,
autoOpen: false,
minWidth: 500,
height: 'auto',
buttons: [{
text: EM.bookings_settings_save,
click: function(e){
e.preventDefault();
var match=$("#em-bookings-table form.bookings-filter [name=cols]").val('');
var booking_form_cols=$('form#em-bookings-table-settings-form input.em-bookings-col-item');
$.each(booking_form_cols, function(i,item_match){
if(item_match.value==1){
if(match.val()!=''){
match.val(match.val()+','+item_match.name);
}else{
match.val(item_match.name);
}}
});
$('#em-bookings-table-settings').trigger('submitted');
$('#em-bookings-table form.bookings-filter').trigger('submit');
$(this).dialog('close');
}}]
};
var em_bookings_export_dialog={
modal:true,
autoOpen: false,
minWidth: 500,
height: 'auto',
buttons: [{
text: EM.bookings_export_save,
click: function(e){
$(this).children('form').submit();
$(this).dialog('close');
}}]
};
if($("#em-bookings-table-settings").length > 0){
$("#em-bookings-table-settings").dialog(em_bookings_settings_dialog);
$(document).delegate('#em-bookings-table-settings-trigger','click', function(e){ e.preventDefault(); $("#em-bookings-table-settings").dialog('open'); });
$("#em-bookings-table-export").dialog(em_bookings_export_dialog);
$(document).delegate('#em-bookings-table-export-trigger','click', function(e){ e.preventDefault(); $("#em-bookings-table-export").dialog('open'); });
var export_overlay_show_tickets=function(){
if($('#em-bookings-table-export-form input[name=show_tickets]').is(':checked')){
$('#em-bookings-table-export-form .em-bookings-col-item-ticket').show();
$('#em-bookings-table-export-form #em-bookings-export-cols-active .em-bookings-col-item-ticket input').val(1);
}else{
$('#em-bookings-table-export-form .em-bookings-col-item-ticket').hide().find('input').val(0);
}};
$('#em-bookings-table form select').each(function(i, el){
$(el).change(function(e){
var select_el=$(this);
var input_par=$('#em-bookings-table-export-form input[name='+select_el.attr('name')+']');
var input_par_selected=select_el.find('option:selected');
input_par.val(input_par_selected.val());
});
});
export_overlay_show_tickets();
$('#em-bookings-table-export-form input[name=show_tickets]').click(export_overlay_show_tickets);
$(".em-bookings-cols-sortable").sortable({
connectWith: ".em-bookings-cols-sortable",
update: function(event, ui){
if(ui.item.parents('ul#em-bookings-cols-active, ul#em-bookings-export-cols-active').length > 0){
ui.item.addClass('ui-state-highlight').removeClass('ui-state-default').children('input').val(1);
}else{
ui.item.addClass('ui-state-default').removeClass('ui-state-highlight').children('input').val(0);
}}
}).disableSelection();
load_ui_css=true;
}
$(document).delegate('#em-bookings-table form.bookings-filter', 'submit', function(e){
var el=$(this);
el.parents('#em-bookings-table').find('.table-wrap').first().append('<div id="em-loading" />');
$.post(EM.ajaxurl, el.serializeArray(), function(data){
var root=el.parents('#em-bookings-table').first();
root.replaceWith(data);
$('#em-bookings-table-export input[name=scope]').val(root.find('select[name=scope]').val());
$('#em-bookings-table-export input[name=status]').val(root.find('select[name=status]').val());
jQuery(document).triggerHandler('em_bookings_filtered', [data, root, el]);
});
return false;
});
$(document).delegate('.em-bookings-approve,.em-bookings-reject,.em-bookings-unapprove,.em-bookings-delete', 'click', function(){
var el=$(this);
if(el.hasClass('em-bookings-delete')){
if(!confirm(EM.booking_delete)){ return false; }}
var url=em_ajaxify(el.attr('href'));
var td=el.parents('td').first();
td.html(EM.txt_loading);
td.load(url);
return false;
});
}
if($('.em_bookings_events_table').length > 0){
$(document).delegate('.em_bookings_events_table form', 'submit', function(e){
var el=$(this);
var url=em_ajaxify(el.attr('action'));
el.parents('.em_bookings_events_table').find('.table-wrap').first().append('<div id="em-loading" />');
$.get(url, el.serializeArray(), function(data){
el.parents('.em_bookings_events_table').first().replaceWith(data);
});
return false;
});
$(document).delegate('.em_bookings_events_table .tablenav-pages a', 'click', function(){
var el=$(this);
var url=em_ajaxify(el.attr('href'));
el.parents('.em_bookings_events_table').find('.table-wrap').first().append('<div id="em-loading" />');
$.get(url, function(data){
el.parents('.em_bookings_events_table').first().replaceWith(data);
});
return false;
});
}
$('a.em-booking-button').click(function(e){
e.preventDefault();
var button=$(this);
if(button.text()!=EM.bb_booked&&$(this).text()!=EM.bb_booking){
button.text(EM.bb_booking);
var button_data=button.attr('id').split('_');
$.ajax({
url: EM.ajaxurl,
dataType: 'jsonp',
data: {
event_id:button_data[1],
_wpnonce:button_data[2],
action:'booking_add_one'
},
success:function(response, statusText, xhr, $form){
if(response.result){
button.text(EM.bb_booked);
}else{
button.text(EM.bb_error);
}
if(response.message!='') alert(response.message);
},
error:function(){ button.text(EM.bb_error); }});
}
return false;
});
$('a.em-cancel-button').click(function(e){
e.preventDefault();
var button=$(this);
if(button.text()!=EM.bb_cancelled&&button.text()!=EM.bb_canceling){
button.text(EM.bb_canceling);
var button_data=button.attr('id').split('_');
$.ajax({
url: EM.ajaxurl,
dataType: 'jsonp',
data: {
booking_id:button_data[1],
_wpnonce:button_data[2],
action:'booking_cancel'
},
success:function(response, statusText, xhr, $form){
if(response.result){
button.text(EM.bb_cancelled);
}else{
button.text(EM.bb_cancel_error);
}},
error:function(){ button.text(EM.bb_cancel_error); }});
}
return false;
});
if($('.em-date-single, .em-date-range, #em-date-start').length > 0){
if(EM.locale!='en'&&EM.locale_data){
$.datepicker.setDefaults(EM.locale_data);
}
load_ui_css=true;
em_setup_datepicker('body');
}
if(load_ui_css) em_load_jquery_css();
function updateIntervalDescriptor (){
$(".interval-desc").hide();
var number="-plural";
if($('input#recurrence-interval').val()==1||$('input#recurrence-interval').val()=="")
number="-singular";
var descriptor="span#interval-"+$("select#recurrence-frequency").val()+number;
$(descriptor).show();
}
function updateIntervalSelectors (){
$('p.alternate-selector').hide();
$('p#'+ $('select#recurrence-frequency').val() + "-selector").show();
}
function updateShowHideRecurrence (){
if($('input#event-recurrence').is(":checked")){
$("#event_recurrence_pattern").fadeIn();
$("#event-date-explanation").hide();
$("#recurrence-dates-explanation").show();
$("h3#recurrence-dates-title").show();
$("h3#event-date-title").hide();
}else{
$("#event_recurrence_pattern").hide();
$("#recurrence-dates-explanation").hide();
$("#event-date-explanation").show();
$("h3#recurrence-dates-title").hide();
$("h3#event-date-title").show();
}}
$("#recurrence-dates-explanation").hide();
$("#date-to-submit").hide();
$("#end-date-to-submit").hide();
$("#localised-date").show();
$("#localised-end-date").show();
$('#em-wrapper input.select-all').change(function(){
if($(this).is(':checked')){
$('input.row-selector').prop('checked', true);
$('input.select-all').prop('checked', true);
}else{
$('input.row-selector').prop('checked', false);
$('input.select-all').prop('checked', false);
}});
updateIntervalDescriptor();
updateIntervalSelectors();
updateShowHideRecurrence();
$('input#event-recurrence').change(updateShowHideRecurrence);
$('input#recurrence-interval').keyup(updateIntervalDescriptor);
$('select#recurrence-frequency').change(updateIntervalDescriptor);
$('select#recurrence-frequency').change(updateIntervalSelectors);
if($('.em-location-map').length > 0||$('.em-locations-map').length > 0||$('#em-map').length > 0||$('.em-search-geo').length > 0){
em_maps_load();
}
if(jQuery("div.em-location-data input#location-name").length > 0){
jQuery("div.em-location-data input#location-name").autocomplete({
source: EM.locationajaxurl,
minLength: 2,
focus: function(event, ui){
jQuery("input#location-id").val(ui.item.value);
return false;
},
select: function(event, ui){
jQuery("input#location-id").val(ui.item.id).trigger('change');
jQuery("input#location-name").val(ui.item.value);
jQuery('input#location-address').val(ui.item.address);
jQuery('input#location-town').val(ui.item.town);
jQuery('input#location-state').val(ui.item.state);
jQuery('input#location-region').val(ui.item.region);
jQuery('input#location-postcode').val(ui.item.postcode);
if(ui.item.country==''){
jQuery('select#location-country option:selected').removeAttr('selected');
}else{
jQuery('select#location-country option[value="'+ui.item.country+'"]').attr('selected', 'selected');
}
jQuery('div.em-location-data input, div.em-location-data select').css('background-color','#ccc').attr('readonly','readonly');
jQuery('#em-location-reset').show();
jQuery('#em-location-search-tip').hide();
jQuery(document).triggerHandler('em_locations_autocomplete_selected', [event, ui]);
return false;
}}).data("ui-autocomplete")._renderItem=function(ul, item){
html_val="<a>" + item.label + '<br><span style="font-size:11px"><em>'+ item.address + ', ' + item.town+"</em></span></a>";
return jQuery("<li></li>").data("item.autocomplete", item).append(html_val).appendTo(ul);
};
jQuery('#em-location-reset a').click(function(){
jQuery('div.em-location-data input').css('background-color','#fff').val('').removeAttr('readonly');
jQuery('div.em-location-data select').css('background-color','#fff');
jQuery('div.em-location-data option:selected').removeAttr('selected');
jQuery('input#location-id').val('');
jQuery('#em-location-reset').hide();
jQuery('#em-location-search-tip').show();
jQuery('#em-map').hide();
jQuery('#em-map-404').show();
if(typeof(marker)!=='undefined'){
marker.setPosition(new google.maps.LatLng(0, 0));
infoWindow.close();
marker.setDraggable(true);
}
return false;
});
if(jQuery('input#location-id').val()!='0'&&jQuery('input#location-id').val()!=''){
jQuery('div.em-location-data input, div.em-location-data select').css('background-color','#ccc').attr('readonly','readonly');
jQuery('#em-location-reset').show();
jQuery('#em-location-search-tip').hide();
}}
});
function em_load_jquery_css(){
if(EM.ui_css&&jQuery('link#jquery-ui-css').length==0){
var script=document.createElement("link");
script.id='jquery-ui-css';
script.rel="stylesheet";
script.href=EM.ui_css;
document.body.appendChild(script);
}}
function em_setup_datepicker(wrap){
wrap=jQuery(wrap);
var datepicker_vals={ altFormat: "yy-mm-dd", changeMonth: true, changeYear: true, firstDay:EM.firstDay, yearRange:'-100:+10' };
if(EM.dateFormat) datepicker_vals.dateFormat=EM.dateFormat;
if(EM.yearRange) datepicker_vals.yearRange=EM.yearRange;
jQuery(document).triggerHandler('em_datepicker', datepicker_vals);
dateDivs=wrap.find('.em-date-single, .em-date-range');
if(dateDivs.length > 0){
dateDivs.find('input.em-date-input-loc').each(function(i,dateInput){
var dateInput=jQuery(dateInput);
var dateValue=dateInput.nextAll('input.em-date-input').first();
var dateValue_value=dateValue.val();
dateInput.datepicker(datepicker_vals);
dateInput.datepicker('option', 'altField', dateValue);
if(dateValue_value){
var this_date_formatted=jQuery.datepicker.formatDate(EM.dateFormat, jQuery.datepicker.parseDate('yy-mm-dd', dateValue_value));
dateInput.val(this_date_formatted);
dateValue.val(dateValue_value);
}
dateInput.change(function(){
if(jQuery(this).val()==''){
jQuery(this).nextAll('.em-date-input').first().val('');
}});
});
dateDivs.filter('.em-date-range').find('input.em-date-input-loc').each(function(i,dateInput){
dateInput=jQuery(dateInput);
if(dateInput.hasClass('em-date-start')){
dateInput.datepicker('option','onSelect', function(selectedDate){
var startDate=jQuery(this);
var endDate=startDate.parents('.em-date-range').find('.em-date-end').first();
var startValue=startDate.nextAll('input.em-date-input').first().val();
var endValue=endDate.nextAll('input.em-date-input').first().val();
if(startValue > endValue&&endValue!=''){
endDate.datepicker("setDate" , selectedDate);
endDate.trigger('change');
}
endDate.datepicker("option", 'minDate', selectedDate);
});
}else if(dateInput.hasClass('em-date-end')){
var startInput=dateInput.parents('.em-date-range').find('.em-date-start').first();
if(startInput.val()!=''){
dateInput.datepicker('option', 'minDate', startInput.val());
}}
});
}}
function em_setup_timepicker(wrap){
wrap=jQuery(wrap);
var timepicker_options={
show24Hours: EM.show24hours==1,
step:15
}
jQuery(document).triggerHandler('em_timepicker_options', timepicker_options);
wrap.find(".em-time-input").timePicker(timepicker_options);
wrap.find(".em-time-range input.em-time-start").each(function(i, el){
jQuery(el).data('oldTime', jQuery.timePicker(el).getTime());
}).change(function(){
var start=jQuery(this);
var end=start.nextAll('.em-time-end');
if(end.val()){
var oldTime=start.data('oldTime');
var duration=(jQuery.timePicker(end).getTime() - oldTime);
var time=jQuery.timePicker(start).getTime();
if(jQuery.timePicker(end).getTime() >=oldTime){
jQuery.timePicker(end).setTime(new Date(new Date(time.getTime() + duration)));
}
start.data('oldTime', time);
}});
wrap.find(".em-time-range input.em-time-end").change(function(){
var end=jQuery(this);
var start=end.prevAll('.em-time-start');
if(start.val()){
if(jQuery.timePicker(start).getTime() > jQuery.timePicker(this).getTime()&&(jQuery('.em-date-end').val().length==0||jQuery('.em-date-start').val()==jQuery('.em-date-end').val())){ end.addClass("error"); }else{ end.removeClass("error"); }}
});
wrap.find('.em-time-range input.em-time-all-day').change(function(){
var allday=jQuery(this);
if(allday.is(':checked')){
allday.siblings('.em-time-input').css('background-color','#ccc');
}else{
allday.siblings('.em-time-input').css('background-color','#fff');
}}).trigger('change');
}
var em_ajaxify=function(url){
if(url.search('em_ajax=0')!=-1){
url=url.replace('em_ajax=0','em_ajax=1');
}else if(url.search(/\?/)!=-1){
url=url + "&em_ajax=1";
}else{
url=url + "?em_ajax=1";
}
return url;
};
var em_maps_loaded=false;
var maps={};
var maps_markers={};
var infowindow;
function em_maps_load(){
if(!em_maps_loaded){
if(jQuery('script#google-maps').length==0&&(typeof google!=='object'||typeof google.maps!=='object')){
var script=document.createElement("script");
script.type="text/javascript";
script.id="google-maps";
var proto=(EM.is_ssl) ? 'https:':'http:';
if(typeof EM.google_maps_api!=='undefined'){
script.src=proto + '//maps.google.com/maps/api/js?v=3.24&libraries=places&callback=em_maps&key='+EM.google_maps_api;
}else{
script.src=proto + '//maps.google.com/maps/api/js?v=3.24&libraries=places&callback=em_maps';
}
document.body.appendChild(script);
}else if(typeof google==='object'&&typeof google.maps==='object'&&!em_maps_loaded){
em_maps();
}else if(jQuery('script#google-maps').length > 0){
jQuery(window).load(function(){ if(!em_maps_loaded) em_maps(); });
}}
}
function em_maps_load_locations(el){
var el=jQuery(el);
var map_id=el.attr('id').replace('em-locations-map-','');
var em_data=jQuery.parseJSON(el.nextAll('.em-locations-map-coords').first().text());
if(em_data==null){
var em_data=jQuery.parseJSON(jQuery('#em-locations-map-coords-'+map_id).text());
}
jQuery.getJSON(document.URL, em_data , function(data){
if(data.length > 0){
var map_options={ mapTypeId: google.maps.MapTypeId.ROADMAP };
jQuery(document).triggerHandler('em_maps_locations_map_options', map_options);
var marker_options={};
jQuery(document).triggerHandler('em_maps_location_marker_options', marker_options);
maps[map_id]=new google.maps.Map(el[0], map_options);
maps_markers[map_id]=[];
var minLatLngArr=[0,0];
var maxLatLngArr=[0,0];
for (var i=0; i < data.length; i++){
if(!(data[i].location_latitude==0&&data[i].location_longitude==0)){
var latitude=parseFloat(data[i].location_latitude);
var longitude=parseFloat(data[i].location_longitude);
var location=new google.maps.LatLng(latitude, longitude);
jQuery.extend(marker_options, {
position: location,
map: maps[map_id]
})
var marker=new google.maps.Marker(marker_options);
maps_markers[map_id].push(marker);
marker.setTitle(data[i].location_name);
var myContent='<div class="em-map-balloon"><div id="em-map-balloon-'+map_id+'" class="em-map-balloon-content">'+ data[i].location_balloon +'</div></div>';
em_map_infobox(marker, myContent, maps[map_id]);
minLatLngArr[0]=(latitude < minLatLngArr[0]||i==0) ? latitude:minLatLngArr[0];
minLatLngArr[1]=(longitude < minLatLngArr[1]||i==0) ? longitude:minLatLngArr[1];
maxLatLngArr[0]=(latitude > maxLatLngArr[0]||i==0) ? latitude:maxLatLngArr[0];
maxLatLngArr[1]=(longitude > maxLatLngArr[1]||i==0) ? longitude:maxLatLngArr[1];
}}
var minLatLng=new google.maps.LatLng(minLatLngArr[0],minLatLngArr[1]);
var maxLatLng=new google.maps.LatLng(maxLatLngArr[0],maxLatLngArr[1]);
var bounds=new google.maps.LatLngBounds(minLatLng,maxLatLng);
maps[map_id].fitBounds(bounds);
jQuery(document).triggerHandler('em_maps_locations_hook', [maps[map_id], data, map_id]);
}else{
el.children().first().html('No locations found');
jQuery(document).triggerHandler('em_maps_locations_hook_not_found', [el]);
}});
}
function em_maps_load_location(el){
el=jQuery(el);
var map_id=el.attr('id').replace('em-location-map-','');
em_LatLng=new google.maps.LatLng(jQuery('#em-location-map-coords-'+map_id+' .lat').text(), jQuery('#em-location-map-coords-'+map_id+' .lng').text());
var map_options={
zoom: 14,
center: em_LatLng,
mapTypeId: google.maps.MapTypeId.ROADMAP,
mapTypeControl: false
};
jQuery(document).triggerHandler('em_maps_location_map_options', map_options);
maps[map_id]=new google.maps.Map(document.getElementById('em-location-map-'+map_id), map_options);
var marker_options={
position: em_LatLng,
map: maps[map_id]
};
jQuery(document).triggerHandler('em_maps_location_marker_options', marker_options);
maps_markers[map_id]=new google.maps.Marker(marker_options);
infowindow=new google.maps.InfoWindow({ content: jQuery('#em-location-map-info-'+map_id+' .em-map-balloon').get(0) });
infowindow.open(maps[map_id],maps_markers[map_id]);
maps[map_id].panBy(40,-70);
jQuery(document).triggerHandler('em_maps_location_hook', [maps[map_id], infowindow, maps_markers[map_id], map_id]);
jQuery(window).on('resize', function(e){
google.maps.event.trigger(maps[map_id], "resize");
maps[map_id].setCenter(maps_markers[map_id].getPosition());
maps[map_id].panBy(40,-70);
});
}
jQuery(document).bind('em_search_ajax', function(e, vars, wrapper){
if(em_maps_loaded){
wrapper.find('.em-location-map').each(function(index, el){ em_maps_load_location(el); });
wrapper.find('.em-locations-map').each(function(index, el){ em_maps_load_locations(el); });
}});
function em_maps(){
jQuery('.em-location-map').each(function(index, el){ em_maps_load_location(el); });
jQuery('.em-locations-map').each(function(index, el){ em_maps_load_locations(el); });
if(jQuery('select#location-select-id, input#location-address').length > 0){
var map, marker;
var refresh_map_location=function(){
var location_latitude=jQuery('#location-latitude').val();
var location_longitude=jQuery('#location-longitude').val();
if(!(location_latitude==0&&location_longitude==0)){
var position=new google.maps.LatLng(location_latitude, location_longitude);
marker.setPosition(position);
var mapTitle=(jQuery('input#location-name').length > 0) ? jQuery('input#location-name').val():jQuery('input#title').val();
marker.setTitle(jQuery('input#location-name input#title, #location-select-id').first().val());
jQuery('#em-map').show();
jQuery('#em-map-404').hide();
google.maps.event.trigger(map, 'resize');
map.setCenter(position);
map.panBy(40,-55);
infoWindow.setContent('<div id="location-balloon-content"><strong>' +
mapTitle +
'</strong><br/>' +
jQuery('#location-address').val() +
'<br/>' + jQuery('#location-town').val()+
'</div>'
);
infoWindow.open(map, marker);
jQuery(document).triggerHandler('em_maps_location_hook', [map, infowindow, marker, 0]);
}else{
jQuery('#em-map').hide();
jQuery('#em-map-404').show();
}};
var get_map_by_id=function(id){
if(jQuery('#em-map').length > 0){
jQuery.getJSON(document.URL,{ em_ajax_action:'get_location', id:id }, function(data){
if(data.location_latitude!=0&&data.location_longitude!=0){
loc_latlng=new google.maps.LatLng(data.location_latitude, data.location_longitude);
marker.setPosition(loc_latlng);
marker.setTitle(data.location_name);
marker.setDraggable(false);
jQuery('#em-map').show();
jQuery('#em-map-404').hide();
map.setCenter(loc_latlng);
map.panBy(40,-55);
infoWindow.setContent('<div id="location-balloon-content">'+ data.location_balloon +'</div>');
infoWindow.open(map, marker);
google.maps.event.trigger(map, 'resize');
jQuery(document).triggerHandler('em_maps_location_hook', [map, infowindow, marker, 0]);
}else{
jQuery('#em-map').hide();
jQuery('#em-map-404').show();
}});
}};
jQuery('#location-select-id, input#location-id').change(function(){get_map_by_id(jQuery(this).val());});
jQuery('#location-name, #location-town, #location-address, #location-state, #location-postcode, #location-country').change(function(){
var addresses=[ jQuery('#location-address').val(), jQuery('#location-town').val(), jQuery('#location-state').val(), jQuery('#location-postcode').val() ];
var address='';
jQuery.each(addresses, function(i, val){
if(val!=''){
address=(address=='') ? address+val:address+', '+val;
}});
if(address==''){
jQuery('#em-map').hide();
jQuery('#em-map-404').show();
return false;
}
if(jQuery('#location-country option:selected').val()!=0){
address=(address=='') ? address+jQuery('#location-country option:selected').text():address+', '+jQuery('#location-country option:selected').text();
}
if(address!=''&&jQuery('#em-map').length > 0){
geocoder.geocode({ 'address': address }, function(results, status){
if(status==google.maps.GeocoderStatus.OK){
jQuery('#location-latitude').val(results[0].geometry.location.lat());
jQuery('#location-longitude').val(results[0].geometry.location.lng());
}
refresh_map_location();
});
}});
if(jQuery('#em-map').length > 0){
var em_LatLng=new google.maps.LatLng(0, 0);
map=new google.maps.Map(document.getElementById('em-map'), {
zoom: 14,
center: em_LatLng,
mapTypeId: google.maps.MapTypeId.ROADMAP,
mapTypeControl: false
});
var marker=new google.maps.Marker({
position: em_LatLng,
map: map,
draggable: true
});
infoWindow=new google.maps.InfoWindow({
content: ''
});
var geocoder=new google.maps.Geocoder();
google.maps.event.addListener(infoWindow, 'domready', function(){
document.getElementById('location-balloon-content').parentNode.style.overflow='';
document.getElementById('location-balloon-content').parentNode.parentNode.style.overflow='';
});
google.maps.event.addListener(marker, 'dragend', function(){
var position=marker.getPosition();
jQuery('#location-latitude').val(position.lat());
jQuery('#location-longitude').val(position.lng());
map.setCenter(position);
map.panBy(40,-55);
});
if(jQuery('#location-select-id').length > 0){
jQuery('#location-select-id').trigger('change');
}else{
refresh_map_location();
}
jQuery(document).triggerHandler('em_map_loaded', [map, infowindow, marker]);
}
jQuery(window).on('resize', function(e){
google.maps.event.trigger(map, "resize");
map.setCenter(marker.getPosition());
map.panBy(40,-55);
});
}
em_maps_loaded=true;
jQuery(document).triggerHandler('em_maps_loaded');
}
function em_map_infobox(marker, message, map){
var iw=new google.maps.InfoWindow({ content: message });
google.maps.event.addListener(marker, 'click', function(){
if(infowindow) infowindow.close();
infowindow=iw;
iw.open(map,marker);
});
}
(function(e){function t(t,n,r,i){t.value=e(n).text();e(t).change();if(!navigator.userAgent.match(/msie/i)){t.focus()}r.hide()}function n(e,t){var n=e.getHours();var i=t.show24Hours?n:(n+11)%12+1;var s=e.getMinutes();return r(i)+t.separator+r(s)+(t.show24Hours?"":n<12?" AM":" PM")}function r(e){return(e<10?"0":"")+e}function i(e,t){return typeof e=="object"?o(e):s(e,t)}function s(e,t){if(e){var n=e.split(t.separator);var r=parseFloat(n[0]);var i=parseFloat(n[1]);if(!t.show24Hours){if(r===12&&e.indexOf("AM")!==-1){r=0}else if(r!==12&&e.indexOf("PM")!==-1){r+=12}}var s=new Date(0,0,0,r,i,0);return o(s)}return null}function o(e){e.setFullYear(2001);e.setMonth(0);e.setDate(0);return e}e.fn.timePicker=function(t){var n=e.extend({},e.fn.timePicker.defaults,t);return this.each(function(){e.timePicker(this,n)})};e.timePicker=function(t,n){var r=e(t)[0];return r.timePicker||(r.timePicker=new jQuery._timePicker(r,n))};e.timePicker.version="0.3";e._timePicker=function(r,u){var a=false;var f=false;var l=i(u.startTime,u);var c=i(u.endTime,u);var h="selected";var p="li."+h;e(r).attr("autocomplete","OFF");var d=[];var v=new Date(l);while(v<=c){d[d.length]=n(v,u);v=new Date(v.setMinutes(v.getMinutes()+u.step))}var m=e('<div class="time-picker'+(u.show24Hours?"":" time-picker-12hours")+'"></div>');var g=e("<ul></ul>");for(var y=0;y<d.length;y++){g.append("<li>"+d[y]+"</li>")}m.append(g);m.appendTo("body").hide();m.mouseover(function(){a=true}).mouseout(function(){a=false});e("li",g).mouseover(function(){if(!f){e(p,m).removeClass(h);e(this).addClass(h)}}).mousedown(function(){a=true}).click(function(){t(r,this,m,u);a=false});var b=function(){if(m.is(":visible")){return false}e("li",m).removeClass(h);var t=e(r).offset();m.css({top:t.top+r.offsetHeight,left:t.left});m.show();var i=r.value?s(r.value,u):l;var a=l.getHours()*60+l.getMinutes();var f=i.getHours()*60+i.getMinutes()-a;var p=Math.round(f/u.step);var d=o(new Date(0,0,0,0,p*u.step+a,0));d=l<d&&d<=c?d:l;var v=e("li:contains("+n(d,u)+")",m);if(v.length){v.addClass(h);m[0].scrollTop=v[0].offsetTop}return true};e(r).focus(b).click(b);e(r).blur(function(){if(!a){m.hide()}});e(r)["keydown"](function(n){var i;f=true;var s=m[0].scrollTop;switch(n.keyCode){case 38:if(b()){return false}i=e(p,g);var o=i.prev().addClass(h)[0];if(o){i.removeClass(h);if(o.offsetTop<s){m[0].scrollTop=s-o.offsetHeight}}else{i.removeClass(h);o=e("li:last",g).addClass(h)[0];m[0].scrollTop=o.offsetTop-o.offsetHeight}return false;break;case 40:if(b()){return false}i=e(p,g);var a=i.next().addClass(h)[0];if(a){i.removeClass(h);if(a.offsetTop+a.offsetHeight>s+m[0].offsetHeight){m[0].scrollTop=s+a.offsetHeight}}else{i.removeClass(h);a=e("li:first",g).addClass(h)[0];m[0].scrollTop=0}return false;break;case 13:if(m.is(":visible")){var l=e(p,g)[0];t(r,l,m,u)}return false;break;case 27:m.hide();return false;break}return true});e(r).keyup(function(e){f=false});this.getTime=function(){return s(r.value,u)};this.setTime=function(t){r.value=n(i(t,u),u);e(r).change()}};e.fn.timePicker.defaults={step:30,startTime:new Date(0,0,0,0,0,0),endTime:new Date(0,0,0,23,30,0),separator:":",show24Hours:true}})(jQuery);
jQuery(document).ready(function($){
$(document).delegate('.em-bookings-approve-offline', 'click', function(e){
if(!confirm(EM.offline_confirm)){
e.stopPropagation();
e.stopImmediatePropagation();
e.preventDefault();
return false;
}});
$(document).delegate('.em-transaction-delete', 'click', function(){
var el=$(this);
if(!confirm(EM.transaction_delete)){ return false; }
var url=em_ajaxify(el.attr('href'));
var td=el.parents('td').first();
td.html(EM.txt_loading);
td.load(url);
return false;
});
var tooltip_vars={ position: { my: 'left center', at: 'right center'  }};
$(document).trigger('emp-qtip',[tooltip_vars]);
$('form.em-booking-form span.form-tip, form#em-booking-form span.form-tip').qtip(tooltip_vars);
});
(function(a,b,c){(function(a){"use strict",typeof define=="function"&&define.amd?define(["jquery"],a):jQuery&&!jQuery.fn.qtip&&a(jQuery)})(function(d){function I(a){var b=function(a){return a===g||"object"!=typeof a},c=function(a){return!d.isFunction(a)&&(!a&&!a.attr||a.length<1||"object"==typeof a&&!a.jquery)};if(!a||"object"!=typeof a)return f;b(a.metadata)&&(a.metadata={type:a.metadata});if("content"in a){if(b(a.content)||a.content.jquery)a.content={text:a.content};c(a.content.text||f)&&(a.content.text=f),"title"in a.content&&(b(a.content.title)&&(a.content.title={text:a.content.title}),c(a.content.title.text||f)&&(a.content.title.text=f))}return"position"in a&&b(a.position)&&(a.position={my:a.position,at:a.position}),"show"in a&&b(a.show)&&(a.show=a.show.jquery?{target:a.show}:{event:a.show}),"hide"in a&&b(a.hide)&&(a.hide=a.hide.jquery?{target:a.hide}:{event:a.hide}),"style"in a&&b(a.style)&&(a.style={classes:a.style}),d.each(u,function(){this.sanitize&&this.sanitize(a)}),a}function J(h,i,q,r){function Q(a){var b=0,c,d=i,e=a.split(".");while(d=d[e[b++]])b<e.length&&(c=d);return[c||i,e.pop()]}function R(a,b,c){var e=d.Event("tooltip"+a);return e.originalEvent=(c?d.extend({},c):g)||P.event||g,M.trigger(e,[s].concat(b||[])),!e.isDefaultPrevented()}function S(){var a=i.style.widget;M.toggleClass("ui-helper-reset "+y,a).toggleClass(B,i.style.def&&!a),O.content&&O.content.toggleClass(y+"-content",a),O.titlebar&&O.titlebar.toggleClass(y+"-header",a),O.button&&O.button.toggleClass(x+"-icon",!a)}function T(a){O.title&&(O.titlebar.remove(),O.titlebar=O.title=O.button=g,a!==f&&s.reposition())}function U(){var a=i.content.title.button,b=typeof a=="string",c=b?a:"Close tooltip";O.button&&O.button.remove(),a.jquery?O.button=a:O.button=d("<a />",{"class":"ui-state-default ui-tooltip-close "+(i.style.widget?"":x+"-icon"),title:c,"aria-label":c}).prepend(d("<span />",{"class":"ui-icon ui-icon-close",html:"&times;"})),O.button.appendTo(O.titlebar).attr("role","button").click(function(a){return M.hasClass(z)||s.hide(a),f}),s.redraw()}function V(){var a=J+"-title";O.titlebar&&T(),O.titlebar=d("<div />",{"class":x+"-titlebar "+(i.style.widget?"ui-widget-header":"")}).append(O.title=d("<div />",{id:a,"class":x+"-title","aria-atomic":e})).insertBefore(O.content).delegate(".ui-tooltip-close","mousedown keydown mouseup keyup mouseout",function(a){d(this).toggleClass("ui-state-active ui-state-focus",a.type.substr(-4)==="down")}).delegate(".ui-tooltip-close","mouseover mouseout",function(a){d(this).toggleClass("ui-state-hover",a.type==="mouseover")}),i.content.title.button?U():s.rendered&&s.redraw()}function W(a){var b=O.button,c=O.title;if(!s.rendered)return f;a?(c||V(),U()):b.remove()}function X(a,b){var c=O.title;if(!s.rendered||!a)return f;d.isFunction(a)&&(a=a.call(h,P.event,s));if(a===f||!a&&a!=="")return T(f);a.jquery&&a.length>0?c.empty().append(a.css({display:"block"})):c.html(a),s.redraw(),b!==f&&s.rendered&&M[0].offsetWidth>0&&s.reposition(P.event)}function Y(a,b){function g(a){function i(c){c&&(delete h[c.src],clearTimeout(s.timers.img[c.src]),d(c).unbind(N)),d.isEmptyObject(h)&&(s.redraw(),b!==f&&s.reposition(P.event),a())}var g,h={};if((g=e.find("img[src]:not([height]):not([width])")).length===0)return i();g.each(function(a,b){if(h[b.src]!==c)return;var e=0,f=3;(function g(){if(b.height||b.width||e>f)return i(b);e+=1,s.timers.img[b.src]=setTimeout(g,700)})(),d(b).bind("error"+N+" load"+N,function(){i(this)}),h[b.src]=b})}var e=O.content;return!s.rendered||!a?f:(d.isFunction(a)&&(a=a.call(h,P.event,s)||""),a.jquery&&a.length>0?e.empty().append(a.css({display:"block"})):e.html(a),s.rendered<0?M.queue("fx",g):(L=0,g(d.noop)),s)}function Z(){function l(a){if(M.hasClass(z))return f;clearTimeout(s.timers.show),clearTimeout(s.timers.hide);var b=function(){s.toggle(e,a)};i.show.delay>0?s.timers.show=setTimeout(b,i.show.delay):b()}function m(a){if(M.hasClass(z)||K||L)return f;var b=d(a.relatedTarget||a.target),e=b.closest(A)[0]===M[0],h=b[0]===g.show[0];clearTimeout(s.timers.show),clearTimeout(s.timers.hide);if(c.target==="mouse"&&e||i.hide.fixed&&/mouse(out|leave|move)/.test(a.type)&&(e||h)){try{a.preventDefault(),a.stopImmediatePropagation()}catch(j){}return}i.hide.delay>0?s.timers.hide=setTimeout(function(){s.hide(a)},i.hide.delay):s.hide(a)}function n(a){if(M.hasClass(z))return f;clearTimeout(s.timers.inactive),s.timers.inactive=setTimeout(function(){s.hide(a)},i.hide.inactive)}function o(a){s.rendered&&M[0].offsetWidth>0&&s.reposition(a)}var c=i.position,g={show:i.show.target,hide:i.hide.target,viewport:d(c.viewport),document:d(b),body:d(b.body),window:d(a)},j={show:d.trim(""+i.show.event).split(" "),hide:d.trim(""+i.hide.event).split(" ")},k=d.browser.msie&&parseInt(d.browser.version,10)===6;M.bind("mouseenter"+N+" mouseleave"+N,function(a){var b=a.type==="mouseenter";b&&s.focus(a),M.toggleClass(D,b)}),/mouse(out|leave)/i.test(i.hide.event)&&i.hide.leave==="window"&&g.window.bind("mouseout"+N+" blur"+N,function(a){!/select|option/.test(a.target.nodeName)&&!a.relatedTarget&&s.hide(a)}),i.hide.fixed?(g.hide=g.hide.add(M),M.bind("mouseover"+N,function(){M.hasClass(z)||clearTimeout(s.timers.hide)})):/mouse(over|enter)/i.test(i.show.event)&&g.hide.bind("mouseleave"+N,function(a){clearTimeout(s.timers.show)}),(""+i.hide.event).indexOf("unfocus")>-1&&c.container.closest("html").bind("mousedown"+N,function(a){var b=d(a.target),c=s.rendered&&!M.hasClass(z)&&M[0].offsetWidth>0,e=b.parents(A).filter(M[0]).length>0;b[0]!==h[0]&&b[0]!==M[0]&&!e&&!h.has(b[0]).length&&!b.attr("disabled")&&s.hide(a)}),"number"==typeof i.hide.inactive&&(g.show.bind("qtip-"+q+"-inactive",n),d.each(t.inactiveEvents,function(a,b){g.hide.add(O.tooltip).bind(b+N+"-inactive",n)})),d.each(j.hide,function(a,b){var c=d.inArray(b,j.show),e=d(g.hide);c>-1&&e.add(g.show).length===e.length||b==="unfocus"?(g.show.bind(b+N,function(a){M[0].offsetWidth>0?m(a):l(a)}),delete j.show[c]):g.hide.bind(b+N,m)}),d.each(j.show,function(a,b){g.show.bind(b+N,l)}),"number"==typeof i.hide.distance&&g.show.add(M).bind("mousemove"+N,function(a){var b=P.origin||{},c=i.hide.distance,d=Math.abs;(d(a.pageX-b.pageX)>=c||d(a.pageY-b.pageY)>=c)&&s.hide(a)}),c.target==="mouse"&&(g.show.bind("mousemove"+N,function(a){v={pageX:a.pageX,pageY:a.pageY,type:"mousemove"}}),c.adjust.mouse&&(i.hide.event&&(M.bind("mouseleave"+N,function(a){(a.relatedTarget||a.target)!==g.show[0]&&s.hide(a)}),O.target.bind("mouseenter"+N+" mouseleave"+N,function(a){P.onTarget=a.type==="mouseenter"})),g.document.bind("mousemove"+N,function(a){s.rendered&&P.onTarget&&!M.hasClass(z)&&M[0].offsetWidth>0&&s.reposition(a||v)}))),(c.adjust.resize||g.viewport.length)&&(d.event.special.resize?g.viewport:g.window).bind("resize"+N,o),(g.viewport.length||k&&M.css("position")==="fixed")&&g.viewport.bind("scroll"+N,o)}function _(){var c=[i.show.target[0],i.hide.target[0],s.rendered&&O.tooltip[0],i.position.container[0],i.position.viewport[0],i.position.container.closest("html")[0],a,b];s.rendered?d([]).pushStack(d.grep(c,function(a){return typeof a=="object"})).unbind(N):i.show.target.unbind(N+"-create")}var s=this,E=b.body,J=x+"-"+q,K=0,L=0,M=d(),N=".qtip-"+q,O,P;s.id=q,s.rendered=f,s.destroyed=f,s.elements=O={target:h},s.timers={img:{}},s.options=i,s.checks={},s.plugins={},s.cache=P={event:{},target:d(),disabled:f,attr:r,onTarget:f,lastClass:""},s.checks.builtin={"^id$":function(a,b,c){var g=c===e?t.nextid:c,h=x+"-"+g;g!==f&&g.length>0&&!d("#"+h).length&&(M[0].id=h,O.content[0].id=h+"-content",O.title[0].id=h+"-title")},"^content.text$":function(a,b,c){Y(c)},"^content.title.text$":function(a,b,c){if(!c)return T();!O.title&&c&&V(),X(c)},"^content.title.button$":function(a,b,c){W(c)},"^position.(my|at)$":function(a,b,c){"string"==typeof c&&(a[b]=new u.Corner(c))},"^position.container$":function(a,b,c){s.rendered&&M.appendTo(c)},"^show.ready$":function(){s.rendered?s.toggle(e):s.render(1)},"^style.classes$":function(a,b,c){M.attr("class",x+" qtip "+c)},"^style.widget|content.title":S,"^events.(render|show|move|hide|focus|blur)$":function(a,b,c){M[(d.isFunction(c)?"":"un")+"bind"]("tooltip"+b,c)},"^(show|hide|position).(event|target|fixed|inactive|leave|distance|viewport|adjust)":function(){var a=i.position;M.attr("tracking",a.target==="mouse"&&a.adjust.mouse),_(),Z()}},d.extend(s,{render:function(a){if(s.rendered)return s;var b=i.content.text,c=i.content.title.text,g=i.position;return d.attr(h[0],"aria-describedby",J),M=O.tooltip=d("<div/>",{id:J,"class":x+" qtip "+B+" "+i.style.classes+" "+x+"-pos-"+i.position.my.abbrev(),width:i.style.width||"",height:i.style.height||"",tracking:g.target==="mouse"&&g.adjust.mouse,role:"alert","aria-live":"polite","aria-atomic":f,"aria-describedby":J+"-content","aria-hidden":e}).toggleClass(z,P.disabled).data("qtip",s).appendTo(i.position.container).append(O.content=d("<div />",{"class":x+"-content",id:J+"-content","aria-atomic":e})),s.rendered=-1,L=1,K=1,c&&(V(),d.isFunction(c)||X(c,f)),d.isFunction(b)||Y(b,f),s.rendered=e,S(),d.each(i.events,function(a,b){d.isFunction(b)&&M.bind(a==="toggle"?"tooltipshow tooltiphide":"tooltip"+a,b)}),d.each(u,function(){this.initialize==="render"&&this(s)}),Z(),M.queue("fx",function(b){R("render"),L=0,K=0,s.redraw(),(i.show.ready||a)&&s.toggle(e,P.event,f),b()}),s},get:function(a){var b,c;switch(a.toLowerCase()){case"dimensions":b={height:M.outerHeight(),width:M.outerWidth()};break;case"offset":b=u.offset(M,i.position.container);break;default:c=Q(a.toLowerCase()),b=c[0][c[1]],b=b.precedance?b.string():b}return b},set:function(a,b){function n(a,b){var c,d,e;for(c in l)for(d in l[c])if(e=(new RegExp(d,"i")).exec(a))b.push(e),l[c][d].apply(s,b)}var c=/^position\.(my|at|adjust|target|container)|style|content|show\.ready/i,h=/^content\.(title|attr)|style/i,j=f,k=f,l=s.checks,m;return"string"==typeof a?(m=a,a={},a[m]=b):a=d.extend(e,{},a),d.each(a,function(b,e){var f=Q(b.toLowerCase()),g;g=f[0][f[1]],f[0][f[1]]="object"==typeof e&&e.nodeType?d(e):e,a[b]=[f[0],f[1],e,g],j=c.test(b)||j,k=h.test(b)||k}),I(i),K=L=1,d.each(a,n),K=L=0,s.rendered&&M[0].offsetWidth>0&&(j&&s.reposition(i.position.target==="mouse"?g:P.event),k&&s.redraw()),s},toggle:function(a,c){function t(){a?(d.browser.msie&&M[0].style.removeAttribute("filter"),M.css("overflow",""),"string"==typeof h.autofocus&&d(h.autofocus,M).focus(),h.target.trigger("qtip-"+q+"-inactive")):M.css({display:"",visibility:"",opacity:"",left:"",top:""}),R(a?"visible":"hidden")}if(!s.rendered)return a?s.render(1):s;var g=a?"show":"hide",h=i[g],j=i[a?"hide":"show"],k=i.position,l=i.content,m=M[0].offsetWidth>0,n=a||h.target.length===1,o=!c||h.target.length<2||P.target[0]===c.target,p,r;(typeof a).search("boolean|number")&&(a=!m);if(!M.is(":animated")&&m===a&&o)return s;if(c){if(/over|enter/.test(c.type)&&/out|leave/.test(P.event.type)&&i.show.target.add(c.target).length===i.show.target.length&&M.has(c.relatedTarget).length)return s;P.event=d.extend({},c)}return R(g,[90])?(d.attr(M[0],"aria-hidden",!a),a?(P.origin=d.extend({},v),s.focus(c),d.isFunction(l.text)&&Y(l.text,f),d.isFunction(l.title.text)&&X(l.title.text,f),!G&&k.target==="mouse"&&k.adjust.mouse&&(d(b).bind("mousemove.qtip",function(a){v={pageX:a.pageX,pageY:a.pageY,type:"mousemove"}}),G=e),s.reposition(c,arguments[2]),!h.solo||d(A,h.solo).not(M).qtip("hide",d.Event("tooltipsolo"))):(clearTimeout(s.timers.show),delete P.origin,G&&!d(A+'[tracking="true"]:visible',h.solo).not(M).length&&(d(b).unbind("mousemove.qtip"),G=f),s.blur(c)),h.effect===f||n===f?(M[g](),t.call(M)):d.isFunction(h.effect)?(M.stop(1,1),h.effect.call(M,s),M.queue("fx",function(a){t(),a()})):M.fadeTo(90,a?1:0,t),a&&h.target.trigger("qtip-"+q+"-inactive"),s):s},show:function(a){return s.toggle(e,a)},hide:function(a){return s.toggle(f,a)},focus:function(a){if(!s.rendered)return s;var b=d(A),c=parseInt(M[0].style.zIndex,10),e=t.zindex+b.length,f=d.extend({},a),g;return M.hasClass(C)||R("focus",[e],f)&&(c!==e&&(b.each(function(){this.style.zIndex>c&&(this.style.zIndex=this.style.zIndex-1)}),b.filter("."+C).qtip("blur",f)),M.addClass(C)[0].style.zIndex=e),s},blur:function(a){return M.removeClass(C),R("blur",[M.css("zIndex")],a),s},reposition:function(c,e){if(!s.rendered||K)return s;K=1;var g=i.position.target,h=i.position,j=h.my,k=h.at,q=h.adjust,r=q.method.split(" "),t=M.outerWidth(),w=M.outerHeight(),x=0,y=0,z=M.css("position")==="fixed",A=h.viewport,B={left:0,top:0},C=h.container,D=M[0].offsetWidth>0,E,F,G;if(d.isArray(g)&&g.length===2)k={x:m,y:l},B={left:g[0],top:g[1]};else if(g==="mouse"&&(c&&c.pageX||P.event.pageX))k={x:m,y:l},c=(c&&(c.type==="resize"||c.type==="scroll")?P.event:c&&c.pageX&&c.type==="mousemove"?c:v&&v.pageX&&(q.mouse||!c||!c.pageX)?{pageX:v.pageX,pageY:v.pageY}:!q.mouse&&P.origin&&P.origin.pageX&&i.show.distance?P.origin:c)||c||P.event||v||{},B={top:c.pageY,left:c.pageX};else{g==="event"&&c&&c.target&&c.type!=="scroll"&&c.type!=="resize"?P.target=d(c.target):g!=="event"&&(P.target=d(g.jquery?g:O.target)),g=P.target,g=d(g).eq(0);if(g.length===0)return s;g[0]===b||g[0]===a?(x=u.iOS?a.innerWidth:g.width(),y=u.iOS?a.innerHeight:g.height(),g[0]===a&&(B={top:(A||g).scrollTop(),left:(A||g).scrollLeft()})):u.imagemap&&g.is("area")?E=u.imagemap(s,g,k,u.viewport?r:f):u.svg&&typeof g[0].xmlbase=="string"?E=u.svg(s,g,k,u.viewport?r:f):(x=g.outerWidth(),y=g.outerHeight(),B=u.offset(g,C)),E&&(x=E.width,y=E.height,F=E.offset,B=E.position);if(u.iOS>3.1&&u.iOS<4.1||u.iOS>=4.3&&u.iOS<4.33||!u.iOS&&z)G=d(a),B.left-=G.scrollLeft(),B.top-=G.scrollTop();B.left+=k.x===o?x:k.x===p?x/2:0,B.top+=k.y===n?y:k.y===p?y/2:0}return B.left+=q.x+(j.x===o?-t:j.x===p?-t/2:0),B.top+=q.y+(j.y===n?-w:j.y===p?-w/2:0),u.viewport?(B.adjusted=u.viewport(s,B,h,x,y,t,w),F&&B.adjusted.left&&(B.left+=F.left),F&&B.adjusted.top&&(B.top+=F.top)):B.adjusted={left:0,top:0},R("move",[B,A.elem||A],c)?(delete B.adjusted,e===f||!D||isNaN(B.left)||isNaN(B.top)||g==="mouse"||!d.isFunction(h.effect)?M.css(B):d.isFunction(h.effect)&&(h.effect.call(M,s,d.extend({},B)),M.queue(function(a){d(this).css({opacity:"",height:""}),d.browser.msie&&this.style.removeAttribute("filter"),a()})),K=0,s):s},redraw:function(){if(s.rendered<1||L)return s;var a=i.style,b=i.position.container,c,d,e,f;return L=1,R("redraw"),a.height&&M.css(k,a.height),a.width?M.css(j,a.width):(M.css(j,"").appendTo(H),d=M.width(),d%2<1&&(d+=1),e=M.css("max-width")||"",f=M.css("min-width")||"",c=(e+f).indexOf("%")>-1?b.width()/100:0,e=(e.indexOf("%")>-1?c:1)*parseInt(e,10)||d,f=(f.indexOf("%")>-1?c:1)*parseInt(f,10)||0,d=e+f?Math.min(Math.max(d,f),e):d,M.css(j,Math.round(d)).appendTo(b)),R("redrawn"),L=0,s},disable:function(a){return"boolean"!=typeof a&&(a=!M.hasClass(z)&&!P.disabled),s.rendered?(M.toggleClass(z,a),d.attr(M[0],"aria-disabled",a)):P.disabled=!!a,s},enable:function(){return s.disable(f)},destroy:function(){var a=h[0],b=d.attr(a,F),c=h.data("qtip");s.destroyed=e,s.rendered&&(M.stop(1,0).remove(),d.each(s.plugins,function(){this.destroy&&this.destroy()})),clearTimeout(s.timers.show),clearTimeout(s.timers.hide),_();if(!c||s===c)d.removeData(a,"qtip"),i.suppress&&b&&(d.attr(a,"title",b),h.removeAttr(F)),h.removeAttr("aria-describedby");return h.unbind(".qtip-"+q),delete w[s.id],h}})}function K(a,c){var h,i,j,k,l,m=d(this),n=d(b.body),o=this===b?n:m,p=m.metadata?m.metadata(c.metadata):g,q=c.metadata.type==="html5"&&p?p[c.metadata.name]:g,r=m.data(c.metadata.name||"qtipopts");try{r=typeof r=="string"?d.parseJSON(r):r}catch(s){}k=d.extend(e,{},t.defaults,c,typeof r=="object"?I(r):g,I(q||p)),i=k.position,k.id=a;if("boolean"==typeof k.content.text){j=m.attr(k.content.attr);if(k.content.attr!==f&&j)k.content.text=j;else return f}i.container.length||(i.container=n),i.target===f&&(i.target=o),k.show.target===f&&(k.show.target=o),k.show.solo===e&&(k.show.solo=i.container.closest("body")),k.hide.target===f&&(k.hide.target=o),k.position.viewport===e&&(k.position.viewport=i.container),i.container=i.container.eq(0),i.at=new u.Corner(i.at),i.my=new u.Corner(i.my);if(d.data(this,"qtip"))if(k.overwrite)m.qtip("destroy");else if(k.overwrite===f)return f;return k.suppress&&(l=d.attr(this,"title"))&&d(this).removeAttr("title").attr(F,l).attr("title",""),h=new J(m,k,a,!!j),d.data(this,"qtip",h),m.bind("remove.qtip-"+a+" removeqtip.qtip-"+a,function(){h.destroy()}),h}function L(a){var b=this,c=a.elements.tooltip,g=a.options.content.ajax,h=t.defaults.content.ajax,i=".qtip-ajax",j=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,k=e,l=f,m;a.checks.ajax={"^content.ajax":function(a,d,e){d==="ajax"&&(g=e),d==="once"?b.init():g&&g.url?b.load():c.unbind(i)}},d.extend(b,{init:function(){return g&&g.url&&c.unbind(i)[g.once?"one":"bind"]("tooltipshow"+i,b.load),b},load:function(c){function r(){var b;if(a.destroyed)return;k=f,p&&(l=e,a.show(c.originalEvent)),(b=h.complete||g.complete)&&d.isFunction(b)&&b.apply(g.context||a,arguments)}function s(b,c,e){var f;if(a.destroyed)return;o&&"string"==typeof b&&(b=d("<div/>").append(b.replace(j,"")).find(o)),(f=h.success||g.success)&&d.isFunction(f)?f.call(g.context||a,b,c,e):a.set("content.text",b)}function t(b,c,d){if(a.destroyed||b.status===0)return;a.set("content.text",c+": "+d)}if(l){l=f;return}var i=g.url.lastIndexOf(" "),n=g.url,o,p=!g.loading&&k;if(p)try{c.preventDefault()}catch(q){}else if(c&&c.isDefaultPrevented())return b;m&&m.abort&&m.abort(),i>-1&&(o=n.substr(i),n=n.substr(0,i)),m=d.ajax(d.extend({error:h.error||t,context:a},g,{url:n,success:s,complete:r}))},destroy:function(){m&&m.abort&&m.abort(),a.destroyed=e}}),b.init()}function M(a,b,c){var d=Math.ceil(b/2),e=Math.ceil(c/2),f={bottomright:[[0,0],[b,c],[b,0]],bottomleft:[[0,0],[b,0],[0,c]],topright:[[0,c],[b,0],[b,c]],topleft:[[0,0],[0,c],[b,c]],topcenter:[[0,c],[d,0],[b,c]],bottomcenter:[[0,0],[b,0],[d,c]],rightcenter:[[0,0],[b,e],[0,c]],leftcenter:[[b,0],[b,c],[0,e]]};return f.lefttop=f.bottomright,f.righttop=f.bottomleft,f.leftbottom=f.topright,f.rightbottom=f.topleft,f[a.string()]}function N(a,b){function D(a){var b=v.is(":visible");v.show(),a(),v.toggle(b)}function E(){x.width=r.height,x.height=r.width}function F(){x.width=r.width,x.height=r.height}function G(b,d,g,j){if(!t.tip)return;var k=q.corner.clone(),u=g.adjusted,v=a.options.position.adjust.method.split(" "),x=v[0],y=v[1]||v[0],z={left:f,top:f,x:0,y:0},A,B={},C;q.corner.fixed!==e&&(x===s&&k.precedance===h&&u.left&&k.y!==p?k.precedance=k.precedance===h?i:h:x!==s&&u.left&&(k.x=k.x===p?u.left>0?m:o:k.x===m?o:m),y===s&&k.precedance===i&&u.top&&k.x!==p?k.precedance=k.precedance===i?h:i:y!==s&&u.top&&(k.y=k.y===p?u.top>0?l:n:k.y===l?n:l),k.string()!==w.corner.string()&&(w.top!==u.top||w.left!==u.left)&&q.update(k,f)),A=q.position(k,u),A[k.x]+=I(k,k.x),A[k.y]+=I(k,k.y),A.right!==c&&(A.left=-A.right),A.bottom!==c&&(A.top=-A.bottom),A.user=Math.max(0,r.offset);if(z.left=x===s&&!!u.left)k.x===p?B["margin-left"]=z.x=A["margin-left"]-u.left:(C=A.right!==c?[u.left,-A.left]:[-u.left,A.left],(z.x=Math.max(C[0],C[1]))>C[0]&&(g.left-=u.left,z.left=f),B[A.right!==c?o:m]=z.x);if(z.top=y===s&&!!u.top)k.y===p?B["margin-top"]=z.y=A["margin-top"]-u.top:(C=A.bottom!==c?[u.top,-A.top]:[-u.top,A.top],(z.y=Math.max(C[0],C[1]))>C[0]&&(g.top-=u.top,z.top=f),B[A.bottom!==c?n:l]=z.y);t.tip.css(B).toggle(!(z.x&&z.y||k.x===p&&z.y||k.y===p&&z.x)),g.left-=A.left.charAt?A.user:x!==s||z.top||!z.left&&!z.top?A.left:0,g.top-=A.top.charAt?A.user:y!==s||z.left||!z.left&&!z.top?A.top:0,w.left=u.left,w.top=u.top,w.corner=k.clone()}function H(){var b=r.corner,c=a.options.position,d=c.at,g=c.my.string?c.my.string():c.my;return b===f||g===f&&d===f?f:(b===e?q.corner=new u.Corner(g):b.string||(q.corner=new u.Corner(b),q.corner.fixed=e),w.corner=new u.Corner(q.corner.string()),q.corner.string()!=="centercenter")}function I(a,b,c){b=b?b:a[a.precedance];var d=t.titlebar&&a.y===l,e=d?t.titlebar:v,f="border-"+b+"-width",g=function(a){return parseInt(a.css(f),10)},h;return D(function(){h=(c?g(c):g(t.content)||g(e)||g(v))||0}),h}function J(a){var b=t.titlebar&&a.y===l,c=b?t.titlebar:t.content,e=d.browser.mozilla,f=e?"-moz-":d.browser.webkit?"-webkit-":"",g="border-radius-"+a.y+a.x,h="border-"+a.y+"-"+a.x+"-radius",i=function(a){return parseInt(c.css(a),10)||parseInt(v.css(a),10)},j;return D(function(){j=i(h)||i(f+h)||i(f+g)||i(g)||0}),j}function K(a){function z(a,b,c){var d=a.css(b)||n;return c&&d===a.css(c)?f:j.test(d)?f:d}var b,c,g,h=t.tip.css("cssText",""),i=a||q.corner,j=/rgba?\(0, 0, 0(, 0)?\)|transparent|#123456/i,k="border-"+i[i.precedance]+"-color",m="background-color",n="transparent",o=" !important",s=t.titlebar,u=s&&(i.y===l||i.y===p&&h.position().top+x.height/2+r.offset<s.outerHeight(e)),w=u?s:t.content;D(function(){y.fill=z(h,m)||z(w,m)||z(t.content,m)||z(v,m)||h.css(m),y.border=z(h,k,"color")||z(w,k,"color")||z(t.content,k,"color")||z(v,k,"color")||v.css(k),d("*",h).add(h).css("cssText",m+":"+n+o+";border:0"+o+";")})}function L(a){var b=a.precedance===i,c=x[b?j:k],d=x[b?k:j],e=a.string().indexOf(p)>-1,f=c*(e?.5:1),g=Math.pow,h=Math.round,l,m,n,o=Math.sqrt(g(f,2)+g(d,2)),q=[z/f*o,z/d*o];return q[2]=Math.sqrt(g(q[0],2)-g(z,2)),q[3]=Math.sqrt(g(q[1],2)-g(z,2)),l=o+q[2]+q[3]+(e?0:q[0]),m=l/o,n=[h(m*d),h(m*c)],{height:n[b?0:1],width:n[b?1:0]}}function N(a,b,c){return"<qvml:"+a+' xmlns="urn:schemas-microsoft.com:vml" class="qtip-vml" '+(b||"")+' style="behavior: url(#default#VML); '+(c||"")+'" />'}var q=this,r=a.options.style.tip,t=a.elements,v=t.tooltip,w={top:0,left:0},x={width:r.width,height:r.height},y={},z=r.border||0,A=".qtip-tip",B=!!(d("<canvas />")[0]||{}).getContext,C;q.corner=g,q.mimic=g,q.border=z,q.offset=r.offset,q.size=x,a.checks.tip={"^position.my|style.tip.(corner|mimic|border)$":function(){q.init()||q.destroy(),a.reposition()},"^style.tip.(height|width)$":function(){x={width:r.width,height:r.height},q.create(),q.update(),a.reposition()},"^content.title.text|style.(classes|widget)$":function(){t.tip&&t.tip.length&&q.update()}},d.extend(q,{init:function(){var a=H()&&(B||d.browser.msie);return a&&(q.create(),q.update(),v.unbind(A).bind("tooltipmove"+A,G),B||v.bind("tooltipredraw tooltipredrawn",function(a){a.type==="tooltipredraw"?(C=t.tip.html(),t.tip.html("")):t.tip.html(C)})),a},create:function(){var a=x.width,b=x.height,c;t.tip&&t.tip.remove(),t.tip=d("<div />",{"class":"ui-tooltip-tip"}).css({width:a,height:b}).prependTo(v),B?d("<canvas />").appendTo(t.tip)[0].getContext("2d").save():(c=N("shape",'coordorigin="0,0"',"position:absolute;"),t.tip.html(c+c),d("*",t.tip).bind("click mousedown",function(a){a.stopPropagation()}))},update:function(a,b){var c=t.tip,j=c.children(),k=x.width,s=x.height,A=r.mimic,C=Math.round,D,G,H,J,O;a||(a=w.corner||q.corner),A===f?A=a:(A=new u.Corner(A),A.precedance=a.precedance,A.x==="inherit"?A.x=a.x:A.y==="inherit"?A.y=a.y:A.x===A.y&&(A[a.precedance]=a[a.precedance])),D=A.precedance,a.precedance===h?E():F(),t.tip.css({width:k=x.width,height:s=x.height}),K(a),y.border!=="transparent"?(z=I(a,g),r.border===0&&z>0&&(y.fill=y.border),q.border=z=r.border!==e?r.border:z):q.border=z=0,H=M(A,k,s),q.size=O=L(a),c.css(O),a.precedance===i?J=[C(A.x===m?z:A.x===o?O.width-k-z:(O.width-k)/2),C(A.y===l?O.height-s:0)]:J=[C(A.x===m?O.width-k:0),C(A.y===l?z:A.y===n?O.height-s-z:(O.height-s)/2)],B?(j.attr(O),G=j[0].getContext("2d"),G.restore(),G.save(),G.clearRect(0,0,3e3,3e3),G.fillStyle=y.fill,G.strokeStyle=y.border,G.lineWidth=z*2,G.lineJoin="miter",G.miterLimit=100,G.translate(J[0],J[1]),G.beginPath(),G.moveTo(H[0][0],H[0][1]),G.lineTo(H[1][0],H[1][1]),G.lineTo(H[2][0],H[2][1]),G.closePath(),z&&(v.css("background-clip")==="border-box"&&(G.strokeStyle=y.fill,G.stroke()),G.strokeStyle=y.border,G.stroke()),G.fill()):(H="m"+H[0][0]+","+H[0][1]+" l"+H[1][0]+","+H[1][1]+" "+H[2][0]+","+H[2][1]+" xe",J[2]=z&&/^(r|b)/i.test(a.string())?parseFloat(d.browser.version,10)===8?2:1:0,j.css({coordsize:k+z+" "+(s+z),antialias:""+(A.string().indexOf(p)>-1),left:J[0],top:J[1],width:k+z,height:s+z}).each(function(a){var b=d(this);b[b.prop?"prop":"attr"]({coordsize:k+z+" "+(s+z),path:H,fillcolor:y.fill,filled:!!a,stroked:!a}).toggle(!!z||!!a),!a&&b.html()===""&&b.html(N("stroke",'weight="'+z*2+'px" color="'+y.border+'" miterlimit="1000" joinstyle="miter"'))})),b!==f&&q.position(a)},position:function(a){var b=t.tip,c={},e=Math.max(0,r.offset),g,n,o;return r.corner===f||!b?f:(a=a||q.corner,g=a.precedance,n=L(a),o=[a.x,a.y],g===h&&o.reverse(),d.each(o,function(b,d){var f,h,o;d===p?(f=g===i?m:l,c[f]="50%",c["margin-"+f]=-Math.round(n[g===i?j:k]/2)+e):(f=I(a,d),h=I(a,d,t.content),o=J(a),c[d]=b?h:e+(o>f?o:-f))}),c[a[g]]-=n[g===h?j:k],b.css({top:"",bottom:"",left:"",right:"",margin:""}).css(c),c)},destroy:function(){t.tip&&t.tip.remove(),t.tip=!1,v.unbind(A)}}),q.init()}function O(c){function s(){q=d(p,j).not("[disabled]").map(function(){return typeof this.focus=="function"?this:null})}function t(a){q.length<1&&a.length?a.not("body").blur():q.first().focus()}function v(a){var b=d(a.target),c=b.closest(".qtip"),e;e=c.length<1?f:parseInt(c[0].style.zIndex,10)>parseInt(j[0].style.zIndex,10),!e&&d(a.target).closest(A)[0]!==j[0]&&t(b)}var g=this,h=c.options.show.modal,i=c.elements,j=i.tooltip,k="#qtip-overlay",l=".qtipmodal",m=l+c.id,n="is-modal-qtip",o=d(b.body),p=u.modal.focusable.join(","),q={},r;c.checks.modal={"^show.modal.(on|blur)$":function(){g.init(),i.overlay.toggle(j.is(":visible"))},"^content.text$":function(){s()}},d.extend(g,{init:function(){return h.on?(r=g.create(),j.attr(n,e).css("z-index",u.modal.zindex+d(A+"["+n+"]").length).unbind(l).unbind(m).bind("tooltipshow"+l+" tooltiphide"+l,function(a,b,c){var e=a.originalEvent;if(a.target===j[0])if(e&&a.type==="tooltiphide"&&/mouse(leave|enter)/.test(e.type)&&d(e.relatedTarget).closest(r[0]).length)try{a.preventDefault()}catch(f){}else(!e||e&&!e.solo)&&g[a.type.replace("tooltip","")](a,c)}).bind("tooltipfocus"+l,function(a){if(a.isDefaultPrevented()||a.target!==j[0])return;var b=d(A).filter("["+n+"]"),c=u.modal.zindex+b.length,e=parseInt(j[0].style.zIndex,10);r[0].style.zIndex=c-2,b.each(function(){this.style.zIndex>e&&(this.style.zIndex-=1)}),b.end().filter("."+C).qtip("blur",a.originalEvent),j.addClass(C)[0].style.zIndex=c;try{a.preventDefault()}catch(f){}}).bind("tooltiphide"+l,function(a){a.target===j[0]&&d("["+n+"]").filter(":visible").not(j).last().qtip("focus",a)}),h.escape&&d(b).unbind(m).bind("keydown"+m,function(a){a.keyCode===27&&j.hasClass(C)&&c.hide(a)}),h.blur&&i.overlay.unbind(m).bind("click"+m,function(a){j.hasClass(C)&&c.hide(a)}),s(),g):g},create:function(){function c(){r.css({height:d(a).height(),width:d(a).width()})}var b=d(k);return b.length?i.overlay=b.insertAfter(d(A).last()):(r=i.overlay=d("<div />",{id:k.substr(1),html:"<div></div>",mousedown:function(){return f}}).hide().insertAfter(d(A).last()),d(a).unbind(l).bind("resize"+l,c),c(),r)},toggle:function(a,b,c){if(a&&a.isDefaultPrevented())return g;var i=h.effect,k=b?"show":"hide",l=r.is(":visible"),p=d("["+n+"]").filter(":visible").not(j),q;return r||(r=g.create()),r.is(":animated")&&l===b||!b&&p.length?g:(b?(r.css({left:0,top:0}),r.toggleClass("blurs",h.blur),h.stealfocus!==f&&(o.bind("focusin"+m,v),t(d("body :focus")))):o.unbind("focusin"+m),r.stop(e,f),d.isFunction(i)?i.call(r,b):i===f?r[k]():r.fadeTo(parseInt(c,10)||90,b?1:0,function(){b||d(this).hide()}),b||r.queue(function(a){r.css({left:"",top:""}),a()}),g)},show:function(a,b){return g.toggle(a,e,b)},hide:function(a,b){return g.toggle(a,f,b)},destroy:function(){var a=r;return a&&(a=d("["+n+"]").not(j).length<1,a?(i.overlay.remove(),d(b).unbind(l)):i.overlay.unbind(l+c.id),o.undelegate("*","focusin"+m)),j.removeAttr(n).unbind(l)}}),g.init()}function P(a){var b=this,c=a.elements,e=c.tooltip,f=".bgiframe-"+a.id;d.extend(b,{init:function(){c.bgiframe=d('<iframe class="ui-tooltip-bgiframe" frameborder="0" tabindex="-1" src="javascript:\'\';"  style="display:block; position:absolute; z-index:-1; filter:alpha(opacity=0); -ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";"></iframe>'),c.bgiframe.appendTo(e),e.bind("tooltipmove"+f,b.adjust)},adjust:function(){var b=a.get("dimensions"),d=a.plugins.tip,f=c.tip,g,h;h=parseInt(e.css("border-left-width"),10)||0,h={left:-h,top:-h},d&&f&&(g=d.corner.precedance==="x"?["width","left"]:["height","top"],h[g[1]]-=f[g[0]]()),c.bgiframe.css(h).css(b)},destroy:function(){c.bgiframe.remove(),e.unbind(f)}}),b.init()}var e=!0,f=!1,g=null,h="x",i="y",j="width",k="height",l="top",m="left",n="bottom",o="right",p="center",q="flip",r="flipinvert",s="shift",t,u,v,w={},x="ui-tooltip",y="ui-widget",z="ui-state-disabled",A="div.qtip."+x,B=x+"-default",C=x+"-focus",D=x+"-hover",E="_replacedByqTip",F="oldtitle",G,H;H=d("<div/>",{id:"qtip-rcontainer"}),d(function(){H.appendTo(b.body)}),t=d.fn.qtip=function(a,b,h){var i=(""+a).toLowerCase(),j=g,k=d.makeArray(arguments).slice(1),l=k[k.length-1],m=this[0]?d.data(this[0],"qtip"):g;if(!arguments.length&&m||i==="api")return m;if("string"==typeof a)return this.each(function(){var a=d.data(this,"qtip");if(!a)return e;l&&l.timeStamp&&(a.cache.event=l);if(i!=="option"&&i!=="options"||!b)a[i]&&a[i].apply(a[i],k);else if(d.isPlainObject(b)||h!==c)a.set(b,h);else return j=a.get(b),f}),j!==g?j:this;if("object"==typeof a||!arguments.length)return m=I(d.extend(e,{},a)),t.bind.call(this,m,l)},t.bind=function(a,b){return this.each(function(g){function n(a){function b(){l.render(typeof a=="object"||h.show.ready),i.show.add(i.hide).unbind(k)}if(l.cache.disabled)return f;l.cache.event=d.extend({},a),l.cache.target=a?d(a.target):[c],h.show.delay>0?(clearTimeout(l.timers.show),l.timers.show=setTimeout(b,h.show.delay),j.show!==j.hide&&i.hide.bind(j.hide,function(){clearTimeout(l.timers.show)})):b()}var h,i,j,k,l,m;m=d.isArray(a.id)?a.id[g]:a.id,m=!m||m===f||m.length<1||w[m]?t.nextid++:w[m]=m,k=".qtip-"+m+"-create",l=K.call(this,m,a);if(l===f)return e;h=l.options,d.each(u,function(){this.initialize==="initialize"&&this(l)}),i={show:h.show.target,hide:h.hide.target},j={show:d.trim(""+h.show.event).replace(/ /g,k+" ")+k,hide:d.trim(""+h.hide.event).replace(/ /g,k+" ")+k},/mouse(over|enter)/i.test(j.show)&&!/mouse(out|leave)/i.test(j.hide)&&(j.hide+=" mouseleave"+k),i.show.bind("mousemove"+k,function(a){v={pageX:a.pageX,pageY:a.pageY,type:"mousemove"},l.cache.onTarget=e}),i.show.bind(j.show,n),(h.show.ready||h.prerender)&&n(b)})},u=t.plugins={Corner:function(a){a=(""+a).replace(/([A-Z])/," $1").replace(/middle/gi,p).toLowerCase(),this.x=(a.match(/left|right/i)||a.match(/center/)||["inherit"])[0].toLowerCase(),this.y=(a.match(/top|bottom|center/i)||["inherit"])[0].toLowerCase();var b=a.charAt(0);this.precedance=b==="t"||b==="b"?i:h,this.string=function(){return this.precedance===i?this.y+this.x:this.x+this.y},this.abbrev=function(){var a=this.x.substr(0,1),b=this.y.substr(0,1);return a===b?a:this.precedance===i?b+a:a+b},this.invertx=function(a){this.x=this.x===m?o:this.x===o?m:a||this.x},this.inverty=function(a){this.y=this.y===l?n:this.y===n?l:a||this.y},this.clone=function(){return{x:this.x,y:this.y,precedance:this.precedance,string:this.string,abbrev:this.abbrev,clone:this.clone,invertx:this.invertx,inverty:this.inverty}}},offset:function(a,b){function j(a,b){c.left+=b*a.scrollLeft(),c.top+=b*a.scrollTop()}var c=a.offset(),e=a.closest("body")[0],f=b,g,h,i;if(f){do f.css("position")!=="static"&&(h=f.position(),c.left-=h.left+(parseInt(f.css("borderLeftWidth"),10)||0)+(parseInt(f.css("marginLeft"),10)||0),c.top-=h.top+(parseInt(f.css("borderTopWidth"),10)||0)+(parseInt(f.css("marginTop"),10)||0),!g&&(i=f.css("overflow"))!=="hidden"&&i!=="visible"&&(g=f));while((f=d(f[0].offsetParent)).length);g&&g[0]!==e&&j(g,1)}return c},iOS:parseFloat((""+(/CPU.*OS ([0-9_]{1,5})|(CPU like).*AppleWebKit.*Mobile/i.exec(navigator.userAgent)||[0,""])[1]).replace("undefined","3_2").replace("_",".").replace("_",""))||f,fn:{attr:function(a,b){if(this.length){var c=this[0],e="title",f=d.data(c,"qtip");if(a===e&&f&&"object"==typeof f&&f.options.suppress)return arguments.length<2?d.attr(c,F):(f&&f.options.content.attr===e&&f.cache.attr&&f.set("content.text",b),this.attr(F,b))}return d.fn["attr"+E].apply(this,arguments)},clone:function(a){var b=d([]),c="title",e=d.fn["clone"+E].apply(this,arguments);return a||e.filter("["+F+"]").attr("title",function(){return d.attr(this,F)}).removeAttr(F),e}}},d.each(u.fn,function(a,b){if(!b||d.fn[a+E])return e;var c=d.fn[a+E]=d.fn[a];d.fn[a]=function(){return b.apply(this,arguments)||c.apply(this,arguments)}}),d.ui||(d["cleanData"+E]=d.cleanData,d.cleanData=function(a){for(var b=0,e;(e=a[b])!==c;b++)try{d(e).triggerHandler("removeqtip")}catch(f){}d["cleanData"+E](a)}),t.version="@VERSION",t.nextid=0,t.inactiveEvents="click dblclick mousedown mouseup mousemove mouseleave mouseenter".split(" "),t.zindex=15e3,t.defaults={prerender:f,id:f,overwrite:e,suppress:e,content:{text:e,attr:"title",title:{text:f,button:f}},position:{my:"top left",at:"bottom right",target:f,container:f,viewport:f,adjust:{x:0,y:0,mouse:e,resize:e,method:"flip flip"},effect:function(a,b,c){d(this).animate(b,{duration:200,queue:f})}},show:{target:f,event:"mouseenter",effect:e,delay:90,solo:f,ready:f,autofocus:f},hide:{target:f,event:"mouseleave",effect:e,delay:0,fixed:f,inactive:f,leave:"window",distance:f},style:{classes:"",widget:f,width:f,height:f,def:e},events:{render:g,move:g,show:g,hide:g,toggle:g,visible:g,hidden:g,focus:g,blur:g}},u.svg=function(a,c,e,f){var g=d(b),h=c[0],i={width:0,height:0,position:{top:1e10,left:1e10}},j,k,l,m,n;while(!h.getBBox)h=h.parentNode;if(h.getBBox&&h.parentNode){j=h.getBBox(),k=h.getScreenCTM(),l=h.farthestViewportElement||h;if(!l.createSVGPoint)return i;m=l.createSVGPoint(),m.x=j.x,m.y=j.y,n=m.matrixTransform(k),i.position.left=n.x,i.position.top=n.y,m.x+=j.width,m.y+=j.height,n=m.matrixTransform(k),i.width=n.x-i.position.left,i.height=n.y-i.position.top,i.position.left+=g.scrollLeft(),i.position.top+=g.scrollTop()}return i},u.ajax=function(a){var b=a.plugins.ajax;return"object"==typeof b?b:a.plugins.ajax=new L(a)},u.ajax.initialize="render",u.ajax.sanitize=function(a){var b=a.content,c;b&&"ajax"in b&&(c=b.ajax,typeof c!="object"&&(c=a.content.ajax={url:c}),"boolean"!=typeof c.once&&c.once&&(c.once=!!c.once))},d.extend(e,t.defaults,{content:{ajax:{loading:e,once:e}}}),u.tip=function(a){var b=a.plugins.tip;return"object"==typeof b?b:a.plugins.tip=new N(a)},u.tip.initialize="render",u.tip.sanitize=function(a){var b=a.style,c;b&&"tip"in b&&(c=a.style.tip,typeof c!="object"&&(a.style.tip={corner:c}),/string|boolean/i.test(typeof c.corner)||(c.corner=e),typeof c.width!="number"&&delete c.width,typeof c.height!="number"&&delete c.height,typeof c.border!="number"&&c.border!==e&&delete c.border,typeof c.offset!="number"&&delete c.offset)},d.extend(e,t.defaults,{style:{tip:{corner:e,mimic:f,width:6,height:6,border:e,offset:0}}}),u.modal=function(a){var b=a.plugins.modal;return"object"==typeof b?b:a.plugins.modal=new O(a)},u.modal.initialize="render",u.modal.sanitize=function(a){a.show&&(typeof a.show.modal!="object"?a.show.modal={on:!!a.show.modal}:typeof a.show.modal.on=="undefined"&&(a.show.modal.on=e))},u.modal.zindex=t.zindex-200,u.modal.focusable=["a[href]","area[href]","input","select","textarea","button","iframe","object","embed","[tabindex]","[contenteditable]"],d.extend(e,t.defaults,{show:{modal:{on:f,effect:e,blur:e,stealfocus:e,escape:e}}}),u.viewport=function(c,d,e,f,g,q,t){function L(a,b,c,e,f,g,h,i,j){var k=d[f],l=w[a],m=y[a],n=c===s,o=-E.offset[f]+D.offset[f]+D["scroll"+f],q=l===f?j:l===g?-j:-j/2,t=m===f?i:m===g?-i:-i/2,u=G&&G.size?G.size[h]||0:0,v=G&&G.corner&&G.corner.precedance===a&&!n?u:0,x=o-k+v,z=k+j-D[h]-o+v,A=q-(w.precedance===a||l===w[b]?t:0)-(m===p?i/2:0);return n?(v=G&&G.corner&&G.corner.precedance===b?u:0,A=(l===f?1:-1)*q-v,d[f]+=x>0?x:z>0?-z:0,d[f]=Math.max(-E.offset[f]+D.offset[f]+(v&&G.corner[a]===p?G.offset:0),k-A,Math.min(Math.max(-E.offset[f]+D.offset[f]+D[h],k+A),d[f]))):(e*=c===r?2:0,x>0&&(l!==f||z>0)?(d[f]-=A+e,J["invert"+a](f)):z>0&&(l!==g||x>0)&&(d[f]-=(l===p?-A:A)+e,J["invert"+a](g)),d[f]<o&&-d[f]>z&&(d[f]=k,J=w.clone())),d[f]-k}var u=e.target,v=c.elements.tooltip,w=e.my,y=e.at,z=e.adjust,A=z.method.split(" "),B=A[0],C=A[1]||A[0],D=e.viewport,E=e.container,F=c.cache,G=c.plugins.tip,H={left:0,top:0},I,J,K;if(!D.jquery||u[0]===a||u[0]===b.body||z.method==="none")return H;I=v.css("position")==="fixed",D={elem:D,height:D[(D[0]===a?"h":"outerH")+"eight"](),width:D[(D[0]===a?"w":"outerW")+"idth"](),scrollleft:I?0:D.scrollLeft(),scrolltop:I?0:D.scrollTop(),offset:D.offset()||{left:0,top:0}},E={elem:E,scrollLeft:E.scrollLeft(),scrollTop:E.scrollTop(),offset:E.offset()||{left:0,top:0}};if(B!=="shift"||C!=="shift")J=w.clone();return H={left:B!=="none"?L(h,i,B,z.x,m,o,j,f,q):0,top:C!=="none"?L(i,h,C,z.y,l,n,k,g,t):0},J&&F.lastClass!==(K=x+"-pos-"+J.abbrev())&&v.removeClass(c.cache.lastClass).addClass(c.cache.lastClass=K),H},u.imagemap=function(a,b,c,e){function v(a,b,c){var d=0,e=1,f=1,g=0,h=0,i=a.width,j=a.height;while(i>0&&j>0&&e>0&&f>0){i=Math.floor(i/2),j=Math.floor(j/2),c.x===m?e=i:c.x===o?e=a.width-i:e+=Math.floor(i/2),c.y===l?f=j:c.y===n?f=a.height-j:f+=Math.floor(j/2),d=b.length;while(d--){if(b.length<2)break;g=b[d][0]-a.position.left,h=b[d][1]-a.position.top,(c.x===m&&g>=e||c.x===o&&g<=e||c.x===p&&(g<e||g>a.width-e)||c.y===l&&h>=f||c.y===n&&h<=f||c.y===p&&(h<f||h>a.height-f))&&b.splice(d,1)}}return{left:b[0][0],top:b[0][1]}}b.jquery||(b=d(b));var f=a.cache.areas={},g=(b[0].shape||b.attr("shape")).toLowerCase(),h=b[0].coords||b.attr("coords"),i=h.split(","),j=[],k=d('img[usemap="#'+b.parent("map").attr("name")+'"]'),q=k.offset(),r={width:0,height:0,position:{top:1e10,right:0,bottom:0,left:1e10}},s=0,t=0,u;q.left+=Math.ceil((k.outerWidth()-k.width())/2),q.top+=Math.ceil((k.outerHeight()-k.height())/2);if(g==="poly"){s=i.length;while(s--)t=[parseInt(i[--s],10),parseInt(i[s+1],10)],t[0]>r.position.right&&(r.position.right=t[0]),t[0]<r.position.left&&(r.position.left=t[0]),t[1]>r.position.bottom&&(r.position.bottom=t[1]),t[1]<r.position.top&&(r.position.top=t[1]),j.push(t)}else{s=-1;while(s++<i.length)j.push(parseInt(i[s],10))}switch(g){case"rect":r={width:Math.abs(j[2]-j[0]),height:Math.abs(j[3]-j[1]),position:{left:Math.min(j[0],j[2]),top:Math.min(j[1],j[3])}};break;case"circle":r={width:j[2]+2,height:j[2]+2,position:{left:j[0],top:j[1]}};break;case"poly":r.width=Math.abs(r.position.right-r.position.left),r.height=Math.abs(r.position.bottom-r.position.top),c.abbrev()==="c"?r.position={left:r.position.left+r.width/2,top:r.position.top+r.height/2}:(f[c+h]||(r.position=v(r,j.slice(),c),e&&(e[0]==="flip"||e[1]==="flip")&&(r.offset=v(r,j.slice(),{x:c.x===m?o:c.x===o?m:p,y:c.y===l?n:c.y===n?l:p}),r.offset.left-=r.position.left,r.offset.top-=r.position.top),f[c+h]=r),r=f[c+h]),r.width=r.height=0}return r.position.left+=q.left,r.position.top+=q.top,r},u.bgiframe=function(a){var b=d.browser,c=a.plugins.bgiframe;return d("select, object").length<1||!b.msie||(""+b.version).charAt(0)!=="6"?f:"object"==typeof c?c:a.plugins.bgiframe=new P(a)},u.bgiframe.initialize="render"})})(window,document);
jQuery(document).ready(function(){
jQuery('.home #wrapper #main #home-news-hilight .fusion-image-size-fixed img[sizes="(max-width: 320px) 100vw, 320px"]')
.attr('sizes',"(max-width: 320px) 100vw, 640px");
adr_objs=jQuery('.webinar-item .content .act-box');
for(i=0; i < adr_objs.length; i++){
if(jQuery(adr_objs[i]).find('a.thumb-box').attr('href')=="http://thac.or.th/events/adr-week/"||jQuery(adr_objs[i]).find('a.thumb-box').attr('href')=="http://thac.or.th/en/events/adr-week/"){
jQuery(adr_objs[i]).find('a.thumb-box').attr("href", "http://thac.or.th/adrweek/");
}
if(jQuery(adr_objs[i]).find('h4.title a').text()=="ADR WEEK" &&
(jQuery(adr_objs[i]).find('h4.title a').attr('href')=="http://thac.or.th/events/adr-week/" ||
jQuery(adr_objs[i]).find('h4.title a').attr('href')=="http://thac.or.th/en/events/adr-week/"
)){
jQuery(adr_objs[i]).find('h4.title a').attr("href", "http://thac.or.th/adrweek/");
}}
if(jQuery('#home-news-hilight .fusion-posts-container').length){
jQuery('#home-news-hilight .fusion-posts-container').slick({
prevArrow: '<div prev-bt><i class="fa fa-caret-left"></i> </div>',
nextArrow: '<div next-bt><i class="fa fa-caret-right"></i> </div>',
cssEase: 'cubic-bezier(0.23, 1, 0.32, 1)'
});
}
if(jQuery('#home-news-latest .fusion-posts-container').length){
jQuery('#home-news-latest .fusion-posts-container').slick({
prevArrow: '<div prev-bt><i class="fa fa-caret-left"></i> </div>',
nextArrow: '<div next-bt><i class="fa fa-caret-right"></i> </div>',
slidesToShow: 4,
cssEase: 'cubic-bezier(0.23, 1, 0.32, 1)',
speed: 400,
responsive: [
{
breakpoint: 769,
settings: {
slidesToShow: 2
}},
{
breakpoint: 481,
settings: {
slidesToShow: 1
}}
]
});
}
if(typeof newsletter_check!=="function"){
window.newsletter_check=function (f){
var re=/^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-]{1,})+\.)+([a-zA-Z0-9]{2,})+$/;
if(!re.test(f.elements["ne"].value)){
alert("The email is not correct");
return false;
}
for (var i=1; i<20; i++){
if(f.elements["np" + i]&&f.elements["np" + i].required&&f.elements["np" + i].value==""){
alert("");
return false;
}}
if(f.elements["ny"]&&!f.elements["ny"].checked){
alert("You must accept the privacy statement");
return false;
}
return true;
}}
});