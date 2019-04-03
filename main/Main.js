/**
 *Main.js
 *@author: Yorhom
 *http://blog.csdn.net/yorhomwang
*/
function Main(){
	var s = this;
	base(s,LSprite,[]);

	/**设置场景大小*/
	s.sceneWidth = 800;
	s.sceneHeight = 450;
}
Main.prototype.init = function(){
	var s = this;

	/**加入边框*/
	s.addBorder();
	/**加入路面*/
	s.addRoad();
	/**加入自行车*/
	s.addBicycle();
	/**加入循环事件*/
	s.addEventListener(LEvent.ENTER_FRAME,s.loop);
	LEvent.addEventListener(window,LKeyboardEvent.KEY_DOWN,function(e){
		s.onKeydown(e,s.bicycleObj);
	});
};
Main.prototype.addBorder = function(){
	var s = this;

	/**创建边框*/
	//设置边框尺寸
	var borderSize = 10;
	//顶部边框
	var topBorder = new LSprite();
	topBorder.x = s.sceneWidth/2;
	topBorder.y = 5;
	topBorder.addBodyPolygon(s.sceneWidth,borderSize,0);
	s.addChild(topBorder);
	//右部边框
	var rightBorder = new LSprite();
	rightBorder.x = s.sceneWidth-5;
	rightBorder.y = s.sceneHeight/2;
	rightBorder.addBodyPolygon(borderSize,s.sceneHeight,0);
	s.addChild(rightBorder);
	//底部边框
	var bottomBorder = new LSprite();
	bottomBorder.x = s.sceneWidth/2;
	bottomBorder.y = s.sceneHeight-5;
	bottomBorder.addBodyPolygon(s.sceneWidth,borderSize,0);
	s.addChild(bottomBorder);
	//左部边框
	var leftBorder = new LSprite();
	leftBorder.x = 5;
	leftBorder.y = s.sceneHeight/2;
	leftBorder.addBodyPolygon(borderSize,s.sceneHeight,0);
	s.addChild(leftBorder);
};
Main.prototype.addRoad = function(){
	var s = this;

	/**创建路面*/
	var roadObj = new Road(0,450);
	s.addChild(roadObj);
};
Main.prototype.addBicycle = function(){
	var radius = 30;
	var s = this;

	//创建自行车对象
	s.bicycleObj = new LSprite();
	s.bicycleObj.x = 50;
	s.bicycleObj.y = 400;
	s.bicycleObj.addBodyCircle(radius,30,30,1);
	s.bicycleObj.setBodyMouseJoint(false);
	
	window.gun = s.bicycleObj;
	s.addChild(s.bicycleObj);

};

Main.prototype.onKeydown = function(e,obj){
	// 力度
	var force = 1000;
	if(!!window.angle){
		// 角度 
		if(e.keyCode == 65){
			window.angle = window.angle + 1;
		}else if(e.keyCode == 90){
			window.angle = window.angle - 1;
		}else if(e.keyCode == 88){
			obj.moveVec = new LStage.box2d.b2Vec2();
			var a = window.angle * Math.PI / 180;
			// console.log(a)
			obj.moveVec.x = force * Math.cos(a);
			obj.moveVec.y = -force * Math.sin(a);
			obj.box2dBody.ApplyForce(obj.moveVec,obj.box2dBody.GetWorldCenter());
		}
		// console.log(window.angle);
	}else{
		window.angle = 1;
	}
}
// 添加气球
Main.prototype.addBallon = function(){
	var radius = 20;
	var s = this;
	s.ballonObj = new LSprite();
	s.ballonObj.x = 400;
	s.ballonObj.exist = true;
	s.ballonObj.y = 300;
	s.ballonObj.addBodyCircle(radius,100,2,1)
	s.ballonObj.setBodyMouseJoint(false);
	s.addChild(s.ballonObj);
	s.ballonObj.remove = function(){
		s.ballonObj.exist = false;
		s.ballonObj.parent.removeChild(s.ballonObj);
	};
	window.ballon = s.ballonObj;
	world.ballanceBallon(window.ballon);
	world.pushBallon(window.ballon);
}
Main.prototype.loop = function(event){
	var s = event.target;
	var bo = s.bicycleObj;
	/**设置场景位置*/
	s.x = LStage.width*0.5 - (bo.x + bo.getWidth()*0.5);
	s.y = LStage.height*0.5 - (bo.y + bo.getHeight()*0.5);
	/**处理位置*/
	if(s.x > 0){
		s.x = 0;
	}else if(s.x < LStage.width - s.sceneWidth){
		s.x = LStage.width - s.sceneWidth;
	}
	if(s.y > 0){
		s.y = 0;
	}else if(s.y < LStage.height - s.sceneHeight){
		s.y = LStage.height - s.sceneHeight;
	}
	
	if(window.ballon.exist){
		world.ballanceBallon(window.ballon);
	}
};
Main.prototype.ballanceBallon = function(obj){
	obj.moveVec = new LStage.box2d.b2Vec2();
	obj.moveVec.x = 0;
	obj.moveVec.y = -6.85;
	obj.box2dBody.ApplyForce(obj.moveVec,obj.box2dBody.GetWorldCenter());
};
Main.prototype.pushBallon = function(obj){
	obj.moveVec = new LStage.box2d.b2Vec2();
	obj.moveVec.x = 0;
	obj.moveVec.y = -100;
	obj.box2dBody.ApplyForce(obj.moveVec,obj.box2dBody.GetWorldCenter());
}
