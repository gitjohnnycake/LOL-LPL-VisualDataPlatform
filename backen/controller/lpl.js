const { response } = require("express");
const request = require("request");
const dbconfig = require("../util/dbconfig");
const url = {
  team: "https://lpl.qq.com/web201612/data/LOL_MATCH2_MATCH_TEAMRANK_LIST_148_7_8.js",
  member:
    "https://lpl.qq.com/web201612/data/LOL_MATCH2_MATCH_PERSONALRANK_LIST_148_7_8.js",
  LPLHero:
    "https://lpl.qq.com/web201612/data/LOL_MATCH2_MATCH_HERORANK_LIST_148_7_8.js",
};

const basic = (sql, sqlArr, res) => {
  let callback = (err, data) => {
    if (err) {
      console.log("连接出错");
      console.log(err);
      res.send({
        code: 400,
        msg: "request fail",
      });
    } else {
      res.send({
        code: 200,
        data,
        msg: "request OK",
      });
    }
  };
  dbconfig.sqlConnect(sql, sqlArr, callback);
};

// 获取队伍信息
getTeamData = (req, res) => {
  request(
    {
      url: url.team,
    },
    (err, response, body) => {
      if (err) res.json(err);
      if (JSON.parse(body).status != 0) {
        res.send({
          code: 400,
          msg: "request fail",
        });
      } else {
        JSON.parse(body).msg.map((item) => {
          insertTeamData(item, JSON.parse(body).lastUpTime);
        });
        let sql = `select teamName from team`;
        let sqlArr = [];
        basic(sql, sqlArr, res);
      }
    }
  );
};

// 获取个人信息
getMemberData = (req, res) => {
  request(
    {
      url: url.member,
    },
    (err, response, body) => {
      if (err) res.json(err);
      if (JSON.parse(body).status != 0) {
        res.send({
          code: 400,
          msg: "request fail",
        });
      } else {
        JSON.parse(body).msg.map((item) => {
          insertMemberData(item, JSON.parse(body).lastUpTime);
        });
        let sql = `select memberName from member`;
        let sqlArr = [];
        basic(sql, sqlArr, res);
      }
    }
  );
};

// 获取 LPL 英雄信息
getLPLHeroData = (req, res) => {
  request(
    {
      url: url.LPLHero,
    },
    (err, response, body) => {
      if (err) res.json(err);
      if (JSON.parse(body).status != 0) {
        res.send({
          code: 400,
          msg: "request fail",
        });
      } else {
        JSON.parse(body).msg.map((item) => {
          insertLPLHeroData(item, JSON.parse(body).lastUpTime);
        });
        let sql = `select championId from LPLHero`;
        let sqlArr = [];
        basic(sql, sqlArr, res);
      }
    }
  );
};

// 英雄
getRequestData = (req, res) => {
  // 获取英雄信息
  // request(
  //   {
  //     url: "https://game.gtimg.cn/images/lol/act/img/js/heroList/hero_list.js",
  //   },
  //   (err, response, body) => {
  //     if (err) return res.json(err);
  //     JSON.parse(body).hero.map((item) => {
  //       inserHeroData(item);
  //     });
  //     //getHeroData(res);
  //   }
  // );
};

// 更新数据 （队伍）
insertTeamData = async (item, lastUpTime) => {
  console.log(item.sTeamName);
  let sql = `insert into team(teamId,teamName,appearancesFrequency,win,lose,tkill,death,
    averagingWin,averagingKill,averagingDeath,averagingWardPlaced,averagingWardKilled,averagingGold,
    averagingSmallDragon,averagingBigDragon,lastUpTime)
    values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?) on duplicate key update teamId=values(teamId),teamName=values(teamName),
    appearancesFrequency=values(appearancesFrequency),win=values(win),lose=values(lose),tkill=values(tkill),
    death=values(death),averagingWin=values(averagingWin),averagingKill=values(averagingKill),
    averagingDeath=values(averagingDeath),averagingWardPlaced=values(averagingWardPlaced),
    averagingWardKilled=values(averagingWardKilled),averagingGold=values(averagingGold),
    averagingSmallDragon=values(averagingSmallDragon),averagingBigDragon=values(averagingBigDragon),lastUpTime=values(lastUpTime)`;
  let sqlArr = [
    Number(item.iTeamId),
    item.sTeamName,
    item.iAppearancesFrequency,
    item.iWin,
    item.iLoss,
    item.iKill,
    item.iDeath,
    item.sAveragingWin,
    item.sAveragingKill,
    item.sAveragingDeath,
    item.sAveragingWardPlaced,
    item.sAveragingWardKilled,
    item.sAveragingGold,
    item.sAveragingSmallDragon,
    item.sAveragingBigDragon,
    lastUpTime,
  ];
  let res = await dbconfig.sySqlConnect(sql, sqlArr);
};

