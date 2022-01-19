import ResMgr from "./ResMgr"

cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        // 一开始设置为false,加载存放好资源后在Loading脚本中变成true
        cc.isStart = false;
        // 启动物理引擎
        let phyManager = cc.director.getPhysicsManager();
        phyManager.enabled = true;
        // 设置物理中的重力加速度
        phyManager.gravity = cc.v2(0, -960);
    },

    start() {
        // 设置点击事件：点击屏幕随机产生一个水果
        this.node.on('touchstart', () => {
            if (cc.isStart) {
                let level = Math.floor(Math.random() * 5) + 1;
                this.createFruit(level, cc.v2(0, 300));
            }
        }, this);
    },

    // 创建水果（把水果预制资源实例化）
    // 1 随机一个图片的水果 用来给用户操作 
    // 2 两个水果合并的时候 创建他们的升级水果
    //    水果的属性里面 需要插入一个表示等级的数值 

    createFruit(level, pos) {
        // 实例化水果预制件
        let pre = ResMgr.getInstance().getPrefabs('Fruit');
        let fruit = cc.instantiate(pre);
        // 将水果节点挂到根节点上
        fruit.parent = this.node;

        fruit.position = pos;
        fruit.scale = 0.5;
        let key = 'fruit_' + level;
        let spriteFrame = ResMgr.getInstance().getSpriteFrame(key);
        fruit.getComponent(cc.Sprite).spriteFrame = spriteFrame;


    }

    // update (dt) {},
});
