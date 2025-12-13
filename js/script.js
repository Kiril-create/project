// База вопросов для квиза
const questions = [
    {
        question: "В какой игре главный герой сражается с зомби в оранжевой униформе?",
        answers: ["Left 4 Dead", "Minecraft", "The Sims", "Call of Duty"],
        correct: 0
    },
    {
        question: "Какая игра известна блоками и крафтом?",
        answers: ["Fortnite", "Minecraft", "Roblox", "Among Us"],
        correct: 1
    },
    {
        question: "В какой игре можно найти криперов?",
        answers: ["Minecraft", "PUBG", "GTA V", "FIFA"],
        correct: 0
    },
    {
        question: "Какая игра из серии 'The Legend of Zelda' вышла на Nintendo Switch?",
        answers: ["Breath of the Wild", "Ocarina of Time", "Twilight Princess", "Wind Waker"],
        correct: 0
    },
    {
        question: "Как называется игра, где нужно 'среди нас' найти предателя?",
        answers: ["Fortnite", "Fall Guys", "Among Us", "Rocket League"],
        correct: 2
    },
    {
        question: "Какой персонаж является талисманом Nintendo?",
        answers: ["Соник", "Марио", "Кратос", "Мастер Чиф"],
        correct: 1
    },
    {
        question: "В какой игре нужно строить базы и защищаться от зомби?",
        answers: ["Plants vs Zombies", "CS:GO", "Dota 2", "World of Warcraft"],
        correct: 0
    },
    {
        question: "Какая игра является шутером от первого лица с космическими солдатами?",
        answers: ["Halo", "FIFA", "The Sims", "Minecraft"],
        correct: 0
    },
    {
        question: "Как называется игра про квадратного персонажа в темнице?",
        answers: ["Dungeon Keeper", "Binding of Isaac", "Enter the Gungeon", "Undertale"],
        correct: 1
    },
    {
        question: "В какой игре можно кататься на скейтборде и выполнять трюки?",
        answers: ["Tony Hawk's Pro Skater", "Need for Speed", "Gran Turismo", "Forza Horizon"],
        correct: 0
    },
    {
        question: "Как называется игра, где нужно выживать на необитаемом острове?",
        answers: ["Subnautica", "Stardew Valley", "The Forest", "Terraria"],
        correct: 2
    },
    {
        question: "В какой игре есть режим 'Королевская битва' (Battle Royale)?",
        answers: ["Fortnite", "Minecraft Creative", "Roblox", "Among Us"],
        correct: 0
    },
    {
        question: "Какой жанр у игры 'The Sims'?",
        answers: ["Стратегия", "Симулятор жизни", "Шутер", "Ролевая игра"],
        correct: 1
    },
    {
        question: "В какой игре главный герой - охотник на монстров с белыми волосами?",
        answers: ["Dark Souls", "The Witcher", "Skyrim", "God of War"],
        correct: 1
    },
    {
        question: "Какая игра позволяет создавать свои миры и игры?",
        answers: ["Roblox", "Call of Duty", "Valorant", "Apex Legends"],
        correct: 0
    },
    {
        question: "Как называется игра про кубических птичек, которые злятся?",
        answers: ["Flappy Bird", "Angry Birds", "Crazy Birds", "Bird Simulator"],
        correct: 1
    },
    {
        question: "В какой игре можно играть за футбольные команды со всего мира?",
        answers: ["NBA 2K", "FIFA", "Madden NFL", "WWE 2K"],
        correct: 1
    },
    {
        question: "Какая игра про строительство и управление городом?",
        answers: ["Cities: Skylines", "Civilization", "Age of Empires", "SimCity"],
        correct: 0
    },
    {
        question: "Как называется игра, где нужно убегать от слизистой розовой массы?",
        answers: ["Slime Rancher", "Fall Guys", "Among Us", "Roblox"],
        correct: 0
    },
    {
        question: "В какой игре есть персонаж по имени ЭлоГрин11? (вымышленный пример)",
        answers: ["Brawl Stars", "Clash Royale", "Mobile Legends", "League of Legends"],
        correct: 1
    }
];

