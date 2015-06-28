
(function(window, $) {

	var PlaneUI = PUI = $;

    PlaneUI.extend({
        version : "0.1.0",

        homePage : "https://github.com/pandao/planeui",        

        dialogIndex : 1000,

        getPixelRatio : function(context) {

            var backingStore = context.backingStorePixelRatio ||
                         context.webkitBackingStorePixelRatio ||
                            context.mozBackingStorePixelRatio ||
                             context.msBackingStorePixelRatio ||
                              context.oBackingStorePixelRatio ||
                               context.backingStorePixelRatio || 1;

            return (window.devicePixelRatio || 1) / backingStore;
        },

        mouseOrTouch : function(mouseType, touchType) {
            mouseType = mouseType || "click";
            touchType = touchType || "touchend";

            var eventType = mouseType;

            try {
                document.createEvent("TouchEvent");
                eventType = touchType;
            } 
            catch(e) {} 

            return eventType;
        },

        clickOrTouch : function(touchType) {
            return this.mouseOrTouch("click", touchType);
        },

        contextMenuOrTouch : function() {
            return this.mouseOrTouch("contextmenu", "touchend");
        },

        jsonEncode : function(json) {
            return JSON.stringify(json);
        },

        jsonDecode : function(json) {
            return JSON.parse(json);
        },

        support : {
            touchEvent : function() {
                try {
                    document.createEvent("TouchEvent");
                    
                    return true;                    
                } catch(e) {                    
                    return false;
                }                 
            },

            canvas : function() {                
                try { 
                    document.createElement('canvas').getContext('2d'); 
                    
                    return true;
                    
                } catch(e) {
                    return false;
                }
            },

            worker : function() {
                return (typeof(Worker) == "undefined") ? false : true;
            },
            
            placeholder : function() {
                return ('placeholder' in document.createElement('input'));
            }
        },
        
        responsive : {
            xs : function() {
                return ($(window).width() < 640);
            },
            sm : function() {
                return ($(window).width() >= 640 && $(window).width() < 768);
            },
            md : function() {
                return ($(window).width() >= 768 && $(window).width() < 992);
            },
            lg : function() {
                return ($(window).width() >= 992 && $(window).width() < 1200);
            },
            xl : function() {
                return ($(window).width() >= 1200 && $(window).width() < 1400);
            },
            xxl : function() {
                return ($(window).width() >= 1400);
            }
        }
    });

    window.PUI = window.PlaneUI = window.$ = PlaneUI;

    $(function() { 
        $("*").bind("touchstart", function(e) {
            $(this).addClass("hover");
        }).bind("touchcancel touchend", function() {
            $(this).removeClass("hover");
        });

        $("a").click(function() {
            $(this).blur();
        });
    });

})(window, jQuery);
