const 
	core = require( '@actions/core' ),
	github = require( '@actions/github' );

const main = async () => {

	const 
		token = core.getInput( 'repo-token' ),
		octokit = github.getOctokit( token ),
		{ context } = github,
		{ login: org } = context.organization;

	console.log( org, context.organization );

	const teams = await octokit.request('GET /orgs/{org}/teams', {
		org
	} );

	console.log( teams );

}

main().catch( err => core.setFailed( err.message ) );