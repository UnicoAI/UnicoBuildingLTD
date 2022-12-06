// initiat variables

var animData = {
  container: document.getElementById('arrow-right'),
  renderer: 'svg',
  loop: false,
  autoplay: true,
  path: 'https://gist.githubusercontent.com/rodolfosarno/6661830baa97573e7f18a0508dbfffff/raw/34cb060243c4c3f0ba94eb9e9b8e8a29bc2ada52/Arrow.json'
};
var anim = bodymovin.loadAnimation(animData);

var animData = {
  container: document.getElementById('arrow-left'),
  renderer: 'svg',
  loop: false,
  autoplay: true,
  path: 'https://gist.githubusercontent.com/rodolfosarno/6661830baa97573e7f18a0508dbfffff/raw/34cb060243c4c3f0ba94eb9e9b8e8a29bc2ada52/Arrow.json'
};
var anim = bodymovin.loadAnimation(animData);


// get Cursor

const cursor = document.querySelector('.my-cursor'); 

$(window).mousemove(function(e) { 
TweenMax.to(cursor, 0.3, {
left: e.clientX,
top: e.clientY,
ease: Power3.easeOut
})
});


$(".arrow-json-right, .arrow-json-left").on("mouseenter", function() {
TweenMax.to(cursor, 0.4, {
css:{backgroundColor:"rgb(0,188,235,0.2)", width:"80px", height:"80px"},
ease: Back.easeOut.config(1.5)	
})  
});

$(".arrow-json-right, .arrow-json-left").on("mouseleave", function() {
TweenMax.to(cursor, 0.4, {
css:{backgroundColor:"rgb(0,188,235,1)", width:"15px", height:"15px"},
width: 15,
height: 15,
ease: Back.easeOut.config(1.5)	
})  
});


// Particles JS

particlesJS("particles-js", {
"particles": {
  "number": {
      "value": 80,
      "density": {
          "enable": false,
          "value_area": 800
      }
  },
  "color": {
      "value": "#005073"
  },
  "shape": {
      "type": "circle",
      "stroke": {
          "width": 0,
          "color": "#000000"
      },
      "polygon": {
          "nb_sides": 5
      },
      "image": {
          "src": "img/github.svg",
          "width": 100,
          "height": 100
      }
  },
  "opacity": {
      "value": 0.4,
      "random": true,
      "anim": {
          "enable": true,
          "speed": 1,
          "opacity_min": 0,
          "sync": false
      }
  },
  "size": {
      "value": 3,
      "random": true,
      "anim": {
          "enable": false,
          "speed": 4,
          "size_min": 0.3,
          "sync": false
      }
  },
  "line_linked": {
      "enable": false,
      "distance": 150,
      "color": "#ffffff",
      "opacity": 0.4,
      "width": 1
  },
  "move": {
      "enable": true,
      "speed": 1,
      "direction": "none",
      "random": true,
      "straight": false,
      "out_mode": "out",
      "bounce": false,
      "attract": {
          "enable": false,
          "rotateX": 600,
          "rotateY": 600
      }
  }
},
"interactivity": {
  "detect_on": "canvas",
  "events": {
      "onhover": {
          "enable": false,
          "mode": "bubble"
      },
      "onclick": {
          "enable": true,
          "mode": "push"
      },
      "resize": true
  },
  "modes": {
      "grab": {
          "distance": 400,
          "line_linked": {
              "opacity": 1
          }
      },
      "bubble": {
          "distance": 250,
          "size": 0,
          "duration": 2,
          "opacity": 0,
          "speed": 3
      },
      "repulse": {
          "distance": 400,
          "duration": 0.4
      },
      "push": {
          "particles_nb": 4
      },
      "remove": {
          "particles_nb": 2
      }
  }
},
"retina_detect": true
});
var count_particles, update;


// Partallan Code


