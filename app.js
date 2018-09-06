var GooglePatentsResultParser = require("./addAbstracts").GooglePatentsResultParser

var patentResultsParser = new GooglePatentsResultParser("./data/gp-search-20180906-110216.csv")


patentResultsParser.getPatentAbstract("https://patents.google.com/patent/US20130321444A1/en")
patentResultsParser.addPatentsAbstract()