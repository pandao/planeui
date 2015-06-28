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