// Get DOM elements
const difficulty = document.getElementById('difficulty')
const timer = document.querySelector('.timer')
const score = document.querySelector('.score')
const typeInput = document.getElementById('type-input')
const startReload = document.querySelector('.start-reload')
const toggleBtn = document.querySelector('.toggle-btn')
const currentWord = document.querySelector('.word')

// Word Array
const words = ['test', 'drag', 'time', 'apple', 'radiator', 'gladiator', 'egg', 'holiday', 'reusibility', 'famous', 'television', 'javascript', 'programming', 'web', 'this', 'that', 'dreaded']

// Game object
const gameData = {
  clock: 10,
  gameOver: false,
  gameStarted: false,
  difficulty: '',
  word: '',
  score: 0
}

// Declare in global scope for clear interval function
let interval

// Set difficulty
const setDifficulty = (e) => {
  gameData.difficulty = e.target.value
}

// Timer
const timerFunc = () => {
  interval = setInterval(() => {
    if (gameData.clock > 0) {
      // Decrement the clock every second
      gameData.clock--
      timer.innerHTML = gameData.clock
      console.log(gameData.clock)
    } else {
      clearInterval(interval)
      gameData.gameOver = true
    }
  }, 1000)
}

// Typing input
const typeInputFunc = (e) => {
  if (!gameData.gameOver && gameData.gameStarted) {
    if (e.target.value === gameData.word) {
      // Loop through words array and remove current word
      for (let i = 0; i < words.length; i++) {
        if (words[i] === gameData.word) {
          words.splice(i, 1)
        }
      }
      // Check difficulty and add to clock accordingly
      if (gameData.difficulty === 'Easy') {
        gameData.clock += 10
      }
      if (gameData.difficulty === 'Medium') {
        gameData.clock += 5
      }
      if (gameData.difficulty === 'Hard') {
        gameData.clock += 3
      }
      // get new random word and clear input
      gameData.score++
      score.innerHTML = gameData.score
      e.target.value = ''
      gameData.word = words[Math.floor(Math.random() * words.length)]
      currentWord.innerHTML = gameData.word
      console.log(words)
    }
    console.log(e.target.value)
  }
}

// Start game
const startReloadGame = (e) => {
  // Check difficulty has been selected
  if (!gameData.difficulty) {
    alert('You need to select a difficulty to start the game')
    return
  }
  console.log(`You are ready to start the game in ${gameData.difficulty} mode`)
  score.innerHTML = gameData.score
  gameData.word = words[Math.floor(Math.random() * words.length)]
  currentWord.innerHTML = gameData.word
  console.log(gameData.word)
  gameData.gameStarted = true
  clearInterval(interval)
  gameData.clock = 10
  timerFunc()
}

// Event listeners
startReload.addEventListener('click', startReloadGame)
difficulty.addEventListener('change', setDifficulty)
typeInput.addEventListener('input', typeInputFunc)
