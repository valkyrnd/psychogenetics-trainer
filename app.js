// Логика работы интерактивного веб-тренажера по психогенетике
// Поддерживает:
// 1. Тест с выбором ответа (choice)
// 2. Открытый ответ с вводом термина/числа (open)
// 3. Вопросы на соответствие 1А 2Б 3В 4Г (matching)

const GLOSSARY_TERMS = [
  {
    term: "Психогенетика",
    badge: "Определение",
    desc: "Научная дисциплина на стыке психологии и генетики, предметом которой является соотношение и взаимодействие наследственных и средовых детерминант в формировании межиндивидуальной вариативности психологических и психофизиологических признаков (И.В. Равич-Щербо)."
  },
  {
    term: "1865 год",
    badge: "История",
    desc: "Условный год зарождения психогенетики: выход работы Фрэнсиса Гальтона «Наследственный талант и характер», где впервые выдвинута идея о наследуемости психических качеств и сопоставлены понятия «nature» и «nurture»."
  },
  {
    term: "1900 год",
    badge: "История",
    desc: "Официальный год рождения науки генетики: повторное независимое переоткрытие законов Грегора Менделя тремя ботаниками — К. Корренсом, Э. Чермаком и Х. де Фризом."
  },
  {
    term: "1909 год",
    badge: "История",
    desc: "В. Иоганнсен предложил фундаментальные понятия: «ген», «генотип» и «фенотип»."
  },
  {
    term: "Геном",
    badge: "Определение",
    desc: "Полная совокупность всего наследственного генетического материала клетки человека. Включает ядерный геном (23 пары хромосом в ядре) и митохондриальную ДНК (мтДНК). Лишь ~1,5% генома непосредственно кодирует белки."
  },
  {
    term: "Генотип",
    badge: "Определение",
    desc: "Индивидуальный набор генов и аллелей конкретного организма, формирующийся в момент зачатия (слияния половых клеток) и остающийся строго неизменным во всех соматических клетках на протяжении жизни."
  },
  {
    term: "Фенотип",
    badge: "Определение",
    desc: "Совокупность всех наблюдаемых и измеряемых свойств организма (анатомических, физиологических, биохимических, психологических и поведенческих). Формируется в ходе онтогенеза как результат реализации генотипа в конкретных условиях окружающей среды: Фенотип = Генотип + Среда + Генотип-средовые эффекты."
  },
  {
    term: "Кариотип",
    badge: "Определение",
    desc: "Полный качественный и количественный хромосомный набор нормальной клетки организма. У человека кариотип состоит из 46 хромосом: 22 пары аутосом и 1 пара половых хромосом (46,XX у женщин и 46,XY у мужчин)."
  },
  {
    term: "Локус",
    badge: "Генетика",
    desc: "Точное фиксированное местоположение («топографический адрес») конкретного гена или маркера на хромосоме."
  },
  {
    term: "Аллели",
    badge: "Генетика",
    desc: "Различные альтернативные формы одного и того же гена, расположенные в одинаковых локусах гомологичных парных хромосом и определяющие варианты развития одного признака."
  },
  {
    term: "Аутосомы",
    badge: "Генетика",
    desc: "Парные хромосомы, одинаковые по строению и составу у мужских и женских организмов. У человека 22 пары аутосом (44 штуки)."
  },
  {
    term: "Половые хромосомы",
    badge: "Генетика",
    desc: "Хромосомы, определяющие биологический пол организма: X и Y хромосомы (XX — женский гомогаметный пол, XY — мужской гетерогаметный пол)."
  },
  {
    term: "Хроматин",
    badge: "Молекулярное",
    desc: "Нуклеопротеидный комплекс в ядре клетки, состоящий из двухцепочечной ДНК и белков-гистонов. Эухроматин — открытый, активный; гетерохроматин — плотно упакованный, неактивный."
  },
  {
    term: "Качественные признаки",
    badge: "Признаки",
    desc: "Дискретные признаки, определяемые описательным путем (по принципу «есть / нет» или альтернативных категорий): группа крови, цвет глаз, форма мочки уха."
  },
  {
    term: "Количественные признаки",
    badge: "Признаки",
    desc: "Непрерывные признаки, требующие измерения и имеющие континуум выраженности (рост, масса, уровень IQ, показатели экстраверсии и нейротизма). Большинство психологических признаков — количественные."
  },
  {
    term: "Полимерия",
    badge: "Взаимодействие",
    desc: "Тип взаимодействия неаллельных генов, при котором несколько генов аддитивно (суммарно) усиливают выраженность одного количественного признака (интеллект, рост, цвет кожи)."
  },
  {
    term: "Эпистаз",
    badge: "Взаимодействие",
    desc: "Подавление фенотипического проявления гена одного локуса неаллельным геном другого локуса (геном-супрессором / ингибитором)."
  },
  {
    term: "Кодоминирование",
    badge: "Взаимодействие",
    desc: "Форма взаимодействия аллелей одного гена, при которой у гетерозиготы одновременно и полно выражаются оба продукта (пример: IV группа крови AB, где экспрессируются и IA, и IB)."
  },
  {
    term: "Общесемейная (разделенная) среда",
    badge: "Среда",
    desc: "Средовые условия, общие для всех детей в семье, увеличивающие их взаимное сходство: доход родителей, жилищные условия, книги дома, традиции семьи."
  },
  {
    term: "Индивидуальная (неразделенная) среда",
    badge: "Среда",
    desc: "Уникальные для каждого ребенка жизненные события и контакты, делающие родственников непохожими друг на друга: личный круг друзей, перенесенные болезни, личный субъективный опыт."
  },
  {
    term: "Генотип-средовое взаимодействие (G×E)",
    badge: "Эффекты",
    desc: "Зависимость проявления генотипа от внешней среды: один и тот же генотип в разных средах дает разные фенотипы (опыты Трайона с «умными» и «глупыми» крысами в обогащенной/обедненной средах)."
  },
  {
    term: "Генотип-средовая ковариация",
    badge: "Эффекты",
    desc: "Неслучайное распределение сред между разными генотипами. Делится на 3 типа: пассивная (среда от родителей), реактивная (отклик социума на задатки ребенка), активная (самостоятельный выбор среды индивидом)."
  },
  {
    term: "Ассортативность",
    badge: "Эффекты",
    desc: "Неслучайность заключения браков на основе фенотипического сходства супругов (по уровню образования, интеллекту, социально-экономическому положению)."
  },
  {
    term: "Эпигенетика",
    badge: "Регуляция",
    desc: "Изменения активности и экспрессии генов, передающиеся при делении клеток, происходящие без изменения самой нуклеотидной последовательности ДНК (метилирование ДНК, ацетилирование гистонов)."
  },
  {
    term: "Стресс-реализующая система (САС)",
    badge: "Стресс",
    desc: "Симпато-адреналовая система, мгновенно мобилизующая организм при стресс-сигнале: выброс адреналина и норадреналина, усиление кровотока и энергообмена."
  },
  {
    term: "Стресс-лимитирующая система",
    badge: "Стресс",
    desc: "Система защиты от патологического перевозбуждения стресс-реакции: медиаторы ГАМК, серотонин, эндорфины, антиоксиданты."
  },
  {
    term: "Модель Клонингера",
    badge: "Личность",
    desc: "Психобиологическая модель темперамента: Поиск новизны (дофаминергическая система), Избегание вреда (серотонинергическая), Зависимость от награды (норадренергическая)."
  },
  {
    term: "GWAS",
    badge: "Методы",
    desc: "Полногеномный поиск ассоциаций (Genome-Wide Association Studies) — метод сканирования сотен тысяч однонуклеотидных полиморфизмов (SNP) для выявления связей вариантов ДНК со свойствами психики и болезнями."
  }
];

