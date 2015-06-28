(function ($) {

    $.formValidatorImageFormats = ['jpg', 'jpeg', 'png', 'gif', 'webp'];

    $.formValidatorRules = {
        username : /^[a-zA-Z]\w{4,15}$/,
        password : /^[a-zA-Z][a-zA-Z0-9\.\-\_]{5,15}$/,
        enName : /^[a-zA-Z]{2,}$/,
        uppercase : /^[A-Z]+$/,
        lowercase : /^[a-z]+$/,
        chinese : /^[\u4e00-\u9fa5]+$/,
        email : /^[0-9a-z][_.0-9a-z-]{0,31}@([0-9a-z][0-9a-z-]{0,30}[0-9a-z]\.){1,3}[a-z]{2,4}$/,
        tel : /^\d{3}-\d{8}|\d{4}-\d{7,8}$/,
        telExt : /^\d{3}-\d{8}|\d{4}-\d{7,8}-?\d+?$/,
        mobile : /^1(30|31|32|33|34|35|36|37|38|39|45|47|50|51|52|53|55|56|57|58|59|76|77|78|80|81|82|83|84|85|86|87|88|89)\d{8}$/,
        mobileI18n : /^(\+86)1(30|31|32|33|34|35|36|37|38|39|45|47|50|51|52|53|55|56|57|58|59|76|77|78|80|81|82|83|84|85|86|87|88|89)\d{8}$/,
        zipcode : /^[1-9]\d{5}$/, 
        qq : /^[1-9]\\d{4,10}$/,
        domain : /^([a-zA-Z0-9\-]+)\.([a-zA-Z0-9\-]+)\.(com|net|cn|jp|tw|hk|edu|biz|gov|org|info|asia|mobi|co|cc|tt|me|tv|name|de)\.?(cn|hk|tw|jp)?$/,
        url : /^(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?$/,
        ipv4 : /^((?:(?:25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(?:25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d))))$/,
        idcard : /^\d{17}([0-9]|X)$/,
        idcard1518 : /(^\d{15}$)|(^\d{17}([0-9]|X)$)/,
        integer : /^\d+$/,  // 0+，正整数
        number : function(value) {
            return !isNaN(value);
        },
        image : function(value){
            return ($.inArray(value, $.formValidatorImageFormats) >= 0);
        }
    };

    $.formValidatorRules.fax             = $.formValidatorRules.telExt;
    $.formValidatorRules.confirmPassword = $.formValidatorRules.password;

    $.formValidatorIcons = {
        error : '<i class="fa fa-close"></i>',
        success : '<i class="fa fa-check-circle"></i>'
    };

    $.formValidatorRuleMessages = {
        username : {
            normal : '* 用户名必须以英文字母开头的英文字母、数字或下划线的5-16位组合。',
            empty : $.formValidatorIcons.error + ' 错误：用户名不能为空。',
            error : $.formValidatorIcons.error + ' 错误：用户名必须以英文字母开头的英文字母、数字或下划线的5-16位组合。',
        },
        password : {
            normal : '* 密码由5-16位以英文字母开头的英文字母、数字、小数点、横线或下划线的组成。',
            empty : $.formValidatorIcons.error + ' 错误：密码不能为空。',
            error : $.formValidatorIcons.error + ' 错误：密码由5-16位以英文字母开头的英文字母、数字、小数点、横线或下划线的组成。',
        },            
        confirmPassword : {
            normal : "* 再次填写刚刚输入的密码，以便确认密码。",
            empty : $.formValidatorIcons.error + ' 错误：确认密码不能为空。',
            error : $.formValidatorIcons.error + ' 错误：两次输入的密码不一致或密码不正确。'
        },
        enName : {
            normal : "* 请填写英文名字。",
            empty : $.formValidatorIcons.error + ' 错误：英文名字不能为空。',
            error : $.formValidatorIcons.error + ' 错误：请填写正确的英文名字。'
        },
        uppercase : {
            normal : "* 请填写大写的英文字母。", 
            error : $.formValidatorIcons.error + ' 错误：请填写大写的英文字母。'
        },
        lowercase : {
            normal : "* 请填写小写的英文字母。", 
            error : $.formValidatorIcons.error + ' 错误：请填写小写的英文字母。'
        },
        chinese : {
            normal : "* 请填写中文字符。",
            error : $.formValidatorIcons.error + ' 错误：只能填写中文字符。'
        },
        email : {
            normal : "* 请填写邮箱地址。",
            empty : $.formValidatorIcons.error + ' 错误：邮箱地址不能为空。',
            error : $.formValidatorIcons.error + ' 错误：请填写正确的邮箱地址。'
        },
        tel : {
            normal : "* 格式：区号-固定电话号码。",
            empty : $.formValidatorIcons.error + ' 错误：固定电话号码不能为空。',
            error : $.formValidatorIcons.error + ' 错误：请填写正确的固定电话号码。'
        },
        telExt : {
            normal : "* 格式：区号-固定电话号码、区号-固定电话号码-分机号。",
            empty : $.formValidatorIcons.error + ' 错误：固定电话号码不能为空。',
            error : $.formValidatorIcons.error + ' 错误：请填写正确的固定电话号码。'
        },
        fax : {
            normal : "* 格式：区号-固定电话号码、区号-固定电话号码-分机号。",
            empty : $.formValidatorIcons.error + ' 错误：传真号码不能为空。',
            error : $.formValidatorIcons.error + ' 错误：请填写正确的传真号码。'
        },
        moblie : {
            empty : $.formValidatorIcons.error + ' 错误：手机号码不能为空。',
            error : $.formValidatorIcons.error + ' 错误：请填写正确的手机号码。'
        },
        moblieI18n : {
            normal : '* 格式：+86手机号码',
            empty : $.formValidatorIcons.error + ' 错误：手机号码不能为空。',
            error : $.formValidatorIcons.error + ' 错误：请填写正确的手机号码，格式：+86手机号码。'
        },
        zipcode : {
            empty : $.formValidatorIcons.error + ' 错误：邮政编码不能为空。',
            error : $.formValidatorIcons.error + ' 错误：请填写正确的邮政编码。'
        },
        qq : {
            empty : $.formValidatorIcons.error + ' 错误：QQ号码不能为空。',
            error : $.formValidatorIcons.error + ' 错误：请填写正确的QQ号码（5-10位数字）。'
        },
        domain : {
            normal : '* 格式：www.xxx.com | xxx.xxx.com 。',
            empty : $.formValidatorIcons.error + ' 错误：域名不能为空。',
            error : $.formValidatorIcons.error + ' 错误：请填写正确的域名。'
        },
        url : {
            normal : '* (http|https|ftp)://www.xxx.com/xxx/xxx.html?xxx',
            empty : $.formValidatorIcons.error + ' 错误：URL(网址)不能为空。',
            error : $.formValidatorIcons.error + ' 错误：请填写正确的URL(网址)。'
        },
        ipv4 : {
            normal : '* IPv4地址：0~255.0~255.0~255.0~255',
            empty : $.formValidatorIcons.error + ' 错误：IP地址不能为空。',
            error : $.formValidatorIcons.error + ' 错误：请填写正确的IP地址。'
        },
        idcard : {
            normal : '* 填写18位的身份证号码',
            empty : $.formValidatorIcons.error + ' 错误：身份证号码不能为空。',
            error : $.formValidatorIcons.error + ' 错误：请填写正确的身份证号码。'
        },
        idcard1518 : {
            normal : '* 填写15或18位的身份证号码',
            empty : $.formValidatorIcons.error + ' 错误：身份证号码不能为空。',
            error : $.formValidatorIcons.error + ' 错误：请填写正确的身份证号码（15或18位）。'
        },
        integer : {
            normal : '* 只能填写正整数（0及以上）。',
            error : $.formValidatorIcons.error + ' 错误：请填写正确的正整数（0及以上）。'
        },
        number : {
            normal : '* 只能填写数字值。',
            error : $.formValidatorIcons.error + ' 错误：请填写正确的数字值。'
        },
        image : {
            normal : '* 只能上传 '+$.formValidatorImageFormats.join(', ')+' 格式的图片文件。',
            error : $.formValidatorIcons.error + ' 错误：只能上传 '+$.formValidatorImageFormats.join(', ')+' 格式的图片文件。',
        }
    };

    var isUndefined = function(obj) {
        return (typeof obj == "undefined");
    };

    $.fn.formValidator = function(options, ajaxSubmit, _messages) { 

        ajaxSubmit    = ajaxSubmit || false;

        var submitBtn = $(this);
        var form      = submitBtn.parent("form");

        var validator = function(_this) {

            var name       = _this.attr('name');
            var value      = _this.val();
            var option     = options[name];
            var empty      = option.empty || false;
            var element    = form.find('[name="'+name+'"]'); 
            var role       = form.find('[fv-role="'+name+'"]');
            var msgNormal  = role.find('[type="normal"]');
            var msgEmpty   = role.find('[type="empty"]');
            var msgSuccess = role.find('[type="success"]');
            var msgError   = role.find('[type="error"]'); 
            var equalTo    = form.find('[name="'+option.equalTo+'"]');              
            var checked    = 0;
            var isSuccess  = false;

            if( !isUndefined(option.checked) ) checked = form.find('[name="'+name+'"]:checked').length;

            var exp = {
                min        : ( !isUndefined(option.min)       && parseFloat(value) < option.min),
                max        : ( !isUndefined(option.max)       && parseFloat(value) > option.max),
                minLength  : ( !isUndefined(option.minLength) && value.length < option.minLength),
                maxLength  : ( !isUndefined(option.maxLength) && value.length > option.maxLength),
                checkedEmpty : ( !isUndefined(option.checked) && checked == 0),
                checked    : ( !isUndefined(option.checked)   && typeof option.checked == "number" && checked < option.checked),
                checkedMin : ( !isUndefined(option.checked)   && typeof option.checked == "object" && checked < option.checked[0]),
                checkedMax : ( !isUndefined(option.checked)   && typeof option.checked == "object" && checked > option.checked[1]),
                equalTo    : ( !isUndefined(option.equalTo)   && value !== equalTo.val())
            };

            var successHandler = function(){                     
                _this.removeClass("fv-error").addClass("fv-success");
                role.find('span').hide();
                msgSuccess.show();
                isSuccess = true;
            };

            var errorHandler = function(){   
                _this.removeClass("fv-success").addClass("fv-error");
                role.find('span').hide();
                msgError.fadeIn();

                isSuccess = false;
            };

            if(!empty)
            {
                if (value == "" || exp.checkedEmpty)
                {
                    _this.removeClass("fv-success").addClass("fv-error");
                    role.find('span').hide();
                    msgEmpty.show();
                } 
                else if (exp.min || exp.max || exp.minLength || exp.maxLength || exp.equalTo || exp.checked || exp.checkedMin || exp.checkedMax)
                {
                    errorHandler();
                } 
                else if (!isUndefined(option.ajax)) 
                {
                    $.ajax({
                        type : "get",
                        async : false,
                        dataType : (option.jsonp ? "jsonp" : "json" ) || "json",
                        url : option.ajax + "&" + name + "=" + value, 
                        success : function(json) {
                            if(json.status == 1) successHandler();
                            else                 errorHandler();
                            //console.log(json);
                        }
                    });
                }
                else if (!isUndefined(option.rule)) 
                {
                    var rule       = option.rule;
                    var fileExt    = value.split('.');               
                    var ruleExp    = (typeof rule == "function") ? rule : $.formValidatorRules[rule];

                    fileExt = fileExt[fileExt.length - 1];

                    if(typeof ruleExp == "function") { 
                        if(ruleExp(rule == "image" ? fileExt : value)) successHandler();
                        else errorHandler();
                    }
                    else if(typeof ruleExp == "object")
                    {
                        if(ruleExp.test(value)) successHandler();
                        else errorHandler();
                    }
                    else 
                    {
                    }

                    console.log(typeof ruleExp, ruleExp);
                }
                else 
                {
                    if(!isUndefined(option.min) || !isUndefined(option.max)) _this.val(parseFloat(value) || 0); 

                    successHandler();
                }
            }
            else
            {
                if(value !== "")
                {

                }
            }

            //$.proxy(option.success || new Function, element)();
            //$.proxy(option.error   || new Function, element)();

            //console.log('isSuccess=>', isSuccess);

            return isSuccess;
        };

        for (var i in options)
        {
            var defaultMessages = {
                normal  : '* 必填项',
                empty   : $.formValidatorIcons.error   + ' 错误：不能为空。',
                error   : $.formValidatorIcons.error   + ' 错误：请正确填写。',
                success : $.formValidatorIcons.success + ' 正确'
            };

            var element      = form.find('[name="'+i+'"]'); 
            var role         = form.find('[fv-role="'+i+'"]');
            var option       = options[i]; 
            var type         = element.attr('type'), message;
            var ruleMessages = $.formValidatorRuleMessages;

            if(isUndefined(option.message) && ruleMessages[option.rule]) option.message = "rule";

            if(!isUndefined(option.message) && !isUndefined(option.rule) && option.message == "rule")
            {                    
                message   = $.extend(defaultMessages, ruleMessages[option.rule] || {}); 
            } 
            else
            {
                message   = $.extend(defaultMessages, _messages);     
                message   = $.extend(message, option.message);               
            }

            //console.log('option=>', option, i, "message =>", message);

            for (var x in message)
            {
                if(typeof option == "boolean" && x == "error") break;

                role.append('<span type="'+x+'">'+message[x]+'</span>');
            } 

            //console.log("$(this).length", element.length);

            element.bind((type == "file" || element[0].tagName == "SELECT") ? "change" : "blur", function(event) {
                validator($(this));
            });
        }

        submitBtn.bind($.clickOrTouch() || "click", function() {

            var errors = 0;

            for (var i in options)
            {
                var element   = form.find('[name="'+i+'"]');   

                if(!validator(element)) errors++; 
            } 

            console.log("errors =>", errors); 

            if (errors > 0) return false;
            else 
            {
                if (typeof ajaxSubmit == "object")
                {
                    $.ajax($.extend({
                        type : "post",
                        data : form.serializeArray()
                    }, ajaxSubmit));

                    return false;
                }
                else
                {
                    form.submit();
                }
            }
        }); 

        return this;
    };

})(PlaneUI);