'use strict'

const moment = use('moment')
const crypto = use('crypto')

const strRandom = async (length = 20) => {
	let string = ''
	let len = string.length
  
	if (len < length) {
	  let size = length - len
	  let bytes = await crypto.randomBytes(size)
	  let buffer = new Buffer(bytes)
  
	  string += buffer
		.toString('base64')
		.replace(/[^a-zA-Z0-9]/g, '')
		.substr(0, size)
	}

	return string
}

const isEmpty = obj => {
	for(let key in obj) {
		if(obj.hasOwnProperty(key)) {
			return false;
		}
	}

	return true;
}

module.exports = {
	strRandom,
	isEmpty
}