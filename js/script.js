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
    if (timerValue) timerValue.textContent = timeLeft;
    if (timerBar) timerBar.style.width = '100%';
    if (timerElement) timerElement.classList.remove('warning', 'danger');
    
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
            
            // Плавное изменение цвета прогресс-бара
            if (timeLeft <= 10) {
                timerBar.style.background = 'linear-gradient(90deg, #ff6b6b, #ff0000)';
            } else if (timeLeft <= 20) {
                timerBar.style.background = 'linear-gradient(90deg, #ffd166, #ff6b6b)';
            }
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
    }, 1000); // Уменьшаем каждую секунду
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
        timerBar.style.background = 'linear-gradient(90deg, #ff6b6b, #ffd166)';
        timerElement.classList.remove('warning', 'danger');
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
            <div class="timeout-icon">⏰</div>
            <h3>Время вышло!</h3>
            <p>Правильный ответ был показан выше</p>
        </div>
    `;
    
    // Возвращаем оригинальный текст через 2 секунды
    setTimeout(() => {
        questionElement.textContent = originalText;
    }, 2000);
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
            <div class="success-icon">✅</div>
            <h3>Правильно!</h3>
            <p>+1 очко для ${currentTeam === 'A' ? 'Команды Синих' : 'Команды Красных'}</p>
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
            <div class="error-icon">❌</div>
            <h3>Неправильно!</h3>
            <p>Следующий вопрос будет за другой командой</p>
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
    // ... (остаётся без изменений)
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

