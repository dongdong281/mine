;(function($){
    "use strict";
    $.extend($.fn,{
        banner:function(options){
            this.LOCAL = {
                autoPlay : options.autoPlay === false ? false : true,
                moveTime : options.moveTime || 300,
                delayTime : options.delayTime || 2000,
                index : 0,
                iPrve : options.items.length-1, 
                listOnOff : false,
            }
            var that = this;
            this.LOCAL.listMove = function(i,type){
                options.items.eq(that.LOCAL.index).css({
                    left:0
                }).stop().animate({
                    left:-options.items.eq(0).width()*type
                },that.LOCAL.moveTime).end().eq(i).css({
                    left:options.items.eq(0).width()*type
                }).stop().animate({
                    left:0
                },that.LOCAL.moveTime)
            }
            //判断list是否被传入
            if(options.list != undefined && options.list.length > 0){
                //设置list的初始效果
                this.LOCAL.listOnOff = true;
                options.list.eq(0).css({"background":"#fff","color":"#fff"});
                options.list.on("click",function(){
                    if(that.LOCAL.index < $(this).index()){
                        that.LOCAL.listMove($(this).index(),1)
                    }
                    if(that.LOCAL.index > $(this).index()){
                        that.LOCAL.listMove($(this).index(),-1)
                    }
                    that.LOCAL.index = $(this).index();
                    if(that.LOCAL.listOnOff){
                        options.list.css({"background":"#D0CECE","color":"#000"})
                        .eq(that.LOCAL.index).css({"background":"#fff","color":"#fff"})
                    }
                })
            }
           this.LOCAL.rightEvent = function(){
               if(that.LOCAL.index == options.items.length - 1){
                   that.LOCAL.index = 0;
                   that.LOCAL.iPrve = options.items.length - 1;
               }else{
                   that.LOCAL.index++;
                   that.LOCAL.iPrve = that.LOCAL.index -1;
               }
               that.LOCAL.btnMove(-1);
           }
            //判断左右按键是否被传入
            if(options.left != undefined && options.left.length > 0 
                && options.right != undefined && options.right.length >0){

                    this.LOCAL.btnMove = function(type){
                        options.items.eq(that.LOCAL.iPrve).css({
                            left:0
                        }).stop().animate({
                            left:options.items.eq(0).width()*type
                        },that.LOCAL.moveTime).end().eq(that.LOCAL.index).css({
                            left:-options.items.eq(0).width()*type
                        }).stop().animate({left:0},that.LOCAL.moveTime);
                        if(that.LOCAL.listOnOff){
                            options.list.css({"background":"#D0CECE","color":"#000"})
                            .eq(that.LOCAL.index).css({"background":"#fff","color":"#fff"})
                        }
                    }
                options.left.on("click",function(){
                    if(that.LOCAL.index == 0){
                        that.LOCAL.index = options.items.length - 1;
                        that.LOCAL.iPrve = 0;
                    }else{
                        that.LOCAL.index--;
                        that.LOCAL.iPrve = that.LOCAL.index + 1;
                    }
                    that.LOCAL.btnMove(1);
                   
                });
                options.right.on("click",this.LOCAL.rightEvent);
            }

            //自动播放
            if(this.LOCAL.autoPlay){
                this.LOCAL.timer = setInterval(() => {
                    this.LOCAL.rightEvent();
                }, this.LOCAL.delayTime);

                this.hover(function(){
                    clearInterval(that.LOCAL.timer);
                },function(){
                    that.LOCAL.timer =  setInterval(() => {
                        that.LOCAL.rightEvent();
                    }, that.LOCAL.delayTime);
                })
            }
        }
    })
})(jQuery);