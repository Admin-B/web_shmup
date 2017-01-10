const MAX_BULLETS_INDEX=50; // 하나의 오브젝트가 가질 수있는 총알의 최대 치.

/*********************************player*****************************/
var player={
	hp:10,
	score:0,
	movingSpeed:7,
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
//anermy0
(function(){
	anermys.push({
		hp:20,
		bullets:[],
		sprite:new Sprite(prototype.ship.saucer_skyblue),
		nohp:function(){
			createExplosion(prototype.explosion.medium,this.sprite);
		}
	});
	const anermy=anermys[0];
	anermy.sprite.mDy=-200;
	anermy.sprite.mVx=10;
	anermy.sprite.mVy=100;
	anermy.sprite.mTimer={
		delay:500,
		callback:function(){
			const sprite=anermy.sprite;
			if(inWindow(sprite)){ // 등장
				const toPlayer=toSprite(sprite,sp_player);
				shootBullet(anermy,prototype.bullet.small_red,toPlayer.x*800,toPlayer.y*800,{y:50});
			}
			if(sprite.mDy>=200){
				sprite.mVx=-10;
			}
		}	
	};
})();

//anermy1
(function(){
	anermys.push({
		hp:10,
		bullets:[],
		sprite:new Sprite(prototype.ship.saucer_skyblue),
		nohp:function(){
			createExplosion(prototype.explosion.medium,this.sprite);
		}
	});
	const anermy=anermys[1];
	anermy.sprite.mDx=cWidth-anermy.sprite.mWidth;
	anermy.sprite.mDy=-200;
	anermy.sprite.mVx=-10;
	anermy.sprite.mVy=100;
	anermy.sprite.mTimer={
		delay:500,
		callback:function(){
			const sprite=anermy.sprite;
			if(inWindow(sprite)){ // 등장
				const toPlayer=toSprite(sprite,sp_player);
				shootBullet(anermy,prototype.bullet.small_red,toPlayer.x*800,toPlayer.y*800,{y:50});
				if(sprite.mDy>=cHeight/2){
					sprite.mVx=10;
				}
				if(sprite.mDy>=200){
					sprite.mVx=10;
				}
			}
		}	
	};
})();
//anermy2
(function(){
	anermys.push({
		hp:10,
		bullets:[],
		maxBulletsCount:100,
		sprite:new Sprite(prototype.ship.saucer_red),
		nohp:function(){
			createExplosion(prototype.explosion.medium,this.sprite);
		}
	});
	const anermy=anermys[2];
	anermy.sprite.mDx=cWidth/2-anermy.sprite.mWidth/2;
	anermy.sprite.mDy=-250;
	anermy.sprite.mVy=50;
	anermy.sprite.mTimer={
		delay:1000,
		callback:function(){
			const sprite=anermy.sprite;
			if(inWindow(sprite)){
				for(var i=0; i<10; i+=0.5){
					shootBullet(anermy,prototype.bullet.small_red,(Math.cos(i)<0 ? -1 : 1)*100,Math.sin(i)*1000,{y:50});
				}
			}
		}
	}
})();

/***********************************************2WAVE********************************************************/
//anermy3
(function(){
	anermys.push({
		hp:20,
		bullets:[],
		maxBulletsCount:500,
		sprite:new Sprite(prototype.ship.saucer_darkblue),
		nohp:function(){
			createExplosion(prototype.explosion.medium,this.sprite);
		}
	});
	const anermy=anermys[3];
	anermy.sprite.mDx=cWidth/2;
	anermy.sprite.mDy=-350;
	anermy.sprite.mVy=20;
	anermy.sprite.mTimer={
		delay:700,
		callback:function(){
			const sprite=anermy.sprite;
			if(inWindow(sprite)){
				var index=0;
				for(var i=0; i<50; i++){
					if(index>=Math.Pi*2){
						break
					}
					shootBullet(anermy,prototype.bullet.small_red,Math.cos(index)*500,Math.sin(index)*500,{y:50});
					index+=0.5;
				}
				sprite.mVx+=3;
				sprite.mVy+=1;
			}
		}
	};
})();

//anermy4
(function(){
	anermys.push({
		hp:20,
		bullets:[],
		maxBulletsCount:500,
		sprite:new Sprite(prototype.ship.saucer_darkblue),
		nohp:function(){
			createExplosion(prototype.explosion.medium,this.sprite);
		}
	});
	const anermy=anermys[4];
	anermy.sprite.mDx=cWidth/2-anermy.sprite.mWidth;
	anermy.sprite.mDy=-350;
	anermy.sprite.mVy=20;
	anermy.sprite.mTimer={
		delay:700,
		callback:function(){
			const sprite=anermy.sprite;
			if(inWindow(sprite)){
				var index=0;
				for(var i=0; i<50; i++){
					if(index>=Math.Pi*2){
						break
					}
					shootBullet(anermy,prototype.bullet.small_red,Math.cos(index)*500,Math.sin(index)*500,{y:50});
					index+=0.5;
				}
				sprite.mVx-=3;
				sprite.mVy+=1;
			}
		}
	};
})();
/***********************************************3WAVE********************************************************/
//anermy5
(function(){
	anermys.push({
		hp:20,
		bullets:[],
		maxBulletsCount:500,
		sprite:new Sprite(prototype.ship.saucer_darkblue),
		nohp:function(){
			createExplosion(prototype.explosion.medium,this.sprite);
		}
	});
	const anermy=anermys[5];
	anermy.sprite.mDx=10;
	anermy.sprite.mDy=-550;
	anermy.sprite.mVy=20;
	anermy.sprite.mTimer={
		delay:500,
		callback:function(){
			const sprite=anermy.sprite;
			if(inWindow(sprite)){
				var index=0;
				for(var i=0; i<50; i++){
					if(index>=Math.Pi*2){
						break
					}
					shootBullet(anermy,prototype.bullet.small_red,Math.cos(index)*500,Math.sin(index)*500,{y:50});
					index+=0.5;
				}
				sprite.mVy=300;
				if(sprite.mDy>=0){
					sprite.mVy=0;
					sprite.mVx=100;
				}

			}
		}
	}
})();
//anermy6
(function(){
	anermys.push({
		hp:20,
		bullets:[],
		maxBulletsCount:500,
		sprite:new Sprite(prototype.ship.saucer_darkblue),
		nohp:function(){
			createExplosion(prototype.explosion.medium,this.sprite);
		}
	});
	const anermy=anermys[6];
	anermy.sprite.mDx=cWidth-10-anermy.sprite.mWidth;
	anermy.sprite.mDy=-550;
	anermy.sprite.mVy=20;
	anermy.sprite.mTimer={
		delay:500,
		callback:function(){
			const sprite=anermy.sprite;
			if(inWindow(sprite)){
				var index=0;
				for(var i=0; i<50; i++){
					if(index>=Math.Pi*2){
						break
					}
					shootBullet(anermy,prototype.bullet.small_red,Math.cos(index)*500,Math.sin(index)*500,{y:50});
					index+=0.5;
				}
				sprite.mVy=300;
				if(sprite.mDy>=0){
					sprite.mVy=0;
					sprite.mVx=-100;
				}

			}
		}
	}
})();

/***********************************************4WAVE********************************************************/
//anermy7
(function(){
	anermys.push({
		hp:20,
		bullets:[],
		maxBulletsCount:1000,
		sprite:new Sprite(prototype.ship.saucer_darkblue),
		nohp:function(){
			createExplosion(prototype.explosion.medium,this.sprite);
		}
	});
	const anermy=anermys[7];
	anermy.sprite.mDx=cWidth/2-anermy.sprite.mWidth/2;
	anermy.sprite.mDy=-650;
	anermy.sprite.mVy=20;
	anermy.getDamage=function(){
		this.bulletCount=50;
		this.bulletSpeed=1000;
		var sIndex=Math.cos(anermy.sprite.mDx);
		var index =sIndex;
		for(var i=0; i<this.bulletCount; i++){
			if(index>=Math.Pi*2){
				break
			}
			shootBullet(this,prototype.bullet.small_red,Math.cos(index)*this.bulletSpeed,Math.sin(index)*this.bulletSpeed,{y:50});
			index+=0.5;
		}
	};
	anermy.bulletCount=5;
	anermy.sprite.mTimer={
		delay:1000,
		callback:function(){
			const sprite=anermy.sprite;
			if(inWindow(sprite)){
				var index=0;
				for(var i=0; i<anermy.bulletCount; i++){
					if(index>=Math.Pi*2){
						break
					}
					shootBullet(anermy,prototype.bullet.small_red,Math.cos(index)*anermy.bulletSpeed,Math.sin(index)*anermy.bulletSpeed,{y:50});
					index+=0.5;
				}
				anermy.bulletCount=10;
				anermy.bulletSpeed=200;
				sprite.mVy=300;
				if(sprite.mDy>=0){
					sprite.mVy=20;
					sprite.mVx=0;
				}

			}
		}
	}
})();




//각 웨이브마다 몇번쨰 anermy 배열까지가 하나의 웨이브인지 정의
//gamelogic에서는 한 웨이브의 적이 없어지면, 다음웨이브의 적들의 y좌표를 바로 앞까지 떙겨 온다.
const WAVE=[2,4,6,7];
var nowWaveIndex=0;


/**************************************************************/
//ITEM:new Sprite(bulletPrototype)

/***********************explosion******************************/
var explosions=[];

var background=new Sprite("./resources/img/background1.png",{
	width:c.width,
	dY:-2100,
	vY:20,
});