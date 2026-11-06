
import { db } from "./firebase.js";

import {
  collection,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/11.0.0/firebase-firestore.js";

// HTMLの表示場所を取得
const facilityList = document.getElementById("facility-list");
const emptyMessage = document.getElementById("empty-message");

// Firestoreから施設・企業情報を取得
onSnapshot(
  collection(db, "facilities"),

  (snapshot) => {
    console.log("取得したデータ件数:", snapshot.size);

    // 一覧を一度空にする
    facilityList.replaceChildren();

    // データがない場合
    if (snapshot.empty) {
      emptyMessage.style.display = "block";
      return;
    }

    emptyMessage.style.display = "none";

    // 取得したデータを1件ずつ表示
    snapshot.forEach((doc) => {
      const data = doc.data();

      // 施設情報のカードを作成
      const card = document.createElement("div");
      card.className = "facility-card";

      // 施設・企業名
      const title = document.createElement("h2");
      title.textContent = data.name || "施設名なし";

      // 紹介文
      const description = document.createElement("p");
      description.textContent =
        data.description || "紹介文はありません。";

      card.appendChild(title);
      card.appendChild(description);

      // 1日の流れ
      if (data.dailyFlow && data.dailyFlow.length > 0) {
        const heading = document.createElement("h3");
        heading.textContent = "1日の流れ";

        const flowList = document.createElement("ul");

        data.dailyFlow.forEach((flow) => {
          const item = document.createElement("li");

          item.textContent =
            `${flow.time || ""} ${flow.task || ""}`;

          flowList.appendChild(item);
        });

        card.appendChild(heading);
        card.appendChild(flowList);
      }

      // 一覧画面に追加
      facilityList.appendChild(card);
    });
  },

  (error) => {
    console.error("データ取得エラー:", error);

    emptyMessage.textContent =
      "情報を読み込めませんでした。";

    emptyMessage.style.display = "block";
  }
);
