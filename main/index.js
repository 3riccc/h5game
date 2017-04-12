"use strict";

// 初始化
init(50,"mylegend",800,450,gameInit); 


// 初始化一些参数
var world;  
var JS_FILE_PATH = "./main/";  
var LEVEL_FILE_PATH = "./data/"  
var loadData = [  
    {path:JS_FILE_PATH+"Main.js",type:"js"},
]; 

function gameInit(){
	// 为了看到缸体，开启debug模式
	LStage.setDebug(true);
    LStage.box2d = new LBox2d();   
  	// 加载资源
    LLoadManage.load(loadData,null,function(){  
        world = new Main();
        addChild(world);
        world.init();
    }); 
}