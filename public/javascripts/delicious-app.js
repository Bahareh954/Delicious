import '../sass/style.scss';

import {
    $,
    $$
} from './modules/bling';
import autocomplete from './modules/autocomplete';
import staticMap from './modules/staticmap';

const apiKey = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImZkYzIwZGI4NTZkNzIwMTRmZTIwYzMzOTYyMWFjOWIzZmE1ODkwZDk2MWFjZWMwNzUzNmJiOWYxY2FhMjlhMTU0ZmQ3MjRhNTA1ZDBlYzU5In0.eyJhdWQiOiIxMjkwOCIsImp0aSI6ImZkYzIwZGI4NTZkNzIwMTRmZTIwYzMzOTYyMWFjOWIzZmE1ODkwZDk2MWFjZWMwNzUzNmJiOWYxY2FhMjlhMTU0ZmQ3MjRhNTA1ZDBlYzU5IiwiaWF0IjoxNjEzOTk3OTU0LCJuYmYiOjE2MTM5OTc5NTQsImV4cCI6MTYxNjQ5OTk1NCwic3ViIjoiIiwic2NvcGVzIjpbImJhc2ljIl19.HXo5W01xOmzdsrGYQ78Sof4h3GEeVnUGXKYNyIS_7Kt9yNCGdDDrTgsFc4eil1nje3z5N1mNHEPsVnbk3ruFjZyw3lo3uhComng_IqnMZPLz6423WTx_9YYHeP86GWTTF9-i58LXlJ8y01iOnsF1MLaihmLJiLMS_4r108JfBfycV83sBTthsghL7hXm3tsTA-aslnTKTwxmufjSWfFHOlNh-NN2S7FJ2fbLdah_cm8ZVd6u0Wy5P3w0EoXkH14KmhRpC7WJQjNPRLzUKPSs9KqgkP4yzIA-eCxQeLa4hQunhhFN22sLPbAiLhog5JHblh6bkK__6D3EDT2V6omGnA";

autocomplete($("#address"), $("#lat"), $("#lng"), apiKey);

staticMap($(".single__map"), apiKey);