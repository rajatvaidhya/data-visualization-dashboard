const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const _ = require('lodash');
const {CanvasRenderService} = require('chartjs-node-canvas');
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.set("strictQuery", true);
mongoose.connect('mongodb://127.0.0.1:27017/data-visuals', {useNewUrlParser: true});

app.set('view engine', 'ejs');

const dataSchema = new mongoose.Schema({
    end_year: String,
    intensity: Number,
    sector: String,
    topic: String,
    insight: String,
    url: String,
    region: String,
    start_year: Number,
    impact: Number,
    added: Date,
    published: Date,
    country: String,
    relevance: Number,
    pestle: String,
    source: String,
    title: String,
    likelihood: Number
})

const Data = new mongoose.model("Data", dataSchema);

let startYear = [];
let endYear = [];
let topics = [];
let sectors = [];
let regions = [];
let pestles = [];
let sources = [];
let countries = [];

let endValue = 2200;
let countryValue = "India";
let topicValue = "Rtop";
let sectorValue = "Rsec";
let pestleValue = "Rpes";
let regionValue = "Rreg";
let sourceValue = "Rsou";

let eyArray = [];
let countryArray = [];
let topicArray = [];
let sectorArray = [];
let pestleArray = [];
let regionArray = [];
let sourceArray = [];

let intensityArray = [];
let likelihoodArray = [];
let relevanceArray = [];
let couArray = [];
let topArray = [];
let regArray = [];

