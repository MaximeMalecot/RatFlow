# IAC

## Setup

First of all, create an account on GCP and a new project [here](https://cloud.google.com)

Install GCloud CLI and configure it to use your project by following these instructions [here](https://cloud.google.com/sdk/docs/install)

Now run these commands ONE BY ONE :

```
gcloud auth application-default login
gcloud projects list
gcloud config set project PROJECT_ID
gcloud services enable compute.googleapis.com artifactregistry.googleapis.com container.googleapis.com gcloud services enable run.googleapis.com
pulumi config set gcp:project YOUR_PROJECT_ID
```

Now follow this [guide](https://www.pulumi.com/docs/install/) to install pulumi.

And you can finally run

```
pulumi up
```

## Usage

We created an empty cloud run instance, an artifact registry, and all mandatory ressources to automate deployment.

To use it on your own, you can set the variable at top of index.ts named "repo" to your own.
To push the changes, and use the automation workflows that we have in the .github folder you'll need to set the variables based on pulumi's output as follow :

- PROJECT_ID
- PROVIDER_ID
- SERVICE_ACCOUNT
- SERVICE_NAME

For our github actions files, you'll also need a MongoDB Database, and a JWT Secret.
We didn't create them here since we used another project to create it, and optimize cost.

To resume, you'll need, in addition of the variables above, in github actions:

- DATABASE_URL
- JWT_SECRET

## Costs and performance

The cloud run instance that we created is the most basic one, since it'll depend on your infrastucture.

We highly recommand to modify it's specification, mostly the autoscaling part, in GCP console.
