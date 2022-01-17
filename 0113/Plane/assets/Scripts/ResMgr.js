
// 自定义类 统一管理所有的资源
// 将资源存储在类的成员变量中，方便在开始界面点击开始之后，在游戏界面出现之前加载好游戏资源
class ResMgr{

    // 用哈希表存储图片信息
    mapSpriteFrames = new Map();
    // 存储json资源
    mapJson = new Map();


    // 构造函数
    constructor(){

    }


    checkoutType(){
        
    }

    // 存储spriteFrame资源的接口
    setSpriteFrame(key,spriteFrame){
        this.mapSpriteFrames.set(key,spriteFrame);
    }

    // 获取spriteFrame资源的接口,形参为图片信息的key
    getSpriteFrame(key){
        // 获取key对应的value
        let spriteFrame = this.mapSpriteFrames.get(key);
        return spriteFrame;
    }



}