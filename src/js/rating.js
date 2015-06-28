(function ($) {

    $.fn.rating = function(options) {

        var defaults = {
            score : 0,
            total : 5,
            titles : "非常差,很差,好,很好,非常好",
            showTotal : true,
            showScore : true,
            ajaxURL : "",
            clickHandler : null,
            clickCallback : new Function
        };

        var settings = $.extend(defaults, options); 

        $(this).each(function() {

            var $this = $(this);

            var score = function(){
                return (typeof($this.attr('score')) == "undefined") ? settings.score : $this.attr('score');
            };  

            var floor         = Math.floor(score());
            var ceil          = Math.ceil(score());
            var total         = $this.attr('total');
            var titles        = $this.attr('titles'); 
            var showTotal     = $this.attr('show-total'); 
            var showScore     = $this.attr('show-score');
            var ajaxURL       = $this.attr('ajax-url');
            var clickCallback = $this.attr('click-callback');

            total  = (typeof(total) == "undefined") ? settings.total : parseInt(total);

            titles = (typeof(titles) == "undefined") ? settings.titles.split(",") : titles.split(",");

            if(typeof(showTotal) == "undefined") showTotal = settings.showTotal;

            if(typeof(showScore) == "undefined") showScore = settings.showScore;

            if(typeof(ajaxURL) == "undefined")   ajaxURL = settings.ajaxURL; 

            if(typeof(clickCallback) == "undefined" || clickCallback == "") 
            {
                clickCallback = settings.clickCallback;
            } 
            else 
            {
                clickCallback = window[clickCallback];
            }

            console.log(total, titles, showTotal, showScore, clickCallback);

            for (var i = 1, length = total + 1; i < length; i++) 
            {
                var className = '';

                if (i <= floor) 
                {
                    className = ' class="full"';                            
                }
                else if (i > score() && i == ceil) 
                {
                    className = ' class="half"';  

                } 
                else if (i > ceil || score() == 0) 
                {
                    className = '';  
                }

                //console.log(i+", "+score()+", "+floor+", "+ceil+", "+total+"<br/>");

                var span = $('<span title="'+titles[i-1]+'" value="'+i+'"'+className+'></span>');

                $this.append(span);
            }

            if(showTotal || showTotal == "true") 
            {
                $this.append('<small>总分：'+total+'分 </small>');
            }                

            if(showScore || showScore == "true") 
            {
                $this.append('<small>平均分：'+score()+'分</small>');
            }

            $this.find("span").bind({
                "mouseenter" : function(event) {

                    var index = $(this).index(); 

                    $this.find("span").each(function(i) { 
                        $(this).removeClass();

                        if (i <= index) {
                            $(this).addClass('full');
                        }

                        //console.log(i, score(), floor, ceil, total, $(this).attr('class'));
                    });                            
                },
                "mouseleave" : function(event) {                            
                    var index = $(this).index(); 

                    $this.find("span").each(function(i) { 
                        i = i + 1;

                        $(this).removeClass();

                        if (i <= Math.floor(score())) 
                        {
                            $(this).addClass('full');                          
                        }
                        else if (i > score() && i == Math.ceil(score())) 
                        {  
                            $(this).addClass("half"); 

                        } 
                    });
                },

                "click" : function() {

                    if(typeof(settings.clickHandler) == "function") {
                        settings.clickHandler($this);

                        return ;
                    }

                    if (ajaxURL == "") {
                        console.error("错误：URL不能为空，Rating评价组件默认通过Ajax执行点击操作。");

                        return ;
                    }

                    var index = $(this).index(); 

                    $.post(ajaxURL, {score : score(), newscore : (index + 1), total : total}, function(data) {

                        $this.attr("score", data).find("small").remove(); 

                        if(showTotal || showTotal == "true") {
                            $this.append('<small>总分：'+total+'分 </small>');
                        }                

                        if(showScore || showScore == "true") {
                            $this.append('<small>平均分：'+data+'分</small>');
                        }

                        $this.find("span").each(function(i) { 
                            i = i + 1;

                            $(this).removeClass();

                            if (i <= Math.floor(data)) 
                            {
                                $(this).addClass('full');                          
                            }
                            else if (i > data && i == Math.ceil(data)) 
                            {  
                                $(this).addClass("half"); 
                            } 
                        });

                        clickCallback($this);

                    });
                }

            });                       
        });

    };

})(PlaneUI);