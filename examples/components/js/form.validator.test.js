$(function() {
    console.log($('[name^=sex]').length);
    $("#test-form-submit").formValidator({
        username : {
            rule : "username",
            ajax : "//192.168.1.2/planeui/tests/php/ajax.validator.php?act=username"
            //message : "rule"
            //maxLength : 16,
            //minLength : 6
        },
        
        password : {
            rule : "password"
        },
        
        confirm_password : {
            rule : "confirmPassword",
            equalTo : "password"
        },
        
        email : {
            rule : "email"
        },
        
        tel : {
            rule : "tel"
        },
        
        fax : {
            rule : "fax"
        },
        
        mobile : {
            rule : "mobile"
        },
        
        address : true,
        
        zipcode : {
            rule : "zipcode"
        },
        
        number : {
            rule : "number"
        },
        
        province : true,
        
        city : true,
        
        website : {
            rule : "url"
        },
        
        ip : {
            rule : "ipv4"
        }, 

        "hobbies[]" : {
            //checked : 3
            checked : [1, 3],
            message : {
                normal : "* 提示：只能选择1到3个选项",
                empty : "错误：至少选择1个选项。",
                error : "错误：只能选择1到3个选项。"
            }
        },
        
        idcard : {
            rule : "idcard"
        },
        
        idcard_photo : {
            rule : "image"
        },
        
        signature : true,
        
        works : true,
        
        seniority : {
            min : 0,
            max : 60,
            message : {
                error : "错误：工龄只能是0~60间的数值。"
            }
        },
        
        vcode : {
            ajax : "//192.168.1.2/planeui/tests/php/ajax.validator.php?act=vcode",
            //jsonp : true,
            minLength : 4,
            maxLength : 4
        }
    }, {
        url : "//192.168.1.2/planeui/tests/php/ajax.validator.php",
        success : function(data){
            console.log("ajaxSubmit.data", data);
        },
        error : function(status){
            console.log("ajaxSubmit.error", status);
        }
    }, {
        normal : "* 必填项"
    }); 
    
    var errors = 0; 
    
    /*
    var dtd = $.Deferred(); // 生成Deferred对象
    var wait = function(dtd){
        var tasks = function(){
            console.log("执行完毕！");
            dtd.resolve(); // 改变Deferred对象的执行状态
        };
        setTimeout(tasks,5000);
    };
    dtd.promise(wait);
    wait.done(function(){ console.log("哈哈，成功了！"); })
    .fail(function(){ console.log("出错啦！"); });
    wait(dtd);*/
    /*
    for (var i=0;i<5;i++) {    
        $.ajax({
            type : "get",
            async : false,
            dataType : "json",
            url : "//192.168.1.2/planeui/tests/php/ajax.validator.php?act=vcode&vcode="+i+"234", 
            success : function(json){
                
                if(json.status !== 1) errors++;
                console.log(json);
            }        
        });  
    }
    
    console.log("errors =>", errors);*/
    
    
    // 某个表单项可以为空，但如果有填写就验证。
    
    //console.log($("#test-form").serializeArray());
    
    //console.log(ajaxAction("//192.168.1.2/planeui/tests/php/ajax.validator.php?act=vcode&vcode=1234"), a);

    //console.log(typeof (new RegExp("(.*)")));
});