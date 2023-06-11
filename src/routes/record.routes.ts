import { Router } from "express";
import{recordController} from "../controller/record.controller";

const routes=Router();

//Lấy tất cả dữ liệu trong 1 năm và lấy ra bao nhiêu record bằng query
// + Thêm option ?size=Number với Number là con số mong muốn
routes.get("/year/:year/",recordController.findRecordAllInYear);

//Lấy dữ liệu top1 của các đường đua trong năm
routes.get("/year/:year/race-all",recordController.findRecordTopRaceInYear);

//Lấy dữ liệu đua của 1 đường đua trong năm
routes.get("/year/:year/race/:raceId",recordController.findRecordRaceInYear);

//Lấy dữ liệu xếp hạng của các tay đua trong năm
routes.get("/year/:year/driver-all",recordController.findRecordTopDriverInYear);

//Lấy dữ liệu của tay đua trong năm
routes.get("/year/:year/driver/:driverId",recordController.findRecordDriverInYear);

//Lấy dữ liệu xếp hạng của các team trong năm
routes.get("/year/:year/team-all",recordController.findRecordTopTeamInYear);

//Lấy dữ liệu của team trong năm
routes.get("/year/:year/team/:teamId",recordController.findRecordTeamInYear);

//Lấy dữ liệu ranking dhl fastest lap
routes.get("/fastest-lap/year/:year/",recordController.findFastestLapInYear);

//optional
//Lấy dữ liệu của 1 driver trong cuộc đua
routes.get("/year/:year/race/:raceId/driver/:driverId",recordController.findSingleDriverResult);

//Thức hạng driver qua từng năm
routes.get("/driver-rank-year-by-year/driver/:driverId/",recordController.findDriverRankYearByYear);

//Thức hạng Team qua từng năm
routes.get("/team-rank-year-by-year/team/:teamId/",recordController.findTeamRankYearByYear);

//API này để đẩy dữ liệu bao gồm driver ,team, race từ API:https://ergast.com/api/f1/
routes.post("/",recordController.createRecord);

export default routes;