// Переменные игры
let currentQuestionIndex = 0;
let scoreTeamA = 0;
let scoreTeamB = 0;
let currentTeam = 'A';
let timerInterval;
let timeLeft = 30;
const totalTime = 30;
let fiftyFiftyAvailable = true;
let fiftyFiftyUsed = false;

// Функция для загрузки вопроса
function loadQuestion() {
    if (currentQuestionIndex >= questions.length) {
        endGame();
        return;
    }

    const question = questions[currentQuestionIndex];
    const questionElement = document.getElementById('questionText');
    const answersContainer = document.getElementById('answersContainer');
    const currentQuestionElement = document.getElementById('currentQuestion');
    const totalQuestionsElement = document.getElementById('totalQuestions');
    const hintStatusText = document.getElementById('hintStatusText');
    
    if (questionElement && answersContainer && currentQuestionElement) {
        // Обновляем номер вопроса
        currentQuestionElement.textContent = currentQuestionIndex + 1;
        
        // Обновляем общее количество вопросов
        if (totalQuestionsElement) {
            totalQuestionsElement.textContent = questions.length;
        }
        
        // Обновляем статус подсказки
        if (hintStatusText) {
            hintStatusText.textContent = fiftyFiftyAvailable ? "доступна" : "использована";
        }
        
        // Показываем вопрос
        questionElement.textContent = question.question;
        
        // Очищаем предыдущие ответы
        answersContainer.innerHTML = '';
        
        // Создаем кнопки ответов
        question.answers.forEach((answer, index) => {
            const button = document.createElement('button');
            button.className = 'answer-btn';
            button.textContent = `${String.fromCharCode(65 + index)}. ${answer}`;
            button.onclick = () => checkAnswer(index);
            answersContainer.appendChild(button);
        });
        
        // Обновляем счёт на странице
        updateScores();
        
        // Обновляем индикатор текущей команды
        updateTeamIndicator();
        
        // Обновляем общий счёт
        updateTotalScore();
        
        // Обновляем кнопку подсказки
        updateHintButton();
        
        // Сбрасываем и запускаем таймер
        resetTimer();
        startTimer();
    }
}

// Функция обновления индикатора команды
function updateTeamIndicator() {
    const teamAElement = document.getElementById('teamA');
    const teamBElement = document.getElementById('teamB');
    const turnAElement = document.getElementById('turnA');
    const turnBElement = document.getElementById('turnB');
    
    // Снимаем активный класс со всех
    if (teamAElement) teamAElement.classList.remove('active');
    if (teamBElement) teamBElement.classList.remove('active');
    
    // Обновляем текст индикатора
    if (turnAElement && turnBElement) {
        if (currentTeam === 'A') {
            turnAElement.innerHTML = '<i class="fas fa-user-clock"></i> Сейчас отвечает';
            turnBElement.innerHTML = '<i class="fas fa-user-clock"></i> Ждёт очереди';
        } else {
            turnAElement.innerHTML = '<i class="fas fa-user-clock"></i> Ждёт очереди';
            turnBElement.innerHTML = '<i class="fas fa-user-clock"></i> Сейчас отвечает';
        }
    }
    
    // Добавляем активный класс текущей команде
    if (currentTeam === 'A' && teamAElement) {
        teamAElement.classList.add('active');
    } else if (teamBElement) {
        teamBElement.classList.add('active');
    }
}

// Функция обновления общего счёта
function updateTotalScore() {
    const scoreTotalElement = document.getElementById('scoreTotal');
    if (scoreTotalElement) {
        scoreTotalElement.textContent = `${scoreTeamA}:${scoreTeamB}`;
    }
}

// Функция обновления кнопки подсказки
function updateHintButton() {
    const hintUseBtn = document.getElementById('hintUseBtn');
    const hintStatusText = document.getElementById('hintStatusText');
    const hintIndicator = document.getElementById('hintIndicator');
    
    if (hintUseBtn && hintStatusText && hintIndicator) {
        if (fiftyFiftyAvailable && !fiftyFiftyUsed) {
            hintUseBtn.disabled = false;
            hintUseBtn.textContent = "Использовать";
            hintStatusText.textContent = "доступна";
            hintIndicator.style.opacity = "1";
        } else {
            hintUseBtn.disabled = true;
            hintUseBtn.textContent = "Использована";
            hintStatusText.textContent = "использована";
            hintIndicator.style.opacity = "0.7";
        }
    }
}

