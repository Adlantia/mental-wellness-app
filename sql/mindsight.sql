drop table if exists log;
drop table if exists tracker;
drop table if exists journal;
drop table if exists profile;

create table if not exists profile (
    profile_id UUID not null primary key,
    profile_activation_token char(32)  unique,
    profile_email varchar(128) not null unique,
    profile_hash char(97) not null,
    profile_name varchar(32) not null unique
);

create table if not exists journal (
    journal_id UUID not null primary key,
    journal_profile_id UUID not null,
    foreign key(journal_profile_id) references profile(profile_id),
    journal_datetime timestamptz,
    journal_text varchar(2048),
    journal_title varchar(64)
);

create table if not exists tracker(
    tracker_id UUID not null primary key,
--     tracker_profile_id UUID not null,
--     foreign key(tracker_profile_id) references profile(profile_id),
    tracker_category varchar(32),
    tracker_question varchar(128)
);

create table if not exists log(
    log_id UUID not null primary key,
    log_profile_id UUID not null references profile(profile_id),
    log_tracker_id UUID not null,
    foreign key(log_tracker_id) references tracker(tracker_id),
    log_answer smallint,
    log_datetime timestamptz
);
