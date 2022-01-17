
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
            this.bar.Progress = finish/total;
        },()=>{
            
        });
    },

    start () {

    },

    // update (dt) {},
});
