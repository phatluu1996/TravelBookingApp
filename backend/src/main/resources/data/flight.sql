
go
INSERT INTO dbo.account ([password], [retired], [role], [user_name]) VALUES
('vj12345',0,1,'vietjet'),
('vn12345',0,1,'vietnamairline'),
('bb12345',0,1,'bamboo'),
('js12345',0,1,'jetstar'),
('viettravel',0,1,'viettravel')

go
INSERT INTO dbo.location ([postal_code],[province_id],[district_id],[ward_id],[street],[retired]) VALUES
('70000', 2, 25, 334,'302/3 Phố Kim Mã',0),
('70000', 2, 39, 598, '200 Nguyễn Sơn',0),
('70000', 2, 28, 385, 'Tầng 22, 265 Cầu Giấy',0),
('70000', 1, 22, 296, 'Tầng 3, Tòa nhà VietNam Airlines, Sân bay Tân Sơn Nhất',0),
('70000', 1, 15, 202, '190 Pasteur',0)

go
INSERT INTO dbo.airline ([airline_name],[contact_name],[contact_title],
[email],[fax],[homepage],[created_at],[image],[mobile],[phone],
[status],[retired],[account_id],[location_id]) VALUES
('VietJet Air','Ms. Nguyễn Thị Hương','Đại diện hãng','huong@vietjet.test.com','19001886','https://www.vietjetair.com/vi','','',
'0998126771','19001886',0,0,1,1),
('Vietname Airlines','Mr. Ngô Thành Nam','Đại diện hãng','nam@vna.test.com','+84 2438320320','https://www.vietnamairlines.com/vn/vi/Home','','',
'0901489199','1900 1100',0,0,2,2),
('Bamboo Airways','Ms. Lê Hoàng Minh Thư','Đại diện hãng','thu@bamboo.test.com','033 8282525','https://www.bambooairways.com/vn-vi/','','',
'0903334445','19001166',0,0,3,3),
('JetStar Pacific','Ms. Hoàng Mai Anh','Đại diện hãng','maianh@js.test.com','+8428.35474515','https://www.jetstar.com/','','',
'0903314343','+8428.36280058',0,0,4,4),
('VietTravel Airlines','Mr. Trương Thành Công','Đại diện hãng','cong@vtv.test.com','(84-28) 38299142','https://www.vietravel.com/','','',
'0831123314','(84-28) 38668999',0,0,5,5)

