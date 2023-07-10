
let birinciDurum = document.getElementById('birinci_durum');
let ikinciDurum = document.getElementById('ikinci_durum');


function durumDegistir(blinkTypeId) {
    if (blinkTypeId == 1) {
        // birinciDurum.style.display = "flex";
        // ikinciDurum.style.display = "none";
        ClickNext()
    }
    else if (blinkTypeId == 2) {

    }
    else if (blinkTypeId == 3) {
        ClickElement()
        // ClickPrev()
    }
}

let sayac = 0
let Idlist = []
function getDataAPI() {
    fetch('http://127.0.0.1:40000/getAllData')
    .then(response => {
        if (!response.ok) {
        throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        // İşlemlerinizi burada yapabilirsiniz, gelen veri 'data' değişkeninde bulunur
        const firstResult = data.Result[0];
        const dataId = firstResult.Id;
        const blinkTypeId = firstResult.BlinkTypeId;
        Idlist.push(dataId)
        // console.log("Silinmeden Önceki Liste: ", Idlist)
        

        if (Idlist.length == 2) {
            if (Idlist[0] == Idlist[1]) {
                Idlist.shift()
                sayac++;
                // console.log("If koşulu olduktan sonraki Liste",Idlist, " sayac: ",sayac)
            } else {
                durumDegistir(blinkTypeId)
                Idlist.shift()
                sayac++;
                // console.log("Else koşulu olduktan sonraki Liste", Idlist, " sayac: ",sayac)
            }
        }
    })
    .catch(error => {
        console.error('Hata:', error);
    });
}

// Çalıştırırken burayı yorum satırından çıkarın
let BlinkTypeId = setInterval(getDataAPI, 500);
