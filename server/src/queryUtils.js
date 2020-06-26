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
        'asset.assetId AS assetId',
        'category',
        'name',
        'username',
        'price',
        'acquiredDate',
        'locationName',
        'managerName',
        'lastModifiedDate',
    ],
    list(filters) {
        return `SELECT ${this.visibleColumns.join(',')} FROM ${this.table} LEFT JOIN stock ON asset.assetId=stock.assetId LEFT JOIN location ON stock.locationId=location.locationId${this.generateWhereClause(filters)}`;
    },
};
Object.setPrototypeOf(assetQuery, baseQuery);

const stockQuery = {
    table: 'stock',
    visibleColumns: [
        'assetId',
        'locationId',
    ],
};
Object.setPrototypeOf(stockQuery, baseQuery);

module.exports = {
    asset: assetQuery,
    user: userQuery,
    stock: stockQuery,
};