// Состояние приложения
const QuizState = {
  allQuestions: [...QUESTIONS_DATA],
  filteredPool: [...QUESTIONS_DATA],
  currentRoundQuestions: [],
  currentIndex: 0,
  score: 0,
  roundSize: 5,
  isAnswered: false,
  userAnswers: [],
  seenQuestionIds: new Set(),
  mistakesPool: []
};

// DOM Элементы
const dom = {
  themeToggleBtn: document.getElementById('theme-toggle-btn'),
  themeIcon: document.getElementById('theme-icon'),
  themeText: document.getElementById('theme-text'),
  tabBtnQuiz: document.getElementById('tab-btn-quiz'),
  tabBtnGlossary: document.getElementById('tab-btn-glossary'),
  quizView: document.getElementById('quiz-view'),
  glossaryView: document.getElementById('glossary-view'),

  // Filters
  categorySelect: document.getElementById('category-filter-select'),
  typeSelect: document.getElementById('type-filter-select'),
  modeSelect: document.getElementById('quiz-mode-select'),
  poolCounterBadge: document.getElementById('pool-counter-badge'),

  // Quiz Card
  quizCardContainer: document.getElementById('quiz-card-container'),
  questionTypeBadge: document.getElementById('question-type-badge'),
  questionCategoryBadge: document.getElementById('question-category-badge'),
  questionCounterDisplay: document.getElementById('question-counter-display'),
  quizProgressBar: document.getElementById('quiz-progress-bar'),
  questionTitleText: document.getElementById('question-title-text'),
  dynamicQuestionBody: document.getElementById('dynamic-question-body'),
  explanationBoxCard: document.getElementById('explanation-box-card'),
  explanationTextContent: document.getElementById('explanation-text-content'),
  skipQuestionBtn: document.getElementById('skip-question-btn'),
  nextQuestionBtn: document.getElementById('next-question-btn'),

  // Result Screen
  resultScreenContainer: document.getElementById('result-screen-container'),
  resultScoreNum: document.getElementById('result-score-num'),
  resultScoreTotal: document.getElementById('result-score-total'),
  resultVerdictTitle: document.getElementById('result-verdict-title'),
  resultVerdictDesc: document.getElementById('result-verdict-desc'),
  retryNewRandomBtn: document.getElementById('retry-new-random-btn'),
  reviewMistakesBtn: document.getElementById('review-mistakes-btn'),
  mistakesCountBadge: document.getElementById('mistakes-count-badge'),
  resetSessionBtn: document.getElementById('reset-session-btn'),
  roundReviewList: document.getElementById('round-review-list'),
  reviewItemsContainer: document.getElementById('review-items-container'),

  // Glossary
  glossarySearchInput: document.getElementById('glossary-search-input'),
  glossaryGridContainer: document.getElementById('glossary-grid-container'),
  confettiCanvas: document.getElementById('confetti-canvas')
};

