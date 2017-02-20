const pg = require('pg');
const constants = require('../../constants');

const connectionString = constants.DB_CONNECTION;
const client = new pg.Client(connectionString);

client.connect();

const queryStatement = 
        'INSERT INTO account VALUES(DEFAULT, \'dartteon\', \'channnn\', \'i am a nerd!\', 24, \'MALE\', \'dartteon@gmail.com\', \'Singapore\', \'ADMIN\');'
    +   'INSERT INTO account VALUES(DEFAULT, \'chl92\', \'POH HUI LING\', \'FUND ME PLZ\', 29, \'FEMALE\', \'\', \'Singapore\', \'USER\');'
    +   'INSERT INTO account VALUES(DEFAULT, \'xx00\', \'XIE XIN\', \'GAMES GAMES GAMES\', 17, \'FEMALE\', \'xiexin2011@gmail.com\', \'\', \'USER\');'
    +   'INSERT INTO account VALUES(DEFAULT, \'aneja92\', \'VARGHESE ANEJA\', \'cool handsome dude\', 25, \'MALE\', \'vargheseaneja1992@msn.com\', \'Singapore\', \'USER\');'
    +   'INSERT INTO account VALUES(DEFAULT, \'tym89\', \'TAY YONG MING\', \'i have no idea what i am doing\', 28, \'MALE\', \'tayyongming1989@gmail.com\', \'Singapore\', \'USER\');'
    ;

const query1 = client.query(
    queryStatement
);

query1.on('end', function() {
    console.log('Success - Inserted all sample values into category table');
    client.end(); 
});