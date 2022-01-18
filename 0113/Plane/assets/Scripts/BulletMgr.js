import { ResMgr } from 'ResMgr'

cc.Class({
    extends: cc.Component,

    properties: {
        //  子弹预设体属性
        bulletPre: cc.Prefab,
        // 获取存放子弹媒体资源数据的json文件
        // bulletJson:cc.JsonAsset,
        // // 存放图集资源
        // atlas:cc.SpriteAtlas,
    },

    start() {

    },

    // 创建子弹
    createBullet(node, id) {
    
        let data = ResMgr.getInstance().getDataById('BulletData',id);
        data.spriteFrame = ResMgr.getInstance().getSpriteFrame(data.img);

        data.owner = node;

        // 预制体实例化成节点的方法
        let bullet = cc.instantiate(this.bulletPre);
        // 将其挂到子弹管理者节点上
        bullet.parent = this.node;
        // 获取子弹节点的组件（脚本）Bullet
        let bulletJs = bullet.getComponent('Bullet');
        // 获取随机的图集资源
        // 初始化子弹
        bulletJs.init(data);
    },

    // 在图集资源中根据id查找到对应的文件信息
    

});
