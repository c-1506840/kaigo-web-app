"use strict";

// ==========================
// クイズの問題（4択・5問）
// ==========================
const questions = [
  {
    question: "介護職員の主な仕事はどれでしょうか？",
    choices: ["食事や入浴の支援", "病気の診断", "薬の処方", "建物の設計"],
    correct: 0,
    explanation: "介護職員は食事、入浴、移動など、利用者の日常生活を支える仕事をしています。"
  },
  {
    question: "介護の仕事について正しいものはどれでしょうか？",
    choices: ["すべての仕事に国家資格が必要", "無資格から始められる仕事もある", "医師免許が必ず必要", "介護施設では資格を取得できない"],
    correct: 1,
    explanation: "無資格・未経験から始められる介護の仕事もあります。ただし、資格や研修が必要な業務もあります。"
  },
  {
    question: "デイサービスの主な特徴はどれでしょうか？",
    choices: ["自宅に泊まり込みで支援する", "病院で手術を行う", "日帰りで介護サービスを受けられる", "施設に必ず長期間入居する"],
    correct: 2,
    explanation: "デイサービス（通所介護）は、利用者が施設に通い、日帰りで日常生活の支援などを受けるサービスです。"
  },
  {
    question: "介護職員が大切にする考え方はどれでしょうか？",
    choices: ["すべて本人の代わりに行う", "全員に同じ支援を行う", "職員の都合を優先する", "本人の意思やできることを尊重する"],
    correct: 3,
    explanation: "利用者の気持ちや自分でできることを大切にし、必要な部分を支援することが重要です。"
  },
  {
    question: "介護の仕事について正しいものはどれでしょうか？",
    choices: ["特別養護老人ホームだけで働く", "訪問介護などの仕事もある", "仕事は夜勤だけである", "利用者と会話する機会はない"],
    correct: 1,
    explanation: "介護職の働く場所はさまざまで、施設での仕事に加え、自宅を訪問して生活を支える仕事などもあります。"
  }
];

// 以前のバージョンの途中経過もできるだけ引き継ぐ
const STORAGE_KEY = "kuizu-progress-v1";
const HISTORY_APP = "kaigo-quiz-site-v2";

let currentQuestion = 0;
let answers = Array(questions.length).fill(null);
let screen = "home"; // home / quiz / result
let started = false;
let runId = 1;

const el = id => document.getElementById(id);
const completed = () => answers.every(answer => answer !== null);

// ==========================
// 保存と復元
// ==========================
function saveProgress() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      currentQuestion,
      answers,
      screen,
      started,
      runId
    }));
  } catch (error) {
    console.warn("進行状況を保存できませんでした。", error);
  }
}

function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const data = JSON.parse(raw);

    const validAnswers = data && Array.isArray(data.answers) &&
      data.answers.length === questions.length &&
      data.answers.every((answer, i) => answer === null ||
        (Number.isInteger(answer) && answer >= 0 && answer < questions[i].choices.length));
    const validIndex = data && Number.isInteger(data.currentQuestion) &&
      data.currentQuestion >= 0 && data.currentQuestion < questions.length;
    const savedScreen = data?.screen === "start" ? "home" : data?.screen;
    const validScreen = ["home", "quiz", "result"].includes(savedScreen);

    if (!validAnswers || !validIndex || !validScreen) return;
    if (savedScreen === "result" && data.answers.includes(null)) return;

    answers = data.answers;
    currentQuestion = data.currentQuestion;
    screen = savedScreen;
    started = typeof data.started === "boolean" ? data.started :
      (screen !== "home" || answers.some(answer => answer !== null));
    // 古いバージョンから更新したときは、まず新しい開始画面を見せる
    if (typeof data.started !== "boolean") screen = "home";
    runId = Number.isInteger(data.runId) && data.runId > 0 ? data.runId : 1;
  } catch (error) {
    console.warn("保存された進行状況を読み込めませんでした。", error);
  }
}

// ==========================
// ブラウザの「戻る」「進む」に対応
// ==========================
function writeHistory(replace = false) {
  try {
    const state = { app: HISTORY_APP, runId, screen, questionIndex: currentQuestion };
    if (replace) history.replaceState(state, "");
    else history.pushState(state, "");
  } catch (error) {
    console.warn("履歴を更新できませんでした。", error);
  }
}

function navigate(nextScreen, index = currentQuestion, replace = false) {
  currentQuestion = index;
  screen = nextScreen;
  render();
  saveProgress();
  writeHistory(replace);
}

window.addEventListener("popstate", event => {
  const state = event.state;
  if (!state || state.app !== HISTORY_APP) return;

  // 「もう一度挑戦する」以前の古い履歴は使わない
  if (state.runId !== runId) {
    writeHistory(true);
    return;
  }
  if (!["home", "quiz", "result"].includes(state.screen)) return;
  if (!Number.isInteger(state.questionIndex) ||
      state.questionIndex < 0 || state.questionIndex >= questions.length) return;
  if (state.screen === "result" && !completed()) return;

  screen = state.screen;
  currentQuestion = state.questionIndex;
  render();
  saveProgress(); // この時は新しい履歴を追加しない
});

