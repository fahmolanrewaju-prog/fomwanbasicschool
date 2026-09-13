/* ============================================
   FOMWAN Basic School - Kids Games
   Developer: Fahm Mubarak Olanrewaju
   ============================================ */

// ========== MEMORY MATCH GAME ==========
const memoryEmojis = ['📚', '🕌', '✏️', '🌟', '🍎', '🦋', '🎨', '🚀'];
let memoryCards = [];
let flippedCards = [];
let matchedPairs = 0;
let moves = 0;
let canFlip = true;

function startMemoryGame() {
  const board = document.getElementById('memory-board');
  const scoreEl = document.getElementById('memory-score');
  board.innerHTML = '';
  flippedCards = [];
  matchedPairs = 0;
  moves = 0;
  canFlip = true;
  scoreEl.textContent = 'Moves: 0 | Matches: 0/8';

  // Duplicate and shuffle
  memoryCards = [...memoryEmojis, ...memoryEmojis]
    .sort(() => Math.random() - 0.5);

  memoryCards.forEach((emoji, index) => {
    const card = document.createElement('div');
    card.className = 'memory-card';
    card.dataset.index = index;
    card.dataset.emoji = emoji;
    card.textContent = emoji;
    card.addEventListener('click', () => flipCard(card));
    board.appendChild(card);
  });
}

function flipCard(card) {
  if (!canFlip || card.classList.contains('flipped') || card.classList.contains('matched')) return;

  card.classList.add('flipped');
  flippedCards.push(card);

  if (flippedCards.length === 2) {
    canFlip = false;
    moves++;
    document.getElementById('memory-score').textContent = `Moves: ${moves} | Matches: ${matchedPairs}/8`;

    const [c1, c2] = flippedCards;
    if (c1.dataset.emoji === c2.dataset.emoji) {
      c1.classList.add('matched');
      c2.classList.add('matched');
      matchedPairs++;
      flippedCards = [];
      canFlip = true;
      document.getElementById('memory-score').textContent = `Moves: ${moves} | Matches: ${matchedPairs}/8`;

      if (matchedPairs === 8) {
        setTimeout(() => {
          alert(`🎉 MashaAllah! You found all pairs in ${moves} moves!`);
        }, 400);
      }
    } else {
      setTimeout(() => {
        c1.classList.remove('flipped');
        c2.classList.remove('flipped');
        flippedCards = [];
        canFlip = true;
      }, 800);
    }
  }
}

// ========== MATH QUIZ ==========
let mathScore = 0;
let mathQuestion = 0;
const mathTotal = 8;

function startMathQuiz() {
  mathScore = 0;
  mathQuestion = 0;
  document.getElementById('math-score').textContent = `Score: 0/${mathTotal}`;
  nextMathQuestion();
}

function nextMathQuestion() {
  if (mathQuestion >= mathTotal) {
    document.getElementById('math-question').textContent = `🎉 Finished! You scored ${mathScore} out of ${mathTotal}`;
    document.getElementById('math-options').innerHTML = `
      <button class="quiz-btn" onclick="startMathQuiz()">Play Again</button>
    `;
    return;
  }

  mathQuestion++;
  const a = Math.floor(Math.random() * 10) + 1;
  const b = Math.floor(Math.random() * 10) + 1;
  const op = Math.random() > 0.4 ? '+' : '-';
  let answer, displayA, displayB;

  if (op === '+') {
    answer = a + b;
    displayA = a;
    displayB = b;
  } else {
    // ensure positive result
    displayA = Math.max(a, b);
    displayB = Math.min(a, b);
    answer = displayA - displayB;
  }

  document.getElementById('math-question').textContent = `Question ${mathQuestion}: What is ${displayA} ${op} ${displayB}?`;

  // Generate options
  const options = new Set([answer]);
  while (options.size < 4) {
    const wrong = answer + Math.floor(Math.random() * 7) - 3;
    if (wrong !== answer && wrong >= 0) options.add(wrong);
  }

  const shuffled = [...options].sort(() => Math.random() - 0.5);
  const container = document.getElementById('math-options');
  container.innerHTML = '';

  shuffled.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'quiz-btn';
    btn.textContent = opt;
    btn.onclick = () => {
      if (opt === answer) {
        btn.classList.add('correct');
        mathScore++;
      } else {
        btn.classList.add('wrong');
        // highlight correct
        [...container.children].forEach(b => {
          if (parseInt(b.textContent) === answer) b.classList.add('correct');
        });
      }
      document.getElementById('math-score').textContent = `Score: ${mathScore}/${mathTotal}`;
      setTimeout(nextMathQuestion, 900);
    };
    container.appendChild(btn);
  });
}

// ========== ISLAMIC KNOWLEDGE QUIZ ==========
const islamicQuestions = [
  { q: "How many times do Muslims pray every day?", options: ["3", "5", "7", "2"], answer: "5" },
  { q: "What is the holy book of Islam called?", options: ["Bible", "Torah", "Qur'an", "Injil"], answer: "Qur'an" },
  { q: "Who is the last Prophet of Islam?", options: ["Prophet Musa", "Prophet Isa", "Prophet Muhammad (SAW)", "Prophet Ibrahim"], answer: "Prophet Muhammad (SAW)" },
  { q: "In which city was Prophet Muhammad (SAW) born?", options: ["Madinah", "Makkah", "Jerusalem", "Cairo"], answer: "Makkah" },
  { q: "What do we say before eating?", options: ["Alhamdulillah", "Bismillah", "Subhanallah", "Allahu Akbar"], answer: "Bismillah" },
  { q: "What is the first month of the Islamic calendar?", options: ["Ramadan", "Muharram", "Shawwal", "Dhul-Hijjah"], answer: "Muharram" },
  { q: "How many pillars of Islam are there?", options: ["3", "4", "5", "6"], answer: "5" },
  { q: "What do Muslims face when praying?", options: ["The Sun", "The Kaaba", "A Mountain", "The Sea"], answer: "The Kaaba" }
];

