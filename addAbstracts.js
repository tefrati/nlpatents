var XLSX = require("xlsx")
var rp = require('request-promise-native')
var xray = require("./scrapper").xray
var xToPromise = require("./scrapper").xToPromise



class GooglePatentsResultParser {
    constructor(filename) {
        this.filename = filename
        this.workbook = XLSX.readFile(filename)
    }

    async addPatentsAbstract() {
        let sheetJson = XLSX.utils.sheet_to_json(this.workbook.Sheets.Sheet1)
        for (let patentRow of sheetJson) {
             await this.addPatentAbstract(patentRow)
        }
        this.workbook.Sheets.Sheet1 = XLSX.utils.json_to_sheet(sheetJson)
        XLSX.writeFile(this.workbook, this.filename, {})
    }
    
    async addPatentAbstract(patentRow) {
        // get URL from row
        let url = patentRow['result link']
        // fetch abstract from URL
        let abstract = await this.getPatentAbstract(url)
        // update row with abtract
        patentRow['abstract'] = abstract
    }

    async getPatentAbstract(url) {
        try {
            let html = await rp(url)
            const query = xray(html, 'abstract | trim')
            let abstract = await xToPromise(query)
            console.log("finished fetching abstract for ", url)
            return abstract
        }
        catch (error) { 
            console.error("getPatentAbstract caught an error: ", error)
            return ""
        }
    }
}

module.exports = {GooglePatentsResultParser}