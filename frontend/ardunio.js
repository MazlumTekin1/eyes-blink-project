const express = require('express');
const { Board, Led } = require("johnny-five");
const cors = require('cors');
const app = express();
const board = new Board();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

let leds = [];

board.on("ready", () => {
  console.log("Hazır!");

  for (let i = 2; i <= 7; i++) {
    leds.push(new Led(i));
  }
});

app.post('/api/blink', (req, res) => {
  const value = req.body.value;
  if (value != 2) {
    BlinkLed(value)
    .then(() => {
    })
    .catch(error => {
      console.error(error);
      res.status(500).send('Bir hata oluştu!');
    });
  }

});

function BlinkLed(ledPort) {
  return new Promise((resolve, reject) => {
    leds.forEach((led, index) => {
      if (index === ledPort - 2) {
        led.on();
        setTimeout(() => {
          led.off();
          resolve();
        }, 1000);
      } else {
        led.off();
      }
    });
  });
}