Coding, Pull Requests, and Code Review Workflows
================================================

## Repository Anatomy

Our distributed codebase repositories all follow the same general anatomy and workflows.


### Branches

`trunk` - This is the main source code branch

+ Code on this this branch is the most recent version of the source code.
+ In most circumstances developers should not push directly to trunk. Some exceptions are when editing non-distributed files (such as files in the `docs/` or `.github/` directories).
+ When changes are pushed directly to trunk, they will be automatically synced to the `dev` branch via GitHub Workflow.


`dev` - The main development branch

+ Code on this branch is akin a "nightly" or "canary" build. 
+ All pull requests should be opened against this branch.
+ When this branch is ahead of the `trunk` branch, a [Release Pull Request](https://github.com/gocodebox/.github/blob/trunk/docs/deployment.md#release-pull-requests) should be opened to stage and track yet-to-be-released changes.
+ When a release is ready for distribution, the Release Pull Request will be merged into the `trunk` branch via the [Deployment Process](./deployment.md).


`release` - The main distributed code branch

+ Code on this this branch is the most recent version of the distributed code
+ All development related code and files such as configuration and test files is removed
+ Used as the "committish" for tagged releases
+ Never push directly to this branch. It is pushed to during creation via the `@lifterlms/dev release create` command [[docs](https://github.com/gocodebox/lifterlms/tree/trunk/packages/dev#release-create)].

`prerelease` - A distributed code branch for prereleases

+ Like the `release` branch except it is pushed to when a `prerelease` is created and tagged.
+ This exists to ensure the `release` branch never gets lost when prereleases are being released.


`[a-zAZ+]` - Any other branch 

+ Nearly any other branch is considered a feature branch.
+ There is no enforced naming convention for feature branches.
+ New code, features, and bug fixes should be developed on feature branches.
+ When complete or ready for review the feature branch can be merged into `dev` by opening a new Pull Request



## Pull Request Workflow

All new code should be merged into the primary branch via pull request.

Developers are encouraged to open WIP (Work In Progress) and draft pull requests as early as possible.

When completed, the developer should request a review on their pull request from `@gocodebox/engineering`.

Tests should always accompany pull requests when the affected code can be tested (most code can be tested). In certain circumstances we will waive the necessity to write new tests but the assumption should be that pull requests will be rejected when not accompanied by tests.

The code contained within a pull request should attempt to address a single issue or feature (with some exception).

One or more changelog files should accompany each PR. Changelog files can be generated using the `@lifterlms/dev changelog add` command [[docs](https://github.com/gocodebox/lifterlms/tree/trunk/packages/dev#changelog-add)].

A PR should have at least one approved review before merging.



## Code Review Workflow

When performing code review, a developer should:

+ Ensure existing automated CI/CD checks pass (tests, coding standards, etc...)
+ Review the code to ensure it does what it is supposed to do
+ Review the tests to ensure they actually test the code
+ When possible, checkout the code locally and perform manual tests and quality assurance
+ Look for areas where core LifterLMS or WordPress functions can be leveraged to reduce the code footprint.
+ Look for potential issues in the code that the coder may have missed
+ Look for opportunities to "play golf" and reduce the code footprint with syntactical sugar. Keeping in mind that readability is generally more important than brevity.
+ Pay special attention to security especially with regards to escaping and sanitization of user inputs.

When changes are requested, use the GitHub pull request review interface to leave comments and / or suggestions inline with the code.


## Code Quality and Test Coverage Metrics

All our production codebase repositories are automatically analyzed by CodeClimate to grade the code's quality and present overall test coverage.

LifterLMS subscribes to CodeClimate's default rulesets for quality. A CI/CD check will automatically report quality issues. We do not often reject code based on this analysis but we do strive to improve code quality over time. With this in mind, developers are encouraged to download and run the [CodeClimate CLI analyzer](https://github.com/codeclimate/codeclimate) locally, especially against new code and files, while coding and before opening pull requests.

Test coverage is reviewed as a long-term metric to ensure that as an engineering team we are embracing a test-driven approach to development and engineering. Over time test coverage should generally improve. Running test coverage locally isn't difficult but is often time consuming as a regular part of a development workflow due to the requiring xdebug, which makes PHPUnit testing notably slower.

Additionally, we do not currently send jsunit coverage reports to CodeClimate. As our codebases become more Javascript-heavy we will address this and include JSUnit coverage in our metrics and analytics.
