var slider = document.querySelector('.slider');
var slides = slider.querySelectorAll('.slide');
var currentIndex = 0;

var prevButton = document.getElementById('prevButton');
var nextButton = document.getElementById('nextButton');

function blinkLed(ledNumber) {
    fetch('http://localhost:3000/api/blink', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ value: ledNumber })
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      console.error(error);
    });
  }
  
  function TvStatus(ledNumber) {
    fetch('http://localhost:3000/api/blink', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ value: ledNumber})
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      console.error(error);
    });
  }
  

  
function ClickElement() {
    // console.log("buraya girdi ", currentIndex)
    // if(currentIndex == 0) {
    //     tvButton('tvOff','tvOn','prevButton','nextButton')
    // }
    // else if(currentIndex == 1) {
    //     lightButton('lightOff','lightOffImg')
    //     lightButton('lightOff','lightOffImg')
    // }
    // else if(currentIndex == 2) {
    //     bookOnButton('bookOff','prevButton','nextButton','wrapper1','left1')
    // }
    // else if(currentIndex == 3) {
    //     musicOnButton('musicOff','prevButton','nextButton','wrapper2','left2')
    // }
    // else if(currentIndex == 4) {
    //     voiceCommandOnButton('voiceCommandOff','prevButton','nextButton','wrapper3')
    // }
}

function ClickPrev() {
    // Sol butona tıklandığında bir önceki slayda geç
    
    slides[currentIndex].style.display = 'none';
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    slides[currentIndex].style.display = 'block';
}
function ClickNext() {
    // Sol butona tıklandığında bir önceki slayda geç
    slides[currentIndex].style.display = 'none';
    currentIndex = (currentIndex + 1) % slides.length;
    slides[currentIndex].style.display = 'block';
    console.log( slides[currentIndex])
}


// Sağ butona tıklandığında bir sonraki slayda geç
// nextButton.addEventListener('click', function () {
//     slides[currentIndex].style.display = 'none';
//     currentIndex = (currentIndex + 1) % slides.length;
//     slides[currentIndex].style.display = 'block';
// });


function lightButton(divID, imgID) {
    var div = document.getElementById(divID)
    var image = document.getElementById(imgID)
    if (image.style.backgroundColor === "rgb(239, 78, 85)") {
        image.style.backgroundColor = "rgb(71, 218, 112)";
        div.style.backgroundColor = "rgb(71, 218, 112)";
        // arduino ısık acma komutu eklenmeli ***
    } else {
        image.style.backgroundColor = "rgb(239, 78, 85)";
        div.style.backgroundColor = "rgb(239, 78, 85)";
        // arduino ısık kapama komutu eklenmeli ***
    }
}

function tvButton(divID, tvOnID, prevButton, nextButton) {
    var nextButton = document.getElementById(nextButton)
    var prevButton = document.getElementById(prevButton)
    var tvOn = document.getElementById(tvOnID)
    var div = document.getElementById(divID)
    tvOn.style.display = "none";
    div.style.display = "none";
    nextButton.style.display = "none";
    prevButton.style.display = "none";
    TvStatus(2,1)
    // arduino ekran acma komutu eklenmeli ***
}

function remoteControlOnButton(divID, prevButton, nextButton) {
    var nextButton = document.getElementById(nextButton)
    var prevButton = document.getElementById(prevButton)
    var div = document.getElementById(divID)
    div.style.display = "none";
    nextButton.style.display = "none";
    prevButton.style.display = "none";
}

var tvButtons = document.querySelectorAll('.remoteControlButtons .remoteControlButton');
var tvPrevButton = document.getElementById('tvPrevButton');
var tvNextButton = document.getElementById('tvNextButton');
var tvOff = document.getElementById('tvOff');
var tvOn = document.getElementById('tvOn');
var prevButton = document.getElementById('prevButton');
var nextButton = document.getElementById('nextButton');
var tvCurrentIndex = 0;

