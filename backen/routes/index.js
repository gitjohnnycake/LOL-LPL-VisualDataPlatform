var express = require('express');
var router = express.Router();
const lplData = require('../controller/lpl')

/* GET home page. */
router.get('/team', lplData.getTeamData);
router.get('/member', lplData.getMemberData);
router.get('/hero', lplData.getLPLHeroData);
router.get('/herolist', lplData.getHeroList);
router.get('/getLength', lplData.getLength);
router.get('/getRandMember', lplData.getRandMember);
router.get('/getMvpMember', lplData.getMvpMember);
router.get('/getGragonTeam', lplData.getGragonTeam);
router.get('/getGoldTeam', lplData.getGoldTeam);
router.get('/getRankList', lplData.getRankList);
router.get('/getHero', lplData.getHero);
router.get('/getDate', lplData.getDate);

module.exports = router;
