// 资源管理类
export default class ResMgr {
    // 存放SpriteFrame资源
    mapSpriteFrames = new Map();
    // 存放Atlas资源
    mapAtlas = new Map();
    // 存放Json文件资源
    mapJsons = new Map();
    // 存放预制件资源
    mapPrefabs = new Map();
    // 存放声音资源
    mapAudio = new Map();

    // 计分器
    counterPoint = 0;
    time = 5;
    
    // 构造函数
    constructor() {

    }

    // 类型检查
    checkType(asset) {
        if (asset instanceof cc.SpriteFrame) {
            return 'mapSpriteFrames';
        } else if (asset instanceof cc.JsonAsset) {
            return 'mapJsons';
        } else if (asset instanceof cc.SpriteAtlas) {
            return 'mapAtlas';
        } else if (asset instanceof cc.Prefab) {
            return 'mapPrefabs';
        }else if (asset instanceof cc.AudioClip) {
            return 'mapAudio';
        }
        return null;
    }


    // 添加资源
    setRes(key, asset) {
        let type = this.checkType(asset);
        if (type) {
            this[type].set(key, asset);
        }
    }

    // 获取spriteFrame资源的接口
    getSpriteFrame(key) {
        // 首先查看入参名称 是否是单张图片的名称
        // 如果有，那么直接返回这个图片是精灵帧
        let spriteFrame = this.mapSpriteFrames.get(key);
        if (spriteFrame) {
            return spriteFrame;
        }

        // 数组from方法，把一系列的值转化成数组
        let arr = Array.from(this.mapSpriteFrames.values());
        for (let i = 0; i < arr.length; i++) {
            let spriteFrame = arr[i];
            if (spriteFrame) {
                return spriteFrame;
            }
        }

        return null;
    }

    // 获取全部的json文件资源
    getJson(key) {
        let jsonAsset = this.mapJsons.get(key);
        return JsonAsset;
    }

    // 根据key获取对应的json文件,根据id在json数据中找到对应的对象数据
    getDataById(key, id) {
        let json = this.mapJsons.get(key).json;
        for (let i = 0; i < json.length; i++) {
            return json[i];
        }
    }

    // 获取json文件的id个数
    getJsonLen(key) {
        let json = this.mapJsons.get(key).json;
        return json.length;
    }

    // 根据预制件名字获取对应的预制件资源
    getPrefabs(key) {
        return this.mapPrefabs.get(key);
    }

    getAudio(key){
        return this.mapAudio.get(key);
    }

}

// 单例设计模式
let instance = null;
ResMgr.getInstance = () => {
    if (!instance) {
        instance = new ResMgr();
    }
    return instance;
}