function updateImage() {
    for (var i = 0; i < tvButtons.length; i++) {
        tvButtons[i].classList.remove('active');
        tvButtons[i].style.backgroundColor = 'rgb(71, 218, 112)';
    }

    tvButtons[tvCurrentIndex].classList.add('active');
    tvButtons[tvCurrentIndex].style.backgroundColor = '#c6c4c4';
}
// fonk içinde sürekli kontrol edilebilir

tvButtons.forEach(function (tvButton, tvIndex) {
    tvButton.addEventListener('click', function () {
        if (tvIndex === 5) {
            tvOff.style.display = 'block';
            prevButton.style.display = 'block';
            nextButton.style.display = 'block';
            TvStatus(2,0)
            // arduino ekran kapama komutu eklenmeli ***

        } else if (tvIndex === 4) {
            tvOn.style.display = 'block';
            prevButton.style.display = 'block'
            nextButton.style.display = 'block';
            // kumandadan cıkıldı

        } else if (tvIndex === 3) {
            console.log("Bir sonraki kanala gecildi.")
            blinkLed(6)
            // arduino kanal + ***

        } else if (tvIndex === 2) {
            console.log("Bir önceki kanala gecildi.")
            // arduino kanal - ***
            blinkLed(5)

        } else if (tvIndex === 1) {
            console.log("Ses ayari düşürülüyor...")
            // arduino ses - ***
            blinkLed(4)

        } else if (tvIndex === 0) {
            console.log("Ses ayari yükseltiliyor...")
            // arduino ses + ***
            blinkLed(3)

        } else {
            tvCurrentIndex = tvIndex;
            updateImage();
        }
    });
});

function tvPrevButtonFunc() {
    tvCurrentIndex--;

    if (tvCurrentIndex < 0) {
        tvCurrentIndex = tvButtons.length - 1;
    }

    updateImage();
}

function tvNextButtonFunc() {
    tvCurrentIndex++;

    if (tvCurrentIndex >= tvButtons.length) {
        tvCurrentIndex = 0;
    }

    updateImage();
}

function bookOffButton(bookSlider, books, prevButton, nextButton) {
    var bookSlider = document.getElementById(bookSlider)
    var books = document.getElementById(books)
    var nextButton = document.getElementById(nextButton)
    var prevButton = document.getElementById(prevButton)
    // var img = document.getElementById(bookOffImg)
    bookSlider.style.display = "none";
    books.style.display = "block";
    nextButton.style.display = "block";
    prevButton.style.display = "block";
    books.style.display = "flex";
    // img.style.alignItems="center";
}

function bookOnButton(divID, prevButton, nextButton, bookSlider, left) {
    var left = document.getElementById(left)
    var div = document.getElementById(divID)
    var nextButton = document.getElementById(nextButton)
    var prevButton = document.getElementById(prevButton)
    var bookSlider = document.getElementById(bookSlider)
    div.style.display = "none";
    nextButton.style.display = "none";
    prevButton.style.display = "none";
    bookSlider.style.display = "block";

    bookInnerSlider(bookSlider);
}

function musicOffButton(musicSlider, musics, prevButton, nextButton) {
    var musicSlider = document.getElementById(musicSlider)
    var musics = document.getElementById(musics)
    var nextButton = document.getElementById(nextButton)
    var prevButton = document.getElementById(prevButton)
    musicSlider.style.display = "none";
    musics.style.display = "block";
    nextButton.style.display = "block";
    prevButton.style.display = "block";
    musics.style.display = "flex";

}

function musicOnButton(divID, prevButton, nextButton, musicSlider,left) {
    var left = document.getElementById(left)
    var div = document.getElementById(divID)
    var nextButton = document.getElementById(nextButton)
    var prevButton = document.getElementById(prevButton)
    var musicSlider = document.getElementById(musicSlider)
    div.style.display = "none";
    nextButton.style.display = "none";
    prevButton.style.display = "none";
    musicSlider.style.display = "block";

    // window.location.href = "music.html"

    musicInnerSlider(musicSlider);
}

