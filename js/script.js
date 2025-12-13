// База вопросов для квиза
const questions = [
    // ... (ваши вопросы остаются без изменений)
];

// Переменные игры
let currentQuestionIndex = 0;
let scoreTeamA = 0;
let scoreTeamB = 0;
let currentTeam = 'A'; // Какая команда отвечает сейчас
let timerInterval;
let timeLeft = 30; // Время на ответ в секундах
const totalTime = 30; // Общее время на ответ

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
    
    if (questionElement && answersContainer && currentQuestionElement) {
        // Обновляем номер вопроса
        currentQuestionElement.textContent = currentQuestionIndex + 1;
        
        // Показываем вопрос
        questionElement.textContent = question.question;
        
        // Очищаем предыдущие ответы
        answersContainer.innerHTML = '';
        
        // Создаем кнопки ответов
        question.answers.forEach((answer, index) => {
            const button = document.createElement('button');
            button.className = 'answer-btn';
            button.textContent = answer;
            button.onclick = () => checkAnswer(index);
            answersContainer.appendChild(button);
        });
        
        // Обновляем счёт на странице
        updateScores();
        
        // Обновляем индикатор текущей команды
        updateTeamIndicator();
        
        // Сбрасываем и запускаем таймер
        resetTimer();
        startTimer();
    }
}

// Функция обновления индикатора команды
function updateTeamIndicator() {
    const indicatorTeamA = document.getElementById('indicatorTeamA');
    const indicatorTeamB = document.getElementById('indicatorTeamB');
    const teamAElement = document.getElementById('teamA');
    const teamBElement = document.getElementById('teamB');
    
    // Снимаем активный класс со всех
    indicatorTeamA.classList.remove('active');
    indicatorTeamB.classList.remove('active');
    teamAElement.classList.remove('active');
    teamBElement.classList.remove('active');
    
    // Добавляем активный класс текущей команде
    if (currentTeam === 'A') {
        indicatorTeamA.classList.add('active');
        teamAElement.classList.add('active');
        teamAElement.classList.add('team-switch-animation');
        setTimeout(() => {
            teamAElement.classList.remove('team-switch-animation');
        }, 500);
    } else {
        indicatorTeamB.classList.add('active');
        teamBElement.classList.add('active');
        teamBElement.classList.add('team-switch-animation');
        setTimeout(() => {
            teamBElement.classList.remove('team-switch-animation');
        }, 500);
    }
}

// Функция запуска таймера
function startTimer() {
    const timerValue = document.getElementById('timerValue');
    const timerBar = document.getElementById('timerBar');
    const timerElement = document.getElementById('timer');
    
    // Сбрасываем время
    timeLeft = totalTime;
    timerValue.textContent = timeLeft;
    timerBar.style.width = '100%';
    timerElement.classList.remove('warning');
    
    // Запускаем таймер
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        timeLeft--;
        timerValue.textContent = timeLeft;
        
        // Обновляем прогресс-бар
        const progress = (timeLeft / totalTime) * 100;
        timerBar.style.width = `${progress}%`;
        
        // Меняем цвет при малом времени
        if (timeLeft <= 10) {
            timerElement.classList.add('warning');
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
        timerElement.classList.remove('warning');
    }
}

// Функция при истечении времени
function timeOut() {
    const answerButtons = document.querySelectorAll('.answer-btn');
    const question = questions[currentQuestionIndex];
    
    // Отключаем все кнопки
    answerButtons.forEach(button => {
        button.style.pointerEvents = 'none';
    });
    
    // Подсвечиваем правильный ответ
    answerButtons[question.correct].classList.add('correct');
    
    // Меняем команду для следующего вопроса
    currentTeam = currentTeam === 'A' ? 'B' : 'A';
    
    // Ждём 1.5 секунды и переходим к следующему вопросу
    setTimeout(() => {
        currentQuestionIndex++;
        loadQuestion();
    }, 1500);
}

// Функция проверки ответа (обновлённая)
function checkAnswer(selectedIndex) {
    // Останавливаем таймер
    clearInterval(timerInterval);
    
    const question = questions[currentQuestionIndex];
    const answerButtons = document.querySelectorAll('.answer-btn');
    
    // Отключаем все кнопки
    answerButtons.forEach(button => {
        button.style.pointerEvents = 'none';
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
        loadQuestion();
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
    // Останавливаем таймер
    clearInterval(timerInterval);
    
    // Сбрасываем переменные
    currentQuestionIndex = 0;
    scoreTeamA = 0;
    scoreTeamB = 0;
    currentTeam = 'A';
    
    // Загружаем первый вопрос
    loadQuestion();
}

// Функция для страницы результатов (без изменений)
function showResults() {
    const finalScoreA = document.getElementById('finalScoreA');
    const finalScoreB = document.getElementById('finalScoreB');
    const resultTitle = document.getElementById('resultTitle');
    const winnerMessage = document.getElementById('winnerMessage');
    
    if (finalScoreA && finalScoreB && resultTitle && winnerMessage) {
        // Получаем результаты из localStorage
        const scoreA = parseInt(localStorage.getItem('quizScoreA')) || 0;
        const scoreB = parseInt(localStorage.getItem('quizScoreB')) || 0;
        
        // Показываем финальный счёт
        finalScoreA.textContent = scoreA;
        finalScoreB.textContent = scoreB;
        
        // Определяем победителя
        if (scoreA > scoreB) {
            resultTitle.textContent = "Победила Команда Синих! 🏆";
            winnerMessage.textContent = "Команда Синих показала великолепный результат! Поздравляем!";
            winnerMessage.style.borderLeftColor = "#4cc9f0";
        } else if (scoreB > scoreA) {
            resultTitle.textContent = "Победила Команда Красных! 🏆";
            winnerMessage.textContent = "Команда Красных была непобедима! Отличная игра!";
            winnerMessage.style.borderLeftColor = "#f72585";
        } else {
            resultTitle.textContent = "Ничья! 🤝";
            winnerMessage.textContent = "Обе команды показали одинаковый результат! Невероятное совпадение!";
            winnerMessage.style.borderLeftColor = "#b8b8b8";
        }
    }
}

// Функция "Играть ещё раз"
function playAgain() {
    window.location.href = 'index.html';
}

// Инициализация игры при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.includes('game.html') || 
        window.location.pathname.endsWith('game.html')) {
        // Устанавливаем общее количество вопросов
        const totalQuestionsElement = document.getElementById('totalQuestions');
        if (totalQuestionsElement) {
            totalQuestionsElement.textContent = questions.length;
        }
        loadQuestion();
    } else if (window.location.pathname.includes('result.html') || 
               window.location.pathname.endsWith('result.html')) {
        showResults();
    }
});

