(function($){

    $.fn.tooltip = function(options) {

        var defaults = {
            target : "",
            auto : false,
            position : ["bottom", "center"],
            positionClassPrefix : "pui-tooltip-arrow-",
            addClass : "pui-tooltip-bordered pui-tooltip-primary-light",
            cached : false,
            ajax : new Function,
            showMode : "show",
            touch : true,
            content : new Function,
            callback : new Function
        };

        var settings = $.extend(defaults, options);
        var $this    = $(this);

        $this.each(function() { 

            var body     = $("body");
            var _this    = $(this);

            var parseJSON = function() {

                var json   = {};
                var string = _this.attr("pui-tooltip");

                try {
                    json = $.jsonDecode(string);
                } catch(e) {
                    json = eval("("+string+")");
                }

                return json;
            };

            var jsonData = function(key) { 

                return parseJSON()[key];
            };

            var setJSONData = function(key, value) {

                var json = parseJSON();

                json[key] = value;

                _this.attr("pui-tooltip", $.jsonEncode(json));
            };

            var target   = function() {
                return (typeof(jsonData("target")) == "undefined") ? settings.target : jsonData("target");
            };

            var content  = jsonData("content");
            var position = jsonData("position");
            var addClass = jsonData("addClass");
            var cached   = jsonData("cached"); 
            var callback = jsonData("callback"); 
            var showMode = jsonData("showMode");
            var touch    = jsonData("touch");

            if (typeof(content) == "undefined") {
                content = settings.content;
            }

            if (typeof(position) == "undefined") {
                position = settings.position;
            }

            if (typeof(addClass) == "undefined") {
                addClass = settings.addClass;
            } 

            if (typeof(cached) == "undefined") {
                cached = settings.cached;
            }

            if (typeof(callback) == "undefined") {
                callback = settings.callback;
            }

            if (typeof(showMode) == "undefined") {
                showMode = settings.showMode;
            }

            if (typeof(touch) == "undefined") {
                touch = settings.touch;
            }

            //console.log("cached", cached);

            var tooltip, arrowHeight = 12;

            var setTooltipStyle = function(tooltip) {

                var arrow         = "";
                var posX          = position[0];
                var posY          = position[1];
                var _top          = _left = 0; 
                var width         = _this[0].offsetWidth;
                var height        = _this[0].offsetHeight;
                var top           = _this.offset().top;
                var left          = _this.offset().left;

                var tooltipWidth  = tooltip[0].offsetWidth;
                var tooltipHeight = tooltip[0].offsetHeight;                    
                var windowWidth   = (document.all) ? document.getElementsByTagName("html")[0].offsetWidth : window.innerWidth;
                var windowHeight  = (document.all) ? document.getElementsByTagName("html")[0].offsetHeight : window.innerHeight;

                //console.log("windowWidth=>", windowWidth, "windowHeight=>", windowHeight);

                //console.log("tooltip.offsetHeight", _this[0].offsetWidth, tooltip[0].offsetHeight, tooltip.width());

                //console.log(position, "width=>", width, "height=>", height, "tooltip.width=>", tooltipWidth, "tooltip.height=>", tooltipHeight, "top=>", top, "left=>", left, "_top=>",  _top, "_left=>", _left);

                var arrowGetPosition = function(arrow) {
                    var data = {};

                    switch(arrow) {
                        case "tc":
                                data = { 
                                    top  : top  + height + arrowHeight,
                                    left : left + (width - tooltipWidth) / 2,
                                    posX : "bottom",
                                    posY : "center"
                                }
                            break;

                        case "tl":
                                data = {  
                                    top  : top + height + arrowHeight, 
                                    left : left,
                                    posX : "bottom",
                                    posY : "left"
                                }
                            break;

                        case "tr":
                                data = {
                                    top  : top  + height + arrowHeight,  
                                    left : left + width - tooltipWidth,
                                    posX : "bottom",
                                    posY : "right"
                                }
                            break;

                        case "bc":
                                data = {
                                    top  : top  - tooltipHeight - arrowHeight,                        
                                    left : left + (width - tooltipWidth) / 2, 
                                    posX : "top",
                                    posY : "center"
                                }
                            break;

                        case "bl":
                                data = {
                                    top  : top - tooltipHeight - arrowHeight,                       
                                    left : left,
                                    posX : "top",
                                    posY : "left"
                                }
                            break;

                        case "br":
                                data = { 
                                    top  : top  - tooltipHeight - arrowHeight,                        
                                    left : left + width - tooltipWidth,
                                    posX : "top",
                                    posY : "right"
                                }
                            break;

                        case "lc":
                                data = {  
                                    top  : top  + (height - tooltipHeight) / 2,
                                    left : left + (width + arrowHeight), 
                                    posX : "right",
                                    posY : "center"
                                }
                            break;

                        case "lt":
                                data = {   
                                    top  : top,
                                    left : left + (width + arrowHeight),   
                                    posX : "right",
                                    posY : "top"
                                }
                            break;

                        case "lb":
                                data = {      
                                    top  : top  + height - tooltipHeight,
                                    left : left + (width + arrowHeight),
                                    posX : "right",
                                    posY : "bottom"
                                }
                            break;

                        case "rc":
                                data = { 
                                    top  : top  + (height - tooltipHeight) / 2, 
                                    left : left - (tooltipWidth + arrowHeight),
                                    posX : "left",
                                    posY : "center"
                                }
                            break;

                        case "rt":
                                data = {  
                                    top  : top,
                                    left : left - (tooltipWidth + arrowHeight),
                                    posX : "left",
                                    posY : "top"
                                }
                            break;

                        case "rb":
                                data = {   
                                    top  : top  + height - tooltipHeight,
                                    left : left - (tooltipWidth + arrowHeight),
                                    posX : "left",
                                    posY : "bottom"
                                }
                            break;
                    };

                    return data;
                };

                if(posX == "top" && posY == "center") {
                    arrow = "bc";
                }

                if(posX == "top" && posY == "left") {
                    arrow = "bl";
                }

                if(posX == "top" && posY == "right") {
                    arrow = "br";
                }

                if(posX == "bottom" && posY == "center") {
                    arrow = "tc";
                }

                if(posX == "bottom" && posY == "left") {
                    arrow = "tl"; 
                }

                if(posX == "bottom" && posY == "right") {
                    arrow = "tr";
                }

                if(posX == "left" && posY == "center") {
                    arrow = "rc";
                }

                if(posX == "left" && posY == "top") {
                    arrow = "rt";
                }

                if(posX == "left" && posY == "bottom") {
                    arrow = "rb";
                }

                if(posX == "right" && posY == "center") {
                    arrow = "lc";                       
                }

                if(posX == "right" && posY == "top") {
                    arrow = "lt";                      
                }

                if(posX == "right" && posY == "bottom") {
                    arrow = "lb";                        
                }

                _top = arrowGetPosition(arrow).top;
                _left = arrowGetPosition(arrow).left;

                /*var newArrow = "";

                console.log("_top < 0", _top - document.body.scrollTop < 0, _top, document.body.scrollTop);

                console.log("_left < 0", (_left - tooltipWidth) < 0);

                if((_top - document.body.scrollTop) < 0 && (_left - tooltipWidth) < 0) {
                    arrow = "tl";
                }

                if((_top + tooltipHeight)  > windowHeight && (_left - tooltipWidth) < 0) {
                    arrow = "bl";
                }*/


                /*if(_top < 0) {
                    arrow = "tc";
                }

                if(_top + tooltipHeight > windowHeight) {
                    arrow = "bc";
                }

                if(_left < 0) {
                    arrow = "rc";
                }

                if(_left + tooltipWidth > windowWidth) {
                    arrow = "rc";
                }*/

                //_top  = arrowGetPosition(arrow).top;
                //_left = arrowGetPosition(arrow).left;
                //posX  = arrowGetPosition(arrow).posX;
                //posY  = arrowGetPosition(arrow).posY;

                //console.log(position, "width=>", width, "height=>", height, "tooltip.width=>", tooltipWidth, "tooltip.height=>", tooltipHeight, "top=>", top, "left=>", left, "_top=>",  _top, "_left=>", _left);

                // 箭头居中的设置

                var arrowClassName = settings.positionClassPrefix + arrow;

                if (posY == "center") {
                    var head = document.getElementsByTagName("head")[0];
                    var style = document.createElement('style');
                    style.id = tooltip.attr("id") + "-style";

                    var styleText = "";
                    styleText += "#"+tooltip.attr("id") + "." + arrowClassName+":before, ";
                    styleText += "#"+tooltip.attr("id") + "." + arrowClassName+":after";


                    if(posX == "top" && posY == "center") {
                        styleText += "{left:"+((tooltipWidth / 2) - 7)+"px;}";
                    }

                    if(posX == "bottom" && posY == "center") {
                        styleText += "{left:"+((tooltipWidth / 2) - 7)+"px;}";
                    }

                    if(posX == "left" && posY == "center") {
                        styleText += "{top:"+((tooltipHeight / 2) - 7)+"px;}";
                    }

                    if(posX == "right" && posY == "center") {
                        styleText += "{top:"+((tooltipHeight / 2) - 7)+"px;}";
                    }

                    style.innerText = styleText;

                    head.appendChild(style);
                }

                //document.styleSheets[0].addRule('.tooltip-arrow-bc:before, .tooltip-arrow-bc:after', 'top:0;left:0;background:red;');

                tooltip.addClass(arrowClassName)
                       .css({
                            position: "absolute",
                            top : _top,
                            left : _left
                        }); 
            };

            var showAction = function() {

                //console.log("mouseenter", target(), addClass, content, cached, showMode);

                if (typeof(target()) == "undefined" || target() == "") 
                {                            
                    tooltip = $('<div class="pui-tooltip ' + addClass + '"></div>');   
                    tooltip.data("id", "tooltip-" + (new Date()).getTime() );
                    tooltip.attr("id", tooltip.data("id") );

                    if(cached) 
                    {
                        setJSONData("target", "#" + tooltip.data("id") );
                    } 

                    body.append(tooltip);  

                    if(typeof(content) == "function") {

                        content(_this, tooltip, setTooltipStyle); 

                    } else {
                        tooltip.html(content);                        
                        setTooltipStyle(tooltip); 
                    }
                } 
                else 
                {                            
                    tooltip = $(target());  
                    tooltip.removeClass('pui-hide');

                    if(!cached && !tooltip.data("targetStyled")) 
                    {            
                        tooltip.data("targetStyled", true);
                        setTooltipStyle(tooltip);
                    }
                }

                tooltip[ (showMode == "fade") ? "fadeIn" : "show" ]();

            };

            var hideAction = function() {

                tooltip[ (showMode == "fade") ? "fadeOut" : "hide" ](); 

                if (typeof(target()) == "undefined" && !cached || target() == "") 
                {
                    $("#"+tooltip.attr("id") + "-style").remove();
                    tooltip.remove();
                }

                callback(_this, tooltip);
            };

            _this.bind({
                "mouseenter" : showAction,
                "mouseleave" : hideAction
            });

            if(touch) {

                _this.bind({
                    "touchstart" : showAction,
                    "touchend"   : hideAction,
                    "touchcancel": hideAction
                });
            } 

        });
    };

})(PlaneUI);