go 
INSERT INTO dbo.flight([airline_id],[flight_code],[retired],[status],[description],
[business_capacity],[business_price],[economy_capacity],[economy_price],[child_price],[infant_price],
[departure_city],[departure_time],[arrival_city],[arrival_time],[date_of_departure]) VALUES
('1','VJ-146',0,'Available','Hạng thương gia 20kgs, Hạng Phổ thông: Không Hành lý, Airbus A320, Hàng ghế 3-3',6,122,168,50,30,10,'SGN','20:15','HAN','22:20',''),
('1','VJ-160',0,'Available','Hạng thương gia 20kgs, Hạng Phổ thông: Không Hành lý, Airbus A321, Hàng ghế 3-3',6,120,160,55,30,10,'SGN','21:20','HAN','23:35',''),
('1','VJ-170',0,'Available','Hạng thương gia 20kgs, Hạng Phổ thông: Không Hành lý, Airbus A321, Hàng ghế 3-3',6,110,168,48,30,10,'SGN','22:15','HAN','00:25',''),
('1','VJ-126',0,'Available','Hạng thương gia 20kgs, Hạng Phổ thông: Không Hành lý, Airbus A320, Hàng ghế 3-3',6,130,160,60,30,10,'SGN','10:10','HAN','12:20',''),
('1','VJ-128',0,'Available','Hạng thương gia 20kgs, Hạng Phổ thông: Không Hành lý, Airbus A321, Hàng ghế 3-3',6,140,160,56,30,10,'SGN','10:55','HAN','13:00',''),
('1','VJ-130',0,'Available','Hạng thương gia 20kgs, Hạng Phổ thông: Không Hành lý, Airbus A321, Hàng ghế 3-3',6,132,160,52,30,10,'SGN','11:05','HAN','13:40',''),
('1','VJ-150',0,'Available','Hạng thương gia 20kgs, Hạng Phổ thông: Không Hành lý, Airbus A321, Hàng ghế 3-3',6,136,168,65,30,10,'SGN','12:45','HAN','14:55',''),
('1','VJ-136',0,'Available','Hạng thương gia 20kgs, Hạng Phổ thông: Không Hành lý, Airbus A321, Hàng ghế 3-3',6,132,168,52,30,10,'SGN','14:05','HAN','16:10',''),
('1','VJ-152',0,'Available','Hạng thương gia 20kgs, Hạng Phổ thông: Không Hành lý, Airbus A321, Hàng ghế 3-3',6,136,168,60,30,10,'SGN','15:10','HAN','17:15',''),
('1','VJ-138',0,'Available','Hạng thương gia 20kgs, Hạng Phổ thông: Không Hành lý, Airbus A321, Hàng ghế 3-3',6,140,168,65,30,10,'SGN','15:40','HAN','18:00',''),
('1','VJ-162',0,'Available','Hạng thương gia 20kgs, Hạng Phổ thông: Không Hành lý, Airbus A321, Hàng ghế 3-3',6,135,160,60,30,10,'SGN','16:35','HAN','18:40',''),
('1','VJ-158',0,'Available','Hạng thương gia 20kgs, Hạng Phổ thông: Không Hành lý, Airbus A320, Hàng ghế 3-3',6,132,168,58,30,10,'SGN','18:15','HAN','20:25',''),
('2','VN-6024',0,'Codeshare','Hạng thương gia 30kgs, Hạng Phổ thông: Không Hành lý, Hành lý xách tay 7kg, Khai thác bởi Pacific, Airbus A320, Hàng ghế 3-3',6,102,158,40,20,10,'SGN','21:30','HAN','23:25',''),
('2','VN-6010',0,'Codeshare','Khai thác bởi Pacific, Hạng thương gia 30kgs, Hạng Phổ thông: Không Hành lý, Hành lý xách tay 7kg, Airbus A320, Hàng ghế 3-3',6,102,158,42,20,10,'SGN','10:30','HAN','12:45',''),
('2','VN-6012',0,'Codeshare','Khai thác bởi Pacific, Hạng thương gia 30kgs, Hạng Phổ thông: Không Hành lý, Hành lý xách tay 7kg, Màn hình giải trí trên máy bay, Airbus A320, Hàng ghế 3-3',6,102,158,48,20,10,'SGN','12:35','HAN','15:10',''),
('2','VN-6010',0,'Codeshare','Khai thác bởi Pacific, Hạng thương gia 30kgs, Hạng Phổ thông: Không Hành lý, Hành lý xách tay 7kg, Airbus A320, Hàng ghế 3-3',6,102,158,42,20,10,'SGN','10:30','HAN','12:45',''),
('2','VN-6012',0,'Codeshare','Khai thác bởi Pacific, Hạng thương gia 30kgs, Hạng Phổ thông: Không Hành lý, Hành lý xách tay 7kg, Airbus A320, Hàng ghế 3-3',6,102,158,42,20,10,'SGN','12:35','HAN','15:10',''),
('2','VN-6014',0,'Codeshare','Khai thác bởi Pacific, Hạng thương gia 30kgs, Hạng Phổ thông: Không Hành lý, Hành lý xách tay 7kg, Airbus A320, Hàng ghế 3-3',6,102,158,42,20,10,'SGN','14:40','HAN','17:00',''),
('2','VN-6016',0,'Codeshare','Khai thác bởi Pacific, Hạng thương gia 30kgs, Hạng Phổ thông: Không Hành lý, Hành lý xách tay 7kg, Airbus A320, Hàng ghế 3-3',6,102,158,42,20,10,'SGN','16:15','HAN','18:35',''),
('2','VN-6022',0,'Codeshare','Khai thác bởi Pacific, Hạng thương gia 30kgs, Hạng Phổ thông: Không Hành lý, Hành lý xách tay 7kg, Airbus A320, Hàng ghế 3-3',6,102,158,42,20,10,'SGN','20:30','HAN','22:55',''),
('5','VU-780',0,'Available','Hành lý mua tại thời điểm đặt vé, Hành lý xách tay 7kgs, Airbus A321, Hàng ghế 3-3',6,100,168,43,35,10,'SGN','17:55','HAN','19:55',''),
('5','VU-750',0,'Available','Hành lý mua tại thời điểm đặt vé, Hành lý xách tay 7kgs, Airbus A321, Hàng ghế 3-3',6,100,168,44,35,10,'SGN','09:15','HAN','11:25',''),
('4','QH-280',0,'Available','Hành lý 20 kgs, Hành lý xách tay 7kgs, Màn hình giải trí trên máy bay, Airbus A321, Hàng ghế 3-3',6,110,160,48,32,10,'SGN','21:00','HAN','23:10',''),
('4','QH-244',0,'Available','Hành lý 20 kgs, Hành lý xách tay 7kgs, Màn hình giải trí trên máy bay, Airbus A321, Hàng ghế 3-3',6,110,160,52,32,10,'SGN','17:10','HAN','19:20',''),
('1','VJ-176',0,'Available','Hạng thương gia 20kgs, Hạng Phổ thông: Không Hành lý, Airbus A321, Hàng ghế 3-3',6,140,160,62,30,10,'SGN','05:25','HAN','07:35',''),
('1','VJ-120',0,'Available','Hạng thương gia 20kgs, Hạng Phổ thông: Không Hành lý, Airbus A321, Hàng ghế 3-3',6,140,160,62,30,10,'SGN','06:00','HAN','08:10',''),
('1','VJ-134',0,'Available','Hạng thương gia 20kgs, Hạng Phổ thông: Không Hành lý, Airbus A321, Hàng ghế 3-3',6,140,160,62,30,10,'SGN','07:00','HAN','09:10',''),
('1','VJ-124',0,'Available','Hạng thương gia 20kgs, Hạng Phổ thông: Không Hành lý, Airbus A321, Hàng ghế 3-3',6,140,160,64,30,10,'SGN','07:30','HAN','09:40',''),
('1','VJ-166',0,'Available','Hạng thương gia 20kgs, Hạng Phổ thông: Không Hành lý, Airbus A321, Hàng ghế 3-3',6,140,160,62,30,10,'SGN','08:40','HAN','11:00',''),
('4','QH-224',0,'Available','Hành lý 20 kgs, Hành lý xách tay 7kgs, Màn hình giải trí trên máy bay, Airbus A321, Hàng ghế 3-3',6,110,160,56,32,10,'SGN','10:50','HAN','13:00',''),
('4','QH-240',0,'Available','Hành lý 20 kgs, Hành lý xách tay 7kgs, Màn hình giải trí trên máy bay, Airbus A321, Hàng ghế 3-3',6,110,160,56,32,10,'SGN','13:25','HAN','15:25',''),
('2','VN-7290',0,'Available','Hạng thương gia 30kgs, Hạng Phổ thông: 0kg, Hành lý xách tay 12kg, Màn hình giải trí trên máy bay',12,200,168,70,50,20,'SGN','21:45','HAN','23:55',''),
('2','VN-224',0,'Available','Hạng thương gia 30kgs, Hạng Phổ thông: 0kg, Bữa ăn nhẹ, Hành lý xách tay 12kg, Màn hình giải trí trên máy bay',12,200,168,70,50,20,'SGN','22:00','HAN','00:10',''),
('2','VN-250',0,'Available','Hạng thương gia 30kgs, Hạng Phổ thông: 0kg, Hành lý xách tay 12kg, Màn hình giải trí trên máy bay',12,200,168,70,50,20,'SGN','05:00','HAN','07:10',''),
('2','VN-7254',0,'Available','Hạng thương gia 30kgs, Hạng Phổ thông: 0kg, Hành lý xách tay 12kg, Bữa ăn nhẹ, Màn hình giải trí trên máy bay, Airbus A321, Hàng ghế 3-3',12,200,168,72,50,20,'SGN','05:40','HAN','07:50',''),
('2','VN-206',0,'Available','Hạng thương gia 30kgs, Hạng Phổ thông: 0kg, Hành lý xách tay 12kg, Bữa ăn nhẹ, Màn hình giải trí trên máy bay',12,200,168,72,50,20,'SGN','06:00','HAN','08:10',''),
('2','VN-242',0,'Available','Hạng thương gia 30kgs, Hạng Phổ thông: 0kg, Hành lý xách tay 12kg, Ổ cắm USB, Bữa ăn nhẹ, Màn hình giải trí trên máy bay',12,200,168,72,50,20,'SGN','07:00','HAN','09:10',''),
('2','VN-208',0,'Available','Hạng thương gia 30kgs, Hạng Phổ thông: 0kg, Hành lý xách tay 12kg, Bữa ăn nhẹ, Màn hình giải trí trên máy bay, Airbus A321, Hàng ghế 3-3',12,200,168,72,50,20,'SGN','08:00','HAN','10:10',''),
('2','VN-248',0,'Available','Hạng thương gia 30kgs, Hạng Phổ thông: 0kg, Hành lý xách tay 12kg, Màn hình giải trí trên máy bay, Airbus A321, Hàng ghế 3-3',12,200,168,72,50,20,'SGN','09:00','HAN','11:10',''),
('2','VN-210',0,'Available','Hạng thương gia 30kgs, Hạng Phổ thông: 0kg, Hành lý xách tay 12kg, Màn hình giải trí trên máy bay, Airbus A321, Hàng ghế 3-3',12,200,168,72,50,20,'SGN','10:00','HAN','12:10',''),
('2','VN-254',0,'Available','Hạng thương gia 30kgs, Hạng Phổ thông: 0kg, Hành lý xách tay 12kg, Bữa ăn nhẹ, Màn hình giải trí trên máy bay, Airbus A321, Hàng ghế 3-3',12,200,168,72,50,20,'SGN','11:00','HAN','13:10',''),
('2','VN-212',0,'Available','Hạng thương gia 30kgs, Hạng Phổ thông: 0kg, Hành lý xách tay 12kg, Bữa ăn nhẹ, Màn hình giải trí trên máy bay, Airbus A321, Hàng ghế 3-3',12,200,168,72,50,20,'SGN','12:00','HAN','14:10',''),
('2','VN-260',0,'Available','Hạng thương gia 30kgs, Hạng Phổ thông: 0kg, Hành lý xách tay 12kg, Màn hình giải trí trên máy bay, Airbus A321, Hàng ghế 3-3',12,200,168,72,50,20,'SGN','13:00','HAN','15:10',''),
('2','VN-214',0,'Available','Hạng thương gia 30kgs, Hạng Phổ thông: 0kg, Hành lý xách tay 12kg, Màn hình giải trí trên máy bay',12,200,168,72,50,20,'SGN','14:00','HAN','16:10',''),
('2','VN-266',0,'Available','Hạng thương gia 30kgs, Hạng Phổ thông: 0kg, Hành lý xách tay 12kg, Ổ cắm USB, Bữa ăn nhẹ, Màn hình giải trí trên máy bay',12,200,168,72,50,20,'SGN','15:00','HAN','17:10',''),
('2','VN-216',0,'Available','Hạng thương gia 30kgs, Hạng Phổ thông: 0kg, Hành lý xách tay 12kg, Ổ cắm USB, Bữa ăn nhẹ, Màn hình giải trí trên máy bay',12,200,168,72,50,20,'SGN','16:00','HAN','18:10',''),
('2','VN-272',0,'Available','Hạng thương gia 30kgs, Hạng Phổ thông: 0kg, Hành lý xách tay 12kg, Ổ cắm USB, Bữa ăn nhẹ, Màn hình giải trí trên máy bay',12,200,168,72,50,20,'SGN','17:00','HAN','19:10',''),
('2','VN-218',0,'Available','Hạng thương gia 30kgs, Hạng Phổ thông: 0kg, Hành lý xách tay 12kg, Bữa ăn nhẹ, Màn hình giải trí trên máy bay',12,200,168,72,50,20,'SGN','18:00','HAN','20:10',''),
('2','VN-280',0,'Available','Hạng thương gia 30kgs, Hạng Phổ thông: 0kg, Hành lý xách tay 12kg, Màn hình giải trí trên máy bay',12,200,168,72,50,20,'SGN','19:00','HAN','21:10',''),
('2','VN-220',0,'Available','Hạng thương gia 30kgs, Hạng Phổ thông: 0kg, Hành lý xách tay 12kg, Bữa ăn nhẹ, Màn hình giải trí trên máy bay, Airbus A321, Hàng ghế 3-3',12,200,168,72,50,20,'SGN','20:00','HAN','22:10',''),
('2','VN-286',0,'Available','Hạng thương gia 30kgs, Hạng Phổ thông: 0kg, Hành lý xách tay 12kg, Bữa ăn nhẹ, Màn hình giải trí trên máy bay, Airbus A321, Hàng ghế 3-3',12,200,168,72,50,20,'SGN','21:00','HAN','23:10',''),
('2','VN-6023',0,'Codeshare','Khai thác bởi Pacific, Hạng thương gia 30kgs, Hạng Phổ thông: Không Hành lý, Hành lý xách tay 7kg, Airbus A320, Hàng ghế 3-3',6,102,158,43,20,10,'HAN','22:15','SGN','00:15',''),
('2','VN-6003',0,'Codeshare','Khai thác bởi Pacific, Hạng thương gia 30kgs, Hạng Phổ thông: Không Hành lý, Hành lý xách tay 7kg, Airbus A320, Hàng ghế 3-3',6,102,158,43,20,10,'HAN','06:20','SGN','08:55',''),
('2','VN-6009',0,'Codeshare','Khai thác bởi Pacific, Hạng thương gia 30kgs, Hạng Phổ thông: Không Hành lý, Hành lý xách tay 7kg, Airbus A320, Hàng ghế 3-3',6,102,158,43,20,10,'HAN','08:30','SGN','10:45',''),
('2','VN-6005',0,'Codeshare','Khai thác bởi Pacific, Hạng thương gia 30kgs, Hạng Phổ thông: Không Hành lý, Hành lý xách tay 7kg, Airbus A320, Hàng ghế 3-3',6,102,158,43,20,10,'HAN','09:35','SGN','12:05',''),
('2','VN-6019',0,'Codeshare','Khai thác bởi Pacific, Hạng thương gia 30kgs, Hạng Phổ thông: Không Hành lý, Hành lý xách tay 7kg, Airbus A320, Hàng ghế 3-3',6,102,158,43,20,10,'HAN','15:40','SGN','17:45',''),
('2','VN-6017',0,'Codeshare','Khai thác bởi Pacific, Hạng thương gia 30kgs, Hạng Phổ thông: Không Hành lý, Hành lý xách tay 7kg, Airbus A320, Hàng ghế 3-3',6,102,158,43,20,10,'HAN','17:40','SGN','19:45',''),
('2','VN-6019',0,'Codeshare','Khai thác bởi Pacific, Hạng thương gia 30kgs, Hạng Phổ thông: Không Hành lý, Hành lý xách tay 7kg, Airbus A320, Hàng ghế 3-3',6,102,158,43,20,10,'HAN','19:25','SGN','21:45',''),
('2','VN-6021',0,'Codeshare','Khai thác bởi Pacific, Hạng thương gia 30kgs, Hạng Phổ thông: Không Hành lý, Hành lý xách tay 7kg, Airbus A320, Hàng ghế 3-3',6,102,158,43,20,10,'HAN','21:25','SGN','23:30',''),
('5','VU-751',0,'Available','Hành lý mua tại thời điểm đặt vé, Hành lý xách tay 7kgs, Airbus A321, Hàng ghế 3-3',6,100,168,44,35,10,'HAN','05:55','SGN','08:10',''),
('1','VJ-149',0,'Available','Hạng thương gia 20kgs, Hạng Phổ thông: Không Hành lý, Airbus A321, Hàng ghế 3-3',6,136,168,45,30,10,'HAN','22:50','SGN','01:00',''),
('4','QH-225',0,'Available','Hành lý 20 kgs, Hành lý xách tay 7kgs, Màn hình giải trí trên máy bay, Airbus A321, Hàng ghế 3-3',6,110,160,48,32,10,'HAN','20:45','SGN','22:55',''),
('1','VJ-151',0,'Available','Hạng thương gia 20kgs, Hạng Phổ thông: Không Hành lý, Airbus A321, Hàng ghế 3-3',6,136,168,49,30,10,'HAN','21:00','SGN','23:10',''),
('1','VJ-163',0,'Available','Hạng thương gia 20kgs, Hạng Phổ thông: Không Hành lý, Airbus A321, Hàng ghế 3-3',6,136,168,49,30,10,'HAN','21:35','SGN','23:40',''),
('1','VJ-159',0,'Available','Hạng thương gia 20kgs, Hạng Phổ thông: Không Hành lý, Airbus A321, Hàng ghế 3-3',6,136,168,49,30,10,'HAN','22:35','SGN','00:45',''),
('1','VJ-137',0,'Available','Hạng thương gia 20kgs, Hạng Phổ thông: Không Hành lý, Airbus A321, Hàng ghế 3-3',6,136,168,50,30,10,'HAN','09:45','SGN','11:55',''),
('1','VJ-133',0,'Available','Hạng thương gia 20kgs, Hạng Phổ thông: Không Hành lý, Airbus A321, Hàng ghế 3-3',6,136,168,50,30,10,'HAN','10:15','SGN','12:25',''),
('1','VJ-121',0,'Available','Hạng thương gia 20kgs, Hạng Phổ thông: Không Hành lý, Airbus A321, Hàng ghế 3-3',6,136,168,50,30,10,'HAN','12:20','SGN','14:30',''),
('1','VJ-139',0,'Available','Hạng thương gia 20kgs, Hạng Phổ thông: Không Hành lý, Airbus A321, Hàng ghế 3-3',6,136,168,50,30,10,'HAN','12:55','SGN','15:05',''),
('1','VJ-141',0,'Available','Hạng thương gia 20kgs, Hạng Phổ thông: Không Hành lý, Airbus A321, Hàng ghế 3-3',6,136,168,50,30,10,'HAN','13:50','SGN','15:40',''),
('1','VJ-165',0,'Available','Hạng thương gia 20kgs, Hạng Phổ thông: Không Hành lý, Airbus A321, Hàng ghế 3-3',6,136,168,50,30,10,'HAN','14:55','SGN','17:20',''),
('1','VJ-167',0,'Available','Hạng thương gia 20kgs, Hạng Phổ thông: Không Hành lý, Airbus A321, Hàng ghế 3-3',6,136,168,50,30,10,'HAN','15:30','SGN','17:35',''),
('1','VJ-189',0,'Available','Hạng thương gia 20kgs, Hạng Phổ thông: Không Hành lý, Airbus A321, Hàng ghế 3-3',6,136,168,50,30,10,'HAN','16:15','SGN','18:25',''),
('1','VJ-143',0,'Available','Hạng thương gia 20kgs, Hạng Phổ thông: Không Hành lý, Airbus A321, Hàng ghế 3-3',6,136,168,50,30,10,'HAN','18:25','SGN','20:35',''),
('1','VJ-155',0,'Available','Hạng thương gia 20kgs, Hạng Phổ thông: Không Hành lý, Airbus A321, Hàng ghế 3-3',6,136,168,50,30,10,'HAN','19:20','SGN','21:30',''),
('4','QH-243',0,'Available','Hành lý 20 kgs, Hành lý xách tay 7kgs, Màn hình giải trí trên máy bay, Airbus A321, Hàng ghế 3-3',6,110,160,52,32,10,'HAN','16:40','SGN','18:50',''),
('1','VJ-125',0,'Available','Hạng thương gia 20kgs, Hạng Phổ thông: Không Hành lý, Airbus A321, Hàng ghế 3-3',6,136,168,52,30,10,'HAN','06:00','SGN','08:10',''),
('1','VJ-155',0,'Available','Hạng thương gia 20kgs, Hạng Phổ thông: Không Hành lý, Airbus A321, Hàng ghế 3-3',6,136,168,52,30,10,'HAN','06:45','SGN','09:00',''),
('1','VJ-147',0,'Available','Hạng thương gia 20kgs, Hạng Phổ thông: Không Hành lý, Airbus A321, Hàng ghế 3-3',6,136,168,52,30,10,'HAN','07:45','SGN','09:50',''),
('1','VJ-131',0,'Available','Hạng thương gia 20kgs, Hạng Phổ thông: Không Hành lý, Airbus A321, Hàng ghế 3-3',6,136,168,52,30,10,'HAN','08:10','SGN','10:20',''),
('1','VJ-129',0,'Available','Hạng thương gia 20kgs, Hạng Phổ thông: Không Hành lý, Airbus A321, Hàng ghế 3-3',6,136,168,52,30,10,'HAN','08:15','SGN','10:20',''),
('1','VJ-153',0,'Available','Hạng thương gia 20kgs, Hạng Phổ thông: Không Hành lý, Airbus A321, Hàng ghế 3-3',6,136,168,52,30,10,'HAN','08:50','SGN','11:10',''),
('1','VJ-123',0,'Available','Hạng thương gia 20kgs, Hạng Phổ thông: Không Hành lý, Airbus A321, Hàng ghế 3-3',6,136,168,52,30,10,'HAN','09:30','SGN','11:45',''),
('4','QH-203',0,'Available','Hành lý 20 kgs, Hành lý xách tay 7kgs, Màn hình giải trí trên máy bay, Airbus A321, Hàng ghế 3-3',6,110,160,53,32,10,'HAN','07:50','SGN','10:00',''),
('4','QH-211',0,'Available','Hành lý 20 kgs, Hành lý xách tay 7kgs, Màn hình giải trí trên máy bay, Airbus A321, Hàng ghế 3-3',6,110,160,53,32,10,'HAN','10:05','SGN','12:15',''),
('4','QH-241',0,'Available','Hành lý 20 kgs, Hành lý xách tay 7kgs, Màn hình giải trí trên máy bay, Airbus A321, Hàng ghế 3-3',6,110,160,53,32,10,'HAN','14:10','SGN','16:15',''),
('2','VN-245',0,'Available','Hạng thương gia 30kgs, Hạng Phổ thông: 0kg, Hành lý xách tay 12kg, Airbus A321, Hàng ghế 3-3',12,200,168,60,50,20,'HAN','06:00','SGN','08:15',''),
('2','VN-207',0,'Available','Hạng thương gia 30kgs, Hạng Phổ thông: 0kg, Hành lý xách tay 12kg, Màn hình giải trí trên máy bay, Airbus A321, Hàng ghế 3-3',12,200,168,60,50,20,'HAN','07:00','SGN','09:15',''),
('2','VN-243',0,'Available','Hạng thương gia 30kgs, Hạng Phổ thông: 0kg, Hành lý xách tay 12kg, Ổ cắm USB, Bữa ăn nhẹ, Màn hình giải trí trên máy bay',12,200,168,60,50,20,'HAN','08:00','SGN','10:15',''),
('2','VN-209',0,'Available','Hạng thương gia 30kgs, Hạng Phổ thông: 0kg, Hành lý xách tay 12kg, Bữa ăn nhẹ, Màn hình giải trí trên máy bay',12,200,168,60,50,20,'HAN','09:00','SGN','11:15',''),
('2','VN-251',0,'Available','Hạng thương gia 30kgs, Hạng Phổ thông: 0kg, Hành lý xách tay 12kg',12,200,168,60,50,20,'HAN','10:00','SGN','12:15',''),
('2','VN-211',0,'Available','Hạng thương gia 30kgs, Hạng Phổ thông: 0kg, Hành lý xách tay 12kg, Bữa ăn nhẹ, Màn hình giải trí trên máy bay',12,200,168,60,50,20,'HAN','11:00','SGN','13:15',''),
('2','VN-257',0,'Available','Hạng thương gia 30kgs, Hạng Phổ thông: 0kg, Hành lý xách tay 12kg, Ổ cắm USB, Bữa ăn nhẹ, Màn hình giải trí trên máy bay',12,200,168,60,50,20,'HAN','12:00','SGN','14:15',''),
('2','VN-213',0,'Available','Hạng thương gia 30kgs, Hạng Phổ thông: 0kg, Hành lý xách tay 12kg, Màn hình giải trí trên máy bay',12,200,168,60,50,20,'HAN','13:00','SGN','15:15',''),
('2','VN-263',0,'Available','Hạng thương gia 30kgs, Hạng Phổ thông: 0kg, Hành lý xách tay 12kg, Ổ cắm USB, Bữa ăn nhẹ, Màn hình giải trí trên máy bay',12,200,168,60,50,20,'HAN','14:00','SGN','16:15',''),
('2','VN-215',0,'Available','Hạng thương gia 30kgs, Hạng Phổ thông: 0kg, Hành lý xách tay 12kg, Bữa ăn nhẹ, Màn hình giải trí trên máy bay',12,200,168,60,50,20,'HAN','15:00','SGN','17:15',''),
('2','VN-7211',0,'Available','Hạng thương gia 30kgs, Hạng Phổ thông: 0kg, Hành lý xách tay 12kg, Ổ cắm USB, Bữa ăn nhẹ, Màn hình giải trí trên máy bay',12,200,168,60,50,20,'HAN','15:20','SGN','17:35',''),
('2','VN-269',0,'Available','Hạng thương gia 30kgs, Hạng Phổ thông: 0kg, Hành lý xách tay 12kg, Ổ cắm USB, Bữa ăn nhẹ, Màn hình giải trí trên máy bay',12,200,168,60,50,20,'HAN','16:00','SGN','18:15',''),
('2','VN-217',0,'Available','Hạng thương gia 30kgs, Hạng Phổ thông: 0kg, Hành lý xách tay 12kg, Bữa ăn nhẹ, Màn hình giải trí trên máy bay',12,200,168,60,50,20,'HAN','17:00','SGN','19:15',''),
('2','VN-275',0,'Available','Hạng thương gia 30kgs, Hạng Phổ thông: 0kg, Hành lý xách tay 12kg, Ổ cắm USB, Bữa ăn nhẹ, Màn hình giải trí trên máy bay',12,200,168,60,50,20,'HAN','18:00','SGN','20:15',''),
('2','VN-7291',0,'Available','Hạng thương gia 30kgs, Hạng Phổ thông: 0kg, Hành lý xách tay 12kg, Màn hình giải trí trên máy bay',12,200,168,60,50,20,'HAN','18:40','SGN','20:55',''),
('2','VN-219',0,'Available','Hạng thương gia 30kgs, Hạng Phổ thông: 0kg, Hành lý xách tay 12kg, Bữa ăn nhẹ, Màn hình giải trí trên máy bay',12,200,168,60,50,20,'HAN','19:00','SGN','21:15',''),
('2','VN-7255',0,'Available','Hạng thương gia 30kgs, Hạng Phổ thông: 0kg, Hành lý xách tay 12kg, Bữa ăn nhẹ, Màn hình giải trí trên máy bay',12,200,168,60,50,20,'HAN','19:50','SGN','22:05',''),
('2','VN-283',0,'Available','Hạng thương gia 30kgs, Hạng Phổ thông: 0kg, Hành lý xách tay 12kg, Ổ cắm USB, Bữa ăn nhẹ, Màn hình giải trí trên máy bay',12,200,168,60,50,20,'HAN','20:00','SGN','22:15',''),
('2','VN-221',0,'Available','Hạng thương gia 30kgs, Hạng Phổ thông: 0kg, Hành lý xách tay 12kg, Màn hình giải trí trên máy bay',12,200,168,60,50,20,'HAN','21:00','SGN','23:15',''),
('2','VN-253',0,'Available','Hạng thương gia 30kgs, Hạng Phổ thông: 0kg, Hành lý xách tay 12kg, Ổ cắm USB, Bữa ăn nhẹ, Màn hình giải trí trên máy bay',12,200,168,60,50,20,'HAN','22:00','SGN','00:15',''),
('5','VU-787',0,'Available','Hành lý mua tại thời điểm đặt vé, Hành lý xách tay 7kgs, Airbus A321, Hàng ghế 3-3',6,100,168,62,35,10,'HAN','20:55','SGN','23:25',''),


