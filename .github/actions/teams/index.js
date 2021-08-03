const 
	core = require( '@actions/core' ),
	{ GitHub, context } = require( '@actions/github' );

const main = async () => {

  const 
  	token = core.getInput( 'repo-token' ),
  	octokit = new GitHub( token );

  console.log( context );

  // await octokit.

}

main().catch( err => core.setFailed( err.message ) );