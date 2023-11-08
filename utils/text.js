const titleCase = (str) => {
  // Make all letters in the string lower case.
  let lowerCaseString = str.toLowerCase()
  //                    "i'm a little tea pot"

  // Turn the lower case string into an array with each
  // element of the array being a single word.
  let splitString = lowerCaseString.split(' ')
  //                ["i'm", 'a', 'little', 'teapot']

  // We are manipulating each word in the array with the
  // map function.
  let titleCaseArray = splitString.map((word) => {
  // Access the first letter of each word with bracket notation,
  // then capitalize it. Then concatenate (add) the rest of the 
  // word to the capitalized first letter by using slice.
    return word[0].toUpperCase() + word.slice(1)
  })
  //                   ["I'm", 'A', 'Little', 'Teapot']

  // Join the elements of the array back into a string, separating 
  // each word with a space.
  let titleCaseSentence = titleCaseArray.join(' ')
  //                      "I'm A Little Teapot"

  // Return the answer.
  return titleCaseSentence
}

module.exports = {
  titleCase
}