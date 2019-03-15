const db_driver = require('./database_driver');

module.exports.getUserWithPassword = (userData) => {
  const queryString = `
    SELECT user_id, user_name, password_hash
    FROM public.account
    WHERE user_name = $1;  
  `;
  const sqlParams = [userData.username];

  return db_driver.executeQuery(queryString, sqlParams).then((res) => {
    return res.length > 0 ? res[0] : null;
  });
}