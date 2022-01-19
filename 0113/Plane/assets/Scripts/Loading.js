
import {ResMgr} from 'ResMgr'
cc.Class({
    extends: cc.Component,

    properties: {
       bar:cc.ProgressBar,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        // 下载resource里面的全部资源,形参去官网看文档
        cc.resources.loadDir('',(finish,total,item)=>{
            // 完成进度的函数
            // 访问Loading节点的组件Bar的progress属性
            this.bar.progress = finish/total;
        },(err,assets)=>{
            // 下载完资源，跳转场景
            // 使用ResMgr存储下载的资源
            // console.log(assets);// 下载好的资源都在assets中
            // 遍历下载到的所有资源
            assets.forEach(asset =>{
                ResMgr.getInstance().setRes(asset.name,asset);
            });


            cc.director.loadScene('Game');
        });
    },

    start () {

    },

    // update (dt) {},
});
