
# Formular1API Hướng dẫn sử dụng
Công nghệ sử dụng: Express, TypeScript, PrismaORM, Sqlite.

Data được collect từ năm 2015->2023 .

- 1.Chạy lệnh dưới đây để install các package cần thiết:
   ```sh
   npm install
   ```
   hoặc
    ```sh
   yarn install
   ```
- 2.Chạy lệnh để start server:
  
    ```sh
   npm run start:dev
   ```
   hoặc
   ```sh
   yarn run start:dev
   ```

- 3.Chạy lệnh dưới đây để start prisma Studio để xem dữ liệu trực quan hơn:
  
  ```sh
   npx prisma studio
   ```

# Hướng dẫn testAPI
**TestApi**: http://localhost:4444/api/record

Khi muốn test 1 api bất kì thì lấy **TestApi**+**RoutesUrl**

### Dưới đây là các API routes:
- Lấy tất cả dữ liệu trong 1 năm và lấy ra bao nhiêu record bằng query + Thêm option ?size=Number với Number là con số mong muốn
  
- routes.get("/year/:year/",recordController.findRecordAllInYear);

***Ví dụ***
http://localhost:4444/api/record/year/2022/

- Lấy dữ liệu top1 của các đường đua trong năm

- routes.get("/year/:year/race-all",recordController.findRecordTopRaceInYear);

***Ví dụ***
http://localhost:4444/api/record/year/2022/race-all

- Lấy dữ liệu đua của 1 đường đua trong năm

- routes.get("/year/:year/race/:raceId",recordController.findRecordRaceInYear);

***Ví dụ***
http://localhost:4444/api/record/year/2022/race/1

- Lấy dữ liệu xếp hạng của các tay đua trong năm

- routes.get("/year/:year/driver-all",recordController.findRecordTopDriverInYear);

***Ví dụ***
http://localhost:4444/api/record/year/2022/driver-all

- Lấy dữ liệu của tay đua trong năm

- routes.get("/year/:year/driver/:driverId",recordController.findRecordDriverInYear);

***Ví dụ***
http://localhost:4444/api/record/year/2017/driver/2

- Lấy dữ liệu xếp hạng của các team trong năm

- routes.get("/year/:year/team-all",recordController.findRecordTopTeamInYear);

***Ví dụ***
http://localhost:4444/api/record/year/2017/team-all

- Lấy dữ liệu của team trong năm

- routes.get("/year/:year/team/:teamId",recordController.findRecordTeamInYear);

***Ví dụ***
http://localhost:4444/api/record/year/2017/team/1

- Lấy dữ liệu ranking dhl fastest lap

- routes.get("/fastest-lap/year/:year/",recordController.findFastestLapInYear);

***Ví dụ***
http://localhost:4444/api/record/fastest-lap/year/2020


### Optional API
- Lấy dữ liệu của 1 driver trong cuộc đua

- routes.get("/year/:year/race/:raceId/driver/:driverId",recordController.findSingleDriverResult);

***Ví dụ***:
http://localhost:4444/api/record/year/2020/race/8/driver/1

- Thức hạng driver qua từng năm ?yearStart=2020&yearEnd=2023 là 2 params, default 2022&2023

- routes.get("/driver-rank-year-by-year/driver/:driverId/",recordController.findDriverRankYearByYear);

***Ví dụ***:
http://localhost:4444/api/record/driver-rank-year-by-year/driver/1/

- Thức hạng Team qua từng năm ?yearStart=2020&yearEnd=2023 là 2 params, default 2022&2023

- routes.get("/team-rank-year-by-year/team/:teamId/",recordController.findTeamRankYearByYear);

***Ví dụ***:
http://localhost:4444/api/record/team-rank-year-by-year/team/1/?yearStart=2016&yearEnd=2023

- API này để đẩy dữ liệu bao gồm driver team race

- routes.post("/",recordController.createRecord);

***Ví dụ***:
http://localhost:4444/api/record/

# Lưu ý
Database được dùng là SQLite và được chạy ở thư mục prisma với tên devbit.db. Dữ liệu được lấy thông qua các API https://ergast.com/api/f1 nên dữ liệu sẽ có sự sai sót một số nơi

API chạy ở Port : 4444

# Liên hệ khi xảy ra trường hợp xấu
- Phone
     ```sh
   0906414132
   ```

