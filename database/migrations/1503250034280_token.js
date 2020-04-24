'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TokensSchema extends Schema {
  up () {
    this.create('tokens', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.integer('user_type').unsigned().defaultTo(0);
      table.string('token', 255).notNullable().unique().index()
      table.string('type', 80).notNullable()
      table.string('client').nullable()
      table.string('ip', 30).nullable()
      table.boolean('is_revoked').defaultTo(false)
      //table.timestamps()
	  table.timestamp('started_at').defaultTo(this.fn.now())
	  table.timestamp('expire_at').nullable()
      table.integer('is_expire').unsigned().defaultTo(0);
    })
  }

  down () {
    this.drop('tokens')
  }
}

module.exports = TokensSchema
