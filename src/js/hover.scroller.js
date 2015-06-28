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