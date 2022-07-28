Issue Triage Process & Workflow
===============================

## GitHub Project Boards

Issues and Pull Requests are tracked on the main organization [project](https://github.com/orgs/gocodebox/projects/18/views/1).

New issues and Pull Requests are automatically added to the project with the "Awaiting Triage" status. Automation is in place to automatically update the status of an item based depending on the circumstance.

## Triage Workflow

Issues with the "Awaiting Triage" status are to be reviewed daily.

When beginning the review of an of an untriaged issue you should:

+ Assign the issue to yourself. This will let other developers know that you are already reviewing it and will reduce unnecessary duplicate efforts.
+ Update the issue's project status to "In Review"
+ If the issue is a bug report, attempt to recreate the bug and confirm it is not desired or expected behavior.
	+ If the bug can be confirmed:
		+ Apply the status issue label "bug".
		+ Determine the bug's severity and apply the associated issue label.
	+ If the bug cannot be confirmed:
		+ If more information is required, request it from the reporter and apply the "Need Information" issue status label.
		+ If the bug is invalid, let the reporter the issue could not be recreated with the information supplied and apply the "Can't Recreate" status label.
		+ If the reported issue is expected behavior, let the reporter know and, where possible, supply links to related documentation or relevant lines of code.
	+ In the event of other issues such as feature requests or suggestions apply the relevant status label

In most circumstances a reply summarizing the review and our findings should be made on the issue to let the reporter know what was determined and the new status.

After review and triage is complete the issue should either be closed, prioritized for immediate development, or backlogged.

A general rule is that low-severity issues are "safe" to be backlogged, normal or high-priority bugs should be prioritized for development. With minor issues that can be resolved rather quickly it is usually acceptable to immediately patch the issue during review. However, with larger issues it is best to discuss the prioritization with the engineering team and determine the prioritization together, taking into consideration active priorities and other issues.

When an issue is determined to be invalid, as a courtesy to the reporter, do not immediately close the issue. Instead wait 2-3 days for the reporter to respond. After a few days of inactivity from the reporter the issue should be closed with a note to the reporter letting them know the issue is invalid and if they would like to discuss it further they can reply and we'll reopen.

When we request more information from a reporter and they do not respond the developer assigned the issue should bump the issue every 3-5 days. If the reporter doesn't respond after 2-3 bumps, the issue can be closed with a note saying we'll reopen when the requested information is supplied.

Any issues assigned to Thomas which have been awaiting triage for more than 24 hours should be considered stale and can be reviewed by the next available developer.

If you are unsure how to proceed after beginning review of an issue, tag the engineering team (`@gocodebox/engineering`) or a specific engineer to request assistance. 


## Slack or Zoom vs Issue Comments

In most circumstances it is preferred that discussions related to an issue remain in issue comments on GitHub. Of course real-time communication is often necessary to expedite triage or issue resolution. In these circumstances it is important to report a summary of these conversations on the issue. Keeping as much communication as possible on the issue will assist in asynchronous collaboration throughout them team, especially when multiple people are involved in an issue. This way the majority of information is available to everyone instead of protected in private conversations or an individual's memory.


## Determining Development Priorities

Any newly-triaged issues confirmed as normal or greater severity bug a bug should be prioritized for immediate development and prioritized according to the CODEOWNER's discretion.

In the event of confirmed bugs with a known workaround which does not require any PHP or Javascript code (CSS solutions are allowed) the issue may be prioritized for future development and moved to the Future project board.

Feature requests and feature enhancements should be discussed with the other engineers and we will collectively determine the priority based on available capacity and projects. 