('5','VU-672',0,'Available','Hành lý mua tại thời điểm đặt vé, Hành lý xách tay 7kgs, Airbus A321, Hàng ghế 3-3',6,90,168,30,20,10,'SGN','07:35','DAD','08:55',''),
('1','VJ-650',0,'Available','Hạng thương gia 20kgs, Hạng Phổ thông: Không Hành lý, Hành lý xách tay 7kgs, Airbus A321, Hàng ghế 3-3',6,110,160,31,20,10,'SGN','21:10','DAD','22:30',''),
('1','VJ-620',0,'Available','Hạng thương gia 20kgs, Hạng Phổ thông: Không Hành lý, Hành lý xách tay 7kgs, Airbus A321, Hàng ghế 3-3',6,110,160,32,20,10,'SGN','13:15','DAD','14:35',''),
('1','VJ-654',0,'Available','Hạng thương gia 20kgs, Hạng Phổ thông: Không Hành lý, Hành lý xách tay 7kgs, Airbus A321, Hàng ghế 3-3',6,110,160,32,20,10,'SGN','14:45','DAD','16:10',''),
('1','VJ-630',0,'Available','Hạng thương gia 20kgs, Hạng Phổ thông: Không Hành lý, Hành lý xách tay 7kgs, Airbus A321, Hàng ghế 3-3',6,110,160,32,20,10,'SGN','15:10','DAD','16:30',''),
('1','VJ-632',0,'Available','Hạng thương gia 20kgs, Hạng Phổ thông: Không Hành lý, Hành lý xách tay 7kgs, Airbus A321, Hàng ghế 3-3',6,110,160,32,20,10,'SGN','15:35','DAD','17:00',''),
('1','VJ-626',0,'Available','Hạng thương gia 20kgs, Hạng Phổ thông: Không Hành lý, Hành lý xách tay 7kgs, Airbus A321, Hàng ghế 3-3',6,110,160,32,20,10,'SGN','18:30','DAD','19:50',''),
('1','VJ-656',0,'Available','Hạng thương gia 20kgs, Hạng Phổ thông: Không Hành lý, Hành lý xách tay 7kgs, Airbus A321, Hàng ghế 3-3',6,110,160,32,20,10,'SGN','19:25','DAD','20:45',''),
('1','VJ-638',0,'Available','Hạng thương gia 20kgs, Hạng Phổ thông: Không Hành lý, Hành lý xách tay 7kgs, Airbus A321, Hàng ghế 3-3',6,110,160,32,20,10,'SGN','19:30','DAD','20:50',''),
('1','VJ-648',0,'Available','Hạng thương gia 20kgs, Hạng Phổ thông: Không Hành lý, Hành lý xách tay 7kgs, Airbus A321, Hàng ghế 3-3',6,110,160,32,20,10,'SGN','20:50','DAD','22:10',''),
('1','VJ-622',0,'Available','Hạng thương gia 20kgs, Hạng Phổ thông: Không Hành lý, Hành lý xách tay 7kgs, Airbus A321, Hàng ghế 3-3',6,110,160,33,20,10,'SGN','05:35','DAD','06:55',''),
('1','VJ-652',0,'Available','Hạng thương gia 20kgs, Hạng Phổ thông: Không Hành lý, Hành lý xách tay 7kgs, Airbus A321, Hàng ghế 3-3',6,110,160,33,20,10,'SGN','06:15','DAD','07:35',''),
('1','VJ-636',0,'Available','Hạng thương gia 20kgs, Hạng Phổ thông: Không Hành lý, Hành lý xách tay 7kgs, Airbus A321, Hàng ghế 3-3',6,110,160,33,20,10,'SGN','10:25','DAD','11:45',''),
('1','VJ-628',0,'Available','Hạng thương gia 20kgs, Hạng Phổ thông: Không Hành lý, Hành lý xách tay 7kgs, Airbus A321, Hàng ghế 3-3',6,110,160,33,20,10,'SGN','11:10','DAD','12:30',''),
('2','VN-6056',0,'Codeshare','Khai thác bởi Pacific, Hạng thương gia 30kgs, Hạng Phổ thông: Không Hành lý, Hành lý xách tay 7kg, Airbus A320, Hàng ghế 3-3',6,90,158,34,20,10,'SGN','19:30','DAD','20:50',''),
('2','VN-6054',0,'Codeshare','Khai thác bởi Pacific, Hạng thương gia 30kgs, Hạng Phổ thông: Không Hành lý, Hành lý xách tay 7kg, Airbus A320, Hàng ghế 3-3',6,90,158,34,20,10,'SGN','12:45','DAD','14:05',''),
('2','VN-6050',0,'Codeshare','Khai thác bởi Pacific, Hạng thương gia 30kgs, Hạng Phổ thông: Không Hành lý, Hành lý xách tay 7kg, Airbus A320, Hàng ghế 3-3',6,90,158,35,20,10,'SGN','06:15','DAD','07:35',''),
('4','QH-196',0,'Available','Hành lý 20 kgs, Hành lý xách tay 7kgs, Màn hình giải trí trên máy bay, Airbus A321, Hàng ghế 3-3',6,100,160,40,25,10,'SGN','22:20','DAD','23:50',''),
('4','QH-170',0,'Available','Hành lý 20 kgs, Hành lý xách tay 7kgs, Màn hình giải trí trên máy bay, Airbus A321, Hàng ghế 3-3',6,100,160,40,25,10,'SGN','20:00','DAD','21:30',''),
('4','QH-172',0,'Available','Hành lý 20 kgs, Hành lý xách tay 7kgs, Màn hình giải trí trên máy bay, Airbus A321, Hàng ghế 3-3',6,100,160,46,25,10,'SGN','18:00','DAD','19:30',''),
('4','QH-150',0,'Available','Hành lý 20 kgs, Hành lý xách tay 7kgs, Màn hình giải trí trên máy bay, Airbus A321, Hàng ghế 3-3',6,100,160,47,25,10,'SGN','05:50','DAD','07:20',''),
('4','QH-152',0,'Available','Hành lý 20 kgs, Hành lý xách tay 7kgs, Màn hình giải trí trên máy bay, Airbus A321, Hàng ghế 3-3',6,100,160,47,25,10,'SGN','11:05','DAD','12:35',''),
('2','VN-134',0,'Available','Hạng thương gia 30kgs, Hạng Phổ thông: 0kg, Hành lý xách tay 12kg, Màn hình giải trí trên máy bay, Airbus A321, Hàng ghế 3-3',12,150,168,44,30,20,'SGN','17:40','DAD','19:05',''),
('2','VN-136',0,'Available','Hạng thương gia 30kgs, Hạng Phổ thông: 0kg, Hành lý xách tay 12kg, Màn hình giải trí trên máy bay, Airbus A321, Hàng ghế 3-3',12,150,168,44,30,20,'SGN','18:25','DAD','19:50',''),
('2','VN-140',0,'Available','Hạng thương gia 30kgs, Hạng Phổ thông: 0kg, Hành lý xách tay 12kg, Màn hình giải trí trên máy bay, Airbus A321, Hàng ghế 3-3',12,150,168,44,30,20,'SGN','20:10','DAD','21:35',''),
('2','VN-142',0,'Available','Hạng thương gia 30kgs, Hạng Phổ thông: 0kg, Hành lý xách tay 12kg, Màn hình giải trí trên máy bay, Airbus A321, Hàng ghế 3-3',12,150,168,44,30,20,'SGN','20:55','DAD','22:20',''),
('2','VN-7122',0,'Available','Hạng thương gia 30kgs, Hạng Phổ thông: 0kg, Hành lý xách tay 12kg, Màn hình giải trí trên máy bay, Airbus A321, Hàng ghế 3-3',12,150,168,45,30,20,'SGN','06:25','DAD','07:50',''),
('2','VN-7124',0,'Available','Hạng thương gia 30kgs, Hạng Phổ thông: 0kg, Hành lý xách tay 12kg, Màn hình giải trí trên máy bay, Airbus A321, Hàng ghế 3-3',12,150,168,45,30,20,'SGN','06:45','DAD','08:10',''),
('2','VN-128',0,'Available','Hạng thương gia 30kgs, Hạng Phổ thông: 0kg, Hành lý xách tay 12kg, Màn hình giải trí trên máy bay, Airbus A321, Hàng ghế 3-3',12,150,168,45,30,20,'SGN','12:45','DAD','14:10',''),
('2','VN-130',0,'Available','Hạng thương gia 30kgs, Hạng Phổ thông: 0kg, Hành lý xách tay 12kg, Màn hình giải trí trên máy bay, Airbus A321, Hàng ghế 3-3',12,150,168,45,30,20,'SGN','13:25','DAD','14:50',''),
('2','VN-132',0,'Available','Hạng thương gia 30kgs, Hạng Phổ thông: 0kg, Hành lý xách tay 12kg, Màn hình giải trí trên máy bay, Airbus A321, Hàng ghế 3-3',12,150,168,45,30,20,'SGN','14:20','DAD','15:45',''),
('2','VN-124',0,'Available','Hạng thương gia 30kgs, Hạng Phổ thông: 0kg, Hành lý xách tay 12kg, Màn hình giải trí trên máy bay, Airbus A321, Hàng ghế 3-3',12,150,168,45,30,20,'SGN','16:35','DAD','18:00',''),
('2','VN-112',0,'Available','Hạng thương gia 30kgs, Hạng Phổ thông: 0kg, Hành lý xách tay 12kg, Màn hình giải trí trên máy bay, Airbus A321, Hàng ghế 3-3',12,150,168,48,30,20,'SGN','07:05','DAD','08:30',''),
('2','VN-114',0,'Available','Hạng thương gia 30kgs, Hạng Phổ thông: 0kg, Hành lý xách tay 12kg, Màn hình giải trí trên máy bay, Airbus A321, Hàng ghế 3-3',12,150,168,48,30,20,'SGN','07:20','DAD','08:45',''),
('2','VN-116',0,'Available','Hạng thương gia 30kgs, Hạng Phổ thông: 0kg, Hành lý xách tay 12kg, Màn hình giải trí trên máy bay, Airbus A321, Hàng ghế 3-3',12,150,168,48,30,20,'SGN','08:25','DAD','09:50',''),
('2','VN-7128',0,'Available','Hạng thương gia 30kgs, Hạng Phổ thông: 0kg, Hành lý xách tay 12kg, Màn hình giải trí trên máy bay, Airbus A321, Hàng ghế 3-3',12,150,168,48,30,20,'SGN','09:50','DAD','11:15',''),
('2','VN-122',0,'Available','Hạng thương gia 30kgs, Hạng Phổ thông: 0kg, Hành lý xách tay 12kg, Màn hình giải trí trên máy bay, Airbus A321, Hàng ghế 3-3',12,150,168,48,30,20,'SGN','09:55','DAD','11:20',''),

