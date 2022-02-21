Issue Triage Process
====================

## GitHub Project Boards

Issues are tracked across three organization-wide GitHub project boards.

+ [Triage](https://github.com/orgs/gocodebox/projects/14): New and unreviewed issues, bug reports, etc...
+ [Active](https://github.com/orgs/gocodebox/projects/9): All issues and pull requests which are actively being worked on or have been prioritized for immediate development. Immediate development is typically anything that will be started within the next two weeks.
+ [Future](https://github.com/orgs/gocodebox/projects/15): Any issues which have been reviewed and prioritized to be worked on when capacity allows. Typically any issue which will not be addressed within the following two weeks.


## Triage Workflow

The Triage board is to be reviewed daily and should be moved to either the Active or Future board when triage is complete. The CODEOWNER is responsible for determining priority and placement of the issue during triage. They may request assistance from the other developers on the team and assign issues according to availability and capacity.

Any issues assigned to Thomas which have been awaiting triage for more than 24 hours should be triaged by the next available developer.

When a developer begins triage of an issue they should:

+ Assign the issue to yourself
+ Move the issue to the "In Review" column on the "Triage" board (this denotes that a developer is currently working on it and will save duplicate efforts due to lack of knowledge that the issue is already being triaged).

When an issue has been confirmed and moved out of the Triage board the following should occur:

+ Issue tags should be reviewed and updated: is the issue a bug, a feature request? What is the issue severity? 
+ A comment should be made updating the the reporter on the new status and providing any information uncovered during the initial review.

If more information is required from the reporter the following should occur:

+ The label "Status: Need information" should be applied to the issue.
+ A comment should be made requesting specific information from the reporter.

If you are unsure how to proceed after beginning review of an issue, tag the engineering team (`@gocodebox/engineering`) or a specific engineer to request assistance. 


## Slack or Zoom vs Issue Comments

In most circumstances it is preferred that discussions related to an issue remain in issue comments on GitHub. Of course real-time communication is often necessary to expedite triage or issue resolution. In these circumstances it is important to report a summary of these conversations on the issue. Keeping as much communication as possible on the issue will assist in asynchronous collaboration throughout them team, especially when multiple people are involved in an issue. This way the majority of information is available to everyone instead of protected in private conversations or an individual's memory.


## Determining Development Priorities

Any newly-triaged issues confirmed as normal or greater severity bug a bug should be prioritized for immediate development and prioritized according to the CODEOWNER's discretion.

In the event of confirmed bugs with a known workaround which does not require any PHP or Javascript code (CSS solutions are allowed) the issue may be prioritized for future development and moved to the Future project board.

Feature requests and feature enhancements should be discussed with the other engineers and we will collectively determine the priority based on available capacity and projects. 
