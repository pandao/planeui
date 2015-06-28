(function($) {

    $.fn.scrollTo = function (options) {
           
        options = options || {};
        
        var defaults = {
            speed        : 800,
            direction    : "top",
			top			 : null,
			left         : null,
            targetHash   : true,
            hashEmpty    : true,
            callback     : function() {},
            scrollTarget : "html, body"
        };
        
        var settings = $.extend(defaults, (typeof options === "object") ? options : {});
        
        if (typeof options === "function") {
            settings.callback = options;
        }

		$(this.selector ? this.selector : "[scrollto]").bind($.clickOrTouch(), function() {
        
            var scrollHandler = function($this, target) {

                var direction = {};

				if (settings.top === 0) {
					settings.top = "0px";
				}

				if (settings.left === 0) {
					settings.left = "0px";
				}

				if (!settings.top && !settings.left) {
					if (settings.direction === "left") {
						direction = { scrollLeft : target.offset().left }; 
					} else {
						direction = { scrollTop : target.offset().top };
					}
				}

                if (settings.top) {
                    direction.scrollTop = settings.top;
                }

                if (settings.left) {
                    direction.scrollLeft = settings.left;
                }

                $(settings.scrollTarget).animate(direction, settings.speed, function() {
                    if (settings.hashEmpty && window.addEventListener) { // IE9+
                        location.hash = "";
                    }

                    $.proxy(settings.callback, $this)(target);
                });
            };
            
            if (settings.targetHash)
            {            
                if (location.pathname.replace(/^\//, "") == this.pathname.replace(/^\//, "") && location.hostname == this.hostname) 
                {
                    var hash   = this.hash;
                    var target = $(hash);
                    var $this  = $(this);

                    target     = target.length && target || $("[name=" + hash.slice(1) + "]");

                    if (target.length > 0) 
                    {
                        scrollHandler($(this), target);
                    }
                }
            }
            else
            {
                scrollHandler($(this), settings.scrollTarget);                
            }
            
            return false;
		});
    };
    
})(PlaneUI);