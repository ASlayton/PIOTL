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
VALUES ('John', 'Smith', 'j4TP93ysDIN8ibQ7oKEBRoPWlhM2', 1, 1, 0)

CREATE TABLE Family
(
	id int IDENTITY(1,1) PRIMARY KEY,
	name varchar(120)
);

INSERT INTO Family (name)
VALUES ('Smith Family')

CREATE TABLE VerifyChore
(
	id int IDENTITY(1,1) PRIMARY KEY,
	choreListId int,
	requestedBy int,
	familyId int,
	type int
);

INSERT INTO VerifyChore (choreListId, requestedBy, familyId, type)
VALUES (56, 11, 8, 1)

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
       ('Clean Room', 5, 7, 0.50),
	   ('Wash Dishes', 4, 7, 0.50),
	   ('Pick up living room', 3, 7, 0.50),
	   ('Clean bathroom', 2, 7, 0.50),
	   ('Weed Garden', 7, 7, 0.50),
	   ('Mow Lawn', 8, 7, 0.50),
	   ('Clear table', 6, 7, 0.50)

CREATE TABLE Rooms
(
	id int IDENTITY(1,1) PRIMARY KEY,
	name varchar(200)
);

insert into Rooms (name)
VALUES ('Laundry Room'),
	   ('Bathroom'),
	   ('Living Room'),
	   ('Kitchen'),
	   ('Bedroom'),
	   ('Dining Room'),
	   ('Garden'),
	   ('Yard')

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
VALUES ('2019-01-01', '2019-02-01', 0, 1, 1, 1, 1 )

CREATE TABLE Memos
(
	id int IDENTITY(1,1) PRIMARY KEY,
	userId int,
	message varchar(255),
	dateCreated datetime
);

INSERT INTO Memos (UserId, message, dateCreated)
VALUES (1, 'I am a memo.', '2019-01-01'),
	   (1, 'I am also a memo.', '2019-01-01')

CREATE TABLE Messages
(
	id int IDENTITY(1,1) PRIMARY KEY,
	sentFrom int,
	sentTo int,
	message varchar(2000),
	dateCreated datetime
);

INSERT INTO Messages (sentFrom, sentTo, message, dateCreated )
VALUES (1, 2, 'I am a message','2019-01-01')

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
VALUES ('Milk', 1, 1, 1, 0,'2019-01-01')

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
