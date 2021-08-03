const 
	core = require( '@actions/core' ),
	github = require( '@actions/github' ),
	YAML = require('yamljs');


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
		.filter( ( { archived, disabled, fork } ) => false === archived && false === disabled && false === fork );

	const teamsConfig = YAML.parse( `${ process.env.GITHUB_WORKSPACE }/teams.yml` );

	// console.log( repos.map( ( { name } ) => name ) );

	console.log( teamsConfig );


	// const teams = await octokit.request('GET /orgs/{org}/teams', {
	// 	org
	// } );

	// console.log( teams );

}

main().catch( err => core.setFailed( err.message ) );