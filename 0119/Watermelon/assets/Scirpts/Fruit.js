import ResMgr from "./ResMgr"
cc.Class({
    extends: cc.Component,

    properties: {

    },

    onLoad() {
        // 获取物理组件刚体
        this.phyBody = this.node.getComponent(cc.RigidBody);
        this.phyColl = this.getComponent(cc.PhysicsCircleCollider);
        // 获取counter结点
        this.ct = this.node.parent.getChildByName("CounterPoint");
        this.cd = this.node.parent.getChildByName("TimeClock");
        // 获取Counter的Label的string属性
        // 获取

        
    },


    start() {

        // 触摸拖动水果 参数：事件名 调用函数 this
        this.node.on('touchmove', this.moveX, this);
        // 触摸结束 水果物理类型设置为动态就会自动下降
        this.node.on('touchend', this.moveend, this);
        // 如果鼠标在游戏界面外则取消触摸，水果自动掉落
        this.node.on('touchcancel', this.moveend, this);

        
    },
    // 用于激活game创建水果的消息
    emitMsg(level, pos, type) {
        // 发送消息的时候 传送三个参数过去
        cc.systemEvent.emit('createFruit', level, pos, type);
    },
    // 当鼠标松开不控制水果的移动，或者鼠标到达了界面之外则改变水果的type
    moveend() {
        // 取消触摸事件
        this.node.off('touchmove', this.moveX, this);
        // 改变水果刚体的type为Dynamic
        this.setPhyType(cc.RigidBodyType.Dynamic);

    },
    // 鼠标拖动水果
    moveX(e) {
        
        this.node.x += e.getDeltaX();
        // 如果鼠标到了墙边则限制水果的坐标,因为水果的规模缩小了一倍所以要除以4
        if (this.node.x <= this.wl) {
            this.node.x = this.wl;
        } else if (this.node.x >= this.wr) {
            this.node.x = this.wr;
        }
    },

    // 设置水果的刚体组件的type属性
    setPhyType(type) {
        this.phyBody.type = type;
    },
    // 设置水果预制件的实例的组件的spriteFrame资源
    setImg(level) {
        let key = 'fruit_' + level;
        let spriteFrame = ResMgr.getInstance().getSpriteFrame(key);
        this.getComponent(cc.Sprite).spriteFrame = spriteFrame;

        this.wl = -320 + this.node.width / 4;
        this.wr = 320 - this.node.width / 4;
    },
    // 设置刚体的半径大小
    setBodyRadius() {
        this.phyColl.radius = this.node.width / 2;
        // 刷新刚体属性，必须要调用这个函数
        this.phyColl.apply();
    },

    // 初始化水果的各项变量
    init(level, pos, type) {
        // 设置水果的位置
        this.node.position = pos;
        // 设置水果的大小
        this.node.scale = 0.5;
        // 设置水果的spriteFrame
        this.setImg(level);
        // 设置类型
        this.setPhyType(type);
        // 设置刚体大小
        this.setBodyRadius();
        // 存储传进来的level值，便于后续碰撞使用
        this.node.level = level;
        // 判断是否要创建下一个在上面的水果
        if (type === cc.RigidBodyType.Static) {
            // 标记还没有创建下一个
            this.isCreate = false;//水果已经掉落
        } else {
            this.isCreate = true;//水果还没有掉落
        }
        // 
        this.isCollison = false;
    },

    // 播放碰撞在地的声音
    playDrapOut(){
        let audio = ResMgr.getInstance().getAudio('knock');
        cc.audioEngine.play(audio,false,1);
    },

    // 只在两个碰撞体开始接触时被调用一次
    // 注意一下 两个一样的节点 进行碰撞 两个节点下的脚本都会执行这个函数
    // 限制这个函数执行两次
    onBeginContact(contact, self, other) {

        // 水果掉落没有碰到相同的水果，碰到了墙和地面
        // 则要在上面生成一个新的水果
        if (!this.isCreate && other.node.name !== 'LeftWall' && other.node.name !== 'RightWall') {
            // 发出掉落的声音
            this.playDrapOut();
            // 生成一个随机的数字
            let level = Math.floor(Math.random() * 5) + 1;
            // 发出生成水果的消息
            this.emitMsg(level, cc.v2(0, 320), cc.RigidBodyType.Static);
            this.isCreate = true;// 标记下一个在上面的水果已经生成
            return;
        }

        // 获取自身碰撞组件的节点上 所保存的level属性
        // 获取被碰撞的那个组件的节点上的level属性
        let selfLevel = this.node.level;
        let otherLevel = other.node.level;

        
        // 如果任何一个level是undefine的，那么说明这个节点不是水果则直接结束
        if (!otherLevel || !selfLevel) {
            return;
        }

        // 检测两个水果是否碰撞同时阻止另一个水果二次生成新的水果
        if (otherLevel === selfLevel) {
            // 防止重复生成合成的水果
            if (this.isCollison) {
                return;
            }
            // 设置另一个水果的isCollison为true，
            // 让另一个水果的脚本不生成新的水果
            other.node.getComponent('Fruit').isCollison = true;
            // 同时设置改水果的isColliosn为true,避免销毁不及时再次生成
            this.isCollison = true;
            // 标记为依据碰撞 才执行下面的代码
            // 加分
            this.addPoint(selfLevel);
            // 合成的水果的位置
            let otherPos = other.node.position;
            let selfPos = this.node.position;
            let pos = otherPos.y > selfPos.y ? selfPos : otherPos;
            // 发送消息让gameRoot创建新水果的函数
            this.emitMsg(selfLevel + 1, pos, cc.RigidBodyType.Dynamic);
            cc.systemEvent.emit('createBoom', selfLevel, pos,self.node.width);
            // 判断是否生成大西瓜
            this.isMelon(selfLevel + 1);
            // 销毁
            other.node.removeFromParent();
            self.node.removeFromParent();
        }

    },
    // 生成新的加分
    addPoint(level){
        
        // 修改结点的字符串
        // 获取脚本Counter
        let ctCom = this.ct.getComponent('Counter');
        // 调用修改方法
        ctCom.updateCounter(level);

    },

    // 如何合成了大西瓜就是等级为11的话
    isMelon(level) {
        if(level>=11){
            this.cd.getComponent('CountDown').endSign = true;
        }
    },



    // update (dt) {},
});
