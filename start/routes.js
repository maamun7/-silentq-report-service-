'use strict'


const Helpers = use('Helpers')
const Env = use('Env')
const fs = use('fs')
const readFile = Helpers.promisify(fs.readFile)

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})

/* const Database = use('Database')

Route.get('/post', async () => {
  return await Database.table('blog_posts').select('*');
}) */



// Without authenticate
Route.group( _ => {
	Route.post('login', 'AuthController.postLogin')
	Route.post('register', 'AuthController.postRegister')


	Route.post('sent-kafka-msg', 'ProducerController.publish')
}).prefix('v1')

// With authenticate
Route.group( _ => {
	require('../start/routes/api')
}).prefix('v1').middleware(['cac'])

// The following route is for downloading file 
// Route.get('/v1/media/:file', async ({ params, response }) => { return await readFile(Helpers.publicPath(`uploads/${params.file}`)) })

// app/MyOwnControllers/UserController -> index()
// Route.post(url, 'App/MyOwnControllers/UserController.index')
