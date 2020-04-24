'use strict'

class StorePost {

	get rules() {
		return {
			title: 'required|unique:blog_posts',
			body: 'required'
		}
	}

	get messages() {
		return {
			'title.required': 'The title is required !',
			'title.unique': 'The title already has been taken !',
			'body.required': 'The body is required !'
		}
	}

	get validateAll() {
		return true
	}

	async fails(errorMessages) {

		return this.ctx.response.status(200).json(errorMessages)
	}
}

module.exports = StorePost