function playAudio(card, divbg, divImgbg, myAudio) {
    // ses ekleme düzenlenecek su an static
    var card = document.getElementById(card);
    var divbg = document.getElementById(divbg);
    var divImgbg = document.getElementById(divImgbg);
    var myAudio = document.getElementById(myAudio);
    var isPlaying;
    var classNames = card.className.split(' ');

    if (!(classNames.includes('play'))){

        if(classNames.includes('active')){
            myAudio.play();
            card.classList.add("play");
            card.style.backgroundColor = 'rgb(71, 218, 112)';
            divbg.style.backgroundColor = 'rgb(71, 218, 112)';
            divImgbg.style.backgroundColor = 'rgb(71, 218, 112)';
        }
        
    }
    else if(classNames.includes('play')){
        // console.log("aktif değildi ama çalıyordu

        if(classNames.includes('active')){
            myAudio.pause();
            card.classList.remove("play"); 
            card.style.backgroundColor = "#c6c4c4";
    
        }else if(!(classNames.includes('active'))){
            myAudio.pause();
            card.classList.remove("play"); 
            card.style.backgroundColor = "rgb(239, 78, 85)";
        }

        divbg.style.backgroundColor = "rgb(239, 78, 85)";
        divImgbg.style.backgroundColor = "rgb(239, 78, 85)";
        
    }

}

function voiceCommandOffButton(voiceSlider, voices, prevButton, nextButton) {
    var voiceSlider = document.getElementById(voiceSlider)
    var voices = document.getElementById(voices)
    var nextButton = document.getElementById(nextButton)
    var prevButton = document.getElementById(prevButton)
    voiceSlider.style.display = "none";
    voices.style.display = "block";
    nextButton.style.display = "block";
    prevButton.style.display = "block";
    voices.style.display = "flex";

}

function voiceCommandOnButton(divID, prevButton, nextButton, voiceSlider) {
    var div = document.getElementById(divID)
    var nextButton = document.getElementById(nextButton)
    var prevButton = document.getElementById(prevButton)
    var voiceSlider = document.getElementById(voiceSlider)
    div.style.display = "none";
    nextButton.style.display = "none";
    prevButton.style.display = "none";
    voiceSlider.style.display = "block";
    // window.location.href = "voice.html"
    voiceInnerSlider(voiceSlider);
}

function speakText(voice) {
    var voice = document.getElementById(voice).innerText;

    var utterance = new SpeechSynthesisUtterance(voice);
    window.speechSynthesis.speak(utterance);
}