app.get("/", function(req,res){

    Data.find({},{"end_year":1}, function(err, found){

        for(var i=0; i<found.length; i++)
        {
            if(found[i].end_year === "")
            {
                continue;
            }
            if(endYear.indexOf(found[i].end_year) === -1) {  
                endYear.push(found[i].end_year);  
            }
        }
        endYear.sort();
    });

    Data.find({}, {"topic":1}, function(err, found){

        found.sort();

        for(var i=0; i<found.length; i++)
        {
            if(found[i].topic === "") {
                continue;
            }
            if(topics.indexOf(_.capitalize(found[i].topic)) === -1) {
                topics.push(_.capitalize(found[i].topic));
            }
        }
    })

    Data.find({}, {"sector":1}, function(err, found){

        for(var i=0; i<found.length; i++)
        {
            if(found[i].sector === "") {
                continue;
            }
            if(sectors.indexOf(found[i].sector) === -1) {
                sectors.push(found[i].sector);
            }
        }
    })

    Data.find({}, {"region":1}, function(err, found){

        for(var i=0; i<found.length; i++)
        {
            if(found[i].region === "") {
                continue;
            }
            if(regions.indexOf(found[i].region) === -1) {
                regions.push(found[i].region);
            }
        }
    })

    Data.find({}, {"pestle":1}, function(err, found){

        for(var i=0; i<found.length; i++)
        {
            if(found[i].pestle === "") {
                continue;
            }
            if(pestles.indexOf(found[i].pestle) === -1) {
                pestles.push(found[i].pestle);
            }
        }
    })

    Data.find({}, {"source":1}, function(err, found){

        for(var i=0; i<found.length; i++)
        {
            if(found[i].source === "") {
                continue;
            }
            if(sources.indexOf(found[i].source) === -1) {
                sources.push(found[i].source);
            }
        }
    })

    Data.find({}, {"country":1}, function(err, found){

        for(var i=0; i<found.length; i++)
        {
            if(found[i].country === " ") {
                continue;
            }
            if(countries.indexOf(found[i].country) === -1) {
                countries.push(found[i].country);
            }
        }
    })

    Data.find({}, {"start_year":1}, function(err, found){

        for(var i=0; i<found.length; i++)
        {
            if(found[i].start_year === "") {
                continue;
            }
            if(startYear.indexOf(found[i].start_year) === -1) {
                startYear.push(found[i].start_year);
            }
        }

        startYear.sort();
    })

    

    // --------------------------------------------   Day 2   -------------------------------------------- //

    Data.find({},function(err, found){

        eyArray = [];

        for(var i=0; i<found.length; i++)
        {
            if(found[i].end_year > endValue)
            {
                continue;
            }

            eyArray.push(found[i]);
        }
    })

    eyArray.sort((a, b) => a.end_year - b.end_year);

    countryArray = [];

    if(countryValue !== "Rcou")
    {
        for(var i=0; i<eyArray.length; i++)
        {
            if(eyArray[i].country === countryValue)
            {
                countryArray.push(eyArray[i]);
            }
        }
    } else 
    {
        countryArray = eyArray;
    }

    topicArray = [];

    if(topicValue !== "Rtop")
    {
        for(var i=0; i<countryArray.length; i++)
        {
            if(_.capitalize(countryArray[i].topic) === topicValue)
            {
                topicArray.push(countryArray[i]);
            }
        }
    } else 
    {
        topicArray = countryArray;
    }

    sectorArray = [];

    if(sectorValue !== "Rsec")
    {
        for(var i=0; i<topicArray.length; i++)
        {
            if(topicArray[i].sector === sectorValue)
            {
                sectorArray.push(topicArray[i]);
            }
        }
    } else 
    {
        sectorArray = topicArray;
    }

    pestleArray = [];

    if(pestleValue !== "Rpes")
    {
        for(var i=0; i<sectorArray.length; i++)
        {
            if(sectorArray[i].pestle === pestleValue)
            {
                pestleArray.push(sectorArray[i]);
            }
        }
    } else 
    {
        pestleArray = sectorArray;
    }

    regionArray = [];

    if(regionValue !== "Rreg")
    {
        for(var i=0; i<pestleArray.length; i++)
        {
            if(pestleArray[i].region === regionValue)
            {
                regionArray.push(pestleArray[i]);
            }
        }
    } else 
    {
        regionArray = pestleArray;
    }

    sourceArray = [];

    if(sourceValue !== "Rsou")
    {
        for(var i=0; i<regionArray.length; i++)
        {
            if(regionArray[i].source === sourceValue)
            {
                sourceArray.push(regionArray[i]);
            }
        }
    } else 
    {
        sourceArray = regionArray;
    }



    // --------------------------------------------   Day 3 (Filteration Done!!)  -------------------------------------------- //

    intensityArray = [];

    for(var i=0; i<sourceArray.length; i++)
    {
        if(sourceArray[i].intensity === null)
        {
            intensityArray.push(0);
        } else {
            intensityArray.push(sourceArray[i].intensity);
        }
    }

    likelihoodArray = [];

    for(var i=0; i<sourceArray.length; i++)
    {
        if(sourceArray[i].likelihood === "")
        {
            likelihoodArray.push(0);
        } else {
            likelihoodArray.push(sourceArray[i].likelihood);
        }
    }

    relevanceArray = [];

    for(var i=0; i<sourceArray.length; i++)
    {
        if(sourceArray[i].relevance === "")
        {
            relevanceArray.push(0);
        } else {
            relevanceArray.push(sourceArray[i].relevance);
        }
    }

    couArray = [];

    for(var i=0; i<sourceArray.length; i++)
    {
        if(sourceArray[i].country === "")
        {
            continue;
        } else {
            couArray.push(sourceArray[i].country);
        }
    }

    topArray = [];

    for(var i=0; i<sourceArray.length; i++)
    {
        if(sourceArray[i].topic === "")
        {
            continue;
        } else {
            topArray.push(sourceArray[i].topic);
        }
    }

    regArray = [];

    for(var i=0; i<sourceArray.length; i++)
    {
        if(sourceArray[i].region === "")
        {
            continue;
        } else {
            regArray.push(sourceArray[i].region);
        }
    }
    
    res.render("home", {endVal:endValue, rArray:regArray, tArray:topArray, cArray:couArray, relArray:relevanceArray, likeArray:likelihoodArray, inArray:intensityArray, endYear:endYear, topics:topics, sectors:sectors, regions:regions, pestles:pestles, sources:sources, countries:countries, startYear:startYear});
})

app.get("/intensity", function(req,res){
    res.send(intensityArray);
})


app.get("/relevance", function(req,res){
    res.send(relevanceArray);
})


app.get("/likelihood", function(req,res){
    res.send(likelihoodArray);
})


app.get("/country", function(req,res){
    res.send(couArray);
})

app.get("/topics", function(req,res){
    res.send(topArray);
})

app.get("/regions", function(req,res){
    res.send(regArray);
})


app.post("/search", function(req,res){

    endValue = req.body.end;

    if(endValue==="Rend")
    {
        endValue = 2200;
    }

    countryValue = req.body.cou;
    topicValue = req.body.top;
    sectorValue = req.body.sec;
    pestleValue = req.body.pes;
    regionValue = req.body.reg;
    sourceValue = req.body.sou;

    eyArray = [];
    countryArray = [];
    topicArray = [];
    sectorArray = [];
    pestleArray = [];
    regionArray = [];
    sourceArray = [];

    intensityArray = [];
    likelihoodArray = [];
    relevanceArray = [];
    couArray = [];
    topArray = [];
    regArray = [];

    console.log(endValue);
    console.log(countryValue);
    console.log(topicValue);
    console.log(sectorValue);
    console.log(pestleValue);
    console.log(regionValue);
    console.log(sourceValue);
    res.redirect("/");

})


app.listen(3000, function(req,res){
    console.log("Server is running at port 3000...");
})