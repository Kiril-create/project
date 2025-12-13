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
    const