function musicInnerSlider(wrapper) {
    var left = document.getElementById("left2");
    var right = document.getElementById("right2");
    var wrapper = document.getElementById(wrapper)
    const musiccarousel = document.querySelector(".musiccarousel");
    const firstCardWidth = musiccarousel.querySelector(".card").offsetWidth;
    const elements = document.querySelectorAll("li.musiccard");
    const arrowBtns = document.querySelectorAll(".musicright");
    const prevBtns = document.querySelectorAll(".musicleft");
    const musiccarouselChildrens = [...musiccarousel.children];
    var index=0
    elements[index+1].classList.add("active");

    // Get the number of cards that can fit in the musiccarousel at once
    let cardPerView = Math.round(musiccarousel.offsetWidth / firstCardWidth);

    // Insert copies of the last few cards to beginning of musiccarousel for infinite scrolling
    musiccarouselChildrens.slice(-cardPerView).reverse().forEach(card => {
        musiccarousel.insertAdjacentHTML("afterbegin", card.outerHTML);
    });

    // Insert copies of the first few cards to end of musiccarousel for infinite scrolling
    musiccarouselChildrens.slice(0, cardPerView).forEach(card => {
        musiccarousel.insertAdjacentHTML("beforeend", card.outerHTML);
    });

    // Scroll the musiccarousel at appropriate postition to hide first few duplicate cards on Firefox
    musiccarousel.classList.add("no-transition");
    musiccarousel.scrollLeft = musiccarousel.offsetWidth;
    musiccarousel.classList.remove("no-transition");

    // Add event listeners for the arrow buttons to scroll the musiccarousel left and right
    arrowBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            musiccarousel.scrollLeft += btn.id == right ? -firstCardWidth : firstCardWidth;
            if(index == 0){
                elements[index+1].classList.remove("active");
            }
            index++
            console.log(index)
            arrowbtn(index,elements);
        });
    });
    
    prevBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            musiccarousel.scrollLeft -= btn.id == left ? -firstCardWidth : firstCardWidth;
            index--
            console.log(index)
            prevbtn(index,elements);
        });
    });


    const infiniteScroll = () => {
        // If the musiccarousel is at the beginning, scroll to the end
        if (musiccarousel.scrollLeft === 0) {
            musiccarousel.classList.add("no-transition");
            musiccarousel.scrollLeft = musiccarousel.scrollWidth - (2 * musiccarousel.offsetWidth);
            musiccarousel.classList.remove("no-transition");
        }
        // If the musiccarousel is at the end, scroll to the beginning
        else if (Math.ceil(musiccarousel.scrollLeft) === musiccarousel.scrollWidth - musiccarousel.offsetWidth) {
            musiccarousel.classList.add("no-transition");
            musiccarousel.scrollLeft = musiccarousel.offsetWidth;
            musiccarousel.classList.remove("no-transition");
        }
    }

    musiccarousel.addEventListener("scroll", infiniteScroll);
}

function bookInnerSlider(wrapper) {
    var left = document.getElementById("left1");
    var right = document.getElementById("right1");
    var wrapper = document.getElementById(wrapper)
    const bookcarousel = document.querySelector(".bookcarousel");
    const firstCardWidth = bookcarousel.querySelector(".card").offsetWidth;
    const elements = document.querySelectorAll("li.bookcard");
    const arrowBtns = document.querySelectorAll(".bookright");
    const prevBtns = document.querySelectorAll(".bookleft");
    const carouselChildrens = [...bookcarousel.children];
    var index=0

    // Get the number of cards that can fit in the bookcarousel at once
    let cardPerView = Math.round(bookcarousel.offsetWidth / firstCardWidth);

    // Insert copies of the last few cards to beginning of bookcarousel for infinite scrolling
    carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
        bookcarousel.insertAdjacentHTML("afterbegin", card.outerHTML);
    });

    // Insert copies of the first few cards to end of bookcarousel for infinite scrolling
    carouselChildrens.slice(0, cardPerView).forEach(card => {
        bookcarousel.insertAdjacentHTML("beforeend", card.outerHTML);
    });

    // Scroll the bookcarousel at appropriate postition to hide first few duplicate cards on Firefox
    bookcarousel.classList.add("no-transition");
    bookcarousel.scrollLeft = bookcarousel.offsetWidth;
    bookcarousel.classList.remove("no-transition");

    // Add event listeners for the arrow buttons to scroll the bookcarousel left and right
    arrowBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            bookcarousel.scrollLeft += btn.id == right ? -firstCardWidth : firstCardWidth;
            index++
            arrowbtn(index,elements);
        });
    });

    prevBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            bookcarousel.scrollLeft -= btn.id == left ? -firstCardWidth : firstCardWidth;
            index--
            prevbtn(index,elements);
        });
    });

    const infiniteScroll = () => {
        // If the bookcarousel is at the beginning, scroll to the end
        if (bookcarousel.scrollLeft === 0) {
            bookcarousel.classList.add("no-transition");
            bookcarousel.scrollLeft = bookcarousel.scrollWidth - (2 * bookcarousel.offsetWidth);
            bookcarousel.classList.remove("no-transition");
        }
        // If the bookcarousel is at the end, scroll to the beginning
        else if (Math.ceil(bookcarousel.scrollLeft) === bookcarousel.scrollWidth - bookcarousel.offsetWidth) {
            bookcarousel.classList.add("no-transition");
            bookcarousel.scrollLeft = bookcarousel.offsetWidth;
            bookcarousel.classList.remove("no-transition");
        }
    
    }

    bookcarousel.addEventListener("scroll", infiniteScroll);
}

