import axios from "axios";

function loadPlaces(map, lat = 32.47, lng = 51.78) {
    axios
        .get(`/api/stores/near?lat=${lat}&lng=${lng}`)
        .then(res => {
            const places = res.data;
            if (!places.length) {
                alert("No places found!");
                return;
            }

            places.map(place => {
                const [placeLng, placeLat] = place.location.coordinates;
                const html = `
                    <div class="popup">
                        <a href="/store/${place.slug}">
                            <img src="/uploads/${place.photo || 'store.png'}" alt="${place.name}"/>
                            <p>${place.name} - ${place.location.address}</p>
                        </a>
                    </div>
                `;
                map.addMarker({
                    name: place.name,
                    latlng: {
                        lat: placeLat,
                        lng: placeLng
                    },
                    icon: map.icons.red,
                    popup: {
                        custom: html
                    },
                    pan: true,
                    draggable: false,
                    history: false
                });
            });
        });
}

function makeMap(mapDiv, apiKey) {
    if (!$(mapDiv)) return;
    // Make our map
    $(document).ready(function () {
        const map = new Mapp({
            element: mapDiv,
            apiKey,
            presets: {
                zoom: 14
            }
        });

        map.addLayers();

        map.addContextmenu({
            here: true,
            distance: true,
            area: true,
            copy: true,
            static: true,
        });

        loadPlaces(map);

    });
}

export default makeMap;