//Variable declaration
let dec1 = 0,
  E1, E2, mant1, mant2;
let dec2 = 0;
let flag;
let bin1 = [],
  IEEE1 = [],
  IEEE2 = [];
let bin2 = [];
let intpart1;
let intpart2;
let floatpart1;
let floatpart2;
let be1, be2;
let float1;
let float2;
let total1 = "";
let total2 = "";
let exp1 = 0;
let exp2 = 0;
let bg;
let adint, adfloat, addt, addex, ea, mante, Ie;
let addition;



function preload() {
  bg = loadImage("background.jpg");
}

function setup() {
  createCanvas(2 * 800, 2 * 600);
  flag=false;
  t1 = createInput();
  t1.position(10, 50);
  t2 = createInput();
  t2.position(10, 80);
  l1 = createElement('h3', 'Enter Decimal Numbers');
  l2 = createElement('h5', '1.');
  l3 = createElement('h5', '2.');




  l1.position(0, 0);
  l2.position(0, 30);
  l3.position(0, 60);



  b1 = createButton('Calculate IEEE-754');
  b2 = createButton('Clear Values');
  b3 = createButton("Perform Addition");
  b1.position(10, 120);
  b2.position(150, 120);
  b3.position(250, 120);
  b1.mousePressed(calc);
  b2.mousePressed(clr);
  b3.mousePressed(sum);


  //FUNCTION TO CALCULATE BINARY OF THE GIVEN FLOATING POINT NUMBER.
}

function clr() {
  t1.value("");
  t2.value("");
  dec1 = 0;
  dec2 = 0;

}

function calc() {
  dec1 = t1.value();
  dec2 = t2.value();

  if (isInt(dec1) || isFloat(dec1)) {
    if (isInt(dec2) || isFloat(dec2)) {
      bin1 = DecimalToBinary(dec1);
      bin2 = DecimalToBinary(dec2);
      float1 = floatbinary(dec1);
      float2 = floatbinary(dec2);
      total1 = total(bin1, float1);
      total2 = total(bin2, float2);
      total1 = parseFloat(total1);
      total2 = parseFloat(total2);
      exp1 = bias(total1);
      exp2 = bias(total2);
      E1 = 127 + exp1;
      E2 = 127 + exp2;

      mant1 = total1 / pow(10, exp1);
      mant2 = total2 / pow(10, exp2);

      IEEE1 = represent(E1, mant1);
      IEEE2 = represent(E2, mant2);

    }
  }

}


function isInt(n) {
  if (Number(n) == n && n % 1 == 0) {
    return true;
  }
  return false;

}


function isFloat(n) {
  if (Number(n) == n && n % 1 != 0) {
    return true;
  }
  return false;

}







function floatbinary(val) {
  val = val - floor(val);
  let flt = [];
  for (let i = 0; i < 4; i++) {

    f1 = (val * 2);

    flt[i] = floor(f1);
    val = f1 - floor(f1);

  }
  flt = join(flt, '');
  floatpart1 = "Binary of  Float part of " + dec1 + " =";
  floatpart2 = "Binary of  Float part of " + dec2 + " =";

  return flt;
}


//FUNCTION TO CALCULATE BIAS EXPONENT
function bias(val) {
  exp = 0;
  console.log(val);
  if (floor(val) != 0) {
    while (floor(val) != 1) {
      exp++;
      val = floor(val / 10);
    }
    

    be1 = "Bias Exponent of " + dec1 + " =";
    be2 = "Bias Exponent of " + dec2 + " =";
    return exp;
  }else{
     while(val<=1){
           exp--;
           val=val*10.0000000000000000000000000000000000000000;
           
           
  }
    
  }

}

//DECIMAL TO BINARY CONVERSTION LOGIC.
function DecimalToBinary(val) {
  let binary = [];
  let i = 0;

  val = floor(val);
  while (val > 0) {
    binary[i] = val % 2;
    val = floor(val / 2);
    i++;
  }
  reverse(binary);
  binary = join(binary, '');

  intpart1 = "Binary of the integer part of " + dec1 + " =";
  intpart2 = "Binary of the integer part of " + dec2 + " =";
  return binary;
}

