
function in_array(integer, array) {
	for (i = 0; i < array.length; i++) {
		if(array[i] == integer) {
			return true;
		}
	}
	return false;
}


function in_two_dimensional_array(x, y, array, length) {
	for (i = 0; i < length; i++) {
		if(array[i][0] == x && array[i][1] == y) {
			return true;
		}
	}
	return false;
}


function in_two_dimensional_array_body(x, y, array, length) {
	for (i = 1; i < length; i++) {
		if(array[i][0] == x && array[i][1] == y) {
			return true;
		}
	}
	return false;
}

$(document).ready(function(){
	
	var speed = 200;
	
	
	var level = 1;
	
	
	var key = 39;
	
	
	var keys = new Array(37, 38, 39, 40);
	
	
	var snake_body = new Array(100);
	snake_body[0] = new Array(2);
	snake_body[0][0] = 45;
	snake_body[0][1] = 30;
	snake_body[1] = new Array(2);
	snake_body[1][0] = 30;
	snake_body[1][1] = 30;
	snake_body[2] = new Array(2);
	snake_body[2][0] = 15;
	snake_body[2][1] = 30;
	snake_body[3] = new Array(2);
	snake_body[3][0] = 0;
	snake_body[3][1] = 30;
	
	var check_speed_before = 0;
	var check_speed_after = 0;
	
	
	var body_length = 4;
	
	
	var food = new Array(1);
	food[0] = new Array(2);
	food[0][0] = 0;
	food[0][1] = 0;
	
	
	var points = 0;
	
	
	function check_back_move(key_now, last_key) {
		switch(key_now) {
			case 37:
				if (39 == last_key) {
					return true;
				}
				break;
			case 38:
				if (40 == last_key) {
					return true;
				}
				break;
			case 39:
				if (37 == last_key) {
					return true;
				}
				break;
			case 40:
				if (38 == last_key) {
					return true;
				}
				break;
		}
		return false;
	}
	
	
	function game_over() {
		$(document).stopTime("timerik");
		$('#play').css('display', 'none');
		$('#pause').css('display', 'none');
		$('#game-over').css('display', 'block');
	}
	
	
	function pause() {
		$(document).stopTime("timerik");
		$('#play').css('display', 'inline');
		$('#pause').css('display', 'none');
		$('#pause-info').css('display', 'block');
	}
	
	
	function new_game() {
		$('#play').css('display', 'inline');
		$('#pause').css('display', 'none');
		$('#stop').css('display', 'inline');
	}
	
	
	function increase_speed() {
		speed = speed - 5;
		level++;
		$('#level').html(level);
	}
	
	
	function add_point() {
		points++;
		$('#points').html(points);
		if (0 == (points % 10)) {
			increase_speed();
		}
	}
	
	
	function increase_snake_body() {
		snake_body[body_length] = new Array(2);
		snake_body[body_length][0] = snake_body[body_length-1][0];
		snake_body[body_length][1] = snake_body[body_length-1][1];
		body_length++;
		var html_content = $('#playground').html();
		$('#playground').html(html_content+'<div class="snake" id="div'+body_length+'">&nbsp;</div>');
		$('#div'+body_length).css('left', snake_body[body_length-1][0]);
		$('#div'+body_length).css('top', snake_body[body_length-1][1]);
		add_point();
	}
	
	
	function grow_food() {
		var rand_no_x = Math.random();
		var food_x = (15 * Math.ceil(rand_no_x * 29));
		var rand_no_y = Math.random();
		var food_y = (15 * Math.ceil(rand_no_y * 29));
		
		if (in_two_dimensional_array(food_x, food_y, snake_body, body_length)) {
			grow_food();
		}
		else {
			increase_snake_body();
			food[0][0] = food_x;
			food[0][1] = food_y;
			$('#food').css('left', food_x);
			$('#food').css('top', food_y);
		}
	}
	
	
	function eat_food() {
		grow_food();
	}
	
	
	function check_food() {
		if (
			snake_body[0][0] == food[0][0] &&
			snake_body[0][1] == food[0][1]
		) {
			eat_food();
		}
	}
	
	
	function recalculate_snake_body() {
		for (i = (body_length-1); i >= 1; i--) {
			snake_body[i][0] = snake_body[i-1][0];
			snake_body[i][1] = snake_body[i-1][1];
		}
	}
	
	
	function move_snake_body() {
		for (i = (body_length-1); i >= 1; i--) {
			var x = snake_body[i][0]+'px';
			$('#div'+(i+1)).css('left', x);
			var y = snake_body[i][1]+'px';
			$('#div'+(i+1)).css('top', y);
		}
	}
	
	
	function turn_left() {
		var value;
		value = snake_body[0][0] - 15;
		if (0 <= value) {
			recalculate_snake_body();
			if (!in_two_dimensional_array_body(value, snake_body[0][1], snake_body, body_length)) {
				move_snake_body();
				snake_body[0][0] = value;
				value = value+'px';
				check_food();
				$('#div1').css('left', value);
			}
			else {
				game_over();
			}
		}
		else {
			game_over();
		}
	}
	
	
	function turn_up() {
		var value;
		value = snake_body[0][1] - 15;
		if (0 <= value) {
			recalculate_snake_body();
			if (!in_two_dimensional_array_body(snake_body[0][0], value, snake_body, body_length)) {
				move_snake_body();
				snake_body[0][1] = value;
				value = value+'px';
				check_food();
				$('#div1').css('top', value);
			}
			else {
				game_over();
			}
		}
		else {
			game_over();
		}
	}
	
	
	function turn_right() {
		var value;
		value = snake_body[0][0] + 15;
		if (435 >= value) {
			recalculate_snake_body();
			if (!in_two_dimensional_array_body(value, snake_body[0][1], snake_body, body_length)) {
				move_snake_body();
				snake_body[0][0] = value;
				value = value+'px';
				check_food();
				$('#div1').css('left', value);
			}
			else {
				game_over();
			}
		}
		else {
			game_over();
		}
	}
	
	
	function turn_down() {
		var value;
		value = snake_body[0][1] + 15;
		if (435 >= value) {
			recalculate_snake_body();
			if (!in_two_dimensional_array_body(snake_body[0][0], value, snake_body, body_length)) {
				move_snake_body();
				snake_body[0][1] = value;
				value = value+'px';
				check_food();
				$('#div1').css('top', value);
			}
			else {
				game_over();
			}
		}
		else {
			game_over();
		}
	}
	
	function refresh() {
		
		$(document).stopTime("timerik");
		
		
		$(document).everyTime(speed, 'timerik', function() {
			
			check_speed_before = speed;
			
			
			$(document).keydown(function(event) {
				if (in_array(event.keyCode, keys) && !check_back_move(event.keyCode, key) && 1 == check_end) {
					key = event.keyCode;
					check_end = 0;
				}
			});
			
			if (in_array(key, keys)) {
				switch(key) {
					case 37:
						turn_left();
						break;
					case 38:
						turn_up();
						break;
					case 39:
						turn_right();
						break;
					case 40:
						turn_down();
						break;
				}
			}
			
			check_speed_after = speed;
			
			if (check_speed_before != check_speed_after) {
				refresh();
			}
			
			check_end = 1;
		});
	}
	
	
	grow_food();
	
	
	$('#play').click(function(){
		var check_end = 0;
		$('#play').css('display', 'none');
		$('#pause').css('display', 'inline');
		$('#pause-info').css('display', 'none');
		
		refresh();
		
	});
	
	
	$('#pause').click(function(){
		pause();
	});
	
	
	$('#stop').click(function(){
		new_game();
	});
});
