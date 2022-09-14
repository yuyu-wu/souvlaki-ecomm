mapboxgl.accessToken = 'pk.eyJ1Ijoic3doYXJyaWV0MjAxMiIsImEiOiJja3pjbHdlMHQycDNuMzFvMjdzZDB3YnNsIn0.vBSqC8w-sPvNW3uye950iQ';

const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/light-v10', // style URL
    center: [145.00123423529922, -37.736903229263184], // starting position [lng, lat]
    zoom: 11.5 // starting zoom
});

// Create a new marker.
const marker = new mapboxgl.Marker()
    .setLngLat([145.00123423529922, -37.736903229263184])
    // .setHTML('<a href="https://www.google.com/maps/place/Preston+Market/@-37.7552279,144.986128,13z/data=!3m1!5s0x6ad6445648ccd5ef:0x936e1d3bface86a4!4m5!3m4!1s0x6ad65cbcdbcb5931:0xd2612d9bb907481e!8m2!3d-37.7390371!4d145.001902"</a>')
    .addTo(map);