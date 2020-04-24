'use strict'

const Route = use('Route')

Route.get('post', 'PostController.grtList').middleware(['acl:view_post'])
Route.get('post/:id', 'PostController.getItem').middleware(['acl:view_post'])
Route.post('post/store', 'PostController.postStore').middleware(['acl:create_post']).validator('StorePost')
Route.post('post/upload-image/:id', 'PostController.postUploadPicture').middleware(['acl:create_post']).validator('PostUploadImage')

