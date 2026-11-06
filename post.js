
import { db } from "./firebase.js";

import {
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/11.0.0/firebase-firestore.js";

// 日常の流れを追加するボタン
const addFlowButton = document.getElementById("add-flow");
const flowContainer = document.getElementById("daily-flow-container");

// 日常の流れを追加
if (addFlowButton && flowContainer) {
  addFlowButton.addEventListener("click", () => {
    const flowItem = document.createElement("div");
    flowItem.className = "flow-item";

    flowItem.innerHTML = `
      <input type="time" name="flow-time[]">
      <input type="text" name="flow-task[]" placeholder="仕事内容">
      <button type="button" class="remove-flow">削除</button>
    `;

    flowContainer.appendChild(flowItem);
  });

  // 日常の流れを削除
  flowContainer.addEventListener("click", (event) => {
    if (event.target.classList.contains("remove-flow")) {
      event.target.closest(".flow-item").remove();
    }
  });
}

// 投稿フォーム
const form = document.querySelector("form");
const message = document.getElementById("form-message");

if (form) {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = document.getElementById("facility-name").value.trim();
    const description = document.getElementById("facility-description").value.trim();

    if (!name || !description) {
      message.textContent = "施設・企業名と紹介文を入力してください。";
      return;
    }

    // 1日の流れを取得
    const times = document.querySelectorAll('input[name="flow-time[]"]');
    const tasks = document.querySelectorAll('input[name="flow-task[]"]');

    const dailyFlow = [];

    for (let i = 0; i < times.length; i++) {
      const time = times[i].value;
      const task = tasks[i].value.trim();

      if (time || task) {
        dailyFlow.push({ time, task });
      }
    }

    try {
      // Firestoreに保存
      await addDoc(collection(db, "facilities"), {
        name: name,
        description: description,
        dailyFlow: dailyFlow,
        createdAt: serverTimestamp()
      });

      message.textContent = "投稿内容を保存しました！";
      form.reset();

    } catch (error) {
      console.error("保存エラー:", error);
      message.textContent = "保存に失敗しました。設定を確認してください。";
    }
  });
}
