const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    
    userid: {
      type: mongoose.Schema.Types.ObjectId,
    },
    mainProf: {
      companyName: {
        type: String,
      },

      OnwerName: {
        type: String,
      },
    },

    imageurl: {
      type: String,
    },

    about: {
      type: String,
    },

    Details: {
      Location: {
        type: String,
      },
      Stablished: {
        type: String,
      },
    },

    Skills: {
      type: [String],
    },

    RecentProjects: [
      {
        Movie_SeriesName: {
          type: String,
        },
        Ratings: {
          type: String,
        },
        
      },
    ],
  },
  { timestamps: true }
);

const usermodle = mongoose.model("Companyprofile", schema);

module.exports = { usermodle };
