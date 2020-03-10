var serial; // instance of the serialport library
var portName = '/dev/ttyS0'; // fill in your serial port name here

var circleSize = 50;
var latestData;
var message = "Place a block of your choice in front of the board\nto see how it affects the environment";
var newSat = 255;
var img;

var textfill = 33;

function preload() {
    img = loadImage('visualization-notext.png');
}

function setup() {
    createCanvas(1920 / 2, 837 / 2);
    serial = new p5.SerialPort(document.location.hostname);
    serial.on('list', printList);
    serial.on('data', serialEvent);
    serial.open(portName);
}

function draw() {
    background(0);
    tint(255, newSat)
    image(img, 0, 0, 1920 / 2, 837 / 2);
    tint(255);
    textAlign(CENTER);
    textSize(20);
    textStyle(NORMAL);
    fill(textfill);
    text(message, width / 2, 100);
    textSize(30);
    textStyle(BOLD);
    text("LOTS OF LAND, LOTS OF OPPORTUNITIES", width / 2, 50);

}

function serialEvent() {
    // read a line of text in from the serial port:
    var currentString = serial.readLine();
    console.log(currentString);
    var trees = currentString.indexOf("E");
    var building = currentString.indexOf("C");


    if (trees == 1) {
        message = "Thank you for planting trees! You just helped better the environment!";
        newSat = 255;
        textfill = 33;

    } else if (building == 1) {
        message = "No!!! Building new buildings produce more carbon emissions";
        newSat = 50;
        textfill = 255;
    }

    serial.write('x');
}

function printList(portList) {
    // portList is an array of serial port names:
    for (var i = 0; i < portList.length; i++) {
        console.log(i + ' ' + portList[i]);
    }
}
