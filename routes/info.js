const express = require('express')
const router = express.Router()

const getTemp = require("../functions/getTemp")

router.get("/cpu/temperature", async (req, res) => {
    const temp = await getTemp();
    res.json({
        temperature: temp
    })
})

module.exports = {
    name: "Info",
    path: '/api/info',
    router
}