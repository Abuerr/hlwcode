
import {ResMgr} from 'ResMgr'

cc.Class({
    extends: cc.Component,

    properties: {
        // 敌机预制件
        enemyPre: cc.Prefab,
        // 子弹预制件
        // bulletPre: cc.Prefab,
        // json文件
        // spriteFrames:[cc.spriteFrame],
        // enemyDt: cc.JsonAsset,
        speed: 200,//敌机的速度
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.enemyDt = ResMgr.getInstance().getJson('EnemyData');
        // 用来存储图集资源
        let atlas = null;
        // 用资源管理类来获取需要的图片资源
        this.schedule(this.createEnemy(),1);
    },

    start() {
        
    },

    // 创建敌人
    createEnemy() {
        // 实例化预制件
        let enemy = cc.instantiate(this.enemyPre);
        // 将敌人挂到敌人管理器上
        enemy.parent = this.node;
        // 随机选择一个敌机样式
        let id = Math.floor(Math.random() * ResMgr.getInstance().getJsonLen('EnemyData')) + 2001;
        // 根据前面所随机选择的敌机id来找到对应的图片资源
        let data = ResMgr.getInstance().getDataById('EnemyData',id);
        
        enemy.getComponent('Enemy').init(data);
    },

    update(dt) {
        for (let i = 0; i < this.node.children.length; i++) {
            let enemy = this.node.children[i];
            enemy.y -= this.speed * dt;
        }
    },
    // // 输入数据json和传入制定的id
    // getDataById(json,id){
    //     for (let i = 0; i < json.length; i++) {
    //         if(json[i].id === id){
    //             return json[i];
    //         }
    //     }
    // }
});
