class Sprite{
	/*
		imageInfo
			: frame_count
			: width
			: height
			: sX
			: sY
			: frame_direction(right or bottom)
			: ani_time
			: update_time
			: dX
			: dY
			: last_frame
	*/
	constructor(src,imageInfo){
		if(typeof src=="object"){
			imageInfo=src;
			src=imageInfo.src;
			if(!src){
				return;
			}
		}

		var index;
		this.mWidth=imageInfo.width;
		this.mHeight=imageInfo.height;
		if((index=checkAleadyRecource(src)) !== false){
			this.mData = Resources_List[index];
			this.mWidth= imageInfo.width || this.mData.width;
			this.mHeight= imageInfo.height || this.mData.height;
		}else{
			this.mData = new Image();
			this.mData.src = src;
			this.mData.tSrc= src;

			Resources_List.push(this.mData);
			
			var th=this;

			this.mData.onload=function(){
				th.mWidth =imageInfo.width || this.width;
				th.mHeight=imageInfo.height || this.height;
			};
		}
		this.mOldAniTime=(new Date()).getTime();
		this.mAniTime=imageInfo.ani_time || 100;

		this.mOldUpdateTime=(new Date()).getTime();
		this.mUpdateTime=imageInfo.update_time || 10;

		this.mIndex = 0;
		
		//mCount 가 0 일 경우도 포함.
		this.mCount = !isNaN(imageInfo.frame_count) ? imageInfo.frame_count : 1;

		this.mSx=imageInfo.sX || 0;
		this.mSy=imageInfo.sY || 0;

		switch(imageInfo.frame_direction){
			case "left":
				this.mDirX=-1;
				this.mDirY=1;
				break;
			case "bottom":
				this.mDirX=0;
				this.mDirY=1;
				break;
			case "top":
				this.mDirX=0;
				this.mDirY=-1;
				break;
			default:
			case "right":
				this.mDirX=1;
				this.mDirY=0;
				break;
		}

		this.mDx=imageInfo.dX || 0;
		this.mDy=imageInfo.dY || 0;

		//pixel/sec
		this.mVx=imageInfo.vX || 0;
		this.mVy=imageInfo.vY || 0;

		this.mLastFrame=imageInfo.last_frame || undefined;
		
		this.mTimer=null;
		this.mTimerOldTime=(new Date()).getTime();

		this.currentTime=(new Date()).getTime();
		if(Array.isArray(imageInfo.geometry)){
			this.geometry=imageInfo.geometry;
		}

	}
	UpdateFrame(newTime){
		this.currentTime-=newTime;
		if(newTime-this.mOldAniTime >= this.mAniTime){
			this.mOldAniTime=newTime;
			if(this.mCount != 0){
				this.mIndex=++this.mIndex%this.mCount;
				if(this.mIndex==0 && typeof this.mLastFrame=="function"){
					this.mLastFrame();
				}

			}
		}
		
		if(newTime-this.mOldUpdateTime >= this.mUpdateTime){
			this.mOldUpdateTime=newTime;	
			this.mDx+=this.mVx/1000*this.mUpdateTime;
			this.mDy+=this.mVy/1000*this.mUpdateTime;
		}

		if(this.mCount!=0 && this.mTimer){
			if(this.mTimer.delay<=newTime-this.mTimerOldTime){
				this.mTimerOldTime=newTime;
				this.mTimer.callback();
			}
		}
	}
	Draw(){
		if(this.mCount===0){
			return false;
		}
		c.drawImage(this.mData,
					this.mSx+this.mIndex*this.mWidth*this.mDirX,  //sx
					this.mSy+this.mIndex*this.mHeight*this.mDirY, //sy
					this.mWidth, //swidth
					this.mHeight,//sheight
					this.mDx,
					this.mDy,
					this.mWidth,
					this.mHeight
					);
	}
	ReleaseTimer(){
		this.mTimer=null;
	}
}

function checkAleadyRecource(src){
	for(var i=0; i<Resources_List.length; i++){
		if(Resources_List[i].tSrc==src || Resources_List[i].src==src){
			return i;
		}
	}
	return false;
}
var Resources_List=new Array();