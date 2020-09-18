/**
 * This function returns the temperature of the CPU
 */
const si = require("systeminformation")

module.exports = async () => {
    return new Promise(resolve => {
        si.cpuTemperature()
            .then(data => resolve(Math.round(data.main)))
            .catch(error => {
                console.error("An error occurred while reading the CPU temperature")
                console.error(error)
                resolve("--")
            });
    })
}