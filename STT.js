// 選取html 元素
const texts = document.querySelector(".texts");
const btn = document.querySelector("button");
// 紀錄錄音狀態
let recordStatus = false;
// 宣告 SpeechRecognition 物件
window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new window.SpeechRecognition();
recognition.interimResults = true;
recognition.continuous = true;
recognition.lang = "zh-TW";
// 宣告一個要插入 transcript 的 p tag
let p = document.createElement("p");

recognition.addEventListener("result", handleResult);

btn.addEventListener("click", handleClick);

// 功能函式
// 處理 TTS Object，解析出結果的涵式
function handleResult(e) {
  const text = Array.from(e.results)
    .map((result) => result[0].transcript)
    .join("");

  p.innerText = text;
  console.log(text);
}
// 處理 開始結束按鈕切換與開始暫停的涵式
function handleClick() {
  recordStatus = !recordStatus;
  if (recordStatus) {
    recognition.start();
    btn.innerText = "暫停錄音";
  } else {
    recognition.stop();
    texts.appendChild(p);
    p = document.createElement("p");
    btn.innerText = "開始錄音";
  }
}
