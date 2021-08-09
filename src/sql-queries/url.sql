create table urls (
  name varchar(255) not null,
  actual varchar(255) not null,
  short varchar(255) not null,
  clicks int default 0,
  primary key (short)
);

select * from urls;

insert into urls (
  name,
  actual,
  short,
  clicks
) values (
  'YouTube',
  'https://www.youtube.com/',
  'yt',
  0
) returning *;

select * from urls where (short = 'yt');

update urls set name = 'Google', actual = 'https://www.google.com/' where short = 'yt' returning *;

delete from urls where (short = 'yt') returning *;
