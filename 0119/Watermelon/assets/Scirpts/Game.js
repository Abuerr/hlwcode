import ResMgr from "./ResMgr"

cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.init();
    },

    init() {
        // 启动物理引擎
        let phyManager = cc.director.getPhysicsManager();
        phyManager.enabled = true;
        // 设置物理中的重力加速度
        phyManager.gravity = cc.v2(0, -960);
        // 在屏幕上创建第一个水果,参数level，位置pos，刚体类型初始化为静态
        this.createFruit(1, cc.v2(0, 320), cc.RigidBodyType.Static);

        // 注册一个时间，如果游戏通知创建水果，就在这里创建水果
        // 用户自定义事件
        // on 注册消息
        // 注册创建水果事件
        cc.systemEvent.on('createFruit', this.createFruit, this);
        // 注册创建爆炸事件
        cc.systemEvent.on('createBoom', this.createBoom, this);
    },
    start() {

    },

    // 创建水果（把水果预制资源实例化）
    // 1 随机一个图片的水果 用来给用户操作 
    // 2 两个水果合并的时候 创建他们的升级水果
    //    水果的属性里面 需要插入一个表示等级的数值 

    createFruit(level, pos, type) {
        // 合成大西瓜后
        if (level > 11) {
            return;
        } else if (level === 11) {
            // 技术合成了一个大西瓜
        }
        // 实例化水果预制件
        let pre = ResMgr.getInstance().getPrefabs('Fruit');
        let fruit = cc.instantiate(pre);
        // 将水果节点挂到根节点上
        fruit.parent = this.node;
        // 获取实例化的预制件上的Fruit脚本
        let fruitJs = fruit.getComponent('Fruit');
        // 初始化水果的需要的参数，传给fruit用
        fruitJs.init(level, pos, type);
    },

    createBoom(level, pos,radius) {
        //  创建一个空节点，存放加载爆炸的果汁
        let node = new cc.Node();
        // 设在传入的节点上
        node.position = pos;
        node.parent = this.node;
        for (let i = 0; i < 20; i++) {
            // 创建飞往随机方向的果汁
            let juiceL = new cc.Node();
            juiceL.parent = node;
            // 增加果汁粒的Sprite组件
            let spriteCom = juiceL.addComponent(cc.Sprite);
            // 获取对应的图片资源
            let key = 'juice_l_' + level;
            spriteCom.spriteFrame = ResMgr.getInstance().getSpriteFrame(key);

            let angle = Math.random()*Math.PI*2;
            let x = radius*Math.cos(angle);
            let y = radius*Math.sin(angle);

            /**
             * 缓动作用对象
             * 缓动时长，{缓动目的地，缓动过程中scale的变化}，{淡入淡出效果}
             * 缓动完毕之后调用的函数，参数为函数，此处输入匿名函数
             * 启动缓动系统
             */
            
            let time = Math.random();
            // 调用缓动系统
            cc.tween(juiceL)
            .to(time,{position:cc.v2(x,y),scale:0.5},{easing:'sineOutIn'})
            .call(()=>{
                juiceL.destroy();
            })
            .start();
        }

    }



    // update (dt) {},
});
