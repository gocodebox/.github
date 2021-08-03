const 
	core = require( '@actions/core' ),
	github = require( '@actions/github' );

const main = async () => {

  const 
  	token = core.getInput( 'repo-token' ),
  	octokit = github.getOctokit( token ),
    { context } = github;

  console.log( context );

  // await octokit.

}

main().catch( err => core.setFailed( err.message ) );