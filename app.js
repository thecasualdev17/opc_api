import cryptoRandomString from 'crypto-random-string';
import express from 'express';
import cors from 'cors';
var app = express();
var corsOptions = {
    origin: 'http://localhost:3001',
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions));

app.get('/', function (req, res) {
    res.json({
        introduction: 'Hello, Omnilytics Programming Challenge API!',
        author: 'Ronald Erosa'
    });
});


app.get('/generate', function (req, res) {
    res.json(generate2MBString());
});


app.listen(3000, function () {
  console.log('App  is listening on port 3000!');
});


function generate2MBString(){

    var alphabeticalStringsCount = 0;
    var realNumbersCount = 0;
    var integersCount = 0;
    var alphanumericsCount = 0;

    var output = "";

    while(Buffer.from(output).length < 2097152){
        //console.log(Buffer.from(output).length);
        var mod = Math.random();
        var generatedObject = "";
        if(mod > 0.75){
            generatedObject = generateAlphebeticalStrings();
            alphabeticalStringsCount++;
        }else if (mod > 0.5){
            generatedObject = generateNumbersWithDecimal();
            realNumbersCount++;
        }else if (mod > 0.25){
            generatedObject = generateIntegers();
            integersCount++;
            realNumbersCount++;
        }else{
            generatedObject = generateAlphanumerics();
            alphanumericsCount++;
        }
        if(output.length == 0){
            output += generatedObject;
        }else{
            output += ("," +generatedObject);
        }
    }
    
    return {
        generatedString: output,
        alphabeticalStringsCount: alphabeticalStringsCount,
        realNumbersCount: realNumbersCount,
        integersCount: integersCount,
        alphanumericsCount: alphanumericsCount,
    };
}

function generateAlphebeticalStrings(){
    var alphabeticalString = generateAlphanumerics();
    alphabeticalString = alphabeticalString.replace(/[0-9]/g, '');
    if(alphabeticalString.length == 0){
        alphabeticalString = generateAlphebeticalStrings();
    }
    return alphabeticalString;
}

function generateNumbersWithDecimal(){
    var num = generateIntegers();
    num = (Math.random()  * num).toFixed(Math.random() * (4 - 1) + 1);

    return parseFloat(num);
}

function generateIntegers(){
    var num = parseInt(cryptoRandomString({length: getRandomLength(1,20), type: 'numeric'}));
    if(Math.random() > 0.5){
        num *= -1;
    }
    return num;
}

function generateAlphanumerics(){
    return cryptoRandomString({length: getRandomLength(1,5000), type: 'alphanumeric'});
}

function getRandomLength(min, max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
