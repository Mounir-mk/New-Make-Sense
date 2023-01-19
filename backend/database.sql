create table user (
  id int(11) unsigned PRIMARY KEY NOT NULL AUTO_INCREMENT,
  firstname varchar(50) NOT NULL,
  lastname varchar(50) NOT NULL,
  image_url varchar(255),
  role varchar(15) NOT NULL DEFAULT 'visitor',
  email varchar(50) NOT NULL UNIQUE,
  hashed_password varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO user (firstname, lastname, role, email, hashed_password) VALUES 
('John','Doe','visitor','visitor@mail.com','$argon2id$v=19$m=65536,t=5,p=1$Yx+5bYJ3zsf1RHN92/SlxQ$VmX8cR64b7G3q+AuxSmcDJplhwMiz+QpeKdpN6GGEwI'),
('Jane','Doe','employee','employee@mail.com','$argon2id$v=19$m=65536,t=5,p=1$Yx+5bYJ3zsf1RHN92/SlxQ$VmX8cR64b7G3q+AuxSmcDJplhwMiz+QpeKdpN6GGEwI'),
('Jack','Doe','admin','admin@mail.com','$argon2id$v=19$m=65536,t=5,p=1$Yx+5bYJ3zsf1RHN92/SlxQ$VmX8cR64b7G3q+AuxSmcDJplhwMiz+QpeKdpN6GGEwI');

create table decision (
  id int(11) unsigned PRIMARY KEY NOT NULL AUTO_INCREMENT,
  title varchar(50) NOT NULL,
  deadline date NOT NULL,
  publish_date date NOT NULL,
  start_content varchar(250) NOT NULL,
  impact varchar(250) NOT NULL,
  risk varchar(250) NOT NULL,
  advantage varchar(250) NOT NULL,
  middle_decision varchar(250),
  final_decision varchar(250),
  user_id int(11) unsigned NOT NULL,
  status enum('in_progress', 'finished') NOT NULL DEFAULT 'in_progress',
  constraint decision_user foreign key (user_id) references user(id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Trigger an event that will update the status of the decision when the deadline is reached
CREATE VIEW decision_status AS
SELECT id, title, deadline, publish_date, start_content, impact, risk, advantage, middle_decision, final_decision, user_id,
CASE 
   WHEN deadline < NOW() THEN 'finished'
   ELSE 'in_progress'
END AS status
FROM decision;

INSERT INTO decision (title, deadline, publish_date, start_content, impact, risk, advantage, user_id) VALUES ('Titre de la décision','2022-12-07','2022-12-31','Lorem ipsum content','Lorem ipsum impact','Lorem ipsum risk','Lorem ipsum advantage', 1), ('Titre de la décision 2','2022-12-08','2022-12-30','Lorem ipsum content2','Lorem ipsum impact2','Lorem ipsum risk2','Lorem ipsum advantage2', 1);

create table concerned (
  user_status varchar(10) NOT NULL,
  user_id int(11) unsigned NOT NULL,
  decision_id int(11) unsigned NOT NULL,
  constraint concerned_user foreign key (user_id) references user(id),
  constraint concerned_decision foreign key (decision_id) references decision(id)
) engine=InnoDB default charset=latin1;

create table comment (
  content varchar(255) NOT NULL,
  user_id int(11) unsigned NOT NULL,
  decision_id int(11) unsigned NOT NULL,
  constraint comment_user foreign key (user_id) references user(id),
  constraint decision_comment foreign key (decision_id) references decision(id)
) engine=InnoDB default charset=latin1;

insert into comment (content, user_id, decision_id) values
("premier commentaire test", 1, 1),
("deuxième commentaire test", 1, 2);

insert into concerned (user_status, decision_id, user_id) values
("impacted", 1, 2),
("expert", 1, 3),
("impacted", 2, 3),
("impacted", 2, 1);
