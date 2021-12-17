import fs from 'fs';
import http from 'http';

const options = {
	host: 'www.stackoverflow.com',
	port: 80,
	path: '/index.html'
};

// Check event loop call order
const it = cb => {
	console.log('Start1');
	console.log('Start2');
	console.log('Start3');
	console.log('Start4');
	setTimeout(() => console.log('setTimeout1'), 0);
	setImmediate(() => console.log('setImmediate1'));
	process.nextTick(() => console.log('nextTick1'));
	setImmediate(() => console.log('setImmediate2'));
	process.nextTick(() => console.log('nextTick2'));
	http.get(options, () => console.log('httpIO1'));
	fs.readdir(process.cwd(), () => console.log('readdirIO1'));
	console.log('Done1');
	setImmediate(() => console.log('setImmediate3'));
	process.nextTick(() => console.log('nextTick3'));
	setImmediate(() => console.log('setImmediate4'));
	// setInterval(() => console.log('setInterval1'), 3000);
	fs.readdir(process.cwd(), () => console.log('readdirIO2'));
	console.log('Done2');
	setTimeout(cb, 2500);
	// setInterval(() => console.log('setInterval2'), 2000);
	console.log('Done3');
	process.nextTick(() => console.log('nextTick4'));
	console.log('Done4');
};

const call = (cb1, cb2) => {
	cb1(cb2);
};

call(it, () => console.log('setTimeout2'));