function arrowbtn(index,elements){

    if(index==6){
        elements[index].classList.remove("active");
        var classNames = elements[index].className.split(' ');
        if(classNames.includes('play')){
            elements[index].style.backgroundColor = 'rgb(71, 218, 112)';
    
        }else{
            elements[index].style.backgroundColor = "rgb(239, 78, 85)";
        }
        index = -1
        elements[index+1].classList.add("active");
        var classNames2 = elements[index+1].className.split(' ');

        if(classNames2.includes('play')){
            elements[index+1].style.backgroundColor = 'rgb(71, 218, 112)';
    
        }else{
            elements[index+1].style.backgroundColor = "#c6c4c4";
        }
    
    }
    else{
        elements[index].classList.remove("active");

        var classNames = elements[index].className.split(' ');
        if(classNames.includes('play')){
            elements[index].style.backgroundColor = 'rgb(71, 218, 112)';
    
        }else{
            elements[index].style.backgroundColor = "rgb(239, 78, 85)";
        }
        elements[index+1].classList.add("active");
        var classNames2 = elements[index+1].className.split(' ');
        if(classNames2.includes('play')){
            elements[index+1].style.backgroundColor = 'rgb(71, 218, 112)';
    
        }else{
            elements[index+1].style.backgroundColor = "#c6c4c4";
        }
    }
}

function prevbtn(index,elements){
    if((index+1) == 0){
        elements[index+2].classList.remove("active");
        var classNames = elements[index+2].className.split(' ');
        if(classNames.includes('play')){
            elements[index+2].style.backgroundColor = 'rgb(71, 218, 112)';
    
        }else{
            elements[index+2].style.backgroundColor = "rgb(239, 78, 85)";
        }

        elements[index+1].classList.add("active");
        var classNames2 = elements[index+1].className.split(' ');

        if(classNames2.includes('play')){
            elements[index+1].style.backgroundColor = 'rgb(71, 218, 112)';
    
        }else{
            elements[index+1].style.backgroundColor = "#c6c4c4";
        }

    }
    else if((index+2) == 0){
        elements[index+2].classList.remove("active");

        var classNames = elements[index+2].className.split(' ');
        if(classNames.includes('play')){
            elements[index+2].style.backgroundColor = 'rgb(71, 218, 112)';
    
        }else{
            elements[index+2].style.backgroundColor = "rgb(239, 78, 85)";
        }

        index=5
        elements[index+1].classList.add("active");
        var classNames2 = elements[index+1].className.split(' ');

        if(classNames2.includes('play')){
            elements[index+1].style.backgroundColor = 'rgb(71, 218, 112)';
    
        }else{
            elements[index+1].style.backgroundColor = "#c6c4c4";
        }

    }
    else{
        elements[index+2].classList.remove("active");
        var classNames = elements[index+2].className.split(' ');
        if(classNames.includes('play')){
            elements[index+2].style.backgroundColor = 'rgb(71, 218, 112)';
    
        }else{
            elements[index+2].style.backgroundColor = "rgb(239, 78, 85)";
        }

        elements[index+1].classList.add("active");
        var classNames2 = elements[index+1].className.split(' ');

        if(classNames2.includes('play')){
            elements[index+1].style.backgroundColor = 'rgb(71, 218, 112)';
    
        }else{
            elements[index+1].style.backgroundColor = "#c6c4c4";
        }
    }
}

