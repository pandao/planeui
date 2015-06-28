
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