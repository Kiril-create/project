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

// Функция для загрузки вопроса
function loadQuestion() {
    if (currentQuestionIndex >= questions.length) {
        // Игра закончена, переходим к результатам
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
    }
}

// Функция проверки ответа
function checkAnswer(selectedIndex) {
    const question = questions[currentQuestionIndex];
    const answerButtons = document.querySelectorAll('.answer-btn');
    
    // Отключаем все кнопки после выбора ответа
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
        
        // Меняем команду для следующего вопроса
        currentTeam = currentTeam === 'A' ? 'B' : 'A';
    } else {
        // Неправильный ответ
        answerButtons[selectedIndex].classList.add('incorrect');
        answerButtons[question.correct].classList.add('correct');
        
        // Меняем команду для следующего вопроса
        currentTeam = currentTeam === 'A' ? 'B' : 'A';
    }
    
    // Ждём 1.5 секунды и переходим к следующему вопросу
    setTimeout(() => {
        currentQuestionIndex++;
        loadQuestion();
    }, 1500);
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
    // Сохраняем результаты в localStorage
    localStorage.setItem('quizScoreA', scoreTeamA);
    localStorage.setItem('quizScoreB', scoreTeamB);
    
    // Переходим на страницу результатов
    window.location.href = 'result.html';
}

// Функция перезапуска игры
function restartGame() {
    currentQuestionIndex = 0;
    scoreTeamA = 0;
    scoreTeamB = 0;
    currentTeam = 'A';
    loadQuestion();
}

// Функция для страницы результатов
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
    // Определяем, на какой странице находимся
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
