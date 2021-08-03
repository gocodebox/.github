const 
	core = require( '@actions/core' ),
	github = require( '@actions/github' ),
	{ readFileSync } = require( 'fs' ),
	yaml = require( 'js-yaml' );

const updateTeams = async ( org, teams ) => {

	for ( var key in Object.keys( teams ) ) {
		await updateTeam( org, key, teams[ key ] );
	}

};

const updateTeam = async ( org, team_slug, { name, description, permissions, members = [], teams = {} } ) => {

	await octokit.request( 'PATCH /orgs/{org}/teams/{team_slug}', {
	  org,
	  team_slug,
	  name,
	  description,
	} );	

};

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

	const teamsConfig = yaml.load( readFileSync( `${ process.env.GITHUB_WORKSPACE }/teams.yml`, 'utf8' ) );

	await updateTeams( org, teamsConfig );

	// console.log( repos.map( ( { name } ) => name ) );



	// const teams = await octokit.request('GET /orgs/{org}/teams', {
	// 	org
	// } );

	// console.log( teams );

}

main().catch( err => core.setFailed( err.message ) );