function init() {
  setupTheme();
  setupEventListeners();
  renderGlossary(GLOSSARY_TERMS);
  filterPool();
  startNewQuizRound();
}

// ----------------- ТЕМА И НАВИГАЦИЯ -----------------
function setupTheme() {
  const savedTheme = localStorage.getItem('psy_quiz_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeButton(savedTheme);

  dom.themeToggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('psy_quiz_theme', newTheme);
    updateThemeButton(newTheme);
  });
}

function updateThemeButton(theme) {
  if (theme === 'dark') {
    dom.themeIcon.textContent = '🌙';
    dom.themeText.textContent = 'Темная';
  } else {
    dom.themeIcon.textContent = '☀️';
    dom.themeText.textContent = 'Светлая';
  }
}

function setupEventListeners() {
  // LAN Share button
  const lanBtn = document.getElementById('lan-share-btn');
  if (lanBtn) {
    lanBtn.addEventListener('click', () => {
      const url = 'http://192.168.31.210:8080';
      if (navigator.clipboard) {
        navigator.clipboard.writeText(url).then(() => {
          const orig = lanBtn.innerHTML;
          lanBtn.innerHTML = '<span>✅</span> Адрес скопирован!';
          setTimeout(() => { lanBtn.innerHTML = orig; }, 2000);
        }).catch(() => {
          prompt('Адрес для устройств в локальной сети (Wi-Fi):', url);
        });
      } else {
        prompt('Адрес для устройств в локальной сети (Wi-Fi):', url);
      }
    });
  }

  // Tabs
  dom.tabBtnQuiz.addEventListener('click', () => switchTab('quiz'));
  dom.tabBtnGlossary.addEventListener('click', () => switchTab('glossary'));

  // Filters
  dom.categorySelect.addEventListener('change', () => {
    filterPool();
    startNewQuizRound();
  });

  if (dom.typeSelect) {
    dom.typeSelect.addEventListener('change', () => {
      filterPool();
      startNewQuizRound();
    });
  }

  dom.modeSelect.addEventListener('change', () => {
    startNewQuizRound();
  });

  // Quiz Buttons
  dom.nextQuestionBtn.addEventListener('click', onNextQuestion);
  dom.skipQuestionBtn.addEventListener('click', onSkipQuestion);
  dom.retryNewRandomBtn.addEventListener('click', startNewQuizRound);
  dom.resetSessionBtn.addEventListener('click', () => {
    dom.categorySelect.value = 'all';
    if (dom.typeSelect) dom.typeSelect.value = 'all';
    dom.modeSelect.value = '5';
    QuizState.seenQuestionIds.clear();
    filterPool();
    startNewQuizRound();
  });

  dom.reviewMistakesBtn.addEventListener('click', startMistakesReviewRound);

  // Glossary Search
  dom.glossarySearchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    const filtered = GLOSSARY_TERMS.filter(item => 
      item.term.toLowerCase().includes(query) || 
      item.desc.toLowerCase().includes(query)
    );
    renderGlossary(filtered);
  });
}