function partallanDraw() {
text = $('#TextInput').val();

var Partallan = (function(window){

var W = window.innerWidth,
H = window.innerHeight,
text = "Unico",
stage = new PIXI.Container(),

renderer = PIXI.autoDetectRenderer(W-1, H, {view:document.getElementById("canvas"), transparent: true, antialias : true, résolution: 2}),

//Play with this parameter for the number of particle 
//lower make more particle.
skipCount = renderer instanceof PIXI.WebGLRenderer ? 3 : 9,
particlesLength = 0,
mouseX= 0,
mouseY = 0,
PI_2 = Math.PI*2,
particles = [],

//Play with this parameter for the particle speed
viscosity   = 0.001,
minDistSq = 1000;


var explode = false;

var _private = {
randomise: function(min,max){
return Math.floor(Math.random()*(max-min+1)+min);
},
setrequest: function(){
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame    ||
    function( callback ){
      window.setTimeout(callback, 1000 / 60);
    };
})();
},
};

var Partallan = {
init: function(textInput){
text = textInput;
_private.setrequest();
this.writeText();
},
writeText: function(){
var textSample = new PIXI.Text(text, { font: '200px Calibri, sans-serif', fill: 'black', align: 'left' });
textSample.position.x = (W/2) - (textSample.width/2);
textSample.position.y = (H/2) - (textSample.height/2);

// Now, we need to save the positions of black pixels and then use it to move particule
var imageData = textSample.context.getImageData(0, 0, textSample.width,textSample.width);
var data = imageData.data;


// We'll now iterate over the data array going through rows and columns
// Instead of reading each pixel, we can skip over some to increase the performance
for (var i = 0; i < imageData.height; i += skipCount) {
  for (var j = 0; j < imageData.width; j += skipCount) {
    var color = data[(j * imageData.width * 4) + (i * 4) - 1];
    // Now if the color is black, we'll do our stuff
    if(color === 255) {
      particles[particles.length] = this.createParticle();
      particles[particles.length - 1].setPos(i+((W/2) - (textSample.width/2)), j+((H/2) - textSample.height +75));
    }
  }
}

particlesLength = particles.length;

 // ctx.shadowBlur = 6;
 // ctx.shadowColor = '#CCC';
renderer.view.onmousemove = function(evt){
  mouseX = evt.clientX;
  mouseY = evt.clientY;
};
},

createParticle: function(){
var particle = {};
particle.random = Math.random();
particle.valX = 0;
particle.valY = 0;
particle.vitesse = _private.randomise(3,10)/300;
particle.degree = Math.random() * 2;
particle.rayon = Math.random() * 5;
particle.direct = Math.random() < 0.5 ? (particle.vitesse=particle.vitesse*(-1)) : true;
particle.r = _private.randomise(1,3);
particle.opacity = Math.random();
particle.mass = 0.05 + Math.random() * 0.9;
particle.x = 10;
particle.y = 10;
particle.fx = 0;
particle.fy = 0;
particle.vx = 0;
particle.vy = 0;
particle.ox = 0;
particle.oy = 0;
particle.dx = 0;
particle.dy = 0;
particle.dSq = 0;
particle.f = 0;
particle.a = 0;
particle.pointTexture = new PIXI.Texture.fromImage("https://i.ibb.co/HC1Dvxb/Blue-Particle-2.png");
particle.pixiCircle = new PIXI.Sprite(particle.pointTexture, {x:0, y:0, width:1, height:1});
particle.pixiCircle.scale.x = particle.random;
particle.pixiCircle.scale.y = particle.random;
particle.pixiCircle.alpha = particle.random > .99 ? 1 : Math.random();
stage.addChild(particle.pixiCircle);

// create a filter



// Finally a function to set particle's function and save original pos
particle.setPos = function(x, y) {
  this.ox = x;
  this.oy = y;
  this.x = _private.randomise(-100,W+100);
  this.y = _private.randomise(-100,H+100);
};

//Function to (re)move particle
particle.move = function(){
  this.dx = mouseX - this.ox;
  this.dy = mouseY - this.oy;
  this.dSqr = this.dx*this.dx + this.dy*this.dy;

  //if particule is in the repulsion area 
  if( this.dSqr < minDistSq ) {
      this.dx = mouseX - this.x;
      this.dy = mouseY - this.y;
      this.dSqr = this.dx*this.dx + this.dy*this.dy;
      
      // Force is proportional to distance
      this.f = this.dSqr / minDistSq;
      this.f = this.f < 0 ? 0 : this.f > 1 ? 1 : this.f;
      
      // Find angle for velocity
      this.a = Math.atan2(this.dy,this.dx);
      
      //attraction ou repulsion
      this.f = -this.f;
      
      // Sum forces
      this.fx += Math.cos(this.a) * this.f;
      this.fy += Math.sin(this.a) * this.f;
  }
  
  this.fx += (this.ox - this.x) * viscosity * this.mass;
  this.fy += (this.oy - this.y) * viscosity * this.mass;
  
  // Euler integration step
  this.vx += this.fx / this.mass;
  this.vy += this.fy / this.mass;
  
  this.x += this.vx;
  this.y += this.vy;
  
  // Dampen velocity
  this.vx *= 0.95;
  this.vy *= 0.95;
  
  // Clear forces
  this.fx = this.fy = 0;    
  // Compute squared distance

  //make particule move (turn) by itself
  this.valX = this.x+(this.rayon * Math.cos(Math.PI*this.degree));
  this.valY = this.y+(this.rayon * Math.sin(Math.PI*this.degree));
  //increment to the next degree
  this.degree+=this.vitesse;
  this.pixiCircle.position.x = this.valX;
  this.pixiCircle.position.y = this.valY;


};
return particle;
},
step: function(){
for (var i = 0; i < particlesLength; i++) {
  particles[i].move();
}
renderer.render(stage);

window.requestAnimFrame(Partallan.step);
},
start: function(){
window.requestAnimFrame(Partallan.step);
},
setExplode : function(val){
console.log(val);
explode = val;
if(val){
  minDistSq = 120000;
  mouseX = (W/2);
  mouseY = (H/2);
}else{
  setTimeout(function(){
    minDistSq = 3000;
    mouseX = 0;
    mouseY = 0;
  }, 1500);
}
}
};
return Partallan;
})(window);

