'use strict'

class PostUploadImage {
	get rules() {
		return {
			picture: 'file|file_ext:png,jpg,jpeg|file_size:2mb|file_types:image'
		}
	}
}

module.exports = PostUploadImage
