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