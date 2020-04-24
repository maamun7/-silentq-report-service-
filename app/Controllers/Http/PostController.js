'use strict'
const Database = use('Database')
const Post = use('App/Models/Post')
const Helpers = use('Helpers')
const Env = use('Env')
const fs = use('fs')

class PostController {

	async grtList({ request, response }) {
		return await Database.table('blog_posts').select('*');
	}

	async getItem({ params, request, response }) {
		const { id } = params
		const post = await Post.find(id)

		if (post) {
			return response.status(200).send({
				status: 'SUCCESS',
				code: 200,
				msg: `Available result !`,
				data: post
			})
		} else {
			return response.status(200).send({
				status: 'EMPTY',
				code: 200,
				msg: `No matched result found by id ${id}`,
				data: {}
			})
		}
	}

	async postStore({ request, response }) {
		// const title = request.input('title')
		const { title, body } = request.all()

		const post = new Post()
		post.title = title
		post.body = body

		await post.save()

		if (post.id) {
			return response.status(200).send({
				status: 'SUCCESS',
				code: 200,
				msg: 'Post has been created successfully !',
				data: post
			})
		} else {
			return response.status(200).send({
				status: 'EMPTY',
				code: 200,
				msg: 'Unable to create post !',
				data: {}
			})
		}
	}

	async postUploadPicture({ params, request, response }) {
		const { id } = params
		const readFile = Helpers.promisify(fs.readFile)

		const picture = request.file('picture');

		await picture.move(Helpers.publicPath('uploads'), {
			name: `${new Date().getTime()}.${picture.subtype}`
		})
	
		if (!picture.moved()) {
			return picture.error()
		}

		const post = await Post.find(id)
		post.picture = picture.fileName
		post.picture_url = `${Env.get('APP_URL')}/${Env.get('APP_URL_VERSION')}/media/${picture.fileName}`
		post.save()
		
		// post.image = await readFile(Helpers.publicPath(`uploads/${picture.fileName}`))

		if (post) {
			return response.status(200).send({
				status: 'SUCCESS',
				code: 200,
				msg: 'Updated image successfully !',
				data: post
			})
		} else {
			return response.status(200).send({
				status: 'ERROR',
				code: 200,
				msg: 'Unable to updated image !',
				data: post
			})
		}
	}
}

module.exports = PostController
