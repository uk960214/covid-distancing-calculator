const currentStatus = {
  level: [1, 2, 3, 4],
  group: [
    "제한 없음",
    "8명까지 가능",
    "4명까지 가능",
    "18시 이전 4명, 18시 이후 2명",
  ],
  event: ["500인 이상 사전 신고", "100인 이상 금지", "50인 이상 금지", "금지"],
  protest: [499, 99, 49, 1],
};

const regionLevels = {
  seoul: 4,
  gyeongi: 4,
  incheon: 4,
  gangwon: 3,
  choongbuk: 3,
  choongnam: 3,
  sejong: 3,
  daejeon: 4,
  cheonbuk: 3,
  cheonnam: 3,
  gwangju: 3,
  gyeongbuk: 3,
  gyeongnam: 3,
  daegu: 3,
  busan: 4,
  jeju: 4,
};

const sectorLimit = {
  club: [6, 8, 8, 0],
  dance: [8, 10, 10, 0],
  holdem: [6, 8, 8, 0],
  restaurant: [0, 0, 0, 0],
  karaoke: [6, 8, 8, 8],
  sauna: [6, 8, 8, 8],
  fitness: [6, 8, 8, 8],
  visit: [6, 8, 8, 8],
};

const regionSelect = document.querySelector("#region-select");

const current = document.querySelector(".current");
const levelField = current.querySelector(".level");
const groupField = current.querySelector(".group");
const eventField = current.querySelector(".event");
const protestField = current.querySelector(".protest");

const sectorSelector = document.querySelector("#sector-select");
const levelSelector = document.querySelector("#level-select");

const calcButton = document.querySelector(".calc-button");
const resultOutput = document.querySelector(".result");

let currLevel = regionLevels["seoul"] - 1;
levelSelector.value = currLevel + 1;
levelField.textContent = `${currentStatus["level"][currLevel]} 단계`;
groupField.textContent = currentStatus["group"][currLevel];
eventField.textContent = currentStatus["event"][currLevel];
protestField.textContent = `${currentStatus["protest"][currLevel]}명까지 가능`;

regionSelect.addEventListener("change", (e) => {
  currLevel = regionLevels[e.target.value] - 1;
  levelSelector.value = currLevel + 1;
  levelField.textContent = `${currentStatus["level"][currLevel]} 단계`;
  groupField.textContent = currentStatus["group"][currLevel];
  eventField.textContent = currentStatus["event"][currLevel];
  protestField.textContent = `${currentStatus["protest"][currLevel]}명까지 가능`;
});

sectorSelector.addEventListener("change", (e) => {
  if (e.target.value === "restaurant") {
    calcButton.disabled = "disabled";
    resultOutput.textContent =
      "테이블간 1m 거리두기 또는 좌석/테이블 한 칸 띄우기 또는 칸막이 설치";
  } else {
    calcButton.disabled = "";
    resultOutput.textContent = "";
  }
});

calcButton.addEventListener("click", (e) => {
  const level = levelSelector.value - 1;
  const space = document.querySelector(".space");
  const sector = sectorSelector.value;
  if (space.value) {
    if (space.value < 50) {
      alert("계산 가능한 최소 면적은 50입니다.");
    } else {
      if (sectorLimit[sector][level] === 0) {
        resultOutput.textContent = "집합금지";
      } else {
        const result = Math.floor(space.value / sectorLimit[sector][level]);
        resultOutput.textContent = `${result}명`;
      }
    }
  } else {
    alert("면적을 입력해주세요");
  }
});
