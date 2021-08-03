// Require modules.
const 
	core = require( '@actions/core' ),
	github = require( '@actions/github' ),
	{ readFileSync } = require( 'fs' ),
	yaml = require( 'js-yaml' );

let repos = [];

// Setup global vars.
const 
	token = core.getInput( 'repo-token' ),
	octokit = github.getOctokit( token ),
	{ context } = github,
	{ login: org } = context.payload.organization;


const updateTeams = async ( teams ) => {

	for ( let slug in teams ) {
		await updateTeam( slug, teams[ slug ] );
	}

};

const updateTeam = async ( team_slug, { name, description, permission, members = [], teams = {} } ) => {

	// Update team info.
	await octokit.request( 'PATCH /orgs/{org}/teams/{team_slug}', {
		org,
		team_slug,
		name,
		description,
	} );

	// Add members.
	for ( let i = 0; i < members.length; i++ ) {
		
		await octokit.request( 'PUT /orgs/{org}/teams/{team_slug}/memberships/{username}', {
			org,
			team_slug,
			username: members[ i ],
			role: 'member',
		} );

	}

	// Add Repos.
	for ( let i = 0; i < repos.length; i++ ) {
		await octokit.request( 'PUT /orgs/{org}/teams/{team_slug}/repos/{owner}/{repo}', {
			org,
			team_slug,
			permission,
			owner: org,
			repo: repos[ i ].name,
		} );
	}

	// Update child teams.
	await updateTeams( teams );


};

const main = async () => {

	repos = await octokit.paginate('GET /orgs/{org}/repos', {
		org,
	} );

	repos = repos
		.filter( ( { archived, disabled, fork } ) => false === archived && false === disabled && false === fork );

	const teamsConfig = yaml.load( readFileSync( `${ process.env.GITHUB_WORKSPACE }/teams.yml`, 'utf8' ) );

	await updateTeams( teamsConfig );

	// console.log( repos.map( ( { name } ) => name ) );



	// const teams = await octokit.request('GET /orgs/{org}/teams', {
	// 	org
	// } );

	// console.log( teams );

}

main().catch( err => core.setFailed( err.message ) );