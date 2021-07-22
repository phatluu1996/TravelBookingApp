
--Acount Hotel
GO
INSERT INTO dbo.account ([password], [retired], [role], [user_name]) VALUES
('123456',0,'HOTEL','bachpham'),
('123456',0,'HOTEL','hoanguyen'),
('123456',0,'HOTEL','ngocle'),
('123456',0,'HOTEL','phatluu')

--Hotels
GO
INSERT INTO [dbo].[hotel]([contact_name],[contact_title],[create_date],[email],[hotel_name],[number_of_rooms],[phone],[retired],[standard],[account_id],[location_id])VALUES
('Phạm Xuân Bách','Giám Đốc ',17-7-2021,'bach@gmail.com','BaConSau',2,909909099,'FALSE',null,1,1),
('Lê Nguyễn Minh Ngọc','Giám Đốc ',17-7-2021,'ngoc@gmail.com','BonConSau',2,909909099,'FALSE',null,2,2),
('Nguyễn Vũ Hoàng Hóa','Giám Đốc ',17-7-2021,'hoa@gmail.com','NamConSau',2,909909099,'FALSE',null,3,3),
('Lưu Trọng Phát','Giám Đốc ',17-7-2021,'phat@gmail.com','SauConSau',2,909909099,'FALSE',null,4,4)
--Room Of Hotel
GO
INSERT INTO [dbo].[room]([amount],[extra_bed],[max_adult],[max_children],[retired],[room_status],[room_type],[special_conditions],[booking_hotel_detail_id],[hotel_id],[hotel_booking_id])VALUES
(20,'TRUE',2,2,'FALSE',1,1,'Khong Hut Thuoc',null,1,null),
(21,'FALSE',3,3,'FALSE',1,2,'Khong Hut Thuoc',null,1,null),
(20,'FALSE',3,2,'FALSE',1,1,'Khong Hut Thuoc',null,2,null),
(25,'TRUE',2,2,'FALSE',1,2,'Khong Hut Thuoc',null,2,null),
(20,'FALSE',3,2,'FALSE',1,1,'Khong Hut Thuoc',null,3,null),
(30,'FALSE',2,2,'FALSE',1,2,'Khong Hut Thuoc',null,3,null),
(20,'FALSE',3,2,'FALSE',1,1,'Khong Hut Thuoc',null,4,null),
(30,'FALSE',2,2,'FALSE',1,2,'Khong Hut Thuoc',null,4,null)