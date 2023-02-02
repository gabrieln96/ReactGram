const express = require("express");
const router = express();

// test router


router.get("/", (req, res) => {
    res.send("API WORKING!");
});

module.exports = router ;