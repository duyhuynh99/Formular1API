import { Router } from "express";
import{recordController} from "../controller/record.controller";

const routes=Router();

//Lấy tất cả dữ liệu trong 1 năm và lấy ra bao nhiêu record
routes.get("/year/:year/size/:size",recordController.findRecordAllInYear);

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

//Lấy dữ liệu của team trong năm
routes.get("/fastest-lap/year/:year/",recordController.findFastestLapInYear);

//API này để đẩy dữ liệu bao gồm driver team race
routes.post("/",recordController.createRecord);
export default routes;