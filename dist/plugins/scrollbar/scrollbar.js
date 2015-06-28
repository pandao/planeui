(function(factory) {
    
    "use strict";
    
	if(typeof exports === "object" && typeof module === "object")
    {
		module.exports = factory(PlaneUI);
    } 
    else if(typeof define === "function" && (define.amd || define.cmd))
    {
        define(["PlaneUI"], factory);
    }
    else
    {
        window.PUI = window.PlaneUI = window.$ = factory(PlaneUI);
    }    
    
})(function(PlaneUI) {
    
    (function($) {

        function scrollbox(options) {

            var defaults = {     
                width        : 8,    
                speed        : 500,   
                direction    : "vertical", // x|horizontal => horizontal, y|vertical => vertical, auto => Auto direction
                animated     : true,
                touchable    : true,
                mousewheel   : true,
                hoverDisplay : true,
                start        : function() {},
                end          : function() {}
            };

            var settings = $.extend(defaults, options || {});
            
            $(this).each(function() {
                this.settings = settings;
                $.proxy(eachHanle, this)();
            });
            
            return this;
        };
        
        $.fn.scrollbox = scrollbox;
        
        function eachHanle() {
   
            var $this    = $(this);            
            var settings = this.settings;
            
            if ($this.find(".pui-scrollbox-scrollbar").length < 1)
            {
                $this.append('<div class="pui-scrollbox-scrollbar"><div class="pui-scrollbox-thumb"></div></div>');
            }
            
            var scrollbar   = $this.find(".pui-scrollbox-scrollbar");
            var thumb       = $this.find(".pui-scrollbox-thumb");
            var container   = $this.find(".pui-scrollbox-container"); 
            
            this.thumb     = thumb;
            this.container = container;
            this.scrollbar = scrollbar;
            this.offsetY   = 0;
            this.offsetX   = 0;            
            this.touchOffset = null;
            
            $.proxy(resize, this)();
            
            $(window).resize($.proxy(resize, this));
            
            var _this = this;
            
            if (settings.hoverDisplay)
            {
                $(this).hover(function() {
                    thumb.stop().fadeIn();
                }, function() {
                    thumb.stop().fadeOut();
                });
            } 
            else
            {
                thumb.fadeIn();
            }

            // 鼠标按下
            thumb.bind({
                "selectstart" : function() {
                    return false;
                },

                "mousedown" : function(e) {
                    e       = e || window.event;  	

                    if (e.preventDefault) {
                        e.preventDefault();
                    } else {                    
                        e.returnValue = false; 
                    }

                    _this.offsetX = e.clientX - parseInt(thumb.css("left"));
                    _this.offsetY = e.clientY - parseInt(thumb.css("top"));
                    
                    document.onmousemove = $.proxy(moveAction, _this);
                }
            });

            document.onmouseup = function() {   
                document.onselectstart = null;         
                document.onmousemove   = null;
            };

            if (settings.mousewheel) // 如果开启鼠标滑轮滚动
            {			
                var mousewheelEvent = (/Firefox/i.test(navigator.userAgent)) ? "DOMMouseScroll" : "mousewheel";
                
                $this.bind(mousewheelEvent, $.proxy(mouseWheelAction, this));
            }
        }
            
        function resize() {
            
            var $this     = $(this);  
            var thumb     = this.thumb;
            var settings  = this.settings;
            var container = this.container;
            var scrollbar = this.scrollbar;  
            
            if (settings.direction === "x" || settings.direction === "horizontal")
            {                
                scrollbar.css({
                    width  : $this.width() + "px",
                    height : settings.width + "px"
                }).css({
                    top    : ($this.height() - scrollbar.height()) + "px"
                });

                var thumbWidth  = $this.width() / container.width() * $this.width();

                thumb.css({
                    width : thumbWidth + "px",
                    height : scrollbar.height() + "px"
                });
            }
            else if (settings.direction === "y" || settings.direction === "vertical")  // 竖向
            {            
                scrollbar.css({
                    height : $this.height(),
                    width  : settings.width + "px"
                });

                var thumbHeight = $this.height() / container.height() * $this.height();

                thumb.css({
                    width  : settings.width + "px",
                    height : thumbHeight + "px"
                }); 
            }
            else
            {
            }
        }
        
        // 鼠标拖动
        function moveAction(e) {
            
            var thumb     = this.thumb;
            var settings  = this.settings;
            var container = this.container;
            var scrollbar = this.scrollbar;  
            var offsetX   = this.offsetX;
            var offsetY   = this.offsetY;

            document.onselectstart = function() {
                return false;
            };

            if (settings.direction === "x" || settings.direction === "horizontal") // 横向
            { 
                var x = e.clientX - offsetX, left = 0;

                if (x + thumb.width() >= scrollbar.width())
                {
                    left = scrollbar.width() - thumb.width();
                    $.proxy(settings.end, this)();
                    document.onmousemove   = null;
                }
                else if (x <= 0)
                {
                    left = 0;
                    $.proxy(settings.start, this)();
                    document.onmousemove   = null;
                }
                else
                {
                    left = x;
                }
                
                $.proxy(scrollLeft, this)(left);
            }			
            else if (settings.direction === "y" || settings.direction === "vertical")  // 竖向
            {
                var clientY = document.all ? e.clientY : e.pageY;                
                var y       = clientY - offsetY, top = 0;

                if (y + thumb.height() >= scrollbar.height()) 
                {
                    top = scrollbar.height() - thumb.height();
                    $.proxy(settings.end, this)();
                    document.onmousemove   = null;
                }
                else if (y <= 0)
                {
                    top = 0;	
                    $.proxy(settings.start, this)();
                    document.onmousemove   = null;		
                }
                else
                {
                    top = y;
                }
                
                $.proxy(scrollTop, this)(top);
            }
            else
            {
            }
        }
            
        function scrollTop(top, mousewheel) {
            
            mousewheel = mousewheel || false;
            
            var thumb     = this.thumb;
            var settings  = this.settings;
            var container = this.container;
            var scrollbar = this.scrollbar;  

            var ratio  = top / scrollbar.height(); //移动比例
            var newTop = Math.floor(container.height() * ratio);

            if (settings.animated)
            {
                container.stop().animate({top : "-" + newTop + "px"}, settings.speed);
                
                if (mousewheel) {
                    thumb.stop().animate({top : top + "px"}, settings.speed);
                } else {
                    thumb.css("top", top);
                }
            }
            else
            {
                thumb.css("top", top);
                container.css("top", "-" + newTop + "px");		
            }            
        }
            
        function scrollLeft(left, mousewheel) { 
            
            mousewheel = mousewheel || false;  
            
            var thumb     = this.thumb;
            var settings  = this.settings;
            var container = this.container;
            var scrollbar = this.scrollbar;  

            var ratio   = left / scrollbar.width(); //移动比例 
            var newLeft = Math.floor(container.width() * ratio);
            
            if (settings.animated)
            {
                container.stop().animate({left : "-" + newLeft + "px"}, settings.speed);
                
                if (mousewheel) {
                    thumb.stop().animate({left : left + "px"}, settings.speed);
                } else {
                    thumb.css("left", left);
                }
            }
            else
            {
                thumb.css("left", left);
                container.css("left", "-" + newLeft + "px");
            }
        }

        // 鼠标滑轮滚动
        function mouseWheelAction(e) { 		
            
            var delta     = e.originalEvent.wheelDelta ? (e.originalEvent.wheelDelta / 120) : (- e.originalEvent.detail / 3);         
            var thumb     = this.thumb;
            var settings  = this.settings;
            var container = this.container;
            var scrollbar = this.scrollbar;
            
            if (settings.hoverDisplay) {
                thumb.show();
            }
            
            if (settings.direction === "x" || settings.direction === "horizontal")  // 横向
            {
                var x = parseInt(thumb.css("left")), left, speed = scrollbar.width() * 0.1223;

                x = (delta < 0) ? x + speed : x - speed; //每步移动距离, 滑动方向 delta，-1向下，1向上

                if (x + thumb.width() >= scrollbar.width())
                {
                    left = scrollbar.width() - thumb.width();
                    $.proxy(settings.end, this)();
                } 
                else if (x <= 0)
                {
                    left = 0;		
                    $.proxy(settings.start, this)();	
                }
                else
                {
                    left = x;
                }
                
                $.proxy(scrollLeft, this)(left, true);
            }   
            else if (settings.direction === "y" || settings.direction === "vertical")  // 竖向
            {
                var y = parseInt(thumb.css("top")), top, speed = scrollbar.height() * 0.1223;

                y = (delta < 0) ? y + speed : y - speed; // 每步移动距离

                if (y + thumb.height() >= scrollbar.height())
                {
                    top = scrollbar.height() - thumb.height();
                    $.proxy(settings.end, this)();
                }
                else if(y <= 0)
                {
                    top = 0;		
                    $.proxy(settings.start, this)();	
                } 
                else
                {
                    top = y;
                }
                
                $.proxy(scrollTop, this)(top, true);
            }
            else
            {
            }
        }

    })(PlaneUI);
    
    return PlaneUI;
});