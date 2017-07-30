const plateau = {};

//get user input for x and y properties of plateau object
const userGridSize = prompt("please enter an 'x' and a 'y' coordinate for plateau size. Integers separated by a space");

//parse user input into an array of strings
gridSize = userGridSize.split(' ');

//make sure user input is entered correctly
if(!checkValidCoordinates(gridSize)) {
  throw new Error("Invalid Coordinates, Start Again");
}

//assign properties on plateau object
gridSize.forEach((coordinate, i) => {
  if(i === 0) {
    plateau.x = parseInt(coordinate);
  } else {
    plateau.y = parseInt(coordinate);
  }
});

//build up an array of rover objects. Use prompts to get rover info. Each prompt checked for validity
const rovers = [];

class Rover  {
  constructor(name,heading,x,y,direction) {
    this.name = name;
    this.heading = heading;
    this.x = x;
    this.y = y;
    this.direction = direction;
  }
}

const roverPrompt = prompt("how many rovers would you like to deploy?");
const numRovers = parseInt(roverPrompt);
if(!checkNumRovers(numRovers)) {
  throw new Error("Enter a number betwen 1-9");
}

//on each iteration create a new rover and push to the rovers array
for (let i = 0; i < numRovers; i++) {
  rovers.push(new Rover());

  let name = prompt(`what is the name of rover #${i + 1}`);
  if(!checkValidName(name)) {
    throw new Error('you must input a name');
  }

  let heading = prompt("please enter a heading. Use only 'L','R', or 'M'");
  if(!checkValidHeading(heading)) {
    throw new Error("Invalid Heading, Start Again");
  }

  let position = prompt('please enter a starting position x, y, and direction (ex. 2 6 N)');
  if(!checkValidPosition(position)) {
    throw new Error('enter a valid position. Double check your rover position is not greater than the size of the plateau');
  }

  //assign rover all user validated inputed properties
  rovers[i].name = name;
  rovers[i].heading = heading;
  //split the user inputed position (ex. '4 8 W') into separate x, y, and direction properties on rover object.
  position.split(' ').forEach((input, index) => {
    if(index === 0) {
      rovers[i].x = parseInt(input);
    } else if(index === 1) {
      rovers[i].y = parseInt(input);
    }else {
      rovers[i].direction = input;
    }
  });
}

let movedRovers = rovers.map((rover) => {

  let headingArray = rover.heading.split('');
  headingArray.forEach((letter) => {
    if(letter === 'L' && rover.direction === 'N'){
      rover.direction = 'W';
    } else if (letter === 'L' && rover.direction === 'E') {
      rover.direction = 'N';
    } else if (letter === 'L' && rover.direction === 'S') {
      rover.direction = 'E';
    } else if (letter === 'L' && rover.direction === 'W') {
      rover.direction = 'S';
    } else if (letter === 'R' && rover.direction === 'N') {
      rover.direction = 'E';
    } else if (letter === 'R' && rover.direction === 'E') {
      rover.direction = 'S';
    } else if (letter === 'R' && rover.direction === 'S') {
      rover.direction = 'W';
    } else if (letter === 'R' && rover.direction === 'W') {
      rover.direction = 'N';
    } else if (letter === 'M' && rover.direction === 'N') {
      rover.y++;
        if(rover.y > plateau.y) {
          throw new Error('your rover has fallen from the plateau');
        }
    } else if (letter === 'M' && rover.direction === 'E') {
      rover.x++;
        if(rover.x > plateau.x) {
          throw new Error('your rover has fallen from the plateau');
        }
    } else if (letter === 'M' && rover.direction === 'S') {
      rover.y--;
        if(rover.y < 0) {
          throw new Error('your rover has fallen from the plateau');
        }
    } else if (letter === 'M' && rover.direction === 'W') {
      rover.x--;
      if(rover.x < 0) {
          throw new Error('your rover has fallen from the plateau');
        }
    }
});
    return rover;
});

let finalLocations = movedRovers.forEach((rover) => {
  console.log(`the rover '${rover.name}' has a final location of ${rover.x} ${rover.y} ${rover.direction}` );
});


//test functions
function checkValidCoordinates(gridSize) {
  return gridSize.length === 2 && !isNaN(gridSize[0]) && !isNaN(gridSize[1]);
}

function checkValidName(name) {
  return name.length > 0;
}

function checkNumRovers(numRovers) {
  return numRovers < 10 && !isNaN(numRovers);
}

function checkValidHeading(heading) {
  return heading.length > 0 && heading.split('').every((letter) => {
    return letter === 'L' || letter === 'R' || letter === 'M';
  }) ? true : false;
}

function checkValidPosition(position) {
  position = position.split(' ');
  return position.length === 3 && !isNaN(position[0]) && !isNaN(position[1]) && plateau.x >= position[0] && plateau.y >= position[1] && position[2] === 'N' || position[2] === 'S' || position[2] === 'E' || position[2] === 'W'
}
