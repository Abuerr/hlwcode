
cc.Class({
    extends: cc.Component,

    properties: {
        // 预制体资源
        // bulletPre: cc.Prefab,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {
        // 改变子弹和飞机的位置
        // this.node.zIndex = 100;
        // 注册触摸移动事件：手机拖动飞机，在电脑上是鼠标拖动飞机
        this.node.on('touchmove', this.move, this);

        //定时器 定时执行某个回调函数
        // 调用产生子弹的函数
        this.schedule(this.fire, 0.2);
    },

    // 手指跟随手指触摸点移动的逻辑
    // 将动作触发的反应封装起来
    // e -》事件：触摸移动事件
    move(e) {
        // 
        // console.log(123);
        // 把移动过程的触点坐标赋值给当前节点的position
        // this.node.position = e.getLocation();// 这个效果比较生硬
        // 把两次触摸点之间的向量差加到当前节点的坐标上
        this.node.position = this.node.position.add(e.getDelta());
    },

    // 发射子弹
    fire() {
        // 先实例化预制件,预制件实例化城节点的方法cc.instantiate(预制件引用)
        // let bullet = cc.instantiate(this.bulletPre);
        // // 节点需要布局到场景中，则需要加载到某个父节点上
        // // 将实例化的子弹加载到Player的父节点GameRoot上
        // bullet.parent = this.node.parent;
        // // 子弹跟随Plane的位置
        // bullet.position = this.node.position;

        // 创建子弹-》调用BulletMgr里面的创建子弹的函数
        // 找到这个函数要先找到BulletMgr这个节点，通过同根节点来查找
        // 找到这个节点之后再调用这个函数
        // 找父节点node.parent
        // 找子节点node.getChildByName('节点名称')
        let bulletMgrs = this.node.parent.getChildByName('BulletMgr');
        // 获取节点的脚本 node.getComponent('组件名称/脚本名称')
        let bulletMgr = bulletMgrs.getComponent('BulletMgr');
         // 生成子弹,参数：飞机节点，方向，角度
        bulletMgr.createBullet(this.node,3100);
    },
    // update (dt) {},
});