// ==========================
// 各画面の表示
// ==========================
function render() {
  el("homeScreen").hidden = screen !== "home";
  el("quizScreen").hidden = screen !== "quiz";
  el("resultScreen").hidden = screen !== "result";

  if (screen === "home") renderHome();
  if (screen === "quiz") renderQuestion();
  if (screen === "result") renderResult();
}

function renderHome() {
  const hasAnswers = answers.some(answer => answer !== null);
  el("startButton").textContent = started ? "最初から挑戦する →" : "クイズをスタート →";
  el("resumeButton").hidden = !started;
  el("resumeButton").textContent = completed() ? "結果を見る" : "続きから再開";
  el("homeStatus").textContent = started ?
    (completed() ? "クイズは終了しています。結果をもう一度確認できます。" :
    `途中の回答は保存されています（${answers.filter(a => a !== null).length} / ${questions.length}問回答済み）。`) :
    "自分のペースで進められます。回答後には解説が表示されます。";
}

function renderQuestion() {
  const q = questions[currentQuestion];
  const selected = answers[currentQuestion];
  const number = currentQuestion + 1;

  el("number").textContent = `第${number}問 / 全${questions.length}問`;
  el("progressPercent").textContent = `${Math.round(number / questions.length * 100)}%`;
  el("progressFill").style.width = `${number / questions.length * 100}%`;
  el("progressTrack").setAttribute("aria-valuemax", String(questions.length));
  el("progressTrack").setAttribute("aria-valuenow", String(number));
  el("question").textContent = q.question;

  const choicesContainer = el("choices");
  choicesContainer.replaceChildren();
  q.choices.forEach((choice, i) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "choice";

    const letter = document.createElement("span");
    letter.className = "choice-letter";
    letter.textContent = "ABCD"[i];
    const text = document.createElement("span");
    text.className = "choice-text";
    text.textContent = choice;
    button.append(letter, text);

    if (selected === null) {
      button.addEventListener("click", () => checkAnswer(i));
    } else {
      button.disabled = true;
      if (i === q.correct) button.classList.add("correct");
      else if (i === selected) button.classList.add("incorrect");
      else button.classList.add("dimmed");
    }
    choicesContainer.appendChild(button);
  });

  const feedback = el("feedback");
  feedback.hidden = selected === null;
  feedback.classList.toggle("wrong", selected !== null && selected !== q.correct);
  if (selected !== null) {
    el("feedbackTitle").textContent = selected === q.correct ? "正解です！" : "おしい！ 正解を確認しましょう";
    el("feedbackAnswer").textContent = `正解：${"ABCD"[q.correct]}. ${q.choices[q.correct]}`;
    el("feedbackExplanation").textContent = q.explanation;
  }

  el("prevButton").hidden = currentQuestion === 0;
  el("nextButton").hidden = selected === null;
  el("nextButton").textContent = number === questions.length ? "結果を見る →" : "次の問題へ →";
}

function renderResult() {
  const score = answers.reduce((total, answer, i) =>
    total + Number(answer === questions[i].correct), 0);
  el("scoreText").textContent = `${score} / ${questions.length}`;
  el("scoreRing").style.setProperty("--score-rate", `${score / questions.length * 100}%`);
  el("scoreRing").setAttribute("aria-label", `正答率 ${Math.round(score / questions.length * 100)}パーセント`);
  el("resultMessage").textContent = score === questions.length ?
    "全問正解！ 介護の仕事への理解が深まっていますね。" :
    "おつかれさまでした！ 解説も振り返ってみましょう。";
}

// ==========================
// ボタンの動作
// ==========================
function startNewQuiz(withoutConfirm = false) {
  if (!withoutConfirm && started && answers.some(a => a !== null) &&
      !window.confirm("今までの回答を消して、最初から挑戦しますか？")) return;
  currentQuestion = 0;
  answers = Array(questions.length).fill(null);
  started = true;
  runId++;
  navigate("quiz", 0);
}

function checkAnswer(choiceIndex) {
  if (screen !== "quiz" || answers[currentQuestion] !== null) return;
  answers[currentQuestion] = choiceIndex;
  renderQuestion();
  saveProgress();
}

el("startButton").addEventListener("click", () => startNewQuiz());
el("resumeButton").addEventListener("click", () => {
  if (completed()) navigate("result");
  else navigate("quiz");
});
el("prevButton").addEventListener("click", () => {
  if (currentQuestion > 0) navigate("quiz", currentQuestion - 1);
});
el("nextButton").addEventListener("click", () => {
  if (answers[currentQuestion] === null) return;
  if (currentQuestion === questions.length - 1) navigate("result");
  else navigate("quiz", currentQuestion + 1);
});
el("reviewButton").addEventListener("click", () => navigate("quiz", questions.length - 1));
el("restartButton").addEventListener("click", () => startNewQuiz(true));
el("resultHomeButton").addEventListener("click", () => navigate("home"));

const pauseDialog = el("pauseDialog");
el("pauseButton").addEventListener("click", () => {
  if (typeof pauseDialog.showModal === "function") pauseDialog.showModal();
  else if (window.confirm("回答を保存してトップ画面に戻りますか？")) navigate("home");
});
el("cancelPauseButton").addEventListener("click", () => pauseDialog.close());
el("confirmPauseButton").addEventListener("click", () => {
  pauseDialog.close();
  navigate("home");
});

// 保存データを読み込んで、前回の続きから画面を開く
loadProgress();
render();
saveProgress();
writeHistory(true);
