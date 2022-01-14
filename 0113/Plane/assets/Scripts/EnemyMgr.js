
cc.Class({
    extends: cc.Component,

    properties: {
        // 敌机预制件
        enemyPre: cc.Prefab,
        // 子弹预制件
        bulletPre: cc.Prefab,

        speed: 200,//敌机的速度
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {
        // 隔一定时间产生一个敌机
        this.schedule(this.createEnemy, 1);
    },

    // 创建敌人
    createEnemy() {
        // 实例化预制件
        let enemy = cc.instantiate(this.enemyPre);
        // 将敌人挂到敌人管理器上
        enemy.parent = this.node;
        enemy.getComponent('Enemy').init();
    },

  


    update(dt) {
        for (let i = 0; i < this.node.children.length; i++) {
            let enemy = this.node.children[i];
            enemy.y -= this.speed * dt;
        }
    },
});
