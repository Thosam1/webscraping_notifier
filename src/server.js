const axios = require("axios")
const cheerio = require("cheerio")
const pretty = require("pretty");
require("dotenv").config();

const bot = require('./telegram_bot');
const sendMessage = require('./telegram_bot');

const express = require("express")
const app = express()
const port = 3000


// URL
const url = "https://tanzquotient.org/en/courses/"

let bachata4PreviousValue = "";
let ballroom1PreviousValue = "";
let ballroom2PreviousValue = "";
let salsa4PreviousValue = "";
let salsaRuedaSwitchPreviousValue = "";

console.log("Hello world")


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
    getInitData();
    setInterval(scrape, 1000);
})


function getInitData() {
    // Get the HTML from the URL
    axios.get(url).then((response) => {
        // Load the HTML into cheerio
        const $ = cheerio.load(response.data);

        // copy -> copy selector on chrome dev tools
        const bachata4 = $("body > div:nth-child(4) > div:nth-child(17) > div:nth-child(1) > div.collapse.show.collapse-100055-1 > table > tbody > tr:nth-child(1) > td:nth-child(4)");
        const ballroom1 = $("body > div:nth-child(4) > div:nth-child(17) > div:nth-child(1) > div.collapse.show.collapse-100055-1 > table > tbody > tr:nth-child(3) > td:nth-child(4)");
        const ballroom2 = $("body > div:nth-child(4) > div:nth-child(17) > div:nth-child(1) > div.collapse.show.collapse-100055-1 > table > tbody > tr:nth-child(4) > td:nth-child(4)");
        const salsa4 = $("body > div:nth-child(4) > div:nth-child(17) > div:nth-child(3) > div.collapse.show.collapse-100055-3 > table > tbody > tr:nth-child(5) > td:nth-child(4)");
        const salsaRuedaSwitch = $("body > div:nth-child(4) > div:nth-child(17) > div:nth-child(2) > div.collapse.show.collapse-100055-2 > table > tbody > tr:nth-child(12) > td:nth-child(4)");

        // update
        bachata4PreviousValue = bachata4.text()
        ballroom1PreviousValue = ballroom1.text()
        ballroom2PreviousValue = ballroom2.text()
        salsa4PreviousValue = salsa4.text()
        salsaRuedaSwitchPreviousValue = salsaRuedaSwitch.text()

        console.log("The data has been initialized and the interval is set to every " + 120000/1000 + " seconds")
        sendMessage("The data has been initialized and the interval is set to every " + 120000/1000 + " seconds");
    });
}

function scrape() {
    // Get the HTML from the URL
    axios.get(url).then((response) => {
        // Load the HTML into cheerio
        const $ = cheerio.load(response.data);

        // copy -> copy selector on chrome dev tools
        const bachata4 = $("body > div:nth-child(4) > div:nth-child(17) > div:nth-child(1) > div.collapse.show.collapse-100055-1 > table > tbody > tr:nth-child(1) > td:nth-child(4)");
        const ballroom1 = $("body > div:nth-child(4) > div:nth-child(17) > div:nth-child(1) > div.collapse.show.collapse-100055-1 > table > tbody > tr:nth-child(3) > td:nth-child(4)");
        const ballroom2 = $("body > div:nth-child(4) > div:nth-child(17) > div:nth-child(1) > div.collapse.show.collapse-100055-1 > table > tbody > tr:nth-child(4) > td:nth-child(4)");
        const salsa4 = $("body > div:nth-child(4) > div:nth-child(17) > div:nth-child(3) > div.collapse.show.collapse-100055-3 > table > tbody > tr:nth-child(5) > td:nth-child(4)");
        const salsaRuedaSwitch = $("body > div:nth-child(4) > div:nth-child(17) > div:nth-child(2) > div.collapse.show.collapse-100055-2 > table > tbody > tr:nth-child(12) > td:nth-child(4)")

        if(bachata4.text() != bachata4PreviousValue) {
            bachata4PreviousValue = bachata4.text()
            // console.log("Something has changed !!!!")
            sendMessage("Bachata 4 course has changed !", 2);
        }
        if(ballroom1.text() != ballroom1PreviousValue) {
            ballroom1PreviousValue = ballroom1.text()
            sendMessage("Ballroom 1 course has changed !", 2);
        }
        if(ballroom2.text() != ballroom2PreviousValue) {
            ballroom2PreviousValue = ballroom2.text()
            sendMessage("Ballroom 2 course has changed !", 2);
        }
        if(salsa4.text() != salsa4PreviousValue) {
            salsa4PreviousValue = salsa4.text()
            sendMessage("Salsa 4 course has changed !", 2);
        }
        if(salsaRuedaSwitch.text() != salsaRuedaSwitchPreviousValue) {
            salsaRuedaSwitchPreviousValue = salsaRuedaSwitch.text()
            sendMessage("Salsa Rueda course has changed !", 2);
        }

        console.log("Currently Scrapping")
        sendMessage("Currently Scrapping", 2);
    });
}
