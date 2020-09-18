const express = require('express')
const router = express.Router()

const fs = require("fs")
const config = require("../config.json")

const shell = require('shelljs');


router.get("/", (req, res) => {
    if (!fs.existsSync(config.config_dir)) {
        return res.status(500).send("Config directory doesn't exist!")
    }
    const files = fs.readdirSync(config.config_dir)
    if (!files.length) {
        return res.json([])
    } else {
        const mappedConfigs = files.map(f => f.replace(config.config_ext, ""))
        res.json(mappedConfigs)
    }
})

router.get("/:id/download", (req, res) => {
    const { id } = req.params;

    if (fs.existsSync(`${config.config_dir}/${id}${config.config_ext}`)) {
        res.setHeader('Content-disposition', 'attachment; filename=' + `${id}${config.config_ext}`);
        res.download(`${config.config_dir}/${id}${config.config_ext}`)
    } else {
        res.status(404).send("Not found!")
    }
})

router.get("/:id/delete", (req, res) => {
    const { id } = req.params;
    const { redirect } = req.query

    if (fs.existsSync(`${config.config_dir}/${id}${config.config_ext}`)) {
        shell.exec(`pivpn -r -y ${id}`)
        if (redirect) {
            res.redirect(redirect)
        } else {
            res.send("Success!")
        }
    } else {
        res.status(404).send("Client not found!")
    }
})

router.get("/create/:name", (req, res) => {
    const { name } = req.params;

    try {
        shell.exec(`pivpn -a nopass --name ${name} -d 1080`)
        res.send("done!")
    } catch (e) {
        console.error(e)
        res.status(500).send("An error occurred!")
    }
})

module.exports = {
    name: "Configs",
    path: '/api/configs',
    router
}