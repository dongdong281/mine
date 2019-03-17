$(function(){
    class NavMove{
        constructor(options){
            this.ali = options.ali;
            this.back = options.back;
            this.conts = options.conts;
           
            this.init();
            this.addEvent();
        }
        init(){
            var that = this;
            $(document).scroll(function(){
              var dis = $(document).scrollTop();
              console.log(dis)
              if(dis == 0)that.ali.css("display","block");
              if(dis>800)that.ali.css("display","block");
              if(dis>=800 && dis<1568){
                that.ali.find(".bd .a_nav").removeClass("active").eq(0).addClass("active")
              }
              if(dis >= 1568 && dis < 2084){
                that.ali.find(".bd .a_nav").removeClass("active").eq(1).addClass("active")
              }
              if(dis>=2084 && dis<2814){
                that.ali.find(".bd .a_nav").removeClass("active").eq(2).addClass("active")
              }
              if(dis>=2814 && dis<3510){
                that.ali.find(".bd .a_nav").removeClass("active").eq(3).addClass("active")
              }
              if(dis>=3510 && dis<4044){
                that.ali.find(".bd .a_nav").removeClass("active").eq(4).addClass("active")
              }
              if(dis>=4044 && dis<4730){
                that.ali.find(".bd .a_nav").removeClass("active").eq(5).addClass("active")
              }
            })
           
        }
        addEvent(){
            var that = this;
            console.log(this.ali.find(".bd"));
            this.ali.find(".bd").click(function(){
                if($(this).index() == 1){
                     $("html").stop().animate({
                           scrollTop:that.conts.eq(1).offset().top
                    },500)
                }
                if($(this).index() == 2){
                    $("html").stop().animate({
                          scrollTop:that.conts.eq(3).offset().top
                   },500)
               }
               if($(this).index() == 3){
                    $("html").stop().animate({
                        scrollTop:that.conts.eq(5).offset().top
                    },500)
                }
                if($(this).index() == 4){
                    $("html").stop().animate({
                        scrollTop:that.conts.eq(7).offset().top
                    },500)
                } 
                if($(this).index() == 5){
                    $("html").stop().animate({
                        scrollTop:that.conts.eq(8).offset().top
                    },500)
                }
                if($(this).index() == 6){
                    $("html").stop().animate({
                        scrollTop:that.conts.eq(10).offset().top
                    },500)
                }
            })
        }  
    }
    new NavMove({
        ali:$("#rightNav"),
        back:$(".back"),
        conts:$(".floor")
    })
})