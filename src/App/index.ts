import yargs from 'yargs';

const argv = yargs.options({
	next: {
		type: 'boolean',
		default: false,
		describe: 'true to use next.js instead on the normal react',
	},
});

console.log(argv);
