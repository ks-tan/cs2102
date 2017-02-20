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
