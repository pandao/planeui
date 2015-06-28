(function($) { 

    $(function() {

        $('pui-switch-slide').each(function() {
            var $this    = $(this);
            var width    = $this.attr('width');
            var name     = $this.attr('name');
            var color    = $this.attr('color');
            var onColor  = $this.attr('on-color');
            var offColor = $this.attr('off-color');
            var btn      = $(this).find("span");
            var animated = $this.attr('animated');                        
            var value    = (btn.attr("class") == 'off') ? 0 : 1;
            var input    = $('<input type="hidden" name="'+name+'" value="'+value+'" />');

            $this.append(input);

            if(typeof(width) != 'undefined') 
            {
                $this.width(width);
            }

            if(typeof(color) != 'undefined') 
            {
                $this.css({
                    backgroundColor : color,
                    color : color
                });
            }

            var btnClassName = btn.attr("class");

            if((btnClassName != 'off') && typeof(onColor) != 'undefined') 
            {
                $this.css({
                    backgroundColor : onColor,
                    color : onColor
                });
            }

            if((btnClassName == 'off') && typeof(offColor) != 'undefined') 
            {
                $this.css({
                    backgroundColor : offColor,
                    color : offColor
                });
            }   

            $this.bind($.clickOrTouch(), function() { 

                if($this.attr('disabled') == 'disabled') return ; 

                if(typeof(animated) != 'undefined' && animated == 'true') 
                {
                    $this.addClass('pui-switch-slide-animation');
                }

                btn.toggleClass('off');  

                if((btn.attr("class") == 'off') && typeof(offColor) != 'undefined') 
                {
                    $this.css({
                        backgroundColor : offColor,
                        color : offColor
                    });
                } 
                else 
                {
                    $this.css({
                        backgroundColor : onColor,
                        color : onColor
                    });
                }

                $(this).find("input").val( (btn.attr("class") == 'off') ? "0" : "1" );  

                var change = btn.attr("change");
                btn.attr("change", btn.html());
                btn.html(change);  

                return false;
            });
        }); 
    });

})(PlaneUI);