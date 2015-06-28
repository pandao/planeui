/**
 * PlaneUI IE9 and lte patch
 */
(function ($) {

    var btnGroupJustify = function() {
        
        $(".pui-btn-group-justify").each(function() {
            
            var $this = $(this);
            var btn   = $this.find('.pui-btn');
            var total = btn.length; 
            btn.css({
                display : "inline-block",
                float : "left"
            }).outerWidth($this.outerWidth() / total);
            
        }).after("<div clas=\"clear\"></div>");
    };

    $(function() {

        if($(".pui-btn-group-justify").length > 0) {
            btnGroupJustify();
            $(window).resize(btnGroupJustify);
        }

    });

})(jQuery);