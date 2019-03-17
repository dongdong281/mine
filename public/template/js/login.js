class Change{
    constructor(){
        this.reg = $(".reg");
        this.other = $(".other_login");
        this.init();
    }
    init(){
        var that = this;
        this.reg.on("click",function(){
            $(".login:first").addClass("hide");
            $(".register:first").removeClass("hide");
        });
        this.other.on("click",function(){
            $(".register:first").addClass("hide");
            $(".login:first").removeClass("hide");
        })
    }
}
new Change();


class Log{
    constructor(){
        this.url = "http://localhost:3000/api/login";
        this.init()
    }
    init(){
        var that = this;
        $(".login_btn").click(function(){
            that.load()
        })
    }
    load(){
        var that = this;
        $.ajax({
            url:this.url,
            type:'POST',
            data:{
                username:$("#tel").val(),
                password:$("#pass").val()
            },
            success:function(res){
                switch(res){
                    case "0":
                        $(".msg").html("用户名密码不符");
                        break;
                    // case "1":
                    //     $(".msg").html("请重新登录");
                    //     break;
                    default:
                        that.res = res;
                        $(".msg").html("登录成功");
                        that.setCookie()
                         
                }
            }
        })
    }
    setCookie(){
        $.cookie("users",this.res.data.username);
        if($.cookie("users")){
             this.jump()
        }
       
    }
    jump(){
        location.href = "http://localhost:3000/index.html";
    }
}

new Log()

class Register{
    constructor(){
        this.url = "http://localhost:3000/api/reg";

        this.init();
    }
    init(){
        var that = this;

        $(".register_btn").click(function(){
            that.load();
            console.log($("#pass1").val());
        })
    }
    load(){
        $.ajax({
            url:this.url,
            type:'POST',
            data:{
                username:$("#tel1").val(),
                password:$("#pass1").val()
            },
            success:function(res){
                switch(res){
                    case "0":
                        $(".msg").html("重名");
                        break;
                    case "1":
                        $(".msg").html("成功，3秒后请登录");
                        setTimeout(() => {
                            location.reload();
                        }, 3000);
                        break;
                    case "2":
                        $(".msg").html("不允许为空");
                        break;
                }
            }
          
        })
    } 
}

new Register()
