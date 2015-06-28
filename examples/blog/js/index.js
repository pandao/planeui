$(function (){
    
    $("#open-menu").bind($.clickOrTouch(), function() {
        $(".blog-menu > .pui-menu, .blog-search").toggleClass("pui-xs-hide");
    });
    
    $(".pui-search-keywords").bind("click touchend keyup", function(){
        $(".pui-search-auto-complete").removeClass("pui-hide");
    });
    
    $(".pui-search-auto-complete").mouseleave(function(){
        $(this).addClass("pui-hide");
    });
    
    var goToTop = $("#go-to-top");

    goToTop.scrollTo(function(target) {
        console.log(this, target);
    });
    
    $("a[href*=\"#\"]").scrollTo();
    
    var headerCon = $('.blog-header-con');
    var blogMain  = $(".blog-main").children(".pui-row").eq(0);
    var blogSide  = $(".blog-side");
    
    $(window).scroll(function(){
        var top = $(window).scrollTop();
        
        if ($(window).height() <= 360) {
            return ;
        }
        
        if(top > 160) {
            headerCon.css({
                position: "fixed",
                top: 0,
                left: 0,
                zIndex: 1000,
                boxShadow : "0 1px 3px rgba(0,0,0,0.3)"
            });
        } else {
            headerCon.css({
                position  : "static",
                boxShadow : "none"
            });            
        }
        
        if (top > 180) {
            goToTop.fadeIn();
        } else {
            goToTop.fadeOut();
        }
    });
    
});