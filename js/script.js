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
let currentTeam = 'A'; // Какая команда отвечает сейчас
let timerInterval;
let timeLeft = 30; // Время на ответ в секундах
const totalTime = 30; // Общее время на ответ
let gameStartTime;
let correctAnswersA = 0;
let correctAnswersB = 0;

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
    const progressElement = document.getElementById('questionProgress');
    const progressPercentElement = document.getElementById('progressPercent');
    const totalQuestionsElement = document.getElementById('totalQuestions');
    
    if (questionElement && answersContainer && currentQuestionElement) {
        // Обновляем номер вопроса
        currentQuestionElement.textContent = currentQuestionIndex + 1;
        
        // Обновляем общее количество вопросов
        if (totalQuestionsElement) {
            totalQuestionsElement.textContent = questions.length;
        }
        
        // Обновляем прогресс
        const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
        if (progressElement) {
            progressElement.style.width = `${progress}%`;
        }
        if (progressPercentElement) {
            progressPercentElement.textContent = `${Math.round(progress)}%`;
        }
        
        // Показываем вопрос
        questionElement.textContent = question.question;
        
        // Очищаем предыдущие ответы
        answersContainer.innerHTML = '';
        
        // Создаем кнопки ответов
        question.answers.forEach((answer, index) => {
            const button = document.createElement('button');
            button.className = 'answer-btn';
            
            // Добавляем букву ответа
            const answerLetter = String.fromCharCode(65 + index); // A, B, C, D
            button.innerHTML = `<span class="answer-letter">${answerLetter}</span> ${answer}`;
            
            button.onclick = () => checkAnswer(index);
            answersContainer.appendChild(button);
        });
        
        // Обновляем счёт на странице
        updateScores();
        
        // Обновляем индикатор текущей команды
        updateTeamIndicator();
        
        // Обновляем общий счёт
        updateTotalScore();
        
        // Сбрасываем и запускаем таймер
        resetTimer();
        startTimer();
        
        // Запоминаем время начала игры
        if (!gameStartTime) {
            gameStartTime = new Date();
        }
    }
}

// Функция обновления индикатора команды
function updateTeamIndicator() {
    const teamAElement = document.getElementById('teamA');
    const teamBElement = document.getElementById('teamB');
    const turnAElement = document.getElementById('turnA');
    const turnBElement = document.getElementById('turnB');
    
    // Снимаем активный класс со всех
    teamAElement.classList.remove('active');
    teamBElement.classList.remove('active');
    
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
    if (currentTeam === 'A') {
        teamAElement.classList.add('active');
        teamAElement.classList.add('team-switch-animation');
        setTimeout(() => {
            teamAElement.classList.remove('team-switch-animation');
        }, 500);
    } else {
        teamBElement.classList.add('active');
        teamBElement.classList.add('team-switch-animation');
        setTimeout(() => {
            teamBElement.classList.remove('team-switch-animation');
        }, 500);
    }
}

// Функция обновления общего счёта
function updateTotalScore() {
    const scoreTotalElement = document.getElementById('scoreTotal');
    if (scoreTotalElement) {
        scoreTotalElement.textContent = `${scoreTeamA}:${scoreTeamB}`;
    }
}

// Функция запуска таймера
function startTimer() {
    const timerValue = document.getElementById('timerValue');
    const timerBar = document.getElementById('timerBar');
    const timerElement = document.getElementById('timer');
    const timerHint = document.getElementById('timerHint');
    
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
    if (timerHint) {
        timerHint.textContent = 'Успейте ответить до окончания времени!';
        timerHint.style.color = '#aaa';
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
                if (timerHint) {
                    timerHint.textContent = 'Срочно! Время почти вышло!';
                    timerHint.style.color = '#ff6b6b';
                }
            } else if (timeLeft <= 10) {
                timerElement.classList.add('warning');
                timerElement.classList.remove('danger');
                if (timerHint) {
                    timerHint.textContent = 'Поторопитесь! Время заканчивается!';
                    timerHint.style.color = '#ffd166';
                }
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
    const timerHint = document.getElementById('timerHint');
    
    if (timerValue && timerBar && timerElement && timerHint) {
        timerValue.textContent = timeLeft;
        timerBar.style.width = '100%';
        timerBar.style.background = 'linear-gradient(90deg, #4ecdc4, #ffd166, #ff6b6b)';
        timerElement.classList.remove('warning', 'danger');
        timerHint.textContent = 'Успейте ответить до окончания времени!';
        timerHint.style.color = '#aaa';
    }
}

// Функция при истечении времени
function timeOut() {
    const answerButtons = document.querySelectorAll('.answer-btn');
    const question = questions[currentQuestionIndex];
    const timerElement = document.getElementById('timer');
    
    // Анимация окончания времени
    if (timerElement) {
        timerElement.classList.add('time-out');
        setTimeout(() => {
            timerElement.classList.remove('time-out');
        }, 500);
    }
    
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
    
    // Показываем сообщение об окончании времени
    showTimeoutMessage();
    
    // Ждём 2 секунды и переходим к следующему вопросу
    setTimeout(() => {
        currentQuestionIndex++;
        loadQuestion();
    }, 2000);
}

// Функция показа сообщения об окончании времени
function showTimeoutMessage() {
    const questionElement = document.getElementById('questionText');
    if (!questionElement) return;
    
    const originalText = questionElement.textContent;
    questionElement.innerHTML = `
        <div class="timeout-message">
            <i class="fas fa-clock" style="font-size: 3em; margin-bottom: 15px;"></i>
            <h3>Время вышло!</h3>
            <p>Правильный ответ был показан выше</p>
            <p style="font-size: 0.9em; opacity: 0.8;">Следующий вопрос будет за ${currentTeam === 'A' ? 'Командой Синих' : 'Командой Красных'}</p>
        </div>
    `;
    
    // Возвращаем оригинальный текст через 2 секунды
    setTimeout(() => {
        questionElement.textContent = originalText;
    }, 2000);
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
            correctAnswersA++;
        } else {
            scoreTeamB++;
            correctAnswersB++;
        }
        
        // Показываем анимацию добавления очков
        showScoreAnimation(currentTeam);
        
        // Обновляем общий счёт
        updateTotalScore();
        
        // Показываем сообщение об успехе
        showSuccessMessage();
    } else {
        // Неправильный ответ
        answerButtons[selectedIndex].classList.add('incorrect');
        answerButtons[question.correct].classList.add('correct');
        
        // Показываем сообщение об ошибке
        showErrorMessage();
    }
    
    // Меняем команду для следующего вопроса
    currentTeam = currentTeam === 'A' ? 'B' : 'A';
    
    // Ждём 2 секунды и переходим к следующему вопросу
    setTimeout(() => {
        currentQuestionIndex++;
        loadQuestion();
    }, 2000);
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

