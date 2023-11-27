let canvas = document.querySelector("canvas");
let audio = document.querySelector("audio");

canvas.width = 300
canvas.height = 300

let wave = new Wave(audio, canvas);

/*
Wave, Cubes, Circles, Glob, Shine, Square, Arcs.
*/

//SquareAnimation();
//ArcsAnimation();
//ShineAnimation();
//CirclesAnimation();
//CubesAnimation();
//WaveAnimation();
//GlobAnimation();

let SquareAnimationAdded, ArcsAnimationAdded, ShineAnimationAdded, CirclesAnimationAdded, CubesAnimationAdded, WaveAnimationAdded, GlobAnimationAdded = false;

function GlobAnimation() {
  if (!GlobAnimationAdded) {
    wave.addAnimation(
      new wave.animations.Glob({
        fillColor: {
          gradient: ["#9ADE7B", "#508D69", "#9ADE7B"],
          rotate: 90
        },
        lineColor: "white",
        glow: {
          strength: 15,
          color: "#FF8F8F"
        },
        lineWidth: 5,
        count: 30,
      })
    );
    GlobAnimationAdded = true;
  }else{
    wave.clearAnimations("Glob");
    GlobAnimationAdded = false;
  }
}

function WaveAnimation() {
  if (!WaveAnimationAdded) {
    wave.addAnimation(
      new wave.animations.Wave({
        lineColor: "white",
        lineWidth: 10,
        fillColor: {
          gradient: ["#FF9A8B", "#FF7A88", "#FF99AC"]
        },
        mirroredX: true,
        count: 5,
        rounded: true,
        frequencyBand: "base",
      })
    );
    WaveAnimationAdded = true;
  }else {
    wave.clearAnimations("Wave");
    WaveAnimationAdded = false;
  }
}

function CubesAnimation() {
  if (!CubesAnimationAdded) {
    wave.addAnimation(
      new wave.animations.Cubes({
        top: true,
        count: 60,
        cubeHeight: 10,
        fillColor: "#FFFF00",
        lineColor: "rgba(0,0,0,0)",
        radius: 1,
      })
    );
    CubesAnimationAdded = true;
  }else{
    wave.clearAnimations("Cubes");
    CubesAnimationAdded = false;
  }
}

function CirclesAnimation() {
  if (!CirclesAnimationAdded) {
    wave.addAnimation(
      new wave.animations.Circles({
        fillColor: {
          gradient: ["#FF9A8B", "#FF7A88", "#FF99AC"]
        },
        lineColor: {
          gradient: ["#FF9A8B", "#FF7A88", "#FF99AC"]
        },
        amplitude: 0.5,
        frequency: 6,
        lineWidth: 3,
        //mirrored: true,
        //count: 2,
      })
    );
    CirclesAnimationAdded = true;
  }else{
    wave.clearAnimations("Circles");
    CirclesAnimationAdded = false;
  }
}

function ShineAnimation() {
  if (!ShineAnimationAdded) {
    wave.addAnimation(
      new wave.animations.Shine({
        lineColor: "#FAD961",
        glow: {
          strength: 15,
          color: "#FAD961"
        },
        diameter: 300,
        lineWidth: 10,
      })
    );
    ShineAnimationAdded = true;
  }else{
    wave.clearAnimations("Shine");
    ShineAnimationAdded = false;
  }
}

function ArcsAnimation() {
  if (!ArcsAnimationAdded) {
    wave.addAnimation(
      new wave.animations.Arcs({
        lineWidth: 4,
        lineColor: {
          gradient: ["#21D4FD", "#B721FF"]
        },
        diameter: 500,
        fillColor: {
          gradient: ["#21D4FD", "#21D4FD", "#B721FF"],
          rotate: 45
        },
      })
    );
    ArcsAnimationAdded = true;
  }else{
    wave.clearAnimations("Arcs");
    ArcsAnimationAdded = false;
  }
}

function SquareAnimation() {
  if (!SquareAnimationAdded) {
    wave.addAnimation(
      new wave.animations.Square({
        lineColor: {
          gradient: ["#21D4FD", "#B721FF"]
        },
      })
    );
    SquareAnimationAdded = true;
  }else{
    wave.clearAnimations("Square");
    SquareAnimationAdded = false;
  }
}
