
# Formular1API Hướng dẫn sử dụng
Công nghệ sử dụng: ExpressTs, PrismaORM, Sqlite

- 1.Chạy lệnh dưới đây để install các package cần thiết:
   ```sh
   npm install
   ```
- 2.Chạy lệnh để start server:
  
    ```sh
   npm run start:dev
   ```

- 3.Chạy lệnh dưới đây để start prisma Studio để xem dữ liệu trực quan hơn:
  
  ```sh
   npx prisma studio
   ```

# Hướng dẫn testAPI
TestApi: http://localhost:4444/api/record

Khi muốn test 1 api bất kì thì lấy TestApi+RoutesUrl

Dưới đây là các API routes:
- Lấy tất cả dữ liệu trong 1 năm và lấy ra bao nhiêu record bằng query + Thêm option ?size=Number với Number là con số mong muốn
  
routes.get("/year/:year/",recordController.findRecordAllInYear);

- Lấy dữ liệu top1 của các đường đua trong năm

routes.get("/year/:year/race-all",recordController.findRecordTopRaceInYear);

- Lấy dữ liệu đua của 1 đường đua trong năm

routes.get("/year/:year/race/:raceId",recordController.findRecordRaceInYear);

- Lấy dữ liệu xếp hạng của các tay đua trong năm

routes.get("/year/:year/driver-all",recordController.findRecordTopDriverInYear);

- Lấy dữ liệu của tay đua trong năm

routes.get("/year/:year/driver/:driverId",recordController.findRecordDriverInYear);

- Lấy dữ liệu xếp hạng của các team trong năm

routes.get("/year/:year/team-all",recordController.findRecordTopTeamInYear);

- Lấy dữ liệu của team trong năm

routes.get("/year/:year/team/:teamId",recordController.findRecordTeamInYear);

- Lấy dữ liệu ranking dhl fastest lap

routes.get("/fastest-lap/year/:year/",recordController.findFastestLapInYear);

# Optional API
- Lấy dữ liệu của 1 driver trong cuộc đua
routes.get("/year/:year/race/:raceId/driver/:driverId",recordController.findSingleDriverResult);

- Thức hạng driver qua từng năm ?yearStart=2020&yearEnd=2023 là 2 params

routes.get("/driver-rank-year-by-year/driver/:driverId/",recordController.findDriverRankYearByYear);

- Thức hạng Team qua từng năm ?yearStart=2020&yearEnd=2023 là 2 params

routes.get("/team-rank-year-by-year/team/:teamId/",recordController.findTeamRankYearByYear);

- API này để đẩy dữ liệu bao gồm driver team race

routes.post("/",recordController.createRecord);
# Lưu ý
Database được dùng là SQLite và được chạy ở thư mục prisma với tên devbit.db. Dữ liệu được lấy thông qua các API https://ergast.com/api/f1 nên dữ liệu sẽ có sự sai sót một số nơi

API chạy ở Port : 4444

# Liên hệ khi xảy ra trường hợp xấu
- Phone
     ```sh
   0906414132
   ```

