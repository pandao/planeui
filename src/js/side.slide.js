(function ($) {

    $.fn.sideSlide = function(options) {
        var defaults = {
            attr : "pui-side-slide",
            speed : 300,
            mask : false,
            maskFullOpacity: false
        };

        var settings = $.extend(defaults, options);

        $("["+settings.attr+"]").each(function() {

            var $this = $(this);
            var sideName = $this.attr(settings.attr);
            var side = $("."+settings.attr+"-"+sideName);
            var main = $(".pui-app-main"); 
            var appLayout = $(".pui-app-layout");

            $this.bind($.clickOrTouch(), function() {

                if(sideName == "top" || sideName == "bottom") {
                    appLayout.css("overflow-y", "hidden");
                } else {
                    appLayout.css("overflow-x", "hidden");
                }

                if(settings.mask) 
                {
                    var mask = main.find(".pui-mask-bg");

                    if(settings.maskFullOpacity) {
                        mask.css({opacity:0});
                    }

                    mask.fadeToggle(settings.speed);

                    if(!mask.is(":hidden")) 
                    {                        
                        mask.bind($.clickOrTouch(), function() {
                            mask.fadeOut(settings.speed);                            
                            side.hide(); 

                            switch(sideName) 
                            {
                                case "top":    

                                case "bottom":           
                                        main.animate({marginTop : 0}, settings.speed, function(){
                                            appLayout.css("overflow", "auto");
                                        });
                                        break;    

                                case "right":  
                                case "left":
                                    default: 
                                        main.animate({marginLeft : 0}, settings.speed, function(){
                                            appLayout.css("overflow", "auto");
                                        });
                                        break;
                            }

                            return false;
                        });
                    }
                }         

                switch(sideName) 
                {
                    case "top":                                     
                                side.toggle();

                                if(!side.is(":hidden")) {
                                    main.animate({marginTop : side.outerHeight() + "px"}, settings.speed);
                                } else {
                                    main.animate({marginTop : 0}, settings.speed, function(){
                                        appLayout.css("overflow", "auto");
                                    });
                                }
                            break;

                    case "bottom":              

                                if(side.is(":hidden")) {
                                    main.animate({marginTop : "-"+side.outerHeight() + "px"}, settings.speed, function() {
                                        side.show();
                                    });
                                } else {
                                    side.hide();
                                    main.animate({marginTop : 0}, settings.speed, function(){
                                        appLayout.css("overflow", "auto");
                                    });
                                }
                            break;

                    case "right":
                                if(side.is(":hidden")) {
                                    main.animate({marginLeft : "-"+side.outerWidth() + "px"}, settings.speed, function(){
                                        side.show();
                                    });
                                } else {
                                    side.hide(); 
                                    main.animate({marginLeft : 0}, settings.speed, function(){
                                        appLayout.css("overflow", "auto");
                                    });
                                }
                            break;

                    case "left":
                        default:

                                side.toggle();

                                if(!side.is(":hidden")) {
                                    main.animate({marginLeft : side.outerWidth() + "px"}, settings.speed);
                                } else { 
                                    main.animate({marginLeft : 0}, settings.speed, function(){
                                        appLayout.css("overflow", "auto");
                                    });
                                }
                            break;
                }

                return false;
            });
        });
    };

})(PlaneUI);