Partallan.init(text);
Partallan.start();

}

// Window Resize

$( window ).resize(function() { 
if($(window).innerWidth() < 700) {
$('#TextInput').val("Unico");
}
else {
$('#TextInput').val(arr[0]);
}
partallanDraw();
});

// Array of Text

var arr = ['Unico', 'Windows', 'Doors','UK'];
var i = 0;


//Window on Load

$( window ).ready(function() { 
if($(window).innerWidth() < 700) {
$('#TextInput').val("Unico");
}
else {
$('#TextInput').val(arr[0]);  
}
partallanDraw();
});


//Next - Previous

function nextItem() {
i = i + 1; // increase i by one
i = i % arr.length; // if we've gone too high, start from `0` again
return arr[i]; // give us back the item of where we are now
}

function prevItem() {
if (i === 0) { // i would become 0
  i = arr.length; // so put it at the other end of the array
}
i = i - 1; // decrease by one
return arr[i]; // give us back the item of where we are now
}

window.addEventListener('load', function () {
document.getElementById('TextInput').value = arr[0]; // initial value
document.getElementById('arrow-left').addEventListener(
  'click', // we want to listen for a click
  function (e) { // the e here is the event itself
      document.getElementById('TextInput').value = prevItem();
      partallanDraw();
 }
);

document.getElementById('arrow-right').addEventListener(
  'click', // we want to listen for a click
  function (e) { // the e here is the event itself
      document.getElementById('TextInput').value = nextItem();
      partallanDraw();
  }
);
});


// Move Canvas

/* $(window).mousemove(function(event) {
$(".textParticles").css({
"margin-left": -(event.pageX * 0.09),
"margin-top": -(event.pageY * 0.09)
});  
});  */