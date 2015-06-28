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