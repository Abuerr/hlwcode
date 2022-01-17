
cc.Class({
    extends: cc.Component,

    properties: {

    },


    // LIFE-CYCLE CALLBACKS:
    // 初始化的东西一般写到onLoad里面
    onLoad() {
        this.dir = cc.v2(0,0); 
        this.speed = 300;
    },

    start() {
    },

    // 初始化子弹的各项参数
    init(data) {
        // 设置方向
        this.setDir(data.dir);
        // 设置角度
        this.setAngle(data.angle)
        // 设置位置
        this.node.position = data.owner.position;
        // 把当前子弹的发射者保存起来
        this.owner = data.owner;
       
        // 设置子弹图片
        this.node.getComponent(cc.Sprite).spriteFrame = data.spriteFrame;
    },
    // 设置子弹的方向
    setDir(dir) {
        this.dir = dir;
    },
    // 设置子弹的角度
    setAngle(angle) {
        this.angle = angle;
    },

    update(dt) {
        // 竖向改变位置，速度乘以时间
        this.node.x += this.speed * dt * this.dir.x;
        this.node.y += this.speed * dt * this.dir.y;
    },
});
