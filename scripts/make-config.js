const template = require("../public/config.template.json")
const {name} = require("../package.json")
const fs = require("fs")
const [arg0, agr1, port] = process.argv;

(!port || port.length===0) && console.error("😰  port not found! To use: npm run make-config <port>");

fs.writeFileSync(`${__dirname}/../public/config.json`, JSON.stringify(template, null, 2).replace(/app-name/g, name).replace(/PORT/g, port));
