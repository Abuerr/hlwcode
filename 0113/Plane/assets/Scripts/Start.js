
cc.Class({
    extends: cc.Component,

    properties: {
        bar:cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        // 注册按钮点击事件 这是一个节点事件所以用node来注册
        // 参数1 事件名称 ，参数2 回调函数，参数3 this、
        this.node.on('click',()=>{
            // 切换场景 到游戏界面
            // cc.director.loadScene('Game');
            this.bar.active = true;
            // 隐藏按钮
            this.node.destroy();
        });

    },

    // update (dt) {},
});
