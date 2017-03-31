exports.INSERT = 'INSERT INTO items(text) values($1)';
exports.GET_ALL = 'SELECT * FROM items ORDER BY id ASC';

exports.ADD_ACCOUNT =
    'INSERT INTO account' +
    ' (id, username, full_name, description, age, gender, email, country, role)' +
    ' VALUES(DEFAULT, $1, $2, $3, $4, $5, $6, $7, $8)';

exports.ADD_PROJECT =
    'INSERT INTO project' +
    ' (id, title, category, image_url, description, start_date, end_date, amount_sought, owner_account)' +
    ' VALUES(DEFAULT, $1, $2, $3, $4, $5, $6, $7, (SELECT a.id FROM account a WHERE a.username = $8))';

exports.ADD_CATEGORY =
    'INSERT INTO category ' +
    ' (name, description)' +
    ' VALUES($1, $2)';

exports.ADD_FUND =
    'INSERT INTO funds' +
    ' (id, project, account, amount, time)' +
    ' VALUES (DEFAULT, $1, (SELECT a.id FROM account a WHERE a.username = $2), $3, $4)';

// exports.UPDATE_PROJECT =
//     'UPDATE project ' +
//     ' SET title = $1, category = $2, image_url = $3, description = $4, start_date = $5, end_date = $6, amount_sought = $7, owner_account = $8' +
//     ' WHERE id = $9';
exports.UPDATE_PROJECT =
    'UPDATE project ' +
    ' SET title = $1, category = $2, image_url = $3, description = $4, start_date = $5, end_date = $6, amount_sought = $7' +
    ' WHERE id = $8';

exports.GET_CATEGORIES =
    'SELECT * FROM category ORDER BY name';

exports.GET_ACCOUNT = 
    'SELECT * FROM account WHERE username = $1';

exports.GET_PROJECTS =
    'SELECT pr.id, pr.title, pr.image_url, pr.description, pr.owner_account, acc.full_name as owner, acc.country as owner_country FROM project pr '+
    'INNER JOIN account acc ON acc.id=pr.owner_account '+
    'WHERE UPPER(pr.title) LIKE UPPER($1) '+
    'ORDER BY pr.title';

exports.GET_PROJECT_BY_ID =
    "SELECT pr.id, pr.title, pr.image_url, pr.description, pr.owner_account, pr.category, pr.start_date, pr.end_date, pr.amount_sought," +
    "DATE_PART('day', pr.end_date::timestamp - pr.start_date::timestamp) as days_left, " + 
    "(SELECT array_to_json(array_agg(funds.*)) FROM funds WHERE funds.project=pr.id) as backers, " +
    "(SELECT SUM(funds.amount) FROM funds WHERE funds.project=pr.id) as amount_funded, "+
    "acc.full_name as owner, acc.country as owner_country, acc.description as owner_description FROM project pr "+
    "INNER JOIN account acc ON acc.id=pr.owner_account "+
    "WHERE pr.id = $1";

exports.GET_FEATURED_PROJECTS =
    "SELECT pr.id, pr.title, pr.image_url, pr.description, " +
    "((SELECT SUM(funds.amount) FROM funds WHERE funds.project=pr.id) / pr.amount_sought) as percent " +
    "FROM project pr " +
    "WHERE pr.end_date > now()::date " +
    "ORDER BY -((SELECT SUM(funds.amount) FROM funds WHERE funds.project=pr.id) / pr.amount_sought) ASC " +    //Doing negation and ASC because SQL treats null values (0 funds) as higher
    "LIMIT 12";
