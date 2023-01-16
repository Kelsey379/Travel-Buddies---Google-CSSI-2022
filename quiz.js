//define users for comparison
let currentUser = {name:"", location:"", cautious:0, spontaneous:0, introvert:0, extrovert:0}
let user1 = {name:"Bobby T", location: {lat: 51.485603626925844, lng: 0.011648385492856765}, cautious: 1, spontaneous:2, introvert:0, extrovert:3}
let user2 = {name:"Anna W", location: {lat: -11.069506386927637, lng: -77.60364905456468}, cautious: 3, spontaneous:0, introvert:2, extrovert:1}
let user3 = {name:"Ryan B", location: {lat: -8.502763543869078, lng: 115.10841444298295}, cautious: 0, spontaneous:3, introvert:2, extrovert:3}
let users = {currentUser, user1, user2, user3}


console.log("script running");

let pictures = document.querySelectorAll(".card-image");
let quizComplete = false;

let CIScore0 = 0;
let percentDiff;
let quiz = {
  activity: ["cautious", "spontaneous", "spontaneous"],
  decision: ["spontaneous", "cautious", "cautious"],
  hobby: ["introvert", "extrovert", "introvert"],
  house: ["introvert", "extrovert", "introvert"],
  personality: ["extrovert", "introvert", "extrovert"],
  time: ["cautious", "spontaneous", "cautious"],
};

let quizTaker = {
  cautious: 0,
  spontaneous: 0,
  extrovert: 0,
  introvert: 0,
};

pictures.forEach((picture) => {
  picture.addEventListener("click", (e) => {
    question2.removeAttribute("hidden");
    
    let choice = picture.id.split("-");
    console.log(choice);

    picture.classList.toggle("has-background-success");
    

    let answer = quiz[choice[0]][choice[1]];
    quizTaker[answer]++;
    currentUser[answer]++;


    
    if (choice[0] === "time") {
      // let resultID = "quiz_completed"

     // if (quizTaker.cautious > quizTaker.spontaneous) {
     // resultID = "#cautious-";
     // } else {
     //   resultID = "#spontaneous-";
     // }

      // if (quizTaker.introvert > quizTaker.extrovert) {
      //  resultID += "introvert";
      // } else {
        // resultID += "extrovert";
      // }

      // let result = document.querySelector(resultID);
      // console.log("your result is " +result);
      // result.classList.remove("hidden");
      
      console.log(currentUser);
      CIScore0 = ((currentUser.introvert/6 + currentUser.cautious/6)*100);
      
      console.log(`User score: ${CIScore0}`);
      // return to home page button (for now)

  
      document.getElementById("quiz_completed").innerHTML += '<a class="button" href="destinations.html">Choose your destination</a>'
      quizComplete = true
      sessionStorage.setItem('quiz_status', true)
      // result.innerHTML += '<a class="button" href="googlemaps1.html">View recommended locations</a>'

      
      // updates current users score for script.js usage 
      // also since objects cant be passed to the sessionStorage made it a string





      //compare scores:
      let CIScore1 = ((user1.introvert/6 + user1.cautious/6)*100);
      console.log(`User 1 score: ${CIScore1}`);
      //percentDiff measures the similarity between users' scores
      percentDiff = ((CIScore0-CIScore1)/(CIScore0+CIScore1)*100)
      if(percentDiff<0){
      percentDiff *= (-1);
      }
      percentDiff = 100-percentDiff;
      console.log(`Similarity with user 1: ${Math.round(percentDiff)}%`);
      sessionStorage.setItem('user1_similarity_percent', Math.round(percentDiff))




      //user 2:
      let CIScore2 = ((user2.introvert/6 + user2.cautious/6)*100);
      console.log(`User 2 score: ${CIScore2}`);
      percentDiff2 = ((CIScore0-CIScore2)/(CIScore0+CIScore2)*100)
      if(percentDiff2<0){
      percentDiff2 *= (-1);
      }
      percentDiff2 = 100-percentDiff2;
      console.log(`Similarity with user 2: ${Math.round(percentDiff2)}%`); 
      sessionStorage.setItem('user2_similarity_percent', Math.round(percentDiff2))
    
      

  }

    
    
      //hide and unhide questions:
      if (choice[0] === "activity") {
        let section = document.querySelector('#question2')
        section.classList.remove("hidden")
        // console.log(quizTaker.cautious)
      }
        
        // cant store object in session storage directly so using JSON
        // aka current users details
      if (choice[0] === "decision") {
        let section = document.querySelector('#question3')
        section.classList.remove("hidden")
        }
      if (choice[0] === "hobby") {
        let section = document.querySelector('#question4')
        section.classList.remove("hidden")
        }
      if (choice[0] === "house") {
        let section = document.querySelector('#question5')
        section.classList.remove("hidden")
        }
      if (choice[0] === "personality") {
        let section = document.querySelector('#question6')
        section.classList.remove("hidden")
        }  
  });

});

//Now percentDiff1 and percentDiff2 can be used as similarity values

// import {currentUser, user1, user2} from "user.js"