// 更新数据 （个人）
insertMemberData = async (item, lastUpTime) => {
  let sql = `insert into member(memberId,memberName,teamId,favoriteHeros,position,appearancesFrequency,MVPFrequency,
    averagingGold,mkill,assists,death,lastLasthit,KDA,
    averagingKill,averagingDeath,averagingAssists,averagingLastLasthit,averagingWardPlaced,averagingWardKilled,averagingOfferedRate)
    values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?) on duplicate key update memberId=values(memberId),memberName=values(memberName),
    teamId=values(teamId),favoriteHeros=values(favoriteHeros),position=values(position),appearancesFrequency=values(appearancesFrequency),
    MVPFrequency=values(MVPFrequency),averagingGold=values(averagingGold),mkill=values(mkill),
    assists=values(assists),death=values(death),
    lastLasthit=values(lastLasthit),KDA=values(KDA),
    averagingKill=values(averagingKill),averagingDeath=values(averagingDeath),averagingAssists=values(averagingAssists),
    averagingLastLasthit=values(averagingLastLasthit),averagingWardPlaced=values(averagingWardPlaced),
    averagingWardKilled=values(averagingWardKilled),averagingOfferedRate=values(averagingOfferedRate)`;
  let sqlArr = [
    Number(item.iMemberId),
    item.sMemberName,
    Number(item.iTeamId),
    item.sFavoriteHeros,
    item.iPosition,
    item.iAppearancesFrequency,
    item.iMVPFrequency,
    item.sAveragingGold,
    item.iKill,
    item.iAssists,
    item.iDeath,
    item.iLastLasthit,
    item.iKDA,
    item.sAveragingKill,
    item.sAveragingDeath,
    item.sAveragingAssists,
    item.sAveragingLastLasthit,
    item.sAveragingWardPlaced,
    item.sAveragingWardKilled,
    item.sAveragingOfferedRate,
    lastUpTime,
  ];
  let res = await dbconfig.sySqlConnect(sql, sqlArr);
};

// 更新数据 （LPL 英雄）
insertLPLHeroData = async (item, lastUpTime) => {
  let sql = `insert into LPLHero(championId,appearancesFrequency,averagingPick,averagingBan,averagingWin,heroKill,death,
    assists,averagingKill,averagingDeath,averagingAssists,averagingOfferedRate,oftenMemberName)
    values(?,?,?,?,?,?,?,?,?,?,?,?,?) on duplicate key update championId=values(championId),
    appearancesFrequency=values(appearancesFrequency),averagingPick=values(averagingPick),
    averagingBan=values(averagingBan),averagingWin=values(averagingWin),heroKill=values(heroKill),
    death=values(death),assists=values(assists),averagingKill=values(averagingKill),
    averagingDeath=values(averagingDeath),averagingAssists=values(averagingAssists),
    averagingOfferedRate=values(averagingOfferedRate),oftenMemberName=values(oftenMemberName)`;
  let sqlArr = [
    Number(item.iChampionId),
    item.iAppearancesFrequency,
    item.sAveragingPick,
    item.sAveragingBan,
    item.sAveragingWin,
    item.iKill,
    item.iDeath,
    item.iAssists,
    item.sAveragingKill,
    item.sAveragingDeath,
    item.sAveragingAssists,
    item.sAveragingOfferedRate,
    item.sOftenMemberName,
    lastUpTime,
  ];
  let res = await dbconfig.sySqlConnect(sql, sqlArr);
};

// 获取长度
getLength = (req, res) => {
  let sql = `select count(*) as count from member; select count(*) as count from team`;
  let sqlArr = [];
  basic(sql, sqlArr, res);
};

// 获取随机队员
getRandMember = (req, res) => {
  let sql = `select memberName,mkill,death,assists,appearancesFrequency from member order by rand() limit 7`;
  let sqlArr = [];
  basic(sql, sqlArr, res);
};

// 获取MVP选手
getMvpMember = (req, res) => {
  let sql = `select memberName,MVPFrequency from member order by MVPFrequency desc limit 6`;
  let sqlArr = [];
  basic(sql, sqlArr, res);
};

// 获取屠龙勇士
getGragonTeam = (req, res) => {
  let sql = `select teamName,averagingSmallDragon,averagingBigDragon,appearancesFrequency from team order by averagingSmallDragon desc limit 8`;
  let sqlArr = [];
  basic(sql, sqlArr, res);
};

// 获取队伍金币
getGoldTeam = (req, res) => {
  // let sql = `select teamName,averagingGold from team order by averagingGold desc limit 7`;
  let sql = `SELECT team.teamName,team.averagingGold,member.position,member.averagingGold AS memberGold FROM team LEFT JOIN member ON team.teamId=member.teamId ORDER BY averagingGold DESC,position ASC LIMIT 35`;
  let sqlArr = [];
  basic(sql, sqlArr, res);
};

// 获取排行
getRankList = (req, res) => {
  let sql = `SELECT teamName,appearancesFrequency,averagingWin from team ORDER BY averagingWin DESC LIMIT 4;
  SELECT teamName,appearancesFrequency,tkill from team ORDER BY tkill DESC LIMIT 4;
  SELECT memberName,position,mkill from member ORDER BY mkill DESC LIMIT 4;
  SELECT memberName,position,KDA from member ORDER BY KDA DESC LIMIT 4;`;
  let sqlArr = [];
  basic(sql, sqlArr, res);
};

// 获取LPL英雄数据
getHero = (req, res) => {
  let sql = `SELECT hero.name,LPLHero.appearancesFrequency,LPLHero.averagingPick,LPLHero.averagingBan,LPLHero.averagingWin FROM hero RIGHT JOIN LPLHero ON hero.heroId=LPLHero.championId`;
  let sqlArr = [];
  basic(sql, sqlArr, res);
};

getDate = (req, res) => {
  let sql = `select lastUpTime from team limit 1`;
  let sqlArr = [];
  basic(sql, sqlArr, res);
}

module.exports = {
  getTeamData,
  getMemberData,
  getLPLHeroData,
  getLength,
  getRandMember,
  getMvpMember,
  getGragonTeam,
  getGoldTeam,
  getRankList,
  getHero,
  getDate
};
