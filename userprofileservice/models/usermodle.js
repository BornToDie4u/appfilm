const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    userid: {
      type: mongoose.Schema.Types.ObjectId,
    },

    mainProf: {
      fullName: {
        type: String,
      },

      age: {
        type: String,
      },

      state: {
        type: String,
      },

      jobProfile: {
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
      Language: {
        type: String,
      },
      Height: {
        type: String,
      },

      Weight: {
        type: String,
      },

      BuiltType: {
        type: String,
      },
      EyeColor: {
        type: String,
      },
    },

    Skills: {
      type: [String],
    },

    RecentProjects: [
      {
        role: {
          type: String,
        },
        work: {
          type: String,
        },
        company: {
          type: String,
        },
      },
    ],

    ArchiveImages : [
      {
        imgurls : {
          type: String,
        }
      }
    ],
  },
  { timestamps: true }
);

const usermodle = mongoose.model("Personalprofile", schema);

module.exports = { usermodle };
