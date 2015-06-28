(function ($) {

    var drawed = false;

    $.fn.extend({
        ringProgress : function(options) {
            options = options || {};

            var defaults = {  
                redraw : false,
                sector : false,
                ringColor : '#30C4E9',
                ringWidth : 6,
                bgColor : '#fff',
                textColor : '#666',
                textFontSize : '16px',
                textFontFamily : 'Arial',
                textAlign : 'center',
                textBaseline : 'middle',
                zero : false
            }; 

            // 设置优先级：HTML属性设置 > jQuery插件设置 > 默认值
            var settings = $.extend(defaults, options);

            var _this = this;

            this.settings = settings;
            this.test = function(){alert('test')};   

            this.each(function(i) {  
                var $this = $(this);
                var canvas = this;
                var text = $this.text();
                var progress  = parseInt(text);
                var context = canvas.getContext('2d'); 

                var width = canvas.width;
                var height = canvas.height;

                if(window.devicePixelRatio > 1 && settings.redraw) {                                
                    width /= 2;
                    height /= 2;
                }

                var radius = width / 2;

                if(settings.zero) {
                    progress = 1;
                    text = "0%";
                }

                var sector = $this.attr('sector');
                var ringColor = $this.attr('ring-color');
                var ringWidth = $this.attr('ring-width');
                var bgColor = $this.attr('bg-color');
                var textColor = $this.attr('text-color');
                var textFontSize = $this.attr('text-font-size');
                var textFontFamily = $this.attr('text-font-family');
                var textAlign = $this.attr('text-align');
                var textBaseline = $this.attr('text-baseline'); 

                if (typeof(sector) == 'undefined' || sector == '') {
                    this.sector = sector = settings.sector;
                }

                if (typeof(ringColor) == 'undefined' || ringColor == '') {
                    this.ringColor = ringColor = settings.ringColor;
                }

                if (typeof(ringWidth) == 'undefined' || ringWidth == '') {
                    this.ringWidth = ringWidth = settings.ringWidth;
                }

                if (typeof(bgColor) == 'undefined' || bgColor == '') {
                    this.bgColor = bgColor = settings.bgColor;
                }

                if (typeof(textColor) == 'undefined' || textColor == '') {
                    this.textColor = textColor = settings.textColor;
                }

                if (typeof(textFontSize) == 'undefined' || textFontSize == '') {
                    this.textFontSize = textFontSize = settings.textFontSize;
                }

                if (typeof(textFontFamily) == 'undefined' || textFontFamily == '') {
                    this.textFontFamily = textFontFamily = settings.textFontFamily;
                }

                if (typeof(textAlign) == 'undefined' || textAlign == '') {
                    this.textAlign = textAlign = settings.textAlign;
                }

                if (typeof(textBaseline) == 'undefined' || textBaseline == '') {
                    this.textBaseline = textBaseline = settings.textBaseline;
                }

                if(progress >= 100) {
                    progress = 99.9999;
                }
                else if(progress < 1) {
                    progress = 1; 
                } 

                //console.log(width, height, bgColor, ringColor);

                (function (canvas, context) {
                    if(settings.redraw)  {    
                        return ;  
                    }
                    var devicePixelRatio = window.devicePixelRatio || 1;
                    var backingStorePixelRatio = context.webkitBackingStorePixelRatio ||
                                                 context.mozBackingStorePixelRatio ||
                                                 context.msBackingStorePixelRatio ||
                                                 context.oBackingStorePixelRatio ||
                                                 context.backingStorePixelRatio || 1;

                    var ratio = devicePixelRatio / backingStorePixelRatio;

                    if (ratio > 1) { 
                        canvas.style.height = canvas.height + 'px';
                        canvas.style.width = canvas.width + 'px';
                        canvas.width *= ratio;
                        canvas.height *= ratio; 
                        context.scale(ratio, ratio); 
                    }
                })(canvas, context); 

                //console.log(window.devicePixelRatio+', '+canvas.width +', '+ canvas.height+', '+width+', '+height);    

                // 画底圆
                context.clearRect(0, 0, width, height);
                context.beginPath();
                context.moveTo(width / 2, height / 2);
                context.arc(width / 2, height / 2, radius, 0, Math.PI * 2, false); 
                context.closePath(); 
                context.fillStyle = bgColor;  
                context.fill();

                // 直接画圆环
                //context.strokeStyle="#333";
                //context.lineWidth= 5;  // 线宽
                //context.arc(width / 2, height / 2, radius - (5/2) , 0, Math.PI * 2, false); 
                //context.stroke();

                // 画扇形(进度)  
                context.beginPath();
                context.moveTo(width / 2, height / 2);

                //整个圆为2PI，360 -> 1.5PI, 90 -> 0PI, 180 -> 0.5PI, 270 -> 1PI 
                // arc(x,y, 半径, 开始角度,结束角度, 顺时或逆时针)
                var endAngle = Math.PI * (2 * (progress / 100)) - (Math.PI * 0.5);
                context.arc(width / 2, height / 2, radius, Math.PI * 1.5, endAngle, false); 
                context.closePath(); 
                context.fillStyle = ringColor;  
                context.fill(); 

                // 画内部空白  
                if(sector === 'false' || !sector) {
                    context.beginPath();  
                    context.moveTo(width / 2, height / 2); 
                    context.arc(width / 2, height / 2, radius - ringWidth, 0, Math.PI * 2, true);  
                    context.closePath();  
                    context.fillStyle = '#fff';  
                    context.fill();
                }

                // 文字
                context.font = textFontSize + " " +textFontFamily;  
                context.fillStyle = textColor;  
                context.textAlign = textAlign;  
                context.textBaseline = textBaseline;  
                context.moveTo(width / 2, height / 2);
                context.fillText(text, width / 2, height / 2);
            });  

            return this;
        },

        ringProgressAnimation : function(options, options2) {
            var defaults = {
                start : 0,
                end : 100,
                speed : 1000
            };

            var defaults2 = {
                redraw : true
            };

            var settings = $.extend(defaults, options); 
            var settings2 = $.extend(defaults2, options2); 
            var _this = this;

            var timer = setInterval(function() {
                settings.start ++;

                $(_this).html(settings.start + "%").ringProgress(settings2);

                if(settings.start >= settings.end) clearInterval(timer);
            }, settings.speed);

            return this;
        }
    });

})(PlaneUI);