var slider = document.querySelector('.slider');
var slides = slider.querySelectorAll('.slide');
var currentIndex = 0;

var prevButton = document.getElementById('prevButton');
var nextButton = document.getElementById('nextButton');

function ClickPrev() {
    // Sol butona tıklandığında bir önceki slayda geç
    console.log("Buraya Gelindi!")
    slides[currentIndex].style.display = 'none';
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    slides[currentIndex].style.display = 'block';
}



// Sağ butona tıklandığında bir sonraki slayda geç
nextButton.addEventListener('click', function () {
    slides[currentIndex].style.display = 'none';
    currentIndex = (currentIndex + 1) % slides.length;
    slides[currentIndex].style.display = 'block';
});


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
            // arduino ekran kapama komutu eklenmeli ***

        } else if (tvIndex === 4) {
            tvOn.style.display = 'block';
            prevButton.style.display = 'block'
            nextButton.style.display = 'block';
            // kumandadan cıkıldı

        } else if (tvIndex === 3) {
            console.log("Bir sonraki kanala gecildi.")
            // arduino kanal + ***

        } else if (tvIndex === 2) {
            console.log("Bir önceki kanala gecildi.")
            // arduino kanal - ***

        } else if (tvIndex === 1) {
            console.log("Ses ayari düşürülüyor...")
            // arduino ses - ***

        } else if (tvIndex === 0) {
            console.log("Ses ayari yükseltiliyor...")
            // arduino ses + ***

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

    bookInnerSlider(bookSlider, left);
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

    musicInnerSlider(musicSlider,left);
}

// geliştirmeli
function playAudio(card, divbg, divImgbg, myAudio) {
    // ses ekleme düzenlenecek su an static
    var card = document.getElementById(card);
    var divbg = document.getElementById(divbg);
    var divImgbg = document.getElementById(divImgbg);
    var myAudio = document.getElementById(myAudio);
    var isPlaying;

    if (card.style.backgroundColor === "rgb(239, 78, 85)") {
        myAudio.play();
        card.style.backgroundColor = "rgb(71, 218, 112)";
        divbg.style.backgroundColor = 'rgb(71, 218, 112)';
        divImgbg.style.backgroundColor = 'rgb(71, 218, 112)';
    }
    else{
        myAudio.pause();
        card.style.backgroundColor = "rgb(239, 78, 85)";        
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
    voiceInnerSlider();
}

function speakText(voice) {
    var voice = document.getElementById(voice).innerText;

    // var text = document.getElementById('textToSpeak').innerText;
    var utterance = new SpeechSynthesisUtterance(voice);
    window.speechSynthesis.speak(utterance);
}






function musicInnerSlider(wrapper, left) {
    var left = document.getElementById(left)
    var wrapper = document.getElementById(wrapper)
    // const wrapper = document.querySelector(".wrapper");
    const musiccarousel = document.querySelector(".musiccarousel");
    const firstCardWidth = musiccarousel.querySelector(".card").offsetWidth;
    const arrowBtns = document.querySelectorAll(".wrapper i");
    const musiccarouselChildrens = [...musiccarousel.children];

    let isDragging = false,
        isAutoPlay = true,
        startX, startScrollLeft, timeoutId;

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
            musiccarousel.scrollLeft += btn.id == left ? -firstCardWidth : firstCardWidth;
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



function bookInnerSlider(wrapper, left) {
    var left = document.getElementById(left)
    var wrapper = document.getElementById(wrapper)
    // const wrapper = document.querySelector(".wrapper");
    const bookcarousel = document.querySelector(".bookcarousel");
    const firstCardWidth = bookcarousel.querySelector(".card").offsetWidth;
    const arrowBtns = document.querySelectorAll(".wrapper i");
    const carouselChildrens = [...bookcarousel.children];

    let isDragging = false,
        isAutoPlay = true,
        startX, startScrollLeft, timeoutId;

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
            bookcarousel.scrollLeft += btn.id == left ? -firstCardWidth : firstCardWidth;
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





function voiceInnerSlider(wrapper, left) {
    var left = document.getElementById(left)
    var wrapper = document.getElementById(wrapper)
    // const wrapper = document.querySelector(".wrapper");
    const voicecarousel = document.querySelector(".voicecarousel");
    const firstCardWidth = voicecarousel.querySelector(".card").offsetWidth;
    const arrowBtns = document.querySelectorAll(".wrapper i");
    const voicecarouselChildrens = [...voicecarousel.children];

    let isDragging = false,
        isAutoPlay = true,
        startX, startScrollLeft, timeoutId;

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
            voicecarousel.scrollLeft += btn.id == left ? -firstCardWidth : firstCardWidth;
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