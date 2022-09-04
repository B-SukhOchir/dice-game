//тоглоом дууссан эсэхийг хадгалах төлөвийн хувьсагч
var isNewGame;
// тоглоомын бүх гадар ашиглагдах хувьсагчдыг энд зарлая
// аль тоглогч шоо шидэх вэ
var activePlayer;
// хоёр тоглогчийн цуглуулсан оноонууд
var scores;
//  идэвхитэй тоглогчийн цуглуулж байгаа ээлжийн оноо
var roundscore;
// тоглоомыг шинээр эхлэхэд бэлтгэнэ
function initGame() {
  // тоглоом шинээр эхэллээ гэдэгт төлөвт оруулна
  isNewGame = true;
  // тоглогчийн ээлжийг хадгалах хувьсагч, нэгдүгээр тоглогчийг 0, хоёрдугаар тоглогчийг 1 гэж тэмдэглэе
  activePlayer = 0;
  // тоглогчийн цуглуулсан оноог хадгалах хувьсагч
  scores = [0, 0];
  // тоглогчийн ээлжиндээ цуглуулж байгаа оноог хадгалах хувьсагч
  roundScore = 0;
  // шооны аль талаараа буусныг хадгалах хувьсагч хэрэгтэй, 1-6 хүртэлхи тоог санамсаргүйгээр үүсгэж байна
  var diceNumber = Math.floor(Math.random() * 6) + 1;
  // програм эхлэхэл бэлтгэе
  window.document.getElementById("score-0").textContent = 0;
  window.document.getElementById("score-1").textContent = 0;
  window.document.getElementById("current-0").textContent = 0;
  window.document.getElementById("current-1").textContent = 0;
  // тоглоом эхлэхэд шооны зураг алга болно
  window.document.querySelector(".dice").style.display = "none";
  //тоглогчдын нэрийг буцааж гаргах
  document.getElementById("name-0").textContent = "Player-1";
  document.getElementById("name-1").textContent = "Player-2";
  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
  // тоглоом шинээр эхлэхэд нэгдүгээр тоглогч нь active төлөвт оруулах
  document.querySelector(".player-0-panel").classList.add("active");
}
// Тоглоомын эхлэх төлөвт оруулья
initGame();

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
  if (isNewGame === true) {
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
      document.getElementById("current-" + activePlayer).textContent =
        roundScore;
    } else {
      // 1 буусан тул тоглогчийн ээлжийг энэ хэсэгт сольж өгнө
      // хэрэв 1 буусан тохиолдолд энэ тоглогчийн оноог 0 болгонло
      switchToNextPlayer();
    }
  } else {
    alert(
      " Уучлаарай, тоглогч " +
        (activePlayer + 1) +
        " ялсан байна. New game товч дээр дарж тоглоомыг шинээр эхлэнэ үү"
    );
  }
});

// hold товчны eventlistener
document.querySelector(".btn-hold").addEventListener("click", function () {
  if (isNewGame === true) {
    //уг тоглогчийн цуглуулсан ээлжийн оноог нь глобаль оноон дээр нь нэмж өгнө.
    scores[activePlayer] = scores[activePlayer] + roundScore;
    // дэлгэц дээр оноог нь харуулна
    document.getElementById("score-" + activePlayer).textContent =
      scores[activePlayer];
    //аль  тоглогч хожсоныг илэрхийлэх
    if (scores[activePlayer] >= 10) {
      //тоглоомыг дууссан төлөвт оруулна
      isNewGame = false;
      document.getElementById("name-" + activePlayer).textContent =
        "WINNER !!!";
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
  } else {
    alert("Уучлаарай тоглоом дууссан байна");
  }
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
document.querySelector(".btn-new").addEventListener("click", initGame);
