# Use Cases

Here is some general information about the use cases of the dashboard.

Information is subject to change.

## Instances

### General Overview

This is the view you see when you visit the main page of the dashboard

### Instances

#### State of Instances

`GET /api/instances`

Will be displayed on a table view

`GET /api/instances/123`

Currently this view is missing some of the more advanced details due to lack of data. Will update photo once I've got actual data from the REST API.

Will be displayed on modal popup

#### Create new instance

`POST /v1/instances`

Select the button above the instances table.

#### Mark an instance for replacement

`POST /v1/instances/123`

Select the `replace` button in the instance table view

#### Delete an instance

`DELETE /v1/instances/123`

Select the `delete` button in the instance table view

## Configuration Setup

This defines how users will submit arml configs to ancor

### Submit a New Config

Ace Editor