function switchTab(tab) {
  if (tab === 'quiz') {
    dom.tabBtnQuiz.classList.add('active');
    dom.tabBtnGlossary.classList.remove('active');
    dom.quizView.style.display = 'block';
    dom.glossaryView.style.display = 'none';
  } else {
    dom.tabBtnQuiz.classList.remove('active');
    dom.tabBtnGlossary.classList.add('active');
    dom.quizView.style.display = 'none';
    dom.glossaryView.style.display = 'block';
  }
}

// ----------------- ЛОГИКА ТЕСТА -----------------
function filterPool() {
  const cat = dom.categorySelect.value;
  const typ = dom.typeSelect ? dom.typeSelect.value : 'all';

  QuizState.filteredPool = QuizState.allQuestions.filter(q => {
    const matchCat = (cat === 'all') || (q.category === cat);
    const qType = q.type || 'choice';
    const matchType = (typ === 'all') || (qType === typ);
    return matchCat && matchType;
  });

  dom.poolCounterBadge.textContent = `В пуле: ${QuizState.filteredPool.length} вопр.`;
}

function startNewQuizRound() {
  filterPool();

  if (QuizState.filteredPool.length === 0) {
    alert("По выбранным фильтрам нет вопросов. Сбросьте фильтры.");
    dom.categorySelect.value = 'all';
    if (dom.typeSelect) dom.typeSelect.value = 'all';
    filterPool();
  }

  const requestedSize = dom.modeSelect.value === 'all' 
    ? QuizState.filteredPool.length 
    : parseInt(dom.modeSelect.value, 10);

  let pool = [...QuizState.filteredPool];
  let unseen = pool.filter(q => !QuizState.seenQuestionIds.has(q.id));

  if (unseen.length < requestedSize) {
    pool.forEach(q => QuizState.seenQuestionIds.delete(q.id));
    unseen = [...pool];
  }

  shuffleArray(unseen);

  QuizState.currentRoundQuestions = unseen.slice(0, requestedSize);
  QuizState.roundSize = QuizState.currentRoundQuestions.length;
  QuizState.currentIndex = 0;
  QuizState.score = 0;
  QuizState.userAnswers = [];
  QuizState.isAnswered = false;

  QuizState.currentRoundQuestions.forEach(q => QuizState.seenQuestionIds.add(q.id));

  dom.quizCardContainer.style.display = 'block';
  dom.resultScreenContainer.style.display = 'none';

  renderCurrentQuestion();
}

function startMistakesReviewRound() {
  if (!QuizState.mistakesPool.length) return;

  QuizState.currentRoundQuestions = [...QuizState.mistakesPool];
  QuizState.roundSize = QuizState.currentRoundQuestions.length;
  QuizState.currentIndex = 0;
  QuizState.score = 0;
  QuizState.userAnswers = [];
  QuizState.isAnswered = false;

  dom.quizCardContainer.style.display = 'block';
  dom.resultScreenContainer.style.display = 'none';

  renderCurrentQuestion();
}