function voiceInnerSlider(wrapper) {
    var left = document.getElementById("left3");
    var right = document.getElementById("right3");
    var wrapper = document.getElementById(wrapper)
    const voicecarousel = document.querySelector(".voicecarousel");
    const firstCardWidth = voicecarousel.querySelector(".voicecard").offsetWidth;
    const elements = document.querySelectorAll("li.voicecard");
    const arrowBtns = document.querySelectorAll(".voiceright");
    const prevBtns = document.querySelectorAll(".voiceleft");
    const voicecarouselChildrens = [...voicecarousel.children];
    var index=0

    // Get the number of cards that can fit in the voicecarousel at once
    let cardPerView = Math.round(voicecarousel.offsetWidth / firstCardWidth);
    

    // Insert copies of the last few cards to beginning of voicecarousel for infinite scrolling
    voicecarouselChildrens.slice(-cardPerView).reverse().forEach(card => {
        voicecarousel.insertAdjacentHTML("afterbegin", card.outerHTML);
    });

    // Insert copies of the first few cards to end of voicecarousel for infinite scrolling
    voicecarouselChildrens.slice(0, cardPerView).forEach(card => {
        voicecarousel.insertAdjacentHTML("beforeend", card.outerHTML);
    });

    // Scroll the voicecarousel at appropriate postition to hide first few duplicate cards on Firefox
    voicecarousel.classList.add("no-transition");
    voicecarousel.scrollLeft = voicecarousel.offsetWidth;
    voicecarousel.classList.remove("no-transition");
    

    // Add event listeners for the arrow buttons to scroll the voicecarousel left and right
    arrowBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            voicecarousel.scrollLeft += btn.id == right ? -firstCardWidth : firstCardWidth;
            index++
            if(index==6){
                console.log(index);
                elements[index].classList.remove("active");
                index = -1
                console.log(index+1);
                elements[index+1].classList.add("active");
            }
            else{
                elements[index].classList.remove("active");
                elements[index+1].classList.add("active");
                console.log(index);
                console.log(index+1);
            }
        });
    });

    prevBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            voicecarousel.scrollLeft -= btn.id == left ? -firstCardWidth : firstCardWidth;
            index--
            if((index+1) == 0){
                elements[index+2].classList.remove("active");
                elements[index+1].classList.add("active");
                console.log(index+2);
                console.log(index+1);
                
            }
            else if((index+2) == 0){
                elements[index+2].classList.remove("active");
                console.log(index+2);
                index=5
                elements[index+1].classList.add("active");
                
                console.log(index+1);
            }
            else{
                elements[index+2].classList.remove("active");
                elements[index+1].classList.add("active");
                console.log(index+2);
                console.log(index+1);
            }
            
        });
    });

    const infiniteScroll = () => {
        // If the voicecarousel is at the beginning, scroll to the end
        if (voicecarousel.scrollLeft === 0) {
            voicecarousel.classList.add("no-transition");
            voicecarousel.scrollLeft = voicecarousel.scrollWidth - (2 * voicecarousel.offsetWidth);
            voicecarousel.classList.remove("no-transition");
        }
        // If the voicecarousel is at the end, scroll to the beginning
        else if (Math.ceil(voicecarousel.scrollLeft) === voicecarousel.scrollWidth - voicecarousel.offsetWidth) {
            voicecarousel.classList.add("no-transition");
            voicecarousel.scrollLeft = voicecarousel.offsetWidth;
            voicecarousel.classList.remove("no-transition");
        }
    }
    voicecarousel.addEventListener("scroll", infiniteScroll);
}

function keyboardOn(wrapper,keyboard){
    wrapper = document.getElementById(wrapper);
    keyboard = document.getElementById(keyboard);
    wrapper.style.display = "none";
    keyboard.style.display = "block";
}

function keyboardOff(wrapper,keyboard){
    wrapper = document.getElementById(wrapper);
    keyboard = document.getElementById(keyboard);
    keyboard.style.display = "none";
    wrapper.style.display = "block";
}

function FavOn(wrapper,favSection){
    wrapper = document.getElementById(wrapper);
    favSection = document.getElementById(favSection);
    wrapper.style.display = "none";
    favSection.style.display = "block";
}


