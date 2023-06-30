import * as gcp from "@pulumi/gcp";
import { project } from "@pulumi/gcp/config";
import * as pulumi from "@pulumi/pulumi";

const repo = "MaximeMalecot/RatFlow";
const gcpLocation = "europe-west9";

// Create Artifact Registries and give access to all users
const repository = new gcp.artifactregistry.Repository("ratflow", {
  project: project,
  repositoryId: "analytics",
  format: "DOCKER",
  location: gcpLocation,
});

// Allow all users to read the repository

new gcp.artifactregistry.RepositoryIamMember("publicRead", {
  project: project,
  location: repository.location,
  repository: repository.name,
  role: "roles/artifactregistry.reader",
  member: "allUsers",
});

// Create Service Account for CI/CD

const serviceAccount = new gcp.serviceaccount.Account("analyticsSA", {
  project: project,
  accountId: "analytics-sa",
  displayName: "Service Account for Ratflow Actions",
});

// Create WIDP for CI/CD

const widp = new gcp.iam.WorkloadIdentityPool("github-widp-analytics", {
  project: project,
  displayName: "WIDP for Ratflow Actions",
  workloadIdentityPoolId: "github-widp-analytics",
});

// Create OIDC Provider for CI/CD

const oidcProvider = new gcp.iam.WorkloadIdentityPoolProvider(
  "github-oidc-cinqoo",
  {
    project: project,
    workloadIdentityPoolId: widp.workloadIdentityPoolId,
    workloadIdentityPoolProviderId: "github-oidc",
    displayName: "OIDC Provider for Github Actions",
    attributeMapping: {
      "google.subject": "assertion.sub",
      "attribute.actor": "assertion.actor",
      "attribute.repository": "assertion.repository",
    },
    oidc: {
      issuerUri: "https://token.actions.githubusercontent.com",
    },
  }
);

// Allow repository to impersonate the service account

new gcp.serviceaccount.IAMMember("iamMember", {
  serviceAccountId: serviceAccount.name,
  role: "roles/iam.workloadIdentityUser",
  member: pulumi.interpolate`principalSet://iam.googleapis.com/${widp.name}/attribute.repository/${repo}`,
});

// Allow service account to push to the repository

new gcp.artifactregistry.RepositoryIamMember("admin", {
  project: project,
  location: repository.location,
  repository: repository.name,
  role: "roles/artifactregistry.admin",
  member: pulumi.interpolate`serviceAccount:${serviceAccount.email}`,
});

const cloudRun = new gcp.cloudrun.Service("ratflow", {
  location: gcpLocation,
  template: {
    spec: {
      containers: [
        {
          image: "us-docker.pkg.dev/cloudrun/container/hello",
        },
      ],
    },
  },
  traffics: [
    {
      latestRevision: true,
      percent: 100,
    },
  ],
  autogenerateRevisionName: true,
});

// Service Account for Cloud Run
new gcp.cloudrun.IamMember("cloudRunAdmin", {
  location: gcpLocation,
  project: project,
  service: cloudRun.name,
  role: "roles/run.admin",
  member: pulumi.interpolate`serviceAccount:${serviceAccount.email}`,
});

// Service Account for Cloud Build
new gcp.projects.IAMBinding("buildEditor", {
  project: project ?? "cinqoo",
  members: [pulumi.interpolate`serviceAccount:${serviceAccount.email}`],
  role: "roles/cloudbuild.builds.editor",
});

// Service Account for Storage
new gcp.projects.IAMBinding("storageAdmin", {
  project: project ?? "cinqoo",
  members: [pulumi.interpolate`serviceAccount:${serviceAccount.email}`],
  role: "roles/storage.objectAdmin",
});

// Ensure that actAs works for compute SA

const defaultComputeServiceAccount = gcp.compute.getDefaultServiceAccount();
new gcp.serviceaccount.IAMMember("actAsCompute", {
  member: pulumi.interpolate`serviceAccount:${serviceAccount.email}`,
  role: "roles/iam.serviceAccountUser",
  serviceAccountId: defaultComputeServiceAccount.then((account) => account.id),
});

// Make the Cloud Run instance public
new gcp.cloudrun.IamMember("myCloudRunIamMember", {
  location: gcpLocation,
  project: project,
  service: cloudRun.name,
  role: "roles/run.invoker",
  member: "allUsers",
});

export const PROJECT_ID = project;
export const SERVICE_ACCOUNT = serviceAccount.email;
export const PROVIDER_ID = oidcProvider.name;
export const SERVICE_NAME = cloudRun.name;
