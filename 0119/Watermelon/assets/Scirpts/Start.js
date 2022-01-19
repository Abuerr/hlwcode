

cc.Class({
    extends: cc.Component,

    properties: {
       
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        // 加载切换的场景
        this.node.on('click',()=>{
            cc.director.loadScene('Game');
        },this);
    },

    // update (dt) {},
});