('5','VU-673',0,'Available','Hành lý mua tại thời điểm đặt vé, Hành lý xách tay 7kgs, Airbus A321, Hàng ghế 3-3',6,90,168,31,20,10,'DAD','10:35','SGN','12:05',''),
('1','VJ-641',0,'Available','Hạng thương gia 20kgs, Hạng Phổ thông: Không Hành lý, Hành lý xách tay 7kgs, Airbus A321, Hàng ghế 3-3',6,110,160,31,20,10,'DAD','23:00','SGN','00:15',''),
('4','QH-191',0,'Available','Hành lý 20 kgs, Hành lý xách tay 7kgs, Màn hình giải trí trên máy bay, Airbus A321, Hàng ghế 3-3',6,100,160,32,25,10,'DAD','22:10','SGN','23:40',''),
('1','VJ-621',0,'Available','Hạng thương gia 20kgs, Hạng Phổ thông: Không Hành lý, Hành lý xách tay 7kgs, Airbus A321, Hàng ghế 3-3',6,110,160,33,20,10,'DAD','13:10','SGN','14:35',''),
('1','VJ-637',0,'Available','Hạng thương gia 20kgs, Hạng Phổ thông: Không Hành lý, Hành lý xách tay 7kgs, Airbus A320, Hàng ghế 3-3',6,110,160,33,20,10,'DAD','15:10','SGN','16:30',''),
('1','VJ-623',0,'Available','Hạng thương gia 20kgs, Hạng Phổ thông: Không Hành lý, Hành lý xách tay 7kgs, Airbus A321, Hàng ghế 3-3',6,110,160,33,20,10,'DAD','16:55','SGN','18:20',''),
('1','VJ-625',0,'Available','Hạng thương gia 20kgs, Hạng Phổ thông: Không Hành lý, Hành lý xách tay 7kgs, Airbus A321, Hàng ghế 3-3',6,110,160,33,20,10,'DAD','17:05','SGN','18:30',''),
('1','VJ-639',0,'Available','Hạng thương gia 20kgs, Hạng Phổ thông: Không Hành lý, Hành lý xách tay 7kgs, Airbus A321, Hàng ghế 3-3',6,110,160,33,20,10,'DAD','17:15','SGN','18:40',''),
('1','VJ-645',0,'Available','Hạng thương gia 20kgs, Hạng Phổ thông: Không Hành lý, Hành lý xách tay 7kgs, Airbus A321, Hàng ghế 3-3',6,110,160,33,20,10,'DAD','17:35','SGN','19:00',''),
('1','VJ-643',0,'Available','Hạng thương gia 20kgs, Hạng Phổ thông: Không Hành lý, Hành lý xách tay 7kgs, Airbus A321, Hàng ghế 3-3',6,110,160,33,20,10,'DAD','21:20','SGN','22:40',''),
('1','VJ-635',0,'Available','Hạng thương gia 20kgs, Hạng Phổ thông: Không Hành lý, Hành lý xách tay 7kgs, Airbus A321, Hàng ghế 3-3',6,110,160,33,20,10,'DAD','22:45','SGN','00:10',''),
('1','VJ-627',0,'Available','Hạng thương gia 20kgs, Hạng Phổ thông: Không Hành lý, Hành lý xách tay 7kgs, Airbus A321, Hàng ghế 3-3',6,110,160,35,20,10,'DAD','07:30','SGN','08:55',''),
('1','VJ-647',0,'Available','Hạng thương gia 20kgs, Hạng Phổ thông: Không Hành lý, Hành lý xách tay 7kgs, Airbus A321, Hàng ghế 3-3',6,110,160,35,20,10,'DAD','08:10','SGN','09:35',''),
('1','VJ-629',0,'Available','Hạng thương gia 20kgs, Hạng Phổ thông: Không Hành lý, Hành lý xách tay 7kgs, Airbus A321, Hàng ghế 3-3',6,110,160,35,20,10,'DAD','10:30','SGN','11:50',''),
('1','VJ-633',0,'Available','Hạng thương gia 20kgs, Hạng Phổ thông: Không Hành lý, Hành lý xách tay 7kgs, Airbus A321, Hàng ghế 3-3',6,110,160,35,20,10,'DAD','12:25','SGN','13:50',''),
('4','QH-195',0,'Available','Hành lý 20 kgs, Hành lý xách tay 7kgs, Màn hình giải trí trên máy bay, Airbus A321, Hàng ghế 3-3',6,100,160,38,25,10,'DAD','20:00','SGN','21:35',''),
('4','QH-157',0,'Available','Hành lý 20 kgs, Hành lý xách tay 7kgs, Màn hình giải trí trên máy bay, Airbus A321, Hàng ghế 3-3',6,100,160,38,25,10,'DAD','06:10','SGN','07:40',''),
('4','QH-151',0,'Available','Hành lý 20 kgs, Hành lý xách tay 7kgs, Màn hình giải trí trên máy bay, Airbus A321, Hàng ghế 3-3',6,100,160,38,25,10,'DAD','08:25','SGN','10:00',''),
('4','QH-171',0,'Available','Hành lý 20 kgs, Hành lý xách tay 7kgs, Màn hình giải trí trên máy bay, Airbus A321, Hàng ghế 3-3',6,100,160,42,25,10,'DAD','13:15','SGN','14:45',''),
('2','VN-6057',0,'Codeshare','Khai thác bởi Pacific, Hạng thương gia 30kgs, Hạng Phổ thông: Không Hành lý, Hành lý xách tay 7kg, Airbus A320, Hàng ghế 3-3',6,90,158,55,40,10,'DAD','21:25','SGN','22:45',''),
('2','VN-6055',0,'Codeshare','Khai thác bởi Pacific, Hạng thương gia 30kgs, Hạng Phổ thông: Không Hành lý, Hành lý xách tay 7kg, Airbus A320, Hàng ghế 3-3',6,90,158,55,40,10,'DAD','14:40','SGN','16:05',''),
('2','VN-6051',0,'Codeshare','Khai thác bởi Pacific, Hạng thương gia 30kgs, Hạng Phổ thông: Không Hành lý, Hành lý xách tay 7kg, Airbus A320, Hàng ghế 3-3',6,90,158,55,40,10,'DAD','08:10','SGN','09:30',''),
('2','VN-141',0,'Available','Hạng thương gia 30kgs, Hạng Phổ thông: 0kg, Hành lý xách tay 12kg, Màn hình giải trí trên máy bay, Airbus A321, Hàng ghế 3-3',12,150,168,60,40,20,'DAD','07:45','SGN','09:15',''),
('2','VN-7127',0,'Available','Hạng thương gia 30kgs, Hạng Phổ thông: 23kg, Hành lý xách tay 12kg, Màn hình giải trí trên máy bay, Airbus A321, Hàng ghế 3-3',12,150,168,60,40,20,'DAD','09:00','SGN','10:30',''),
('2','VN-113',0,'Available','Hạng thương gia 30kgs, Hạng Phổ thông: 23kg, Hành lý xách tay 12kg, Màn hình giải trí trên máy bay, Airbus A321, Hàng ghế 3-3',12,150,168,60,40,20,'DAD','09:10','SGN','10:40',''),
('2','VN-115',0,'Available','Hạng thương gia 30kgs, Hạng Phổ thông: 23kg, Hành lý xách tay 12kg, Màn hình giải trí trên máy bay, Airbus A321, Hàng ghế 3-3',12,150,168,60,40,20,'DAD','09:50','SGN','11:20',''),
('2','VN-117',0,'Available','Hạng thương gia 30kgs, Hạng Phổ thông: 23kg, Hành lý xách tay 12kg, Màn hình giải trí trên máy bay, Airbus A321, Hàng ghế 3-3',12,150,168,60,40,20,'DAD','11:10','SGN','12:40',''),
('2','VN-7129',0,'Available','Hạng thương gia 30kgs, Hạng Phổ thông: 23kg, Hành lý xách tay 12kg, Màn hình giải trí trên máy bay, Airbus A321, Hàng ghế 3-3',12,150,168,60,40,20,'DAD','11:50','SGN','13:25',''),
('2','VN-123',0,'Available','Hạng thương gia 30kgs, Hạng Phổ thông: 23kg, Hành lý xách tay 12kg, Màn hình giải trí trên máy bay, Airbus A321, Hàng ghế 3-3',12,150,168,60,40,20,'DAD','11:55','SGN','13:25',''),
('2','VN-129',0,'Available','Hạng thương gia 30kgs, Hạng Phổ thông: 0kg, Hành lý xách tay 12kg, Màn hình giải trí trên máy bay, Airbus A321, Hàng ghế 3-3',12,150,168,50,30,20,'DAD','14:55','SGN','16:25',''),
('2','VN-131',0,'Available','Hạng thương gia 30kgs, Hạng Phổ thông: 23kg, Hành lý xách tay 12kg, Màn hình giải trí trên máy bay, Airbus A321, Hàng ghế 3-3',12,150,168,60,40,20,'DAD','15:30','SGN','17:00',''),
('2','VN-7123',0,'Available','Hạng thương gia 30kgs, Hạng Phổ thông: 23kg, Hành lý xách tay 12kg, Màn hình giải trí trên máy bay, Airbus A321, Hàng ghế 3-3',12,150,168,60,40,20,'DAD','15:35','SGN','17:05',''),
('2','VN-135',0,'Available','Hạng thương gia 30kgs, Hạng Phổ thông: 0kg, Hành lý xách tay 12kg, Màn hình giải trí trên máy bay, Airbus A321, Hàng ghế 3-3',12,150,168,50,30,20,'DAD','16:00','SGN','17:30',''),
('2','VN-133',0,'Available','Hạng thương gia 30kgs, Hạng Phổ thông: 23kg, Hành lý xách tay 12kg, Màn hình giải trí trên máy bay, Airbus A321, Hàng ghế 3-3',12,150,168,60,40,20,'DAD','16:25','SGN','17:55',''),
('2','VN-125',0,'Available','Hạng thương gia 30kgs, Hạng Phổ thông: 23kg, Hành lý xách tay 12kg, Màn hình giải trí trên máy bay, Airbus A321, Hàng ghế 3-3',12,150,168,60,40,20,'DAD','18:40','SGN','20:10',''),
('2','VN-137',0,'Available','Hạng thương gia 30kgs, Hạng Phổ thông: 23kg, Hành lý xách tay 12kg, Màn hình giải trí trên máy bay, Airbus A321, Hàng ghế 3-3',12,150,168,60,40,20,'DAD','19:45','SGN','21:15','')































