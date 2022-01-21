
cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.labelCom = this.node.getComponent(cc.Label);
        // 游戏因为已经合成大西瓜而提前结束
        this.endSign = false;
        this.time = 300;
    },

    start() {
        this.countTime();
    },
 

    countTime(){
        this.schedule(function() {
            this.labelCom.string = "倒计时:" +this.time;
            // 这里的 this 指向 component
            this.time--;
            if(this.time<=0 || this.endSign){
                this.time = 0;
                cc.director.loadScene('Start');
            }
        }, 1);
    },


    // countTime() {
    //     this.callback = function () {
    //         if (this.time <=0 ) {
    //             // 取消这个计时器
    //             this.unschedule(this.callback);
    //             this.time = 0;
    //             cc.director.loadScene('Start');
    //         }
    //         this.labelCom.string = "倒计时:" +this.time;
    //         this.time--;
    //     }
    //     this.labelCom.schedule(this.callback, 1); 

    // },

    // 倒计时
    // 停止倒计时



    // update (dt) {},
});
