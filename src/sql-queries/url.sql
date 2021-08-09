create table urls (
  name varchar(32) not null,
  actual varchar(512) not null,
  short varchar(8) not null,
  clicks int default 0,
  primary key (short)
);

-- Create new entry
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

-- Get all entries
select * from urls;

-- Get entry from short
select * from urls where (short = 'yt');

-- Get actual from short
select actual from urls where (short = 'yt');

-- Patch entry
update urls set name = 'Google', actual = 'https://www.google.com/' where short = 'yt' returning *;

-- Increment clicks
update urls set clicks = clicks + 1 where short = 'yt';

-- Delete entry from short
delete from urls where (short = 'yt') returning *;
