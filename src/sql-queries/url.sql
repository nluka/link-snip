create table urls (
  name varchar(32) not null,
  actual varchar(512) not null,
  short varchar(8) not null,
  clicks int default 0,
  primary key (short)
);

-- Create new url
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

-- Get all urls
select * from urls;

-- Get url by 'short'
select * from urls where (short = 'yt');

-- Get url 'actual' by 'short'
select actual from urls where (short = 'yt');

-- Patch url
update urls set name = 'Google', actual = 'https://www.google.com/' where short = 'yt' returning *;

-- Increment url clicks
update urls set clicks = clicks + 1 where short = 'yt';

-- Delete url by 'short'
delete from urls where (short = 'yt') returning *;
