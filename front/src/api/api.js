import { get } from "@/api/config";

// 获取队伍队员数量
export const getLength = () => get("/getLength");
// 获取随机队员
export const getRandMember = () => get("/getRandMember");
// 获取MVP选手
export const getMvpMember = () => get("/getMvpMember");
// 获取屠龙勇士
export const getGragonTeam = () => get("/getGragonTeam");
// 获取金币队伍
export const getGoldTeam = () => get("/getGoldTeam");
// 获取排行
export const getRankList = () => get("/getRankList");
// 获取英雄
export const getHero = () => get("/getHero")
// 定时更新数据
export const getDate = () => get("/getDate")
export const team = () => get("/team")
export const member = () => get("/member")
export const hero = () => get("/hero")
