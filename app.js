// тоглогчийн ээлжийг хадгалах хувьсагч нэгдүгээр тоглогч 0, хоёрдугаар тоглогч 1
var activePlayer = 0;

// тоглогчийн оноог хадгалах хувьсагч
var scores = [0, 0];

//тоглогчийн ээлжиндээ цуглуулж байгааг хадгалах хуввсагч
var roundScore = 0;

// шооны аль талаараа буусныг хадгалах хувьсагч 1-6 гэсэн утгыг санамсаргүйгээр үүсгэж өгнө
// 1-6 хүртэлхи тооноос тохиолдлын тоог гаргаж авья
var diceNumber = Math.floor(Math.random() * 6) + 1;

// <div class="player-score" id="score-0">43</div>
// window dotorhi document iin querySelector oor html dotorhi yamr ng function iig holbono uun dotorhi textContent duudaj tuhain uguh gsen utgaa ugnu doorhi maygaar
// одоо энд random аар гарч ирж байгаа утгаа харгалзуулж болно
// Тоглогч-0
// window.document.querySelector("#score-0").textContent = dice;
// Тоглогч-1
// window нь глобал хувьсагч учир заавал бичих шаардлагагүй
// document.querySelector("#score-1").innerHTML = "<em><b>Yes</b></em>";

// одоо шооны утга харуулсан зургийг style display руу ороод none утга өгөхөд алга болно

// Програм эхлэхэд бэлтгэе хэрэв ID аар  нь файлыг сонгосон байвал querySelector ийн оронд getElelmentById ийг оруулж болно гэхдээ id нэрээ # гүйгээр бичнэ
window.document.getElementById("score-0").textContent = 0;
window.document.getElementById("score-1").textContent = 0;
window.document.getElementById("current-0").textContent = 0;
window.document.getElementById("current-1").textContent = 0;

window.document.querySelector(".dice").style.display = "none";

/*одоо доорхи дарааллаар явья
1.Roll Dice товчийг DOM оос авна
2. уг товч дээр хулганаах CLICK хийхэд ажиллах эвент листенер функц бичиж холбоно
3.Click хийхэд :
3.1 1-6 хооронд санамсаргүй тоо үүсгэнэ
3.2. DOM оос шооны зургийн обьектийг авна
3.3. уг обьектийг вэб дээр харагддаг болгоно
3.4. уг обьектийн зургийг өөрчилнө */
/*addEventListener ( event iin ner, event bolohod yamr үйлдэл хийх функц байна) */
var diceDom = window.document.querySelector(".dice");

// шоог шидэх event listiner

document.querySelector(".btn-roll").addEventListener("click", function () {
  // 1-6 хүртэл санамсаргүй нэг тоог гаргаж авна
  var diceNumber = Math.floor(Math.random() * 6) + 1;

  // шооны зургийг гаргаж ирнэ
  diceDom.style.display = "block";

  // буусан санамсаргүй тоонл харгалзах  шооны зургийг вэб дээр гаргаж ирнэ
  diceDom.src = "dice-" + diceNumber + ".png";

  //Буусан тоо нь нэгээс ялгаатай бол идэвхитэй тоглогчийн ээлжийн оноог нэмэгдүүлнэ
  if (diceNumber !== 1) {
    // 1 ээс ялгаатай  тоо буулаа Буусан тоог тоглогчийн оноо дээр нэмж өгнө
    roundScore = roundScore + diceNumber;
    document.getElementById("current-" + activePlayer).textContent = roundScore;
  } else {
    // 1 буусан тул тоглогчийн ээлжийг энэ хэсэгт сольж өгнө
    // хэрэв 1 буусан тохиолдолд энэ тоглогчийн оноог 0 болгонло
    switchToNextPlayer();
  }
});

// hold товчны eventlistener
document.querySelector(".btn-hold").addEventListener("click", function () {
  //уг тоглогчийн цуглуулсан ээлжийн оноог нь глобаль оноон дээр нь нэмж өгнө.
  scores[activePlayer] = scores[activePlayer] + roundScore;
  // дэлгэц дээр оноог нь харуулна
  document.getElementById("score-" + activePlayer).textContent =
    scores[activePlayer];
  //аль  тоглогч хожсоныг илэрхийлэх
  if (scores[activePlayer] >= 100) {
    document.getElementById("name-" + activePlayer).textContent = "WINNER !!!";
    document
      .querySelector(".player-" + activePlayer + "-panel")
      .classList.add("winner");
    document
      // winner гэсэн бичгийн арын active харуулсан улаан бичгийг арилгасан
      .querySelector(".player-" + activePlayer + "-panel")
      .classList.remove("active");
  } else {
    // ээлжийн оноог нь 0 болгоно
    // тоглогчийн ээлжийг сольно
    switchToNextPlayer();
  }

  // дээрхи switchToNextPlayer() функцийг доор бичсэн байгаа
});

//  тоглогчдын ээлжийг шилжүүлнэ
function switchToNextPlayer() {
  // ээлжиндээ цуглуулсан оноог 0 болгоно
  roundScore = 0;
  document.getElementById("current-" + activePlayer).textContent = 0;

  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);

  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");

  diceDom.style.display = "none";
}

// одоо new game товч дээр eventlistener ээрээ оруулья
document.querySelector(".btn-new").addEventListener("click", function () {
  alert("шинээр тоглоом эхлүүлэх гэж байна");
});
