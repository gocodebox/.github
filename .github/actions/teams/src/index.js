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
		.filter( ( { archived } ) => archived )
		.filter( ( { disabled } ) => disabled );

	console.log( repos );


	// const teams = await octokit.request('GET /orgs/{org}/teams', {
	// 	org
	// } );

	// console.log( teams );

}

main().catch( err => core.setFailed( err.message ) );