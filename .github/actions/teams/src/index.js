// Require modules.
const 
	core = require( '@actions/core' ),
	github = require( '@actions/github' ),
	{ readFileSync } = require( 'fs' ),
	yaml = require( 'js-yaml' );


// Setup global vars.
let repos = [];
const 
	token = core.getInput( 'repo-token' ),
	octokit = github.getOctokit( token ),
	{ context } = github,
	{ login: org } = context.payload.organization;

/**
 * Updates a list of teams
 *
 * @since 2021-08-03
 *
 * @param {Object}  teams          Team object.
 * @param {?Number} parent_team_id ID of the parent team or null.
 * @return {void}
 */
const updateTeams = async ( teams, parent_team_id = null ) => {

	for ( let slug in teams ) {
		await updateTeam( slug, teams[ slug ], parent_team_id );
	}

};

/**
 * Update a single team
 *
 * + Updates team information
 * + Updates team members
 * + Adds all organization repos to the team with the specified permissions
 * + Updates all 
 * 
 * @since 2021-08-03
 *
 * @param {string}   team_slug Team slug.
 * @param {Object}   team             A team object.
 * @param {string}   team.name        Team name
 * @param {[type]}   team.description Team description.
 * @param {[type]}   team.permission  Team repo permission.
 * @param {string[]} team.members     Array of GitHub usernames for all team members.
 * @param {Object}   team.teams       Child teams object.
 * @param {?Number}  parent_team_id   ID of the parent team or null.
 * @return {void}
 */
const updateTeam = async ( team_slug, { name, description, permission, members = [], teams = {} }, parent_team_id = null ) => {

	console.log( `Updating team: ${ team_slug}` );

	// Update team info.
	const teamRes = await octokit.request( 'PATCH /orgs/{org}/teams/{team_slug}', {
		org,
		team_slug,
		name,
		description,
		parent_team_id,
	} );

	// Add members.
	for ( let i = 0; i < members.length; i++ ) {
		
		console.log( `Adding member: ${ members[ i ] }` );
		await octokit.request( 'PUT /orgs/{org}/teams/{team_slug}/memberships/{username}', {
			org,
			team_slug,
			username: members[ i ],
			role: 'member',
		} );

	}

	// Add Repos.
	for ( let i = 0; i < repos.length; i++ ) {
		console.log( `Adding repo: ${ repos[ i ].name }` );
		await octokit.request( 'PUT /orgs/{org}/teams/{team_slug}/repos/{owner}/{repo}', {
			org,
			team_slug,
			permission,
			owner: org,
			repo: repos[ i ].name,
		} );
	}

	// Update child teams.
	await updateTeams( teams, teamRes.id );


};

const main = async () => {

	repos = await octokit.paginate('GET /orgs/{org}/repos', {
		org,
	} );

	repos = repos
		.filter( ( { archived, disabled, fork } ) => false === archived && false === disabled && false === fork );

	const teamsConfig = yaml.load( readFileSync( `${ process.env.GITHUB_WORKSPACE }/teams.yml`, 'utf8' ) );

	await updateTeams( teamsConfig );

}

main().catch( err => core.setFailed( err.message ) );