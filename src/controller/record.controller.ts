import { Request, Response } from "express";
import prisma from "../services/prisma";


export const recordController = {

    async createRecord(req: Request, res: Response) {

        const data = req.body;
        console.log('Run data Round: '+data.round);
        const raceName: string = data.Circuit.Location.country;
        //Tạo đường đua
        let dataRace;
        const race = await prisma.race.findFirst({
            where: {
                raceName: raceName
            },
        })
        dataRace = race;
        if (!race) {
            const race = await prisma.race.create({
                data: {
                    raceName: raceName,
                    revenue: data.Circuit.circuitName
                }
            })
            dataRace = race;
        }
        for (const item of data.Results) {
            let dataDriver;
            const driver = await prisma.driver.findFirst({
                where: {
                    driverName: item.Driver.givenName + ' ' + item.Driver.familyName,
                    nation: item.Driver.nationality,
                },
            })
            dataDriver = driver;
            if (!driver) {
                const driver = await prisma.driver.create({
                    data: {
                        driverName: item.Driver.givenName + ' ' + item.Driver.familyName,
                        nation: item.Driver.nationality,
                    }
                })
                dataDriver = driver;
            }

            let dataTeam;
            const team = await prisma.team.findFirst({
                where: {
                    teamName: item.Constructor.name,
                },
            })
            dataTeam = team;
            if (!team) {
                const team = await prisma.team.create({
                    data: {
                        teamName: item.Constructor.name,
                    }
                })
                dataTeam = team;
            }

            if (dataTeam && dataDriver && dataRace) {
                const record = await prisma.record.create({
                    data: {
                        year: data.season,
                        lap: Number(item.laps),
                        timeRetired: item.Time && item.Time.time ? item.Time.time : item.status,
                        point: Number(item.points),
                        positions: Number(item.position),
                        fastestLapRank: item.FastestLap && item.FastestLap.rank ? Number(item.FastestLap.rank) : 0,
                        fastestLapTime: item.FastestLap && item.FastestLap.Time && item.FastestLap.Time.time ? item.FastestLap.Time.time : '0000',
                        driverId: dataDriver.id,
                        teamId: dataTeam.id,
                        raceId: dataRace.id
                    }
                });
                console.log('Done-------------------' + record.id);
            } else {
                console.log('Fail-------------------');
            }
        }
        console.log('------------------success----------------')
        return res.send('success');
    },

    async findRecordAllInYear(req: Request, res: Response) {

        const { year } = req.params;
        const { size } = req.query;
        const sizeDefault: number = 25;
        const record = await prisma.record.findMany({
            where: {
                year: year,
            },
            orderBy: [
                { raceId: 'asc' },
                { point: 'desc' },
            ],
            take: size ? Number(size) : sizeDefault,
            include: {
                driver: true,
                team: true,
                race: true
            }
        });

        return res.json(record);
    },
    //tương tự như selection year/race/all trên trang F1
    async findRecordTopRaceInYear(req: Request, res: Response) {

        const year = req.params.year;
        const record = await prisma.record.findMany({
            where: {
                AND: [
                    { year: year },
                    { positions: 1 },
                ],
            },
            orderBy: {
                raceId: 'asc'
            },
            select: {
                lap: true,
                timeRetired: true,
                driver: {
                    select: {
                        driverName: true,
                    },
                },
                team: {
                    select: {
                        teamName: true,
                    },
                },
                race: {
                    select: {
                        raceName: true,
                    },
                },
            },
        });

        return res.json(record);
    },

    async findRecordRaceInYear(req: Request, res: Response) {

        const { year, raceId } = req.params;
        const record = await prisma.record.findMany({
            where: {
                AND: [
                    { year: year },
                    { raceId: Number(raceId) },
                ],
            },
            orderBy: {
                point: 'desc'
            },
            select: {
                id: true,
                positions: true,
                lap: true,
                timeRetired: true,
                point: true,
                driver: {
                    select: {
                        driverName: true,
                    },
                },
                team: {
                    select: {
                        teamName: true,
                    },
                },
                race: {
                    select: {
                        raceName: true,
                    },
                },
            },
        });

        return res.json(record);
    },
    //tương tự như selection year/driver/all trên trang F1
    async findRecordTopDriverInYear(req: Request, res: Response) {

        const year = req.params.year;
        const record = await prisma.record.findMany({
            where: {
                year: year,
            },
            orderBy: {
                driverId: 'asc',
                // raceId: 'asc'
            },
            include: {
                driver: true,
                team: true,
                race: true
            }
        });

        interface Item {
            [key: string]: {
                totalPoint: number,
                driverName: string,
                nation: string,
                teamName: string,
            };
        }

        const item: Item = {};

        for (const e of record) {
            const driverId = e.driverId;

            if (!item[driverId]) {
                item[driverId] = {
                    totalPoint: 0,
                    teamName: e.team.teamName,
                    nation: e.driver.nation,
                    driverName: e.driver.driverName
                };
            }

            item[driverId].totalPoint += e.point;
        }

        const finallyRecord: any[] = Object.values(item).sort((a, b) => b.totalPoint - a.totalPoint);

        return res.json(finallyRecord);
    },

    async findRecordDriverInYear(req: Request, res: Response) {

        const { year, driverId } = req.params;
        const record = await prisma.record.findMany({
            where: {
                AND: [
                    { year: year },
                    { driverId: Number(driverId) },
                ],
            },
            orderBy: {
                raceId: 'asc'
            },
            include: {
                driver: true,
                team: true,
                race: true
            }
        });

        return res.json(record);
    },
    //tương tự như selection year/team/all trên trang F1
    async findRecordTopTeamInYear(req: Request, res: Response) {

        const year = req.params.year;
        const record = await prisma.record.findMany({
            where: {
                year: year,
            },
            orderBy: {
                driverId: 'asc',
                // raceId: 'asc'
            },
            include: {
                team: true,
            }
        });


        interface Item {
            [key: string]: {
                teamName: string;
                totalPoint: number;
            };
        }

        const item: Item = {};

        for (const e of record) {
            const teamId = e.teamId;

            if (!item[teamId]) {
                item[teamId] = {
                    teamName: e.team.teamName,
                    totalPoint: 0,
                };
            }

            item[teamId].totalPoint += e.point;
        }

        const finallyRecord: any[] = Object.values(item).sort((a, b) => b.totalPoint - a.totalPoint);

        return res.json(finallyRecord);
    },

    async findRecordTeamInYear(req: Request, res: Response) {

        const { year, teamId } = req.params;
        const record = await prisma.record.findMany({
            where: {
                AND: [
                    { year: year },
                    { teamId: Number(teamId) },
                ],
            },
            orderBy: {
                // driverId: 'asc',
                raceId: 'asc'
            },
            include: {
                team: true,
                race: true
            }
        });

        interface Item {
            [key: string]: {
                raceName: string;
                totalPoint: number;
            };
        }

        const item: Item = {};

        for (const e of record) {
            const raceId = e.raceId;

            if (!item[raceId]) {
                item[raceId] = {
                    raceName: e.race.raceName,
                    totalPoint: 0,
                };
            }

            item[raceId].totalPoint += e.point;
        }

        const finallyRecord: any[] = Object.values(item).sort((a, b) => b.totalPoint - a.totalPoint);

        return res.json(finallyRecord);
    },
    //Tìm kiếm fastestLap như trang F1
    async findFastestLapInYear(req: Request, res: Response) {

        const { year } = req.params;
        const record = await prisma.record.findMany({
            where: {
                AND: [
                    { year: year },
                    { fastestLapRank: 1 },
                ],
            },
            orderBy: {
                raceId: 'asc'
            },
            include: {
                driver: true,
                team: true,
                race: true
            }
        });

        return res.json(record);
    },

    //optional
    async findSingleDriverResult(req: Request, res: Response) {

        const { year, raceId, driverId } = req.params;
        const record = await prisma.record.findMany({
            where: {
                AND: [
                    { year: year },
                    { raceId: Number(raceId) },
                    { driverId: Number(driverId) },
                ],
            },
            include: {
                driver: true,
                team: true,
                race: true
            }
        });

        return res.json(record);
    },

    async findDriverRankYearByYear(req: Request, res: Response) {

        const { driverId } = req.params;
        const { yearStart, yearEnd } = req.query;
        const yearStartDefault = 2022;
        const yearEndDefault = 2023;

        interface Result {
            year: string;
            positionInYear: number | string;
        }


        const array: Result[] = [];

        for (let i = yearStart ? Number(yearStart) : yearStartDefault; i <= (yearEnd ? Number(yearEnd) : yearEndDefault); i++) {
            const record = await prisma.record.findMany({
                where: {
                    year: i.toString(),
                },
                orderBy: {
                    driverId: 'asc',
                    // raceId: 'asc'
                },
                include: {
                    driver: true,
                    team: true,
                    race: true
                }
            });

            if (record.length) {

                interface Item {
                    [key: string]: {
                        driverId:number,
                        totalPoint: number,
                        driverName: string,
                        nation: string,
                        teamName: string,
                    };
                }

                const item: Item = {};

                for (const e of record) {
                    const driverId = e.driverId;

                    if (!item[driverId]) {
                        item[driverId] = {
                            driverId: driverId,
                            totalPoint: 0,
                            teamName: e.team.teamName,
                            nation: e.driver.nation,
                            driverName: e.driver.driverName
                        };
                    }

                    item[driverId].totalPoint += e.point;
                }

                const finallyRecord: any[] = Object.values(item).sort((a, b) => b.totalPoint - a.totalPoint);

                const positionInYear = finallyRecord.findIndex(item => item.driverId === Number(driverId));

                array.push({ year: i.toString(), positionInYear: positionInYear+1 });
            } else {
                array.push({ year: i.toString(), positionInYear: 'Không có dữ liệu' })
            }
        }

        return res.json(array);
    },

    async findTeamRankYearByYear(req: Request, res: Response) {

        const { teamId } = req.params;
        const { yearStart, yearEnd } = req.query;
        const yearStartDefault = 2022;
        const yearEndDefault = 2023;

        interface Result {
            year: string;
            positionTeamInYear: number | string;
        }


        const array: Result[] = [];

        for (let i = yearStart ? Number(yearStart) : yearStartDefault; i <= (yearEnd ? Number(yearEnd) : yearEndDefault); i++) {
            const record = await prisma.record.findMany({
                where: {
                    year: i.toString(),
                },
                orderBy: {
                    driverId: 'asc',
                    // raceId: 'asc'
                },
                include: {
                    team: true,
                }
            });

            if (record.length) {

                interface Item {
                    [key: string]: {
                        teamId:number;
                        teamName: string;
                        totalPoint: number;
                    };
                }
        
                const item: Item = {};
        
                for (const e of record) {
                    const teamId = e.teamId;
        
                    if (!item[teamId]) {
                        item[teamId] = {
                            teamId: teamId,
                            teamName: e.team.teamName,
                            totalPoint: 0,
                        };
                    }
        
                    item[teamId].totalPoint += e.point;
                }
        
                const finallyRecord: any[] = Object.values(item).sort((a, b) => b.totalPoint - a.totalPoint);

                const positionTeamInYear = finallyRecord.findIndex(item => item.teamId === Number(teamId));

                array.push({ year: i.toString(), positionTeamInYear: positionTeamInYear+1 });
            } else {
                array.push({ year: i.toString(), positionTeamInYear: 'Không có dữ liệu' })
            }
        }

        return res.json(array);
    },


}