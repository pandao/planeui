(function($) {    
    $(function(){
        $(".pui-font-sizer > span").bind($.clickOrTouch(), function() {
            var $this = $(this);
            var target = $(this).parent().attr("target");

            $this.each(function(){
                var size = $(this).attr("size");

                if(size == "default") {
                    $(target).removeAttr("style");
                } else {                        
                    $(target).css({
                        fontSize : size
                    });
                }
            });
        });
    });
})(PUI);