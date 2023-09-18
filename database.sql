CREATE TABLE TaskList(
	"id" SERIAL PRIMARY KEY,
	"Task" VARCHAR (200) NOT NULL,
	"Completion Status" BOOLEAN NOT NULL,
	);

SELECT * FROM "TaskList";

INSERT INTO "TaskList" 
	("Task", "Done?") 
VALUES
	('Edit weekend code', 'false'),
	('Lift weights', 'false'),	
	('Jog 3 miles', 'false'),	
	('Trim bushes outside', 'false');
    ('Bring car to car wash', 'false');
    ('Wipe down setup', 'false');
	
	DROP TABLE TaskList;