// Question 2: 
// Write a javascript function that takes an array of numbers and a target number. 
// The function should find two different numbers in the array that, when added together, give the target number. 
// For example: answer([1,2,3], 4)should return [1,3]

function add2get1 (arrayIn, target) {
	let ans = []
	let length = arrayIn.length
	// sort the array in ascending order
	// so it is easier to find the pair values and skip value examined already
	let array = arrayIn.sort(function(a, b){return a-b})
	for (let i = 0; i < length; i++) {
		// no need to loop through all of array when the remaining elements would not be the answer, we break the loop
		// array is in ascending order
		// if there is no pair for numbers smaller than (target/2), there would not be pair for numbers bigger than (target/2)
		// the question specified on finding "two different numbers" so we rule out "array[i] = (target/2)" as well
		if (array[i] >= target / 2) {break}

		let lookFor = target - array[i];  // set variable lookFor as the paired number we are looking for
		// array is in ascending order, the loop start from the number next to array[i]
		// set the counter as j and see if there is matching value (same value as variable lookFor)
		for (let j = (i + 1); j < array.length; j++) {
			if (array[j] === lookFor) {
				let answer = [array[i], array[j]];
				ans.push(answer)
				// after we found the paired number (lookFor)
				// break the loop
				// no need to loop through the rest of the array as we had the pair already
				break
			}
		}
		// skip elements with the same value
		// example: [1,1,1,2,3], no need to check for value 1 again, go straight to value 2
		while (array[i] === array[i+1]) {i++}
	}

    if (ans.length === 0) {
        return "Numbers do not match"
    } else {
        return ans
    }
}