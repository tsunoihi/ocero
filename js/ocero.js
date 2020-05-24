jQuery(document).ready(function(){
	jQuery('table').on('click', ".blue",function(){
		var turn = jQuery("#turn").attr("class");
		var index_x = jQuery(this).index();
		var index_y = jQuery(this).parent('tr').index();
		var another_color = getAnotherColor(turn);
		jQuery('tr').eq(index_y).children('td').eq(index_x).addClass(turn,another_color);
		change(index_x,index_y,turn,another_color);
		//ターンの変更処理
		jQuery('#turn').removeClass();
		jQuery('#turn').addClass(another_color);
		check(another_color);
	});
	check('white');
	
});

function check(color){
	var my_color = color;
	var another_color = "";
	if(my_color == "white"){
		another_color = "black";
	}else{
		another_color = "white";
	}
	//初期化
	jQuery('td').removeClass('blue');
	jQuery('td.' + another_color).each(function(){
		var x = jQuery(this).index();
		var y = jQuery(this).parent('tr').index();
		var array = [
			{ x:-1,y:-1},
			{ x:-1,y: 0},
			{ x:-1,y: 1},
			{ x: 0,y:-1},
			{ x: 0,y: 1},
			{ x: 1,y:-1},
			{ x: 1,y: 0},
			{ x: 1,y: 1}
			];
		array.forEach(function(value) {
			if(y + value.y < 0 || y + value.y > 7 || x + value.x < 0 || x + value.x > 7){
				return true;
			}
			point = jQuery('tr').eq(y + value.y).children('td').eq(x + value.x);
			if(point.hasClass('white') == false && point.hasClass('black') == false && point.hasClass('blue') == false){
				for (var i=1; i<7; i++) {
					if(y - value.y*i < 0 || y - value.y*i > 7 || x - value.x*i < 0 || x - value.x*i > 7){
						break;
					}
					var p = jQuery('tr').eq(y - value.y*i).children('td').eq(x - value.x*i);
					if(p.hasClass(another_color) == false && p.hasClass(my_color) == false){
						break;
					}
					if(p.hasClass(my_color)){
						point.addClass("blue");
						return true;
					}
				};
			}
		});
	});
}

function getAnotherColor(color){
	if(color == "white"){
		return "black";
	}else{
		return "white";
	}
}

function change(x,y,my_color,another_color){
	var array = [
		{ x:-1,y:-1},
		{ x:-1,y: 0},
		{ x:-1,y: 1},
		{ x: 0,y:-1},
		{ x: 0,y: 1},
		{ x: 1,y:-1},
		{ x: 1,y: 0},
		{ x: 1,y: 1}
		];
	array.forEach(function(value) {
		point = jQuery('tr').eq(y + value.y).children('td').eq(x + value.x);
		for (var i=1; i<8; i++) {
			if(y - value.y*i < 0 || y - value.y*i > 7 || x - value.x*i < 0 || x - value.x*i > 7){
				break;
			}
			var p = jQuery('tr').eq(y - value.y*i).children('td').eq(x - value.x*i);
			if(p.hasClass(another_color) == false && p.hasClass(my_color) == false){
				break;
			}
			if(p.hasClass(my_color)){
				for(var j=1; j <= i; j++){
					var p2 = jQuery('tr').eq(y - value.y*j).children('td').eq(x - value.x*j);
					p2.removeClass();
					p2.addClass(my_color);
				}
				return true;
					
			}
		};
	});
}