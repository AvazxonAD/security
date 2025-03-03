exports.Functions = class {
    static paramsValues(data) {
        const index_max = data.params.length;
        let values = '('
        for (let i = 1; i <= index_max; i++) {
            if (index_max === i) {
                values += ` $${i})`
            } else if (i % data.column_count === 0) {
                values += ` $${i}), (`
            } else {
                values += `$${i}, `
            }
        }
        return values;
    }
}