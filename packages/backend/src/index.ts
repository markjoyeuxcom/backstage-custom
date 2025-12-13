/*
 * Hi!
 *
 * Note that this is an EXAMPLE Backstage backend. Please check the README.
 *
 * Happy hacking!
 */

import { createBackend } from '@backstage/backend-defaults';

const backend = createBackend();

// Core services
backend.add(import('@backstage/plugin-app-backend'));

// Auth plugins
backend.add(import('@backstage/plugin-auth-backend'));
backend.add(import('@backstage/plugin-auth-backend-module-github-provider'));
backend.add(import('@backstage/plugin-auth-backend-module-guest-provider'));
backend.add(import('@backstage/plugin-auth-backend-module-oidc-provider'));
backend.add(import('@backstage/plugin-auth-backend-module-gitlab-provider'));
backend.add(import('@backstage/plugin-auth-backend-module-microsoft-provider'));

// Catalog plugins
backend.add(import('@backstage/plugin-catalog-backend'));
// GitHub
backend.add(import('@backstage/plugin-catalog-backend-module-github'));
backend.add(import('@backstage/plugin-catalog-backend-module-github-org'));
// GitLab
backend.add(import('@backstage/plugin-catalog-backend-module-gitlab'));
// Azure DevOps
backend.add(import('@backstage/plugin-catalog-backend-module-azure'));
// AWS
backend.add(import('@backstage/plugin-catalog-backend-module-aws'));

// Kubernetes plugin
backend.add(import('@backstage/plugin-kubernetes-backend'));

// Permission system
backend.add(import('@backstage/plugin-permission-backend'));
backend.add(import('@backstage/plugin-permission-backend-module-allow-all-policy'));

// Proxy backend
backend.add(import('@backstage/plugin-proxy-backend'));

// Scaffolder (software templates)
backend.add(import('@backstage/plugin-scaffolder-backend'));
backend.add(import('@backstage/plugin-scaffolder-backend-module-github'));
backend.add(import('@backstage/plugin-scaffolder-backend-module-gitlab'));
backend.add(import('@backstage/plugin-scaffolder-backend-module-azure'));

// Search plugins
backend.add(import('@backstage/plugin-search-backend'));
backend.add(import('@backstage/plugin-search-backend-module-catalog'));
backend.add(import('@backstage/plugin-search-backend-module-techdocs'));

// TechDocs
backend.add(import('@backstage/plugin-techdocs-backend'));

backend.start();
