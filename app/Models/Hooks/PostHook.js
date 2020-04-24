'use strict'

const PostHook = exports = module.exports = {}

PostHook.addAvatar = async (post) => {
	post.picture = '0f8826020e5517e81054ed52cfe2189d.png';
	post.picture_url = 'https://api.adorable.io/avatars/200/0f8826020e5517e81054ed52cfe2189d.png';
}


/* PostHook.hashPassword = async (user) => {
	user.password = await Hash.make(user.password)
} */