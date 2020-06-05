const app = require("../index1"); //reference to you index1.js file
const assert = require("assert").strict;

/*Mocha usually follow this template:
describe([String with Test Group Name], function() {
    it([String with Test Name], function() {
        [Test Code]
    });
});*/
var customerDetails = {
  cif: "12345",
  customerCategory: ["EMPLOYEE", "WEALTH"],
  usedCodes: [
    {
      codeType: "P",
      codeName: "KOTAKFIRST",
      usedCount: "1",
    },
    {
      codeType: "D",
      codeName: "STUDENT",
      usedCount: "2",
    },
  ],
};
var transactionDetails = {
  requestID: "1",
  transDate: "01-04-2020",
  transTypeCode: "SVC-R",
  currency: "USD",
  amount: "1500",
  promoCode: "KOTAKFIRST",
  channel: "PORTAL",
  rate: "77.31",
  ibr: "75.31",
  cardRate: "77.31",
  perUnit: "1",
  buySellSign: "-1",
  orgCharges: "100",
  lcyAmount: "115965",
};
var selectedOfferCode = {
  codeType: "D",
  validFor: "RC",
  codeName: "STUDENT",
  description:
    " DISCOUNT FOR EDUCATIONAL SEASON- CHARGES Rs 100 OFF, 50 PAISE DISCOUNT ON CARD RATE",
  startDateTime: "01-04-2020 00:00:00",
  endDateTime: "01-07-2020 00:00:00",
  minMaxAmountType: "LCY",
  minimumINRAmount: "1000",
  maximumINRAmount: "1000000",
  maximumTotalUsage: "100000",
  maximumUsagePerCustomer: "1",
  rateApplyType: "GBL",
  applicableRateMargin: "50",
  chargesDiscount: {
    chargeDiscountType: "F",
    chargeDiscount: "100",
  },
  rateDiscount: {
    rateDiscountType: "F",
    rateDiscountOn: "IBR",
    rateDiscountOrMargin: "50",
  },
  termsFilter: {
    channel: ["branch", "mobile"],
    transTypeCode: ["CN-SALE", "SVC-S", "SVC-R", "TT-SALE", "DD-SALE"],
    customerCategory: ["STUDENT", "EMPLOYEE"],
    currency: [
      {
        currCode: "USD",
        minAmount: "",
        maxAmount: "",
        discount: "",
      },
      {
        currCode: "EUR",
        minAmount: "",
        maxAmount: "",
        discount: "",
      },
      {
        currCode: "GBP",
        minAmount: "",
        maxAmount: "",
        discount: "",
      },
    ],
  },
};
describe("Testing", function () {
  it("Show Output", function (done) {
    function isCodeApplicable() {
      var a = transactionDetails.channel; //PORTAL
      var b = selectedOfferCode.termsFilter.channel; //console.log(b);
      var c = b.push(a); //console.log(b);
      if (b.includes("PORTAL") == true) {
        console.log("Rule 1 Passed");

        var d = transactionDetails.transTypeCode; //SVC-R
        var e = selectedOfferCode.termsFilter.transTypeCode; //[ 'CN-SALE', 'SVC-S', 'SVC-R', 'TT-SALE', 'DD-SALE' ]
        if (e.includes("SVC-R") == true) {
          console.log("Rule 2 Passed");

          var f = customerDetails.customerCategory[1]; //WEALTH
          var g = selectedOfferCode.termsFilter.customerCategory; //console.log(g);
          var h = g.push(f);
          if (g.includes("WEALTH") == true) {
            console.log("Rule 3 Passed");

            var x = transactionDetails.currency; //USD
            var y = selectedOfferCode.termsFilter.currency[0]; //{ currCode: 'USD', minAmount: '', maxAmount: '', discount: '' }
            var w = y.currCode; //USD
            if (w.includes("USD") == true) {
              console.log("Rule 4 Passed");

              if (selectedOfferCode.minMaxAmountType == "LCY") {
                //console.log("Succceed");
                if (
                  selectedOfferCode.minimumINRAmount <
                  transactionDetails.lcyAmount <
                  selectedOfferCode.maximumINRAmount
                ) {
                  console.log("Rule 5 Passed");

                  if (selectedOfferCode.minMaxAmountType == "LCY") {
                    if (
                      selectedOfferCode.minimumINRAmount <
                      transactionDetails.lcyAmount <
                      selectedOfferCode.maximumINRAmount
                    ) {
                      console.log("Rule 6 Passed");

                      //console.log(transactionDetails.transDate); //01-04-2020
                      //console.log(selectedOfferCode.startDateTime); //01-04-2020 00:00:00
                      //console.log(selectedOfferCode.endDateTime); //01-07-2020 00:00:00
                      var a1 = selectedOfferCode.startDateTime;
                      var offerPeriodStart = a1.slice(0, 10); //console.log(offerPeriodStart); //01-04-2020
                      var b1 = selectedOfferCode.endDateTime;
                      var offerPeriodEnd = b1.slice(0, 10); //console.log(offerPeriodEnd); //01-07-2020
                      var from = Date.parse(offerPeriodStart);
                      var to = Date.parse(offerPeriodEnd);
                      var check = Date.parse(transactionDetails.transDate);
                      if (check <= to && check >= from) {
                        console.log("Rule 7 Passed");

                        var s = customerDetails.usedCodes[0].usedCount; //1 console.log(s);
                        if (s == selectedOfferCode.maximumUsagePerCustomer) {
                          console.log("Rule 8 Passed");
                          console.log(
                            "IsCodeApplicableForTransaction={requestID:1,codeType:D,validFor:RC,codeName:STUDENT,applicable:Y,message:}"
                          );
                          done();
                        } else {
                          console.log("Rule 8 Failed");
                          console.log(
                            "sCodeApplicableForTransaction={codeType:D,validFor:RC,codeName:STUDENT,applicable:N,message:Customer has already used  maximim no of usages  (selectedOfferCode.maximumUsagePerCustomer) available for offer code <selectedOfferCode.codeName>}"
                          );
                          done();
                        }
                      } else {
                        console.log("Rule 7 Failed");
                        console.log(
                          "IsCodeApplicableForTransaction={codeType:D,validFor:RC,codeName:STUDENT,applicable:N,message:Transaction Date 1/03/2020 is Not Within Range Student Range is form 01-05-2020 00:00:00 to 01-07-2020 00:00:00 }"
                        );
                        done();
                      }
                    } //@@@@
                  } else {
                    console.log("Rule 6 Failed");
                    console.log(
                      "IsCodeApplicableForTransaction={requestID:1,codeType:D,validFor:RC,codeName:STUDENT,applicable:N,message:FCY Amount}"
                    );
                    done();
                  }
                } //@@@@@
              } else {
                console.log("Rule 5 Failed");
                console.log(
                  "IsCodeApplicableForTransaction={requestID:1,codeType:D,validFor:RC,codeName:STUDENT,applicable:N,message:LCY Amount 115965 is Not with in Range STUDENT Range is form 1000}"
                );
                done();
              }
            } else {
              console.log("Rule 4 Failed");
              console.log(
                "IsCodeApplicableForTransaction={requestID:1,codeType:D,validFor:RC,codeName:STUDENT,applicable:N,message:Currency USD is Not Applicable STUDENT Available Currencies  [{currCode:INR,minAmount:,maxAmount:,discount:},{currCode:EUR,minAmount:,maxAmount:,discount:},{currCode:GBP,minAmount:,maxAmount:,discount:}]}"
              );
              done();
            }
          } else {
            console.log("Rule 3 Failed");
            console.log(
              "IsCodeApplicableForTransaction={requestID:1,codeType:D,validFor:RC,codeName:STUDENT,applicable:N,message:Customer Category [EMPLOYEE,   WEALTH] is Not Applicable Student Available Customer Categories}"
            );
            done();
          }
        } else {
          console.log("Rule 2 Failed");
          console.log(
            "IsCodeApplicableForTransaction={requestID:1, codeType:D,validFor:RC,codeName:STUDENT,applicable:N,message:Transaction Type SVC-R is not Applicable for STUDENT, Available Transaction Types [CN-SALE,SVC-S,TT-SALE,DD-SALE]}"
          );
          done();
        }
      } else {
        console.log("Rule 1 Failed");
        console.log(
          "IsCodeApplicableForTransaction={requestID:1, codeType:D, validFor:RC,codeName:STUDENT,applicable:N,message:Channel 'PORTAL' is Not Applicable for STUDENT,  Aviailable Channels [branch,mobile]}"
        );
        done();
      }
    }
    isCodeApplicable();
  });
});
