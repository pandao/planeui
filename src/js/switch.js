(function($) { 

    $(function() {

        $("pui-switch").each(function() {

            var $this  = $(this);
            var values = $this.attr('value').split(','); 

            try 
            {
                var texts = $this.attr('text').split(',');
            } 
            catch(e)
            {
                alert("致命错误：请设置switch组件的text属性。");

                return false;
            } 

            var switched  = $this.attr('switched');
            var name      = $this.attr('name');
            var elements  = "", switchedValue;
            var innerHTML = $this.html(); 

            $this.html(''); 

            if(typeof(switched) == "undefined") 
            {
                switched = values[0];
            }

            for (var i = 0, len = values.length; i < len; i++) 
            {
                var isSwitched = (switched == values[i]) ? ' class="switched"' : ''; 

                if(switched == values[i]) switchedValue = values[i];

                elements += '<span value="'+values[i]+'"'+isSwitched+'>'+texts[i]+'</span>';
            }                        

            $this.append('<switches>'+elements+'</switches>');
            $this.append('<input type="hidden" name="'+name+'" value="'+switchedValue+'" />'); 

            if(innerHTML != '') 
            {
                $this.append(innerHTML); 
            }

            var item  = $this.find('switches > span'); 
            var input = $this.find('input');

            if($this.attr('disabled') != 'disabled') 
            {   
                item.bind($.clickOrTouch(), function() {

                    $(this).addClass('switched').siblings().removeClass('switched');                    
                    input.val($(this).attr('value'));
                });
            }

        });  
    });

})(PlaneUI);