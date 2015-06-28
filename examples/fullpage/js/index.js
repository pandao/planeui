$(function (){
    
    $("#open-menu").bind($.clickOrTouch(), function() {
        $(".blog-menu > .pui-menu, .blog-search").toggleClass("pui-xs-hide");
    });
    
    $(window).scroll(function(){
        var top = $(window).scrollTop();
        
        if(top > 160) {
            $('.blog-header-con').css({
                position: "fixed",
                top: 0,
                left: 0,
                zIndex: 10000,
                boxShadow : "0 1px 3px rgba(0,0,0,0.3)"
            });
        } else {
            $('.blog-header-con').css({
                position: "static",
                boxShadow : "none"
            });
        }
    });
    
});