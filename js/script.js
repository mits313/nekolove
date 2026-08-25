/*===========================================================
  NEKO LOVE ／ JavaScript実習（完成見本）

  3つの機能を追加しています。
  どれも「① 要素を取る → ② きっかけを待つ → ③ クラスを付け外しする」
  の形でできています。

  JavaScript には色もサイズも書いていません。
  見た目と動きは、すべて css/style.css が決めています。
===========================================================*/


/*===========================================================
  STEP 1 ／ ハンバーガーメニュー
===========================================================*/

// ① 要素を取る
const menuBtn = document.querySelector("#menu-btn");
const nav = document.querySelector("#nav");

// ② きっかけを待つ
menuBtn.addEventListener("click", () => {
  // ③ クラスを付け外しする（ボタンとメニューの両方に付ける）
  menuBtn.classList.toggle("is-open");
  nav.classList.toggle("is-open");
});


/*===========================================================
  STEP 2 ／ スクロールでふわっと表示

  IntersectionObserver ＝「画面に入ったら教えてくれる」係。
  この形はまるごとコピーして使います。
===========================================================*/

const observer = new IntersectionObserver((entries) => {
  // entries.forEach(...) ＝ 見つかったものぜんぶに同じ処理を繰り返す
  entries.forEach((entry) => {
    // isIntersecting ＝ いま画面の中に入っているか
    if (entry.isIntersecting) {
      // entry.target ＝ 画面に入ってきた、その要素
      entry.target.classList.add("is-visible");
    }
  });
});

// 見張ってほしい要素を登録する
observer.observe(document.querySelector("#about-title"));
observer.observe(document.querySelector("#about-content"));
observer.observe(document.querySelector("#cat-title"));
observer.observe(document.querySelector("#cat-1"));
observer.observe(document.querySelector("#cat-2"));
observer.observe(document.querySelector("#cat-3"));


/*===========================================================
  STEP 3 ／ モーダルウィンドウ

  開くきっかけと閉じるきっかけが別々なので、
  toggle ではなく add と remove を使い分けます。
===========================================================*/

// ① 要素を取る
const modal = document.querySelector("#modal");
const modalImage = document.querySelector("#modal-image");

const catImage1 = document.querySelector("#cat-image-1");
const catImage2 = document.querySelector("#cat-image-2");
const catImage3 = document.querySelector("#cat-image-3");

// ② 開く（写真をクリックしたとき）
catImage1.addEventListener("click", () => {
  modalImage.src = catImage1.src; // 押された写真と同じ画像に差し替える
  modal.classList.add("is-open"); // 開くので add
});

catImage2.addEventListener("click", () => {
  modalImage.src = catImage2.src;
  modal.classList.add("is-open");
});

catImage3.addEventListener("click", () => {
  modalImage.src = catImage3.src;
  modal.classList.add("is-open");
});

// ③ 閉じる（✕ボタン）
const modalClose = document.querySelector("#modal-close");

modalClose.addEventListener("click", () => {
  modal.classList.remove("is-open"); // 閉じるので remove
});


/*===========================================================
  発展課題の解答例
===========================================================*/

/*-------------------------------------------
  背景をクリックしても閉じる
-------------------------------------------*/

modal.addEventListener("click", (event) => {
  // event.target ＝ 実際にクリックされた要素。
  // 「背景そのもの」が押されたときだけ閉じる。
  // これがないと、写真を押しただけで閉じてしまう
  if (event.target === modal) {
    modal.classList.remove("is-open");
  }
});

/*-------------------------------------------
  メニューのリンクを押したら、メニューを閉じる
-------------------------------------------*/

nav.addEventListener("click", (event) => {
  // 押されたのがリンク（a要素）だったときだけ閉じる
  if (event.target.tagName === "A") {
    menuBtn.classList.remove("is-open");
    nav.classList.remove("is-open");
  }
});

/*-------------------------------------------
  キーボードの Esc を押しても閉じる
-------------------------------------------*/

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    modal.classList.remove("is-open");
    menuBtn.classList.remove("is-open");
    nav.classList.remove("is-open");
  }
});
