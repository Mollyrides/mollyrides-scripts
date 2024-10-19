const midlothian = "Midlothian, TX";  // Midlothian, TX for calculating the pickup fee

// Function to calculate the distance between two addresses using Google Maps API
function getDistanceMatrix(origin, destination, callback) {
  const service = new google.maps.DistanceMatrixService();
  service.getDistanceMatrix(
    {
      origins: [origin],
      destinations: [destination],
      travelMode: google.maps.TravelMode.DRIVING,
    },
    (response, status) => {
      if (status === google.maps.DistanceMatrixStatus.OK && response.rows[0].elements[0].status === "OK") {
        const distanceInMeters = response.rows[0].elements[0].distance.value;
        const distanceInMiles = distanceInMeters / 1609.34;  // Convert meters to miles
        callback(distanceInMiles);
      } else {
        callback(null);
      }
    }
  );
}

// Function to calculate the pickup fee based on the distance from Midlothian
function calculatePickupFee(distance) {
  if (distance <= 10) {
    return 0;
  } else {
    const excessMiles = distance - 10;
    return Math.round(excessMiles * 1);  // $1 per mile over 10 miles
  }
}

// Function to calculate trip fare based on distance
function calculateTripFare(distance) {
  if (distance <= 24) return 50;
  if (distance <= 30) return 55;
  if (distance <= 35) return 60;
  if (distance <= 40) return 65;
  if (distance <= 45) return 70;
  if (distance <= 50) return 75;
  if (distance <= 55) return 80;
  if (distance <= 60) return 85;
  if (distance <= 65) return 90;
  if (distance <= 70) return 95;
  if (distance <= 75) return 100;
  if (distance <= 80) return 105;
  if (distance <= 85) return 110;
  if (distance <= 90) return 115;
  if (distance <= 100) return 120;
  if (distance <= 105) return 125;
  if (distance <= 110) return 130;
  if (distance <= 115) return 135;
  if (distance <= 120) return 140;
  if (distance <= 125) return 145;
  if (distance <= 130) return 150;
  return "Out of range";
}

// Function to calculate and display total fare
function calculateTotalFare() {
  const pickupAddress = document.getElementById("pickupAddress").value;
  const destinationAddress = document.getElementById("destinationAddress").value;

  if (!pickupAddress || !destinationAddress) {
    alert("Please enter both pickup and destination addresses.");
    return;
  }

  // Calculate distance between Pickup and Midlothian for pickup fee
  getDistanceMatrix(pickupAddress, midlothian, (distanceToMidlothian) => {
    if (distanceToMidlothian === null) {
      document.getElementById("result").innerHTML = "Error calculating distance to Midlothian.";
      return;
    }

    const pickupFee = calculatePickupFee(distanceToMidlothian);

    // Calculate distance between Pickup and Destination for trip fee
    getDistanceMatrix(pickupAddress, destinationAddress, (tripDistance) => {
      if (tripDistance === null) {
        document.getElementById("result").innerHTML = "Error calculating trip distance.";
        return;
      }

      const tripFare = calculateTripFare(tripDistance);

      if (tripFare === "Out of range") {
        document.getElementById("result").innerHTML = "Sorry, this trip is out of range.";
      } else {
        const totalFare = pickupFee + tripFare;
        document.getElementById("result").innerHTML = 
          "The pickup fee is: $" + pickupFee + "<br>" +
          "The trip fare is: $" + tripFare + "<br>" +
          "The total fare is: $" + totalFare;
      }
    });
  });
}
