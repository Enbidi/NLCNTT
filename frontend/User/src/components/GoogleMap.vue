<script setup>
import { onMounted, getCurrentInstance, defineEmits } from 'vue';
import { Loader } from 'google-maps';
const loader = new Loader("AIzaSyDgo9VZPNj_SevLe1Lsb3Os2qzsvpseqfA");
const emit = defineEmits(['positionChanged']);

var map, infoWindow, google;
onMounted(async () => {
  var self = getCurrentInstance();
  google = await loader.load();
  map = new google.maps.Map(self.refs.googleMap, {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8,
  });
  _initMap();
});

const scrollToAndShowInfoWindow = (pos, content) => {
  infoWindow.setPosition(pos);
  infoWindow.setContent(content);
  infoWindow.open(map);
  map.setCenter(pos);
}

const _initMap = () => {
  infoWindow = new google.maps.InfoWindow();

  const locationButton = document.createElement("button");

  locationButton.textContent = "Lấy vị trí hiện tại";
  locationButton.classList.add("custom-map-control-button");
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
  locationButton.addEventListener("click", () => {
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          // infoWindow.setPosition(pos);
          // infoWindow.setContent("Location found.");
          // infoWindow.open(map);
          // map.setCenter(pos);
          // scrollToAndShowInfoWindow(pos, getAddressString(pos));
          fetch(reverGeocodingAPI_URL(pos.lat, pos.lng))
            .then(res => res.json())
            .then(data => {
              const addressString = getAddressString(data);
              emit('positionChanged', addressString);
              scrollToAndShowInfoWindow(pos, addressString);
            })
        },
        () => {
          _handleLocationError(true, infoWindow, map.getCenter());
        }
      );
    } else {
      // Browser doesn't support Geolocation
      _handleLocationError(false, infoWindow, map.getCenter());
    }
  });
  map.addListener('click', (e) => {
    var geolocation = {
      lat: e.latLng.lat(),
      lng: e.latLng.lng()
    };

    fetch(reverGeocodingAPI_URL(geolocation.lat, geolocation.lng))
      .then(res => res.json())
      .then(data => {
        scrollToAndShowInfoWindow(e.latLng, getAddressString(data));
      })
  })
}

const _handleLocationError = (browserHasGeolocation, infoWindow, pos) => {
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation
      ? "Error: The Geolocation service failed."
      : "Error: Your browser doesn't support geolocation."
  );
  infoWindow.open(map);
}

const getAddressString = (geolocation) => {
  return geolocation.localityInfo.administrative.reduce((acc, c) => acc + c.name + ', ', '');
}

const reverGeocodingAPI_URL = (lat, lng) => {
  return `https://api.bigdatacloud.net/data/reverse-geocode?latitude=${lat}&longitude=${lng}&localityLanguage=en&key=bdc_8796a50f7f0f41329976370ca980a697`;
}

</script>

<template>
  <div id="googlemap" ref="googleMap" class="text-black" style="height: 400px">
  </div>
</template>

<style>
#googlemap {
  /* height: 500px;
  width: 500px; */
  height: 100%;
}

.custom-map-control-button {
  background-color: #fff;
  border: 0;
  border-radius: 2px;
  box-shadow: 0 1px 4px -1px rgba(0, 0, 0, 0.3);
  margin: 10px;
  padding: 0 0.5em;
  font: 400 18px Roboto, Arial, sans-serif;
  overflow: hidden;
  height: 40px;
  cursor: pointer;
}

.custom-map-control-button:hover {
  background: rgb(235, 235, 235);
}
</style>