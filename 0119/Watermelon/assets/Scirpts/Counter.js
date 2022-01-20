
cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.labelCom = this.node.getComponent(cc.Label);
    },

    start() {
        this.counter = 0;
    },

    updateCounter(point){
        this.counter +=point;
        this.labelCom.string = "分数:" + this.counter;
    }
});
