
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
    createBullet(obj){
        let bullet = cc.instantiate(this.bulletPre);
        // 将其挂到子弹管理者节点上
        bullet.parent = this.node;
        // 获取子弹节点的组件（脚本）Bullet
        let bulletJs = bullet.getComponent('Bullet');
        // 初始化子弹
        bulletJs.init(obj);
        
    },
   
    // update (dt) {},
});
