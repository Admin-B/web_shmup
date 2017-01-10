//스프라이트가 화면안에 있는지 확인
function inWindow(sprite){
	return CollisionDetection(sprite,{mWidth:cWidth,mHeight:cHeight,mDx:0,mDy:0})
}

//AABB 충돌
function CollisionDetection(s1,s2){
	if(s1.mCount==0 || s2.mCount==0){
		return false;
	}
	const x1=s1.mDx+s1.mWidth;
	const x2=s2.mDx+s2.mWidth;

	const y1=s1.mDy+s1.mHeight;
	const y2=s2.mDy+s2.mHeight;

	if((x1>=s2.mDx && x1<=x2 || s1.mDx>=s2.mDx && s1.mDx<=x2) && (y1>=s2.mDy && y1<=y2 || s1.mDy>=s2.mDy && s1.mDy<=y2)){
		return true;
	}
	if((x2>=s1.mDx && x2<=x1 || s2.mDx>=s1.mDx && s2.mDx<=x1) && (y2>=s1.mDy && y2<=y1 || s2.mDy>=s1.mDy && s2.mDy<=y1)){
		return true;
	}
}	

//update 단에서 이벤트로인한 처리를 일괄적으로하는데 이게 그 등록되는 함수
function requestEvent(keyCode,callback,o){ //o==true 라면 등록된 함수가 keyUp이벤트 발생전까지 함수가 유지됩니다.
	if(!isNaN(g_isReqeustKeyPress[keyCode])){
		return;
	}
	g_isReqeustKeyPress[keyCode]=g_EventRegister.push({
		callback:callback,
		o :o
	})-1;
}

//object를 입력하면(bullet배열 필수) 총알을 쏴줌
function shootBullet(target,prototype,vX,vY,origin,aX,aY){ //origin : 50% 100%
	var t=target.bullets;
	if(t.length>(target.maxBulletsIndex || MAX_BULLETS_INDEX)){
		t.shift();
	}
	t=t[t.push(new Sprite(prototype))-1];
	var oX=origin && !isNaN(origin.x) ? origin.x*(target.sprite.mWidth-t.mWidth)  /100 : (target.sprite.mWidth-t.mWidth)/2;
	var oY=origin && !isNaN(origin.y) ? origin.y*(target.sprite.mHeight-t.mHeight)/100 : target.sprite.mHeight-t.mHeight;

	t.mDx=target.sprite.mDx+oX;
	t.mDy=target.sprite.mDy+oY;

	if(!isNaN(vX)){
		t.mVx=vX;
		if(!isNaN(vY)){
			t.mVy=vY;
		}
	}
	if(!isNaN(aX) && !isNaN(aY)){
		t.mAx=aX;
		t.mAy=aY;
	}
}

//g=상대위치를 입력할 수 있음
function GeometryCollisionDetection(s1,g,s2){
	var temp={
		mDx:s1.mDx+g.mDx,
		mDy:s1.mDy+g.mDy,
		mWidth:g.mWidth,
		mHeight:g.mHeight,
		mCount:s1.mCount
	}
	return CollisionDetection(temp,s2);
}
function _GeometryCollisionDetection(s1,g1,s2,g2){
	var temp1={
		mDx:s1.mDx+g1.mDx,
		mDy:s1.mDy+g1.mDy,
		mWidth:g1.mWidth,
		mHeight:g1.mHeight,
		mCount:s1.mCount
	}
	var temp2={
		mDx:s2.mDx+g2.mDx,
		mDy:s2.mDy+g2.mDy,
		mWidth:g2.mWidth,
		mHeight:g2.mHeight,
		mCount:s2.mCount
	}
	return CollisionDetection(temp1,temp2);
}

function createExplosion(prototype,sprite){
	const target=explosions[explosions.push(new Sprite(prototype))-1];
	target.mDx=sprite.mDx+(sprite.mWidth-target.mWidth)/2;
	target.mDy=sprite.mDy+(sprite.mHeight-target.mWidth)/2;
}



//패턴제작에 관련된 함수들
function toSprite(s1,s2){ //두 스프라이트 s1에서 s2 사이의 방향벡터 return
	return normalize({
		x:(s2.mDx+s2.mWidth/2) -(s1.mDx+s1.mWidth/2),
		y:(s2.mDy+s2.mHeight/2)-(s1.mDy+s1.mHeight/2)
	});
}
//방향성 벡터를 만듦
function normalize(v){
	const s=Math.sqrt(Math.pow(v.x,2)+Math.pow(v.y,2));
	return 	{
		x:v.x/s,
		y:v.y/s
	}
}
//라디안 변환
function radian(degree){
	return Math.PI/180*degree;
}
function degree(radian){
	return 180/Math.PI*radian;
}

//방향벡터 얻기
function getDirection(degree){
	return{
		x:Math.cos(radian(degree)),
		y:-Math.sin(radian(degree))
	}
}

setTimeout(load_resources,500);
function load_resources(){
	if(Resources_List.length>=2){
		unlock_start_btn();
		return;
	}
	setTimeout(load_resources,500);
}
