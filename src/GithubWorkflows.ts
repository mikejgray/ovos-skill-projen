import { GitHub, GithubWorkflow } from 'projen/lib/github';
import { JobPermission } from 'projen/lib/github/workflows-model';


export class LicenseTestsWorkflow extends GithubWorkflow {
  constructor(github: GitHub) {
    super(github, 'license_tests');
    this.on({ push: {}, workflowDispatch: {} });
    this.addJob('license_tests', {
      name: 'license_tests',
      uses: 'neongeckocom/.github/.github/workflows/license_tests.yml@master',
      permissions: { contents: JobPermission.READ },
    });
  }
}

export class PublishAlphaWorkflow extends GithubWorkflow {
  constructor(github: GitHub) {
    super(github, 'publish_alpha');
    this.on({
      push: {
        paths: [
          '!ovos_utils/version.py',
          '!test/**',
          '!examples/**',
          '!.github/**',
          '!.gitignore',
          '!LICENSE',
          '!CHANGELOG.md',
          '!MANIFEST.in',
          '!readme.md',
          '!scripts/*',
        ],
      },
      workflowDispatch: {},
    });
    this.addJob('update_version', {
      name: 'update_version',
      uses: 'neongeckocom/.github/.github/workflows/propose_semver_release.yml@master',
      with: {
        release_type: 'alpha',
        version_file: 'ovos_utils/version.py',
        alpha_var: 'VERSION_ALPHA',
        build_var: 'VERSION_BUILD',
        minor_var: 'VERSION_MINOR',
        major_var: 'VERSION_MAJOR',
        update_changelog: true,
        branch: 'dev',
      },
      permissions: { contents: JobPermission.WRITE, packages: JobPermission.WRITE },
    });
    // this.addJob('build_and_publish', {}); // TODO:
  }
}
// export class PublishBuildWorkflow extends GithubWorkflow {
//   constructor(github: GitHub) {
//     super(github, 'publish_build');
//     this.on({
//       push: {
//         branches: ['dev'],
//       },
//     });

//     export class SkillTestsWorkflow extends GithubWorkflow {
//       constructor(github: GitHub) {
//         super(github, 'skill_tests');
//         this.on({ pullRequest: {}, workflowDispatch: {} });
//         this.addJob('py_build_tests', {
//           name: 'py_build_tests',
//           uses: 'neongeckocom/.github/.github/workflows/python_build_tests.yml@master',
//           permissions: { contents: JobPermission.READ },
//         });
//         this.addJob('skill_unit_tests', {
//           name: 'skill_unit_tests',
//           uses: 'neongeckocom/.github/.github/workflows/skill_tests.yml@master',
//           permissions: { contents: JobPermission.READ },
//         });
//         this.addJob('skill_intent_tests', {
//           name: 'skill_intent_tests',
//           uses: 'neongeckocom/.github/.github/workflows/skill_test_intents.yml@master',
//           permissions: { contents: JobPermission.READ },
//         });
//         this.addJob('skill_resource_tests', {
//           name: 'skill_resource_tests',
//           uses: 'neongeckocom/.github/.github/workflows/skill_test_resources.yml@master',
//           permissions: { contents: JobPermission.READ },
//         });
//         this.addJob('skill_install_tests', {
//           name: 'skill_install_tests',
//           uses: 'neongeckocom/.github/.github/workflows/skill_test_installation.yml@master',
//           permissions: { contents: JobPermission.READ },
//         });
//       }
//     }
//     export class UpdateSkillJsonWorkflow extends GithubWorkflow {
//       constructor(github: GitHub) {
//         super(github, 'update_skill_json');
//         this.on({ push: {} });
//         this.addJob('update-skill-json', {
//           name: 'update_skill_json',
//           uses: 'neongeckocom/.github/.github/workflows/skill_update_json_spec.yml@master',
//           permissions: { contents: JobPermission.WRITE },
//         });
//       }
//     }
//   }
// }
