const puppy = require("puppeteer");

const id = "mopic52388@87708b.com";
const password = "qwertyqwerty";

async function main()
{
let browser = await puppy.launch({
    headless : false,
   defaultViewport : false
});

let tabs = await browser.pages(); 
let tab = tabs[0]; 

await tab.goto("https://www.instagram.com/accounts/login/");
await tab.waitForSelector("._2hvTZ.pexuQ.zyHYP", { visible : true } );

let credentials = await tab.$$("._2hvTZ.pexuQ.zyHYP");
await credentials[0].type(id);
await credentials[1].type(password);

await tab.click(".sqdOP.L3NKy.y3zKF");
await tab.waitForNavigation({ waitUntil: 'networkidle2' });
await tab.click(".sqdOP.L3NKy.y3zKF");

await tab.waitForSelector(".aOOlW.HoLwm ", { visible : true } );
await tab.click(".aOOlW.HoLwm");

await tab.waitForSelector(".Fifk5",{visible : true });
let profile = await tab.$$(".Fifk5");
await profile[4].click();

await tab.waitForSelector(".Igw0E.IwRSH.YBx95._4EzTm" , { visible : true});
let profileOption = await tab.$$(".Igw0E.IwRSH.YBx95._4EzTm");
await profileOption[0].click();

await tab.waitForSelector(".-nal3",{ visible : true });
let following = await tab.$$(".-nal3");
await following[2].click();

await tab.waitForSelector(".FPmhX.notranslate._0imsa" , { visible : true});
let people = await tab.$$(".FPmhX.notranslate._0imsa");

let peopleUrls = [];

for(let i = 0 ; i < people.length ; i++) 
{
       let url = await tab.evaluate(function (ele){
          return ele.getAttribute("href");
        }, people[i]);
    
      peopleUrls.push(url); 
}

for(let i = 0 ; i < peopleUrls.length ; i++) 
{
         await message("https://www.instagram.com" + peopleUrls[i] , tab );
}

async function message( url , tab )
{
      await tab.goto(url);
      await tab.click(".sqdOP.L3NKy._4pI4F._8A5w5");
      await tab.waitForSelector("textarea[placeholder = 'Message...']");
      await tab.type("textarea[placeholder = 'Message...']" , "Hello , How are you?");
      let send = await tab.$$(".sqdOP.yWX7d.y3zKF");
      await send[2].click();
     return ;
}
 
 browser.close();
}
main();