// Функция запуска таймера
function startTimer() {
    const timerValue = document.getElementById('timerValue');
    const timerBar = document.getElementById('timerBar');
    const timerElement = document.getElementById('timer');
    
    // Сбрасываем время
    timeLeft = totalTime;
    if (timerValue) timerValue.textContent = timeLeft;
    if (timerBar) {
        timerBar.style.width = '100%';
        timerBar.style.background = 'linear-gradient(90deg, #4ecdc4, #ffd166, #ff6b6b)';
    }
    if (timerElement) {
        timerElement.classList.remove('warning', 'danger');
    }
    
    // Запускаем таймер
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        timeLeft--;
        
        // Обновляем отображение времени
        if (timerValue) timerValue.textContent = timeLeft;
        
        // Обновляем прогресс-бар
        if (timerBar) {
            const progress = (timeLeft / totalTime) * 100;
            timerBar.style.width = `${progress}%`;
        }
        
        // Меняем стили при малом времени
        if (timerElement) {
            if (timeLeft <= 5) {
                timerElement.classList.add('danger');
                timerElement.classList.remove('warning');
            } else if (timeLeft <= 10) {
                timerElement.classList.add('warning');
                timerElement.classList.remove('danger');
            }
        }
        
        // Время вышло
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            timeOut();
        }
    }, 1000);
}

// Функция сброса таймера
function resetTimer() {
    clearInterval(timerInterval);
    timeLeft = totalTime;
    const timerValue = document.getElementById('timerValue');
    const timerBar = document.getElementById('timerBar');
    const timerElement = document.getElementById('timer');
    
    if (timerValue && timerBar && timerElement) {
        timerValue.textContent = timeLeft;
        timerBar.style.width = '100%';
        timerBar.style.background = 'linear-gradient(90deg, #4ecdc4, #ffd166, #ff6b6b)';
        timerElement.classList.remove('warning', 'danger');
    }
}

// Функция при истечении времени
function timeOut() {
    const answerButtons = document.querySelectorAll('.answer-btn');
    const question = questions[currentQuestionIndex];
    
    // Отключаем все кнопки
    answerButtons.forEach(button => {
        button.style.pointerEvents = 'none';
        button.classList.add('disabled');
    });
    
    // Подсвечиваем правильный ответ
    if (question && answerButtons[question.correct]) {
        answerButtons[question.correct].classList.add('correct');
    }
    
    // Меняем команду для следующего вопроса
    currentTeam = currentTeam === 'A' ? 'B' : 'A';
    
    // Ждём 1.5 секунды и переходим к следующему вопросу
    setTimeout(() => {
        currentQuestionIndex++;
        fiftyFiftyUsed = false; // Сбрасываем подсказку для нового вопроса
        loadQuestion();
    }, 1500);
}

// Функция проверки ответа
function checkAnswer(selectedIndex) {
    // Останавливаем таймер
    clearInterval(timerInterval);
    
    const question = questions[currentQuestionIndex];
    const answerButtons = document.querySelectorAll('.answer-btn');
    
    // Отключаем все кнопки
    answerButtons.forEach(button => {
        button.style.pointerEvents = 'none';
        button.classList.add('disabled');
    });
    
    // Проверяем правильность ответа
    if (selectedIndex === question.correct) {
        // Правильный ответ
        answerButtons[selectedIndex].classList.add('correct');
        
        // Начисляем очки текущей команде
        if (currentTeam === 'A') {
            scoreTeamA++;
        } else {
            scoreTeamB++;
        }
        
        // Показываем анимацию добавления очков
        showScoreAnimation(currentTeam);
        
        // Обновляем общий счёт
        updateTotalScore();
    } else {
        // Неправильный ответ
        answerButtons[selectedIndex].classList.add('incorrect');
        answerButtons[question.correct].classList.add('correct');
    }
    
    // Меняем команду для следующего вопроса
    currentTeam = currentTeam === 'A' ? 'B' : 'A';
    
    // Ждём 1.5 секунды и переходим к следующему вопросу
    setTimeout(() => {
        currentQuestionIndex++;
        fiftyFiftyUsed = false; // Сбрасываем подсказку для нового вопроса
        loadQuestion();
    }, 1500);
}

