
import { db, auth } from "./firebase.js";

import {
  collection,
  addDoc,
  serverTimestamp,
  doc,
  getDoc,
  setDoc
} from "https://www.gstatic.com/firebasejs/11.0.0/firebase-firestore.js";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/11.0.0/firebase-auth.js";

// HTML要素
const form = document.getElementById("facility-form");
const message = document.getElementById("form-message");

const authSection = document.getElementById("auth-section");
const authTitle = document.getElementById("auth-title");
const authDescription = document.getElementById("auth-description");
const authEmail = document.getElementById("auth-email");
const authPassword = document.getElementById("auth-password");
const authSubmit = document.getElementById("auth-submit");
const toggleAuth = document.getElementById("toggle-auth");
const authMessage = document.getElementById("auth-message");
const signupFields = document.getElementById("signup-fields");
const signupFacilityName = document.getElementById("signup-facility-name");

let isSignup = false;
let isApproved = false;

// ログイン画面を表示
function showAuth() {
  authSection.hidden = false;
  authSection.scrollIntoView({ behavior: "smooth" });
  authMessage.textContent = "投稿するにはログインしてください。";
}

// ログイン画面と新規登録画面を切り替え
toggleAuth.addEventListener("click", () => {
  isSignup = !isSignup;

  authTitle.textContent = isSignup ? "新規登録" : "ログイン";
  authDescription.textContent = isSignup
    ? "施設情報を入力してアカウントを登録してください。"
    : "登録したメールアドレスとパスワードを入力してください。";

  signupFields.hidden = !isSignup;
  authSubmit.textContent = isSignup ? "アカウントを登録" : "ログイン";
  toggleAuth.textContent = isSignup
    ? "ログインはこちら"
    : "新規登録はこちら";

  authMessage.textContent = "";
});

// 承認状態を確認
async function checkApproval(user) {
  if (!user) {
    isApproved = false;
    return false;
  }

  const approvalRef = doc(db, "facilityApprovals", user.uid);
  const approvalSnap = await getDoc(approvalRef);

  if (
    approvalSnap.exists() &&
    approvalSnap.data().status === "approved"
  ) {
    isApproved = true;
    authSection.hidden = true;
    return true;
  }

  isApproved = false;
  authSection.hidden = false;
  authMessage.textContent =
    "現在、管理者の承認待ちです。承認されるまで投稿できません。";

  return false;
}

// ログイン状態の確認
onAuthStateChanged(auth, async (user) => {
  if (user) {
    try {
      await checkApproval(user);
    } catch (error) {
      console.error("承認確認エラー:", error);
      authMessage.textContent =
        "承認状態を確認できませんでした。設定を確認してください。";
    }
  } else {
    isApproved = false;
  }
});

// ログイン・新規登録
authSubmit.addEventListener("click", async () => {
  const email = authEmail.value.trim();
  const password = authPassword.value;
  const facilityName = signupFacilityName.value.trim();

  authMessage.textContent = "";

  if (!email || !password) {
    authMessage.textContent =
      "メールアドレスとパスワードを入力してください。";
    return;
  }

  if (isSignup && !facilityName) {
    authMessage.textContent = "施設・企業名を入力してください。";
    return;
  }

  try {
    authSubmit.disabled = true;

    if (isSignup) {
      // アカウントを新規作成
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // 承認申請をFirestoreに保存
      await setDoc(doc(db, "facilityApprovals", result.user.uid), {
        facilityName: facilityName,
        email: email,
        status: "pending",
        createdAt: serverTimestamp()
      });

      authMessage.textContent =
        "登録が完了しました。現在、管理者の承認待ちです。";

      isApproved = false;

    } else {
      // ログイン
      const result = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const approved = await checkApproval(result.user);

      if (approved) {
        authMessage.textContent = "ログインしました。投稿できます。";
      }
    }

  } catch (error) {
    console.error("認証エラー:", error);

    if (error.code === "auth/email-already-in-use") {
      authMessage.textContent =
        "このメールアドレスはすでに登録されています。";
    } else if (error.code === "auth/invalid-credential") {
      authMessage.textContent =
        "メールアドレスまたはパスワードが違います。";
    } else {
      authMessage.textContent =
        "処理に失敗しました。入力内容やFirebaseの設定を確認してください。";
    }

  } finally {
    authSubmit.disabled = false;
  }
});

// 1日の流れを追加
const addFlowButton = document.getElementById("add-flow-button");
const flowContainer = document.getElementById("daily-flow-inputs");

addFlowButton.addEventListener("click", () => {
  const flowItem = document.createElement("div");
  flowItem.className = "flow-item";

  flowItem.innerHTML = `
    <p>
      <label>時間</label><br>
      <input type="text" name="flow-time[]" placeholder="例：9:00">
    </p>
    <p>
      <label>仕事内容</label><br>
      <input type="text" name="flow-task[]" placeholder="仕事内容">
    </p>
    <button type="button" class="remove-flow">削除</button>
  `;

  flowContainer.appendChild(flowItem);
});

// 1日の流れを削除
flowContainer.addEventListener("click", (event) => {
  if (event.target.classList.contains("remove-flow")) {
    event.target.closest(".flow-item").remove();
  }
});

// 投稿処理
form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const user = auth.currentUser;

  // ログインしていない場合
  if (!user) {
    showAuth();
    authMessage.textContent =
      "投稿するにはログインまたは新規登録してください。";
    return;
  }

  // 承認状態を再確認
  try {
    const approved = await checkApproval(user);

    if (!approved) {
      return;
    }

    const name = document.getElementById("facility-name").value.trim();
    const description = document.getElementById("facility-description").value.trim();

    if (!name || !description) {
      message.textContent =
        "施設・企業名と紹介文を入力してください。";
      return;
    }

    // 1日の流れを取得
    const times = document.querySelectorAll('input[name="flow-time[]"]');
    const tasks = document.querySelectorAll('input[name="flow-task[]"]');

    const dailyFlow = [];

    for (let i = 0; i < times.length; i++) {
      const time = times[i].value.trim();
      const task = tasks[i].value.trim();

      if (time || task) {
        dailyFlow.push({ time, task });
      }
    }

    // Firestoreに保存
    await addDoc(collection(db, "facilities"), {
      name: name,
      description: description,
      dailyFlow: dailyFlow,
      ownerUid: user.uid,
      createdAt: serverTimestamp()
    });

    message.textContent = "投稿内容を保存しました！";
    form.reset();

  } catch (error) {
    console.error("投稿エラー:", error);
    message.textContent =
      "投稿に失敗しました。Firebaseのセキュリティ設定を確認してください。";
  }
});
