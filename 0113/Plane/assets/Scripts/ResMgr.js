
// 自定义类 统一管理所有的资源
// 将资源存储在类的成员变量中，方便在开始界面点击开始之后，在游戏界面出现之前加载好游戏资源
export class ResMgr {

    // 用哈希表存储图片信息
    mapSpriteFrames = new Map();
    // 存储json资源
    mapJson = new Map();
    // 
    mapAtlas = new Map();

    // 构造函数
    constructor() {

    }


    checkType(asset) {
        if (asset instanceof cc.SpriteFrame) {
            this.mapSpriteFrames.set(asset.name, asset);
        }
        else if (asset instanceof cc.JsonAsset) {
            this.mapJson.set(asset.name, asset);
        } else if (asset instanceof cc.SpriteAtlas) {
            this.mapAtlas.set(asset.name, asset);
        }
    }

    // 存储spriteFrame资源的接口
    setRes(key, asset) {
        this.mapSpriteFrames.set(key, asset);
    }

    // 获取spriteFrame资源的接口,形参为图片信息的key
    getSpriteFrame(key) {
        // 首先 查看入参名称 是否是单张图片的名称
        // 如果有 那么直接返回这个图片是精灵帧
        // 获取key对应的value
        let spriteFrame = this.mapSpriteFrames.get(key);
        if (spriteFrame) {
            return spriteFrame;
        }
        // 如果不是单张图片的名称，就需要去图集Atlas里面获取
        // 遍历图集去获取
        // 数组from方法，把一系列的值 转化成数组
        let arr = Array.from(this.mapAtlas.values());
        for (let i = 0; i < arr.length; i++) {
            let spriteFrame = arr[i].getSpriteFrame(key);
            if (spriteFrame) {
                return spriteFrame;
            }
        }
        return null;
    }
    //
    getJson(key) {
        let jsonAsset = this.mapJson.get(key);
        return jsonAsset;
    }

    getDataById(key, id) {
        let json = this.mapJson.get(key).json;
        for (let i = 0; i < json.length; i++) {
            if (json[i].id === id) {
                return json[i];
            }
        }
    } 

    getJsonLen(key){
        let json = this.mapJson.get(key).json;
        return json.length;
    }
}

// 单例模式
let instance = null;
ResMgr.getInstance = () => {
    // 如果instance为空则赋值
    if (!instance) {
        instance = new ResMgr();
    }
    return instance;
}