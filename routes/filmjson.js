var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  var content = fs.readFileSync("/data/filmjson.json");
  res.json(content.toString());
  res.render("/views/index.ejs");

});

module.exports = router;
