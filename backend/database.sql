create table user (
  id int(11) unsigned PRIMARY KEY NOT NULL AUTO_INCREMENT,
  firstname varchar(50) NOT NULL,
  lastname varchar(50) NOT NULL,
  email varchar(50) NOT NULL,
  password varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO user (firstname, lastname, email, password) VALUES ('John','Doe','john.doe@gmail.com','password');

create table decision (
  id int(11) unsigned PRIMARY KEY NOT NULL AUTO_INCREMENT,
  title varchar(50) NOT NULL,
  deadline date NOT NULL,
  content varchar(250) NOT NULL,
  impact varchar(250) NOT NULL,
  risk varchar(250) NOT NULL,
  advantage varchar(250) NOT NULL,
  user_id int(11) unsigned NOT NULL,
  constraint decision_user foreign key (user_id) references user(id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO decision (title, deadline, content, impact, risk, advantage, user_id) VALUES ('Titre de la décision','2022-12-07','Lorem ipsum content','Lorem ipsum impact','Lorem ipsum risk','Lorem ipsum advantage', 1), ('Titre de la décision 2','2022-12-08','Lorem ipsum content2','Lorem ipsum impact2','Lorem ipsum risk2','Lorem ipsum advantage2', 1);
