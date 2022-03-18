const messages = ['Здравствуй, мой русский друг, Мы не знакомы, но я решил написать тебе. Я слышал, что ситуация в России начала осложняться из-за реакции на жестокое российское вторжение в Украину. Как ты?',
  'Здравствуйте, мы не знакомы, но я решил написать вам, потому что постоянно читаю о войне в Украине. Как сейчас живется в России? Что вы слышите по телевизору о войне? Как ты?',
  'Здравствуйте, мы не знакомы. Я живу за границей. Я знаю, что Россия вторглась в Украину, и там погибло много солдат и мирных жителей. Как вам живется в России? Как дела?',
  'Привет! Как дела? Как сейчас живется в России? Я живу за границей и пишу вам, чтобы узнать, что вам говорят по телевизору о нападении России на Украину. Там гибнет много солдат и мирных жителей.']

let messageIndex = 0;
let currentMsg = '';
let phoneNum = '';

function iOS() {
  return [
        'iPad Simulator',
        'iPhone Simulator',
        'iPod Simulator',
        'iPad',
        'iPhone',
        'iPod'
      ].includes(navigator.platform)
      || (navigator.userAgent.includes("Mac") && "ontouchend" in document)
}

function isMobile() {
  var ua = navigator.userAgent;
  return /Android|webOS|iPhone|iPad|iPod/i.test(ua);
}

async function draw() {
  const response = await fetch('https://powiedz.im/api/'); //provide yours api endpoint, 1920.in won't work due to cors
  phoneNum = await response.json();
  setMessage();
}

function setMessage() {
  const phoneNumberField = document.getElementById("phoneNumber");
  phoneNumberField.innerText = '+' + phoneNum;
  let queryChar = iOS() ? '&' : '?';
  let smshref = "sms:" + '+' + phoneNum + queryChar + "body=" + encodeURI(
      currentMsg);
  phoneNumberField.href = smshref;
  const sendButton = document.getElementById("buttonSend");
  sendButton.href = smshref;
}

function getDefaultIndex() {
  messageIndex = 0;
  return messageIndex;
}

function drawText() {
  currentMsg = messages[messageIndex == messages.length ? getDefaultIndex()
      : messageIndex];
  messageIndex++;
  const messageField = document.getElementById("message");
  messageField.innerText = currentMsg;
  setMessage()
}

document.addEventListener("DOMContentLoaded", async () => {
  if (isMobile()) {
    document.getElementById("buttonCopy").style = 'display: none';
  } else {
    document.getElementById("buttonSend").style = 'display: none';
    document.getElementById("buttonCopy").addEventListener("click", () => {
      const phoneNumberField = document.getElementById("phoneNumber");
      navigator.clipboard.writeText(phoneNumberField.innerText);
    });
  }
  drawText();
  const buttonReload = document.getElementById("buttonReload");
  buttonReload.addEventListener("click", async () => {
    await draw()
  });
  await draw();

  document.getElementById("buttonCopyText").addEventListener("click", () => {
    const messageField = document.getElementById("message");
    navigator.clipboard.writeText(messageField.innerText);
  });

  document.getElementById("buttonTextReload").addEventListener("click", () => {
    drawText()
  });
});
