

$(function(){
    class Display{
        constructor(options){
        this.url = options.url;
        this.price = options.price;
        this.img1 = options.img1;
        this.img2 = options.img2;
        this.img3 = options.img3;
        this.img4 = options.img4;
        this.img5 = options.img5;
        this.img6 = options.img6;
        this.img7 = options.img7;
        this.info = options.info;
         this.init()
        }
        init(){
            var that = this;
            this.id =parseInt( $.cookie("goodId"));
          
            $.ajax({
                url:this.url,
                success:function(res){
                 that.res = res;
                 that.compare();
                }
            })
        }
        compare(){
         console.log(this.res);
            this.res.forEach((value,index) => {
                if(value.id == this.id){
                    this.i = index;
                }
            });
            this.good =  this.res[this.i];
            if(this.good){
                 this.show()
            }
        }
        show(){
           $(this.price).html(this.good.price);
           $(this.img1).attr("src",this.good.img1);
           $(this.img2).attr("src",this.good.img1);
           $(this.img3).attr("src",this.good.img1);
           $(this.img4).attr("src",this.good.img2);
           $(this.img5).attr("src",this.good.img3);
           $(this.img6).attr("src",this.good.img4);
           $(this.img7).attr("src",this.good.img5);
        }
     
    }
   new Display({
        url:"http://localhost:3000/api/product?dataName=column&start=0&count=10",
        price:$("b.price"),
        img1:$("#zoomPic"),
        img2:$("#showcase"),
        img3:$("img[index='0']"),
        img4:$("img[index='1']"),
        img5:$("img[index='2']"),
        img6:$("img[index='3']"),
        img7:$("img[index='4']"),
        info:$("h1")
       
    })
    //头部点击效果
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
                    console.log(1);
                    location.href = "http://localhost:3000/register.html";
                })
                this.cart.click(function(){
                    console.log(1);
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
    //侧边栏效果
    $("#detail_floating").children(".item").hover(function(){ 
        
        $(this).find(".det4").css({backgroundPositionY:"-38px",backgroundPositionX:"-76px"});
        $(this).find(".det2").css({backgroundPositionY:"-38px"});
        $(this).find(".det1").css({backgroundPositionY:"-38px"});
    },function(){
        $(this).find(".det4").css({backgroundPositionY:"0",backgroundPositionX:"-112px"});
        $(this).find(".det2").css({backgroundPositionY:"0"});
        $(this).find(".det1").css({backgroundPositionY:"0"});
   });
   $("#wx").hover(function(){
       $(this).next().next().css("display","block")
   },function(){
    $(this).next().next().css("display","none")
   });

   //返回顶部
   $.fn.myscrollTop = function(speed){
        var targetTop = $(this).offset().top;
        $('html,body').stop().animate({scrollTop: targetTop,speed});
        return this;
    }   
   $("#toTop").click(function(){
        $('body').myscrollTop(50);
        return false;
   })
    //选项卡   
   class Tabsp {
       constructor(options){
        this.ali = options.ali;
        this.conts = options.conts;
        this.init();
       }
       init(){
           let that = this;
           this.ali.on("click",function(){
              that.ali.removeClass("curs").eq($(this).index()).addClass("curs");
              that.conts.stop().hide().eq($(this).index()).stop().show();
           })
       }
   }
   new Tabsp({
       ali:$(".tabs_nav").children(),
       conts:$(".tabs_content_wrap").children()
   })
   //切换图片效果
   class ImgChange {
       constructor(options){
            this.imglist = options.imglist;
            this.smallpic = options.smallpic;
            this.bidpic = options.bigpic[0];
            this.smallcont = options.smallcont;
            this.bigcont = options.bigcont;
            this.bigImg = options.bigImg;
            this.init();
           
       }
       init(){
           let that = this;
           this.imglist.click(function(){
                that.imglist.removeClass("cur").eq($(this).index()).addClass("cur");
                let str = $(this).find("img")[0].src;
                that.smallpic.find("#showcase").attr("src",str);
                that.bigcont.find("#zoompic").attr("src",str);
           });
           this.imglist.mouseenter(function(){
                that.imglist.removeClass("cur").eq($(this).index()).addClass("cur");
                let str = $(this).find("img")[0].src;
                that.smallpic.find("#showcase").attr("src",str);
               // $(that.bigpic).attr("src",str);
            });
            this.smallpic.mouseover(function(){
                $(that.bigcont).css({display:"block"});
                let str1 = $(this).find("#showcase")[0].src;
                $(that.bigcont).find("img").attr("src",str1)
                $(that.smallcont).css({display:"block"})
                that.imgMove()
            });
            this.smallpic.mouseout(function(){
                $(that.bigcont).css({display:"none"})
                 $(that.smallcont).css({display:"none"})
             });     
       }
       imgMove(){
           var that = this;
           this.smallpic.mousemove(function(e){
               //小方块移动的距离
               var l = e.pageX - that.smallpic.offset().left - that.smallcont.width()/2;
               var t = e.pageY - that.smallpic.offset().top - that.smallcont.height()/2;
               //边界限定
               l = Math.min(Math.max(0,l),(that.smallpic.width()-that.smallcont.width()));
               t = Math.min(Math.max(0,t),(that.smallpic.height()-that.smallcont.height()));
               that.smallcont.css({
                   left:l+"px",top:t+"px"
               });
               //计算比例
               var x = l/(that.smallpic.width()-that.smallcont.width());
               var y = t/(that.smallpic.height()-that.smallcont.height());
               var bl = that.bigImg.width() - that.bigcont.width();
               var bt = that.bigImg.height() - that.bigcont.height();
               that.bigImg.css({
                   left:-x*bl+"px",top:-y*bt+"px"
               })
           })
       }
   }
   new ImgChange({
       imglist:$("#imgList").children(),
       smallpic:$(".showcase"),//小图框
       bigpic:$("#zoomPic"),//大图
       //大图片框
       bigcont:$(".zoom_pic"),
       //小框
       smallcont:$("#detailPic"),
       bigImg:$("#zoomPic")
   })
  
   //navfixed
  
  $(document).scroll(function(){
     if($(this).scrollTop()>890){
        $(".tabs_nav_wrap").css({
            position:"fixed",top:"0"
        })
     }else{
        $(".tabs_nav_wrap").css({
            position:"static"
        })
     }
  })
  class AddGoods{
      constructor(options){
        this.btn = options.btn;
        this.init();
        this.add();
      }
      init(){
          var that = this;
          $.ajax({
              url:"http://localhost:3000/api/product?dataName=column&start=0&count=1",
              success:function(res){
                  that.res = res;
                
              }
          })
      }
      add(){
          var that = this;
          this.btn.click(function(){
            that.id = $.cookie("goodId");
            that.getCookie();
            alert("添加购物车成功")
          })
      }
      getCookie(){
        if(!$.cookie("cook")){
              this.cook = [{
                  id:this.id,
                  num:1
              }]
        }else{
            var isNew = false;
            this.cook = JSON.parse($.cookie("cook"));
            console.log(this.cook);
            for(var i=0;i<this.cook.length;i++){
                if(this.cook[i].id === this.id){
                    this.cook[i].num++;
                    isNew = true;break;
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
  new AddGoods({
      btn:$("#cartBtn"),
      
  })
    
})
