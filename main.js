import 'ol/ol.css';
import GeoJSON from 'ol/format/GeoJSON';
import Map from 'ol/Map';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import XYZSource from 'ol/source/XYZ';
import {fromLonLat} from 'ol/proj';
import sync from 'ol-hashed';
import DragAndDrop from 'ol/interaction/DragAndDrop';
import Modify from 'ol/interaction/Modify';
import Draw from 'ol/interaction/Draw';

const map = new Map({
    target: 'map-container',
    view: new View({
        center: [0, 0],
        zoom: 2
    })
});

const source = new VectorSource();

const layer = new VectorLayer({
    source: source
});
map.addLayer(layer);

map.addInteraction(new DragAndDrop({
    source: source,
    formatConstructors: [GeoJSON]
}));

map.addInteraction(new Modify({
    source: source
}));

map.addInteraction(new Draw({
    type: 'Polygon',
    source: source
}));

navigator.geolocation.getCurrentPosition(function(pos) {
    const coords = fromLonLat ([pos.coords.longitude, pos.coords.latitude]);
    map.getView().animate({center: coords, zoom: 10});
});

sync(map);