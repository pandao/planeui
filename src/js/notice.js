(function ($) {

    $(function() {

        $(".pui-notice").each(function() {
            var timeout = $(this).attr("notice-timeout");
            var closeBtn = $(this).find(".pui-close");  

            if(typeof timeout !== "undefined") {
                timeout  = parseInt(timeout);

                var timer = setTimeout(function(){
                    closeBtn.trigger($.clickOrTouch());
                    clearTimeout(timer);
                }, timeout);
            }

            closeBtn.bind($.clickOrTouch(), function() {   
                $(this).parent().css({minHeight: 0}).slideUp(500, function() {
                    $(this).remove();
                });
            });
        });
    }); 

})(PlaneUI);