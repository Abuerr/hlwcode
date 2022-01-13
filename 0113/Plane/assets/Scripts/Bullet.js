
cc.Class({
    extends: cc.Component,

    properties: {
       speed:300,
    },

    // LIFE-CYCLE CALLBACKS:
    // 初始化的东西一般写到onLoad里面
    onLoad () {
        
    },

    start () {
    },

    update (dt) {
        // 竖向改变位置，速度乘以时间
        this.node.y += this.speed*dt;
    },
});