// Функция подсказки 50/50
function useFiftyFiftyHint() {
    if (!fiftyFiftyAvailable || fiftyFiftyUsed) {
        return;
    }
    
    const question = questions[currentQuestionIndex];
    const answerButtons = document.querySelectorAll('.answer-btn');
    const correctIndex = question.correct;
    
    // Находим индексы неправильных ответов
    const wrongAnswers = [];
    for (let i = 0; i < answerButtons.length; i++) {
        if (i !== correctIndex) {
            wrongAnswers.push(i);
        }
    }
    
    // Перемешиваем неправильные ответы
    for (let i = wrongAnswers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [wrongAnswers[i], wrongAnswers[j]] = [wrongAnswers[j], wrongAnswers[i]];
    }
    
    // Оставляем только один неправильный ответ (плюс правильный)
    const answersToHide = wrongAnswers.slice(0, 2);
    
    // Скрываем выбранные неправильные ответы
    answersToHide.forEach(index => {
        answerButtons[index].classList.add('hidden-answer');
        answerButtons[index].style.pointerEvents = 'none';
    });
    
    // Помечаем подсказку как использованную
    fiftyFiftyUsed = true;
    
    // Обновляем кнопку подсказки
    updateHintButton();
    
    // Показываем сообщение о использовании подсказки
    showHintUsedMessage();
}

// Функция показа сообщения о использовании подсказки
function showHintUsedMessage() {
    const questionElement = document.getElementById('questionText');
    if (!questionElement) return;
    
    const originalText = questionElement.textContent;
    questionElement.innerHTML = `
        <div class="hint-used-message">
            <i class="fas fa-percentage" style="font-size: 2em; margin-bottom: 10px; color: #8E2DE2;"></i>
            <h3>Подсказка 50/50 использована!</h3>
            <p>2 неверных ответа скрыты</p>
        </div>
    `;
    
    setTimeout(() => {
        questionElement.textContent = originalText;
    }, 1500);
}

// Функция анимации добавления очков
function showScoreAnimation(team) {
    const scoreElement = team === 'A' ? 
        document.getElementById('scoreA') : 
        document.getElementById('scoreB');
    
    if (scoreElement) {
        scoreElement.classList.add('score-animation');
        setTimeout(() => {
            scoreElement.classList.remove('score-animation');
        }, 500);
    }
}

// Функция обновления счёта
function updateScores() {
    const scoreAElement = document.getElementById('scoreA');
    const scoreBElement = document.getElementById('scoreB');
    
    if (scoreAElement && scoreBElement) {
        scoreAElement.textContent = scoreTeamA;
        scoreBElement.textContent = scoreTeamB;
    }
}

// Функция окончания игры
function endGame() {
    // Останавливаем таймер
    clearInterval(timerInterval);
    
    // Сохраняем результаты в localStorage
    localStorage.setItem('quizScoreA', scoreTeamA);
    localStorage.setItem('quizScoreB', scoreTeamB);
    
    // Переходим на страницу результатов
    window.location.href = 'result.html';
}

// Функция перезапуска игры
function restartGame() {
    if (confirm('Вы уверены, что хотите начать игру заново? Весь прогресс будет сброшен.')) {
        // Останавливаем таймер
        clearInterval(timerInterval);
        
        // Сбрасываем переменные
        currentQuestionIndex = 0;
        scoreTeamA = 0;
        scoreTeamB = 0;
        currentTeam = 'A';
        fiftyFiftyAvailable = true;
        fiftyFiftyUsed = false;
        
        // Загружаем первый вопрос
        loadQuestion();
    }
}

// Функция возврата на главную
function goHome() {
    if (confirm('Вернуться на главную страницу? Текущий прогресс будет потерян.')) {
        window.location.href = 'index.html';
    }
}

