const { db } = require(`@db/index`);

exports.AuthDB = class {
  static async getByLogin(params) {
    const query = `--sql
        SELECT 
            u.id, 
            u.password, 
            u.login, 
            u.fio,
            a_n.account_number,
            d.doer AS doer_name,
            boss.boss AS boss_name,
            a.adress,
            b.bank AS bank_name,
            b.mfo,
            s.str,
            u.region_id,
            u.image,
            r.name AS region_name
        FROM users AS u 
        LEFT JOIN account_number AS a_n ON a_n.user_id = u.id
        LEFT JOIN doer AS d ON d.user_id = u.id
        LEFT JOIN boss ON boss.user_id = u.id
        LEFT JOIN adress AS a ON a.user_id = u.id
        LEFT JOIN bank AS b ON b.user_id = u.id
        LEFT JOIN str AS s ON s.user_id = u.id
        LEFT JOIN regions AS r ON r.id = u.region_id 
        WHERE u.login = $1
            AND u.isdeleted = false
    `;

    const result = await db.query(query, params);

    return result[0];
  }
};
