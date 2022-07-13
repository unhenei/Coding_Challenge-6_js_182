// Question 3: 
// Write a function that converts HEX to RGB. 
// Then Make that function auto-dect the formats so that if you enter HEX color format it returns RGB and if you enter RGB color format it returns HEX.


// HEX to RGB

// first, check the input by length (checkHexLength)
// second, check the input by value (checkHexValue)
// third, turn hex into rgb (codeHextoRGB)
// sum up the 3 steps above into HEXtoRGB

// rule out invalid input by length
// possible HEX input format: #000000, 000000, #000, 000
// (in three or six digit, with or without #)
function checkHexLength(hex) {
	if (((hex.length === 7) || (hex.length === 4)) && (hex[0] === "#")) {
		// #000000 or #000
		return true
	} else if ((hex.length === 6) || (hex.length === 3)) {
		// 000000 or 000
		return true
	} else {
		return false
	}
}

// rule out invalid input by value
function checkHexValue(hex) {
	// container for test result
	let check = [];

	// remove the "#" on the front (make #000000 into 000000)
	hex = hex.replace("#","");

	// after replacing "#", length of hex should either be 6 or 3
	// in case there are inputs such as "000#00" or "00#"
	if ((hex.length !== 3) && (hex.length !== 6)) {
        check = [false];
    }

	// check if the code is valid (should be composed by 0-9 and a-f)
	let digit = /[0123456789]/;
	let alphabet = /[ABCDEFabcdef]/;
	for (let i = 0; i < hex.length; i++) {
		check.push(digit.test(hex[i])||alphabet.test(hex[i])) 
	}

	if (check.includes(false)) {
		return false
	} else {
		return true
	}
}

// turn hex to rgb
function codeHEXtoRGB(hex) {
    hex = hex.replace("#","");
	// make it array for better use
	let hexArray = Array.from(hex);
	// substitute alphabet into demical
	hexArray = hexArray.map(item => {
		if ((item === "A") || (item === "a")) {
			item = 10;
		} else if ((item === "B") || (item === "b")) {
			item = 11;
		} else if ((item === "C") || (item === "c")) {
			item = 12;
		} else if ((item === "D") || (item === "d")) {
			item = 13;
		} else if ((item === "E") || (item === "e")) {
			item = 14;
		} else if ((item === "F") || (item === "f")) {
			item = 15;
		}
		return item
	})

	// transform #AB0 into #AABB00
	if (hexArray.length === 3) {
		let r = hexArray[0];
		let g = hexArray[1];
		let b = hexArray[2];
		hexArray.unshift(r);
		hexArray.splice(2, 0, g);
		hexArray.push(b);
	};

	// turn elements in to number so we can compute its rgb value
	hexArray = hexArray.map(item => Number(item));

	let R = hexArray[0] * 16 + hexArray[1];
	let G = hexArray[2] * 16 + hexArray[3];
	let B = hexArray[4] * 16 + hexArray[5];

	let message = "#" + hex + " is RGB(" + R + ", " + G + ", " + B + ")"
	alert(message);
}


function HEXtoRGB(hex) {
	if (checkHexLength(hex) && checkHexValue(hex)) {
		codeHEXtoRGB(hex);
	} else {
		alert("Invalid Input");
	}
}






// RGB to HEX

// not like HEXtoRGB which was composed by functions
// all steps (value checking and trasforming) were written in one function
// due to the need of formatting input through the steps
// and the limitation on sharing variable through scopes

function RGBtoHEX(rgb) {

	// check element
	// possible RGB input format: RGB(r,g,b), rgb(r,g,b), (r,g,b), "r,g,b"
	let code = /[0-9RGBrgb(), ]/
	let form = [];
	for (i=0; i < rgb.length; i++) {
		form.push(code.test(rgb[i]));
	}
	if (form.includes(false)) {
		alert("Invalid Input");
		return
	}

	// formatting: make it [R,G,B]
	// clean the value till there is only numbers left (seperated by ",")
    rgb = rgb.replaceAll("(","").replaceAll(")","").replaceAll("R","").replaceAll("r","").replaceAll("G","").replaceAll("g","").replaceAll("B","").replaceAll("b","").replaceAll(" ","");

	// turn into array, and then check if it is composed by three elements
	let rgbArray = rgb.split(",");
	if (rgbArray.length !== 3) {
		alert("Invalid Input");
		return
	}

	// convert RGB to HEX
	rgbArray = rgbArray.map(item => Number(item));
	let R = rgbArray[0];
	let G = rgbArray[1];
	let B = rgbArray[2];
	// check value range (0~255)
	if (((0 <= R) && (R <= 255)) && ((0 <= G) && (G <= 255)) && ((0 <= B) && (B <= 255))) {
		// turn RGB into HEX
		let R1 = parseInt(R / 16);
		let R2 = R % 16;
		let G1 = parseInt(G / 16);
		let G2 = G % 16;
		let B1 = parseInt(B / 16);
		let B2 = B % 16;
		let hexArray = [R1,R2,G1,G2,B1,B2];

		hexArray = hexArray.map(item => {
			if (item === 10) {
				item = "A"
			} else if (item === 11) {
				item = "B"
			} else if (item === 12) {
				item = "C"
			} else if (item === 13) {
				item = "D"
			} else if (item === 14) {
				item = "E"
			} else if (item === 15) {
				item = "F"
			}
			return item
		})

		// hexArray is composed by number(0-9) and strings(ABCDEF)
		// use array.join to turn it into a single string
		let hexCode = "#" + hexArray.join("")
		let message = "rgb(" + R + ", " + G + ", " + B + ") is " + hexCode
		alert(message)
	} else {
		alert("Invalid Input");
		return
	}
}




// input RGB or HEX, convert accordingly
function HEXRGBconverter(){
	let color = prompt("HEX/RGB Converter: Enter (R,G,B) or RRGGBB");

	// RGB is composed by three values, which should be separated by clear punctuation
	// (make the punctuation "," as indicated in the prompt)
	// we deem it a RGB value if the input includes ","
	// if not, we deem the input a hex code

	if (color.includes(",")) {
		RGBtoHEX(color);
	} else {
		HEXtoRGB(color);
	}
}

HEXRGBconverter();
