var alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

var svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height"),
    g = svg.append("g").attr("transform", "translate(32," + (height / 2) + ")"),
    map = d3.floorplan(); // initialize floor plan

// Set data
var mapdata = {
    floors: [{
        id: uuid(),
        name: "Floor 1",
        image: {
            url: "images/sample_floorplan.png",
            x: 0,
            y: 0,
            w: width,
            h: height
        },
        zones: [
            {
                id: uuid(),
                name: "ZONE - 0",
                points: [
                    [
                        147,
                        117
                    ],
                    [
                        147,
                        268
                    ],
                    [
                        368,
                        268
                    ],
                    [
                        369,
                        148
                    ],
                    [
                        353,
                        149
                    ],
                    [
                        353,
                        82
                    ],
                    [
                        316,
                        32
                    ],
                    [
                        233,
                        32
                    ],
                    [
                        201,
                        79
                    ],
                    [
                        199,
                        117
                    ]
                ]
            },
            {
                id: uuid(),
                name: "ZONE - 1",
                points: [
                    [
                        581,
                        326
                    ],
                    [
                        582,
                        475
                    ],
                    [
                        784,
                        474
                    ],
                    [
                        784,
                        325
                    ]
                ]
            }
        ],
        sensors: [{
            id: uuid(),
            name: "Sensor - 0",
            url: "images/bluetooth_logo.png",
            x: 50,
            y: 50,
            w: width,
            h: height
        }]
    }, {
        id: uuid(),
        name: "Floor 2",
        image: {
            url: "images/sample_floorplan.png",
            x: 0,
            y: 0,
            w: width,
            h: height
        },
        zones: [],
        sensors: [{
            id: uuid(),
            name: "Sensor - 1",
            url: "images/bluetooth_logo.png",
            x: 50,
            y: 50,
            w: width,
            h: height
        }]
    }]
};

// Load Floor image layers
map.imageLayers(svg, mapdata.floors);
// Load default polygons.
map.zonePolygons(svg, mapdata.floors[0].zones);

// Load and Draw sensors
mapdata.floors[0].sensors.forEach(function(sensor){
    new map.sensorImageLayer(svg, mapdata.floors[0], sensor);
});

// Draw Zone function
var drawZone = d3.select('#poly').on('click', function () {
    var zonePolyPoints = [];
    var zone = {
        id:uuid(),
        name: "ZONE - " + uuid(),
        points: zonePolyPoints
    };
    mapdata.floors[0].zones.push(zone);
    new map.drawZonePolygon(svg, zone);
});

// Draw Sensor Image function
var drawSensor = d3.select('#sensor').on('click', function () {
    var zonePolyPoints = [];
    var sensor = {
        id:  uuid(),
        name: "Sensor - " + uuid(),
        url: "images/bluetooth_logo.png",
        x: 50,
        y: 50,
        w: 32,
        h: 32
    };
    mapdata.floors[0].sensors.push(sensor);
    new map.sensorImageLayer(svg, mapdata.floors[0], sensor);
});

// Show data
$('#mapdata').html(library.json.prettyPrint(mapdata));

// Helper to automatically refresh data
var updateMapData = d3.select('#updateMapData').on('click', function () {
    // Reacalculate all coordinate points.
    mapdata.floors[0].sensors.forEach(function(sensor) {
       var cssAttribute = $("g.sensor-"+sensor.id).css('transform');
       var matrix = cssAttribute.replace(/[^0-9\-.,]/g, '').split(',');
       sensor.x += parseInt(matrix[4]);
       sensor.y += parseInt(matrix[5]);
    });
    $('#mapdata').html(library.json.prettyPrint(mapdata));
});

// Helper to splice json array
function findAndRemove(array, property, value) {
    array.forEach(function (result, index) {
        if (result[property] === value) {
            //Remove from array
            array.splice(index, 1);
        }
    });
}

// Helper to add uuids
function uuid() {
    var uuid = "", i, random;
    for (i = 0; i < 32; i++) {
        random = Math.random() * 16 | 0;

        if (i == 8 || i == 12 || i == 16 || i == 20) {
            uuid += "-"
        }
        uuid += (i == 12 ? 4 : (i == 16 ? (random & 3 | 8) : random)).toString(16);
    }
    return uuid;
}


// Uncomment for testing
// Draw text
// map.drawText(g, alphabet);
// Grab a random sample of letters from the alphabet, in alphabetical order.
// d3.interval(function() {
//     map.drawText(g, d3.shuffle(alphabet)
//         .slice(0, Math.floor(Math.random() * 26))
//         .sort());
// }, 1500);