console.log("working")

var x = document.getElementById("map");

function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    const {latitude, longitude} = position.coords;
    const myCoordinates = [latitude, longitude];
    console.log(myCoordinates)

    var map = L.map('map').setView(myCoordinates, 15);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    var marker = L.marker(myCoordinates).addTo(map);
    marker.bindPopup("You are currently here !!<br>Lat : "+latitude+"<br>Long : "+longitude).openPopup();
}

getLocation()

if (window.DeviceMotionEvent) {
    window.addEventListener('devicemotion', function(event) {
      // Extract acceleration values
      var acceleration = event.accelerationIncludingGravity;
      var x = acceleration.x;
      var y = acceleration.y;
      var z = acceleration.z;
  
      // Calculate magnitude of acceleration
      var magnitude = Math.sqrt(x*x + y*y + z*z);
  
      // Check if magnitude exceeds a threshold
      if (magnitude > 10) {
        alert('Crash detected!');
      }
    });
  }
  
  // Check if device supports geolocation
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var latitude = position.coords.latitude;
      var longitude = position.coords.longitude;
  
      // Display map with marker at current location
      var map = L.map('map').setView([latitude, longitude], 13);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
        maxZoom: 18,
      }).addTo(map);
      L.marker([latitude, longitude]).addTo(map);
    }, function(error) {
      console.log('Error getting current position:', error);
    });
  } else {
    console.log('Geolocation is not supported by this device');
  }

  window.addEventListener('devicemotion', function(event) {
    var acceleration = event.accelerationIncludingGravity;
    var speed = Math.sqrt(acceleration.x * acceleration.x + acceleration.y * acceleration.y + acceleration.z * acceleration.z);
    var speedKmh = (speed * 3.6).toFixed(1); // convert speed to km/h and round to 1 decimal place
    var speedElement = document.getElementById("speed");
    
    speedElement.innerHTML = "Current Speed: " + speedKmh + " km/h";
    
    if (speedKmh <= 70) {
        speedElement.style.color = "green"; // set color to green if speed is below 70 km/h
    } else {
        speedElement.style.color = "red"; // set color to red if speed is 70 km/h or above
    }
});