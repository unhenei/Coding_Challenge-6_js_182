// Question 1: 
// Clean the room function: given an input of [1,2,4,591,392,391,2,5,10,2,1,1,1,20,20], 
// make a function that organizes these into individual array that is ordered. 
// For example answer(ArrayFromAbove) should return: [[1,1,1,1],[2,2,2], 4,5,10,[20,20], 391, 392,591]. 

const array = [1,2,4,591,392,391,2,5,10,2,1,1,1,20,20]

function cleanRoom(array) {
	let arraySort = array.sort(function(a, b){return a-b});
	let org = [arraySort[0]]
	// set variable org as the temporary container (list) for values that are the same
	// give it original value as arraySort[0] because we start from the first element
	let ans = []

	for (let i = 0; i < arraySort.length; i++) {
		if (arraySort[i] === arraySort[i+1]) {
			org.push(arraySort[i+1])
		} else {
			(org.length === 1)? ans.push(org[0]) : ans.push(org)  // if the value is unique, it would not be put in a list
			org = [arraySort[i+1]];  // reset org to start examine on the next value/ element
		}
	}
	return ans
}

cleanRoom(array);

// Bonus: Make it so it organizes strings differently from number types. 
// i.e. [1, "2", "3", 2] should return [[1,2], ["2", "3"]]

// notice: the following solution is for array with strings and number only

function cleanRoomSN(array) {
	// Sorted out elements by type (strings and number) and make them new arrays
	// so we can organize them in order later
	const arrayString = array.filter(value => typeof(value) === "string");
	const arrayNumber = array.filter(value => typeof(value) === "number");
    let answer = []

    // use cleanRoom function to organized both arrays into ordered little arrays
    // and push the arrays/ elements into the answer list
    cleanRoom(arrayNumber).forEach(e => answer.push(e));
    cleanRoom(arrayString).forEach(e => answer.push(e));
    return answer
}
