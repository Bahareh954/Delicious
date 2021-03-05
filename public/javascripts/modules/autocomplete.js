function autocomplete(input, latInput, lngInput, apiKey) {
    if (!input) return; // skip this function from running if there is not an address input in the page
    const endpoint = "https://map.ir/search/v2/autocomplete";
    $(input).autocomplete({
        source: function (request, response) {
            $.ajax({
                url: endpoint,
                method: "POST",
                dataType: "json",
                contentType: 'application/json',
                data: JSON.stringify({
                    text: input.value,
                    $filter: 'province eq اصفهان'
                }),
                headers: {
                    'x-api-key': apiKey
                },
                success: function (data) {
                    response(data.value.map(loc => {
                        return {
                            value: `${loc.address} | ${loc.title}`,
                            coordinates: loc.geom.coordinates
                        };
                    }));
                },
                error: function (error) {
                    console.error(error);
                }
            });
        },
        minLength: 2,
        select: function (event, ui) {
            latInput.value = ui.item.coordinates[1];
            lngInput.value = ui.item.coordinates[0];
        }
    });
}

export default autocomplete;