function FavOff(wrapper,favSection){
    wrapper = document.getElementById(wrapper);
    favSection = document.getElementById(favSection);
    wrapper.style.display = "block";
    favSection.style.display = "none";
}

let characters = '';
let favorites = [];
let selectedFavorites = [];
let voiceSlideKeyboard = document.getElementById("voiceSlideKeyboard");
let favoritesSection = document.getElementById("favoritesSection");
let keyboardupdatebtn = document.getElementById('keyboardupdate');
let keyboardfavbtn= document.getElementById('keyboardfavbutton');

function addCharacter(character) {
  if (character === 'BOSLUK') {
    characters += ' ';
  } else if (character === 'SIL') {
    deleteCharacter();
  } else if (character === 'FAV') {
    addToFavorites();
  } else if (character === 'UPDATE'){
    addToFavorites();
    voiceSlideKeyboard.style.display="none";
    keyboardupdatebtn.style.display="none";
    favoritesSection.style.display="block";
    keyboardfavbtn.style.display="block";

  }else if (character === 'SESLENDIR'){
    console.log(characters);
    var utterance = new SpeechSynthesisUtterance(characters);
    window.speechSynthesis.speak(utterance);
  } else if (character === 'RESET'){
    characters = '';
  } else {
    characters += character;
  }
  updateTextbox();
}


function deleteCharacter() {
  characters = characters.slice(0, -1);
  updateTextbox();
}

function updateTextbox() {
  const textbox = document.getElementById('textbox');
  textbox.value = characters;

  

}

function addToFavorites() {
  if (characters.trim() !== '') {
    favorites.push(characters);
    characters = '';
    updateTextbox();
    showFavorites();
  }
}

function showFavorites() {
  const favoritesList = document.getElementById('favoritesList');
// //   var favoritesSection = document.getElementById('favoritesSection');
// //   var voiceSlideKeyboard = document.getElementById('voiceSlideKeyboard');
// //   var keyboardupdate = document.getElementById('keyboardupdate');
// //   var keyboardfavbutton= document.getElementById('keyboardfavbutton');

  favoritesList.innerHTML = '';

  const nofavimg = document.getElementById('nofilefav');
  if (favorites.length > 0) {
    for (let i = 0; i < favorites.length; i++) {
      const listItem = document.createElement('li');
      listItem.classList.add("favList")

      const listText = document.createElement('h2');

      listText.textContent = favorites[i];
      listText.classList.add("favText")
    // //   listItem.textContent = favorites[i];
    // //   listItem.classList.add("favList")

      const editButton = document.createElement('button');
      editButton.classList.add("favEditBtn")

      const editimg = document.getElementById('editfav');
      var clonedImageedit = editimg.cloneNode(true);
      clonedImageedit.style.display="block";

      editButton.addEventListener('click', function() {
        editFavorite(i);
      });

      const deleteButton = document.createElement('button');
      deleteButton.classList.add("favDeleteBtn")

      const deleteimg = document.getElementById('deletefav');
      var clonedImagedelete = deleteimg.cloneNode(true);
      clonedImagedelete.style.display="block";

      

      deleteButton.addEventListener('click', function() {
        deleteFavorite(i);
      });
      nofavimg.style.display="none";
      deleteButton.appendChild(clonedImagedelete);
      editButton.appendChild(clonedImageedit);
      listItem.appendChild(listText);
      listItem.appendChild(editButton);
      listItem.appendChild(deleteButton);
      favoritesList.appendChild(listItem);
    }
  } else {
    const noFavoritesItem = document.createElement('li');

    nofavimg.style.display="block";
    noFavoritesItem.textContent = 'Herhangi bir kayıtlı sesli mesaj bulunmuyor.';
    favoritesList.appendChild(noFavoritesItem);
  }
}

function deleteFavorite(index) {
    if (index !== undefined && index >= 0 && index < favorites.length) {
      favorites.splice(index, 1);
      showFavorites();
    }
}
  
