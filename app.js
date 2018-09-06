var GooglePatentsResultParser = require("./addAbstracts").GooglePatentsResultParser

var patentResultsParser = new GooglePatentsResultParser("./data/zach_efrati_patents.csv")


patentResultsParser.getPatentAbstract("https://patents.google.com/patent/US20130321444A1/en")
patentResultsParser.addPatentsAbstract()