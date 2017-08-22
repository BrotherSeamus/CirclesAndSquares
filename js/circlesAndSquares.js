//Prototype to create circles
function Circle(radius){
	this.radius = radius;
	this.getArea = function(){
		return Math.round((3.14 * (this.radius * this.radius)) * 100)/100;
	};
	this.toString = function(){
		return "Circle: <br>Radius = " + this.radius + ", <br>Area = " + this.getArea();
	}
};

//Prototype to create squares
function Square(size){
	this.size = size;
	this.getArea = function(){
		return this.size * this.size;
	};
	this.toString = function(){
		return "Square: <br>Size = " + this.size + ", <br>Area = " + this.getArea();
	}
};

//function takes in arrays of circles and squares, returns arrays sorted in descending order
var sortDesc = function(circles, squares){
	var result = {
		circleSort: circles.sort(
				function(a,b){
					if(a.radius < b.radius){ return -1}
					if(a.radius > b.radius){return 1}
					return 0
				}
			).reverse(),
		squareSort: squares.sort(
				function(a,b){
					if(a.size < b.size){ return -1}
					if(a.size > b.size){return 1}
					return 0
				}
			).reverse()
	};

	return result;
};

//function generates 50 random circles and 50 random squares
var generateRandom = function(){
	var randoms = {
		circles: [],
		squares: []
	};

	for(i=0; i<50; i++){
		var radius = Math.floor((Math.random() * 100) + 1)/2;
		var size = Math.floor((Math.random() * 100) + 1);

		randoms['circles'].push(new Circle(radius));
		randoms['squares'].push(new Square(size));
	}

	return randoms
};

//Variable to hold the degree of rotation for squares
var rotation = 0;

//Function takes creates display of sorted random circles and squares
var displayAll = function(){
	var data = generateRandom();
	var dataSort = sortDesc(data.circles, data.squares);

	var circleDiv = document.getElementById("circles");
	var squareDiv = document.getElementById("squares");

	circleDiv.innerHTML = '';
	squareDiv.innerHTML = '';

	for(i=0; i<dataSort['circleSort'].length; i++){
		var circle = dataSort.circleSort[i];
		var circleWords = document.createElement('div');
		
		circleWords.className = 'circle';
		circleWords.innerHTML = '<div class="circlePic" style="height:'
			+circle.radius*2+'px; width:'
			+circle.radius*2+'px"></div>' 
			+circle.toString();

		circleDiv.appendChild(circleWords);
	}

	for(i=0; i<dataSort['squareSort'].length; i++){
		var square = dataSort.squareSort[i];
		var squareHTML = document.createElement('div');

		squareHTML.className = 'square';
		squareHTML.innerHTML = '<div class="squarePic" style="height:'
			+square.size+'px; width:'
			+square.size+'px; transform: rotate('
			+rotation+'deg);"></div>' 
			+square.toString();

		squareDiv.appendChild(squareHTML);
	}
}

//Function call by interval timer to re-render and rotate
var renderRotate = function() {
	rotation += 10;
	displayAll();
}

displayAll();

var interval = window.setInterval(renderRotate, 500);