function total(bin, float_) {
  if (bin.length == 0) {
    tot = '0' + '.' + float_;
  } else {
    tot = bin + '.' + float_;
  }
  return tot;
}


//FUNCTION TO CALCULATE IEEE FORMAT.
function represent(E, man) {
  man = String(man);
  man = split(man, '.');
  let x = man[1];
  x = String(x);

  for (i = x.length; i < 23; i++) {
    man[1] = man[1] + '0';
  }


  E = DecimalToBinary(E);
  let IE = [];
  IE[0] = 0;
  IE[1] = parseInt(E);
  IE[2] = man[1];

  ie1 = "IEEE 754 in Single Precision format for " + dec1 + " =";
  ie2 = "IEEE 754 in Single Precision format for " + dec2 + " =";

  IE = join(IE, '❚');
 
  return IE;
}


//FUNCTION TO CALCULATE THE SUM  AND SHOW IT
function sum() {
  dec1 = t1.value();
  dec2 = t2.value();
  
  if (isInt(dec1) || isFloat(dec1)) {
    if (isInt(dec2) || isFloat(dec2)) {
      bin1 = DecimalToBinary(dec1);
      bin2 = DecimalToBinary(dec2);
      float1 = floatbinary(dec1);
      float2 = floatbinary(dec2);
      total1 = total(bin1, float1);
      total2 = total(bin2, float2);
      total1 = parseFloat(total1);
      total2 = parseFloat(total2);
      exp1 = bias(total1);
      exp2 = bias(total2);
      E1 = 127 + exp1;
      E2 = 127 + exp2;

      mant1 = total1 / pow(10, exp1);
      mant2 = total2 / pow(10, exp2);

      IEEE1 = represent(E1, mant1);
      IEEE2 = represent(E2, mant2);



      addition = parseFloat(dec1) + parseFloat(dec2);
      
      adint = DecimalToBinary(addition);
      adfloat = floatbinary(addition);
      addt = total(adint, adfloat);
      addt = parseFloat(addt);
      addex = bias(addt);
      ea = 127 + addex;
      mante = addt / pow(10, addex);
      Ie = represent(ea, mante);
      flag=true;
    }
  }

}


//FUNCTION TO DRAW GUI

function draw() {

  background(bg, 123, 192, 205);
  //TO PRINT THE BINARY OF INTEGER AND FLOATING POINT.
  if (dec1 != 0 || dec2 != 0) {
    if (isInt(dec1) || isFloat(dec1)) {
      if (isInt(dec1) || isFloat(dec1)) {



        textSize(12);
        rect(0, 155, 600, 80, 20);
        line(340, 155, 340, 235);

        text(intpart1, 10, 184);
        text(bin1, 250, 184);
        text(intpart2, 10, 214);
        text(bin2, 250, 214);
        text(floatpart1, 350, 184);
        text(float1, 550, 184);
        text(floatpart2, 350, 214);
        text(float2, 550, 214);




        if (total1 != "" || total2 != "") {
          rect(0, 250, 560, 70, 20);
          line(340, 250, 340, 320);


          text(be1, 350, 270);
          text(exp1, 500, 270);
          text(be2, 350, 300);
          text(exp2, 500, 300);


          text("Binary of " + dec1 + " = ", 10, 270);
          text("Binary of " + dec2 + " = ", 10, 300);
          text(total1, 130, 270);
          text(total2, 130, 300);
        }
        if (IEEE1.length != 0 || IEEE2.length != 0) {
          rect(0, 390, 800, 100, 20);
          textSize(16);
          text("32-Bit Floating Point Representation");
          //l4.position(5,350);
          text(ie1, 5, 425);
          text(ie2, 5, 460);
          text(IEEE1, 380, 425);
          text(IEEE2, 380, 460);

        }
        if(flag){
                rect(0, 500, 800, 100, 20);
      textSize(16);
      text("Result of addition : ", 0, 550);
      text(Ie, 180, 550);
        }

        
      }
    }
  }

}