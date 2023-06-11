# Formular1API

# Hướng dẫn sử dụng

- 1.Chạy lệnh npm install để install các package cần thiết

- 2.Chạy lệnh npm run start:dev để start server

- 3.Chạy lệnh npx prisma studio để start prismaStudio để xem dữ liệu trực quan hơn
# Lưu ý
Database được dùng là SQLite và được chạy ở thư mục prisma với tên devbit.db.Dữ liệu được lấy thông qua các API https://ergast.com/api/f1  nên dữ liệu sẽ có sự sai sót một số nơi

Api chạy ở Port:4444
# Hướng dẫn testAPI
TestApi: http://localhost:4444/api/record

Dưới đây là các routes:
- //Lấy tất cả dữ liệu trong 1 năm và lấy ra bao nhiêu record

routes.get("/year/:year/size/:size",recordController.findRecordAllInYear);

- //Lấy dữ liệu top1 của các đường đua trong năm

routes.get("/year/:year/race-all",recordController.findRecordTopRaceInYear);

- //Lấy dữ liệu đua của 1 đường đua trong năm

routes.get("/year/:year/race/:raceId",recordController.findRecordRaceInYear);

- //Lấy dữ liệu xếp hạng của các tay đua trong năm

routes.get("/year/:year/driver-all",recordController.findRecordTopDriverInYear);

- //Lấy dữ liệu của tay đua trong năm

routes.get("/year/:year/driver/:driverId",recordController.findRecordDriverInYear);

- //Lấy dữ liệu xếp hạng của các team trong năm

routes.get("/year/:year/team-all",recordController.findRecordTopTeamInYear);

- //Lấy dữ liệu của team trong năm

routes.get("/year/:year/team/:teamId",recordController.findRecordTeamInYear);

- //Lấy dữ liệu của team trong năm

routes.get("/fastest-lap/year/:year/",recordController.findFastestLapInYear);

- //API này để đẩy dữ liệu bao gồm driver team race

routes.post("/",recordController.createRecord);

