# ancor-dashboard v0.0.3

A frontend framework for ancor

Please visit the [doc](doc) folder for more information.

## Contributing

If you would like to contribute to the project, please follow the contribution guide below.

1. Fork ancor-dashboard on Github
2. Clone your fork to your machine through git
3. Make a new branch for your feature with a descriptive branch name (i.e. description-of-feature-or-bug-fix)
4. Commit work and push to your fork on github
5. Make pull request against arguslab/ancor-dashboard's development branch with detailed description on what you wish to be merged into.

__NOTE__: Master branch is intended for release commits only. All other pull requests and development should be made against the _development_ branch until the next release has been made. So when you make your pull request be sure to make it against the _development_ branch. When the project maintainers are ready for the next release, the _development_ branch will be merged into master and tagged for release.

## Deploying ancor-dashboard

If you wish to deploy ancor-dashboard alongside [ancor](https://github.com/arguslab/ancor), please go to the [releases](https://github.com/arguslab/ancor-dashboard/releases) section of this repository and download the binaries. These can be placed within an nginx or Apache server.

_Note:_ If your ancor deployment exists on a different domain from where you are deploying ancor-dashboard, you will have to change this in the [source](https://github.com/arguslab/ancor-dashboard/blob/master/doc/setup.md#defining-the-ip-address-of-ancor) and rebuild following the [setup guide](doc/setup.md).
