'use strict'
const { validateAll, formatters } = use('Validator')
const User = use('App/Models/User')
const Token = use('App/Models/Token')
const Hash = use('Hash')
const Encryption = use('Encryption')

class AuthController {

	async postLogin({ request, response, auth }) {

		const v = await validateAll(request.all(), {
			email: 'required|email',
			password: 'required'
		},
		{
			'email.required': 'The email field is required !',
			'email.email': 'Please enter a valid email !',
			'password.required': 'The password field is required !'
		})

		if (v.fails()) {
			return v.messages()
		}

		const { email, password } = request.all()
		const user = await User.findBy('email', email)

		if (user) {
			const isMatched = await Hash.verify(password, user.password)
			if (isMatched) {
				//const tokenObj = await auth.withRefreshToken().generate(user)
				const tokenObj = await auth.generate(user)
				user.tokenObj = tokenObj
				user.token = tokenObj.token
				user.tokenWithBearer = `Bearer ${tokenObj.token}`

				await this.storeToken(user, request);

				return await this.loginSuccess(response, user);
			}
		}
		
		this.loginFailed(response, null)
	}

	async storeToken(user, request) {
		// Make expire previous one
		await Token.query()
		.where('user_id', user.id)
		.update({ 'is_expire': 1 })

		const token = new Token();
		token.user_id = user.id
		token.user_type = 0
	//	token.token = await Hash.make(user.token)
		token.token = user.token
		token.type = 'jwt_refresh_token'
		token.client = request.header('User-Agent')
		token.ip = request.ip()
		await token.save()

		return;
	}

	async loginFailed(response, msg = 'Failed to login !') {
		return response.status(200).send({
			status: 'FAILED',
			code: 200,
			msg: 'Failed to login !',
			data: {}
		})
	}

	async loginSuccess(response, user) {
		return response.status(200).send({
			status: 'SUCCESS',
			code: 200,
			msg: 'You have successfully loged in !',
			data: user
		})
	}

	async postRegister({ request, response }) {
		const { name, email, password } = request.all()

		const v = await validateAll(request.all(), {
			name: 'required|min:3',
			email: 'required|email|unique:users,email',
			password: 'required'
		},
		{
			'name.required': 'The name field is required !',
			'email.required': 'The email field is required !',
			'email.email': 'Please enter a valid email !',
			'email.unique': 'The email has already been taken !',
			'password.required': 'The password field is required !'
		})
		
		if (v.fails()) {
			return v.messages()
		}

		const user = new User()
		user.name = name
		user.email = email
		user.password = password
		await user.save()

		if (user.id) {
			return response.status(200).send({
				status: 'SUCCESS',
				code: 200,
				msg: 'User has been created successfully !',
				data: user
			})
		} else {
			return response.status(200).send({
				status: 'EMPTY',
				code: 200,
				msg: 'Unable to create user !',
				data: {}
			})
		}
	}
}

module.exports = AuthController
