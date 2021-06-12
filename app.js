import cryptoRandomString from 'crypto-random-string';
import express from 'express';
import cors from 'cors';
var app = express();

var whitelist = ['http://localhost:3001', 'https://opc-ui.netlify.app/']
var corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    changeOrigin: true, 
    optionsSuccessStatus: 200
}
const port = process.env.PORT || 3000;

app.use(cors(corsOptions));

app.get('/', function (req, res) {
    res.json({
        introduction: 'Hello, Omnilytics Programming Challenge API!',
        author: 'Ronald Erosa'
    });
});

app.get('/generate', function (req, res) {
    res.json(generateStringOfSize(2097152));
});

app.listen(port, function () {
    console.log('Server started successfully.');
  });

/** Start: signatures below are experimental for free/low tier servers (usually with low computing power)  */
app.get('/generateMultiPartRandomObject', function (req, res) {
    res.json(generateMultiPartRandomObject());
});
/** End: signatures above are experimental for free/low tier servers (usually with low computing power)  */


//2097152 = 2MB
//500000 = 0.5mb
function generateMultiPartRandomObject(){

    var stats = {
        generatedString: "",
        alphabeticalStringsCount: 0,
        realNumbersCount: 0,
        integersCount: 0,
        alphanumericsCount: 0,
    };

    var output1 = {output: ""};
    var output2 = {output: ""};
    var output3 = {output: ""};
    var output4 = {output: ""};

    generateRandomObjectOfSize(output1, stats);
    generateRandomObjectOfSize(output2, stats);
    generateRandomObjectOfSize(output3, stats);
    generateRandomObjectOfSize(output4, stats);

    stats.generatedString = output1.output + "," + output2.output + "," + output3.output + "," + output4.output;
    return stats;
}

function generateRandomObjectOfSize(obj, stats){
    while(Buffer.from(obj.output).length < 524288){
        //console.log(Buffer.from(output).length);
        var mod = Math.random();
        var generatedObject = "";
        if(mod > 0.75){
            generatedObject = generateAlphebeticalStrings();
            stats.alphabeticalStringsCount++;
        }else if (mod > 0.5){
            generatedObject = generateNumbersWithDecimal();
            stats.realNumbersCount++;
        }else if (mod > 0.25){
            generatedObject = generateIntegers();
            stats.integersCount++;
            stats.realNumbersCount++;
        }else{
            generatedObject = generateAlphanumerics();
            stats.alphanumericsCount++;
        }
        if(obj.output.length == 0){
            obj.output += generatedObject;
        }else{
            obj.output += ("," +generatedObject);
        }
    }   
}

function generateStringOfSize(size){

    var alphabeticalStringsCount = 0;
    var realNumbersCount = 0;
    var integersCount = 0;
    var alphanumericsCount = 0;

    var output = "";

    while(Buffer.from(output).length < size){
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