function editFavorite(index) {
    if (index !== undefined && index >= 0 && index < favorites.length) {
      const favorite = favorites[index];
      characters = favorite;
      updateTextbox();
      deleteFavorite(index);
      favoritesSection.style.display="none";
      voiceSlideKeyboard.style.display="block";
      keyboardfavbutton.style.display="none";
      keyboardupdate.style.display="block";
    }
}

function deleteSelectedFavorites() {
    for (let i = selectedFavorites.length - 1; i >= 0; i--) {
      const index = selectedFavorites[i];
      deleteFavorite(index);
    }
    selectedFavorites = [];
}
  
function editSelectedFavorite() {
    if (selectedFavorites.length === 1) {
      const index = selectedFavorites[0];
      editFavorite(index);
      selectedFavorites = [];
    }
}
showFavorites();

var activeRow = document.getElementsByClassName("row").length - 7; // Aktif satırın başlangıç indeksi
var activeKey = document.getElementsByClassName("row")[activeRow].getElementsByClassName("key").length - 7; // Aktif düğmenin başlangıç indeksi

document.getElementsByClassName("row")[0].getElementsByClassName("key")[0].style.backgroundColor = "#aba0a0";
console.log("first:"+activeRow+" "+activeKey);

// Prev düğmesine tıklandığında çalışacak fonksiyon
document.getElementById("keyboardPrevButton").addEventListener("click", function() {
  // Aktif düğme üzerindeki arka plan rengini varsayılan hale getir
  // document.getElementsByClassName("row")[activeRow].getElementsByClassName("key")[0].style.backgroundColor = "";
  document.getElementsByClassName("row")[activeRow].getElementsByClassName("key")[activeKey].style.backgroundColor = "";
  document.getElementsByClassName("row")[activeRow].getElementsByClassName("key")[0].style.backgroundColor = "";
  // Önceki satıra geçiş yap
  console.log("prev1:"+activeRow+" "+activeKey);
  activeRow++;
  console.log("prev2:"+activeRow+" "+activeKey);
  if (activeRow > 6) {
    activeRow = document.getElementsByClassName("row").length - 7;
  }
  console.log("prev3:"+activeRow+" "+activeKey);
  activeKey = 0;
  // Yeni düğmenin arka plan rengini yeşil yap

  console.log("prev4:"+activeRow+" "+activeKey);
  // getElementsByClassName("key").style.backgroundColor = "";
  // document.getElementsByClassName("row")[activeRow].getElementsByClassName("key")[0].style.backgroundColor = "green";
  document.getElementsByClassName("row")[activeRow].getElementsByClassName("key")[0].style.backgroundColor = "#aba0a0";

});


// Next düğmesine tıklandığında çalışacak fonksiyon
document.getElementById("keyboardNextButton").addEventListener("click", function() {
  // Aktif düğme üzerindeki arka plan rengini varsayılan hale getir
  console.log("Next1: "+activeRow+" "+activeKey);
  document.getElementsByClassName("row")[activeRow].getElementsByClassName("key")[activeKey].style.backgroundColor = "";
//   document.getElementsByClassName("row")[activeRow].getElementsByClassName("key")[0].style.backgroundColor = "";

  // Mevcut satırda bir sonraki düğmeye geçiş yap
  activeKey++;

  
  console.log("Next2: "+activeRow+" "+activeKey);
  if (activeKey >= document.getElementsByClassName("row")[activeRow].getElementsByClassName("key").length) {
    activeKey = 0;
    // Bir sonraki satıra geçiş yap
    // activeRow++;
    // if (activeRow >= document.getElementsByClassName("row").length) {
    //   activeRow = 0;
    // }
  }
  console.log("Next3: "+activeRow+" "+activeKey);

  // Yeni düğmenin arka plan rengini yeşil yap
  document.getElementsByClassName("row")[activeRow].getElementsByClassName("key")[activeKey].style.backgroundColor = "#aba0a0";
  console.log("Next4: "+activeRow+" "+activeKey);
});