const { db } = require("../db/index");

exports.OrganizationDB = class {
  static async getById(params, isdeleted) {
    const query = `
            SELECT 
                o.id, 
                o.name, 
                o.address, 
                o.str, 
                o.bank_name, 
                o.mfo,
                COALESCE((
                    SELECT 
                        JSON_AGG(
                            JSON_BUILD_OBJECT(
                                'id',    g.id,
                                'gazna_number', g.gazna_number
                            )
                        )
                    FROM gazna_numbers g
                    WHERE g.isdeleted = false
                        AND g.organ_id = o.id
                ), '[]'::JSON) AS gazna_numbers,
                COALESCE((
                    SELECT 
                        JSON_AGG(
                            JSON_BUILD_OBJECT(
                                'id',    a.id,
                                'account_number', a.account_number
                            )
                        )
                    FROM  account_number a  
                    WHERE a.isdeleted = false
                        AND a.organ_id = o.id
                ), '[]'::JSON) AS account_numbers
            FROM organization o
            WHERE o.user_id = $1 
                AND o.id = $2
                ${!isdeleted ? "AND o.isdeleted = false" : ""}        
        `;

    const result = await db.query(query, params);

    return result[0];
  }
};
