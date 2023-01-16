
// self notes
// add "spontaneous: 0, extrovert: 0, introvert: 0" after

// for now: if user1.cautious >= user2.cautious ... display user on destination page

// https://cloud.google.com/blog/products/maps-platform/how-calculate-distances-map-maps-javascript-api
function haversine_distance(mk1, mk2) {
      var R = 3958.8; // Radius of the Earth in miles
      var rlat1 = mk1.position.lat() * (Math.PI/180); // Convert degrees to radians
      var rlat2 = mk2.position.lat() * (Math.PI/180); // Convert degrees to radians
      var difflat = rlat2-rlat1; // Radian difference (latitudes)
      var difflon = (mk2.position.lng()-mk1.position.lng()) * (Math.PI/180); // Radian difference (longitudes)

      var d = 2 * R * Math.asin(Math.sqrt(Math.sin(difflat/2)*Math.sin(difflat/2)+Math.cos(rlat1)*Math.cos(rlat2)*Math.sin(difflon/2)*Math.sin(difflon/2)));
      return d;
} 



function addMarkerandPolyline(lat, lng) {
  let newMarker = new google.maps.Marker({
    position: {lat: lat, lng: lng},
    map: map,
  })
  
  let new_polyLine = new google.maps.Polyline({
    path: [
      {lat: 29.97925541012171, lng: 31.134204582211925}, 
      {lat: lat, lng: lng}
    ], 
    map: map
  })
}






let map;
let d_line; 

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: {lat: -16.496688183548667, lng: -151.74311234560366},
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
    // animation: google.maps.Animation.BOUNCE
  })

  new google.maps.Polyline({path: [{lat: 29.97925541012171, lng: 31.134204582211925}, {lat: 51.16266574089788, lng: -114.0654137387129}], map: map})

  let distance_away = haversine_distance(marker1, marker2) 
  

  console.log(distance_away)

  
  quizzes_stat = sessionStorage.getItem('quiz_status')
  let simi1 = sessionStorage.getItem('user1_similarity_percent')
  let simi2 = sessionStorage.getItem('user2_similarity_percent')
  console.log(quizzes_stat)
  console.log(simi1)

  // Just added this as a filler to get a different percentage for the third user
  let simi3 = parseInt(sessionStorage.getItem('user1_similarity_percent')) -7


  let user3 = {name:"Ryan F", location: "", cautious: 1, spontaneous:2, introvert:0, extrovert:3}
  
  // make into for loop with users
  document.getElementById("wow").innerHTML += `
  
<div class="card">
    <div class="card-image">
    <figure class="image is-4by3">
      <img src="https://avatars.dicebear.com/api/big-smile/${user1.name}.svg" alt="Placeholder image">
    </figure>
  </div>
    <div class="card-content">
    <div class="media">
      <div class="media-content">
        <p class="title">${user1.name}</p>
        <div class="media-left">103 miles away</div><br>
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
      <img src="https://avatars.dicebear.com/api/big-smile/${user2.name}.svg" alt="Placeholder image">
    </figure>
  </div>
    <div class="card-content">
    <div class="media">
      <div class="media-content">
        <p class="title">John K</p>
        <div class="media-left">670 miles away</div><br>
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
      <img src="https://avatars.dicebear.com/api/big-smile/${user3.name}.svg" alt="Placeholder image">
    </figure>
  </div>
    <div class="card-content">
    <div class="media">
      <div class="media-content">
        <p class="title">${user3.name}</p>
        <div class="media-left">1,237 miles away</div><br>
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
    addMarkerandPolyline(50, 49) // later make smt like user1.location.long and or lat
    map.setZoom(2.5)
  })
  
  document.getElementById("user2").addEventListener("click", ()=>{
    addMarkerandPolyline(32, 77)
    map.setZoom(2.5)
  })
  
  document.getElementById("user3").addEventListener("click", ()=>{
    addMarkerandPolyline(44, 68)
    map.setZoom(2.5)
  })
  


  // Add a marker + polyline to user2's location and zoom map out when button clicked (event listiner, id is user2) 


 }






window.initMap = initMap;






// const webglOverlayView = new google.maps.WebGLOverlayView();

// Lastly can add a camera spin to base