// -0821 072 8t52

// allias
let print = console.log

// tables
var settings = {
  pixelSize: 20,
  currentColor: {
    r: 255,
    g: 255,
    b: 255
  },
  res: {
    x: 1900,
    y: 1900
  }
};
var pixelsStorage = {}

// elements
let redSlider;
let greenSlider;
let blueSlider;
let sizeSlider;
let gumToggle;

// data functions
function dataLoad()
{
  for (let index in pixelsStorage) {
    let tbl = pixelsStorage[index];

    createPixel(tbl._x, tbl._y, tbl._size, tbl._color)
  }
}

function dataSave()
{
  storeItem("pixels", pixelsStorage);
}


// functions
function createPixel(_x, _y, _size, _color)
{
  fill(color(_color.r, _color.g, _color.b));
  noStroke();
  square(_x, _y, _size);
}

function floorPosition(x, y, pixelSize)
{
  return {
    x: floor(
      floor(x) / pixelSize
    ) * pixelSize,

    y: floor(
      floor(y) / pixelSize
    ) * pixelSize
   }
}

function pressKeyCalculation()
{
 if (mouseIsPressed)  // MB1
 {
  let _size = settings.pixelSize;
  var _pos = floorPosition(mouseX, mouseY, _size)

  if (mouseX + mouseY < 230) return

  var _color = {
    r: settings.currentColor.r,
    g: settings.currentColor.g,
    b: settings.currentColor.b
  };

  pixelsStorage[`${_pos.x}-${_pos.y}`] = {
    _x: _pos.x,
    _y: _pos.y,
    _size: _size,
    _color: _color
  };

  createPixel(_pos.x, _pos.y, _size, _color);
 };
}

function updateSettings()
{
  settings.pixelSize = sizeSlider.value()

  settings.currentColor = {
    r: redSlider.value(),
    g: greenSlider.value(),
    b: blueSlider.value()
  };
}

function updateColorIndicator()
{
  fill(color(settings.currentColor.r, settings.currentColor.g, settings.currentColor.b));
  noStroke()
  square(0, 0, 100);
}

function setup()
{
  // pixelsStorage = getItem("pixels"); #TEMP
  createCanvas(settings.res.x, settings.res.y);
  // dataLoad() #TEMP

  redSlider = createSlider(0, 255, 300);
  redSlider.position(8, 10);
  redSlider.style("width", "80px");

  greenSlider = createSlider(0, 255, 300);
  greenSlider.position(8, 10 + 30);
  greenSlider.style("width", "80px");

  blueSlider = createSlider(0, 255, 300);
  blueSlider.position(8, 10 + 30 + 30);
  blueSlider.style("width", "80px");

  sizeSlider = createSlider(20, 146 , 20, 20);
  sizeSlider.position(30 + 80, 2);
  sizeSlider.style("width", "100px");

  gumToggle = createCheckbox("gum", false); // Ain't working but might fix it later
}

function draw()
{  
  updateSettings();
  updateColorIndicator();

  pressKeyCalculation();
}

function mousePressed(data)
{
  pixelsStorage = {} // #TEMP
  dataSave()
} 
