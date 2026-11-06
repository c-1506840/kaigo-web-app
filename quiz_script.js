"use strict";

// ==========================
// クイズの問題（4択・30問）
// ==========================
  
const questions = [
  // 第1問
  {
    question: "介護職員の主な仕事はどれでしょうか？",
    choices: ["食事や入浴の支援", "病気の診断", "薬の処方", "建物の設計"],
    correct: 0,
    explanation: "介護職員は食事、入浴、移動など、利用者の日常生活を支える仕事をしています。"
  },
  // 第2問
  {
    question: "介護の仕事について正しいものはどれでしょうか？",
    choices: ["すべての仕事に国家資格が必要", "無資格から始められる仕事もある", "医師免許が必ず必要", "介護施設では資格を取得できない"],
    correct: 1,
    explanation: "無資格・未経験から始められる介護の仕事もあります。ただし、資格や研修が必要な業務もあります。"
  },
  // 第3問
  {
    question: "デイサービスの主な特徴はどれでしょうか？",
    choices: ["自宅に泊まり込みで支援する", "病院で手術を行う", "日帰りで介護サービスを受けられる", "施設に必ず長期間入居する"],
    correct: 2,
    explanation: "デイサービス（通所介護）は、利用者が施設に通い、日帰りで日常生活の支援などを受けるサービスです。"
  },
  // 第4問
  {
    question: "介護職員が大切にする考え方はどれでしょうか？",
    choices: ["すべて本人の代わりに行う", "全員に同じ支援を行う", "職員の都合を優先する", "本人の意思やできることを尊重する"],
    correct: 3,
    explanation: "利用者の気持ちや自分でできることを大切にし、必要な部分を支援することが重要です。"
  },
  // 第5問
  {
    question: "介護の仕事について正しいものはどれでしょうか？",
    choices: ["特別養護老人ホームだけで働く", "訪問介護などの仕事もある", "仕事は夜勤だけである", "利用者と会話する機会はない"],
    correct: 1,
    explanation: "介護職の働く場所はさまざまで、施設での仕事に加え、自宅を訪問して生活を支える仕事などもあります。"
  },
  // 第6問
  {
    question: "介護職員が食事の支援をするときに大切なことはどれでしょうか？",
    choices: ["できるだけ早く食べさせる", "全員に同じ量を食べさせる", "本人のペースや飲み込みの状態に配慮する", "会話を一切しない"],
    correct: 2,
    explanation: "食事の支援では、本人のペースや飲み込みの状態を確認し、安全に食事ができるよう配慮します。"
  },
  // 第7問
  {
    question: "訪問介護とはどのようなサービスでしょうか？",
    choices: ["介護職員が利用者の自宅を訪問する", "利用者が毎日病院に通う", "利用者が必ず施設に入居する", "病院で手術を受ける"],
    correct: 0,
    explanation: "訪問介護は、訪問介護員が利用者の自宅を訪問し、身体介護や生活援助などを行うサービスです。"
  },
  // 第8問
  {
    question: "介護福祉士について正しいものはどれでしょうか？",
    choices: ["医師の資格である", "介護に関する国家資格である", "自動車運転の資格である", "看護師と同じ資格である"],
    correct: 1,
    explanation: "介護福祉士は、専門的な知識と技術を用いて介護などを行う国家資格です。"
  },
  // 第9問
  {
    question: "車いすを使用する人を支援するときに大切なことはどれでしょうか？",
    choices: ["必ず速く移動する", "本人に何も伝えず動かす", "段差を勢いよく越える", "本人に声をかけ、安全を確認する"],
    correct: 3,
    explanation: "車いすの移動では、本人に声をかけ、周囲の安全やブレーキなどを確認することが大切です。"
  },
  // 第10問
  {
    question: "介護職員が利用者と会話するときに大切なことはどれでしょうか？",
    choices: ["話を最後まで聞く", "相手の話を遮る", "職員の意見を必ず押し付ける", "利用者の気持ちを無視する"],
    correct: 0,
    explanation: "利用者の話を丁寧に聞き、気持ちや希望を理解しようとする姿勢が大切です。"
  },
  // 第11問
  {
    question: "特別養護老人ホームの主な役割はどれでしょうか？",
    choices: ["旅行の手配をする", "学校教育を行う", "入居者の生活を介護などで支える", "商品の販売を専門に行う"],
    correct: 2,
    explanation: "特別養護老人ホームは、常に介護が必要な人などが入居し、日常生活の介護などを受ける施設です。"
  },
  // 第12問
  {
    question: "介護の仕事で記録を残す主な理由はどれでしょうか？",
    choices: ["職員の字の上手さを比べるため", "利用者の状態や支援内容を共有するため", "利用者の趣味を制限するため", "記録することだけが仕事だから"],
    correct: 1,
    explanation: "介護記録は、利用者の状態や行った支援を職員間で共有し、継続的な支援につなげるために重要です。"
  },
  // 第13問
  {
    question: "介護現場でICTを活用する例はどれでしょうか？",
    choices: ["記録をすべて廃止する", "利用者との会話を禁止する", "職員間の連絡をなくす", "タブレットで介護記録を入力する"],
    correct: 3,
    explanation: "タブレットなどを活用して介護記録を入力・共有することで、情報共有の効率化が期待できます。"
  },
  // 第14問
  {
    question: "介護職員の仕事について正しいものはどれでしょうか？",
    choices: ["多職種と協力することがある", "必ず一人だけで仕事をする", "利用者との会話は不要である", "記録を共有する必要はない"],
    correct: 0,
    explanation: "介護職員は看護師やケアマネジャーなど、さまざまな職種と協力して利用者を支えることがあります。"
  },
  // 第15問
  {
    question: "レクリエーションを行う目的の一つはどれでしょうか？",
    choices: ["利用者に必ず競争させる", "利用者を疲れさせる", "交流や楽しみの機会をつくる", "全員に同じ活動を強制する"],
    correct: 2,
    explanation: "レクリエーションには、楽しみや交流の機会をつくり、心身の活動を支える役割があります。"
  },
  // 第16問
  {
    question: "認知症のある人と接するときに大切なことはどれでしょうか？",
    choices: ["必ず大きな声で叱る", "安心できるように落ち着いて対応する", "本人の言葉をすべて否定する", "会話を避ける"],
    correct: 1,
    explanation: "認知症のある人への支援では、本人の気持ちを尊重し、安心できる対応を心がけることが大切です。"
  },
  // 第17問
  {
    question: "介護職員が手洗いを行う主な理由はどれでしょうか？",
    choices: ["作業時間を増やすため", "手を温めるためだけ", "制服をきれいにするため", "感染症の広がりを防ぐため"],
    correct: 3,
    explanation: "手洗いなどの手指衛生は、利用者や職員を感染症から守るための基本的な対策です。"
  },
  // 第18問
  {
    question: "介護における『自立支援』に近い考え方はどれでしょうか？",
    choices: ["本人ができることを尊重して支える", "どんなことでも職員が代わりに行う", "本人の希望を聞かない", "支援を必要とする人を放置する"],
    correct: 0,
    explanation: "自立支援では、本人の持つ力や意思を大切にしながら、必要な部分を支えることが重要です。"
  },
  // 第19問
  {
    question: "入浴の支援を行うときに大切なことはどれでしょうか？",
    choices: ["必ず熱いお湯を使用する", "職員の都合だけで進める", "安全とプライバシーに配慮する", "本人への説明を省略する"],
    correct: 2,
    explanation: "入浴介助では、転倒などの事故を防ぎ、本人の尊厳やプライバシーを守ることが大切です。"
  },
  // 第20問
  {
    question: "ケアマネジャーの主な役割はどれでしょうか？",
    choices: ["医師として手術を行う", "介護サービスの利用計画の作成や調整を行う", "介護施設の建物を設計する", "薬を製造する"],
    correct: 1,
    explanation: "ケアマネジャーは、本人の希望や状態を踏まえてケアプランを作成し、サービス事業者などとの連絡調整を行います。"
  },
  // 第21問
  {
    question: "介護職員が利用者の変化に気づいたとき、適切な行動はどれでしょうか？",
    choices: ["必ず何もしない", "記録を残さない", "本人の変化を隠す", "必要に応じて上司や関係職種に報告する"],
    correct: 3,
    explanation: "体調や様子の変化に気づいた場合は、必要に応じて報告・相談し、適切な対応につなげます。"
  },
  // 第22問
  {
    question: "介護施設で行われる『申し送り』の目的はどれでしょうか？",
    choices: ["利用者の状態や注意事項を職員間で伝える", "職員の趣味だけを話し合う", "介護記録をすべて削除する", "利用者の情報を外部に公開する"],
    correct: 0,
    explanation: "申し送りは、利用者の状態や支援上の注意点を次の担当者などに伝えるために行います。"
  },
  // 第23問
  {
    question: "介護現場でプライバシーを守るために適切な行動はどれでしょうか？",
    choices: ["利用者情報をSNSに自由に投稿する", "家族以外には情報を一切伝えない", "必要な人に必要な情報だけを適切に共有する", "利用者の写真を無断で公開する"],
    correct: 2,
    explanation: "利用者の個人情報は適切に管理し、業務上必要な範囲で、定められたルールに従って共有します。"
  },
  // 第24問
  {
    question: "介護職員の働き方について正しいものはどれでしょうか？",
    choices: ["すべての職場で夜勤が必須である", "日勤中心の職場もある", "必ず24時間連続で働く", "休日は一切ない"],
    correct: 1,
    explanation: "介護職には日勤中心の仕事や夜勤を含む仕事など、施設やサービスに応じた働き方があります。"
  },
  // 第25問
  {
    question: "介護職員が移動の支援をするときに大切なことはどれでしょうか？",
    choices: ["本人を急がせる", "本人の意思を無視する", "周囲を確認せずに歩く", "本人の状態に合った方法で安全を確保する"],
    correct: 3,
    explanation: "移動の支援では、本人の身体の状態や希望、周囲の環境を確認して安全に支援します。"
  },
  // 第26問
  {
    question: "介護ロボットなどの福祉機器を導入する目的の一つはどれでしょうか？",
    choices: ["職員の身体的負担を軽減する", "利用者との会話を完全になくす", "職員をすべて不要にする", "介護記録を禁止する"],
    correct: 0,
    explanation: "移乗を支援する機器などを活用すると、職員の身体的負担の軽減や安全性の向上が期待できます。"
  },
  // 第27問
  {
    question: "介護職員が利用者の希望を確認する理由はどれでしょうか？",
    choices: ["職員の予定を優先するため", "利用者に同じ行動を強制するため", "本人らしい生活を支えるため", "利用者との会話を減らすため"],
    correct: 2,
    explanation: "利用者の意思や生活習慣を理解し、その人らしい暮らしを支えることが介護では大切です。"
  },
  // 第28問
  {
    question: "介護現場で転倒を防ぐために適切な行動はどれでしょうか？",
    choices: ["床に荷物を置いたままにする", "通路の障害物を取り除く", "暗い場所で移動してもらう", "本人に合わない履物を使ってもらう"],
    correct: 1,
    explanation: "通路の整理や滑りにくい環境づくりなどは、転倒事故を防ぐための基本的な対策です。"
  },
  // 第29問
  {
    question: "介護職員が仕事でやりがいを感じる場面の例として適切なのはどれでしょうか？",
    choices: ["利用者の希望を無視したとき", "同僚との情報共有をやめたとき", "利用者の行動をすべて制限したとき", "利用者の笑顔や生活の変化を感じられたとき"],
    correct: 3,
    explanation: "利用者の笑顔や『ありがとう』という言葉、できることが増える姿などにやりがいを感じる介護職員もいます。"
  },
  // 第30問
  {
    question: "介護の仕事について最も適切な説明はどれでしょうか？",
    choices: ["利用者の生活や気持ちを支える仕事である", "食事の支援だけを行う仕事である", "医師だけが行える仕事である", "利用者と関わる必要がない仕事である"],
    correct: 0,
    explanation: "介護は食事や入浴などの身体的な支援に加え、利用者の気持ちや暮らしを支える大切な仕事です。"
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
screen = "home";
render();
saveProgress();
writeHistory(true);
