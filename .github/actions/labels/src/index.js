// Require modules.
const 
	core             = require( '@actions/core' ),
	github           = require( '@actions/github' ),
	labelSync        = require( 'github-label-sync' ),
	yaml             = require( 'js-yaml' ),
	{ readFileSync } = require( 'fs' );

const 
	accessToken = core.getInput( 'repo-token' ),
	dryRun      = core.getBooleanInput( 'dry-run' ),
	octokit     = github.getOctokit( accessToken ),
	org         = 'gocodebox',
	workspace   = process.env.GITHUB_WORKSPACE || '../../..',
	configFile  = `${ workspace }/labels.yml`;

const main = async () => {

	const
		{ default: chalk } = await import( 'chalk' ), 
		labels = yaml.load( readFileSync( configFile, 'utf8' ) );

	const repos = await octokit.paginate( 'GET /orgs/{org}/repos', {
		org,
	} );

	for ( let i = 0; i < repos.length; i++ ) {

		const { archived, disabled, fork, name } = repos[ i ];

		if ( archived || disabled || fork ) {
			continue;
		}

		core.info( ' ' );
		core.info( ' ' );
		core.info( `Processing repo: ${ name }` );

		await labelSync( {
			accessToken, 
			labels,
			dryRun,
			format: {
				diff: ( message ) => {
					return chalk.cyan(' > ') + message;
				},
				success: ( message ) => {
					return chalk.green(message);
				},
				warning: ( message ) => {
					return chalk.black.bgYellow(message);
				}
			},
			log: {
				info: core.info,
				warn: core.warning,
			},
			allowAddedLabels: true,
			repo: `${ org }/lifterlms-zapier`,
		} );

	}

};

main().catch( err => core.setFailed( err.message ) );