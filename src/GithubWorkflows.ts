import { GitHub, GithubWorkflow } from 'projen/lib/github';
import { JobPermission } from 'projen/lib/github/workflows-model';


export class LicenseTestsWorkflow extends GithubWorkflow {
  constructor(github: GitHub) {
    super(github, 'license_tests');
    this.on({ push: {}, workflowDispatch: {}, pullRequest: { branches: ['master', 'main'] } });
    this.addJob('license_tests', {
      name: 'license_tests',
      uses: 'neongeckocom/.github/.github/workflows/license_tests.yml@master',
      permissions: { contents: JobPermission.READ },
    });
  }
}

export class ProposeReleaseWorkflow extends GithubWorkflow {
  constructor(github: GitHub) {
    super(github, 'propose_release');
    this.on({
      workflowDispatch: {
        inputs: {
          release_type: {
            type: 'choice',
            description: 'Release Type',
            options: ['build', 'minor', 'major', 'patch', 'alpha'],
          },
        },
      },
    });
    this.addJob('update_version', {
      name: 'update_version',
      uses: 'neongeckocom/.github/.github/workflows/propose_semver_release.yml@master',
      with: {
        release_type: '${{ inputs.release_type }}',
        version_file: 'version.py',
        alpha_var: 'VERSION_ALPHA',
        build_var: 'VERSION_BUILD',
        minor_var: 'VERSION_MINOR',
        major_var: 'VERSION_MAJOR',
        update_changelog: true,
        branch: 'dev',
      },
      permissions: { contents: JobPermission.WRITE, packages: JobPermission.WRITE },
    });
    this.addJob('pull_changes', {
      needs: ['update_version'],
      uses: 'neongeckocom/.github/.github/workflows/pull_master.yml@master',
      with: {
        pr_assignee: '$\{\{ github.actor \}\}',
        pr_draft: false,
        pr_title: '$\{\{ needs.update_version.outputs.version \}\}',
        pr_body: '$\{\{ needs.update_version.outputs.changelog \}\}',
      },
      permissions: { contents: JobPermission.WRITE },
    });
  }
}

export class PublishAlphaWorkflow extends GithubWorkflow {
  constructor(github: GitHub) {
    super(github, 'publish_alpha');
    this.on({
      push: {
        branches: ['dev'],
        paths: [
          '!version.py',
          '!test/**',
          '!examples/**',
          '!.github/**',
          '!.gitignore',
          '!LICENSE',
          '!CHANGELOG.md',
          '!MANIFEST.in',
          '!README.md',
          '!scripts/*',
        ],
      },
      workflowDispatch: {},
    });
    this.addJob('publish_alpha_release', {
      uses: 'neongeckocom/.github/.github/workflows/publish_alpha_release.yml@master',
      with: {
        version_file: 'version.py',
        publish_prerelease: true,
        update_changelog: true,
        alpha_var: 'VERSION_ALPHA',
        build_var: 'VERSION_BUILD',
        minor_var: 'VERSION_MINOR',
        major_var: 'VERSION_MAJOR',
      },
      permissions: { contents: JobPermission.WRITE, packages: JobPermission.WRITE },
    });
  }
}

export class PublishReleaseWorkflow extends GithubWorkflow {
  constructor(github: GitHub) {
    super(github, 'publish_release');
    this.on({
      push: {
        branches: ['master', 'main'],
      },
    });
    this.addJob('build_and_publish_pypi_and_release', {
      uses: 'neongeckocom/.github/.github/workflows/publish_stable_release.yml@master',
      secrets: { PYPI_TOKEN: '$\{\{ secrets.PYPI_TOKEN \}\}' },
      permissions: { contents: JobPermission.WRITE, packages: JobPermission.WRITE },
    });
  }
}

export class SkillTestsWorkflow extends GithubWorkflow {
  constructor(github: GitHub) {
    super(github, 'skill_tests');
    this.on({ pullRequest: {}, workflowDispatch: {} });
    this.addJob('py_build_tests', {
      name: 'py_build_tests',
      uses: 'neongeckocom/.github/.github/workflows/python_build_tests.yml@master',
      permissions: { contents: JobPermission.READ },
    });
    this.addJob('skill_unit_tests', {
      name: 'skill_unit_tests',
      uses: 'neongeckocom/.github/.github/workflows/skill_tests.yml@master',
      permissions: { contents: JobPermission.READ },
    });
    this.addJob('skill_intent_tests', {
      name: 'skill_intent_tests',
      uses: 'neongeckocom/.github/.github/workflows/skill_test_intents.yml@master',
      permissions: { contents: JobPermission.READ },
    });
    this.addJob('skill_resource_tests', {
      name: 'skill_resource_tests',
      uses: 'neongeckocom/.github/.github/workflows/skill_test_resources.yml@master',
      permissions: { contents: JobPermission.READ },
    });
    this.addJob('skill_install_tests', {
      name: 'skill_install_tests',
      uses: 'neongeckocom/.github/.github/workflows/skill_test_installation.yml@master',
      permissions: { contents: JobPermission.READ },
    });
  }
}

export class UpdateSkillJsonWorkflow extends GithubWorkflow {
  constructor(github: GitHub) {
    super(github, 'update_skill_json');
    this.on({ push: {} });
    this.addJob('update-skill-json', {
      name: 'update_skill_json',
      uses: 'neongeckocom/.github/.github/workflows/skill_update_json_spec.yml@master',
      permissions: { contents: JobPermission.WRITE },
    });
  }
}
