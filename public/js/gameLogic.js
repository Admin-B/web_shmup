var g_EventRegister=[];
var g_isReqeustKeyPress=[];
var g_isKeyPress=[];
var g_fps=64;
var g_timegap=1000/g_fps;

var g_now=(new Date()).getTime();


function GAME(){
	function GAME_LOOP(stamp){
		var nowTime=(new Date()).getTime();
		/***************************Update****************************************/
		var index=0;
		for(var i=0; i<g_EventRegister.length; i++){//등록된 이벤트가 있다면
			if(!g_EventRegister[i]){
				index++;
				continue;
			}
			g_EventRegister[i].callback();
			 
			if(g_EventRegister[i].o===true){
				continue;
			}
			g_EventRegister[i]=undefined;
		}

		if(index==g_EventRegister.length){
			g_EventRegister=[];
		}

		OnUpdate(nowTime);

		background.UpdateFrame(nowTime);

		sp_player.UpdateFrame(nowTime);
		DOM_updatePlayerStat();

		//플레이어 총알처리
		for(var i=0; i<sp_Pbullets.length; i++){
			sp_Pbullets[i].UpdateFrame(nowTime);
		}
		for(var i=0; i<anermys.length; i++){
			anermys[i].sprite.UpdateFrame(nowTime);
			//적 총알처리
			var temp=0;
			for(var j=0; j<anermys[i].bullets.length; j++){
				if(!CollisionDetection(anermys[i].bullets[j],{mDx:-100,mDy:-100,mWidth:cWidth+200,mHeight:cHeight+200})){
					temp++;
					continue;
				}
				anermys[i].bullets[j].UpdateFrame(nowTime);
			}
			if(temp==anermys[i].bullets.length){
				anermys[i].bullets=[];
			}
		}


		if(nowWaveIndex+1<WAVE.length){
			if(inWindow(anermys[WAVE[nowWaveIndex+1]].sprite)){ //다음 웨이브의 첫 오브제가 화면안에있다면
				nowWaveIndex++; //다음 웨이브로 갱신
			}
			if(nowWaveIndex+1<WAVE.length){
				var startIndex=nowWaveIndex==0 ? 0 : WAVE[nowWaveIndex-1]+1;
				var endIndex  =nowWaveIndex==0 ? WAVE[nowWaveIndex] : WAVE[nowWaveIndex];
				var waveTemp=0;
				for(var i=startIndex; i<=endIndex; i++){
					if(anermys[i].hp<=0){
						waveTemp++;
					}
				}
				if(waveTemp==endIndex-startIndex+1){
					startIndex=WAVE[nowWaveIndex]+1;
					var posGap=Math.abs(anermys[startIndex].sprite.mDy)-anermys[startIndex].sprite.mHeight;
					for(var j=startIndex; j<anermys.length; j++){
						anermys[j].sprite.mDy+=posGap;
					}
					nowWaveIndex++; //다음 웨이브로 이동
				}			
			}
		}

		for(var i=0; i<explosions.length; i++){
			explosions[i].UpdateFrame(nowTime);
		}
		/***************************Render****************************************/

		c.clearRect(0,0,cWidth,cHeight);
		background.Draw();

		sp_player.Draw();
		for(var i=0; i<sp_Pbullets.length; i++){
			sp_Pbullets[i].Draw();
		}

		//draw anermys
		//적 총알이 가장위로
		for(var i=0; i<anermys.length; i++){
			anermys[i].sprite.Draw();
			//적 총알처리	
			for(var j=0; j<anermys[i].bullets.length; j++){
				anermys[i].bullets[j].Draw();
			}
		}

		for(var i=0; i<explosions.length; i++){
			explosions[i].Draw();
		}
		OnRender();

		/**************************************************************************/
		window.requestAnimationFrame(GAME_LOOP);
	}

	function OnUpdate(nowTime){
		for(var i=0; i<anermys.length; i++){
			var anermy=anermys[i];

			if(inWindow(anermy.sprite)){
				for(var j=0; j<sp_Pbullets.length; j++){
					if(CollisionDetection(sp_Pbullets[j],anermy.sprite)){
						sp_Pbullets[j].mCount=0;
						--anermy.hp;
						if(typeof anermy.getDamage=="function"){
							anermy.getDamage();
						}
						if(anermy.hp<=0){
							anermy.sprite.mCount=0;
							if(typeof anermy.nohp=="function"){
								anermy.nohp();
							}
						}
					}	
				}
			}
			
			var aCollide=false;
			for(var k=0; k<sp_player.geometry.length; k++){
				if(aCollide===true){
					break;
				}
				if(anermy.sprite.geometry){
					for(var l=0; l<anermy.sprite.geometry.length; l++){
						if(_GeometryCollisionDetection(sp_player,sp_player.geometry[k],anermy.sprite,anermy.sprite.geometry[l])){
							player.getDamage();
							aCollide=true;
							break;
						}	
					}
				}else{
					if(GeometryCollisionDetection(sp_player,sp_player.geometry[k],anermy.sprite)){
						player.getDamage();
						aCollide=true;
					}
				}

				for(var j=0; j<anermy.bullets.length; j++){
					var aBullet=anermy.bullets[j];
					if(aBullet.geometry){
						var temp;
						for(var l=0; l<aBullet.geometry.length; l++){
							if(_GeometryCollisionDetection(sp_player,sp_player.geometry[k],aBullet,aBullet.geometry[l])){
								//주인공이 적 총알에 맞았을 시
								aBullet.mCount=0;
								player.getDamage();
								aCollide=true;
								break;
							}
						}
						if(aCollide===true){
							break;
						}
					}else{
						if(GeometryCollisionDetection(sp_player,sp_player.geometry[k],aBullet)){
							//주인공이 적 총알에 맞았을 시
							aBullet.mCount=0;
							player.getDamage();
							aCollide=true;
							break;
						}						
					}
				}
			}


		}
	}
	function OnRender(){

	}

	window.addEventListener("keyup",function(e){
		g_isKeyPress[e.keyCode]=false;

		const Rindex=g_isReqeustKeyPress[e.keyCode];
		g_EventRegister[Rindex]=undefined;
		g_isReqeustKeyPress[e.keyCode]=undefined;
		switch(e.key){
			case "A":
			case "a":
			case "Z":
			case "z":
				if(!g_isKeyPress[65] && !g_isKeyPress[90]){
					sp_player.ReleaseTimer();
				}
		}
	});

	window.addEventListener("keydown",function(e){
		g_isKeyPress[e.keyCode]=true;
		switch(e.key){
			case "ArrowLeft":
				requestEvent(e.keyCode,function(){
					sp_player.mDx-=player.movingSpeed;
					if(sp_player.mDx<0){
						sp_player.mDx=0;
					}
				},true);
				break;
			case "ArrowRight":
				requestEvent(e.keyCode,function(){
					sp_player.mDx+=player.movingSpeed;
					if(sp_player.mDx+sp_player.mWidth>cWidth){
						sp_player.mDx=cWidth-sp_player.mWidth;
					}
				},true);
				break;pla

			case "ArrowUp":
				requestEvent(e.keyCode,function(){
					sp_player.mDy-=player.movingSpeed;
					if(sp_player.mDy<0){
						sp_player.mDy=0;
					}
				},true);
				break;

			case "ArrowDown":
				requestEvent(e.keyCode,function(){
					sp_player.mDy+=player.movingSpeed;
					if(sp_player.mDy+sp_player.mHeight>cHeight){
						sp_player.mDy=cHeight-sp_player.mHeight;
					}
				},true);
				break;
			case "A":
			case "a":
			case "Z":
			case "z":
				var bulletType=prototype.bullet.blue;
				requestEvent(e.keyCode,function(){
					sp_player.mTimer={
						callback:function(){
							shootBullet(player,bulletType,0,-2000,{y:0});
						},
						delay:player.shootDelay,			
					}
				});
				break;

		}
	});
	window.requestAnimationFrame(GAME_LOOP);
}

