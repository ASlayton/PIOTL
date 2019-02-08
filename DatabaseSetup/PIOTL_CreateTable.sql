use PIOTL;

CREATE TABLE Users
(
	id int IDENTITY(1,1) PRIMARY KEY,
	firstName varchar(20),
	lastName varchar(20),
	firebaseId varchar(255),
	familyId int,
	adult bit,
	earned decimal(6,2)
);

INSERT INTO Users (firstName, lastName, firebaseID, familyId, adult, earned)
VALUES ('John', 'Smith', 'j4TP93ysDIN8ibQ7oKEBRoPWlhM2', 1, 1, 0),
	   ('Sarah', 'Smith', 'j4TP93ysDIN8ibQ7oKEBRoPWlhM2', 1, 1, 0),
	   ('Marv', 'Smith', 'j4TP93ysDIN8ibQ7oKEBRoPWlhM2', 1, 0, 0),
	   ('Joe', 'Smith', 'j4TP93ysDIN8ibQ7oKEBRoPWlhM2', 1, 0, 0),
	   ('Annie', 'Smith', 'j4TP93ysDIN8ibQ7oKEBRoPWlhM2', 1, 0, 0)

CREATE TABLE Family
(
	id int IDENTITY(1,1) PRIMARY KEY,
	name varchar(120)
);

INSERT INTO Family (name)
VALUES ('Smith Family')

CREATE TABLE Chores
(
	id int IDENTITY(1,1) PRIMARY KEY,
	name varchar(50),
	room int,
	interval int,
	worthAmt decimal(6,2)
);

INSERT INTO Chores (name, room, interval, worthAmt)
VALUES ('Fold Laundry', 1, 7, 0.50),
       ('Clean Room', 1, 7, 0.50),
	   ('Wash Dishes', 1, 7, 0.50),
	   ('Pick up living room', 1, 7, 0.50),
	   ('Clean bathroom', 1, 7, 0.50)

CREATE TABLE ChoresList
(
	id int IDENTITY(1,1) PRIMARY KEY,
	dateAssigned datetime,
	dateDue datetime,
	completed bit,
	assignedTo int,
	assignedBy int,
	type int,
	familyId int
);

INSERT INTO ChoresList (dateAssigned, dateDue, completed, assignedTo, assignedBy, type, familyId)
VALUES ('2019-01-01 00:00:00', '2019-02-01 00:00:00', 0, 1, 1, 1, 1 ),
       ('2019-01-01 00:00:00', '2019-02-07 00:00:00', 0, 2, 2, 2, 1 ),
			 ('2019-01-01 00:00:00', '2019-02-01 00:00:00', 0, 2, 1, 1, 1 ),
			 ('2019-01-01 00:00:00', '2019-02-01 00:00:00', 0, 3, 1, 5, 1 ),
       ('2019-01-01 00:00:00', '2019-02-01 00:00:00', 0, 4, 1, 3, 1 ),
			 ('2019-01-01 00:00:00', '2019-02-15 00:00:00', 0, 5, 1, 2, 1 ),
			 ('2019-01-01 00:00:00', '2019-02-01 00:00:00', 0, 2, 1, 1, 1 ),
       ('2019-01-01 00:00:00', '2019-02-10 00:00:00', 0, 1, 2, 3, 1 ),
			 ('2019-01-01 00:00:00', '2019-02-01 00:00:00', 0, 3, 1, 1, 1 ),
			 ('2019-01-01 00:00:00', '2019-02-07 00:00:00', 0, 2, 1, 2, 1 ),
       ('2019-01-01 00:00:00', '2019-02-01 00:00:00', 0, 4, 1, 1, 1 ),
			 ('2019-01-01 00:00:00', '2019-02-01 00:00:00', 0, 2, 1, 3, 1 ),
			 ('2019-01-01 00:00:00', '2019-02-01 00:00:00', 0, 5, 2, 2, 1 ),
       ('2019-01-01 00:00:00', '2019-02-01 00:00:00', 0, 2, 1, 2, 1 ),
			 ('2019-01-01 00:00:00', '2019-02-01 00:00:00', 0, 2, 1, 4, 1 )

CREATE TABLE Memos
(
	id int IDENTITY(1,1) PRIMARY KEY,
	userId int,
	message varchar(255),
	dateCreated datetime
);

INSERT INTO Memos (UserId, message, dateCreated)
VALUES (1, 'I am a memo.', '2019-01-01 00:00:00')

CREATE TABLE Messages
(
	id int IDENTITY(1,1) PRIMARY KEY,
	sentFrom int,
	sentTo int,
	message varchar(2000),
	dateCreated datetime
);

INSERT INTO Messages (sentFrom, sentTo, message, dateCreated )
VALUES (1, 2, 'I am a message','2019-01-01 00:00:00')

CREATE TABLE Grocery
(
	id int IDENTITY(1,1) PRIMARY KEY,
	name varchar(20),
	type int,
	quantity int,
	addedBy int,
	approved bit,
	dateAdded datetime
);

INSERT INTO Grocery (name, type, quantity, addedBy, approved, dateAdded)
VALUES ('Milk', 1, 1, 1, 0,'2019-01-01 00:00:00')

Create Table GroceryType
(
	id int IDENTITY(1,1) PRIMARY KEY,
	name varchar(20)
);

INSERT INTO GroceryType(name)
VALUES ('Dairy')

CREATE TABLE Events
(
	id int IDENTITY(1,1) PRIMARY KEY,
	name varchar(100),
	type int,
	description varchar(255),
	assignedTo int,
	dateDue datetime,
	timeStart datetime,
	timeEnd datetime
);

INSERT INTO Events (name, type, description, assignedTo, dateDue, timeStart, timeEnd)
VALUES ('Lucca B-day', 1, 'Birthday party at Pump-it-up', 1, '2019-04-27 00:00:00', '2019-04-27 05:00:00', '2019-01-01 05:0:00')

CREATE TABLE EventType
(
	id int IDENTITY(1,1) PRIMARY KEY,
	name varchar(20)
);

INSERT INTO EventType (name)
VALUES ('Birthday')

CREATE TABLE Rooms
(
	id int IDENTITY(1,1) PRIMARY KEY,
	name varchar(200)
);

insert into Rooms (name)
VALUES ('Laundry Room')

ALTER TABLE Users ADD FOREIGN KEY (familyId) REFERENCES Family (id);
ALTER TABLE Chores ADD FOREIGN KEY (room) REFERENCES Rooms (id);
ALTER TABLE ChoresList ADD FOREIGN KEY (assignedTo) REFERENCES Users (id);
ALTER TABLE ChoresList ADD FOREIGN KEY (assignedBy) REFERENCES Users (id);
ALTER TABLE Memos ADD FOREIGN KEY (userId) REFERENCES Users (id);
ALTER TABLE Messages ADD FOREIGN KEY (sentTo) REFERENCES Users (id);
ALTER TABLE Messages ADD FOREIGN KEY (sentFrom) REFERENCES Users (id);
ALTER TABLE Grocery ADD FOREIGN KEY (addedBy) REFERENCES Users (id);
ALTER TABLE Grocery ADD FOREIGN KEY (type) REFERENCES GroceryType (id);
ALTER TABLE Events ADD FOREIGN KEY (type) REFERENCES EventType (id);
ALTER TABLE Events ADD FOREIGN KEY (assignedTo) REFERENCES Users (id);
