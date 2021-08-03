const 
	core = require( '@actions/core' ),
	github = require( '@actions/github' );

const main = async () => {

	const 
		token = core.getInput( 'repo-token' ),
		octokit = github.getOctokit( token ),
		{ context } = github,
		{ login: org } = context.payload.organization;

	let repos = await octokit.paginate('GET /orgs/{org}/repos', {
		org,
	} );

	repos = repos
		.filter( ( { archived } ) => false === archived )
		.filter( ( { disabled } ) => false === disabled );

	console.log( repos.map( ( { name } ) => name ) );


	// const teams = await octokit.request('GET /orgs/{org}/teams', {
	// 	org
	// } );

	// console.log( teams );

}

main().catch( err => core.setFailed( err.message ) );