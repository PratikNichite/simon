let computerSeq = [];
const sequenceSet = ["green", "red", "yellow", "blue"];
let count = 0;
let level = 0;

function generateSequence() {
  //pass
  let generatedNum = Math.floor(Math.random() * 4);
  return sequenceSet[generatedNum];
}

function showSequence(index = 0) {
  if (index < computerSeq.length) {
    $("#" + computerSeq[index]).addClass("pressed");

    // play sound
    playSound(computerSeq[index]);

    setTimeout(function () {
      $("#" + computerSeq[index]).removeClass("pressed");
    }, 100);
    setTimeout(showSequence, 1000, index + 1);
  }
}

function clearComputerSeq() {
  while (computerSeq.length > 0) {
    computerSeq.pop();
  }
}

function playSound(id) {
  switch (id) {
    case "green":
      var sound = new Audio("sounds/green.mp3");
      sound.play();
      break;
    case "blue":
      var sound = new Audio("sounds/blue.mp3");
      sound.play();
      break;
    case "red":
      var sound = new Audio("sounds/red.mp3");
      sound.play();
      break;
    case "yellow":
      var sound = new Audio("sounds/yellow.mp3");
      sound.play();
      break;
    case "error":
      var sound = new Audio("sounds/wrong.mp3");
      sound.play();
  }
}

$(".btn").on("click", function (event) {
  // append pressed class to button
  $(event.target).addClass("pressed");

  // check if count is zero and computer sequence is also zero
  if (count === 0 && computerSeq.length === 0) {
    // check if user is playing again
    if ($("body").hasClass("game-over")) {
      //reset background
      $("body").removeClass("game-over");
    }

    // play sound
    playSound($(event.target).attr("id"));

    // push the first sequence to computer sequence
    computerSeq.push($(event.target).attr("id"));

    // generate next sequence
    computerSeq.push(generateSequence());

    // show it to user
    setTimeout(showSequence, 2000);

    // update level & level-title
    level++;
    $("#level-title").text(`Level ${level}`);
  } else {
    // its not first click
    // check if clicked sequence matches to current sequence in computer sequence

    if (computerSeq[count] === $(event.target).attr("id")) {
      // play sound
      playSound($(event.target).attr("id"));

      // check if its end of computer sequence
      if (count === computerSeq.length - 1) {
        //reset value of count
        count = 0;

        // update level & level-title
        level++;
        $("#level-title").text(`Level ${level}`);

        //generate next sequence
        computerSeq.push(generateSequence());

        //show it to user
        setTimeout(showSequence, 2000);
      } else {
        // if its not end of sequence then increase count
        count++;
      }
    } else {
      // current sequence does not match with computer sequence

      // play sound
      playSound("error");

      // append gameover to background
      $("body").addClass("game-over");

      // change game title
      $("#level-title").text("game over!");

      // reset count value to zero
      count = 0;

      // reset level to zero
      level = 0;

      // clear the computer sequence
      clearComputerSeq();

      // tell user to click on random button to start over again
      setTimeout(function () {
        $("#level-title").text("click on any block to start again!");
      }, 3000);
    }
  }

  // release pressed class from button
  setTimeout(function () {
    $(event.target).removeClass("pressed");
  }, 100);
});
