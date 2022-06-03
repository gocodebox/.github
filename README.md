LifterLMS Dot Github
====================

A `.github` repo for the gocodebox (LifterLMS) organization.

### Label Sync

The [labels.yml](./labels.yml) configuration file describes the issue and pull request labels shared across organization repositories.

The [labels.yml](./.github/labels.yml) workflow runs daily to sync labels from the config file and will automatically sync labels when the config file is updated. It can also be dispatched manually to update repositories on-demand.


### Teams

The [teams.yml](./teams.yml) configuration file describes the organization's teams, the members of the teams, and the team's repository permissions.

The [teams.yml](./.github/teams.yml) workflow runs daily to sync team data from the config file and add new organization repositories to each team. The workflow also runs automatically when the `teams.yml` configuration file is modified. It can also be dispatched manually to add new repositories on-demand.