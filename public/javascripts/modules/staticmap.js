function staticMap(image, apiKey) {
    if (!image) return;

    const url = `https://map.ir/static?width=800&height=150&zoom_level=17&markers=color%3Adefault%7Clabel%3A${image.dataset.name}%7C${image.dataset.lng}%2C${image.dataset.lat}`;
    const loader = `<div class="lds-ripple"><div></div><div></div></div>`;
    const loading = $(".loading");
    loading.html(loader);

    function getMap() {
        const response = fetch(url, {
            method: "GET",
            headers: {
                "x-api-key": apiKey
            }
        });
        return response.then(data => data.blob());
    }
    return getMap().then(returnedMap => {
        loading.remove();
        image.src = URL.createObjectURL(returnedMap)
    });
}

export default staticMap;