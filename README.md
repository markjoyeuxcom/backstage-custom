# Backstage Custom

A custom Backstage image with full capabilities for platform engineering, supporting GitHub, GitLab, Azure DevOps, Azure, and AWS.

## Features

### Core Plugins
- **Kubernetes Plugin** - View Kubernetes resources for catalog entities
- **TechDocs** - Technical documentation support
- **Catalog Graph** - Entity relationship visualization
- **Tech Radar** - Technology radar visualization
- **Cost Insights** - Cloud cost tracking (requires backend implementation)
- **Stack Overflow** - Search Stack Overflow from Backstage

### GitHub Integration
- **GitHub Catalog Provider** - Auto-discover catalog entities from GitHub repositories
- **GitHub Org Provider** - Sync users/groups from GitHub organizations
- **GitHub Scaffolder Actions** - Create repos, open PRs from software templates
- **GitHub Auth** - OAuth authentication

### GitLab Integration
- **GitLab Catalog Provider** - Auto-discover catalog entities from GitLab
- **GitLab Scaffolder Actions** - Create repos, MRs from software templates
- **GitLab Auth** - OAuth authentication
- **GitLab Plugin** - View MRs, pipelines, issues

### Azure DevOps Integration
- **Azure DevOps Catalog Provider** - Discover entities from Azure DevOps repos
- **Azure Scaffolder Actions** - Create repos, PRs in Azure DevOps
- **Azure DevOps Plugin** - View pipelines, builds, pull requests

### Microsoft/Azure Auth
- **Microsoft Auth** - Azure AD/Entra ID authentication

### AWS Integration
- **AWS Catalog Provider** - Discover resources from AWS accounts

### Other Auth Providers
- **OIDC Auth** - Generic OIDC (Keycloak, Okta, Auth0, etc.)
- **Guest Auth** - For development/testing

## Quick Start

### Local Development

```bash
# Install dependencies
yarn install

# Start backend and frontend
yarn dev
```

### Docker

```bash
# Build image
docker build -t backstage-custom .

# Run with environment variables
docker run -p 7007:7007 \
  -e POSTGRES_HOST=localhost \
  -e POSTGRES_PORT=5432 \
  -e POSTGRES_USER=backstage \
  -e POSTGRES_PASSWORD=secret \
  -e POSTGRES_DB=backstage \
  -e GITHUB_TOKEN=your-token \
  backstage-custom
```

## Configuration

### Environment Variables

#### Core
| Variable | Description |
|----------|-------------|
| `APP_BASE_URL` | Frontend URL (e.g., https://backstage.example.com) |
| `BACKEND_BASE_URL` | Backend URL (usually same as APP_BASE_URL) |
| `POSTGRES_HOST` | PostgreSQL host |
| `POSTGRES_PORT` | PostgreSQL port |
| `POSTGRES_USER` | PostgreSQL username |
| `POSTGRES_PASSWORD` | PostgreSQL password |
| `POSTGRES_DB` | PostgreSQL database name |

#### GitHub
| Variable | Description |
|----------|-------------|
| `GITHUB_TOKEN` | GitHub personal access token for integrations |
| `AUTH_GITHUB_CLIENT_ID` | GitHub OAuth app client ID |
| `AUTH_GITHUB_CLIENT_SECRET` | GitHub OAuth app client secret |

#### GitLab
| Variable | Description |
|----------|-------------|
| `GITLAB_TOKEN` | GitLab personal access token |
| `AUTH_GITLAB_CLIENT_ID` | GitLab OAuth app client ID |
| `AUTH_GITLAB_CLIENT_SECRET` | GitLab OAuth app client secret |

#### Azure DevOps
| Variable | Description |
|----------|-------------|
| `AZURE_DEVOPS_ORG` | Azure DevOps organization name |
| `AZURE_DEVOPS_TOKEN` | Azure DevOps personal access token |

#### Microsoft/Azure AD Auth
| Variable | Description |
|----------|-------------|
| `AUTH_MICROSOFT_CLIENT_ID` | Azure AD app client ID |
| `AUTH_MICROSOFT_CLIENT_SECRET` | Azure AD app client secret |
| `AUTH_MICROSOFT_TENANT_ID` | Azure AD tenant ID |

#### OIDC (Keycloak, etc.)
| Variable | Description |
|----------|-------------|
| `AUTH_OIDC_METADATA_URL` | OIDC provider metadata URL |
| `AUTH_OIDC_CLIENT_ID` | OIDC client ID |
| `AUTH_OIDC_CLIENT_SECRET` | OIDC client secret |

### Kubernetes Plugin

Configure clusters via environment variables:

```yaml
# In your Helm values or ConfigMap
APP_CONFIG_kubernetes__clusterLocatorMethods: |
  - type: config
    clusters:
      - name: my-cluster
        url: https://kubernetes.default.svc
        authProvider: serviceAccount
        serviceAccountToken: ${K8S_TOKEN}
```

### AWS Integration

AWS integration typically uses IAM roles (IRSA on EKS) rather than explicit credentials:

```yaml
# Ensure your pod has the appropriate IAM role attached
# The AWS SDK will automatically use the role credentials
```

## Catalog Providers

### GitHub Discovery

```yaml
catalog:
  providers:
    github:
      myOrg:
        organization: 'my-github-org'
        catalogPath: '/catalog-info.yaml'
        filters:
          branch: 'main'
          repository: '.*'
        schedule:
          frequency: { minutes: 30 }
          timeout: { minutes: 3 }
```

### GitLab Discovery

```yaml
catalog:
  providers:
    gitlab:
      myGitlab:
        host: gitlab.com
        branch: main
        fallbackBranch: master
        skipForkedRepos: false
        group: my-group
        entityFilename: catalog-info.yaml
        schedule:
          frequency: { minutes: 30 }
          timeout: { minutes: 3 }
```

### Azure DevOps Discovery

```yaml
catalog:
  providers:
    azureDevOps:
      myOrg:
        organization: my-org
        project: '*'
        repository: '*'
        path: /catalog-info.yaml
        schedule:
          frequency: { minutes: 30 }
          timeout: { minutes: 3 }
```

## Publishing

The image is automatically built and pushed to Docker Hub on merge to main:

```
markjoyeux/backstage-custom:latest
markjoyeux/backstage-custom:sha-<commit>
markjoyeux/backstage-custom:v1.0.0  # on tags
```

## License

Apache 2.0