function renderCurrentQuestion() {
  QuizState.isAnswered = false;
  const q = QuizState.currentRoundQuestions[QuizState.currentIndex];
  const qType = q.type || 'choice';

  // Бейджи и заголовки
  if (dom.questionTypeBadge) {
    if (qType === 'matching') {
      dom.questionTypeBadge.textContent = '🧩 Сопоставление';
      dom.questionTypeBadge.style.color = 'var(--accent-purple)';
      dom.questionTypeBadge.style.background = 'rgba(168, 85, 247, 0.15)';
      dom.questionTypeBadge.style.borderColor = 'rgba(168, 85, 247, 0.3)';
    } else if (qType === 'open') {
      dom.questionTypeBadge.textContent = '✍️ Открытый ответ';
      dom.questionTypeBadge.style.color = 'var(--accent-emerald)';
      dom.questionTypeBadge.style.background = 'rgba(16, 185, 129, 0.15)';
      dom.questionTypeBadge.style.borderColor = 'rgba(16, 185, 129, 0.3)';
    } else {
      dom.questionTypeBadge.textContent = '🔘 Выбор ответа';
      dom.questionTypeBadge.style.color = 'var(--accent-cyan)';
      dom.questionTypeBadge.style.background = 'rgba(6, 182, 212, 0.15)';
      dom.questionTypeBadge.style.borderColor = 'rgba(6, 182, 212, 0.3)';
    }
  }

  dom.questionCategoryBadge.textContent = q.categoryTitle || "Вопрос курса";
  dom.questionCounterDisplay.textContent = `Вопрос ${QuizState.currentIndex + 1} из ${QuizState.roundSize}`;

  const progressPercent = ((QuizState.currentIndex + 1) / QuizState.roundSize) * 100;
  dom.quizProgressBar.style.width = `${progressPercent}%`;

  dom.questionTitleText.textContent = q.question;
  dom.dynamicQuestionBody.innerHTML = '';

  // Рендерим по типам
  if (qType === 'choice') {
    renderChoiceQuestion(q);
  } else if (qType === 'open') {
    renderOpenQuestion(q);
  } else if (qType === 'matching') {
    renderMatchingQuestion(q);
  }

  dom.explanationBoxCard.style.display = 'none';
  dom.nextQuestionBtn.style.display = 'none';
  dom.skipQuestionBtn.style.display = 'inline-flex';
}

// 1. Рендеринг множественного выбора
function renderChoiceQuestion(q) {
  const container = document.createElement('div');
  container.className = 'options-list';
  const letters = ['A', 'B', 'C', 'D'];

  q.options.forEach((optText, idx) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.id = `option-btn-${idx}`;
    btn.innerHTML = `
      <span class="option-marker">${letters[idx]}</span>
      <span class="option-text">${optText}</span>
    `;
    btn.addEventListener('click', () => selectChoiceOption(idx));
    container.appendChild(btn);
  });

  dom.dynamicQuestionBody.appendChild(container);
}

function selectChoiceOption(selectedIdx) {
  if (QuizState.isAnswered) return;
  QuizState.isAnswered = true;

  const q = QuizState.currentRoundQuestions[QuizState.currentIndex];
  const isCorrect = selectedIdx === q.correct;

  if (isCorrect) {
    QuizState.score++;
  } else {
    if (!QuizState.mistakesPool.some(item => item.id === q.id)) {
      QuizState.mistakesPool.push(q);
    }
  }

  QuizState.userAnswers.push({
    question: q,
    type: 'choice',
    selectedIdx: selectedIdx,
    isCorrect: isCorrect
  });

  const buttons = dom.dynamicQuestionBody.querySelectorAll('.option-btn');
  buttons.forEach((btn, idx) => {
    btn.disabled = true;
    if (idx === q.correct) {
      btn.classList.add('correct');
    }
    if (idx === selectedIdx && !isCorrect) {
      btn.classList.add('wrong');
    }
  });

  revealAnswerExplanation(q);
}

// 2. Рендеринг открытого вопроса
function renderOpenQuestion(q) {
  const wrapper = document.createElement('div');
  wrapper.className = 'open-question-wrapper';
  wrapper.innerHTML = `
    <div class="open-input-group">
      <input 
        type="text" 
        id="open-text-input" 
        class="open-text-input" 
        placeholder="Введите термин, число или понятие..." 
        autocomplete="off"
      >
      <button id="submit-open-btn" class="btn-primary">Ответить</button>
    </div>
    <div id="open-feedback-msg" class="open-feedback-badge"></div>
  `;

  dom.dynamicQuestionBody.appendChild(wrapper);

  const input = wrapper.querySelector('#open-text-input');
  const submitBtn = wrapper.querySelector('#submit-open-btn');

  setTimeout(() => input.focus(), 50);

  submitBtn.addEventListener('click', () => handleOpenSubmit(input));
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') handleOpenSubmit(input);
  });
}

