
exports.up = function(knex) {

	return knex.schema.createTable('users', function (table) {
		table.increments('id');
		table.string('username').unique().notNullable();
        table.string('password').notNullable();
        table.string('department');
    });

}


exports.down = function(knex) {
    return knex.schema.dropTable('users');
};
