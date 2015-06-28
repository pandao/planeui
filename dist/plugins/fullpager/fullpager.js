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
    
    // Supported IE8+
    
    (function($) {
                
        var $index = 0;
        var settings, pageGroup, pageNav, pageNavItems, pages;
        var activedClass;

        var mousewheelEvent = (/Firefox/i.test(navigator.userAgent)) ? "DOMMouseScroll" : "mousewheel";
        
        function inlinePagesHanler() {
            
            var lineIndex      = 0;
            var $inlinePages   = $(this);
            var inlineWrapper  = $inlinePages.find(".pui-full-page-inline-list");
            var inlineList     = inlineWrapper.find(".pui-full-page-inline");
            var inlineTotal    = inlineList.length;
            var inlineNav      = $inlinePages.find(".pui-full-page-inline-nav");
            var inlineNavItems = inlineNav.find('.pui-full-page-nav-item');
            var prevCustomBtn  = $inlinePages.find("[pui-full-page-inline-prev]");
            var nextCustomBtn  = $inlinePages.find("[pui-full-page-inline-next]"); 
            var prevBtn        = $inlinePages.find(".pui-full-page-inline-prev-btn");
            var nextBtn        = $inlinePages.find(".pui-full-page-inline-next-btn");  
            
            this.count = function() {
                return inlineTotal;
            };

            var inlineWrapperSlide = function() {

                inlineNavItems.eq(lineIndex).addClass(activedClass).siblings().removeClass(activedClass);

                inlineWrapper.stop().animate({ marginLeft : -lineIndex * $(window).width() + "px"});
            };  

            var inlinePageResize = function() {
                var windowWidth  = $(window).width();
                var windowHeight = $(window).height();

                inlineList.width(windowWidth);

                inlineWrapper.width((windowWidth * inlineTotal) + 50);
                inlineWrapper.stop().css("margin-left", -lineIndex * $(window).width() + "px");
                
                prevBtn.css("top", (windowHeight - prevBtn.height()) / 2 + "px");
                nextBtn.css("top", (windowHeight - nextBtn.height()) / 2 + "px");
            };
            
            inlineNavItems.bind($.clickOrTouch(), function() {
                lineIndex = $(this).index();
                
                inlineWrapperSlide();
            });
            
            var prevInlinePage = function() {

                lineIndex = (lineIndex > 0) ? lineIndex - 1 : inlineTotal - 1;
                
                $.proxy(settings.inlinePrev, inlineWrapper)(lineIndex); 

                inlineWrapperSlide();
            };
            
            var nextInlinePage = function() {
                lineIndex = (lineIndex < inlineTotal - 1) ? lineIndex + 1 : 0;
                
                $.proxy(settings.inlineNext, inlineWrapper)(lineIndex); 

                inlineWrapperSlide();
            };

            prevBtn.bind($.clickOrTouch(), prevInlinePage);
            nextBtn.bind($.clickOrTouch(), nextInlinePage);
            prevCustomBtn.bind($.clickOrTouch(), prevInlinePage);
            nextCustomBtn.bind($.clickOrTouch(), nextInlinePage);

            inlinePageResize();
            $(window).resize(inlinePageResize);

            console.log("in-viewport =>", inlineWrapper.is(":in-viewport"));

            $(window).keyup(function(event) {

                if (!inlineWrapper.is(":in-viewport") || !settings.keyboard) {
                    return ;
                }

                if (lineIndex < inlineTotal - 1 && event.keyCode == 39) { // right
                    lineIndex += 1;
                    $.proxy(settings.inlinePrev, inlineWrapper)(lineIndex); 
                }

                if (lineIndex > 0 && event.keyCode == 37) { // left
                    lineIndex -= 1;
                    $.proxy(settings.inlineNext, inlineWrapper)(lineIndex); 
                }

                inlineWrapperSlide();
            });
                
            if (document.addEventListener && settings.touchable) {
                var startX = 0;
                var inlineIndexChanged = false;

                var $inlineWrapper = inlineWrapper[0];

                var inlineWrapperTouchStart = function(event){

                    var touch = event.touches[0];
                    var x     = Number(touch.pageX);
                    startX    = x;    

                    $inlineWrapper.removeEventListener("touchstart", inlineWrapperTouchStart, false);
                    $inlineWrapper.addEventListener("touchmove", inlineWrapperTouchMove, false);
                    $inlineWrapper.addEventListener("touchend", inlineWrapperTouchEnd, false); 
                };

                var inlineWrapperTouchMove = function(event) {

                    var touch = event.touches[0];
                    var x     = Number(touch.pageX); 
                    var total = inlineList.length;  

                    if (x - startX != 0)
                    {
                        if (x - startX < -60)
                        {
                            if (lineIndex < total - 1 && !inlineIndexChanged) {
                                inlineIndexChanged = true;
                                lineIndex +=1; 
                                $.proxy(settings.inlinePrev, $inlineWrapper)(lineIndex); 
                            }
                        }                            
                        else if (x - startX > 60 && !inlineIndexChanged)
                        {
                            if (lineIndex > 0) {
                                inlineIndexChanged = true;
                                lineIndex -=1;   
                                $.proxy(settings.inlineNext, $inlineWrapper)(lineIndex); 
                            }
                        } 

                        inlineWrapperSlide();
                    }
                };

                var inlineWrapperTouchEnd = function(event) {
                    startX = 0;
                    inlineIndexChanged = false;
                    $inlineWrapper.removeEventListener("touchmove", inlineWrapperTouchMove, false);
                    $inlineWrapper.removeEventListener("touchend", inlineWrapperTouchMove, false);
                    $inlineWrapper.addEventListener("touchstart", inlineWrapperTouchStart, false);
                };

                $inlineWrapper.addEventListener("touchstart", inlineWrapperTouchStart, false);
            } 
            
            return this;
        }
        
        function keyUpHandler() {
            if (!settings.keyboard) {
                return ;
            }
            
            var pages   = $(this);
            var keyCode = event.keyCode;
            var total   = pages.length;

            if ($index < total - 1 && keyCode == 40) { // down
                $index += 1;
                $.proxy(settings.prev, pageGroup)($index);  
            }
            else if ($index > 0 && keyCode == 38) { //up
                $index -= 1;
                $.proxy(settings.next, pageGroup)($index);  
            }
            
            pageGroupSlide();
        }
        
        function pageGroupSlide() {

            pageGroup.stop().animate({
                scrollTop : $(window).height() * $index
            }, 800); 
            
            pageNavActived();
            navbarActived();
        }
        
        function pageNavActived() {
            pageNavItems.eq($index).addClass(activedClass).siblings().removeClass(activedClass);
        }
        
        function navbarActived() {    
            
            if (settings.navbar || settings.navbar !== "") 
            {
                if (typeof settings.navbar === "object")
                {                    
                    $(settings.navbar[0]).removeClass(settings.activedClass);
                    $(settings.navbar[0]).eq($index).addClass(settings.activedClass);
                }
            }
        }
        
        function mouseWheelHandler(event) {
            if (!settings.mouseWheel) {
                return ;
            }
            
            var delta = 0;	
            var event = window.event || event;
            var delta = (event.detail) ?  -event.detail / 3 : event.wheelDelta / 120;

            if (event.preventDefault) {
                event.preventDefault();
            } else {                    
                event.returnValue = false; 
            }

            //console.log(delta, (delta > 0) ? "up" : "down");

            var total         = pages.length;

            if ($index < total - 1 && delta < 0) { // down
                $index += 1;
                $.proxy(settings.prev, pageGroup)($index);  
            }

            if ($index > 0 && delta > 0) { //up
                $index -= 1;
                $.proxy(settings.next, pageGroup)($index);  
            }

            pageGroupSlide();

            return false;
        }
        
        function touchSlide() {

            var startY = 0, indexChanged = false;
            
            var $group = pageGroup[0];

            var touchStartHandler = function(event) {

                var touch = event.touches[0]; 
                var y     = Number(touch.pageY); 
                startY    = y;  

                $group.removeEventListener("touchstart", touchStartHandler, false);
                $group.addEventListener("touchmove", touchMoveHandler, false);
                $group.addEventListener("touchend", touchEndHandler, false); 
            };

            var touchMoveHandler = function(event) { 

                var touch = event.touches[0]; 
                var y     = Number(touch.pageY);
                var total = pages.length; 

                if (y - startY !== 0)
                {
                    if (y - startY < -60)
                    {
                        if ($index < total - 1 && !indexChanged) {
                            indexChanged = true;
                            $index += 1; 
                            $.proxy(settings.prev, $group)($index);  
                        }
                    }                            
                    else if (y - startY > 60 && !indexChanged)
                    {
                        if($index > 0) {
                            indexChanged = true;
                            $index -= 1; 
                            $.proxy(settings.next, $group)($index);  
                        }
                    }

                    pageGroupSlide();
                }
            };

            var touchEndHandler = function(event) {
                startY       = 0;
                indexChanged = false;
                
                $group.removeEventListener("touchmove", touchMoveHandler, false);
                $group.removeEventListener("touchend", touchMoveHandler, false);
                $group.addEventListener("touchstart", touchStartHandler, false);
            };

            //var fullPageGroup = $(".pui-full-page-group")[0];
            $group.addEventListener("touchstart", touchStartHandler, false);
        }
        
        function prevPage() {

            $index = ($index > 0) ? $index - 1 : pages.length - 1;

            $.proxy(settings.prev, pageGroup)($index); 

            pageGroupSlide();
        }
        
        function nextPage() {
            $index = ($index < pages.length - 1) ? $index + 1 : 0;

            $.proxy(settings.next, pageGroup)($index); 

            pageGroupSlide();
        }
        
        function fullPager(options) {
            options      = options || {};
            
            var defaults = {
                nav          : true,
                inlineNav    : true,
                touchable    : true,
                keyboard     : true,
                mouseWheel   : true,
                navbar       : null,
                next         : function() {},
                prev         : function() {},
                inlineNext   : function() {},
                inlinePrev   : function() {},
                activedClass : "active"
            };
            
            settings          = $.extend(defaults, options);

            var selector      = (this.selector) ? this.selector : ".full-page-group";  
            
            pageGroup         = $(selector).eq(0);
            pageNav           = pageGroup.find(".pui-full-page-nav");
            pages             = pageGroup.find(".pui-full-page");
            pageNavItems      = pageNav.find('.pui-full-page-nav-item');            
            activedClass      = settings.activedClass;
            
            var inlinePages   = pageGroup.find(".pui-full-inline-pages");
            var prevBtn       = pageGroup.find("[pui-full-page-prev]");
            var nextBtn       = pageGroup.find("[pui-full-page-next]");
            
            var resize = function() {
                var windowWidth  = $(window).width();
                var windowHeight = $(window).height();

                pageNav.css("top", (windowHeight - pageNav.height()) / 2 + "px");
            };
            
            inlinePages.each(function() {
                $.proxy(inlinePagesHanler, this)();
            });
                
            resize();

            $(window).resize(resize).keyup($.proxy(keyUpHandler, pages));
            
            pageGroup.bind(mousewheelEvent, function() {
                mouseWheelHandler();
            });
            
            if (settings.navbar || settings.navbar !== "") 
            {
                if (typeof settings.navbar === "object")
                {
                    $(settings.navbar[0]).bind($.clickOrTouch(), function(){                    
                        $index   = $(this).index();

                        pageGroupSlide();
                        
                        $.proxy(settings.navbar[1], this)($index);
                    });
                }
            }
            
            if (settings.touchable) {
                $("body").bind("touchmove", function(event) {
                    event.preventDefault();
                });
            
                if (document.addEventListener) {
                    touchSlide();
                }
            }

            prevBtn.bind($.clickOrTouch(), prevPage);
            nextBtn.bind($.clickOrTouch(), nextPage);
            
            pageNavItems.bind($.clickOrTouch(), function() {
                $index = $(this).index();
                pageGroupSlide();
            });
            
            this.prev = prevPage;
            this.next = nextPage;
            
            this.settings = function() {
                return settings;
            };

            this.index = function() {
                return $index;
            };

            this.pages = function() {
                return pages;
            };

            this.count = function() {
                return pages.length;
            };
            
            this.inlinePages = function() {
                return inlinePages;
            };
            
            return this;
        };
        
        $.fn.fullPager = fullPager;
        
    })(PlaneUI);
            
    return PlaneUI;
});