'use-strict';

const $startStop = document.getElementById(`startStop`);
const $replay = document.getElementById(`replayRecording`);
const $cursor = document.getElementById(`cursor`);

let mouseMoves = [];
let isRecording = false;
let isPlaying = false;
let initalTime = 0;

window.addEventListener(`mousemove`, (event) => {
  if (isRecording) {
    mouseMoves.push({posX: event.clientX, posY: event.clientY, startTime: event.timeStamp - initalTime})
  }
})

$startStop.addEventListener(`click`, (event) => {
  if (!isPlaying) {
    initalTime = event.timeStamp 
    record()
  }
})

$replay.addEventListener(`click`, (event)  => {
  if(!isPlaying) {   
    isPlaying = true;
    $replay.innerHTML = `Replaying...`
    $replay.className = `is-replaying`;
    document.body.style.cursor = 'none';
    console.log(mouseMoves)
    replay(0)
    
  } else {
    isPlaying = false;
    $replay.innerHTML = `Replaying...`
    $replay.className = `is-replaying`;
  }
})

function record() {
  isRecording = !isRecording;
  if(isRecording) {
    mouseMoves.splice(0, mouseMoves.length);
    $startStop.innerHTML = `Stop recording`
    $startStop.className = `is-recording`
  } else {
    $startStop.innerHTML = `Start recording`
    $startStop.className = `is-not-recording`
  }
}

function replay (i, initTime = 0) {


  if (i < mouseMoves.length) {
    mouseMoves.forEach (cursor => {
      setTimeout(() => {
        $cursor.style.display = 'block';
        $cursor.style.setProperty('--x', cursor.posX);
        $cursor.style.setProperty('--y', cursor.posY);
        i++;
        if (i === mouseMoves.length) {
          replay()
        }
      },cursor.startTime - initTime)
    })
    
  } else {
   
    $cursor.style.display = 'none';
    isPlaying = false;
    $replay.innerHTML = 'Start replaying';
    $replay.className = 'replay-recording';
    
  }          
}

