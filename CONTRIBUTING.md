# Contributing

Thanks for your interest in this project. Before you open a pull request, please
read the policy below.

## 🚫 No CI, no GitHub Actions — ever

**This project intentionally has no CI/CD.** Do **not** add GitHub Actions
workflows or any other continuous integration configuration to this repository —
now or in the future.

This is a permanent project policy, not a temporary state. Pull requests that
introduce CI will be closed without merging.

### What is not allowed

- GitHub Actions workflow files (`.github/workflows/*.yml` / `*.yaml`)
- Composite actions or reusable workflows (`.github/actions/**`,
  `action.yml`, `action.yaml`)
- Scheduled or automated bots/workflows that modify files in this repository
  (for example, auto-updating the README)
- Third-party CI configuration, including but not limited to CircleCI
  (`.circleci/`), Travis CI (`.travis.yml`), GitLab CI (`.gitlab-ci.yml`),
  Jenkins (`Jenkinsfile`), Azure Pipelines (`azure-pipelines.yml`), Buildkite,
  Drone, and AppVeyor
- CI-related badges, status checks, or automation hooks added to the README or
  any other file

### Why

- This repository is a GitHub profile README. It contains no application code to
  build, test, or deploy.
- All checks and updates are done manually. Automation adds noise, consumes
  Actions minutes, and has historically made unwanted commits to the README.
- Keeping the repository free of CI keeps it simple, fast, and predictable.

### If you think CI is needed

Don't add it. Open an issue describing the problem instead, and it will be
solved with a manual or local workflow.

## Making a change

1. Fork the repository and create a branch.
2. Make your change by hand.
3. Open a pull request describing what you changed and why.
4. A maintainer will review and merge it.

By contributing, you agree to follow this policy.