let islamicScore = 0;
let islamicIndex = 0;

function startIslamicQuiz() {
  islamicScore = 0;
  islamicIndex = 0;
  // shuffle questions
  islamicQuestions.sort(() => Math.random() - 0.5);
  document.getElementById('islamic-score').textContent = `Score: 0/${islamicQuestions.length}`;
  nextIslamicQuestion();
}

function nextIslamicQuestion() {
  if (islamicIndex >= islamicQuestions.length) {
    document.getElementById('islamic-question').textContent = `🎉 MashaAllah! You scored ${islamicScore} out of ${islamicQuestions.length}`;
    document.getElementById('islamic-options').innerHTML = `
      <button class="quiz-btn" onclick="startIslamicQuiz()">Play Again</button>
    `;
    return;
  }

  const current = islamicQuestions[islamicIndex];
  document.getElementById('islamic-question').textContent = `Q${islamicIndex + 1}: ${current.q}`;

  const container = document.getElementById('islamic-options');
  container.innerHTML = '';

  const shuffledOpts = [...current.options].sort(() => Math.random() - 0.5);

  shuffledOpts.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'quiz-btn';
    btn.textContent = opt;
    btn.onclick = () => {
      if (opt === current.answer) {
        btn.classList.add('correct');
        islamicScore++;
      } else {
        btn.classList.add('wrong');
        [...container.children].forEach(b => {
          if (b.textContent === current.answer) b.classList.add('correct');
        });
      }
      document.getElementById('islamic-score').textContent = `Score: ${islamicScore}/${islamicQuestions.length}`;
      islamicIndex++;
      setTimeout(nextIslamicQuestion, 1000);
    };
    container.appendChild(btn);
  });
}

// ========== COLOUR MATCH ==========
const colours = [
  { name: 'Green', hex: '#0d7a4f' },
  { name: 'Gold', hex: '#f4c430' },
  { name: 'Blue', hex: '#3498db' },
  { name: 'Red', hex: '#e74c3c' },
  { name: 'Purple', hex: '#9b59b6' },
  { name: 'Orange', hex: '#e67e22' }
];

let colourScore = 0;
let colourRound = 0;
const colourTotal = 6;

function startColourGame() {
  colourScore = 0;
  colourRound = 0;
  document.getElementById('colour-score').textContent = `Score: 0/${colourTotal}`;
  nextColourRound();
}

function nextColourRound() {
  if (colourRound >= colourTotal) {
    document.getElementById('colour-question').textContent = `🎉 Great job! You got ${colourScore} out of ${colourTotal}`;
    document.getElementById('colour-options').innerHTML = `
      <button class="quiz-btn" onclick="startColourGame()">Play Again</button>
    `;
    document.getElementById('colour-swatch').style.background = '#eee';
    return;
  }

  colourRound++;
  const correct = colours[Math.floor(Math.random() * colours.length)];
  document.getElementById('colour-swatch').style.background = correct.hex;
  document.getElementById('colour-question').textContent = `Round ${colourRound}: What colour is this?`;

  // pick 3 wrong + correct
  const opts = new Set([correct.name]);
  while (opts.size < 4) {
    opts.add(colours[Math.floor(Math.random() * colours.length)].name);
  }

  const shuffled = [...opts].sort(() => Math.random() - 0.5);
  const container = document.getElementById('colour-options');
  container.innerHTML = '';

  shuffled.forEach(name => {
    const btn = document.createElement('button');
    btn.className = 'quiz-btn';
    btn.textContent = name;
    btn.onclick = () => {
      if (name === correct.name) {
        btn.classList.add('correct');
        colourScore++;
      } else {
        btn.classList.add('wrong');
        [...container.children].forEach(b => {
          if (b.textContent === correct.name) b.classList.add('correct');
        });
      }
      document.getElementById('colour-score').textContent = `Score: ${colourScore}/${colourTotal}`;
      setTimeout(nextColourRound, 900);
    };
    container.appendChild(btn);
  });
}

// ========== MODAL CONTROL ==========
function openGame(gameId) {
  document.getElementById('game-modal').classList.add('active');
  // hide all game contents
  document.querySelectorAll('.game-content').forEach(el => el.style.display = 'none');
  document.getElementById(gameId).style.display = 'block';

  // start the selected game
  if (gameId === 'memory-game') startMemoryGame();
  if (gameId === 'math-game') startMathQuiz();
  if (gameId === 'islamic-game') startIslamicQuiz();
  if (gameId === 'colour-game') startColourGame();
}

function closeGame() {
  document.getElementById('game-modal').classList.remove('active');
}

// Close on outside click
document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('game-modal');
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeGame();
    });
  }
});

// Mobile menu
function toggleMenu() {
  document.querySelector('.nav-links').classList.toggle('open');
}