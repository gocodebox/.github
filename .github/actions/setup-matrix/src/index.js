// Require modules.
const 
	core = require( '@actions/core' ),
	github = require( '@actions/github' ),
	defaults = require( './defaults.json' ),
	{ existsSync, readFileSync } = require( 'fs' ),
	yaml = require( 'js-yaml' ),
	{ context } = github;

// process.env.GITHUB_WORKSPACE = '../../../';
// context.workflow = 'test-phpunit';

function getMatrixForWorkflow( fullConfig, workflow ) {
	return fullConfig[ workflow ] ? fullConfig[ workflow ] : {};
}

function loadMatrix( workflow ) {

	const defaultMatrix = getMatrixForWorkflow( defaults, workflow ),
		customPath = `${ process.env.GITHUB_WORKSPACE }/.github/workflow-matrix.yml`;

	if ( existsSync( customPath ) ) {

		const customMatrix = getMatrixForWorkflow( yaml.load( readFileSync( customPath, 'utf8' ) ), workflow );

		// Remove values from the specified keys.
		if ( customMatrix.__delete ) {

			customMatrix.__delete.forEach( path => {

				const [ deleteKey, deleteIndex ] = path.match( /[^\]\[.]+/g );
				if ( defaultMatrix[ deleteKey ] ) {
					defaultMatrix[ deleteKey ] = defaultMatrix[ deleteKey ].filter( ( val, index ) => index !== parseInt( deleteIndex ) );
				}

			} );

			delete customMatrix.__delete;

		}

		// If we have a custom config, handle merging it.
		if ( Object.keys( customMatrix ).length ) {

			// Get the merge strategy and then delete it.
			const { merge = 'append' } = customMatrix;
			delete customMatrix.merge;

			// Replace default keys with the values supplied in the custom config.
			if ( 'replace' === merge ) {
				return Object.assign( defaultMatrix, customMatrix );

			// Merge custom key values into default key values (appending them).
			} else if ( 'append' === merge ) {

				Object.keys( customMatrix ).forEach( key => {
					defaultMatrix[ key ] = [].concat( defaultMatrix[ key ] || [], customMatrix[ key ] );
				} );

				return defaultMatrix;

			// Use the entire custom config as is.
			} else if ( 'full' === merge ) {

				return customMatrix;

			}

		}
		

	}

	return defaultMatrix;

}

try {

	console.log( process.env );

	const { workflow } = context,
		matrix = loadMatrix( workflow );
    // console.log( matrix );
    core.setOutput( 'matrix', JSON.stringify( matrix ) );

} catch ( error ) {

	core.setFailed( error.message );

}