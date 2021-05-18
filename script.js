window.navigator.geolocation
    .watchPosition(setPosition, console.log);

// Map Initialization
var mymap = L.map('mapid').setView([0.0, 0], 2);
L.tileLayer('https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=VvMiBl3FppH5YO04JZxZ', {
    attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
}).addTo(mymap);

// Marker
updateMarker = (update_marker = [-33.665, 18.993]) => {
    mymap.setView(update_marker, 13);
    L.marker(update_marker).addTo(mymap);
}

function setPosition(position) {
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;
    updateMarker([lat, lon])

    var ipapi = `https://geo.ipify.org/api/v1?apiKey=at_NRx7giVcx5NsWFc3QjIxRlvX9oJYH`
    fetch(ipapi)
        .then(responseip => {
            return responseip.json();
        })
        .then(ipdata => {
            var yourIpIs = ipdata.ip;
            var country = ipdata.location.country;
            var timezone = ipdata.location.timezone;
            var isp = ipdata.isp;
            document.getElementById('ip').innerHTML = `<p>IP Address</p>
            <h1>${yourIpIs}</h1>`
            document.getElementById('location').innerHTML = `<p>Country</p>
        <h1>${country}</h1>`
            document.getElementById('time-zone').innerHTML = `<p>Time Zone</p>
        <h1>${timezone}</h1>`
            document.getElementById('isp').innerHTML = `<p>ISP</p>
        <h1>${isp}</h1>`
        })


}


document.getElementById('search-entred-location').addEventListener('click', () => {
    var toFind = document.getElementById('enter-location').value
    var api = `https://geo.ipify.org/api/v1?apiKey=at_NRx7giVcx5NsWFc3QjIxRlvX9oJYH&ipAddress=${toFind}`
    fetch(api)
        .then(response => {
            return response.json();
        })
        .then(data => {
            updateMarker([data.location.lat, data.location.lng])
            var country = data.location.country;
            var timezone = data.location.timezone;
            var isp = data.isp;
            document.getElementById('ip').innerHTML = `<p>IP Address</p>
            <h1>${toFind}</h1>`
            document.getElementById('location').innerHTML = `<p>Country</p>
        <h1>${country}</h1>`
            document.getElementById('time-zone').innerHTML = `<p>Time Zone</p>
        <h1>${timezone}</h1>`
            document.getElementById('isp').innerHTML = `<p>ISP</p>
        <h1>${isp}</h1>`

        })

})
