$(function(){
    $(".mod_sider").banner({
        items:$(".mod_sider").children(".inner").children("ul").children("li"),
        left:$(".mod_sider").children("#preBtn"),
        right:$(".mod_sider").children("#nextBtn"),
        list:$(".mod_sider").children(".list_wrap").children("ul").children("li"),
       
    })
    class NavTab{
        constructor(){
            this.dl = $("#menuList").find(".list_item");
            this.dd =$("#menuList").find(".list_item").find(".submenu");
            this.init()
        }
        init(){
           var that = this;
           this.dl.hover(function(){
               that.dl.removeClass("active").eq($(this).index()).addClass("active");
               that.dd.css({
                   display:"none"
               }).eq($(this).index()).css({
                   display:"block"
               })
           },function(){
               that.dl.removeClass("active");
               that.dd.css({
                   display:"none"
               })
           })
        }
    }
    new NavTab();
    
    class HeaderTab{
        constructor(){
            this.user = $(".opt_user");
            this.wx = $(".opt_wx");
            this.cart = $(".opt_cart");
            this.me = $("#me");
            this.i_wx = $("#wx_img");
            this.msg = $("#cart");
            this.init()
        }
        init(){
            var that = this;
            if(!$.cookie("users")){
                this.user.click(function(){
                   
                    location.href = "http://localhost:3000/register.html";
                })  
                this.cart.click(function(){
                   
                    location.href = "http://localhost:3000/register.html";
                })  
            }
            
            this.user.hover(function(){
                that.me.css({
                    display:"block"
                })
            },function(){
                that.me.css({
                    display:"none"
                })
            });
            this.wx.hover(function(){
                that.i_wx.css({
                    display:"block"
                })
            },function(){
                that.i_wx.css({
                    display:"none"
                })
            });
            this.cart.hover(function(){
                that.msg.css({
                    display:"block"
                })
            },function(){
                that.msg.css({
                    display:"none"
                })
            })
        }
    }
    new HeaderTab();
    
    class JumpToGoods{
        constructor(){
            this.products = $(".floor").children(".product");
            
            this.link()
        }
        link(){
            this.products.on("click",function(){
                location.href = "http://localhost:3000/goods.html";
            })
        }
    }
    new JumpToGoods();
    
    class Get{
        constructor(){
           this.init()
        }
        init(){
            if($.cookie("users")){
                var str = $.cookie("users")
                str =  str = str.slice(1,5);
                $(".user_login_name").html(str);
            }
            if($.cookie("cook")){
                var listNum = JSON.parse($.cookie("cook"));
                     $(".cart_num").html(listNum.length);
            }
        }
    }
    new Get();


})