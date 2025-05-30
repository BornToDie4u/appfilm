const { usermodle } = require("../models/usermodle");
const path = require("path");
const multer = require("multer");
const fs = require("fs");
const { profile } = require("console");

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     const userDir = path.join(`./public/uploads`, req.user._id);

//     fs.mkdirSync(userDir, { recursive: true });

//     cb(null, userDir);
//   },
//   filename: function (req, file, cb) {
//     const uniquePrefix = Date.now();
//     cb(null, uniquePrefix + "_" + file.originalname);
//   },
// });

// const upload = multer({ storage: storage });

async function setprofile(req, res) {
  try {
    const { mainProf, imageurl, about, Details, Skills, RecentProjects,ArchiveImages } =
      req.body;

    const userid = req.user._id;
    console.log(userid);

    const profile = await usermodle.findOne({ userid: userid });

    if (profile) {
      return res.status(500).json({ err: "user profile alredy there" });
    }

    const createprofile = await usermodle.create({
      userid: userid,
      mainProf: mainProf,
      imageurl: imageurl,
      about: about,
      Details: Details,
      Skills: Skills,
      RecentProjects: RecentProjects,
      ArchiveImages : ArchiveImages,
    });

    res.status(200).json({
      status: "created",
      profile: createprofile,
      userid: userid,
    });
  } catch (error) {
    console.log(error);
  }
}

async function getprofile(req, res) {
  const userid = req.user._id;

  const userProfile = await usermodle.findOne({ userid: userid });

  if (!userProfile) {
    return res.json({ err: "userprofile not created" });
  }
  return res.json({ userprofile: userProfile });
}


async function updateProfile(req,res) {
  const {mainProf , imageurl ,about ,Details ,Skills ,RecentProjects}  = req.body;
  const userid = req.user._id;

  const existingProfile = await usermodle.findOne({userid : userid});

  if (!existingProfile) {
    return res.json({err : "there is no existing profile"});

  }

  const updateProfile = await usermodle.findOneAndUpdate(
    {userid : userid},
    {
      mainProf : mainProf || existingProfile.mainProf,
      imageurl : imageurl || existingProfile.imageurl,
      about : about || existingProfile.about,
      Details : Details || existingProfile.Details,
      Skills : Skills || existingProfile.Skills,
      RecentProjects : RecentProjects || existingProfile.RecentProjects
    },
    {new : true} // return the updated document

  );


  res.json({
    initial : existingProfile,
    updated : updateProfile
  });
}


async function uploadProfilePicture(req,res) {

 try {
    const userid = req.user._id;

    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // URL your front-end can reach (served statically below)
    const imageurl = path.posix.join("/uploads", userid.toString(), req.file.filename);

    const updatedProfile = await usermodle.findOneAndUpdate(
      { userid },
      { imageurl },
      { new: true }
    );

    if (!updatedProfile) {
      return res.status(404).json({ error: "Profile not found – create it first." });
    }

    res.status(200).json({
      message: "Profile picture updated",
      imageurl,
      profile: updatedProfile,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error while uploading profile picture" });
  }


  
}

async function uploadArchiveImages(req,res) {
  try {
    const userId = req.user._id;
    console.log(userId)

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: "No files uploaded" });
    }

    const archiveImages = req.files.map(file => {
      const imageUrl = path.posix.join("/ArchiveImages", userId.toString(), file.filename);
      return { imgurls: imageUrl };
    });

    const user = await usermodle.findOne({ userid : userId});
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.ArchiveImages.push(...archiveImages);
    await user.save();

    res.status(200).json({ message: "Images uploaded successfully", archiveImages });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error during image upload" });
  }
}

async function get_profesionalProfile(req,res) {
  const userid = req.user._id;
  const Prof_PROF = await usermodle.findOne({userid : userid});

  if (!Prof_PROF) {
    return res.status(400).json({err : "no profile found"});
  }

  const prof_profile = {
    profile : Prof_PROF.mainProf,
    aboutUser : Prof_PROF.about,
    UserDetails : Prof_PROF.Details,
    Skills : Prof_PROF.Skills,
    RecentProjects : Prof_PROF.RecentProjects,
  }

  res.status(200).json(prof_profile);
}



module.exports = { setprofile, getprofile ,updateProfile,uploadProfilePicture,uploadArchiveImages,get_profesionalProfile};
