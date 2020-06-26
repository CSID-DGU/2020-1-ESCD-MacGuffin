const baseQuery = {
    list(filters) {
        return `SELECT ${this.visibleColumns.join(',')} FROM ${this.table}${this.generateWhereClause(filters)}`;
    },
    insert(record) {
        const keys = Object.keys(record);
        const values = keys
            .map(key => JSON.stringify(record[key]));

        return `INSERT INTO ${this.table} (${keys.join(',')}) VALUES (${values.join(',')})`;
    },
    delete(filters) {
        return `DELETE FROM ${this.table}${this.generateWhereClause(filters)}`;
    },
    generateWhereClause(filters = {}) {
        const filterClauses = Object.keys(filters)
            .map(key => `${key}=${JSON.stringify(filters[key])}`);

        return `${filterClauses.length > 0 ? ' WHERE ' : ''}${filterClauses.join(' AND ')}`;
    },
};

const userQuery = {
    table: 'user',
    visibleColumns: [
        'userId',
        'userName',
    ],
};
Object.setPrototypeOf(userQuery, baseQuery);

const assetQuery = {
    table: 'asset',
    visibleColumns: [
        'assetId',
        'category',
        'name',
        'username',
        'price',
        'acquiredDate',
        'managerName',
        'lastModifiedDate',
    ],
};
Object.setPrototypeOf(assetQuery, baseQuery);

module.exports = {
    asset: assetQuery,
    user: userQuery,
};