function handleOpenSubmit(input) {
  if (QuizState.isAnswered) return;
  const rawVal = input.value.trim();
  if (!rawVal) {
    input.focus();
    return;
  }

  QuizState.isAnswered = true;
  input.disabled = true;

  const q = QuizState.currentRoundQuestions[QuizState.currentIndex];
  const cleanInput = cleanAnswerString(rawVal);

  const isCorrect = q.acceptedAnswers.some(ans => cleanAnswerString(ans) === cleanInput);
  const feedbackMsg = dom.dynamicQuestionBody.querySelector('#open-feedback-msg');

  if (isCorrect) {
    QuizState.score++;
    input.classList.add('correct');
    feedbackMsg.innerHTML = '<span style="color: var(--accent-emerald);">✓ Абсолютно верно!</span>';
  } else {
    input.classList.add('wrong');
    feedbackMsg.innerHTML = `<span style="color: var(--accent-rose);">✗ Неверно. Правильный ответ: <strong>${q.canonicalAnswer}</strong></span>`;
    if (!QuizState.mistakesPool.some(item => item.id === q.id)) {
      QuizState.mistakesPool.push(q);
    }
  }

  QuizState.userAnswers.push({
    question: q,
    type: 'open',
    userText: rawVal,
    isCorrect: isCorrect,
    canonicalAnswer: q.canonicalAnswer
  });

  revealAnswerExplanation(q);
}

