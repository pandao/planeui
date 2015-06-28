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