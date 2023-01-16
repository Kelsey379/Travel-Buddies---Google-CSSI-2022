// cant store object in session storage directly so using JSON
// aka current users details

//////////////////////////
  // let new_json = sessionStorage.getItem('current_users_score')
  // let current_scores = JSON.parse(new_json);
  // console.log(current_scores);
  // console.log(current_scores.cautious);
//////////////////////////





// in index.html, if 'sessionStorage.getItem('current_users_score')' is null do not allow entry make pop up to say must do quiz


// Can now user currrent_score to compare to other pretend users scores





// self notes
// add "spontaneous: 0, extrovert: 0, introvert: 0" after

// for now: if user1.cautious >= user2.cautious ... display user on destination page

// https://cloud.google.com/blog/products/maps-platform/how-calculate-distances-map-maps-javascript-api
function haversine_distance(user, destination) {
      var R = 3958.8; // Radius of the Earth in miles
      var rlat1 = user.location.lat * (Math.PI/180); // Convert degrees to radians
      var rlat2 = destination.position.lat() * (Math.PI/180); // Convert degrees to radians
      var difflat = rlat2-rlat1; // Radian difference (latitudes)
      var difflon = (destination.position.lng()-user.location.lng) * (Math.PI/180); // Radian difference (longitudes)

      var d = 2 * R * Math.asin(Math.sqrt(Math.sin(difflat/2)*Math.sin(difflat/2)+Math.cos(rlat1)*Math.cos(rlat2)*Math.sin(difflon/2)*Math.sin(difflon/2)));
      return d;
}


 



function addMarkerandPolyline(lat, lng, name, hexcolor) {
  let newMarker = new google.maps.Marker({
    position: {lat: lat, lng: lng},
    map: map,
    label: {
        text: name,
        fontFamily: "'Poppins', sans-serif",
        fontWeight: 'bold', 
        fontSize: '14px',
        color: hexcolor,
    }, 
  })

  
  let new_polyLine = new google.maps.Polyline({
    path: [
      {lat: 29.97925541012171, lng: 31.134204582211925}, 
      {lat: lat, lng: lng}
    ],
    // Try to understand this more... note to self: honestly just make an array of hex values and Math.random that (so they always look okay/different)
    map: map
  })
}






let map;
let d_line; 

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: {lat: 29.97925541012171, lng: 31.134204582211925},
    zoom: 17, 
    // comment out 3D options if performace is an issue
    // will be cool for presentation though
    heading: 90, 
    tilt: 100, 
    mapId: "f27296c47b2d24ae",
  });

  let marker1 = new google.maps.Marker({
    position: {lat: 29.97925541012171, lng: 31.134204582211925},
    map: map,
    animation: google.maps.Animation.BOUNCE
  })

  let marker2 = new google.maps.Marker({
    position: {lat: 51.16266574089788, lng: -114.0654137387129},
    map: map,
    label: {
      text: "You",
      fontFamily: "'Poppins', sans-serif",
      fontWeight: 'bold', 
      fontSize: '14px',
      color: "#000",
    }, 
    // animation: google.maps.Animation.BOUNCE
  })

  new google.maps.Polyline({path: [{lat: 29.97925541012171, lng: 31.134204582211925}, {lat: 51.16266574089788, lng: -114.0654137387129}], map: map})

  
  quizzes_stat = sessionStorage.getItem('quiz_status')
  let simi1 = sessionStorage.getItem('user1_similarity_percent')
  let simi2 = sessionStorage.getItem('user2_similarity_percent')
  console.log(quizzes_stat)
  console.log(simi1)

  // Just added this as a filler to get a different percentage for the third user
  let simi3 = parseInt(sessionStorage.getItem('user1_similarity_percent')-7)



  
  // make into for loop with users
  document.getElementById("wow").innerHTML += `
  
<div class="card">
    <div class="card-image">
    <figure class="image is-4by3">
      <img src="https://avatars.dicebear.com/api/big-smile/Bobby T.svg" alt="Placeholder image">
    </figure>
  </div>
    <div class="card-content">
    <div class="media">
      <div class="media-content">
        <p class="title">${user1.name}</p>
        <div class="media-left">${Math.round(haversine_distance(user1, marker1))} miles away</div><br>
        <p class="subtitle">${simi1}% of your interests match</p>
        <progress id="file" value='${simi1}' max="100"><var>percentDiff1</var></progress> 
        <br>
        <br>
        <a class="button" id="user1">Invite to travel group</a>
      </div>
    </div>
  </div>
</div>

<br>
<br>

<div class="card">
    <div class="card-image">
    <figure class="image is-4by3">
      <img src="https://avatars.dicebear.com/api/big-smile/Ryan B.svg" alt="Placeholder image">
    </figure>
  </div>
    <div class="card-content">
    <div class="media">
      <div class="media-content">
        <p class="title">${user2.name}</p>
        <div class="media-left">${Math.round(haversine_distance(user2, marker1))} miles away</div><br>
        <p class="subtitle">${simi2}% of your interests match</p>
        <progress id="file" value='${simi2}' max="100"><var>percentDiff1</var></progress> 
        <br>
        <br>
        <a class="button" id="user2">Invite to travel group</a>
      </div>
    </div>
  </div>
</div>

<br>
<br>


<div class="card">
    <div class="card-image">
    <figure class="image is-4by3">
      <img src="https://avatars.dicebear.com/api/big-smile/Ryan F.svg" alt="Placeholder image">
    </figure>
  </div>
    <div class="card-content">
    <div class="media">
      <div class="media-content">
        <p class="title">Ryan B</p>
        <div class="media-left">${Math.round(haversine_distance(user3, marker1))} miles away</div><br>
        <p class="subtitle">${simi3}% of your interests match</p>
        <progress id="file" value='${simi3}' max="100"><var>percentDiff1</var></progress> 
        <br>
        <br>
        <a class="button" id="user3">Invite to travel group</a>
      </div>
    </div>
  </div>
</div>

                    
               `   



  document.getElementById("user1").addEventListener("click", ()=>{
    addMarkerandPolyline(user1.location.lat, user1.location.lng, user1.name, "#000") // later make smt like user1.location.long and or lat
    map.setZoom(2.5)
  })
  
  document.getElementById("user2").addEventListener("click", ()=>{
    addMarkerandPolyline(user2.location.lat, user2.location.lng, user2.name, "#000")
    map.setZoom(2.5)
  })
  
  document.getElementById("user3").addEventListener("click", ()=>{
    addMarkerandPolyline(user3.location.lat, user3.location.lng, user3.name, "#000")
    map.setZoom(2.5)
  })
  


  // Add a marker + polyline to user2's location and zoom map out when button clicked (event listiner, id is user2) 


 }






window.initMap = initMap;






// const webglOverlayView = new google.maps.WebGLOverlayView();

// Lastly can add a camera spin to base