const mongoose = require("mongoose");

const homeInsuranceSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Assuming your user model is named "User"
      required: true
    },
    policyHolderName: {
      type: String,
      required: [true, "Please enter the policy holder's name"]
    },
    propertyAddress: {
      type: String,
      required: [true, "Please enter the property address"]
    },
    coverageType: {
      type: String,
      required: [true, "Please enter the coverage type"]
    },
    premiumAmount: {
      type: Number,
      required: [true, "Please enter the premium amount"]
    },
    houseImage: {
      type: Object,
      required: [true, "Please provide the path to the house image"]
    },
    policyNumber: {
      type: String,
      required: [true, "Please enter the policy number"]
    }
  },
  {
    timestamps: true
  }
);

const HomeInsurance = mongoose.model("HomeInsurance", homeInsuranceSchema);

module.exports = HomeInsurance;
