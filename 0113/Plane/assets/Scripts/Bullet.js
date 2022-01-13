
cc.Class({
    extends: cc.Component,

    properties: {
       
    },

    // LIFE-CYCLE CALLBACKS:
    // 初始化的东西一般写到onLoad里面
    onLoad () {
        this.speed=300;
    },

    start () {
    },

    update (dt) {
        // 竖向改变位置，速度乘以时间
        this.node.y += this.speed*dt;
    },
});
