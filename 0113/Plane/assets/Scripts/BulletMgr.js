
cc.Class({
    extends: cc.Component,

    properties: {
        //  子弹预设体属性
        bulletPre:cc.Prefab,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {

    },

    // 创建子弹
    createBullet(node){
        let bullet = cc.instantiate(this.bulletPre);
        // 将其挂到子弹管理者节点上
        bullet.parent = this.node;
        // 设置子弹的位置，子弹的位置就是要发射子弹的飞机节点
        bullet.position = node.position;
    },
    // update (dt) {},
});
