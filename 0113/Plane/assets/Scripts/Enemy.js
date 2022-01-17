
cc.Class({
    extends: cc.Component,

    properties: {

    },
    // 敌人自己开火


    start() {
        // 先获取BulletMgr节点
        // 获取方式一：
        let bulletMgrN = cc.find('GameRoot/BulletMgr');// 但实际上不推荐这种用法
        // 第二种获取方式
        // let bulletMgr = this.node.parent.parent.getChildByName('BulletMgr');// 太长不推荐
        // 节点找到自己的脚本组件，保存起来，方便生成调用子弹生成函数
        this.bulletMgr = bulletMgrN.getComponent('BulletMgr');
        // 间隔生成子弹
        this.schedule(this.fire, 0.5);
    },
    // 初始化敌机
    init(data) {
        // 设置敌机位置
        this.randomPos();
        // 设置敌机的样式图片
        this.setImag(data.spriteFrame);
        // 获取data数据中的对应的子弹id
        this.bulletId = data.bulletId;
    },

    // 敌机的随机位置
    randomPos() {
        // 敌人的位置
        let y = cc.winSize.height + this.node.height;// 获取场景界面高度
        let x = Math.random() * (cc.winSize.width - this.node.width) + this.node.width / 2;
        // 定义敌人的位置
        this.node.position = cc.v2(x, y);
    },

    setImag(spriteFrame){
        // 获取这个节点上的精灵组件
        // 可以用名称也可以用类型来获取
        let spriteCom = this.node.getComponent(cc.Sprite);
        spriteCom.spriteFrame = spriteFrame;
    },

    fire() {
        // 创建子弹     
        this.bulletMgr.createBullet(this.node,this.bulletId);
    },

    // update (dt) {},
});
