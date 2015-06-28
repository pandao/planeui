(function($) {
    
    $(function() {   
        var subMenuClass = ".pui-sub-menu";

        $(".pui-menu-accordion.click-toggle > li > a").bind($.clickOrTouch(), function() {
            $(this).parent().toggleClass("submenu-open").children(subMenuClass).slideToggle();
        });

        $(".pui-menu-accordion.click > li > a").bind($.clickOrTouch(), function() {
            var li = $(this).parent();
            
            if (!li.hasClass("submenu-open")) {
                li.parent().find("li").removeClass("submenu-open").find(subMenuClass).slideUp();
                li.toggleClass("submenu-open").children(subMenuClass).slideDown();
            }
        });
    });
    
})(PUI);