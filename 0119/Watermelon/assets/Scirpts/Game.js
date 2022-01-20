import ResMgr from "./ResMgr"

cc.Class({
    extends: cc.Component,

    properties: {

    },
    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.init();
        
        // 获取倒计时器脚本
        this.countDownNode = this.node.getChildByName('TimeClock');
        this.countDownJS = this.countDownNode.getComponent('CountDown');
    },

    init() {
        // 启动物理引擎
        let phyManager = cc.director.getPhysicsManager();
        phyManager.enabled = true;
        // 设置物理中的重力加速度
        phyManager.gravity = cc.v2(0, -1500);
        // 在屏幕上创建第一个水果,参数level，位置pos，刚体类型初始化为静态
        this.createFruit(1, cc.v2(0, 320), cc.RigidBodyType.Static);

        // 注册一个时间，如果游戏通知创建水果，就在这里创建水果
        // 用户自定义事件
        // on 注册消息
        // 注册创建水果事件
        cc.systemEvent.on('createFruit', this.createFruit, this);
        // 注册创建爆炸事件
        cc.systemEvent.on('createBoom', this.createBoom, this);

        this.names = {};
        this.names[0] = 'juice_l_';
        this.names[1] = 'juice_o_';
        this.names[2] = 'juice_q_';
    },
    start() {

    },

    // 创建水果（把水果预制资源实例化）
    // 1 随机一个图片的水果 用来给用户操作 
    // 2 两个水果合并的时候 创建他们的升级水果
    //    水果的属性里面 需要插入一个表示等级的数值 

    createFruit(level, pos, type) {
        // 合成大西瓜后或者时间停止就会停止生成新的水果
        this.isEnd(level);
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

    createBoom(level, pos, radius) {
        // 创建声音
        this.createBoomAudio();
        //  创建一个空节点，存放加载爆炸的果汁
        let node = new cc.Node();
        // 设在传入的节点上
        node.position = pos;
        node.parent = this.node;
        // 生成果粒
        this.createJuiceLO(level, node, this.names, radius);
        // 生成果汁
        this.createJuiceQ(level, node, this.names[2]);
    },


    // 生成果汁部分节点，设置图片
    createJuice(level, node, name) {
        let juice = new cc.Node();
        juice.parent = node;
        // 增加组件Sprite
        let spriteCom = juice.addComponent(cc.Sprite);
        // 获取对应的图片资源
        let key = name + level;
        let spriteFrame = ResMgr.getInstance().getSpriteFrame(key);
        // 设置图片
        spriteCom.spriteFrame = spriteFrame;
        return juice;
    },
    // 创建扁型果汁，传入父节点
    createJuiceLO(level, node, names, radius) {
        for (let i = 0; i < 10; i++) {
            // 创建飞往随机方向的果汁
            let nameOL = (Math.random() > 0.5) ? 0 : 1;
            let juiceL = this.createJuice(level, node, names[nameOL]);

            // 确定坐标
            let angle = Math.random() * Math.PI * 2;
            let x = radius * Math.cos(angle);
            let y = radius * Math.sin(angle);
            // 变换图片的角度
            juiceL.angle = angle * Math.PI * 3;

            /**
             * 缓动作用对象
             * 缓动时长，{缓动目的地，缓动过程中scale的变化}，{淡入淡出效果}
             * 缓动完毕之后调用的函数，参数为函数，此处输入匿名函数
             * 启动缓动系统
             */
            // 随机的持续时间
            let time = Math.random();
            // 调用缓动系统
            cc.tween(juiceL)
                .to(time, { position: cc.v2(x, y), scale: 0.5 }, { easing: 'sineOutIn' })
                .blink(time, 0.5, juiceL)
                .call(() => {
                    juiceL.destroy();
                })
                .start();
        }
    },

    // 生成果汁花
    createJuiceQ(level, node, name) {
        let juiceQ = this.createJuice(level, node, name);
        // 设置位置
        juiceQ.position = node.position;
        // console.log(juiceQ.position);
    },

    createBoomAudio() {
        // 播放爆炸音效
        let audio = ResMgr.getInstance().getAudio('boom');

        cc.audioEngine.play(audio, false, 1);

        // let a = cc.audioEngine.play(audio,false,1);
        // // 停止音效
        // cc.audioEngine.stop(a);
    },

    // 判断是否结束
    isEnd(level) {
        
        let time = this.countDownJS.time;
        if (level >= 11 || time<=0) {
            // 计时器停止计时
            this.countDownJS.endSign = true;
            return;
        }
    }




    // update (dt) {},
});
