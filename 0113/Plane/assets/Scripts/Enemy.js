
cc.Class({
    extends: cc.Component,

    properties: {

    },
    // 敌人自己开火

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {
        // 先获取BulletMgr节点
        // 获取方式一：
        let bulletMgrN = cc.find('GameRoot/BulletMgr');// 但实际上不推荐这种用法
        // 第二种获取方式
        // let bulletMgr = this.node.parent.parent.getChildByName('BulletMgr');// 太长不推荐
        // 节点找到自己的脚本组件，保存起来，方便生成调用子弹生成函数
        let bulletMgr =  bulletMgrN.getComponent('Bullet');
        // 间隔生成子弹
        this.schedule(this.fire,0.5);
        
    },
    fire() {
        // 创建子弹
        this.bulletMgr.createBullet({node:this.node,dir:cc.v2(0,-1),angle:180});
    },

    // update (dt) {},
});
