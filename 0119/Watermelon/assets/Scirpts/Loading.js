import ResMgr from "./ResMgr"

cc.Class({
    extends: cc.Component,

    properties: {
        // 加载资源的进度条
        bar: cc.ProgressBar,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        // 下载资源
        cc.resources.loadDir('', (finish, total, item) => {
            this.bar.progress = finish / total;
        }, (err, assets) => {
            // 下载完成函数
            assets.forEach(asset => {
                // 将资源存放到RrsMgr匿名类的map中
                ResMgr.getInstance().setRes(asset.name, asset);
            });

            // 生成GameRoot预制件的实例
            let gameRootPre = ResMgr.getInstance().getPrefabs('GameRoot');
            let gameRoot = cc.instantiate(gameRootPre);
            // 挂到当前父节点
            gameRoot.parent = this.node.parent;
            // 存放完毕之后销毁进度条节点
            this.node.destroy();
        });
    },

    start() {

    },

    // update (dt) {},
});
