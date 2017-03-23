const pg = require('pg');
const constants = require('../../constants');

const connectionString = constants.DB_CONNECTION;


const queryStatement = 
        'INSERT INTO account VALUES(DEFAULT, \'dartteon\', \'BARON CHAN\', \'i am a nerd!\', 24, \'MALE\', \'dartteon@gmail.com\', \'Singapore\', \'ADMIN\');'
    +   'INSERT INTO account VALUES(DEFAULT, \'chl92\', \'POH HUI LING\', \'FUND ME PLZ\', 29, \'FEMALE\', \'\', \'Singapore\', \'USER\');'
    +   'INSERT INTO account VALUES(DEFAULT, \'xx00\', \'XIE XIN\', \'GAMES GAMES GAMES\', 17, \'FEMALE\', \'xiexin2011@gmail.com\', \'\', \'USER\');'
    +   'INSERT INTO account VALUES(DEFAULT, \'aneja92\', \'VARGHESE ANEJA\', \'Cool handsome dude :)\', 25, \'MALE\', \'vargheseaneja1992@msn.com\', \'Singapore\', \'USER\');'
    +   'INSERT INTO account VALUES(DEFAULT, \'tym89\', \'TAY YONG MING\', \'I have no idea what i am  actually doing\', 28, \'MALE\', \'tayyongming1989@gmail.com\', \'Singapore\', \'USER\');'
    +   'INSERT INTO account VALUES(DEFAULT, \'jenbeck92\', \'JENNY BECKHAM\', \'Hi there! I really really love Geography!\', 25, \'FEMALE\', \'jennybeckham1992@gmail.com\', \'Singapore\', \'USER\');'
    +   'INSERT INTO account VALUES(DEFAULT, \'lyj29\', \'LEE YI JIA\', \'Voluptate consequatur aut et facilis perspiciatis.\', 24, \'FEMALE\', \'leeyijia1989@gmail.com\', \'Singapore\', \'USER\');'
    +   'INSERT INTO account VALUES(DEFAULT, \'hillary33\', \'Virgie Leffler\', \'Ratione ut non aut distinctio et. Qui consectetur cum omnis voluptates officia omnis sint.\', 33, \'FEMALE\', \'mertz.macy@example.org\', \'Morocco\', \'USER\');'
    +   'INSERT INTO account VALUES(DEFAULT, \'jacobs.donnie\', \'Wilhelmine Treutel\', \'Soluta ullam eum veritatis laudantium eum repudiandae cum.\', 41, \'MALE\', \'marquardt.gilbert@example.org\', \'Sweden\', \'USER\');'
    +   'INSERT INTO account VALUES(DEFAULT, \'hnader\', \'Delaney Hoeger\', \'Est eaque sit magnam est. Voluptas et nesciunt totam dolor.\', 37, \'MALE\', \'rhoppe@example.net\', \'Austria\', \'USER\');'
    +   'INSERT INTO account VALUES(DEFAULT, \'yesenia.turcotte\', \'Damien Davis\', \'Amet ea in velit ipsam architecto ducimus ducimus quas.\', 19, \'FEMALE\', \'maybell.skiles@example.org\', \'Martinique\', \'USER\');'
    +   'INSERT INTO account VALUES(DEFAULT, \'bailey.anika\', \'Enrico Tromp\', \'Dignissimos quibusdam facilis error ut accusantium ipsa dolorem et.\', 45, \'FEMALE\', \'clarissa87@example.com\', \'Mayotte\', \'USER\');'
    +   'INSERT INTO account VALUES(DEFAULT, \'grace.predovic\', \'Willa Gulgowski V\', \'Iure voluptatum est praesentium dolorum minima et nihil omnis.\', 39, \'MALE\', \'giuseppe74@example.net\', \'Greece\', \'USER\');'
    +   'INSERT INTO account VALUES(DEFAULT, \'torrance48\', \'Bell Trantow\', \'Dignissimos quibusdam facilis error ut accusantium ipsa dolorem et.\', 55, \'MALE\', \'gerda90@example.org\', \'Niger\', \'USER\');'
    +   'INSERT INTO account VALUES(DEFAULT, \'koch.vincenzo\', \'Julius Gottlieb\', \'Velit cumque consequatur iste provident enim cumque.\', 45, \'MALE\', \'vjohns@example.org\', \'Hungary\', \'USER\');'
    +   'INSERT INTO account VALUES(DEFAULT, \'lakin.roscoe\', \'Amira Beahan\', \'Dolores quo aut ducimus ad quia doloremque eos non.\', 29, \'FEMALE\', \'fidel.walter@example.org\', \'Korea\', \'USER\');'
    +   'INSERT INTO account VALUES(DEFAULT, \'leuschke.rylan\', \'Gayle Lindgren\', \'Error quia saepe temporibus veniam voluptatem.\', 53, \'MALE\', \'andrew96@example.org\', \'Swaziland\', \'USER\');'
    +   'INSERT INTO account VALUES(DEFAULT, \'marjolaine.huels\', \'Violette Vandervort\', \'Magni nihil temporibus id et.\', 27, \'FEMALE\', \'bmuller@example.net\', \'Spain\', \'USER\');'
    +   'INSERT INTO account VALUES(DEFAULT, \'alfonzo.kutch\', \'Gracie Cole\', \'Ut non id laborum voluptatem officia commodi non.\', 59, \'FEMALE\', \'janick61@example.org\', \'Finland\', \'USER\');'
    +   'INSERT INTO account VALUES(DEFAULT, \'kuphal.burley\', \'Janet Klein\', \'Alias perspiciatis dolores repudiandae.\', 50, \'FEMALE\', \'leda20@example.org\', \'Kyrgyz Republic\', \'USER\');'
    ;


 module.exports = function() {
    const client = new pg.Client(connectionString);
    client.connect();
    return client.query(queryStatement)
        .then( () => {
            console.log('Success - Inserted all sample values into account table');
            client.end(); 
        });
}
