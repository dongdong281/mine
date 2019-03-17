$(function(){
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
    }
}
new HeaderTab();

class Cart{
    constructor(option){
        this.item = option.item;
        this.url = option.url;
        this.total = option.total;
        this.totalPrice = 0;
        this.allcheck = option.allcheck;
        this.load();
        this.addEvent();
    }
    load(){
        $.ajax({
            url:this.url,
            success:(res)=>{
                this.res = res;
                this.getCookie();
            }
        })
    }
    getCookie(){
        this.cook = JSON.parse($.cookie("cook"));
       if(this.cook){  
           this.show();
        //    var totalPrice = 0;
            // for(var i in this.cook){
            //     this.totalPrice += this.cook[i].num * this.cook[i].price
            //  };
            //     this.total.text(this.totalPrice);
          
       }
      
       
    }
    show(){
        let str = "";
        this.res.forEach((resValue)=> {
            this.cook.forEach((cookValue)=>{
                if(resValue.id == cookValue.id){
                    cookValue.price = resValue.price;
                    str +=`<ul class="cart_title_wrap"  data-id="${cookValue.id}">
                                <li class="choose_all">
                                    <input type="checkbox"name="one" class="one" checked="checked">单选
                                </li>
                                <li class="cart_product">
                                    <img src="${resValue.img}" alt="">
                                </li>
                                <li class="cart_info">${resValue.info}</li>
                                <li class="cart_price">${resValue.price}</li>
                                <li class="cart_num">
                                <div id="editNum" class="clear">
                                    <span class="reduce">-</span>
                                        <input type="text" id="nums" value="${cookValue.num}">
                                        <span class="plus">+</span>
                                </div>
                                </li>
                                <li class="cart_total">${resValue.price*cookValue.num}</li>
                                <li class="cart_operation">
                                    <em>删除</em>
                                </li>
                            </ul> `
                }
            })

        });
        this.item.html(str);
        this.getTotal();
        this.getAll();
    }
    getAll(){
        var that = this;
        this.allcheck.click(function(){
            
            if(this.checked == true){
              
               that.item.find(".one").each(function(){
                   this.checked = true;
               })
            }else{
               
                that.item.find(".one").each(function(){
                    this.checked = false;
                })
            }
            that.getTotal()
        });
        this.item.on("click",".one",function(){
            var len = that.item.find(".one").length;
            var checklen =  that.item.find("input[name='one']:checked").length;
            console.log(len,checklen)
            if(len == checklen){
                that.allcheck.checked = true;
            }else{
                that.allcheck.checked = false;
            };
            that.getTotal()
        })

    }
    getTotal(){
        var that = this;
        var sum = 0
        this.item.find(".one").each(function(){
            if(this.checked == true){
              var p = $(this).parent().parent().find(".cart_total").text();
              sum += Number(p);
            }
        })
        this.total.text(sum);
    }
    addEvent(){
        var that = this;
        this.item.on("click","em",function(){
            that.id = $(this).parent().parent().attr("data-id");
        
           that.changeCookie(function(index){
                that.cook.splice(index,1);
                
           })
        })
       this.item.on("click",".reduce",function(){
         
           that.id = $(this).parent().parent().parent().attr("data-id");
          
           that.num = parseInt($(this).parent().find("#nums").val());
           if(that.num>1){
                that.num--;
           }else{
            $(this).parent().find("#nums").val(1)
           }
           
           $(this).parent().find("#nums").val(that.num);
           that.currentNum = $(this).parent().find("#nums").val();
          
           that.preCookie();
           
       });
       this.item.on("click",".plus",function(){
          
           that.id = $(this).parent().parent().parent().attr("data-id");
          
           that.num = parseInt($(this).parent().find("#nums").val());
           that.num++;
           $(this).parent().find("#nums").val(that.num);
           that.currentNum = $(this).parent().find("#nums").val();
          
           that.preCookie();
       })
    }
   
    changeCookie(cb){
        for(var i=0; i<this.cook.length; i++){
            if(this.cook[i].id === this.id){
                cb(i);
            }
        }
        $.cookie("cook",JSON.stringify(this.cook));
        this.show();
    }
    preCookie(){
        for(var i in this.cook){
            if(this.cook[i].id === this.id){
                this.cook[i].num = this.currentNum;
            }
        }
        $.cookie("cook",JSON.stringify(this.cook));
        // var totalPrice = 0;
        // 
        // for(var i in this.cook){
        //     this.totalPrice += this.cook[i].num * this.cook[i].price
        // };
        // this.total.text(this.totalPrice);
       
        this.show();
    }
}
new Cart({
    item:$(".item_detial"),
    url:"http://localhost:3000/api/product?dataName=column&start=0&count=1",
    total:$(".totalPrice"),
    allcheck:$(".choose")

});

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