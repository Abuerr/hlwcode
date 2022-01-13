
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
        // 敌人的位置
        let y = cc.winSize.height;// 获取场景界面高度
        let x = Math.random() * (cc.winSize.width - enemy.width) + enemy.width / 2;
        // 定义敌人的位置
        enemy.position = cc.v2(x, y);
    },

    // 敌人的移动
    enemyMove(t) {
        // 找到所有的敌人
        for (let i = 0; i < this.node.children.length; i++) {
            let enemy = this.node.children[i];
            enemy.y -= this.speed * t;
            // 每个敌机发射子弹

        }
    },

    fire() {
        // 创建子弹
        // 找到节点BulletMgr
        let bulletMgrs = this.node.parent.getChildByName('BulletMgr');
        let bullet = bulletMgrs.getComponent('BulletMgr');
        // 子弹位置改变
        bullet.createBullet(this.node);
        bullet.setSpeed(-200);
    },

    update(dt) {
        enemyMove(dt);//达咩，飞机一动不动
        for (let i = 0; i < this.node.children.length; i++) {
            let enemy = this.node.children[i];
            enemy.y -= this.speed * dt;
            // 敌机发射子弹
            let bulletMgrs = this.node.parent.getChildByName('BulletMgr');
            let bullet = bulletMgrs.getComponent('BulletMgr');
            // 子弹位置改变
            bullet.createBullet(enemy);
            bullet.setSpeed(-200);
        }

        // 只有一架敌机测试

       
    },
});
