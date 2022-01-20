
cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.init();
    },

    start() {
        this.countTime();
    },
    init() {
        this.labelCom = this.node.getComponent(cc.Label);
        // 游戏因为已经合成大西瓜而提前结束
        this.endSign = false;
        this.time = 8;
    },

    countTime() {
        
        this.callback = function () {
            if (this.time <=0 || this.endSign) {
                // 取消这个计时器
                this.unschedule(this.callback);
            }
            this.time--;
        }
        this.labelCom.schedule(this.callback, 1); 

    },

    // 倒计时
    // 停止倒计时



    // update (dt) {},
});
