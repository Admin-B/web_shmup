const MAX_BULLETS_INDEX=100; // 하나의 오브젝트가 가질 수있는 총알의 최대 치.
/*********************************player*****************************/
var player={
	hp:3,
	score:0,
	movingSpeed:5,
	noDamage:false,//무적상태
	noDamageDuration:2500, //무적상태 지속시간

	shootDelay:100,
	sprite:new Sprite(prototype.plane.red),
	bullets:new Array(),
	getDamage:function(){
		if(player.noDamage===true){ //플레이어가 무적상태가 아니라면
			return;
		}

		--this.hp;
		DOM_damage();
		if(this.hp<=0){
			//게임오버
		}

		//무적상태 설정
		this.noDamage=true;

		setTimeout(function(){
			player.noDamage=false;
		},this.noDamageDuration);
	}
};
var sp_player  =player.sprite,
	sp_Pbullets=player.bullets;

sp_player.mDx=cWidth/2-sp_player.mWidth/2;
sp_player.mDy=500;
DOM_updatePlayerStat();

/*********************************anermys*****************************/
//:hp
//:bullets
//:sprite
//:nohp
//코드의 직관화를 위해 길게 서술함.
//anermy 배열 순서는 y좌표가 큰 순서대로 서술.
//정지속도 = 20 -- 화면이 움직이는 속도

