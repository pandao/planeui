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