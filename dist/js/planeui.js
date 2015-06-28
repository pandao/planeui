/*!
 * PlaneUI v0.1.0
 * @file        planeui.js 
 * @description The Modern HTML5 Cross-Device Responsive Front-end UI Framework.
 * @license     MIT License
 * @author      Pandao
 * {@link       https://github.com/pandao/planeui}
 * @updateTime  2015-06-27
 */

(function(factory) {
    
    "use strict";
    
	if(typeof exports === "object" && typeof module === "object")
    {
		module.exports = factory();
    } 
    else if(typeof define === "function" && (define.amd || define.cmd))
    {
        define(factory);
    }
    else
    {
        window.PUI = window.PlaneUI = window.$ = factory();
    }    
    
})(function() {
    
(function(window, $) {

	var PlaneUI = PUI = $;

    PlaneUI.extend({
        version : "0.1.0",

        homePage : "https://github.com/pandao/planeui",        

        dialogIndex : 1000,

        getPixelRatio : function(context) {

            var backingStore = context.backingStorePixelRatio ||
                         context.webkitBackingStorePixelRatio ||
                            context.mozBackingStorePixelRatio ||
                             context.msBackingStorePixelRatio ||
                              context.oBackingStorePixelRatio ||
                               context.backingStorePixelRatio || 1;

            return (window.devicePixelRatio || 1) / backingStore;
        },

        mouseOrTouch : function(mouseType, touchType) {
            mouseType = mouseType || "click";
            touchType = touchType || "touchend";

            var eventType = mouseType;

            try {
                document.createEvent("TouchEvent");
                eventType = touchType;
            } 
            catch(e) {} 

            return eventType;
        },

        clickOrTouch : function(touchType) {
            return this.mouseOrTouch("click", touchType);
        },

        contextMenuOrTouch : function() {
            return this.mouseOrTouch("contextmenu", "touchend");
        },

        jsonEncode : function(json) {
            return JSON.stringify(json);
        },

        jsonDecode : function(json) {
            return JSON.parse(json);
        },

        support : {
            touchEvent : function() {
                try {
                    document.createEvent("TouchEvent");
                    
                    return true;                    
                } catch(e) {                    
                    return false;
                }                 
            },

            canvas : function() {                
                try { 
                    document.createElement('canvas').getContext('2d'); 
                    
                    return true;
                    
                } catch(e) {
                    return false;
                }
            },

            worker : function() {
                return (typeof(Worker) == "undefined") ? false : true;
            },
            
            placeholder : function() {
                return ('placeholder' in document.createElement('input'));
            }
        },
        
        responsive : {
            xs : function() {
                return ($(window).width() < 640);
            },
            sm : function() {
                return ($(window).width() >= 640 && $(window).width() < 768);
            },
            md : function() {
                return ($(window).width() >= 768 && $(window).width() < 992);
            },
            lg : function() {
                return ($(window).width() >= 992 && $(window).width() < 1200);
            },
            xl : function() {
                return ($(window).width() >= 1200 && $(window).width() < 1400);
            },
            xxl : function() {
                return ($(window).width() >= 1400);
            }
        }
    });

    window.PUI = window.PlaneUI = window.$ = PlaneUI;

    $(function() { 
        $("*").bind("touchstart", function(e) {
            $(this).addClass("hover");
        }).bind("touchcancel touchend", function() {
            $(this).removeClass("hover");
        });

        $("a").click(function() {
            $(this).blur();
        });
    });

})(window, jQuery);

(function ($) {

    $(function() { 
        $('.pui-button-sheets-more').each(function() {
            var $this = $(this);

            $this.bind($.clickOrTouch(), function() {
                var parent = $this.parent();
                var parentNext = parent.next();
                var moreHeight = parent.parent().attr('pui-button-sheets-show-more-height'); 
                parent.parent().height(moreHeight);
                parentNext.fadeIn(1000); 

                var alternate = parentNext.find('a').eq(0);
                parentNext.append('<a href="javascript:;"></a>');
                parent.append(alternate);
                $this.remove();
            });
        });
    }); 

})(PlaneUI);
(function ($) {

    $(function() {

        $("pui-checkbox").each(function(i) {  

            var $this    = $(this);
            var checkbox = $('<input type="checkbox"/>'); 

            checkbox.attr("name", $this.attr('name'));            
            checkbox.val($this.attr('value'));

            if($this.hasClass('checked')) 
            {
                checkbox.attr("checked", "checked");
            }

            if($this.attr('disabled') == "disabled") 
            {
                checkbox.attr("disabled", "disabled");
            }

            $this.append(checkbox);

            $this.bind($.clickOrTouch(), function() {

                if($(this).attr('disabled') == "disabled") return ;

                $(this).toggleClass('checked');

                var input = $(this).find('input'); 

                if(input.attr('checked') == 'checked') 
                {
                    input.removeAttr('checked');
                }
                else 
                {
                    input.attr('checked', 'checked'); 
                }

            });

        });

        $("[checkbox-checked-all]").bind($.clickOrTouch(), function() {
            var name = $(this).attr("checkbox-checked-all");

            $("[name='"+name+"']").each(function() {

                if($(this).attr('disabled') != "disabled") {
                    $(this).addClass("checked");

                    var input = $(this).find('input'); 
                    input.attr('checked', 'checked'); 
                }
            });
        });

        $("[checkbox-cancel]").bind($.clickOrTouch(), function() {
            var name = $(this).attr("checkbox-cancel");

            $("[name='"+name+"']").each(function() {

                if($(this).attr('disabled') != "disabled") {
                    $(this).removeClass("checked");

                    var input = $(this).find('input'); 
                    input.removeAttr('checked'); 
                }
            });
        });

        $("[checkbox-inverse]").bind($.clickOrTouch(), function() {
            var name = $(this).attr("checkbox-inverse");

            $("[name='"+name+"']").each(function() { 

                if($(this).attr('disabled') != "disabled") {

                    var input = $(this).find('input'); 

                    if($(this).attr("class") == "checked") {
                        $(this).removeClass("checked");
                        input.removeAttr('checked'); 
                    } else {
                        $(this).addClass("checked");
                        input.attr('checked', 'checked'); 
                    }
                } 
            });
        });

    });

})(PlaneUI);
(function($) {
    
    function colorPicker(options) {
        options = options || {};

        var defaults = {
            path   : "",
            width  : "",
            height : ""
        };

        var $this    = $(this);
        var settings = $.extend(defaults, options);

        $.getJSON(settings.path + "dist/data/material.design.colors.json", function(json) {
            var colorList = [];
            var nameList  = [];
            var sheet     = "";

            for (var i in json)
            {
                for (var x in json[i])
                {
                    var name  = i + ((x == 500) ? "" : "-" + x);
                    var color = json[i][x];

                    if (color) {
                        nameList.push(name);
                        colorList.push(color);

                        sheet += '<a href="javascript:;" class="pui-bg-' + name + '" name="' + name + '" color="' + color + ' "title="' + name + '" style="z-index:' + (total--) + '"></a>';
                    }
                }
            }

            var total = nameList.length;

            $this.each(function() {
                var wrap      = '<div class="pui-color-picker"></div>';
                var textInput = $(this);

                textInput.wrap(wrap);

                var colorPicker = $(this).parent();
                
                colorPicker.append('<div class="pui-button-sheet-list" style="display:none;"></div>');
                
                var colorSheet  = colorPicker.children(".pui-button-sheet-list").eq(0);

                textInput.bind("click focus touchend", function() {
                    colorSheet.show();
                });

                colorSheet.append(sheet);
                
                var colorBtn = colorSheet.find("a");
                
                if (settings.width !== "") {
                    colorBtn.width(settings.width);
                }
                
                if (settings.height !== "") {
                    colorBtn.height(settings.height);
                }
                
                colorBtn.bind($.clickOrTouch(), function() {
                    var hex   = $(this).attr("color").replace(" ", "");
                    var $name = $(this).attr("name").replace(" ", "");

                    textInput.val(hex).css({
                        color           : ($name === "white") ? "#555" : "#fff",
                        borderColor     : ($name === "white") ? "#ddd" : hex,
                        backgroundColor : hex
                    });
                });

                colorPicker.mouseleave(function(){
                    colorSheet.hide();
                });
            });
        });
    }
    
    $.fn.puiColorPicker = $.fn.materialDesignColorPicker = colorPicker;
    
})(PlaneUI);
(function ($) {

    function dialog(options, yes, cancel) {
        return new dialog.creater(options, yes, cancel);
    };

    dialog.creater = function(options, yes, cancel, no) { 

        this.guid = (new Date()).getTime();

        var defaults = {
            id     : "pui-dialog-" + this.guid,
            type   : "default",
            url    : "",
            title  : "",
            header : {
                subTitle   : "",
                icon       : "",
                titleStyle : "",
                style      : "",
                className  : ""
            },
            radius  : true,
            cache   : false,             
            from    : "",
            content : "",
            footer  : "",
            toolbar : "close",
            buttons : {
                values : {
                    yes    : "确定",
                    no     : "否",
                    cancel : "取消"
                },
                styles  : {},
                "class" : {},
                yes     : function() {},
                no      : function() {},
                cancel  : function() {}
            },
            animated     : true,
            speed        : 800,
            fixed        : true,
            width        : "",
            height       : "",
            padding      : 25,
            style        : {},
            addClass     : "",
            top          : "center",
            left         : "center",
            autozIndex   : false,
            zIndex       : $.dialogIndex,
            target       : "",                        // only ID
            drag         : true,
            dragEvent    : "all",                   // all|mouse|touch
            dragTarget   : "header",
            mask         : true,
            maskColor    : "#000",
            maskStyle    : {},
            maskOpacity  : 0.5,
            maskClickClosed : true,
            lockScreen   : true,
            timeout      : false,
            ajax         : false,
            yes          : function() {},
            no           : function() {},
            cancel       : function() {},
            onload       : function() {},
            onshow       : function() {},
            onclose      : function() {},
            onreset      : function() {},
            onremove     : function() {},
            onmin        : function() {},
            onblank      : function() {},
            onrefresh    : function() {},
            onbeforeload : function() {},
        };

        var settings  = this.settings = $.extend(true, defaults, options);

        this.id       = settings.id;
        this.url      = settings.url;
        this.type     = settings.type;
        this.title    = settings.title;
        this.yes      = yes    || settings.yes;
        this.no       = no     || settings.no;
        this.cancel   = cancel || settings.cancel;
        this.onload   = settings.onload;
        this.onshow   = settings.onshow;
        this.onclose  = settings.onclose;
        this.onreset  = settings.onreset;
        this.onremove = settings.onremove;
        this.onmin    = settings.onmin;
        this.onmax    = settings.onmax;
        this.onblank  = settings.onblank;
        this.onrefresh    = settings.onrefresh;
        this.onbeforeload = settings.onbeforeload; 

        var _this   = this;
        var $dialog = $('<div class="pui-dialog">'); 

        this.target = $dialog;

        $dialog.hide();

        this.mask({
            show : settings.mask,
            fixed : settings.fixed,
            color : settings.maskColor,
            style : settings.maskStyle,
            zIndex : settings.zIndex - 1,
            opacity : settings.maskOpacity
        });

        $("body").append($dialog);

        $dialog.attr({
            id : settings.id,
            type : settings.type
        });

        if(settings.radius) $dialog.addClass('pui-radius');  

        var type = settings.type;

        this.signleCloseBtn = '<label class="pui-close"></label>';

        this.header(settings.header);

        this.content({
            url     : settings.url,
            from    : settings.from,
            padding : settings.padding,
            content : settings.content,
            buttons : settings.buttons
        });

        this.footer(settings.footer);

        this.width(settings.width);
        this.height(settings.height);

        this.fixed(settings.fixed);

        this.zIndex(settings.zIndex);

        this.toolbar(settings.toolbar); 

        $dialog.css(settings.style).addClass(settings.addClass);

        this.show();
        
        if (settings.drag)
        {
            var dragTarget = $dialog.children(settings.dragTarget);

            /*if (settings.dragEvent === "all" || settings.dragEvent === "touch")
            {
                dragTarget.touchDraggable({
                    parent : true
                });
            }*/
            
            $dialog.draggable({
                target : dragTarget,
                parent : true,
                touch  : (settings.dragEvent === "all" || settings.dragEvent === "touch") ? true : false
            });
        }
                
        if (/(iPad|iPhone|iPod)/.test(navigator.userAgent))
        {
            $dialog.children("section.has-iframe").css("overflow", "auto");

            $dialog.children("section").bind("touchmove", function(event) {
                $("html, body").css("overflow", "hidden");
                event.stopPropagation(); 
            }); 
        }
                
        $(".pui-dialog > *").bind($.clickOrTouch(), function() {                
            $.dialogIndex ++; 

            $(this).parent().css("zIndex", $.dialogIndex);
        });

        $dialog.bind('dialog.reset', function() {
            _this.reset(_this.onreset);
        });

        $(window).resize(function(){
            $dialog.trigger('dialog.reset');
        });

        $.dialogIndex++;

        dialog.list[this.id] = this;

        this.timeout(settings.timeout);

        return this;
    };

    dialog.proxy = function(func) {
        var self = this;  

        return (function() {
            return func.apply(self, arguments);
        });
    }; 

    dialog.creater.fn = dialog.creater.prototype = { 

        proxy : dialog.proxy,

        status   : "",

        parent   : "",

        children : "",

        title : function(title) {
            var settings = this.settings;
            var target   = this.target;

            if(this.type == "window" || this.type == "iframe")
            {
                var _header   = target.children('header');
                var hasHeader = (_header.length > 0);
                var title     = (title || settings.title) || (_header.find("strong").text() || "");
                _header.find('strong').html(title);
            }

            return this;
        },

        lockScreen : function(lock) {
            $('body,html').css('overflow', (lock) ? 'hidden' : '');
        },

        mask : function(options) {
            var settings = this.settings;
            var target   = this.target;

            if(options.show)
            {
                var color   = options.color || "#000";
                var opacity = (typeof options.opacity == "number") ? options.opacity : 0.5;
                var style   = options.style || {};
                var fixed   = options.fixed || true;
                var id = this.id + '-mask';
                var hasMask = ($("#"+id).length > 0);
                var mask = (hasMask) ? $("#"+id) : $('<div class="pui-mask pui-mask-bg" id="'+id+'"></div>');

                if(options.fixed) mask.addClass('pui-mask-fixed');

                mask.hide();

                mask.css({
                    backgroundColor : color,
                    zIndex: options.zIndex || ($.dialogIndex - 1),
                    opacity : opacity
                }).css(style);

                if (!hasMask)
                {
                    $("body").append(mask);
                }

                mask.fadeIn();

                if (settings.maskClickClosed)
                {
                    mask.css("cursor", "pointer").bind($.clickOrTouch(), this.proxy(function(){
                        this.close();
                    }));
                } 
                else
                {
                    mask.css("cursor", "default");                        
                }
            }

            return this;
        },

        header : function(options) {

            var settings = this.settings;
            var target   = this.target;
            var type     = this.type;

            if (settings.type == "window" || settings.type == "iframe") 
            {
                var _header    = target.children('header');
                var hasHeader  = (_header.length > 0);
                var title      = (options.title || settings.title) || (_header.find("strong").text() || "");
                var subTitle   = options.subTitle;
                var style      = options.style;
                var className  = options.className;
                var icon       = options.icon;
                var titleStyle = options.titleStyle; 

                if (hasHeader)
                {
                    if (typeof options == "boolean" && !options) 
                    {
                        _header.remove();
                    } 
                    else
                    {
                        style      = (typeof style == "undefined")      ? (_header.attr('style') || "")                    : style;
                        className  = (typeof className == "undefined")  ? (_header.attr('class') || "")                    : className;
                        titleStyle = (typeof titleStyle == "undefined") ? (_header.children("strong").attr('style') || "") : titleStyle;
                        subTitle   = (typeof subTitle == "undefined")   ? (_header.find('small')[0].outerHTML || "")       : subTitle;
                        icon       = (typeof icon == "undefined")       ? (_header.find(".fa")[0].outerHTML || "")         : icon;

                        _header.attr({"style" : style, "class" : className});
                        _header.find('strong').attr("style", titleStyle).html(icon + title + subTitle);
                    }
                }
                else
                {
                    style      = style || "";
                    style      = (style != "" ? ' style="'+style+'"' : "");
                    className  = className || "";
                    className  = (className != "" ? ' class="'+className+'"' : "");
                    titleStyle = titleStyle || "";
                    titleStyle = (titleStyle != "") ? ' style="'+titleStyle+'"' : "";
                    subTitle   = subTitle || "";
                    icon       = icon || "";

                    var headerHTML = '<header'+className+style+'><strong'+titleStyle+'>'+icon+title+subTitle+'</strong></header>';

                    if (target.children('section').length > 0)
                    {
                        target.children('section').before(headerHTML);
                    } 
                    else
                    {                        
                        target.append(headerHTML);
                    }
                }

                target.trigger('dialog.reset');
            }

            return this;
        },

        content : function(options) {

            var target   = this.target;
            var type     = this.type;
            var settings = this.settings;
            var section  = target.children('section');
            var padding  = options.padding;
            var content  = options.content;
            var from     = options.from || "";
            var buttons  = options.buttons || settings.buttons;

            if (typeof options === "string") {
                content = options;
            }

            if (type === "iframe") {
                padding = 0;
            }

            if (type !== "iframe" && from !== "") {
                content = $(from).html();
            }

            if (section.length > 0) 
            {
                if (type !== "iframe")
                {
                    padding = (typeof padding == "undefined") ? (section.css('padding') || 0) : padding;
                    content = (typeof content == "undefined") ? (section.html() || "") : content;
                    section.css("padding", padding).html(content);
                } 
                else
                {
                    section.children('iframe').attr('src', options.url || content);
                }
            } 
            else
            {
                if (type === "iframe")
                {
                    padding = 0;
                    content = '<iframe src="'+(options.url || "")+(options.url.indexOf('?') > 0 ? "&" : "?")+'_dialog='+this.id+'" width="99.99%" height="100%" frameborder="0"></iframe>';
                }

                if (type === "prompt" || type === "prompt-app") 
                {
                    if(type === "prompt") {
                        padding = padding + "px " + padding + "px 0 "+padding;
                    }

                    content = '<p class="pui-font-bold pui-text-md">'+settings.title+'</p><p>'+content+'</p><input type="text" pui-dialog-prompt-input />';
                }

                if (type === "loading")
                {
                    if(content === "") {
                        content = '<div class="pui-loading pui-loading-spinner pui-animation-rotate pui-animation-repeat pui-animation-reverse"><span class="fa fa-spinner fa-3x"></span></div><p>loading....</p>';
                    }
                }

                if (type === "image")
                {
                    var imageURL = content;
                }
                
                var buttonsClass = buttons['class'];

                var html = '<section style="padding:'+(padding || 0)+'px;"'+(type == "iframe" ? ' class="has-iframe"' : '')+'>'+(content || "")+'</section>';

                if (type === "alert") 
                {
                    html += '<div class="pui-btn-center"><a href="javascript:;" button="yes" class="pui-btn pui-btn-warning pui-btn-shadow pui-btn-small '+(buttonsClass.yes || '')+'">'+buttons.values.yes+'</a></div>';
                }

                if (type === "alert-app") 
                {
                    html += '<div class="pui-btn-group pui-btn-group-justify"><a href="javascript:;" button="yes" class="pui-btn pui-btn-default '+(buttonsClass.yes || '')+'">'+buttons.values.yes+'</a></div>';
                }

                if (type === "confirm") 
                {
                    html += '<div class="pui-btn-center"><a href="javascript:;" button="yes" class="pui-btn pui-btn-warning '+(buttonsClass.yes || '')+'">'+buttons.values.yes+'</a><a href="javascript:;" button="cancel" class="pui-btn pui-btn-default '+(buttonsClass.cancel || '')+'">'+buttons.values.cancel+'</a></div>';
                }

                if (type === "confirm-app") 
                {
                    html += '<div class="pui-btn-group pui-btn-group-justify"><a href="javascript:;" button="cancel" class="pui-btn pui-btn-default '+(buttonsClass.cancel || '')+'">'+buttons.values.cancel+'</a><a href="javascript:;" button="yes" class="pui-btn pui-btn-default '+(buttonsClass.yes || '')+'">'+buttons.values.yes+'</a></div>';
                }

                if (type === "prompt") 
                {
                    html += '<div class="pui-btn-center"><a href="javascript:;" button="yes" class="pui-btn pui-btn-warning '+(buttonsClass.yes || '')+'">'+buttons.values.yes+'</a><a href="javascript:;" button="cancel" class="pui-btn pui-btn-default '+(buttonsClass.cancel || '')+'">'+buttons.values.cancel+'</a></div>';
                }

                if (type === "prompt-app") 
                {
                    html += '<div class="pui-btn-group pui-btn-group-justify"><a href="javascript:;" button="cancel" class="pui-btn pui-btn-default '+(buttonsClass.cancel || '')+'">'+buttons.values.cancel+'</a><a href="javascript:;" button="yes" class="pui-btn pui-btn-default '+(buttonsClass.yes || '')+'">'+buttons.values.yes+'</a></div>';
                }

                target.append(html);

                if(type === "image")
                {
                    target.children('section').html('图片加载中...');

                    if(typeof imageURL === "object")
                    {
                    } 
                    else 
                    {
                        var image = new Image(); 
                        image.className = "pui-size-auto";
                        image.onload = function() {
                            target.children('section').html(image);

                            target.trigger('dialog.reset');
                        };

                        image.src = imageURL;
                    }
                }
            }

            if(type === "iframe")
            {
                section = target.children('section');
                var iframe = section.children('iframe');
                this.proxy(this.onbeforeload)();
                iframe[0].contentWindow.onload = iframe[0].contentWindow.onreadystatechange = this.proxy(this.onload); 
            }

            if (type === "alert" || type === "alert-app" || type === "confirm" || type === "confirm-app") {
                target.find('[button="yes"]').bind($.clickOrTouch(), this.proxy(function(){
                    this.proxy(this.yes || new Function)();
                    this.close();
                }));
            }

            if (type === "prompt" || type === "prompt-app") {
                target.find('[button="yes"]').bind($.clickOrTouch(), this.proxy(function(){
                    this.proxy(this.yes || new Function)();
                }));
            }

            if (type === "confirm" || type === "confirm-app" || type === "prompt" || type === "prompt-app") {     
                target.find('[button="cancel"]').bind($.clickOrTouch(), this.proxy(function(){
                    this.proxy(this.cancel || new Function)();
                    this.close();
                }));                 
            }

            target.trigger('dialog.reset');

            return this;
        },

        footer : function(content) {

            var settings = this.settings;

            if (settings.type === "window" || settings.type === "iframe") 
            {
                var target  = this.target;
                var _footer = target.children('footer');

                if (_footer.length > 0)
                {
                    if (typeof content === "boolean" && !content)
                    {
                        _footer.remove();
                    } 
                    else
                    {
                        content = (typeof content === "undefined") ? (_footer.html() || "") : content;
                        _footer.html(content);
                    }
                } 
                else
                {
                    if(content !== "") target.append('<footer>'+content+'</footer>');
                }

                target.trigger('dialog.reset');
            }

            return this;
        },

        toolbar : function(options) {

            var settings       = this.settings;
            var target         = this.target;
            var signleClose    = target.children('.pui-close');
            var hasSignleClose = (signleClose.length > 0);

            if (typeof options === "boolean" && !options)
            {
                if (hasSignleClose) signleClose.remove();
            }

            if (typeof options === "string" && options === 'close')
            {                        
                if (signleClose.length < 1)
                {
                    target.append(this.signleCloseBtn);

                    target.children('.pui-close').bind($.clickOrTouch(), this.proxy(function(){
                        this.close();
                    }));
                }
            }

            if (settings.type === "window" || settings.type === "iframe") 
            {
                var toolbar     = target.children('.pui-dialog-toolbar');
                var hasToolbar  = (toolbar.length > 0);

                if (typeof options === "boolean" && !options)
                {
                    if(hasToolbar)  toolbar.remove();
                } 

                if (typeof options === "object")
                {
                    if(hasSignleClose) signleClose.remove();   

                    var list = options;

                    console.log(list);

                    var defaults = {
                        close  : {
                            show : true,
                            title : "关闭"
                        },
                        min    : {
                            show : false,
                            title : "最小化"
                        },
                        max    : {
                            show : false,
                            title : "最大化"
                        },
                        blank  : {
                            show : false,
                            title : "新窗口打开"
                        },
                        refresh: {
                            show : false, 
                            title : "刷新窗口"
                        }
                    };

                    options     = $.extend(defaults, options);

                    var _this   = this;
                    var close   = options.close;
                    var min     = options.min;
                    var max     = options.max;
                    var blank   = options.blank;
                    var refresh = options.refresh;

                    if (hasToolbar)
                    {
                        if(!close)   toolbar.find('.pui-dialog-close').remove();
                        if(!min)     toolbar.find('.pui-dialog-min').remove();
                        if(!max)     toolbar.find('.pui-dialog-max').remove();
                        if(!blank)   toolbar.find('.pui-dialog-blank').remove();
                        if(!refresh) toolbar.find('.pui-dialog-refresh').remove();
                    }
                    else
                    {
                        toolbar = $('<div class="pui-dialog-toolbar"></div>');

                        target.append(toolbar);                            

                        for (var i in list)
                        {    
                            var item = list[i];

                            if ( (typeof item == "boolean" && item) || item.show || typeof item == "function") 
                            {     
                                var btn = "";
                                
                                switch (i) {
                                    case "close" :
                                        btn = '<a href="javascript:;" class="fa fa-close pui-dialog-close" type="'+i+'" title="'+(i.title || "关闭")+'"></a>';
                                        break;
                                        
                                    case "min" :
                                        btn = '<a href="javascript:;" class="fa fa-minus pui-dialog-min" type="'+i+'" title="'+(i.title || "最小化")+'"></a>';
                                        break;
                                        
                                    case "max" :
                                        btn = '<a href="javascript:;" class="fa fa-plus pui-dialog-max" type="'+i+'" title="'+(i.title || "最大化")+'"></a>';
                                        break;
                                        
                                    case "blank" :
                                        btn = '<a href="'+this.url+'" class="fa fa-external-link pui-dialog-blank" target="_blank" type="'+i+'" title="'+(i.title || "新窗口打开")+'"></a>';
                                        break;
                                        
                                    case "refresh" :
                                        btn = '<a href="javascript:;" class="fa fa-refresh pui-dialog-refresh" type="'+i+'" title="'+(i.title || "刷新窗口")+'"></a>';
                                        break;
                                }
                                
                                toolbar.append(btn);
                                
                                var callback = (typeof item == "function") ? this.proxy(item) : new Function;

                                target.find('.pui-dialog-' + i).bind($.clickOrTouch(), function() {
                                    var type = $(this).attr('type');                                            
                                    //console.log("toolbar.type=>", type);
                                    _this[type](callback);
                                });
                            }
                        }
                    }
                }
            }

            target.trigger('dialog.reset');

            return this;
        },

        width : function(width) {
            var target = this.target;
            width = (typeof width  == "number") ? width + "px"  : width;

            if(typeof this._width == "undefined") this._width = width;

            if(typeof width == "string" && width.indexOf("%") > 0) {
                width = $(window).width() * (parseFloat(width) / 100);
            }

            target.width(width);

            target.trigger('dialog.reset');

            return this;
        },

        height: function(height) {
            var target = this.target;

            height = (typeof height == "number") ? height + "px" : height;

            if(typeof this._height == "undefined") this._height = height;

            if(typeof height == "string" && height.indexOf("%") > 0) {
                height = $(window).height() * (parseFloat(height) / 100);
            }

            target.height(height);

            target.trigger('dialog.reset');

            return this;
        },

        resize : function(width, height) {
            this.width(width);
            this.height(height);

            return this;
        },

        reset : function(callback) {

            var target  = this.target;
            var type    = this.type;
            var section = target.children('section'), height;

            if(type == "iframe" || type == "window")
            {
                height = target.height() - target.children('header').outerHeight() - target.children('footer').outerHeight();

                section.height(height);
            }

            this.position({
                top : this.settings.top,
                left : this.settings.left
            });

            this.proxy(callback || this.onreset)();
        },

        min : function(callback) {    
            this.status = "min";          

            this.proxy(callback || this.onmin)();

            return this;
        },

        max : function(callback) {
            this.status = "max";
            this.resize("100%", "100%");
            this.position({top:0, left:0});
            this.proxy(callback || this.onmax)();

            return this;
        },

        blank : function(callback) {                

            this.proxy(callback || this.onblank)();

            return this;
        },

        refresh : function(callback) {     

            this.status = "refresh"; 

            if(this.type == "iframe")
            {
                var target  = this.target; 
                var section = target.children('section');
                var iframe  = section.children('iframe'); 

                this.proxy(this.onbeforeload)();

                iframe[0].contentWindow.onload = iframe[0].contentWindow.onreadystatechange = this.proxy(this.onload);  
                iframe[0].contentWindow.location.reload();

                this.proxy(callback || this.onrefresh)();
            }

            return this;
        },

        css : function(cssText) {
            this.target.css(cssText); 

            return this;
        }, 

        fixed : function(position) {

            position = (typeof position == "boolean" && position) ? "fixed" : position;

            this.css("position", position);

            return this;
        },

        parentDialog : function(queryString) {
            var target = this.target;
            var dialogId = "";

            queryString = queryString.slice(1, queryString.length).split("&");

            for (var i=0, len = queryString.length; i < len; i ++)
            {
                var item = queryString[i].split('=');

                if(item[0] == "_dialog") {
                    dialogId = item[1];
                }
            }

            return dialog.get(dialogId);
        },

        position : function(options) { 

            var target   = this.target;
            var settings = this.settings;
            var $window  = $(window); 
            var top      = options.top  || "center";
            var left     = options.left || "center"; 

            switch(top) {
                case "top":
                    top = 0;
                    break;

                case "bottom":
                    top = $window.height() - target.outerHeight();
                    break;

                case "center":
                    top = ($window.height() - target.outerHeight()) / 2;
                    break;
                default :
                    top = top;
                    break;
            }

            switch(left) {
                case "left":
                    left = 0;
                    break;

                case "right":
                    left = $window.width() - target.outerWidth();
                    break;

                case "center":
                    left = ($window.width() - target.outerWidth()) / 2;
                    break;
                default :
                    left = left;
                    break;
            }

            settings._top  = top;
            settings._left = left;

            target.css({
                top : top + "px",
                left : left + "px"
            });

            return this;
        },

        zIndex : function(index) {
            this.target.css('z-index', index);

            return this;
        },

        on : function(event, callback) {
        },

        show : function(callback) {  

            this.status = "show"; 

            var target   = this.target;
            var settings = this.settings;
            var mask     = $("#" + this.id + '-mask');
            var hasMask  = (mask.length > 0);

            this.position({
                top   : settings.top,
                left  : settings.left
            });

            this.lockScreen(settings.lockScreen);

            //console.log("settings._top=>",settings._top);

            if(target.length > 0)
            {
                if(hasMask) mask.fadeIn();

                if(settings.animated)
                {      
                    //console.log('target.css.top', target.css('top'));
                    target.css({
                        top : "-"+ $(window).height() + "px"
                    }).stop().animate({
                        top : settings._top + "px",
                        opacity : "show"
                    }, settings.speed);
                }
                else
                {
                    target.fadeIn();
                    this.proxy(callback || this.onshow)();
                }
            }

            return this;
        },

        hide : function(callback) {
            this.close(callback);

            return this;
        },

        close : function(callback) {
            this.status  = "close";

            var $this    = this;
            var target   = this.target;
            var settings = this.settings;
            var mask     = $("#" + this.id + '-mask');
            var hasMask  = (mask.length > 0);

            if(!settings.cache) {

                if(hasMask)
                {
                    mask.fadeOut(function(){
                        mask.remove();
                    });
                }

                if(!settings.animated)
                {      
                    this.remove(callback);
                } 
                else 
                {                    
                    target.stop().animate({
                        top : $(window).height() * 2 + "px",
                        opacity : "hide"
                    }, settings.speed, $.proxy(function(){
                        $this.remove(callback);
                    })); 
                }
            } 
            else 
            {
                if(hasMask) mask.fadeOut();

                if(!settings.animated)
                {
                    target.fadeOut();
                    this.proxy(callback || this.onclose)();
                }
                else
                { 
                    callback = this.proxy(callback || this.onclose);
                    target.stop().animate({
                        top : $(window).height() * 2 + "px",
                        opacity : "hide"
                    }, settings.speed, $.proxy(function() {
                        callback();
                    }));
                }
            }

            this.lockScreen(false);

            return this;
        }, 

        remove : function(callback) {
            this.status = "remove"; 
            this.target.remove();
            this.proxy(callback || this.onremove)();

            return this;
        },

        buttons : function() {

            return this;
        },

        loading : function() {

            return this;
        },

        mediaQuery : function(queries) {
            queries = queries || [];
        },

        timeout : function(options) {

            if(typeof options == "boolean" && !arguments[0]) return this;

            var _this = this;
            var time = (typeof options == "boolean" && options) ? 3000 : (options[0] || 3000);
            time = (typeof options == "number") ? options : time;
            var callback = (typeof options == "function") ? options : options[1];
            callback = callback || new Function;

            var timer = setTimeout(function() {
                clearTimeout(timer);
                _this.close(callback);
            }, time);

            return this;
        }
    };

    dialog.list = [];

    dialog.get = function(id) {
        return this.list[id];
    };

    $.dialog = dialog;         

})(PlaneUI);

(function($) {
    
    $.draggableIndex = 1000;
    
    $.fn.draggable = function(options) {
        options = options || {};
        
        var defaults = {
            target    : null,
            container : null,
            touch     : true,
            x         : true, // horizontal drag
            y         : true  // vertical drag
        };
        
        var settings = $.extend(defaults, options);
        
        var posX, posY;
        var body        = $("body");
        var classPrefix = "pui-";        
        
        $(this).each(function() {

            var $this  = $(this);
			var target = settings.target;

            if (!target) {
                target = $this;
            }

            target.css("cursor", "move").bind($.mouseOrTouch("mousedown", "touchstart"), function(e) {
                e    = e || window.event;  //IE
                posX = e.clientX - parseInt($this.position().left);
                posY = e.clientY - parseInt($this.position().top);
                
				if (!settings.target) {
					$.draggableIndex ++;                
					target.css("z-index", $.draggableIndex);
				}

                document.onmousemove = moveAction;                
            });
            
            if (settings.touch) {
                target.touchDraggable(settings);
            }

            var userCanSelect = function (obj) {
                obj.removeClass(classPrefix + "user-unselect").off("selectstart");
            };

            var userUnselect = function (obj) {
                // selectstart for IE  
                obj.addClass(classPrefix + "user-unselect").on("selectstart", function(event) {                      
                    return false;
                });
            };

            var moveAction = function (e) {
                e = e || window.event;  //IE

                var left, top, nowLeft = parseInt($this.position().left), nowTop = parseInt($this.position().top);
				var parentWidth  = (settings.container) ? settings.container.width() : $(window).width();

                if ( nowLeft >= 0 )
                {				
                    if ( nowLeft + $this.width() <= parentWidth)
                    {
                        left = e.clientX - posX;
                    }
                    else
                    {	
                        left = parentWidth - $this.width();
                        document.onmousemove = null;
                    }
                } 
                else
                {
                    left = 0;
                    document.onmousemove = null;
                }
				
				if ( nowTop >= 0 ) 
                {
					if (settings.container)
                    {
						var parentHeight = settings.container.height(); 

						if ( nowTop + $this.outerHeight() <= parentHeight) 
                        {
							top = e.clientY - posY;
						}
                        else
                        {
							top = parentHeight - $this.outerHeight();
							document.onmousemove = null;
						}
					} 
                    else
                    {
						top = e.clientY - posY;						
					}
                } 
                else
                {
                    top = 0;
                    document.onmousemove = null;
                }

                document.onselectstart = function() {
                    return false;
                };

                userUnselect(body);
                userUnselect($this);

                if (settings.x) $this[0].style.left = left + "px";
                if (settings.y) $this[0].style.top  = top  + "px";
            };

            document.onmouseup = function() {                            
                userCanSelect(body);
                userCanSelect($this);

                document.onselectstart = null;         
                document.onmousemove   = null;
            };         

        });
    };

})(PlaneUI);
(function($) {    

    $.fn.touchDraggable = function(options) {
        
        options = options || {};
        
        var defaults = {
            container : null,
            parent    : false,
            x         : true,
            y         : true
        };
  
        var settings = $.extend(defaults, options);
        
        $(this).each(function() {
            
            var offset = null;      

            var start = function(e) {
                var orig   = e.originalEvent; 
                var parent = (settings.parent) ? $(this).parent() : $(this); 
                var pos    = parent.position();

                if (settings.parent) {
                    $.dialogIndex ++; 
                    parent.css("zIndex", $.dialogIndex);
                }

                offset = {
                    x : orig.changedTouches[0].pageX - pos.left,
                    y : orig.changedTouches[0].pageY - pos.top
                };
                
                $(this).bind("touchmove", moveAction);
            };

            var moveAction = function(e) {
                
                e.preventDefault();

                var orig    = e.originalEvent, top, left; 
                var target  = (settings.parent) ? $(this).parent() : $(this); 
                var nowLeft = parseInt(target.position().left);
                var nowTop  = parseInt(target.position().top);
                
				var parentWidth = (settings.container) ? settings.container.width() : $(window).width();
                
                if (nowLeft >= 0)
                {                    
                    if ( nowLeft + target.width() <= parentWidth)
                    {
                        left = orig.changedTouches[0].pageX - offset.x;
                    }
                    else
                    {	
                        left = parentWidth - target.width();
                        $(this).unbind("touchmove", moveAction);
                    }
                } 
                else
                {
                    left = 0;
                    $(this).unbind("touchmove", moveAction);
                }
				
				if ( nowTop >= 0 ) 
                {
					if (settings.container)
                    {
						var parentHeight = settings.container.height(); 

						if ( nowTop + target.outerHeight() <= parentHeight) 
                        {
							top = orig.changedTouches[0].pageY - offset.y;
						}
                        else
                        {
							top = parentHeight - target.outerHeight();
							$(this).unbind("touchmove", moveAction);
						}
					} 
                    else
                    {
						top = orig.changedTouches[0].pageY - offset.y;						
					}
                } 
                else
                {
                    top = 0;
                    $(this).unbind("touchmove", moveAction);
                }
                
                if (settings.x) {
                    target.css("left", left);
                }
                
                if (settings.y) {
                    target.css("top", top);
                }
            };

            $(this).bind("touchstart", start);
        });

    };
    
})(PlaneUI);
(function($) {
    
    $.fn.fileInput = function(onchange) {

        $(this.selector ? this.selector : ".pui-file-input").each(function() {
            var $this     = $(this);
            var fileInput = $this.find("input[type=\"file\"]");
            var btn       = $this.find(".pui-file-input-btn");

            fileInput.bind("change", function() {
                $.proxy(onchange || function() {}, this)();
            });

            btn.bind("click", function() {
                fileInput.trigger("click");
            });
        });
    };

})(PlaneUI);
(function($) {    
    $(function(){
        $(".pui-font-sizer > span").bind($.clickOrTouch(), function() {
            var $this = $(this);
            var target = $(this).parent().attr("target");

            $this.each(function(){
                var size = $(this).attr("size");

                if(size == "default") {
                    $(target).removeAttr("style");
                } else {                        
                    $(target).css({
                        fontSize : size
                    });
                }
            });
        });
    });
})(PUI);
(function ($) {

    $.formValidatorImageFormats = ['jpg', 'jpeg', 'png', 'gif', 'webp'];

    $.formValidatorRules = {
        username : /^[a-zA-Z]\w{4,15}$/,
        password : /^[a-zA-Z][a-zA-Z0-9\.\-\_]{5,15}$/,
        enName : /^[a-zA-Z]{2,}$/,
        uppercase : /^[A-Z]+$/,
        lowercase : /^[a-z]+$/,
        chinese : /^[\u4e00-\u9fa5]+$/,
        email : /^[0-9a-z][_.0-9a-z-]{0,31}@([0-9a-z][0-9a-z-]{0,30}[0-9a-z]\.){1,3}[a-z]{2,4}$/,
        tel : /^\d{3}-\d{8}|\d{4}-\d{7,8}$/,
        telExt : /^\d{3}-\d{8}|\d{4}-\d{7,8}-?\d+?$/,
        mobile : /^1(30|31|32|33|34|35|36|37|38|39|45|47|50|51|52|53|55|56|57|58|59|76|77|78|80|81|82|83|84|85|86|87|88|89)\d{8}$/,
        mobileI18n : /^(\+86)1(30|31|32|33|34|35|36|37|38|39|45|47|50|51|52|53|55|56|57|58|59|76|77|78|80|81|82|83|84|85|86|87|88|89)\d{8}$/,
        zipcode : /^[1-9]\d{5}$/, 
        qq : /^[1-9]\\d{4,10}$/,
        domain : /^([a-zA-Z0-9\-]+)\.([a-zA-Z0-9\-]+)\.(com|net|cn|jp|tw|hk|edu|biz|gov|org|info|asia|mobi|co|cc|tt|me|tv|name|de)\.?(cn|hk|tw|jp)?$/,
        url : /^(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?$/,
        ipv4 : /^((?:(?:25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(?:25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d))))$/,
        idcard : /^\d{17}([0-9]|X)$/,
        idcard1518 : /(^\d{15}$)|(^\d{17}([0-9]|X)$)/,
        integer : /^\d+$/,  // 0+，正整数
        number : function(value) {
            return !isNaN(value);
        },
        image : function(value){
            return ($.inArray(value, $.formValidatorImageFormats) >= 0);
        }
    };

    $.formValidatorRules.fax             = $.formValidatorRules.telExt;
    $.formValidatorRules.confirmPassword = $.formValidatorRules.password;

    $.formValidatorIcons = {
        error : '<i class="fa fa-close"></i>',
        success : '<i class="fa fa-check-circle"></i>'
    };

    $.formValidatorRuleMessages = {
        username : {
            normal : '* 用户名必须以英文字母开头的英文字母、数字或下划线的5-16位组合。',
            empty : $.formValidatorIcons.error + ' 错误：用户名不能为空。',
            error : $.formValidatorIcons.error + ' 错误：用户名必须以英文字母开头的英文字母、数字或下划线的5-16位组合。',
        },
        password : {
            normal : '* 密码由5-16位以英文字母开头的英文字母、数字、小数点、横线或下划线的组成。',
            empty : $.formValidatorIcons.error + ' 错误：密码不能为空。',
            error : $.formValidatorIcons.error + ' 错误：密码由5-16位以英文字母开头的英文字母、数字、小数点、横线或下划线的组成。',
        },            
        confirmPassword : {
            normal : "* 再次填写刚刚输入的密码，以便确认密码。",
            empty : $.formValidatorIcons.error + ' 错误：确认密码不能为空。',
            error : $.formValidatorIcons.error + ' 错误：两次输入的密码不一致或密码不正确。'
        },
        enName : {
            normal : "* 请填写英文名字。",
            empty : $.formValidatorIcons.error + ' 错误：英文名字不能为空。',
            error : $.formValidatorIcons.error + ' 错误：请填写正确的英文名字。'
        },
        uppercase : {
            normal : "* 请填写大写的英文字母。", 
            error : $.formValidatorIcons.error + ' 错误：请填写大写的英文字母。'
        },
        lowercase : {
            normal : "* 请填写小写的英文字母。", 
            error : $.formValidatorIcons.error + ' 错误：请填写小写的英文字母。'
        },
        chinese : {
            normal : "* 请填写中文字符。",
            error : $.formValidatorIcons.error + ' 错误：只能填写中文字符。'
        },
        email : {
            normal : "* 请填写邮箱地址。",
            empty : $.formValidatorIcons.error + ' 错误：邮箱地址不能为空。',
            error : $.formValidatorIcons.error + ' 错误：请填写正确的邮箱地址。'
        },
        tel : {
            normal : "* 格式：区号-固定电话号码。",
            empty : $.formValidatorIcons.error + ' 错误：固定电话号码不能为空。',
            error : $.formValidatorIcons.error + ' 错误：请填写正确的固定电话号码。'
        },
        telExt : {
            normal : "* 格式：区号-固定电话号码、区号-固定电话号码-分机号。",
            empty : $.formValidatorIcons.error + ' 错误：固定电话号码不能为空。',
            error : $.formValidatorIcons.error + ' 错误：请填写正确的固定电话号码。'
        },
        fax : {
            normal : "* 格式：区号-固定电话号码、区号-固定电话号码-分机号。",
            empty : $.formValidatorIcons.error + ' 错误：传真号码不能为空。',
            error : $.formValidatorIcons.error + ' 错误：请填写正确的传真号码。'
        },
        moblie : {
            empty : $.formValidatorIcons.error + ' 错误：手机号码不能为空。',
            error : $.formValidatorIcons.error + ' 错误：请填写正确的手机号码。'
        },
        moblieI18n : {
            normal : '* 格式：+86手机号码',
            empty : $.formValidatorIcons.error + ' 错误：手机号码不能为空。',
            error : $.formValidatorIcons.error + ' 错误：请填写正确的手机号码，格式：+86手机号码。'
        },
        zipcode : {
            empty : $.formValidatorIcons.error + ' 错误：邮政编码不能为空。',
            error : $.formValidatorIcons.error + ' 错误：请填写正确的邮政编码。'
        },
        qq : {
            empty : $.formValidatorIcons.error + ' 错误：QQ号码不能为空。',
            error : $.formValidatorIcons.error + ' 错误：请填写正确的QQ号码（5-10位数字）。'
        },
        domain : {
            normal : '* 格式：www.xxx.com | xxx.xxx.com 。',
            empty : $.formValidatorIcons.error + ' 错误：域名不能为空。',
            error : $.formValidatorIcons.error + ' 错误：请填写正确的域名。'
        },
        url : {
            normal : '* (http|https|ftp)://www.xxx.com/xxx/xxx.html?xxx',
            empty : $.formValidatorIcons.error + ' 错误：URL(网址)不能为空。',
            error : $.formValidatorIcons.error + ' 错误：请填写正确的URL(网址)。'
        },
        ipv4 : {
            normal : '* IPv4地址：0~255.0~255.0~255.0~255',
            empty : $.formValidatorIcons.error + ' 错误：IP地址不能为空。',
            error : $.formValidatorIcons.error + ' 错误：请填写正确的IP地址。'
        },
        idcard : {
            normal : '* 填写18位的身份证号码',
            empty : $.formValidatorIcons.error + ' 错误：身份证号码不能为空。',
            error : $.formValidatorIcons.error + ' 错误：请填写正确的身份证号码。'
        },
        idcard1518 : {
            normal : '* 填写15或18位的身份证号码',
            empty : $.formValidatorIcons.error + ' 错误：身份证号码不能为空。',
            error : $.formValidatorIcons.error + ' 错误：请填写正确的身份证号码（15或18位）。'
        },
        integer : {
            normal : '* 只能填写正整数（0及以上）。',
            error : $.formValidatorIcons.error + ' 错误：请填写正确的正整数（0及以上）。'
        },
        number : {
            normal : '* 只能填写数字值。',
            error : $.formValidatorIcons.error + ' 错误：请填写正确的数字值。'
        },
        image : {
            normal : '* 只能上传 '+$.formValidatorImageFormats.join(', ')+' 格式的图片文件。',
            error : $.formValidatorIcons.error + ' 错误：只能上传 '+$.formValidatorImageFormats.join(', ')+' 格式的图片文件。',
        }
    };

    var isUndefined = function(obj) {
        return (typeof obj == "undefined");
    };

    $.fn.formValidator = function(options, ajaxSubmit, _messages) { 

        ajaxSubmit    = ajaxSubmit || false;

        var submitBtn = $(this);
        var form      = submitBtn.parent("form");

        var validator = function(_this) {

            var name       = _this.attr('name');
            var value      = _this.val();
            var option     = options[name];
            var empty      = option.empty || false;
            var element    = form.find('[name="'+name+'"]'); 
            var role       = form.find('[fv-role="'+name+'"]');
            var msgNormal  = role.find('[type="normal"]');
            var msgEmpty   = role.find('[type="empty"]');
            var msgSuccess = role.find('[type="success"]');
            var msgError   = role.find('[type="error"]'); 
            var equalTo    = form.find('[name="'+option.equalTo+'"]');              
            var checked    = 0;
            var isSuccess  = false;

            if( !isUndefined(option.checked) ) checked = form.find('[name="'+name+'"]:checked').length;

            var exp = {
                min        : ( !isUndefined(option.min)       && parseFloat(value) < option.min),
                max        : ( !isUndefined(option.max)       && parseFloat(value) > option.max),
                minLength  : ( !isUndefined(option.minLength) && value.length < option.minLength),
                maxLength  : ( !isUndefined(option.maxLength) && value.length > option.maxLength),
                checkedEmpty : ( !isUndefined(option.checked) && checked == 0),
                checked    : ( !isUndefined(option.checked)   && typeof option.checked == "number" && checked < option.checked),
                checkedMin : ( !isUndefined(option.checked)   && typeof option.checked == "object" && checked < option.checked[0]),
                checkedMax : ( !isUndefined(option.checked)   && typeof option.checked == "object" && checked > option.checked[1]),
                equalTo    : ( !isUndefined(option.equalTo)   && value !== equalTo.val())
            };

            var successHandler = function(){                     
                _this.removeClass("fv-error").addClass("fv-success");
                role.find('span').hide();
                msgSuccess.show();
                isSuccess = true;
            };

            var errorHandler = function(){   
                _this.removeClass("fv-success").addClass("fv-error");
                role.find('span').hide();
                msgError.fadeIn();

                isSuccess = false;
            };

            if(!empty)
            {
                if (value == "" || exp.checkedEmpty)
                {
                    _this.removeClass("fv-success").addClass("fv-error");
                    role.find('span').hide();
                    msgEmpty.show();
                } 
                else if (exp.min || exp.max || exp.minLength || exp.maxLength || exp.equalTo || exp.checked || exp.checkedMin || exp.checkedMax)
                {
                    errorHandler();
                } 
                else if (!isUndefined(option.ajax)) 
                {
                    $.ajax({
                        type : "get",
                        async : false,
                        dataType : (option.jsonp ? "jsonp" : "json" ) || "json",
                        url : option.ajax + "&" + name + "=" + value, 
                        success : function(json) {
                            if(json.status == 1) successHandler();
                            else                 errorHandler();
                            //console.log(json);
                        }
                    });
                }
                else if (!isUndefined(option.rule)) 
                {
                    var rule       = option.rule;
                    var fileExt    = value.split('.');               
                    var ruleExp    = (typeof rule == "function") ? rule : $.formValidatorRules[rule];

                    fileExt = fileExt[fileExt.length - 1];

                    if(typeof ruleExp == "function") { 
                        if(ruleExp(rule == "image" ? fileExt : value)) successHandler();
                        else errorHandler();
                    }
                    else if(typeof ruleExp == "object")
                    {
                        if(ruleExp.test(value)) successHandler();
                        else errorHandler();
                    }
                    else 
                    {
                    }

                    console.log(typeof ruleExp, ruleExp);
                }
                else 
                {
                    if(!isUndefined(option.min) || !isUndefined(option.max)) _this.val(parseFloat(value) || 0); 

                    successHandler();
                }
            }
            else
            {
                if(value !== "")
                {

                }
            }

            //$.proxy(option.success || new Function, element)();
            //$.proxy(option.error   || new Function, element)();

            //console.log('isSuccess=>', isSuccess);

            return isSuccess;
        };

        for (var i in options)
        {
            var defaultMessages = {
                normal  : '* 必填项',
                empty   : $.formValidatorIcons.error   + ' 错误：不能为空。',
                error   : $.formValidatorIcons.error   + ' 错误：请正确填写。',
                success : $.formValidatorIcons.success + ' 正确'
            };

            var element      = form.find('[name="'+i+'"]'); 
            var role         = form.find('[fv-role="'+i+'"]');
            var option       = options[i]; 
            var type         = element.attr('type'), message;
            var ruleMessages = $.formValidatorRuleMessages;

            if(isUndefined(option.message) && ruleMessages[option.rule]) option.message = "rule";

            if(!isUndefined(option.message) && !isUndefined(option.rule) && option.message == "rule")
            {                    
                message   = $.extend(defaultMessages, ruleMessages[option.rule] || {}); 
            } 
            else
            {
                message   = $.extend(defaultMessages, _messages);     
                message   = $.extend(message, option.message);               
            }

            //console.log('option=>', option, i, "message =>", message);

            for (var x in message)
            {
                if(typeof option == "boolean" && x == "error") break;

                role.append('<span type="'+x+'">'+message[x]+'</span>');
            } 

            //console.log("$(this).length", element.length);

            element.bind((type == "file" || element[0].tagName == "SELECT") ? "change" : "blur", function(event) {
                validator($(this));
            });
        }

        submitBtn.bind($.clickOrTouch() || "click", function() {

            var errors = 0;

            for (var i in options)
            {
                var element   = form.find('[name="'+i+'"]');   

                if(!validator(element)) errors++; 
            } 

            console.log("errors =>", errors); 

            if (errors > 0) return false;
            else 
            {
                if (typeof ajaxSubmit == "object")
                {
                    $.ajax($.extend({
                        type : "post",
                        data : form.serializeArray()
                    }, ajaxSubmit));

                    return false;
                }
                else
                {
                    form.submit();
                }
            }
        }); 

        return this;
    };

})(PlaneUI);
(function($) {
    
    $.fn.hoverScroller = function(options) {
        
        options = options || {};
        
        var defaults = {
            target : "img",
            scrollType : "marginTop", // transform
            speed  : 600
        };
        
        var settings = $.extend(defaults, options);
        
        $(this).each(function() {
        
            var timer;
            var $this  = $(this);
            var target = $(this).find(settings.target);
            
            function scrollTop() {
                var speed        = 0;
                var targetHeight = parseInt(target.height());
                
                $(this).css("cursor", "pointer");

                timer = setInterval(function() {
                    speed += Math.floor(targetHeight / 200);
                    
                    target.css({marginTop : "-" + speed + "px"});
                    
                    var nowTop = parseInt(target.css("marginTop"));

                    if (-nowTop >= targetHeight - $this.height())
                    {
                        target.css({marginTop : "-" + (targetHeight - $this.height()) + "px)"});
                        clearInterval(timer);
                    }

                }, settings.speed / 10);
            }
            
            function scrollDown() {
                
                $(this).css("cursor", "");
                
                clearInterval(timer);
                
                target.animate({marginTop : 0}, settings.speed);
            }

            $this.css("overflow", "hidden").hover(scrollTop, scrollDown);
        });
    };
    
})(PlaneUI);
(function($) {
    
    // 在可视窗口的上面
    $.inScreenAbove = function(element, threshold) {
        var top = $(window).scrollTop(), $el = $(element);
        
        if ($el.length < 1) {
            throw new TypeError("$.inScreenAbove(): element don't exist.");
        }

        return (top >= $el.offset().top + $el.height() - (threshold || 0));
    };
    
    // 在可视窗口的下面
    $.inScreenBelow = function(element, threshold) {
        var $window = $(window), $el = $(element);
        
        if ($el.length < 1) {
            throw new TypeError("$.inScreenBelow(): element don't exist.");
        }
        
        return ($window.height() + $window.scrollTop() <= $el.offset().top - (threshold || 0));
    };
    
    $.inScreenLeft = function(element, threshold) {
        var left = $(window).scrollLeft(), $el = $(element);
        
        if ($el.length < 1) {
            throw new TypeError("$.inScreenLeft(): element don't exist.");
        }

        return (left >= $el.offset().left + $el.width() - (threshold || 0));
    };
    
    $.inScreenRight = function(element, threshold) {
        var $window = $(window), $el = $(element);
        
        if ($el.length < 1) {
            throw new TypeError("$.inScreenRight(): element don't exist.");
        }
        
        return ($window.width() + $window.scrollLeft() <= $el.offset().left - (threshold || 0));
    };
    
    $.inViewport = function(element, threshold) {
        
        if ($(element).length < 1) {
            throw new TypeError("$.inViewport(): element don't exist.");
        }
        
        return (!$.inScreenLeft(element, threshold) && 
                !$.inScreenRight(element, threshold) && 
                !$.inScreenAbove(element, threshold) && 
                !$.inScreenBelow(element, threshold));
    };
    
    $.extend($.expr[':'], {
        "in-screen-below": function(el) {
            return $.inScreenBelow(el);
        },
        "in-screen-above": function(el) {
            return $.inScreenAbove(el);
        },
        "in-screen-left": function(el) {
            return $.inScreenLeft(el);
        },
        "in-screen-right": function(el) {
            return $.inScreenRight(el);
        },
        "in-viewport": function(el) {
            return $.inViewport(el);
        }
    });
    
})(PlaneUI);
(function($) {
    
    $(function() {   
        var subMenuClass = ".pui-sub-menu";

        $(".pui-menu-accordion.click-toggle > li > a").bind($.clickOrTouch(), function() {
            $(this).parent().toggleClass("submenu-open").children(subMenuClass).slideToggle();
        });

        $(".pui-menu-accordion.click > li > a").bind($.clickOrTouch(), function() {
            var li = $(this).parent();
            
            if (!li.hasClass("submenu-open")) {
                li.parent().find("li").removeClass("submenu-open").find(subMenuClass).slideUp();
                li.toggleClass("submenu-open").children(subMenuClass).slideDown();
            }
        });
    });
    
})(PUI);
(function ($) {   
    
    $.menuDropdown = function(options) {
            
        var defaults = {
            bind              : "click",
            target            : "menu-dropdown-target",
            direction         : "default",  // bottom-left
            hasArrow          : false,
            contextMenuTarget : "show-context-menu",
            callback          : new Function
        };            

        var settings = $.extend(defaults, options); 

        $("["+settings.contextMenuTarget+"]").bind($.contextMenuOrTouch(), function(event){
            event = event || window.event; 

            var $this = $(this);
            var target = $this.attr(settings.contextMenuTarget); 
            var targetObj = $(target);                 
            var pageX = event.pageX;                
            var pageY = event.pageY; 

            if(event.type == "touchend") {
                pageX = $this.offset().left;
                pageY = $this.offset().top + $this.outerHeight();
            } 

            targetObj.show().css({
                top  : pageY,
                left : pageX
            });

            $(document).bind($.clickOrTouch(), function(){
                targetObj.hide();
            });

            targetObj.mouseleave(function(){
                targetObj.hide();
            });

            return false;
        });

        $("["+settings.target+"]").bind($.clickOrTouch(), function() {
            var $this = $(this);
            var target = $this.attr(settings.target);  
            var targetObj = $(target);
            var direction = $this.attr("menu-dropdown-direction");

            if(typeof(direction) == 'undefined' || direction == "") {
                direction = settings.direction;
            }

            $this.find(".pui-btn").addClass("active"); 

            targetObj.show();

            switch(direction) 
            {
                case "left-top":

                    targetObj.css({
                        top : $this.offset().top,
                        left : $this.offset().left - targetObj.outerWidth() - 4
                    });

                    break;

                case "left-bottom":

                    targetObj.css({
                        top : $this.offset().top - targetObj.outerHeight() + $this.outerHeight(),
                        left : $this.offset().left - targetObj.outerWidth() - 4
                    });

                    break;

                case "right-top":

                    targetObj.css({
                        top : $this.offset().top,
                        left : $this.offset().left + $this.outerWidth() + 4
                    });

                    break;

                case "right-bottom":

                    targetObj.css({
                        top : $this.offset().top - targetObj.outerHeight() + $this.outerHeight(),
                        left : $this.offset().left + $this.outerWidth() + 4
                    });

                    break;

                case "top-left":

                    targetObj.css({
                        top : $this.offset().top - 2 - (settings.hasArrow ? 8 : 0) - targetObj.outerHeight(),
                        left : $this.offset().left
                    });

                    break;

                case "top-right":

                    targetObj.css({
                        top : $this.offset().top - 2 - (settings.hasArrow ? 8 : 0) - targetObj.outerHeight(),
                        left : $this.offset().left + $this.outerWidth() - targetObj.outerWidth()
                    });

                    break;

                case "bottom-right":

                    targetObj.css({
                        top : $this.offset().top + $this.outerHeight() + 2 + (settings.hasArrow ? 8 : 0),
                        left : $this.offset().left + $this.outerWidth() - targetObj.outerWidth()
                    });

                    break;

                case "bottom-left":
                default:

                    targetObj.css({
                        top : $this.offset().top + $this.outerHeight() + 2 + (settings.hasArrow ? 8 : 0),
                        left : $this.offset().left
                    });

                    break;
            }

            $(document).bind($.clickOrTouch(), function() {
                targetObj.hide();
                $this.find(".pui-btn").removeClass("active");
            }); 

            return false;
        });
    };
    
    $(function(){
    
        $(".pui-menu > li").bind("touchend", function() {
            $(this).children(".pui-menu-dropdown").show().mouseleave(function() {
                $(this).hide();
            });
        });
        
        $.menuDropdown();
    });

})(PlaneUI);
(function ($) {

    $(function() {

        $(".pui-notice").each(function() {
            var timeout = $(this).attr("notice-timeout");
            var closeBtn = $(this).find(".pui-close");  

            if(typeof timeout !== "undefined") {
                timeout  = parseInt(timeout);

                var timer = setTimeout(function(){
                    closeBtn.trigger($.clickOrTouch());
                    clearTimeout(timer);
                }, timeout);
            }

            closeBtn.bind($.clickOrTouch(), function() {   
                $(this).parent().css({minHeight: 0}).slideUp(500, function() {
                    $(this).remove();
                });
            });
        });
    }); 

})(PlaneUI);
(function ($) {

    var drawed = false;

    $.fn.extend({
        ringProgress : function(options) {
            options = options || {};

            var defaults = {  
                redraw : false,
                sector : false,
                ringColor : '#30C4E9',
                ringWidth : 6,
                bgColor : '#fff',
                textColor : '#666',
                textFontSize : '16px',
                textFontFamily : 'Arial',
                textAlign : 'center',
                textBaseline : 'middle',
                zero : false
            }; 

            // 设置优先级：HTML属性设置 > jQuery插件设置 > 默认值
            var settings = $.extend(defaults, options);

            var _this = this;

            this.settings = settings;
            this.test = function(){alert('test')};   

            this.each(function(i) {  
                var $this = $(this);
                var canvas = this;
                var text = $this.text();
                var progress  = parseInt(text);
                var context = canvas.getContext('2d'); 

                var width = canvas.width;
                var height = canvas.height;

                if(window.devicePixelRatio > 1 && settings.redraw) {                                
                    width /= 2;
                    height /= 2;
                }

                var radius = width / 2;

                if(settings.zero) {
                    progress = 1;
                    text = "0%";
                }

                var sector = $this.attr('sector');
                var ringColor = $this.attr('ring-color');
                var ringWidth = $this.attr('ring-width');
                var bgColor = $this.attr('bg-color');
                var textColor = $this.attr('text-color');
                var textFontSize = $this.attr('text-font-size');
                var textFontFamily = $this.attr('text-font-family');
                var textAlign = $this.attr('text-align');
                var textBaseline = $this.attr('text-baseline'); 

                if (typeof(sector) == 'undefined' || sector == '') {
                    this.sector = sector = settings.sector;
                }

                if (typeof(ringColor) == 'undefined' || ringColor == '') {
                    this.ringColor = ringColor = settings.ringColor;
                }

                if (typeof(ringWidth) == 'undefined' || ringWidth == '') {
                    this.ringWidth = ringWidth = settings.ringWidth;
                }

                if (typeof(bgColor) == 'undefined' || bgColor == '') {
                    this.bgColor = bgColor = settings.bgColor;
                }

                if (typeof(textColor) == 'undefined' || textColor == '') {
                    this.textColor = textColor = settings.textColor;
                }

                if (typeof(textFontSize) == 'undefined' || textFontSize == '') {
                    this.textFontSize = textFontSize = settings.textFontSize;
                }

                if (typeof(textFontFamily) == 'undefined' || textFontFamily == '') {
                    this.textFontFamily = textFontFamily = settings.textFontFamily;
                }

                if (typeof(textAlign) == 'undefined' || textAlign == '') {
                    this.textAlign = textAlign = settings.textAlign;
                }

                if (typeof(textBaseline) == 'undefined' || textBaseline == '') {
                    this.textBaseline = textBaseline = settings.textBaseline;
                }

                if(progress >= 100) {
                    progress = 99.9999;
                }
                else if(progress < 1) {
                    progress = 1; 
                } 

                //console.log(width, height, bgColor, ringColor);

                (function (canvas, context) {
                    if(settings.redraw)  {    
                        return ;  
                    }
                    var devicePixelRatio = window.devicePixelRatio || 1;
                    var backingStorePixelRatio = context.webkitBackingStorePixelRatio ||
                                                 context.mozBackingStorePixelRatio ||
                                                 context.msBackingStorePixelRatio ||
                                                 context.oBackingStorePixelRatio ||
                                                 context.backingStorePixelRatio || 1;

                    var ratio = devicePixelRatio / backingStorePixelRatio;

                    if (ratio > 1) { 
                        canvas.style.height = canvas.height + 'px';
                        canvas.style.width = canvas.width + 'px';
                        canvas.width *= ratio;
                        canvas.height *= ratio; 
                        context.scale(ratio, ratio); 
                    }
                })(canvas, context); 

                //console.log(window.devicePixelRatio+', '+canvas.width +', '+ canvas.height+', '+width+', '+height);    

                // 画底圆
                context.clearRect(0, 0, width, height);
                context.beginPath();
                context.moveTo(width / 2, height / 2);
                context.arc(width / 2, height / 2, radius, 0, Math.PI * 2, false); 
                context.closePath(); 
                context.fillStyle = bgColor;  
                context.fill();

                // 直接画圆环
                //context.strokeStyle="#333";
                //context.lineWidth= 5;  // 线宽
                //context.arc(width / 2, height / 2, radius - (5/2) , 0, Math.PI * 2, false); 
                //context.stroke();

                // 画扇形(进度)  
                context.beginPath();
                context.moveTo(width / 2, height / 2);

                //整个圆为2PI，360 -> 1.5PI, 90 -> 0PI, 180 -> 0.5PI, 270 -> 1PI 
                // arc(x,y, 半径, 开始角度,结束角度, 顺时或逆时针)
                var endAngle = Math.PI * (2 * (progress / 100)) - (Math.PI * 0.5);
                context.arc(width / 2, height / 2, radius, Math.PI * 1.5, endAngle, false); 
                context.closePath(); 
                context.fillStyle = ringColor;  
                context.fill(); 

                // 画内部空白  
                if(sector === 'false' || !sector) {
                    context.beginPath();  
                    context.moveTo(width / 2, height / 2); 
                    context.arc(width / 2, height / 2, radius - ringWidth, 0, Math.PI * 2, true);  
                    context.closePath();  
                    context.fillStyle = '#fff';  
                    context.fill();
                }

                // 文字
                context.font = textFontSize + " " +textFontFamily;  
                context.fillStyle = textColor;  
                context.textAlign = textAlign;  
                context.textBaseline = textBaseline;  
                context.moveTo(width / 2, height / 2);
                context.fillText(text, width / 2, height / 2);
            });  

            return this;
        },

        ringProgressAnimation : function(options, options2) {
            var defaults = {
                start : 0,
                end : 100,
                speed : 1000
            };

            var defaults2 = {
                redraw : true
            };

            var settings = $.extend(defaults, options); 
            var settings2 = $.extend(defaults2, options2); 
            var _this = this;

            var timer = setInterval(function() {
                settings.start ++;

                $(_this).html(settings.start + "%").ringProgress(settings2);

                if(settings.start >= settings.end) clearInterval(timer);
            }, settings.speed);

            return this;
        }
    });

})(PlaneUI);
(function ($) {

    $(function(){

        $("pui-radio").each(function(i) {
            var $this = $(this);
            var radio = $('<input type="radio" />'); 
            radio.attr("name", $this.attr('name'));
            radio.val($this.attr('value'));

            if($this.hasClass('checked')) {
                radio.attr("checked", "checked");
            }

            if($this.attr('disabled') == "disabled") {
                radio.attr("disabled", "disabled");
            }

            $this.append(radio); 

            $this.bind($.clickOrTouch(), function() {
                if($(this).attr('disabled') == "disabled") return ;

                var input = $(this).find('input');   

                if(input.attr('checked') == "checked") return ;

                var name = $(this).attr('name'); 
                $('input[name="'+name+'"]').removeAttr('checked');

                $(this).addClass('checked').siblings().removeClass('checked'); 
                input[0].checked = true; 
            });
        });

    });

})(PlaneUI);
(function ($) {

    $.fn.rating = function(options) {

        var defaults = {
            score : 0,
            total : 5,
            titles : "非常差,很差,好,很好,非常好",
            showTotal : true,
            showScore : true,
            ajaxURL : "",
            clickHandler : null,
            clickCallback : new Function
        };

        var settings = $.extend(defaults, options); 

        $(this).each(function() {

            var $this = $(this);

            var score = function(){
                return (typeof($this.attr('score')) == "undefined") ? settings.score : $this.attr('score');
            };  

            var floor         = Math.floor(score());
            var ceil          = Math.ceil(score());
            var total         = $this.attr('total');
            var titles        = $this.attr('titles'); 
            var showTotal     = $this.attr('show-total'); 
            var showScore     = $this.attr('show-score');
            var ajaxURL       = $this.attr('ajax-url');
            var clickCallback = $this.attr('click-callback');

            total  = (typeof(total) == "undefined") ? settings.total : parseInt(total);

            titles = (typeof(titles) == "undefined") ? settings.titles.split(",") : titles.split(",");

            if(typeof(showTotal) == "undefined") showTotal = settings.showTotal;

            if(typeof(showScore) == "undefined") showScore = settings.showScore;

            if(typeof(ajaxURL) == "undefined")   ajaxURL = settings.ajaxURL; 

            if(typeof(clickCallback) == "undefined" || clickCallback == "") 
            {
                clickCallback = settings.clickCallback;
            } 
            else 
            {
                clickCallback = window[clickCallback];
            }

            console.log(total, titles, showTotal, showScore, clickCallback);

            for (var i = 1, length = total + 1; i < length; i++) 
            {
                var className = '';

                if (i <= floor) 
                {
                    className = ' class="full"';                            
                }
                else if (i > score() && i == ceil) 
                {
                    className = ' class="half"';  

                } 
                else if (i > ceil || score() == 0) 
                {
                    className = '';  
                }

                //console.log(i+", "+score()+", "+floor+", "+ceil+", "+total+"<br/>");

                var span = $('<span title="'+titles[i-1]+'" value="'+i+'"'+className+'></span>');

                $this.append(span);
            }

            if(showTotal || showTotal == "true") 
            {
                $this.append('<small>总分：'+total+'分 </small>');
            }                

            if(showScore || showScore == "true") 
            {
                $this.append('<small>平均分：'+score()+'分</small>');
            }

            $this.find("span").bind({
                "mouseenter" : function(event) {

                    var index = $(this).index(); 

                    $this.find("span").each(function(i) { 
                        $(this).removeClass();

                        if (i <= index) {
                            $(this).addClass('full');
                        }

                        //console.log(i, score(), floor, ceil, total, $(this).attr('class'));
                    });                            
                },
                "mouseleave" : function(event) {                            
                    var index = $(this).index(); 

                    $this.find("span").each(function(i) { 
                        i = i + 1;

                        $(this).removeClass();

                        if (i <= Math.floor(score())) 
                        {
                            $(this).addClass('full');                          
                        }
                        else if (i > score() && i == Math.ceil(score())) 
                        {  
                            $(this).addClass("half"); 

                        } 
                    });
                },

                "click" : function() {

                    if(typeof(settings.clickHandler) == "function") {
                        settings.clickHandler($this);

                        return ;
                    }

                    if (ajaxURL == "") {
                        console.error("错误：URL不能为空，Rating评价组件默认通过Ajax执行点击操作。");

                        return ;
                    }

                    var index = $(this).index(); 

                    $.post(ajaxURL, {score : score(), newscore : (index + 1), total : total}, function(data) {

                        $this.attr("score", data).find("small").remove(); 

                        if(showTotal || showTotal == "true") {
                            $this.append('<small>总分：'+total+'分 </small>');
                        }                

                        if(showScore || showScore == "true") {
                            $this.append('<small>平均分：'+data+'分</small>');
                        }

                        $this.find("span").each(function(i) { 
                            i = i + 1;

                            $(this).removeClass();

                            if (i <= Math.floor(data)) 
                            {
                                $(this).addClass('full');                          
                            }
                            else if (i > data && i == Math.ceil(data)) 
                            {  
                                $(this).addClass("half"); 
                            } 
                        });

                        clickCallback($this);

                    });
                }

            });                       
        });

    };

})(PlaneUI);
(function($) {

    $.fn.scrollTo = function (options) {
           
        options = options || {};
        
        var defaults = {
            speed        : 800,
            direction    : "top",
			top			 : null,
			left         : null,
            targetHash   : true,
            hashEmpty    : true,
            callback     : function() {},
            scrollTarget : "html, body"
        };
        
        var settings = $.extend(defaults, (typeof options === "object") ? options : {});
        
        if (typeof options === "function") {
            settings.callback = options;
        }

		$(this.selector ? this.selector : "[scrollto]").bind($.clickOrTouch(), function() {
        
            var scrollHandler = function($this, target) {

                var direction = {};

				if (settings.top === 0) {
					settings.top = "0px";
				}

				if (settings.left === 0) {
					settings.left = "0px";
				}

				if (!settings.top && !settings.left) {
					if (settings.direction === "left") {
						direction = { scrollLeft : target.offset().left }; 
					} else {
						direction = { scrollTop : target.offset().top };
					}
				}

                if (settings.top) {
                    direction.scrollTop = settings.top;
                }

                if (settings.left) {
                    direction.scrollLeft = settings.left;
                }

                $(settings.scrollTarget).animate(direction, settings.speed, function() {
                    if (settings.hashEmpty && window.addEventListener) { // IE9+
                        location.hash = "";
                    }

                    $.proxy(settings.callback, $this)(target);
                });
            };
            
            if (settings.targetHash)
            {            
                if (location.pathname.replace(/^\//, "") == this.pathname.replace(/^\//, "") && location.hostname == this.hostname) 
                {
                    var hash   = this.hash;
                    var target = $(hash);
                    var $this  = $(this);

                    target     = target.length && target || $("[name=" + hash.slice(1) + "]");

                    if (target.length > 0) 
                    {
                        scrollHandler($(this), target);
                    }
                }
            }
            else
            {
                scrollHandler($(this), settings.scrollTarget);                
            }
            
            return false;
		});
    };
    
})(PlaneUI);
(function ($) {

    $(function() {    

        $(document).keyup(function(event) {
            if (event.keyCode ==13) {
                $(".pui-search-submit").trigger("click");
            }
        });

        $('.pui-search-single-button').hover(function() {
            var $this = $(this); 
            var hoverWidth = $this.attr('hover-width');
            var keywordInput = $this.find('.pui-search-keywords'); 

            $this.width(hoverWidth);

            keywordInput.removeClass('pui-search-keywords-slide-reverse').addClass('pui-search-keywords-slide');             
            return false;

        }, function() {
            var $this = $(this);
            var width = $this.attr('width');
            var keywordInput = $this.find('.pui-search-keywords'); 

            $this.width(width);

            keywordInput.removeClass('pui-search-keywords-slide-reverse').addClass('pui-search-keywords-slide-reverse');                  
            return false;
        });

    });

})(PlaneUI);
(function ($) {

    $.fn.sidePosition = function(options) {
        var defaults = {
            zIndexTop       : false,
            attr            : "pui-side-position",
            showMode        : "slide", 
            speed           : 300,
            mask            : false,
            maskFullOpacity : false
        };

        var settings = $.extend(defaults, options); 
        var selector = ($(this).selector === "") ? "[" + settings.attr + "]" : this;

        $(selector).each(function() {

            var $this    = $(this);
            var position = $this.attr(settings.attr);
            var side     = $("." + settings.attr + "-" + position);  

            if (settings.zIndexTop) {
                side.addClass("pui-side-position-zindex-top"); 
            }

            var handle = function() {                      

                if (settings.mask) 
                {
                    var mask = $(".pui-side-position-mask");

                    if (settings.maskFullOpacity)
                    {
                        mask.css({ opacity : 0 });
                    }

                    mask.fadeToggle(settings.speed);

                    if (!mask.is(":hidden")) 
                    {                        
                        mask.bind($.clickOrTouch(), function() {
                            mask.fadeOut(settings.speed);       

                            switch (position) 
                            {
                                case "top":    
                                        side.animate({
                                            top     : "-" + side.outerHeight() + $(".pui-app-header").outerHeight() + "px",
                                            opacity : "hide"
                                        }, settings.speed);

                                case "bottom":    
                                        side.animate({bottom : "-" + side.outerHeight() + "px", opacity : "hide"}, settings.speed);
                                        break;    

                                case "right":  
                                case "left":
                                    default:  
                                        break;
                            }

                            return false;
                        });
                    }
                }       

                if (position === "left" || position === "right")
                {
                    side.height($("body").outerHeight()); 
                }

                if (settings.showMode === "fade")
                {
                    side.fadeToggle(settings.speed);
                } 
                else if (settings.showMode === "slide")
                { 
                    if (position === "left")
                    {                        
                        if (side.is(":hidden"))
                        {
                            side.css({ left : "-" + side.outerWidth() + "px"}).animate({ left : 0, opacity : "show"}, settings.speed);
                        }
                        else
                        {
                            side.animate({left : "-" + side.outerWidth() + "px", opacity : "hide"}, settings.speed);
                        }
                    }

                    if (position === "right")
                    {                        
                        if(side.is(":hidden"))
                        {
                            side.css({right : "-" + side.outerWidth() + "px"}).animate({right : 0, opacity : "show"}, settings.speed);
                        }
                        else
                        {
                            side.animate({
                                right   : "-" + side.outerWidth() + "px",
                                opacity : "hide"
                            }, settings.speed);
                        }
                    }

                    if (position === "top")
                    {                        
                        if (side.is(":hidden"))
                        {
                            side.css({
                                top     : "-" + side.outerHeight() + $(".pui-app-header").outerHeight() + "px"
                            }).animate({
                                top     : $(".pui-app-header").outerHeight(), 
                                opacity : "show"
                            }, settings.speed);
                        }
                        else
                        {
                            side.animate({
                                top     : "-" + side.outerHeight() + $(".pui-app-header").outerHeight() + "px",
                                opacity : "hide"
                            }, settings.speed);
                        }
                    }

                    if (position === "bottom")
                    {                        
                        if (side.is(":hidden"))
                        {
                            side.css({
                                bottom : "-" + side.outerHeight() + "px"
                            }).animate({
                                bottom  : 0,
                                opacity : "show"
                            }, settings.speed);
                        }
                        else
                        {
                            side.animate({
                                bottom  : "-" + side.outerHeight() + "px",
                                opacity : "hide"
                            }, settings.speed);
                        }
                    }

                }
                else
                {
                    side.toggle();
                }
            };

            $this.bind($.clickOrTouch(), handle);  

            side.bind("click", handle); 
        });
    };

})(PlaneUI);
(function ($) {

    $.fn.sideSlide = function(options) {
        var defaults = {
            attr : "pui-side-slide",
            speed : 300,
            mask : false,
            maskFullOpacity: false
        };

        var settings = $.extend(defaults, options);

        $("["+settings.attr+"]").each(function() {

            var $this = $(this);
            var sideName = $this.attr(settings.attr);
            var side = $("."+settings.attr+"-"+sideName);
            var main = $(".pui-app-main"); 
            var appLayout = $(".pui-app-layout");

            $this.bind($.clickOrTouch(), function() {

                if(sideName == "top" || sideName == "bottom") {
                    appLayout.css("overflow-y", "hidden");
                } else {
                    appLayout.css("overflow-x", "hidden");
                }

                if(settings.mask) 
                {
                    var mask = main.find(".pui-mask-bg");

                    if(settings.maskFullOpacity) {
                        mask.css({opacity:0});
                    }

                    mask.fadeToggle(settings.speed);

                    if(!mask.is(":hidden")) 
                    {                        
                        mask.bind($.clickOrTouch(), function() {
                            mask.fadeOut(settings.speed);                            
                            side.hide(); 

                            switch(sideName) 
                            {
                                case "top":    

                                case "bottom":           
                                        main.animate({marginTop : 0}, settings.speed, function(){
                                            appLayout.css("overflow", "auto");
                                        });
                                        break;    

                                case "right":  
                                case "left":
                                    default: 
                                        main.animate({marginLeft : 0}, settings.speed, function(){
                                            appLayout.css("overflow", "auto");
                                        });
                                        break;
                            }

                            return false;
                        });
                    }
                }         

                switch(sideName) 
                {
                    case "top":                                     
                                side.toggle();

                                if(!side.is(":hidden")) {
                                    main.animate({marginTop : side.outerHeight() + "px"}, settings.speed);
                                } else {
                                    main.animate({marginTop : 0}, settings.speed, function(){
                                        appLayout.css("overflow", "auto");
                                    });
                                }
                            break;

                    case "bottom":              

                                if(side.is(":hidden")) {
                                    main.animate({marginTop : "-"+side.outerHeight() + "px"}, settings.speed, function() {
                                        side.show();
                                    });
                                } else {
                                    side.hide();
                                    main.animate({marginTop : 0}, settings.speed, function(){
                                        appLayout.css("overflow", "auto");
                                    });
                                }
                            break;

                    case "right":
                                if(side.is(":hidden")) {
                                    main.animate({marginLeft : "-"+side.outerWidth() + "px"}, settings.speed, function(){
                                        side.show();
                                    });
                                } else {
                                    side.hide(); 
                                    main.animate({marginLeft : 0}, settings.speed, function(){
                                        appLayout.css("overflow", "auto");
                                    });
                                }
                            break;

                    case "left":
                        default:

                                side.toggle();

                                if(!side.is(":hidden")) {
                                    main.animate({marginLeft : side.outerWidth() + "px"}, settings.speed);
                                } else { 
                                    main.animate({marginLeft : 0}, settings.speed, function(){
                                        appLayout.css("overflow", "auto");
                                    });
                                }
                            break;
                }

                return false;
            });
        });
    };

})(PlaneUI);
(function($) { 

    $(function() {

        $("pui-switch").each(function() {

            var $this  = $(this);
            var values = $this.attr('value').split(','); 

            try 
            {
                var texts = $this.attr('text').split(',');
            } 
            catch(e)
            {
                alert("致命错误：请设置switch组件的text属性。");

                return false;
            } 

            var switched  = $this.attr('switched');
            var name      = $this.attr('name');
            var elements  = "", switchedValue;
            var innerHTML = $this.html(); 

            $this.html(''); 

            if(typeof(switched) == "undefined") 
            {
                switched = values[0];
            }

            for (var i = 0, len = values.length; i < len; i++) 
            {
                var isSwitched = (switched == values[i]) ? ' class="switched"' : ''; 

                if(switched == values[i]) switchedValue = values[i];

                elements += '<span value="'+values[i]+'"'+isSwitched+'>'+texts[i]+'</span>';
            }                        

            $this.append('<switches>'+elements+'</switches>');
            $this.append('<input type="hidden" name="'+name+'" value="'+switchedValue+'" />'); 

            if(innerHTML != '') 
            {
                $this.append(innerHTML); 
            }

            var item  = $this.find('switches > span'); 
            var input = $this.find('input');

            if($this.attr('disabled') != 'disabled') 
            {   
                item.bind($.clickOrTouch(), function() {

                    $(this).addClass('switched').siblings().removeClass('switched');                    
                    input.val($(this).attr('value'));
                });
            }

        });  
    });

})(PlaneUI);
(function($) { 

    $(function() {

        $('pui-switch-slide').each(function() {
            var $this    = $(this);
            var width    = $this.attr('width');
            var name     = $this.attr('name');
            var color    = $this.attr('color');
            var onColor  = $this.attr('on-color');
            var offColor = $this.attr('off-color');
            var btn      = $(this).find("span");
            var animated = $this.attr('animated');                        
            var value    = (btn.attr("class") == 'off') ? 0 : 1;
            var input    = $('<input type="hidden" name="'+name+'" value="'+value+'" />');

            $this.append(input);

            if(typeof(width) != 'undefined') 
            {
                $this.width(width);
            }

            if(typeof(color) != 'undefined') 
            {
                $this.css({
                    backgroundColor : color,
                    color : color
                });
            }

            var btnClassName = btn.attr("class");

            if((btnClassName != 'off') && typeof(onColor) != 'undefined') 
            {
                $this.css({
                    backgroundColor : onColor,
                    color : onColor
                });
            }

            if((btnClassName == 'off') && typeof(offColor) != 'undefined') 
            {
                $this.css({
                    backgroundColor : offColor,
                    color : offColor
                });
            }   

            $this.bind($.clickOrTouch(), function() { 

                if($this.attr('disabled') == 'disabled') return ; 

                if(typeof(animated) != 'undefined' && animated == 'true') 
                {
                    $this.addClass('pui-switch-slide-animation');
                }

                btn.toggleClass('off');  

                if((btn.attr("class") == 'off') && typeof(offColor) != 'undefined') 
                {
                    $this.css({
                        backgroundColor : offColor,
                        color : offColor
                    });
                } 
                else 
                {
                    $this.css({
                        backgroundColor : onColor,
                        color : onColor
                    });
                }

                $(this).find("input").val( (btn.attr("class") == 'off') ? "0" : "1" );  

                var change = btn.attr("change");
                btn.attr("change", btn.html());
                btn.html(change);  

                return false;
            });
        }); 
    });

})(PlaneUI);
(function($) {

    $.fn.tab = function(options) {  

        var defaults = {
            speed : 0,
            ajax : false, 
            ajaxLoading : 'loading...',
            cached : false,
            showMode : "show",
            callback : new Function
        };            

        var settings = $.extend(defaults, options);

        $(this).each(function() {
            var $this = $(this);
            var tabHead = $this.find(".pui-tab-head li");
            var tabBox = $this.find(".pui-tab-box");   

            tabHead.bind($.clickOrTouch(), function() { 

                var thisHead = $(this);

                if(thisHead.hasClass("disabled")) return ;

                var index    = thisHead.index();
                var speed    = settings.speed;
                var showMode = settings.showMode; 
                var ajaxURL  = thisHead.attr("tab-ajax-url");
                var cached   = thisHead.attr("tab-ajax-cached"); 

                if(typeof(cached) == "undefined" || cached == "") {
                    cached = settings.cached;
                } 

                thisHead.addClass("active").siblings().removeClass("active"); 

                tabBox.removeClass("show");

                if(showMode == "fade") 
                {
                    tabBox.eq(index).fadeIn(speed).siblings().fadeOut(speed);
                }                    
                else if(showMode == "slide") 
                {
                    tabBox.eq(index).slideDown(speed).siblings().slideUp(speed);
                }                 
                else if(showMode == "scroll-x") 
                {                        
                    var scrollbox    = tabBox.parent();
                    var boxList      = tabBox.parent();
                    var box          = tabBox.eq(index);                        
                    var boxListWidth = 0;

                    tabBox.each(function(){ 
                        boxListWidth += $(this).outerWidth();
                    });

                    //console.log(boxList.html(), index * box[0].offsetWidth);

                    scrollbox.outerHeight(box.outerHeight());
                    boxList.outerWidth(boxListWidth + 50).animate({
                        marginLeft : "-"+(index * box.outerWidth()) + "px"
                    }, speed);
                }           
                else if(showMode == "scroll-y") 
                {                        
                    var scrollbox     = tabBox.parent();
                    var boxList       = tabBox.parent();
                    var box           = tabBox.eq(index);                        
                    var boxListHeight = 0;

                    tabBox.each(function(){
                        boxListHeight += $(this).outerHeight();
                    });

                    //console.log(boxList.html(), index * box.outerHeight());

                    scrollbox.outerHeight(box.outerHeight());
                    boxList.outerHeight(boxListHeight + 50).animate({
                        marginTop : "-"+(index * box.outerHeight()) + "px"
                    }, speed);
                }
                else
                {
                    tabBox.eq(index).show(speed).siblings().hide(speed);
                }

                console.log(typeof(ajaxURL) != "undefined", settings.ajax , !settings.cached, thisHead.data("cached"));

                if(typeof(ajaxURL) != "undefined" && settings.ajax && typeof(thisHead.data("cached")) == "undefined") 
                {
                    tabBox.eq(index).html(settings.ajaxLoading);

                    var ajaxURL = tabHead.eq(index).attr("tab-ajax-url");

                    $.get(ajaxURL, {}, function(data) {

                        if(cached) 
                        {
                            thisHead.data("cached", true);
                        }

                        tabBox.eq(index).html(data);

                        settings.callback($this, tabHead, tabBox, index, settings);
                    });                        
                }

                if(!settings.ajax) {
                    settings.callback($this, tabHead, tabBox, index, settings);
                }
            });
        }); 

        $("[tab-onready-ajax*=true]").each(function() {

            var $this  = $(this); 
            var index  = $this.index();
            var tabBox = $this.parent().parent().find(".pui-tab-box"); 
            var cached = $this.attr("tab-ajax-cached"); 

            if(typeof(cached) == "undefined" || cached == "") {
                cached = settings.cached;
            } 

            tabBox.eq(index).html(settings.ajaxLoading);

            var ajaxURL = $this.attr("tab-ajax-url");

            if(typeof(ajaxURL) != "undefined" && typeof($this.data("cached")) == "undefined") 
            {
                $.get(ajaxURL, {}, function(data) {

                    if(cached)
                    {
                        $this.data("cached", true); 
                    }

                    tabBox.eq(index).html(data);

                    settings.callback($this, $this.parent(), tabBox, index, settings);
                }); 
            }
        });
    };

})(PlaneUI);
(function($){

    $.fn.tooltip = function(options) {

        var defaults = {
            target : "",
            auto : false,
            position : ["bottom", "center"],
            positionClassPrefix : "pui-tooltip-arrow-",
            addClass : "pui-tooltip-bordered pui-tooltip-primary-light",
            cached : false,
            ajax : new Function,
            showMode : "show",
            touch : true,
            content : new Function,
            callback : new Function
        };

        var settings = $.extend(defaults, options);
        var $this    = $(this);

        $this.each(function() { 

            var body     = $("body");
            var _this    = $(this);

            var parseJSON = function() {

                var json   = {};
                var string = _this.attr("pui-tooltip");

                try {
                    json = $.jsonDecode(string);
                } catch(e) {
                    json = eval("("+string+")");
                }

                return json;
            };

            var jsonData = function(key) { 

                return parseJSON()[key];
            };

            var setJSONData = function(key, value) {

                var json = parseJSON();

                json[key] = value;

                _this.attr("pui-tooltip", $.jsonEncode(json));
            };

            var target   = function() {
                return (typeof(jsonData("target")) == "undefined") ? settings.target : jsonData("target");
            };

            var content  = jsonData("content");
            var position = jsonData("position");
            var addClass = jsonData("addClass");
            var cached   = jsonData("cached"); 
            var callback = jsonData("callback"); 
            var showMode = jsonData("showMode");
            var touch    = jsonData("touch");

            if (typeof(content) == "undefined") {
                content = settings.content;
            }

            if (typeof(position) == "undefined") {
                position = settings.position;
            }

            if (typeof(addClass) == "undefined") {
                addClass = settings.addClass;
            } 

            if (typeof(cached) == "undefined") {
                cached = settings.cached;
            }

            if (typeof(callback) == "undefined") {
                callback = settings.callback;
            }

            if (typeof(showMode) == "undefined") {
                showMode = settings.showMode;
            }

            if (typeof(touch) == "undefined") {
                touch = settings.touch;
            }

            //console.log("cached", cached);

            var tooltip, arrowHeight = 12;

            var setTooltipStyle = function(tooltip) {

                var arrow         = "";
                var posX          = position[0];
                var posY          = position[1];
                var _top          = _left = 0; 
                var width         = _this[0].offsetWidth;
                var height        = _this[0].offsetHeight;
                var top           = _this.offset().top;
                var left          = _this.offset().left;

                var tooltipWidth  = tooltip[0].offsetWidth;
                var tooltipHeight = tooltip[0].offsetHeight;                    
                var windowWidth   = (document.all) ? document.getElementsByTagName("html")[0].offsetWidth : window.innerWidth;
                var windowHeight  = (document.all) ? document.getElementsByTagName("html")[0].offsetHeight : window.innerHeight;

                //console.log("windowWidth=>", windowWidth, "windowHeight=>", windowHeight);

                //console.log("tooltip.offsetHeight", _this[0].offsetWidth, tooltip[0].offsetHeight, tooltip.width());

                //console.log(position, "width=>", width, "height=>", height, "tooltip.width=>", tooltipWidth, "tooltip.height=>", tooltipHeight, "top=>", top, "left=>", left, "_top=>",  _top, "_left=>", _left);

                var arrowGetPosition = function(arrow) {
                    var data = {};

                    switch(arrow) {
                        case "tc":
                                data = { 
                                    top  : top  + height + arrowHeight,
                                    left : left + (width - tooltipWidth) / 2,
                                    posX : "bottom",
                                    posY : "center"
                                }
                            break;

                        case "tl":
                                data = {  
                                    top  : top + height + arrowHeight, 
                                    left : left,
                                    posX : "bottom",
                                    posY : "left"
                                }
                            break;

                        case "tr":
                                data = {
                                    top  : top  + height + arrowHeight,  
                                    left : left + width - tooltipWidth,
                                    posX : "bottom",
                                    posY : "right"
                                }
                            break;

                        case "bc":
                                data = {
                                    top  : top  - tooltipHeight - arrowHeight,                        
                                    left : left + (width - tooltipWidth) / 2, 
                                    posX : "top",
                                    posY : "center"
                                }
                            break;

                        case "bl":
                                data = {
                                    top  : top - tooltipHeight - arrowHeight,                       
                                    left : left,
                                    posX : "top",
                                    posY : "left"
                                }
                            break;

                        case "br":
                                data = { 
                                    top  : top  - tooltipHeight - arrowHeight,                        
                                    left : left + width - tooltipWidth,
                                    posX : "top",
                                    posY : "right"
                                }
                            break;

                        case "lc":
                                data = {  
                                    top  : top  + (height - tooltipHeight) / 2,
                                    left : left + (width + arrowHeight), 
                                    posX : "right",
                                    posY : "center"
                                }
                            break;

                        case "lt":
                                data = {   
                                    top  : top,
                                    left : left + (width + arrowHeight),   
                                    posX : "right",
                                    posY : "top"
                                }
                            break;

                        case "lb":
                                data = {      
                                    top  : top  + height - tooltipHeight,
                                    left : left + (width + arrowHeight),
                                    posX : "right",
                                    posY : "bottom"
                                }
                            break;

                        case "rc":
                                data = { 
                                    top  : top  + (height - tooltipHeight) / 2, 
                                    left : left - (tooltipWidth + arrowHeight),
                                    posX : "left",
                                    posY : "center"
                                }
                            break;

                        case "rt":
                                data = {  
                                    top  : top,
                                    left : left - (tooltipWidth + arrowHeight),
                                    posX : "left",
                                    posY : "top"
                                }
                            break;

                        case "rb":
                                data = {   
                                    top  : top  + height - tooltipHeight,
                                    left : left - (tooltipWidth + arrowHeight),
                                    posX : "left",
                                    posY : "bottom"
                                }
                            break;
                    };

                    return data;
                };

                if(posX == "top" && posY == "center") {
                    arrow = "bc";
                }

                if(posX == "top" && posY == "left") {
                    arrow = "bl";
                }

                if(posX == "top" && posY == "right") {
                    arrow = "br";
                }

                if(posX == "bottom" && posY == "center") {
                    arrow = "tc";
                }

                if(posX == "bottom" && posY == "left") {
                    arrow = "tl"; 
                }

                if(posX == "bottom" && posY == "right") {
                    arrow = "tr";
                }

                if(posX == "left" && posY == "center") {
                    arrow = "rc";
                }

                if(posX == "left" && posY == "top") {
                    arrow = "rt";
                }

                if(posX == "left" && posY == "bottom") {
                    arrow = "rb";
                }

                if(posX == "right" && posY == "center") {
                    arrow = "lc";                       
                }

                if(posX == "right" && posY == "top") {
                    arrow = "lt";                      
                }

                if(posX == "right" && posY == "bottom") {
                    arrow = "lb";                        
                }

                _top = arrowGetPosition(arrow).top;
                _left = arrowGetPosition(arrow).left;

                /*var newArrow = "";

                console.log("_top < 0", _top - document.body.scrollTop < 0, _top, document.body.scrollTop);

                console.log("_left < 0", (_left - tooltipWidth) < 0);

                if((_top - document.body.scrollTop) < 0 && (_left - tooltipWidth) < 0) {
                    arrow = "tl";
                }

                if((_top + tooltipHeight)  > windowHeight && (_left - tooltipWidth) < 0) {
                    arrow = "bl";
                }*/


                /*if(_top < 0) {
                    arrow = "tc";
                }

                if(_top + tooltipHeight > windowHeight) {
                    arrow = "bc";
                }

                if(_left < 0) {
                    arrow = "rc";
                }

                if(_left + tooltipWidth > windowWidth) {
                    arrow = "rc";
                }*/

                //_top  = arrowGetPosition(arrow).top;
                //_left = arrowGetPosition(arrow).left;
                //posX  = arrowGetPosition(arrow).posX;
                //posY  = arrowGetPosition(arrow).posY;

                //console.log(position, "width=>", width, "height=>", height, "tooltip.width=>", tooltipWidth, "tooltip.height=>", tooltipHeight, "top=>", top, "left=>", left, "_top=>",  _top, "_left=>", _left);

                // 箭头居中的设置

                var arrowClassName = settings.positionClassPrefix + arrow;

                if (posY == "center") {
                    var head = document.getElementsByTagName("head")[0];
                    var style = document.createElement('style');
                    style.id = tooltip.attr("id") + "-style";

                    var styleText = "";
                    styleText += "#"+tooltip.attr("id") + "." + arrowClassName+":before, ";
                    styleText += "#"+tooltip.attr("id") + "." + arrowClassName+":after";


                    if(posX == "top" && posY == "center") {
                        styleText += "{left:"+((tooltipWidth / 2) - 7)+"px;}";
                    }

                    if(posX == "bottom" && posY == "center") {
                        styleText += "{left:"+((tooltipWidth / 2) - 7)+"px;}";
                    }

                    if(posX == "left" && posY == "center") {
                        styleText += "{top:"+((tooltipHeight / 2) - 7)+"px;}";
                    }

                    if(posX == "right" && posY == "center") {
                        styleText += "{top:"+((tooltipHeight / 2) - 7)+"px;}";
                    }

                    style.innerText = styleText;

                    head.appendChild(style);
                }

                //document.styleSheets[0].addRule('.tooltip-arrow-bc:before, .tooltip-arrow-bc:after', 'top:0;left:0;background:red;');

                tooltip.addClass(arrowClassName)
                       .css({
                            position: "absolute",
                            top : _top,
                            left : _left
                        }); 
            };

            var showAction = function() {

                //console.log("mouseenter", target(), addClass, content, cached, showMode);

                if (typeof(target()) == "undefined" || target() == "") 
                {                            
                    tooltip = $('<div class="pui-tooltip ' + addClass + '"></div>');   
                    tooltip.data("id", "tooltip-" + (new Date()).getTime() );
                    tooltip.attr("id", tooltip.data("id") );

                    if(cached) 
                    {
                        setJSONData("target", "#" + tooltip.data("id") );
                    } 

                    body.append(tooltip);  

                    if(typeof(content) == "function") {

                        content(_this, tooltip, setTooltipStyle); 

                    } else {
                        tooltip.html(content);                        
                        setTooltipStyle(tooltip); 
                    }
                } 
                else 
                {                            
                    tooltip = $(target());  
                    tooltip.removeClass('pui-hide');

                    if(!cached && !tooltip.data("targetStyled")) 
                    {            
                        tooltip.data("targetStyled", true);
                        setTooltipStyle(tooltip);
                    }
                }

                tooltip[ (showMode == "fade") ? "fadeIn" : "show" ]();

            };

            var hideAction = function() {

                tooltip[ (showMode == "fade") ? "fadeOut" : "hide" ](); 

                if (typeof(target()) == "undefined" && !cached || target() == "") 
                {
                    $("#"+tooltip.attr("id") + "-style").remove();
                    tooltip.remove();
                }

                callback(_this, tooltip);
            };

            _this.bind({
                "mouseenter" : showAction,
                "mouseleave" : hideAction
            });

            if(touch) {

                _this.bind({
                    "touchstart" : showAction,
                    "touchend"   : hideAction,
                    "touchcancel": hideAction
                });
            } 

        });
    };

})(PlaneUI);
/*!
 * Modernizr v2.8.3
 * www.modernizr.com
 *
 * Copyright (c) Faruk Ates, Paul Irish, Alex Sexton
 * Available under the BSD and MIT licenses: www.modernizr.com/license/
 */

/*
 * Modernizr tests which native CSS3 and HTML5 features are available in
 * the current UA and makes the results available to you in two ways:
 * as properties on a global Modernizr object, and as classes on the
 * <html> element. This information allows you to progressively enhance
 * your pages with a granular level of control over the experience.
 *
 * Modernizr has an optional (not included) conditional resource loader
 * called Modernizr.load(), based on Yepnope.js (yepnopejs.com).
 * To get a build that includes Modernizr.load(), as well as choosing
 * which tests to include, go to www.modernizr.com/download/
 *
 * Authors        Faruk Ates, Paul Irish, Alex Sexton
 * Contributors   Ryan Seddon, Ben Alman
 */

window.Modernizr = (function( window, document, undefined ) {

    var version = '2.8.3',

    Modernizr = {},

    /*>>cssclasses*/
    // option for enabling the HTML classes to be added
    enableClasses = true,
    /*>>cssclasses*/

    docElement = document.documentElement,

    /**
     * Create our "modernizr" element that we do most feature tests on.
     */
    mod = 'modernizr',
    modElem = document.createElement(mod),
    mStyle = modElem.style,

    /**
     * Create the input element for various Web Forms feature tests.
     */
    inputElem /*>>inputelem*/ = document.createElement('input') /*>>inputelem*/ ,

    /*>>smile*/
    smile = ':)',
    /*>>smile*/

    toString = {}.toString,

    // TODO :: make the prefixes more granular
    /*>>prefixes*/
    // List of property values to set for css tests. See ticket #21
    prefixes = ' -webkit- -moz- -o- -ms- '.split(' '),
    /*>>prefixes*/

    /*>>domprefixes*/
    // Following spec is to expose vendor-specific style properties as:
    //   elem.style.WebkitBorderRadius
    // and the following would be incorrect:
    //   elem.style.webkitBorderRadius

    // Webkit ghosts their properties in lowercase but Opera & Moz do not.
    // Microsoft uses a lowercase `ms` instead of the correct `Ms` in IE8+
    //   erik.eae.net/archives/2008/03/10/21.48.10/

    // More here: github.com/Modernizr/Modernizr/issues/issue/21
    omPrefixes = 'Webkit Moz O ms',

    cssomPrefixes = omPrefixes.split(' '),

    domPrefixes = omPrefixes.toLowerCase().split(' '),
    /*>>domprefixes*/

    /*>>ns*/
    ns = {'svg': 'http://www.w3.org/2000/svg'},
    /*>>ns*/

    tests = {},
    inputs = {},
    attrs = {},

    classes = [],

    slice = classes.slice,

    featureName, // used in testing loop


    /*>>teststyles*/
    // Inject element with style element and some CSS rules
    injectElementWithStyles = function( rule, callback, nodes, testnames ) {

      var style, ret, node, docOverflow,
          div = document.createElement('div'),
          // After page load injecting a fake body doesn't work so check if body exists
          body = document.body,
          // IE6 and 7 won't return offsetWidth or offsetHeight unless it's in the body element, so we fake it.
          fakeBody = body || document.createElement('body');

      if ( parseInt(nodes, 10) ) {
          // In order not to give false positives we create a node for each test
          // This also allows the method to scale for unspecified uses
          while ( nodes-- ) {
              node = document.createElement('div');
              node.id = testnames ? testnames[nodes] : mod + (nodes + 1);
              div.appendChild(node);
          }
      }

      // <style> elements in IE6-9 are considered 'NoScope' elements and therefore will be removed
      // when injected with innerHTML. To get around this you need to prepend the 'NoScope' element
      // with a 'scoped' element, in our case the soft-hyphen entity as it won't mess with our measurements.
      // msdn.microsoft.com/en-us/library/ms533897%28VS.85%29.aspx
      // Documents served as xml will throw if using &shy; so use xml friendly encoded version. See issue #277
      style = ['&#173;','<style id="s', mod, '">', rule, '</style>'].join('');
      div.id = mod;
      // IE6 will false positive on some tests due to the style element inside the test div somehow interfering offsetHeight, so insert it into body or fakebody.
      // Opera will act all quirky when injecting elements in documentElement when page is served as xml, needs fakebody too. #270
      (body ? div : fakeBody).innerHTML += style;
      fakeBody.appendChild(div);
      if ( !body ) {
          //avoid crashing IE8, if background image is used
          fakeBody.style.background = '';
          //Safari 5.13/5.1.4 OSX stops loading if ::-webkit-scrollbar is used and scrollbars are visible
          fakeBody.style.overflow = 'hidden';
          docOverflow = docElement.style.overflow;
          docElement.style.overflow = 'hidden';
          docElement.appendChild(fakeBody);
      }

      ret = callback(div, rule);
      // If this is done after page load we don't want to remove the body so check if body exists
      if ( !body ) {
          fakeBody.parentNode.removeChild(fakeBody);
          docElement.style.overflow = docOverflow;
      } else {
          div.parentNode.removeChild(div);
      }

      return !!ret;

    },
    /*>>teststyles*/

    /*>>mq*/
    // adapted from matchMedia polyfill
    // by Scott Jehl and Paul Irish
    // gist.github.com/786768
    testMediaQuery = function( mq ) {

      var matchMedia = window.matchMedia || window.msMatchMedia;
      if ( matchMedia ) {
        return matchMedia(mq) && matchMedia(mq).matches || false;
      }

      var bool;

      injectElementWithStyles('@media ' + mq + ' { #' + mod + ' { position: absolute; } }', function( node ) {
        bool = (window.getComputedStyle ?
                  getComputedStyle(node, null) :
                  node.currentStyle)['position'] == 'absolute';
      });

      return bool;

     },
     /*>>mq*/


    /*>>hasevent*/
    //
    // isEventSupported determines if a given element supports the given event
    // kangax.github.com/iseventsupported/
    //
    // The following results are known incorrects:
    //   Modernizr.hasEvent("webkitTransitionEnd", elem) // false negative
    //   Modernizr.hasEvent("textInput") // in Webkit. github.com/Modernizr/Modernizr/issues/333
    //   ...
    isEventSupported = (function() {

      var TAGNAMES = {
        'select': 'input', 'change': 'input',
        'submit': 'form', 'reset': 'form',
        'error': 'img', 'load': 'img', 'abort': 'img'
      };

      function isEventSupported( eventName, element ) {

        element = element || document.createElement(TAGNAMES[eventName] || 'div');
        eventName = 'on' + eventName;

        // When using `setAttribute`, IE skips "unload", WebKit skips "unload" and "resize", whereas `in` "catches" those
        var isSupported = eventName in element;

        if ( !isSupported ) {
          // If it has no `setAttribute` (i.e. doesn't implement Node interface), try generic element
          if ( !element.setAttribute ) {
            element = document.createElement('div');
          }
          if ( element.setAttribute && element.removeAttribute ) {
            element.setAttribute(eventName, '');
            isSupported = is(element[eventName], 'function');

            // If property was created, "remove it" (by setting value to `undefined`)
            if ( !is(element[eventName], 'undefined') ) {
              element[eventName] = undefined;
            }
            element.removeAttribute(eventName);
          }
        }

        element = null;
        return isSupported;
      }
      return isEventSupported;
    })(),
    /*>>hasevent*/

    // TODO :: Add flag for hasownprop ? didn't last time

    // hasOwnProperty shim by kangax needed for Safari 2.0 support
    _hasOwnProperty = ({}).hasOwnProperty, hasOwnProp;

    if ( !is(_hasOwnProperty, 'undefined') && !is(_hasOwnProperty.call, 'undefined') ) {
      hasOwnProp = function (object, property) {
        return _hasOwnProperty.call(object, property);
      };
    }
    else {
      hasOwnProp = function (object, property) { /* yes, this can give false positives/negatives, but most of the time we don't care about those */
        return ((property in object) && is(object.constructor.prototype[property], 'undefined'));
      };
    }

    // Adapted from ES5-shim https://github.com/kriskowal/es5-shim/blob/master/es5-shim.js
    // es5.github.com/#x15.3.4.5

    if (!Function.prototype.bind) {
      Function.prototype.bind = function bind(that) {

        var target = this;

        if (typeof target != "function") {
            throw new TypeError();
        }

        var args = slice.call(arguments, 1),
            bound = function () {

            if (this instanceof bound) {

              var F = function(){};
              F.prototype = target.prototype;
              var self = new F();

              var result = target.apply(
                  self,
                  args.concat(slice.call(arguments))
              );
              if (Object(result) === result) {
                  return result;
              }
              return self;

            } else {

              return target.apply(
                  that,
                  args.concat(slice.call(arguments))
              );

            }

        };

        return bound;
      };
    }

    /**
     * setCss applies given styles to the Modernizr DOM node.
     */
    function setCss( str ) {
        mStyle.cssText = str;
    }

    /**
     * setCssAll extrapolates all vendor-specific css strings.
     */
    function setCssAll( str1, str2 ) {
        return setCss(prefixes.join(str1 + ';') + ( str2 || '' ));
    }

    /**
     * is returns a boolean for if typeof obj is exactly type.
     */
    function is( obj, type ) {
        return typeof obj === type;
    }

    /**
     * contains returns a boolean for if substr is found within str.
     */
    function contains( str, substr ) {
        return !!~('' + str).indexOf(substr);
    }

    /*>>testprop*/

    // testProps is a generic CSS / DOM property test.

    // In testing support for a given CSS property, it's legit to test:
    //    `elem.style[styleName] !== undefined`
    // If the property is supported it will return an empty string,
    // if unsupported it will return undefined.

    // We'll take advantage of this quick test and skip setting a style
    // on our modernizr element, but instead just testing undefined vs
    // empty string.

    // Because the testing of the CSS property names (with "-", as
    // opposed to the camelCase DOM properties) is non-portable and
    // non-standard but works in WebKit and IE (but not Gecko or Opera),
    // we explicitly reject properties with dashes so that authors
    // developing in WebKit or IE first don't end up with
    // browser-specific content by accident.

    function testProps( props, prefixed ) {
        for ( var i in props ) {
            var prop = props[i];
            if ( !contains(prop, "-") && mStyle[prop] !== undefined ) {
                return prefixed == 'pfx' ? prop : true;
            }
        }
        return false;
    }
    /*>>testprop*/

    // TODO :: add testDOMProps
    /**
     * testDOMProps is a generic DOM property test; if a browser supports
     *   a certain property, it won't return undefined for it.
     */
    function testDOMProps( props, obj, elem ) {
        for ( var i in props ) {
            var item = obj[props[i]];
            if ( item !== undefined) {

                // return the property name as a string
                if (elem === false) return props[i];

                // let's bind a function
                if (is(item, 'function')){
                  // default to autobind unless override
                  return item.bind(elem || obj);
                }

                // return the unbound function or obj or value
                return item;
            }
        }
        return false;
    }

    /*>>testallprops*/
    /**
     * testPropsAll tests a list of DOM properties we want to check against.
     *   We specify literally ALL possible (known and/or likely) properties on
     *   the element including the non-vendor prefixed one, for forward-
     *   compatibility.
     */
    function testPropsAll( prop, prefixed, elem ) {

        var ucProp  = prop.charAt(0).toUpperCase() + prop.slice(1),
            props   = (prop + ' ' + cssomPrefixes.join(ucProp + ' ') + ucProp).split(' ');

        // did they call .prefixed('boxSizing') or are we just testing a prop?
        if(is(prefixed, "string") || is(prefixed, "undefined")) {
          return testProps(props, prefixed);

        // otherwise, they called .prefixed('requestAnimationFrame', window[, elem])
        } else {
          props = (prop + ' ' + (domPrefixes).join(ucProp + ' ') + ucProp).split(' ');
          return testDOMProps(props, prefixed, elem);
        }
    }
    /*>>testallprops*/


    /**
     * Tests
     * -----
     */

    // The *new* flexbox
    // dev.w3.org/csswg/css3-flexbox

    tests['flexbox'] = function() {
      return testPropsAll('flexWrap');
    };

    // The *old* flexbox
    // www.w3.org/TR/2009/WD-css3-flexbox-20090723/

    tests['flexboxlegacy'] = function() {
        return testPropsAll('boxDirection');
    };

    // On the S60 and BB Storm, getContext exists, but always returns undefined
    // so we actually have to call getContext() to verify
    // github.com/Modernizr/Modernizr/issues/issue/97/

    tests['canvas'] = function() {
        var elem = document.createElement('canvas');
        return !!(elem.getContext && elem.getContext('2d'));
    };

    tests['canvastext'] = function() {
        return !!(Modernizr['canvas'] && is(document.createElement('canvas').getContext('2d').fillText, 'function'));
    };

    // webk.it/70117 is tracking a legit WebGL feature detect proposal

    // We do a soft detect which may false positive in order to avoid
    // an expensive context creation: bugzil.la/732441

    tests['webgl'] = function() {
        return !!window.WebGLRenderingContext;
    };

    /*
     * The Modernizr.touch test only indicates if the browser supports
     *    touch events, which does not necessarily reflect a touchscreen
     *    device, as evidenced by tablets running Windows 7 or, alas,
     *    the Palm Pre / WebOS (touch) phones.
     *
     * Additionally, Chrome (desktop) used to lie about its support on this,
     *    but that has since been rectified: crbug.com/36415
     *
     * We also test for Firefox 4 Multitouch Support.
     *
     * For more info, see: modernizr.github.com/Modernizr/touch.html
     */

    tests['touch'] = function() {
        var bool;

        if(('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) {
          bool = true;
        } else {
          injectElementWithStyles(['@media (',prefixes.join('touch-enabled),('),mod,')','{#modernizr{top:9px;position:absolute}}'].join(''), function( node ) {
            bool = node.offsetTop === 9;
          });
        }

        return bool;
    };


    // geolocation is often considered a trivial feature detect...
    // Turns out, it's quite tricky to get right:
    //
    // Using !!navigator.geolocation does two things we don't want. It:
    //   1. Leaks memory in IE9: github.com/Modernizr/Modernizr/issues/513
    //   2. Disables page caching in WebKit: webk.it/43956
    //
    // Meanwhile, in Firefox < 8, an about:config setting could expose
    // a false positive that would throw an exception: bugzil.la/688158

    tests['geolocation'] = function() {
        return 'geolocation' in navigator;
    };


    tests['postmessage'] = function() {
      return !!window.postMessage;
    };


    // Chrome incognito mode used to throw an exception when using openDatabase
    // It doesn't anymore.
    tests['websqldatabase'] = function() {
      return !!window.openDatabase;
    };

    // Vendors had inconsistent prefixing with the experimental Indexed DB:
    // - Webkit's implementation is accessible through webkitIndexedDB
    // - Firefox shipped moz_indexedDB before FF4b9, but since then has been mozIndexedDB
    // For speed, we don't test the legacy (and beta-only) indexedDB
    tests['indexedDB'] = function() {
      return !!testPropsAll("indexedDB", window);
    };

    // documentMode logic from YUI to filter out IE8 Compat Mode
    //   which false positives.
    tests['hashchange'] = function() {
      return isEventSupported('hashchange', window) && (document.documentMode === undefined || document.documentMode > 7);
    };

    // Per 1.6:
    // This used to be Modernizr.historymanagement but the longer
    // name has been deprecated in favor of a shorter and property-matching one.
    // The old API is still available in 1.6, but as of 2.0 will throw a warning,
    // and in the first release thereafter disappear entirely.
    tests['history'] = function() {
      return !!(window.history && history.pushState);
    };

    tests['draganddrop'] = function() {
        var div = document.createElement('div');
        return ('draggable' in div) || ('ondragstart' in div && 'ondrop' in div);
    };

    // FF3.6 was EOL'ed on 4/24/12, but the ESR version of FF10
    // will be supported until FF19 (2/12/13), at which time, ESR becomes FF17.
    // FF10 still uses prefixes, so check for it until then.
    // for more ESR info, see: mozilla.org/en-US/firefox/organizations/faq/
    tests['websockets'] = function() {
        return 'WebSocket' in window || 'MozWebSocket' in window;
    };


    // css-tricks.com/rgba-browser-support/
    tests['rgba'] = function() {
        // Set an rgba() color and check the returned value

        setCss('background-color:rgba(150,255,150,.5)');

        return contains(mStyle.backgroundColor, 'rgba');
    };

    tests['hsla'] = function() {
        // Same as rgba(), in fact, browsers re-map hsla() to rgba() internally,
        //   except IE9 who retains it as hsla

        setCss('background-color:hsla(120,40%,100%,.5)');

        return contains(mStyle.backgroundColor, 'rgba') || contains(mStyle.backgroundColor, 'hsla');
    };

    tests['multiplebgs'] = function() {
        // Setting multiple images AND a color on the background shorthand property
        //  and then querying the style.background property value for the number of
        //  occurrences of "url(" is a reliable method for detecting ACTUAL support for this!

        setCss('background:url(https://),url(https://),red url(https://)');

        // If the UA supports multiple backgrounds, there should be three occurrences
        //   of the string "url(" in the return value for elemStyle.background

        return (/(url\s*\(.*?){3}/).test(mStyle.background);
    };



    // this will false positive in Opera Mini
    //   github.com/Modernizr/Modernizr/issues/396

    tests['backgroundsize'] = function() {
        return testPropsAll('backgroundSize');
    };

    tests['borderimage'] = function() {
        return testPropsAll('borderImage');
    };


    // Super comprehensive table about all the unique implementations of
    // border-radius: muddledramblings.com/table-of-css3-border-radius-compliance

    tests['borderradius'] = function() {
        return testPropsAll('borderRadius');
    };

    // WebOS unfortunately false positives on this test.
    tests['boxshadow'] = function() {
        return testPropsAll('boxShadow');
    };

    // FF3.0 will false positive on this test
    tests['textshadow'] = function() {
        return document.createElement('div').style.textShadow === '';
    };


    tests['opacity'] = function() {
        // Browsers that actually have CSS Opacity implemented have done so
        //  according to spec, which means their return values are within the
        //  range of [0.0,1.0] - including the leading zero.

        setCssAll('opacity:.55');

        // The non-literal . in this regex is intentional:
        //   German Chrome returns this value as 0,55
        // github.com/Modernizr/Modernizr/issues/#issue/59/comment/516632
        return (/^0.55$/).test(mStyle.opacity);
    };


    // Note, Android < 4 will pass this test, but can only animate
    //   a single property at a time
    //   goo.gl/v3V4Gp
    tests['cssanimations'] = function() {
        return testPropsAll('animationName');
    };


    tests['csscolumns'] = function() {
        return testPropsAll('columnCount');
    };


    tests['cssgradients'] = function() {
        /**
         * For CSS Gradients syntax, please see:
         * webkit.org/blog/175/introducing-css-gradients/
         * developer.mozilla.org/en/CSS/-moz-linear-gradient
         * developer.mozilla.org/en/CSS/-moz-radial-gradient
         * dev.w3.org/csswg/css3-images/#gradients-
         */

        var str1 = 'background-image:',
            str2 = 'gradient(linear,left top,right bottom,from(#9f9),to(white));',
            str3 = 'linear-gradient(left top,#9f9, white);';

        setCss(
             // legacy webkit syntax (FIXME: remove when syntax not in use anymore)
              (str1 + '-webkit- '.split(' ').join(str2 + str1) +
             // standard syntax             // trailing 'background-image:'
              prefixes.join(str3 + str1)).slice(0, -str1.length)
        );

        return contains(mStyle.backgroundImage, 'gradient');
    };


    tests['cssreflections'] = function() {
        return testPropsAll('boxReflect');
    };


    tests['csstransforms'] = function() {
        return !!testPropsAll('transform');
    };


    tests['csstransforms3d'] = function() {

        var ret = !!testPropsAll('perspective');

        // Webkit's 3D transforms are passed off to the browser's own graphics renderer.
        //   It works fine in Safari on Leopard and Snow Leopard, but not in Chrome in
        //   some conditions. As a result, Webkit typically recognizes the syntax but
        //   will sometimes throw a false positive, thus we must do a more thorough check:
        if ( ret && 'webkitPerspective' in docElement.style ) {

          // Webkit allows this media query to succeed only if the feature is enabled.
          // `@media (transform-3d),(-webkit-transform-3d){ ... }`
          injectElementWithStyles('@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}', function( node, rule ) {
            ret = node.offsetLeft === 9 && node.offsetHeight === 3;
          });
        }
        return ret;
    };


    tests['csstransitions'] = function() {
        return testPropsAll('transition');
    };


    /*>>fontface*/
    // @font-face detection routine by Diego Perini
    // javascript.nwbox.com/CSSSupport/

    // false positives:
    //   WebOS github.com/Modernizr/Modernizr/issues/342
    //   WP7   github.com/Modernizr/Modernizr/issues/538
    tests['fontface'] = function() {
        var bool;

        injectElementWithStyles('@font-face {font-family:"font";src:url("https://")}', function( node, rule ) {
          var style = document.getElementById('smodernizr'),
              sheet = style.sheet || style.styleSheet,
              cssText = sheet ? (sheet.cssRules && sheet.cssRules[0] ? sheet.cssRules[0].cssText : sheet.cssText || '') : '';

          bool = /src/i.test(cssText) && cssText.indexOf(rule.split(' ')[0]) === 0;
        });

        return bool;
    };
    /*>>fontface*/

    // CSS generated content detection
    tests['generatedcontent'] = function() {
        var bool;

        injectElementWithStyles(['#',mod,'{font:0/0 a}#',mod,':after{content:"',smile,'";visibility:hidden;font:3px/1 a}'].join(''), function( node ) {
          bool = node.offsetHeight >= 3;
        });

        return bool;
    };



    // These tests evaluate support of the video/audio elements, as well as
    // testing what types of content they support.
    //
    // We're using the Boolean constructor here, so that we can extend the value
    // e.g.  Modernizr.video     // true
    //       Modernizr.video.ogg // 'probably'
    //
    // Codec values from : github.com/NielsLeenheer/html5test/blob/9106a8/index.html#L845
    //                     thx to NielsLeenheer and zcorpan

    // Note: in some older browsers, "no" was a return value instead of empty string.
    //   It was live in FF3.5.0 and 3.5.1, but fixed in 3.5.2
    //   It was also live in Safari 4.0.0 - 4.0.4, but fixed in 4.0.5

    tests['video'] = function() {
        var elem = document.createElement('video'),
            bool = false;

        // IE9 Running on Windows Server SKU can cause an exception to be thrown, bug #224
        try {
            if ( bool = !!elem.canPlayType ) {
                bool      = new Boolean(bool);
                bool.ogg  = elem.canPlayType('video/ogg; codecs="theora"')      .replace(/^no$/,'');

                // Without QuickTime, this value will be `undefined`. github.com/Modernizr/Modernizr/issues/546
                bool.h264 = elem.canPlayType('video/mp4; codecs="avc1.42E01E"') .replace(/^no$/,'');

                bool.webm = elem.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/,'');
            }

        } catch(e) { }

        return bool;
    };

    tests['audio'] = function() {
        var elem = document.createElement('audio'),
            bool = false;

        try {
            if ( bool = !!elem.canPlayType ) {
                bool      = new Boolean(bool);
                bool.ogg  = elem.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,'');
                bool.mp3  = elem.canPlayType('audio/mpeg;')               .replace(/^no$/,'');

                // Mimetypes accepted:
                //   developer.mozilla.org/En/Media_formats_supported_by_the_audio_and_video_elements
                //   bit.ly/iphoneoscodecs
                bool.wav  = elem.canPlayType('audio/wav; codecs="1"')     .replace(/^no$/,'');
                bool.m4a  = ( elem.canPlayType('audio/x-m4a;')            ||
                              elem.canPlayType('audio/aac;'))             .replace(/^no$/,'');
            }
        } catch(e) { }

        return bool;
    };


    // In FF4, if disabled, window.localStorage should === null.

    // Normally, we could not test that directly and need to do a
    //   `('localStorage' in window) && ` test first because otherwise Firefox will
    //   throw bugzil.la/365772 if cookies are disabled

    // Also in iOS5 Private Browsing mode, attempting to use localStorage.setItem
    // will throw the exception:
    //   QUOTA_EXCEEDED_ERRROR DOM Exception 22.
    // Peculiarly, getItem and removeItem calls do not throw.

    // Because we are forced to try/catch this, we'll go aggressive.

    // Just FWIW: IE8 Compat mode supports these features completely:
    //   www.quirksmode.org/dom/html5.html
    // But IE8 doesn't support either with local files

    tests['localstorage'] = function() {
        try {
            localStorage.setItem(mod, mod);
            localStorage.removeItem(mod);
            return true;
        } catch(e) {
            return false;
        }
    };

    tests['sessionstorage'] = function() {
        try {
            sessionStorage.setItem(mod, mod);
            sessionStorage.removeItem(mod);
            return true;
        } catch(e) {
            return false;
        }
    };


    tests['webworkers'] = function() {
        return !!window.Worker;
    };


    tests['applicationcache'] = function() {
        return !!window.applicationCache;
    };


    // Thanks to Erik Dahlstrom
    tests['svg'] = function() {
        return !!document.createElementNS && !!document.createElementNS(ns.svg, 'svg').createSVGRect;
    };

    // specifically for SVG inline in HTML, not within XHTML
    // test page: paulirish.com/demo/inline-svg
    tests['inlinesvg'] = function() {
      var div = document.createElement('div');
      div.innerHTML = '<svg/>';
      return (div.firstChild && div.firstChild.namespaceURI) == ns.svg;
    };

    // SVG SMIL animation
    tests['smil'] = function() {
        return !!document.createElementNS && /SVGAnimate/.test(toString.call(document.createElementNS(ns.svg, 'animate')));
    };

    // This test is only for clip paths in SVG proper, not clip paths on HTML content
    // demo: srufaculty.sru.edu/david.dailey/svg/newstuff/clipPath4.svg

    // However read the comments to dig into applying SVG clippaths to HTML content here:
    //   github.com/Modernizr/Modernizr/issues/213#issuecomment-1149491
    tests['svgclippaths'] = function() {
        return !!document.createElementNS && /SVGClipPath/.test(toString.call(document.createElementNS(ns.svg, 'clipPath')));
    };

    /*>>webforms*/
    // input features and input types go directly onto the ret object, bypassing the tests loop.
    // Hold this guy to execute in a moment.
    function webforms() {
        /*>>input*/
        // Run through HTML5's new input attributes to see if the UA understands any.
        // We're using f which is the <input> element created early on
        // Mike Taylr has created a comprehensive resource for testing these attributes
        //   when applied to all input types:
        //   miketaylr.com/code/input-type-attr.html
        // spec: www.whatwg.org/specs/web-apps/current-work/multipage/the-input-element.html#input-type-attr-summary

        // Only input placeholder is tested while textarea's placeholder is not.
        // Currently Safari 4 and Opera 11 have support only for the input placeholder
        // Both tests are available in feature-detects/forms-placeholder.js
        Modernizr['input'] = (function( props ) {
            for ( var i = 0, len = props.length; i < len; i++ ) {
                attrs[ props[i] ] = !!(props[i] in inputElem);
            }
            if (attrs.list){
              // safari false positive's on datalist: webk.it/74252
              // see also github.com/Modernizr/Modernizr/issues/146
              attrs.list = !!(document.createElement('datalist') && window.HTMLDataListElement);
            }
            return attrs;
        })('autocomplete autofocus list placeholder max min multiple pattern required step'.split(' '));
        /*>>input*/

        /*>>inputtypes*/
        // Run through HTML5's new input types to see if the UA understands any.
        //   This is put behind the tests runloop because it doesn't return a
        //   true/false like all the other tests; instead, it returns an object
        //   containing each input type with its corresponding true/false value

        // Big thanks to @miketaylr for the html5 forms expertise. miketaylr.com/
        Modernizr['inputtypes'] = (function(props) {

            for ( var i = 0, bool, inputElemType, defaultView, len = props.length; i < len; i++ ) {

                inputElem.setAttribute('type', inputElemType = props[i]);
                bool = inputElem.type !== 'text';

                // We first check to see if the type we give it sticks..
                // If the type does, we feed it a textual value, which shouldn't be valid.
                // If the value doesn't stick, we know there's input sanitization which infers a custom UI
                if ( bool ) {

                    inputElem.value         = smile;
                    inputElem.style.cssText = 'position:absolute;visibility:hidden;';

                    if ( /^range$/.test(inputElemType) && inputElem.style.WebkitAppearance !== undefined ) {

                      docElement.appendChild(inputElem);
                      defaultView = document.defaultView;

                      // Safari 2-4 allows the smiley as a value, despite making a slider
                      bool =  defaultView.getComputedStyle &&
                              defaultView.getComputedStyle(inputElem, null).WebkitAppearance !== 'textfield' &&
                              // Mobile android web browser has false positive, so must
                              // check the height to see if the widget is actually there.
                              (inputElem.offsetHeight !== 0);

                      docElement.removeChild(inputElem);

                    } else if ( /^(search|tel)$/.test(inputElemType) ){
                      // Spec doesn't define any special parsing or detectable UI
                      //   behaviors so we pass these through as true

                      // Interestingly, opera fails the earlier test, so it doesn't
                      //  even make it here.

                    } else if ( /^(url|email)$/.test(inputElemType) ) {
                      // Real url and email support comes with prebaked validation.
                      bool = inputElem.checkValidity && inputElem.checkValidity() === false;

                    } else {
                      // If the upgraded input compontent rejects the :) text, we got a winner
                      bool = inputElem.value != smile;
                    }
                }

                inputs[ props[i] ] = !!bool;
            }
            return inputs;
        })('search tel url email datetime date month week time datetime-local number range color'.split(' '));
        /*>>inputtypes*/
    }
    /*>>webforms*/


    // End of test definitions
    // -----------------------



    // Run through all tests and detect their support in the current UA.
    // todo: hypothetically we could be doing an array of tests and use a basic loop here.
    for ( var feature in tests ) {
        if ( hasOwnProp(tests, feature) ) {
            // run the test, throw the return value into the Modernizr,
            //   then based on that boolean, define an appropriate className
            //   and push it into an array of classes we'll join later.
            featureName  = feature.toLowerCase();
            Modernizr[featureName] = tests[feature]();

            classes.push((Modernizr[featureName] ? '' : 'no-') + featureName);
        }
    }

    /*>>webforms*/
    // input tests need to run.
    Modernizr.input || webforms();
    /*>>webforms*/


    /**
     * addTest allows the user to define their own feature tests
     * the result will be added onto the Modernizr object,
     * as well as an appropriate className set on the html element
     *
     * @param feature - String naming the feature
     * @param test - Function returning true if feature is supported, false if not
     */
     Modernizr.addTest = function ( feature, test ) {
       if ( typeof feature == 'object' ) {
         for ( var key in feature ) {
           if ( hasOwnProp( feature, key ) ) {
             Modernizr.addTest( key, feature[ key ] );
           }
         }
       } else {

         feature = feature.toLowerCase();

         if ( Modernizr[feature] !== undefined ) {
           // we're going to quit if you're trying to overwrite an existing test
           // if we were to allow it, we'd do this:
           //   var re = new RegExp("\\b(no-)?" + feature + "\\b");
           //   docElement.className = docElement.className.replace( re, '' );
           // but, no rly, stuff 'em.
           return Modernizr;
         }

         test = typeof test == 'function' ? test() : test;

         if (typeof enableClasses !== "undefined" && enableClasses) {
           docElement.className += ' ' + (test ? '' : 'no-') + feature;
         }
         Modernizr[feature] = test;

       }

       return Modernizr; // allow chaining.
     };


    // Reset modElem.cssText to nothing to reduce memory footprint.
    setCss('');
    modElem = inputElem = null;

    /*>>shiv*/
    /**
     * @preserve HTML5 Shiv prev3.7.1 | @afarkas @jdalton @jon_neal @rem | MIT/GPL2 Licensed
     */
    ;(function(window, document) {
        /*jshint evil:true */
        /** version */
        var version = '3.7.0';

        /** Preset options */
        var options = window.html5 || {};

        /** Used to skip problem elements */
        var reSkip = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i;

        /** Not all elements can be cloned in IE **/
        var saveClones = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i;

        /** Detect whether the browser supports default html5 styles */
        var supportsHtml5Styles;

        /** Name of the expando, to work with multiple documents or to re-shiv one document */
        var expando = '_html5shiv';

        /** The id for the the documents expando */
        var expanID = 0;

        /** Cached data for each document */
        var expandoData = {};

        /** Detect whether the browser supports unknown elements */
        var supportsUnknownElements;

        (function() {
          try {
            var a = document.createElement('a');
            a.innerHTML = '<xyz></xyz>';
            //if the hidden property is implemented we can assume, that the browser supports basic HTML5 Styles
            supportsHtml5Styles = ('hidden' in a);

            supportsUnknownElements = a.childNodes.length == 1 || (function() {
              // assign a false positive if unable to shiv
              (document.createElement)('a');
              var frag = document.createDocumentFragment();
              return (
                typeof frag.cloneNode == 'undefined' ||
                typeof frag.createDocumentFragment == 'undefined' ||
                typeof frag.createElement == 'undefined'
              );
            }());
          } catch(e) {
            // assign a false positive if detection fails => unable to shiv
            supportsHtml5Styles = true;
            supportsUnknownElements = true;
          }

        }());

        /*--------------------------------------------------------------------------*/

        /**
         * Creates a style sheet with the given CSS text and adds it to the document.
         * @private
         * @param {Document} ownerDocument The document.
         * @param {String} cssText The CSS text.
         * @returns {StyleSheet} The style element.
         */
        function addStyleSheet(ownerDocument, cssText) {
          var p = ownerDocument.createElement('p'),
          parent = ownerDocument.getElementsByTagName('head')[0] || ownerDocument.documentElement;

          p.innerHTML = 'x<style>' + cssText + '</style>';
          return parent.insertBefore(p.lastChild, parent.firstChild);
        }

        /**
         * Returns the value of `html5.elements` as an array.
         * @private
         * @returns {Array} An array of shived element node names.
         */
        function getElements() {
          var elements = html5.elements;
          return typeof elements == 'string' ? elements.split(' ') : elements;
        }

        /**
         * Returns the data associated to the given document
         * @private
         * @param {Document} ownerDocument The document.
         * @returns {Object} An object of data.
         */
        function getExpandoData(ownerDocument) {
          var data = expandoData[ownerDocument[expando]];
          if (!data) {
            data = {};
            expanID++;
            ownerDocument[expando] = expanID;
            expandoData[expanID] = data;
          }
          return data;
        }

        /**
         * returns a shived element for the given nodeName and document
         * @memberOf html5
         * @param {String} nodeName name of the element
         * @param {Document} ownerDocument The context document.
         * @returns {Object} The shived element.
         */
        function createElement(nodeName, ownerDocument, data){
          if (!ownerDocument) {
            ownerDocument = document;
          }
          if(supportsUnknownElements){
            return ownerDocument.createElement(nodeName);
          }
          if (!data) {
            data = getExpandoData(ownerDocument);
          }
          var node;

          if (data.cache[nodeName]) {
            node = data.cache[nodeName].cloneNode();
          } else if (saveClones.test(nodeName)) {
            node = (data.cache[nodeName] = data.createElem(nodeName)).cloneNode();
          } else {
            node = data.createElem(nodeName);
          }

          // Avoid adding some elements to fragments in IE < 9 because
          // * Attributes like `name` or `type` cannot be set/changed once an element
          //   is inserted into a document/fragment
          // * Link elements with `src` attributes that are inaccessible, as with
          //   a 403 response, will cause the tab/window to crash
          // * Script elements appended to fragments will execute when their `src`
          //   or `text` property is set
          return node.canHaveChildren && !reSkip.test(nodeName) && !node.tagUrn ? data.frag.appendChild(node) : node;
        }

        /**
         * returns a shived DocumentFragment for the given document
         * @memberOf html5
         * @param {Document} ownerDocument The context document.
         * @returns {Object} The shived DocumentFragment.
         */
        function createDocumentFragment(ownerDocument, data){
          if (!ownerDocument) {
            ownerDocument = document;
          }
          if(supportsUnknownElements){
            return ownerDocument.createDocumentFragment();
          }
          data = data || getExpandoData(ownerDocument);
          var clone = data.frag.cloneNode(),
          i = 0,
          elems = getElements(),
          l = elems.length;
          for(;i<l;i++){
            clone.createElement(elems[i]);
          }
          return clone;
        }

        /**
         * Shivs the `createElement` and `createDocumentFragment` methods of the document.
         * @private
         * @param {Document|DocumentFragment} ownerDocument The document.
         * @param {Object} data of the document.
         */
        function shivMethods(ownerDocument, data) {
          if (!data.cache) {
            data.cache = {};
            data.createElem = ownerDocument.createElement;
            data.createFrag = ownerDocument.createDocumentFragment;
            data.frag = data.createFrag();
          }


          ownerDocument.createElement = function(nodeName) {
            //abort shiv
            if (!html5.shivMethods) {
              return data.createElem(nodeName);
            }
            return createElement(nodeName, ownerDocument, data);
          };

          ownerDocument.createDocumentFragment = Function('h,f', 'return function(){' +
                                                          'var n=f.cloneNode(),c=n.createElement;' +
                                                          'h.shivMethods&&(' +
                                                          // unroll the `createElement` calls
                                                          getElements().join().replace(/[\w\-]+/g, function(nodeName) {
            data.createElem(nodeName);
            data.frag.createElement(nodeName);
            return 'c("' + nodeName + '")';
          }) +
            ');return n}'
                                                         )(html5, data.frag);
        }

        /*--------------------------------------------------------------------------*/

        /**
         * Shivs the given document.
         * @memberOf html5
         * @param {Document} ownerDocument The document to shiv.
         * @returns {Document} The shived document.
         */
        function shivDocument(ownerDocument) {
          if (!ownerDocument) {
            ownerDocument = document;
          }
          var data = getExpandoData(ownerDocument);

          if (html5.shivCSS && !supportsHtml5Styles && !data.hasCSS) {
            data.hasCSS = !!addStyleSheet(ownerDocument,
                                          // corrects block display not defined in IE6/7/8/9
                                          'article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}' +
                                            // adds styling not present in IE6/7/8/9
                                            'mark{background:#FF0;color:#000}' +
                                            // hides non-rendered elements
                                            'template{display:none}'
                                         );
          }
          if (!supportsUnknownElements) {
            shivMethods(ownerDocument, data);
          }
          return ownerDocument;
        }

        /*--------------------------------------------------------------------------*/

        /**
         * The `html5` object is exposed so that more elements can be shived and
         * existing shiving can be detected on iframes.
         * @type Object
         * @example
         *
         * // options can be changed before the script is included
         * html5 = { 'elements': 'mark section', 'shivCSS': false, 'shivMethods': false };
         */
        var html5 = {

          /**
           * An array or space separated string of node names of the elements to shiv.
           * @memberOf html5
           * @type Array|String
           */
          'elements': options.elements || 'abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output progress section summary template time video',

          /**
           * current version of html5shiv
           */
          'version': version,

          /**
           * A flag to indicate that the HTML5 style sheet should be inserted.
           * @memberOf html5
           * @type Boolean
           */
          'shivCSS': (options.shivCSS !== false),

          /**
           * Is equal to true if a browser supports creating unknown/HTML5 elements
           * @memberOf html5
           * @type boolean
           */
          'supportsUnknownElements': supportsUnknownElements,

          /**
           * A flag to indicate that the document's `createElement` and `createDocumentFragment`
           * methods should be overwritten.
           * @memberOf html5
           * @type Boolean
           */
          'shivMethods': (options.shivMethods !== false),

          /**
           * A string to describe the type of `html5` object ("default" or "default print").
           * @memberOf html5
           * @type String
           */
          'type': 'default',

          // shivs the document according to the specified `html5` object options
          'shivDocument': shivDocument,

          //creates a shived element
          createElement: createElement,

          //creates a shived documentFragment
          createDocumentFragment: createDocumentFragment
        };

        /*--------------------------------------------------------------------------*/

        // expose html5
        window.html5 = html5;

        // shiv the document
        shivDocument(document);

    }(this, document));
    /*>>shiv*/

    // Assign private properties to the return object with prefix
    Modernizr._version      = version;

    // expose these for the plugin API. Look in the source for how to join() them against your input
    /*>>prefixes*/
    Modernizr._prefixes     = prefixes;
    /*>>prefixes*/
    /*>>domprefixes*/
    Modernizr._domPrefixes  = domPrefixes;
    Modernizr._cssomPrefixes  = cssomPrefixes;
    /*>>domprefixes*/

    /*>>mq*/
    // Modernizr.mq tests a given media query, live against the current state of the window
    // A few important notes:
    //   * If a browser does not support media queries at all (eg. oldIE) the mq() will always return false
    //   * A max-width or orientation query will be evaluated against the current state, which may change later.
    //   * You must specify values. Eg. If you are testing support for the min-width media query use:
    //       Modernizr.mq('(min-width:0)')
    // usage:
    // Modernizr.mq('only screen and (max-width:768)')
    Modernizr.mq            = testMediaQuery;
    /*>>mq*/

    /*>>hasevent*/
    // Modernizr.hasEvent() detects support for a given event, with an optional element to test on
    // Modernizr.hasEvent('gesturestart', elem)
    Modernizr.hasEvent      = isEventSupported;
    /*>>hasevent*/

    /*>>testprop*/
    // Modernizr.testProp() investigates whether a given style property is recognized
    // Note that the property names must be provided in the camelCase variant.
    // Modernizr.testProp('pointerEvents')
    Modernizr.testProp      = function(prop){
        return testProps([prop]);
    };
    /*>>testprop*/

    /*>>testallprops*/
    // Modernizr.testAllProps() investigates whether a given style property,
    //   or any of its vendor-prefixed variants, is recognized
    // Note that the property names must be provided in the camelCase variant.
    // Modernizr.testAllProps('boxSizing')
    Modernizr.testAllProps  = testPropsAll;
    /*>>testallprops*/


    /*>>teststyles*/
    // Modernizr.testStyles() allows you to add custom styles to the document and test an element afterwards
    // Modernizr.testStyles('#modernizr { position:absolute }', function(elem, rule){ ... })
    Modernizr.testStyles    = injectElementWithStyles;
    /*>>teststyles*/


    /*>>prefixed*/
    // Modernizr.prefixed() returns the prefixed or nonprefixed property name variant of your input
    // Modernizr.prefixed('boxSizing') // 'MozBoxSizing'

    // Properties must be passed as dom-style camelcase, rather than `box-sizing` hypentated style.
    // Return values will also be the camelCase variant, if you need to translate that to hypenated style use:
    //
    //     str.replace(/([A-Z])/g, function(str,m1){ return '-' + m1.toLowerCase(); }).replace(/^ms-/,'-ms-');

    // If you're trying to ascertain which transition end event to bind to, you might do something like...
    //
    //     var transEndEventNames = {
    //       'WebkitTransition' : 'webkitTransitionEnd',
    //       'MozTransition'    : 'transitionend',
    //       'OTransition'      : 'oTransitionEnd',
    //       'msTransition'     : 'MSTransitionEnd',
    //       'transition'       : 'transitionend'
    //     },
    //     transEndEventName = transEndEventNames[ Modernizr.prefixed('transition') ];

    Modernizr.prefixed      = function(prop, obj, elem){
      if(!obj) {
        return testPropsAll(prop, 'pfx');
      } else {
        // Testing DOM property e.g. Modernizr.prefixed('requestAnimationFrame', window) // 'mozRequestAnimationFrame'
        return testPropsAll(prop, obj, elem);
      }
    };
    /*>>prefixed*/


    /*>>cssclasses*/
    // Remove "no-js" class from <html> element, if it exists:
    docElement.className = docElement.className.replace(/(^|\s)no-js(\s|$)/, '$1$2') +

                            // Add the new classes to the <html> element.
                            (enableClasses ? ' js ' + classes.join(' ') : '');
    /*>>cssclasses*/

    return Modernizr;

})(this, this.document);

            
    return PlaneUI;
});