// 3. Рендеринг вопроса на соответствие (1А 2Б 3В 4Г)
function renderMatchingQuestion(q) {
  const wrapper = document.createElement('div');
  wrapper.className = 'matching-wrapper';

  const selectedMatches = {};
  q.leftItems.forEach(item => {
    selectedMatches[item.id] = null;
  });

  wrapper.innerHTML = `
    <!-- Колонки с терминами и определениями -->
    <div class="matching-columns-container">
      <div class="matching-col">
        <div class="matching-col-header">1..4 Термины:</div>
        ${q.leftItems.map(item => `
          <div class="matching-item-card">
            <strong>${item.id}.</strong> <span>${item.text}</span>
          </div>
        `).join('')}
      </div>
      <div class="matching-col">
        <div class="matching-col-header">А..Г Определения:</div>
        ${q.rightItems.map(item => `
          <div class="matching-item-card">
            <strong>${item.id}.</strong> <span>${item.text}</span>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- Интерактивная панель выбора связок 1А 2Б 3В 4Г -->
    <div class="matching-slots-bar">
      <div class="matching-slots-header">
        <span>Выберите букву для каждого пункта:</span>
        <span id="current-matching-preview" style="color: var(--accent-cyan); font-weight: 700;">1? 2? 3? 4?</span>
      </div>
      <div class="matching-slots-grid">
        ${q.leftItems.map(item => `
          <div class="matching-slot-row" data-left-id="${item.id}">
            <span class="matching-slot-label">${item.id}:</span>
            <div class="matching-chip-group">
              ${q.rightItems.map(right => `
                <button class="matching-chip-btn" data-left-id="${item.id}" data-right-id="${right.id}">${right.id}</button>
              `).join('')}
            </div>
          </div>
        `).join('')}
      </div>
      <div style="display: flex; justify-content: flex-end; margin-top: 8px;">
        <button id="submit-matching-btn" class="btn-primary">
          Проверить сопоставление (1А 2Б 3В 4Г)
        </button>
      </div>
    </div>
  `;

  dom.dynamicQuestionBody.appendChild(wrapper);

  const previewEl = wrapper.querySelector('#current-matching-preview');
  const chipButtons = wrapper.querySelectorAll('.matching-chip-btn');
  const submitBtn = wrapper.querySelector('#submit-matching-btn');

  // Клик по чипам вариантов
  chipButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      if (QuizState.isAnswered) return;
      const leftId = btn.getAttribute('data-left-id');
      const rightId = btn.getAttribute('data-right-id');

      // Снимаем выделение с других в этой строке
      wrapper.querySelectorAll(`.matching-chip-btn[data-left-id="${leftId}"]`).forEach(b => {
        b.classList.remove('selected');
      });

      btn.classList.add('selected');
      selectedMatches[leftId] = rightId;

      // Обновляем превью
      const previewStr = q.leftItems.map(item => `${item.id}${selectedMatches[item.id] || '?'}`).join(' ');
      previewEl.textContent = previewStr;
    });
  });

  submitBtn.addEventListener('click', () => {
    if (QuizState.isAnswered) return;

    // Проверяем, все ли выбраны
    const unpicked = q.leftItems.filter(item => !selectedMatches[item.id]);
    if (unpicked.length > 0) {
      alert(`Пожалуйста, выберите соответствие для всех пунктов (осталось выбрать: ${unpicked.map(u => u.id).join(', ')})`);
      return;
    }

    QuizState.isAnswered = true;
    submitBtn.disabled = true;

    // Проверяем правильность
    let allCorrect = true;
    q.leftItems.forEach(item => {
      const userChoice = selectedMatches[item.id];
      const correctChoice = q.correctMatch[item.id];
      const rowChips = wrapper.querySelectorAll(`.matching-chip-btn[data-left-id="${item.id}"]`);

      rowChips.forEach(b => {
        b.disabled = true;
        const bRight = b.getAttribute('data-right-id');
        if (bRight === correctChoice) {
          b.classList.add('correct-chip');
        }
        if (bRight === userChoice && userChoice !== correctChoice) {
          b.classList.add('wrong-chip');
        }
      });

      if (userChoice !== correctChoice) {
        allCorrect = false;
      }
    });

    const userMatchStr = q.leftItems.map(item => `${item.id}${selectedMatches[item.id]}`).join(' ');
    previewEl.innerHTML = allCorrect 
      ? `<span style="color: var(--accent-emerald);">✓ Верно: ${q.correctDisplay}</span>`
      : `<span style="color: var(--accent-rose);">✗ Ошибка! Верно: ${q.correctDisplay}</span>`;

    if (allCorrect) {
      QuizState.score++;
    } else {
      if (!QuizState.mistakesPool.some(item => item.id === q.id)) {
        QuizState.mistakesPool.push(q);
      }
    }

    QuizState.userAnswers.push({
      question: q,
      type: 'matching',
      userMatches: userMatchStr,
      correctDisplay: q.correctDisplay,
      isCorrect: allCorrect
    });

    revealAnswerExplanation(q);
  });
}

function revealAnswerExplanation(q) {
  dom.explanationTextContent.textContent = q.explanation;
  dom.explanationBoxCard.style.display = 'block';

  dom.skipQuestionBtn.style.display = 'none';
  dom.nextQuestionBtn.style.display = 'inline-flex';
  dom.nextQuestionBtn.innerHTML = (QuizState.currentIndex + 1 >= QuizState.roundSize)
    ? 'Завершить тест 🏁'
    : 'Следующий вопрос <span>→</span>';
}

function onSkipQuestion() {
  if (QuizState.isAnswered) return;
  const q = QuizState.currentRoundQuestions[QuizState.currentIndex];

  if (!QuizState.mistakesPool.some(item => item.id === q.id)) {
    QuizState.mistakesPool.push(q);
  }

  QuizState.userAnswers.push({
    question: q,
    type: q.type || 'choice',
    skipped: true,
    isCorrect: false
  });

  onNextQuestion();
}

function onNextQuestion() {
  if (QuizState.currentIndex + 1 < QuizState.roundSize) {
    QuizState.currentIndex++;
    renderCurrentQuestion();
  } else {
    finishQuizRound();
  }
}

function finishQuizRound() {
  dom.quizCardContainer.style.display = 'none';
  dom.resultScreenContainer.style.display = 'block';

  const total = QuizState.roundSize;
  const score = QuizState.score;
  const percent = Math.round((score / total) * 100);

  dom.resultScoreNum.textContent = score;
  dom.resultScoreTotal.textContent = `из ${total}`;

  if (percent === 100) {
    dom.resultVerdictTitle.textContent = 'Превосходно! 100% результат! 🏆';
    dom.resultVerdictDesc.textContent = 'Вы безупречно справились со всеми заданиями раунда (тесты, сопоставления и термины).';
    triggerConfetti();
  } else if (percent >= 80) {
    dom.resultVerdictTitle.textContent = 'Отличный результат! 🌟';
    dom.resultVerdictDesc.textContent = 'Твердое знание определений и понятий психогенетики.';
  } else if (percent >= 60) {
    dom.resultVerdictTitle.textContent = 'Хорошая база! 👍';
    dom.resultVerdictDesc.textContent = 'Основные термины усвоены. Обратите внимание на ошибки ниже.';
  } else {
    dom.resultVerdictTitle.textContent = 'Есть над чем поработать 📚';
    dom.resultVerdictDesc.textContent = 'Рекомендуем повторить ключевые темы во вкладке «Шпаргалка и Определения».';
  }

  const wrongAnswersCount = QuizState.userAnswers.filter(a => !a.isCorrect).length;
  if (wrongAnswersCount > 0 && QuizState.mistakesPool.length > 0) {
    dom.reviewMistakesBtn.style.display = 'inline-flex';
    dom.mistakesCountBadge.textContent = QuizState.mistakesPool.length;
  } else {
    dom.reviewMistakesBtn.style.display = 'none';
  }

  renderRoundReview();
}

function renderRoundReview() {
  dom.reviewItemsContainer.innerHTML = '';

  QuizState.userAnswers.forEach((ans, idx) => {
    const q = ans.question;
    const item = document.createElement('div');
    item.className = 'review-item';

    const statusBadge = ans.isCorrect 
      ? '<span style="color: var(--accent-emerald);">✓ Верно</span>' 
      : '<span style="color: var(--accent-rose);">✗ Ошибка</span>';

    let userAnsHtml = '';
    let correctAnsHtml = '';

    if (ans.type === 'open') {
      const userText = ans.skipped ? 'Пропущен' : (ans.userText || '—');
      userAnsHtml = `<div class="review-ans-row review-ans-user"><strong>Ваш ответ:</strong> ${userText}</div>`;
      correctAnsHtml = `<div class="review-ans-row review-ans-correct"><strong>Правильный ответ:</strong> ${q.canonicalAnswer}</div>`;
    } else if (ans.type === 'matching') {
      const userText = ans.skipped ? 'Пропущен' : (ans.userMatches || '—');
      userAnsHtml = `<div class="review-ans-row review-ans-user"><strong>Ваше сопоставление:</strong> ${userText}</div>`;
      correctAnsHtml = `<div class="review-ans-row review-ans-correct"><strong>Правильное соответствие:</strong> ${q.correctDisplay}</div>`;
    } else {
      const userText = ans.skipped ? 'Пропущен' : (ans.selectedIdx !== null && ans.selectedIdx !== undefined ? q.options[ans.selectedIdx] : '—');
      userAnsHtml = `<div class="review-ans-row review-ans-user"><strong>Ваш ответ:</strong> ${userText}</div>`;
      correctAnsHtml = `<div class="review-ans-row review-ans-correct"><strong>Правильный ответ:</strong> ${q.options[q.correct]}</div>`;
    }

    item.innerHTML = `
      <div class="review-item-header">
        <span>Задание #${idx + 1} (${q.categoryTitle})</span>
        ${statusBadge}
      </div>
      <div class="review-q-text">${q.question}</div>
      ${!ans.isCorrect ? userAnsHtml : ''}
      ${correctAnsHtml}
      <div class="review-exp">💡 <strong>Пояснение:</strong> ${q.explanation}</div>
    `;

    dom.reviewItemsContainer.appendChild(item);
  });
}

function renderGlossary(termsList) {
  dom.glossaryGridContainer.innerHTML = '';

  if (termsList.length === 0) {
    dom.glossaryGridContainer.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; color: var(--text-muted); padding: 30px;">
        Термины по данному запросу не найдены. Попробуйте другой запрос.
      </div>
    `;
    return;
  }

  termsList.forEach(item => {
    const card = document.createElement('div');
    card.className = 'glossary-card';
    card.innerHTML = `
      <div class="glossary-term">
        <span>${item.term}</span>
        <span class="glossary-badge">${item.badge}</span>
      </div>
      <div class="glossary-desc">${item.desc}</div>
    `;
    dom.glossaryGridContainer.appendChild(card);
  });
}

function cleanAnswerString(str) {
  return String(str || '')
    .trim()
    .toLowerCase()
    .replace(/ё/g, 'е')
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '')
    .replace(/\s+/g, ' ');
}

function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

function triggerConfetti() {
  const canvas = dom.confettiCanvas;
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const pieces = [];
  const colors = ['#06b6d4', '#6366f1', '#a855f7', '#10b981', '#f59e0b', '#ec4899'];

  for (let i = 0; i < 90; i++) {
    pieces.push({
      x: canvas.width / 2,
      y: canvas.height / 2,
      vx: (Math.random() - 0.5) * 16,
      vy: (Math.random() - 0.7) * 16,
      size: Math.random() * 8 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: 1
    });
  }

  let animationFrame;
  function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let alive = false;

    pieces.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.35;
      p.alpha -= 0.015;

      if (p.alpha > 0) {
        alive = true;
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fillRect(p.x, p.y, p.size, p.size);
      }
    });

    if (alive) {
      animationFrame = requestAnimationFrame(update);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      cancelAnimationFrame(animationFrame);
    }
  }

  update();
}

document.addEventListener('DOMContentLoaded', init);
