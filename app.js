// Get DOM elements
const difficulty = document.getElementById('difficulty')
const timer = document.querySelector('.timer')
const score = document.querySelector('.score')
const typeInput = document.getElementById('type-input')
const startReload = document.querySelector('.start-reload')
const toggleBtn = document.querySelector('.toggle-btn')
const currentWord = document.querySelector('.word')
const navBar = document.querySelector('.navbar')
const msgWin = document.querySelector('.message-win')
const msgLose = document.querySelector('.message-lose')

// Word Array - Could change to api
const words = ['test', 'drag', 'time', 'apple', 'radiator', 'gladiator', 'egg', 'holiday', 'reusibility', 'famous', 'television', 'javascript', 'programming', 'web', 'this', 'that', 'dreaded']

// Game object
const gameData = {
  clock: 10,
  gameOver: false,
  gameStarted: false,
  difficulty: '',
  word: '',
  score: 0,
  navbar: true
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
    // chack that there is time on the clock and no gameover
    if (gameData.clock > 0 && !gameData.gameOver) {
      // Decrement the clock every second
      gameData.clock--
      timer.innerHTML = gameData.clock
      // Call game status function
      gameStatus()
    } else {
      // If gameover or timer runs down, clear the intercal and set gameover to true
      clearInterval(interval)
      gameData.gameOver = true
    }
  }, 1000)
}

// Typing input
const typeInputFunc = (e) => {
  // Check game has been started and no game over
  if (!gameData.gameOver && gameData.gameStarted) {
    if (e.target.value === gameData.word) {
      // If input matched word loop through words array and remove current word
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
      gameStatus()
      gameData.score++
      score.innerHTML = gameData.score
      e.target.value = ''
      gameData.word = words[Math.floor(Math.random() * words.length)]
      currentWord.innerHTML = gameData.word ? gameData.word : ''
    }
  }
}

// Check for gameover or win
const gameStatus = () => {
  if (!words.length) {
    // Game is won
    gameData.gameOver = true
    msgWin.style.visibility = 'visible'
  }
  if (gameData.clock === 0) {
    gameData.gameOver = true
    msgLose.style.visibility = 'visible'
  }
}

// Start game
const startReloadGame = (e) => {
  // Check difficulty has been selected
  if (!gameData.difficulty) {
    alert('You need to select a difficulty to start the game')
    return
  }
  msgWin.style.visibility = 'hidden'
  msgLose.style.visibility = 'hidden'
  score.innerHTML = gameData.score
  gameData.word = words[Math.floor(Math.random() * words.length)]
  currentWord.innerHTML = gameData.word
  console.log(gameData.word)
  gameData.gameStarted = true
  clearInterval(interval)
  gameData.clock = 10
  timerFunc()
}

// Navbar toggle
const navToggle = () => {
  console.log('Test')
  if (gameData.navbar) {
    navBar.style.visibility = 'hidden'
    gameData.navbar = false
  } else {
    navBar.style.visibility = 'visible'
    gameData.navbar = true
  }
}

// Event listeners
startReload.addEventListener('click', startReloadGame)
difficulty.addEventListener('change', setDifficulty)
typeInput.addEventListener('input', typeInputFunc)
toggleBtn.addEventListener('click', navToggle)
