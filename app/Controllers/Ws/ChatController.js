'use strict'

class ChatController {
	constructor({ socket, request }) {
		this.socket = socket
		this.request = request

		console.log('Connected socket is %s', socket.id);
	}

	onMessage(message) {
		this.socket.on('message', message);
	}

	onClose() {
		// same as: socket.on('close')
	}

	onError() {
		// same as: socket.on('error')
	}

	disconnected() {
		console.log('Disconnected socket is %s', socket.id);
	}
}


module.exports = ChatController
