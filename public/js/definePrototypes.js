const prototype={
	bullet:{
		blue:{
			src   :"./resources/img/bullets.png",
			width :24,
			height:35,
			sX    :66,
			sY    :110,
			frame_direction:"top",
			frame_count    :4,
		},
		green:{
			src   :"./resources/img/bullets.png",
			width :24,
			height:35,
			sX    :9,
			sY    :110,
			frame_direction:"top",
			frame_count:4
		},
		small_red:{
			src:"./resources/img/CustomShots-2.png",
			width:8,
			height:8,
			sX:1,
			sY:1
		},
		medium_red:{
			src:"./resources/img/CustomShots-2.png",
			width:16,
			height:15,
			sX:0,
			sY:203,
		},
		big_red:{
			src:"./resources/img/CustomShots-2.png",
			width:62,
			height:62,
			sX:1,
			sY:329,
			geometry:[
			{
				mWidth:30,
				mHeight:30,
				mDx:18,
				mDy:18
			}
			]
		}
	},
	ship:{
		saucer_skyblue:{
			src   :"./resources/img/ships_saucer.png",
			width :96,
			height:90,
			sX    :0,
			sY    :46,
			frame_count:7,
			geometry:[
			{
				mWidth:36,
				mHeight:36,
				mDx:30,
				mDy:23				
			}
			]
		},
		saucer_darkblue:{
			src   :"./resources/img/ships_saucer.png",
			width :96,
			height:90,
			sX    :0,
			sY    :269,
			frame_count:7,
			geometry:[
			{
				mWidth:36,
				mHeight:36,
				mDx:30,
				mDy:23				
			}
			]
		},	
		saucer_red:{
			src   :"./resources/img/ships_saucer.png",
			width :96,
			height:90,
			sX    :0,
			sY    :494,
			frame_count:7,
			geometry:[
			{
				mWidth:36,
				mHeight:36,
				mDx:30,
				mDy:23				
			}
			]
		},
		/*
		void_blue:{
			src   :"./resources/img/ships_void.png",
			width:48,
			height:80,
			sX:128,
			sY:0,
			frame_count:4
		}
		*/
	},
	plane:{
		red:{
			src   :"./resources/img/ships.png",
			width :32,
			height:43,
			sX    :0,
			sY    :144,
			geometry:[
			/*
				{
					mDx:0,
					mDy:25,
					mWidth:7,
					mHeight:14
				},
			*/
				{
					mDx:12,
					mDy:15,
					mWidth:8,
					mHeight:10
				},
			/*
				{
					mDx:23,
					mDy:25,
					mWidth:9,
					mHeight:14
				}
			*/
			]
			//frame_count:1,
		}
	},
	thing:{
		/*
		meteor:{
			brown:{
				xsmall:{
					src:"./resources/img/ships_asteroids.png",
					width:8,
					height:8,
					sX:4,
					sY:4
				},
				small:{
					src:"./resources/img/ships_asteroids.png",
					width:16,
					height:16,
					sX:16,
					sY:0
				}
			}
		}
		*/
	},
	explosion:{
		xsmall:{
			src:"./resources/img/sprites.png",
			sY:117,
			sX:0,
			width:39,
			height:38,
			ani_time:50,
			frame_count:13,
			last_frame:function(){
				this.mCount=0;			
			}
		},
		medium:{
			src:"./resources/img/explosion.png",
			sX:470,
			width:156,
			frame_count:16,
			last_frame:function(){
				this.mCount=0;
			}
		}
	},
	background:{
		map1:{
			src:"./resources/img/background1.png",
			width:c.width,
			dY:-2100,
			vY:20
		}
	},
	heroes:{
		src:"./resources/img/heroes.png",
		width:200,
		height:200
	}
};