var anermys=new Array();
/***********************************************1WAVE********************************************************/
/*
//anermy0
(function(){
	anermys.push({
		hp:20,
		bullets:[],
		sprite:new Sprite(prototype.ship.saucer_skyblue),
		maxBulletsIndex:1000,
		nohp:function(){
			createExplosion(prototype.explosion.medium,this.sprite);
		}
	});
	const anermy=anermys[0];
	anermy.sprite.mDx=0;
	anermy.sprite.mDy=-100;
	anermy.sprite.mVx=0;
	anermy.sprite.mVy=20;
	anermy.sprite.mOnUpdate=function(){
		if(inWindow(this)){
			this.mVy=200;
			if(anermy.sprite.mDy>=0){
				this.mVy=0;
			}
		}
	}
	anermy.sprite.mTimer={
		delay:500,
		callback:function(){
			if(inWindow(anermy.sprite)){
				var toPlayer=toSprite(anermy.sprite,sp_player);
				var startAngle=degree(Math.acos(toPlayer.x));
				for(var i=startAngle-10; i<startAngle+10; i+=5){
					shootBullet(anermy,prototype.bullet.small_red,Math.cos(radian(i))*100,Math.sin(radian(i))*100,{y:50});
				}
			}
		}
	}
})();
(function(){
	anermys.push({
		hp:20,
		bullets:[],
		sprite:new Sprite(prototype.ship.saucer_skyblue),
		maxBulletsIndex:1000,
		nohp:function(){
			createExplosion(prototype.explosion.medium,this.sprite);
		}
	});
	const anermy=anermys[1];
	anermy.sprite.mDx=cWidth-anermy.sprite.mWidth;
	anermy.sprite.mDy=-100;
	anermy.sprite.mVx=0;
	anermy.sprite.mVy=20;
	anermy.sprite.mOnUpdate=function(){
		if(inWindow(this)){
			this.mVy=200;
			if(anermy.sprite.mDy>=0){
				this.mVy=0;

			}
		}
	}
	anermy.sprite.mTimer={
		delay:500,
		callback:function(){
			if(inWindow(anermy.sprite)){
				var toPlayer=toSprite(anermy.sprite,sp_player);
				var startAngle=degree(Math.acos(toPlayer.x));
				for(var i=startAngle-10; i<startAngle+10; i+=5){
					shootBullet(anermy,prototype.bullet.small_red,Math.cos(radian(i))*100,Math.sin(radian(i))*100,{y:50});
				}
			}
		}
	}
})();

(function(){
	anermys.push({
		hp:20,
		bullets:[],
		sprite:new Sprite(prototype.ship.saucer_skyblue),
		maxBulletsIndex:1000,
		nohp:function(){
			createExplosion(prototype.explosion.medium,this.sprite);
		}
	});
	const anermy=anermys[2];
	anermy.sprite.mDx=cWidth-anermy.sprite.mWidth;
	anermy.sprite.mDy=-500;
	anermy.sprite.mVx=0;
	anermy.sprite.mVy=20;
	anermy.sprite.mOnUpdate=function(){
		if(inWindow(this)){
			this.mVy=200;
			if(anermy.sprite.mDy>=0){
				this.mVy=0;
			}
		}
	}
	anermy.sprite.mTimer={
		delay:200,
		callback:function(){
			if(inWindow(anermy.sprite)){
				var toPlayer=toSprite(anermy.sprite,sp_player);
				var startAngle=degree(Math.acos(toPlayer.x));
				for(var i=startAngle-10; i<startAngle+10; i+=5){
					shootBullet(anermy,prototype.bullet.small_red,Math.cos(radian(i))*100,Math.sin(radian(i))*100,{y:50});
				}
			}
		}
	}
})();
(function(){
	anermys.push({
		hp:20,
		bullets:[],
		sprite:new Sprite(prototype.ship.saucer_skyblue),
		maxBulletsIndex:1000,
		nohp:function(){
			createExplosion(prototype.explosion.medium,this.sprite);
		}
	});
	const anermy=anermys[3];
	anermy.sprite.mDx=0;
	anermy.sprite.mDy=-800;
	anermy.sprite.mVx=0;
	anermy.sprite.mVy=20;
	anermy.sprite.mOnUpdate=function(){
		if(inWindow(this)){
			this.mVy=200;
			if(anermy.sprite.mDy>=0){
				this.mVy=0;
			}
		}
	}
	anermy.sprite.mTimer={
		delay:200,
		callback:function(){
			if(inWindow(anermy.sprite)){
				var toPlayer=toSprite(anermy.sprite,sp_player);
				var startAngle=degree(Math.acos(toPlayer.x));
				for(var i=startAngle-10; i<startAngle+10; i+=5){
					shootBullet(anermy,prototype.bullet.small_red,Math.cos(radian(i))*100,Math.sin(radian(i))*100,{y:50});
				}
			}
		}
	}
})();
*/
/***********************************************2WAVE********************************************************/
(function(){
	anermys.push({
		hp:40,
		bullets:[],
		sprite:new Sprite(prototype.ship.saucer_red),
		maxBulletsIndex:1000,
		nohp:function(){
			createExplosion(prototype.explosion.medium,this.sprite);
		}
	});
	const anermy=anermys[0];
	anermy.sprite.mDx=cWidth/2-anermy.sprite.mWidth/2;
	anermy.sprite.mDy=-100;
	anermy.sprite.mVx=0;
	anermy.sprite.mVy=20;
	anermy.sprite.mOnUpdate=function(){
		if(inWindow(this)){
			if(!this.check){
				this.mVy=200;
				this.mVx=-100;
				this.check=true;
			}
			if(this.mDy>=0){
				this.rC=true;
			}
			if(this.rC){
				if(this.mDx<=0 || this.mDx>=cWidth-this.mWidth){
					this.mVx*=-1;
				}
				if(this.mDy>=cHeight-this.mHeight || this.mDy<=0){
					this.mVy*=-1;	
				}				
			}
		}
	}
	anermy.sprite.mTimer={
		delay:200,
		callback:function(){
			if(inWindow(anermy.sprite)){
				var toPlayer=toSprite(anermy.sprite,sp_player);
				var startAngle=degree(Math.acos(toPlayer.x));
				var a=degree(Math.asin(toPlayer.y));

				for(var i=-30; i<30; i+=5){
					shootBullet(anermy,prototype.bullet.small_red,Math.cos(radian(startAngle+i))*300,Math.sin(radian(a+i))*300,{y:50});
				}
			}
		}
	}
})();
(function(){
	anermys.push({
		hp:50,
		bullets:[],
		sprite:new Sprite(prototype.ship.saucer_red),
		maxBulletsIndex:1000,
		nohp:function(){
			createExplosion(prototype.explosion.medium,this.sprite);
		}
	});
	const anermy=anermys[1];
	anermy.sprite.mDx=cWidth/2-anermy.sprite.mWidth/2;
	anermy.sprite.mDy=-500;
	anermy.sprite.mVx=0;
	anermy.sprite.mVy=20;
	anermy.sprite.mOnUpdate=function(){
		if(inWindow(this)){
			if(!this.check){
				this.mVy=200;
				this.mVx=-100;
				this.check=true;
			}
			if(this.mDy>=0){
				this.rC=true;
			}
			if(this.rC){
				if(this.mDx<=0 || this.mDx>=cWidth-this.mWidth){
					this.mVx*=-1;
				}
				if(this.mDy>=cHeight-this.mHeight || this.mDy<=0){
					this.mVy*=-1;	
				}				
			}
		}
	}
	anermy.sprite.mTimer={
		delay:200,
		callback:function(){
			if(inWindow(anermy.sprite)){
				var toPlayer=toSprite(anermy.sprite,sp_player);
				var startAngle=degree(Math.acos(toPlayer.x));
				var a=degree(Math.asin(toPlayer.y));

				for(var i=-30; i<30; i+=5){
					shootBullet(anermy,prototype.bullet.small_red,Math.cos(radian(startAngle+i))*300,Math.sin(radian(a+i))*300,{y:50});
				}
			}
		}
	}
})();
//각 웨이브마다 몇번쨰 anermy 배열까지가 하나의 웨이브인지 정의
//gamelogic에서는 한 웨이브의 적이 없어지면, 다음웨이브의 적들의 y좌표를 바로 앞까지 떙겨 온다.
const WAVE=[0,1];
var nowWaveIndex=0;


/**************************************************************/
//ITEM:new Sprite(bulletPrototype)

/***********************explosion******************************/
var explosions=[];

var background=new Sprite(prototype.background.map1);