// Функция для страницы результатов
function showResults() {
    const finalScoreA = document.getElementById('finalScoreA');
    const finalScoreB = document.getElementById('finalScoreB');
    const resultTitle = document.getElementById('resultTitle');
    const resultIcon = document.getElementById('resultIcon');
    const winnerMessage = document.getElementById('winnerMessage');
    
    if (finalScoreA && finalScoreB && resultTitle && resultIcon && winnerMessage) {
        // Получаем результаты из localStorage
        const scoreA = parseInt(localStorage.getItem('quizScoreA')) || 0;
        const scoreB = parseInt(localStorage.getItem('quizScoreB')) || 0;
        
        // Показываем финальный счёт
        finalScoreA.textContent = scoreA;
        finalScoreB.textContent = scoreB;
        
        // Определяем победителя
        if (scoreA > scoreB) {
            resultTitle.textContent = "Победила Команда Синих! 🏆";
            resultIcon.innerHTML = '<i class="fas fa-trophy" style="color: #4ecdc4;"></i>';
            winnerMessage.innerHTML = `
                <h3>Поздравляем Команду Синих!</h3>
                <p>Вы показали выдающийся результат с ${scoreA} очками!</p>
                <p>Попробуйте сыграть ещё раз и побить свой рекорд!</p>
            `;
            winnerMessage.style.borderLeftColor = "#4ecdc4";
        } else if (scoreB > scoreA) {
            resultTitle.textContent = "Победила Команда Красных! 🏆";
            resultIcon.innerHTML = '<i class="fas fa-trophy" style="color: #ff6b6b;"></i>';
            winnerMessage.innerHTML = `
                <h3>Поздравляем Команду Красных!</h3>
                <p>Вы были непобедимы с ${scoreB} очками!</p>
                <p>Может быть, сыграем реванш?</p>
            `;
            winnerMessage.style.borderLeftColor = "#ff6b6b";
        } else {
            resultTitle.textContent = "Ничья! 🤝";
            resultIcon.innerHTML = '<i class="fas fa-handshake" style="color: #ffd166;"></i>';
            winnerMessage.innerHTML = `
                <h3>Невероятно! Ничья!</h3>
                <p>Обе команды набрали по ${scoreA} очков!</p>
                <p>Нужна решающая игра!</p>
            `;
            winnerMessage.style.borderLeftColor = "#ffd166";
        }
    }
}

// Функция "Играть ещё раз"
function playAgain() {
    window.location.href = 'index.html';
}

// Функция возврата на главную со страницы результатов
function goHomeFromResults() {
    window.location.href = 'index.html';
}

// Инициализация игры при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Определяем, на какой странице находимся
    const path = window.location.pathname;
    
    if (path.includes('game.html') || path.endsWith('game.html')) {
        // Устанавливаем общее количество вопросов
        const totalQuestionsElement = document.getElementById('totalQuestions');
        if (totalQuestionsElement) {
            totalQuestionsElement.textContent = questions.length;
        }
        
        // Добавляем обработчики событий
        const hintUseBtn = document.getElementById('hintUseBtn');
        const restartBtn = document.getElementById('restartBtn');
        const homeBtn = document.getElementById('homeBtn');
        
        if (hintUseBtn) {
            hintUseBtn.addEventListener('click', useFiftyFiftyHint);
        }
        
        if (restartBtn) {
            restartBtn.addEventListener('click', restartGame);
        }
        
        if (homeBtn) {
            homeBtn.addEventListener('click', goHome);
        }
        
        // Загружаем первый вопрос
        loadQuestion();
    } else if (path.includes('result.html') || path.endsWith('result.html')) {
        // Добавляем обработчики для страницы результатов
        const playAgainBtn = document.querySelector('.play-again-btn');
        const homeBtnResult = document.querySelector('.home-btn');
        
        if (playAgainBtn) {
            playAgainBtn.addEventListener('click', playAgain);
        }
        
        if (homeBtnResult) {
            homeBtnResult.addEventListener('click', goHomeFromResults);
        }
        
        showResults();
    }
});
