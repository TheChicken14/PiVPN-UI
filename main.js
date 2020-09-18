// Check if PiVPN is installed
const shell = require('shelljs');

if (!shell.which('pivpn')) {
    shell.echo('PiVPN-UI requires the PiVPN CLI. Please check your installation and try again.');
    shell.exit(1);
}
// If it is installed, continue

const express = require("express")
const session = require("express-session")

const bodyParser = require("body-parser")

const exphbs = require('express-handlebars');

const config = require("./config.json")
const fs = require("fs")

const app = express()

const withAuth = require("./middleware/withAuth")

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

const routes = require("./routes")

routes.forEach(route => {
    console.log(`[ROUTES] Loading ${route.name}...`)
    app.use(route.path, route.router)
})

app.use(express.static("public"))
app.use(bodyParser.urlencoded({ extended: true }))

if (config.proxy) {
    app.set('trust proxy', 1)
}

app.use(session({
    secret: config.cookieSecret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: config.proxy || false
    }
}))

app.use((req, res, next) => {
    if (req.url == "/login") {
        next()
    } else {
        withAuth(req, res, next)
    }
})

app.get("/", (req, res) => {
    if (!fs.existsSync(config.config_dir)) {
        return res.status(500).send("Config directory doesn't exist!")
    }

    res.render("home", {
        profiles: getProfiles()
    })
})

app.get("/login", (req, res) => {
    res.render("login", {
        error: false
    })
})

app.post("/login", (req, res) => {
    const {
        username,
        password
    } = req.body

    if (req.session.logginIn) return res.redirect("/")

    if (!username || !password) {
        res.render("login", {
            error: true
        })
    }

    const foundUser = config.users.find(u => u.username === username && u.password === password)

    if (foundUser) {
        req.session.loggedIn = true
        res.redirect("/")
    } else {
        res.render("login", {
            error: true
        })
    }
})

app.get("/logout", (req, res) => {
    req.session.destroy()
    res.redirect("/login")
})

app.listen(config.port, () => console.log(`PiVPN-UI listening on port ${config.port}`))


function getProfiles() {
    const files = fs.readdirSync(config.config_dir)

    if (!files.length) {
        return []
    } else {
        const filtered = files.filter(f => f.endsWith(config.config_ext))
        const mappedProfiles = filtered.map(f => f.replace(config.config_ext, ""))
        return mappedProfiles
    }
}