// тоглогчийн ээлжийг хадгалах хувьсагч нэгдүгээр тоглогч 0, хоёрдугаар тоглогч 1
var activePlayer = 1;

// тоглогчийн оноог хадгалах хувьсагч
var scores = [0, 0];

//тоглогчийн ээлжиндээ цуглуулж байгааг хадгалах хуввсагч
var roundScore = 0;

// шооны аль талаараа буусныг хадгалах хувьсагч 1-6 гэсэн утгыг санамсаргүйгээр үүсгэж өгнө
// 1-6 хүртэлхи тооноос тохиолдлын тоог гаргаж авья
var dice = Math.floor(Math.random() * 6) + 1;

// <div class="player-score" id="score-0">43</div>
// window dotorhi document iin querySelector oor html dotorhi yamr ng function iig holbono uun dotorhi textContent duudaj tuhain uguh gsen utgaa ugnu doorhi maygaar
// одоо энд random аар гарч ирж байгаа утгаа харгалзуулж болно
// Тоглогч-0
// window.document.querySelector("#score-0").textContent = dice;
// Тоглогч-1
// window нь глобал хувьсагч учир заавал бичих шаардлагагүй
// document.querySelector("#score-1").innerHTML = "<em><b>Yes</b></em>";

// одоо шооны утга харуулсан зургийг style display руу ороод none утга өгөхөд алга болно

// Програм эхлэхэд бэлтгэе
window.document.querySelector("#score-0").textContent = 0;
window.document.querySelector("#score-1").textContent = 0;
document.querySelector(".dice").style.display = "none";
window.document.querySelector("#current-0").textContent = 0;
window.document.querySelector("#current-1").textContent = 0;

/*одоо доорхи дарааллаар явья
1.Roll Dice товчийг DOM оос авна
2. уг товч дээр хулганаах CLICK хийхэд ажиллах эвент листенер функц бичиж холбоно
3.Click хийхэд :
3.1 1-6 хооронд санамсаргүй тоо үүсгэнэ
3.2. DOM оос шооны зургийн обьектийг авна
3.3. уг обьектийг вэб дээр харагддаг болгоно
3.4. уг обьектийн зургийг өөрчилнө */

console.log("Шоо : " + dice);
