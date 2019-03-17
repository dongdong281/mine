//顶部切换
class HeaderTab{
    constructor(){
        this.init()
    }
    init(){
        var that = this;
        $(".opt_user").hover(function(){
            $("#me").css({
                display:"block"
            })
        },function(){
            $("#me").css({
                display:"none"
            })
        });
        $(".opt_wx").hover(function(){
            $("#wx_img").css({
                display:"block"
            })
        },function(){
            $("#wx_img").css({
                display:"none"
            })
        });
        $(".opt_cart").hover(function(){
            $("#cart").css({
                display:"block"
            })
        },function(){
            $("#cart").css({
                display:"none"
            })
        })
        $(".opt_cart").click(function(){
           // location.href = "http://localhost/midea/cart.html";
        })
    }
}

//点击商品 存cookie
class Pagination{
    constructor(){
        this.json = null;
        this.ul = $(".search_list");
        this.init();
    
        this.addEvent();
    }
    init(){
        var that = this;
        $.ajax({
            url:"http://localhost:3000/api/product?dataName=column&start=0&count=10",
            type:'GET',
            data:{id:9},
            success:function(res){
                that.json = res;
                console.log(that.json);
                $(".cate_count").html(that.json.length);
                that.show();
            }
        })
    }
    show(){
        var that = this;
        var str = "";
        $.each(this.json,function(index,obj){
            str +=`<li class="hproduct" id="${obj.id}">
            <a href="#" class="cover">
                <img src="${obj.img}" alt="">
            </a>
            <div class="ft_message">
                <span>
                    ￥
                    <span>${obj.price}</span>
                </span>
            </div>
            <a href="#" class="fn">
               ${obj.info}
            </a>
            <div class="sell_point">领券立减200元</div>
            <div class="buy" data-id="${obj.id}">
                <em>加入购物车</em>
            </div>
            <div class="item_compare"></div>
            <div class="tag">品类日</div>
        </li> `
        })
        this.ul.html(str);
    }
    addEvent(){
        var that = this;
        this.ul.on("click","em",function(){
            that.id = $(this).parent().attr("data-id")
            that.getCookie();
            alert("加入购物车成功")
        })
    }
    getCookie(){
        
        if(!($.cookie("cook"))){
            this.cook = [{
                id:this.id,
                num:1
            }]
        }else{
            var isNew = false;
            this.cook = JSON.parse($.cookie("cook"));
           
            for(var i=0;i<this.cook.length;i++){
                if(this.cook[i].id === this.id){
                    this.cook[i].num++;
                    isNew = true;
                    break;
                }
            }
            if(!isNew){
                this.cook.push({
                    id:this.id,
                    num:1
                })
            }
        }
        $.cookie("cook",JSON.stringify(this.cook));  
    }
}

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
class JumpToGoods{
    constructor(option){
        this.ul = option.ul;
        this.init();
    }
    init(){
        let that = this;
        this.ul.on("click","li",function(event){
            let target = event.target;
            that.id = $(this).attr("id");
            $.cookie("goodId",that.id);
            if(target.nodeName === "EM"){
                new Pagination();
            }else{
                 location.href = "http://localhost:3000/shangpin.html"
            }
        })
    }
}   
  
new HeaderTab();
let p = new Pagination();

new Get(); 
new JumpToGoods({
    ul:p.ul
})    
   
