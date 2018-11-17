CREATE DATABASE INVENTORY;
USE INVENTORY ;
-- CREATING TABLES
CREATE TABLE supplier (
Sid INT NOT NULL,
Sname VARCHAR(20) NOT NULL,
Type CHAR(1) NOT NULL,
ContactNo INT,

PRIMARY KEY(Sid)
);


CREATE TABLE products (
Pid INT NOT NULL,
Pname VARCHAR(20) NOT NULL,
Price INT NOT NULL,
CurrentStock INT  DEFAULT 0,

PRIMARY KEY(Pid)
);


CREATE TABLE addmin (
username VARCHAR(20) NOT NULL,
password VARCHAR(20) NOT NULL,  -- NOT NULL only for admin, if we are adding a customer login page then we can keep this field NULL
Name VARCHAR(20),

PRIMARY KEY(username)
);


CREATE TABLE customer (
Cid INT NOT NULL,
Cname VARCHAR(20) NOT NULL,
ContactNo VARCHAR(15),
EmailId VARCHAR(20),

PRIMARY KEY(Cid)
);


CREATE TABLE salestarget (
Mnth INT NOT NULL,
Yr INT NOT NULL,
Target INT,
username VARCHAR(20) NOT NULL,

PRIMARY KEY(Mnth, Yr),
CONSTRAINT salestarget_username_FK FOREIGN KEY(username) REFERENCES addmin(username)
);


CREATE TABLE produces (
Pid INT NOT NULL,
Mnth INT NOT NULL,
Yr INT NOT NULL,
Production_cost INT,

PRIMARY KEY(Pid, Mnth, Yr)
);


CREATE TABLE purchasedby (
Sid INT NOT NULL,
PInvNo INT NOT NULL,
PurDate DATE NOT NULL,
Amount INT NOT NULL,

PRIMARY KEY(PInvNo),
CONSTRAINT purchasedby_Sid_FK FOREIGN KEY(Sid) REFERENCES supplier(Sid)
);


CREATE TABLE capitalitems (
CPid INT NOT NULL,
CPname VARCHAR(20) NOT NULL,
Price INT,
Quantity INT NOT NULL,
RateDep NUMERIC(4,2),

PRIMARY KEY(CPid)
);


CREATE TABLE sellsto (
Cid INT NOT NULL,
SInvNo INT NOT NULL,
SellDate DATE NOT NULL,
Amount INT NOT NULL,
Feedback VARCHAR(50),

PRIMARY KEY(SInvNo)
);
    


CREATE TABLE salesinvoice (
Pid INT NOT NULL,
SInvNo INT NOT NULL,
Quantity INT NOT NULL,
Price INT NOT NULL,

CONSTRAINT salesinvoice_SInvNo_FK FOREIGN KEY(SInvNo) REFERENCES sellsto(SInvNo),
CONSTRAINT salesinvoice_Pid_FK FOREIGN KEY(Pid) REFERENCES products(Pid)
);


CREATE TABLE capitalinvoice (
CPid INT NOT NULL,
CPInvNo INT NOT NULL,
Quantity INT NOT NULL,
Price INT NOT NULL,

CONSTRAINT capitalinvoice_CPid_FK FOREIGN KEY(CPid) REFERENCES capitalitems(CPid),
CONSTRAINT capitalinvoice_CPInvNo_FK FOREIGN KEY(CPInvNo) REFERENCES purchasedby(PInvNo)
);


CREATE TABLE productinvoice (
Pid INT NOT NULL,
PInvNo INT NOT NULL,
Quantity INT NOT NULL,
Price INT NOT NULL,

CONSTRAINT productinvoice_Pid_FK FOREIGN KEY(Pid) REFERENCES products(Pid),
CONSTRAINT productinvoice_PInvNo_FK FOREIGN KEY(PInvNo) REFERENCES purchasedby(PinvNo)
);

