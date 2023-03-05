
const http = require("http");
const fs = require("fs");
let MainFileHTML = fs.readFileSync("./main.html").toString();
let WelcomeFileHTML = fs.readFileSync("./welcome.html").toString();
let StyleCSS = fs.readFileSync("./form.css").toString();
let FetchFile = fs.readFileSync("./fetch.js").toString();
let JsonFile = fs.readFileSync("./myjsonfile.json").toString();
let myIcon = fs.readFileSync("./favicon.ico");
let users = [];
var clientName = "";
var MobileNumber = "";
var Email = "";
var Address = "";
let dataemail = "";
let index = 0
let firstPart = ""
let lastPart = ""
http.createServer((req, res) => {

    //#region GET
    if (req.method == "GET") {

        switch (req.url) {
            case "/main.html":
                res.writeHead(200, "Ok", { "content-type": "text/html" });
                res.write(MainFileHTML);
                break;
            case "/fetch.js":
                res.writeHead(200, "Ok", { "content-type": "text/javascript" });
                res.write(FetchFile);
                break;
            case "/myjsonfile.json":
                res.writeHead(200, "Ok", { "content-type": "application/Json" });
                res.write(JsonFile);
                break;
            case "/welcome.html":
                res.write(WelcomeFileHTML);
                break;
            case "/form.css":
                res.writeHead(200, "Ok", { "content-type": "text/css" });
                res.write(StyleCSS);
                break;
            case "/favicon.ico":
                res.writeHead(200, "ok", {
                    "content-type": "image/vnd.microsoft.icon",
                });
                res.write(myIcon);
                break;
            default:
                res.write(`<h1>No Page Found</h1>`);
                break;
        }
        res.end();
    }
    //#endregion
    //#region POST
    else if (req.method == "POST") {
        req.on("data", (data) => {
            //get data from post
            data = data.toString().split('&')
            clientName = data[0].split('=')[1];
            MobileNumber = data[1].split('=')[1];
            dataemail = data[2].split('=')[1];
            index = dataemail.indexOf("gmail");
            firstPart = dataemail.substring(0, index - 3);
            lastPart = dataemail.substring(index);
            Email = firstPart + "@" + lastPart;
            Address = data[3].split('=')[1];
            
        });
        req.on("end", () => {
            //write in welcome page the user data
            WelcomeFileHTML = WelcomeFileHTML.replace("{clientName}", clientName)
            .replace("{MobileNumber}", MobileNumber)
            .replace("{Email}", Email)
          .replace("{Address}", Address);
            res.write(WelcomeFileHTML);
            //read the json file to append on it new user if it contain data, inserting the first user if its length=0
            let usersjson = fs.readFileSync("myjsonfile.json","utf-8");
            if(usersjson.length==0){
                users.push({  name: clientName, mobile: MobileNumber, email: Email, address: Address });
            var json = JSON.stringify(users);
            fs.writeFile("./myjsonfile.json", json, () => {})
            }
            else{
                let newusers = JSON.parse(usersjson);
                newusers.push({  name: clientName, mobile: MobileNumber, email: Email, address: Address });
                usersjson = JSON.stringify(newusers);
                fs.writeFileSync("myjsonfile.json",usersjson,"utf-8");
            }
            
            res.end();
        
        });
       
    }
    //#endregion

}).listen("7001", () => {
    console.log("http://localhost:7001")
})