// Функция показа сообщения об успехе
function showSuccessMessage() {
    const questionElement = document.getElementById('questionText');
    if (!questionElement) return;
    
    const originalText = questionElement.textContent;
    questionElement.innerHTML = `
        <div class="success-message">
            <i class="fas fa-check-circle" style="font-size: 3em; margin-bottom: 15px; color: #00b09b;"></i>
            <h3>Правильно!</h3>
            <p>+1 очко для ${currentTeam === 'A' ? 'Команды Синих' : 'Команды Красных'}</p>
            <p style="font-size: 0.9em; opacity: 0.8;">Следующий вопрос будет за ${currentTeam === 'A' ? 'Командой Красных' : 'Командой Синих'}</p>
        </div>
    `;
    
    setTimeout(() => {
        questionElement.textContent = originalText;
    }, 2000);
}

// Функция показа сообщения об ошибке
function showErrorMessage() {
    const questionElement = document.getElementById('questionText');
    if (!questionElement) return;
    
    const originalText = questionElement.textContent;
    questionElement.innerHTML = `
        <div class="error-message">
            <i class="fas fa-times-circle" style="font-size: 3em; margin-bottom: 15px; color: #ff416c;"></i>
            <h3>Неправильно!</h3>
            <p>Следующий вопрос будет за ${currentTeam === 'A' ? 'Командой Красных' : 'Командой Синих'}</p>
        </div>
    `;
    
    setTimeout(() => {
        questionElement.textContent = originalText;
    }, 2000);
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
    
    // Рассчитываем общее время игры
    const gameEndTime = new Date();
    const totalGameTime = gameStartTime ? Math.round((gameEndTime - gameStartTime) / 1000) : 0;
    
    // Рассчитываем точность
    const totalCorrect = correctAnswersA + correctAnswersB;
    const accuracy = questions.length > 0 ? Math.round((totalCorrect / questions.length) * 100) : 0;
    
    // Сохраняем результаты в localStorage
    localStorage.setItem('quizScoreA', scoreTeamA);
    localStorage.setItem('quizScoreB', scoreTeamB);
    localStorage.setItem('quizCorrectA', correctAnswersA);
    localStorage.setItem('quizCorrectB', correctAnswersB);
    localStorage.setItem('quizTotalTime', totalGameTime);
    localStorage.setItem('quizAccuracy', accuracy);
    localStorage.setItem('quizTotalQuestions', questions.length);
    
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
        correctAnswersA = 0;
        correctAnswersB = 0;
        currentTeam = 'A';
        gameStartTime = null;
        
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

// Функция показа подсказки (заглушка)
function showHint() {
    alert('Функция подсказки будет доступна в следующем обновлении!');
}

// Функция для страницы результатов
function showResults() {
    const finalScoreA = document.getElementById('finalScoreA');
    const finalScoreB = document.getElementById('finalScoreB');
    const correctA = document.getElementById('correctA');
    const correctB = document.getElementById('correctB');
    const resultTitle = document.getElementById('resultTitle');
    const resultIcon = document.getElementById('resultIcon');
    const winnerMessage = document.getElementById('winnerMessage');
    const totalQuestionsStat = document.getElementById('totalQuestionsStat');
    const totalTimeStat = document.getElementById('totalTimeStat');
    const accuracyStat = document.getElementById('accuracyStat');
    
    if (finalScoreA && finalScoreB && resultTitle && resultIcon && winnerMessage) {
        // Получаем результаты из localStorage
        const scoreA = parseInt(localStorage.getItem('quizScoreA')) || 0;
        const scoreB = parseInt(localStorage.getItem('quizScoreB')) || 0;
        const correctAnswersA = parseInt(localStorage.getItem('quizCorrectA')) || 0;
        const correctAnswersB = parseInt(localStorage.getItem('quizCorrectB')) || 0;
        const totalGameTime = parseInt(localStorage.getItem('quizTotalTime')) || 0;
        const accuracy = parseInt(localStorage.getItem('quizAccuracy')) || 0;
        const totalQuestions = parseInt(localStorage.getItem('quizTotalQuestions')) || questions.length;
        
        // Показываем финальный счёт
        finalScoreA.textContent = scoreA;
        finalScoreB.textContent = scoreB;
        
        // Показываем правильные ответы
        if (correctA) correctA.textContent = correctAnswersA;
        if (correctB) correctB.textContent = correctAnswersB;
        
        // Показываем статистику
        if (totalQuestionsStat) totalQuestionsStat.textContent = totalQuestions;
        if (totalTimeStat) {
            const minutes = Math.floor(totalGameTime / 60);
            const seconds = totalGameTime % 60;
            totalTimeStat.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        }
        if (accuracyStat) accuracyStat.textContent = `${accuracy}%`;
        
        // Определяем победителя
        if (scoreA > scoreB) {
            resultTitle.textContent = "Победила Команда Синих! 🏆";
            resultIcon.innerHTML = '<i class="fas fa-trophy" style="color: #4ecdc4;"></i>';
            winnerMessage.innerHTML = `
                <h3>Поздравляем Команду Синих!</h3>
                <p>Вы показали выдающийся результат с ${scoreA} очками!</p>
                <p>Правильных ответов: ${correctAnswersA} из ${totalQuestions}</p>
                <p>Время игры: ${Math.floor(totalGameTime / 60)} мин ${totalGameTime % 60} сек</p>
            `;
            winnerMessage.style.borderLeftColor = "#4ecdc4";
        } else if (scoreB > scoreA) {
            resultTitle.textContent = "Победила Команда Красных! 🏆";
            resultIcon.innerHTML = '<i class="fas fa-trophy" style="color: #ff6b6b;"></i>';
            winnerMessage.innerHTML = `
                <h3>Поздравляем Команду Красных!</h3>
                <p>Вы были непобедимы с ${scoreB} очками!</p>
                <p>Правильных ответов: ${correctAnswersB} из ${totalQuestions}</p>
                <p>Время игры: ${Math.floor(totalGameTime / 60)} мин ${totalGameTime % 60} сек</p>
            `;
            winnerMessage.style.borderLeftColor = "#ff6b6b";
        } else {
            resultTitle.textContent = "Ничья! 🤝";
            resultIcon.innerHTML = '<i class="fas fa-handshake" style="color: #ffd166;"></i>';
            winnerMessage.innerHTML = `
                <h3>Невероятно! Ничья!</h3>
                <p>Обе команды набрали по ${scoreA} очков!</p>
                <p>Команда Синих: ${correctAnswersA} правильных ответов</p>
                <p>Команда Красных: ${correctAnswersB} правильных ответов</p>
                <p>Общая точность: ${accuracy}%</p>
            `;
            winnerMessage.style.borderLeftColor = "#ffd166";
        }
    }
}

// Функция "Играть ещё раз"
function playAgain() {
    window.location.href = 'index.html';
}

// Функция поделиться результатами
function shareResults() {
    const scoreA = parseInt(localStorage.getItem('quizScoreA')) || 0;
    const scoreB = parseInt(localStorage.getItem('quizScoreB')) || 0;
    
    const text = `Я только что сыграл в КвизБаттл! Результат: Команда Синих ${scoreA}:${scoreB} Команда Красных. Попробуй и ты!`;
    
    if (navigator.share) {
        navigator.share({
            title: 'Мой результат в КвизБаттле',
            text: text,
            url: window.location.href
        });
    } else {
        // Копируем в буфер обмена
        navigator.clipboard.writeText(text).then(() => {
            alert('Результаты скопированы в буфер обмена! Поделитесь ими с друзьями.');
        });
    }
}

// Функция возврата на главную со страницы результатов
function goHome() {
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
        loadQuestion();
    } else if (path.includes('result.html') || path.endsWith('result.html')) {
        showResults();
    }
});

// Добавляем стили для букв ответов
const style = document.createElement('style');
style.textContent = `
    .answer-letter {
        display: inline-block;
        width: 30px;
        height: 30px;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 50%;
        text-align: center;
        line-height: 30px;
        margin-right: 15px;
        font-weight: bold;
    }
    
    .answer-btn.correct .answer-letter {
        background: rgba(0, 176, 155, 0.3);
    }
    
    .answer-btn.incorrect .answer-letter {
        background: rgba(255, 65, 108, 0.3);
    }
`;
document.head.appendChild(style);
