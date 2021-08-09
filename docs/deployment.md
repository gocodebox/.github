Deployment and Release Process
==============================

This document outlines the process for building and deploying LifterLMS projects.

## Release Pull Requests

As a release is constructed, PRs are opened against the `dev` branch. Once a PR is merged into `dev` a release pull request should be opened against `trunk` with the title "Pending Release". 

The release PR exists to track unreleased changes which have been approved and are ready to deploy. The content of the release PR should track all the issues and PRs associated with the current (pending release).

The content might look like the following:

```
+ Fixes #123 via #456
+ Fixes #789 via #1011
+ #1213

```

In the above example the keyword "Fixes" is used to associate issues which will be closed by the PR and "via" is used to track the PR used to implement the fix.

The item on the 3rd line, `#1213` is a PR that isn't associated with any issues.

We record this list so that, at a glance, we can identify very quickly which issues were included in a particular release.

Most add-ons will ship nearly immediately after the release PR is opened whereas the LifterLMS core ships once or twice a week due to more activity on the repo.

Once we've determined what the version number for a particular release will be, the PR title should be changed from "Pending Release" to "Release Version 1.2.3" (where 1.2.3 is the version number).

This PR will *not* be merged manually. It will be merged automatically during the release.


## Building the release archive

Each project is released as a `.zip` file which is pushed to either LifterLMS.com (S3 and etc...) or WordPress.org.

Each release must be tagged in GitHub and a new GitHub release must be made based off that tag.

The `release` branch of each codebase is used to hold the state of the actual distributed release (as opposed to the `trunk` branch which holds non-distributed development and meta files).

Each project has it's own nuances to the build process but, in general, the following process can be followed:

1. Make sure the trunk branch is up to date and test suites are passing
	1a. Ensure the remote `dev` branch is even with the remote `trunk` branch: `git pull origin trunk && git push origin dev`.
	1b. Ensure your local branch is even with the remote branch: `git pull origin dev`.
	1c. Ensure travis, codeclimate, etc... have all passed.
2. Decide a version number bump (major, minor, patch)
3. Write the changelog with `llms-dev log:write <version_bump>`.
4. Replace `[version]` placeholders with `llms-dev ver:update <version_bump>`.
5. Build generated files, static assets, etc:
	5a. The build script for most projects is `npm run build`, however not all codebases have been updated to include a build script. Consult the `README.md` or relevant documentation for the project. _If the project doesn't contain a build script in the `package.json` file it should be added and documented._
6. Inspect local changes for inconsistencies and general QA (diff changes, run test suites, whatever you need to do so you can sleep at night).
7. Commit and push your local changes.
	7a. Use a commit message that notes this is a build chore and the version number, eg: "Build version 1.2.3".
	7b. For smaller change sets (less than 10 changed files) push changes directly to `dev`. Larger change sets should switch to a build branch (eg `git checkout -B build/1.2.3`) and open a new PR against `dev`. This will enable easy tracking of the build changes and allow rollbacks of the PR in the event of issues encountered during the build.
8. Build the release archive: `llms-dev archive`
	8a. Inspect the constructed zip file (pass the inspect `-i` flag to automatically unzip after zipping) and ensure it was constructed properly.
	8b. Run QA against the zip file by testing that it can actually install via WordPress and etc...


## Publishing a Release

Once all status checks have passed on the Release Pull Request and you've generated a release archive locally, the release is ready to be published.

The next steps all happen automatically by running the command `llms-dev publish:gh`:

1. The contents of the archive will be unzipped, committed, and force-pushed to the `release` branch.
2. A new GitHub release (and tag) will be created from the `release` branch
3. The release archive will be uploaded to S3 (and WordPress.org where applicable)
4. The Release Pull Request will be merged (`dev` to `trunk`). 
5. A changelog blog post will be posted to make.lifterlms.com
6. LifterLMS.com meta data for the project will be updated
7. For projects not distributed via WordPress.org the project's `.pot` file will be imported into the GlotPress instance at translate.lifterlms.com
8. A release message will be posted to the `#general` channel on both the LifterLMS community and internal codeBOX company slack workspaces.

Your local machine will only perform steps 1-4. Once the GitHub release is published a webhook ping to the build server handles steps 5-8.

If any errors are encountered on during steps 5-8 the Slack notification on the internal Slack channel will note that the process completed with errors. Contact Thomas to review the logs and see what happened.

Generally steps 5-8 run within a minute, however when deploying to WordPress.org via SVN it takes a bit longer and since the LifterLMS core has grown quite large this process sometimes takes as long as 5 minutes. If, after 5 minutes, the Slack notification hasn't shown up contact Thomas to debug what might be a new issue we haven't encountered before.
