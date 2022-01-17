
cc.Class({
    extends: cc.Component,

    properties: {
        // 敌机预制件
        enemyPre: cc.Prefab,
        // 子弹预制件
        // bulletPre: cc.Prefab,
        // json文件
        // spriteFrames:[cc.spriteFrame],
        enemyDt: cc.JsonAsset,
        speed: 200,//敌机的速度
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        // 用来存储图集资源
        let atlas = null;
        // 动态加载资源，一定是要在resources文件夹先得资源
        // 这个方法的回调函数是异步执行
        cc.resources.loadDir('Image', cc.SpriteAtlas, (err, frames) => {
            // 在浏览器的开发者工具中查看所需的文件
            // 获取图集
            for (let i = 0; i < frames.length; i++) {
                if (frames[i].name === 'enemy.plist') {
                    atlas = frames[i];
                }
            }
            // console.log(frames);

            // // 获取图集资源
            // let spriteFrames = atlas.getSpriteFrames();
            // // 删去前面两个无用的图片资源
            // spriteFrames.splice(0,2);

            // 资源加载完毕，开始创建敌机
            // 定时创建敌机，因为这是异步传输，等资源加载完毕之后才生成敌机
            this.schedule(() => {
                this.createEnemy(atlas);
            }, 1);
        });
    },

    start() {
        // console.log(this.enemyDt.JsonAsset);
    },

    // 创建敌人
    createEnemy(atlas) {
        // 实例化预制件
        let enemy = cc.instantiate(this.enemyPre);
        // 将敌人挂到敌人管理器上
        enemy.parent = this.node;
        // 随机选择一个敌机样式
        let id = Math.floor(Math.random() * this.enemyDt.json.length) + 2001;
        // 根据前面所随机选择的敌机id来找到对应的图片资源
        let data = this.getDataById(this.enemyDt.json,id);
        // 设置对应的图片名称S
        data.spriteFrame = atlas.getSpriteFrame(data.img);
        enemy.getComponent('Enemy').init(data);
    },

    update(dt) {
        for (let i = 0; i < this.node.children.length; i++) {
            let enemy = this.node.children[i];
            enemy.y -= this.speed * dt;
        }
    },
    // 输入数据json和传入制定的id
    getDataById(json,id){
        for (let i = 0; i < json.length; i++) {
            if(json[i].id === id){
                return json[i];
            }
        }
    }
});
