(function ($) {

    $(function() { 
        $('.pui-button-sheets-more').each(function() {
            var $this = $(this);

            $this.bind($.clickOrTouch(), function() {
                var parent = $this.parent();
                var parentNext = parent.next();
                var moreHeight = parent.parent().attr('pui-button-sheets-show-more-height'); 
                parent.parent().height(moreHeight);
                parentNext.fadeIn(1000); 

                var alternate = parentNext.find('a').eq(0);
                parentNext.append('<a href="javascript:;"></a>');
                parent.append(alternate);
                $this.remove();
            });
        });
    }); 

})(PlaneUI);