const inquirer = require("inquirer")
const fs = require("fs")
const chalk = require("chalk")

const generateSecret = () => {
    var length = 30,
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
}

inquirer.prompt([
    {
        name: "port",
        type: "number",
        message: "Port:",
    },
    {
        name: "proxy",
        type: "confirm",
        message: "Are you using a reverse proxy for PiVPN-UI?"
    },
    {
        name: "config_dir",
        default: "/home/pi/ovpns",
        message: "What is the OVPN directory?",
    },
    {
        name: "username",
        type: "input",
        message: "What username would you like to use?"
    },
    {
        name: "password",
        type: "password",
        message: "What password would you like to use?"
    }
]).then(answers => {
    const {
        port,
        proxy,
        config_dir,
        username,
        password
    } = answers

    const base = {
        port,
        config_dir,
        config_ext: ".ovpn",
        cookieSecret: generateSecret(),
        proxy,
        users: [
            {
                username,
                password
            }
        ]
    }
    try {
        fs.writeFileSync("./config.json", JSON.stringify(base))
        console.log(chalk.green("Wrote config file!"))
        console.log(chalk.white("Run \"npm start\" to start the server!"))
    } catch (e) {
        console.error(e)
        console.error(chalk.red("An error occurred while writing the config file!"))
    }

})