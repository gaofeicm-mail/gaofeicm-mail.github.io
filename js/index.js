//实现插件 + 实现轮播图功能

//$.fn.extend   自动播放 + 点击切换

(function($){
    //实现轮播图功能
    function Slider(ele, opt){
        //d 为默认参数
        let d = {
            curDisplay: 0,
            autoPlay: false,
            interval: 2000
        }
        //参数合并， 默认参数和传递过来的参数之间的合并
        this.opts = $.extend({}, d, opt) 
        //传递过来的的元素
        this.wrap = ele

        this.curDisplay = this.opts.curDisplay
        this.$img = this.wrap.find("img");
        this.imgLen = this.$img.length
        this.nowIndex = 0
        this.autoPlay = this.opts.autoPlay
        //计时器函数初始为空
        this.timer = null
        this.interval = this.opts.interval
        this.init()
    }
    Slider.prototype.init = function () {
        //console.log(this)
        this.initMove()
        this.bindEvent()
    }
    Slider.prototype.initMove = function() {
        let self = this
        let hLen = Math.floor(this.imgLen / 2)
        let lNums
        let rNums
        for (let i = 0; i < hLen; i++) {
            lNums = self.curDisplay - i - 1
            //console.log(lNums)
            self.$img.eq(lNums).css({
                transform: `translateX(${(-150) * ( i + 1 )}px) translateZ(${(200 -i*100)}px) rotateY(${30}deg)`
            })
            rNums = self.curDisplay + i + 1
            self.$img.eq(rNums).css({
                transform: `translateX(${(150) * ( i + 1 )}px) translateZ(${(200 -i*100)}px) rotateY(${-30}deg)`
            })
        }
        self.$img.eq(self.curDisplay).css({
            transform: "translateZ(300px)"
        })
    }
    Slider.prototype.bindEvent = function() {
        let self = this
        self.$img.on("click", function(){
            self.nowIndex = $(this).index()
            self.moving(self.nowIndex)
        }).hover(function(){
            clearInterval(self.timer)
        },function(){
            self.timer = setInterval(function(){
                self.play()
            }, self.interval)
        })
        this.timer = setInterval(function(){
            this.play()
        }, this.interval)
    }
    Slider.prototype.moving = function(index) {
        this.curDisplay = index
        this.initMove()
    }
    Slider.prototype.play = function() {
        if (this.autoPlay) {
            if (this.nowIndex === this.imgLen - 1) {
                this.nowIndex = 0
            } else {
                this.nowIndex++
            }
            this.moving(this.nowIndex)
        }
    }
    //扩展插件
    $.fn.extend({
        slider: function(options){
            new Slider(this, options)
        }
    })
})(jQuery)