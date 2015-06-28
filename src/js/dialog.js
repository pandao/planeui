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