const express = require('express')
const router = express.Router()

router.get('/company', (req, res) => {
    res.send("Company")
})


module.exports = router