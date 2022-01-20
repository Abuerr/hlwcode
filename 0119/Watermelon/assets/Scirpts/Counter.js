
cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        let labelCom = this.node.getComponent(cc.Label);
    },

    start() {

    },

    updateCounter(point){
        labelCom.string = "分数:" + point;
    }
});
