'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Post extends Model {
	static boot() {
		super.boot()

		// Add hook inside the model 
		/* this.addHook('beforeCreate', async (userInstance) => {
			userInstance.password = await Hash.make(userInstance.password)
		}) */

		this.addHook('beforeCreate', 'PostHook.addAvatar')
	}

	static get table() {
		return 'blog_posts'
	}

	static get primaryKey() {
		return 'id'
	}

}

module.exports = Post
