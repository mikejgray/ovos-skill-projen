import { cdk } from 'projen';
import { GithubCredentials } from 'projen/lib/github';
import { NpmAccess } from 'projen/lib/javascript';

const project = new cdk.JsiiProject({
  author: 'Mike Gray',
  authorAddress: 'mike@graywind.org',
  defaultReleaseBranch: 'main',
  name: '@mikejgray/ovos-skill-projen',
  projenrcTs: true,
  repositoryUrl: 'https://github.com/mikejgray/ovos-skill-projen.git',
  repository: 'https://github.com/mikejgray/ovos-skill-projen.git',
  npmRegistryUrl: 'https://npm.pkg.github.com',
  npmAccess: NpmAccess.PUBLIC,
  depsUpgradeOptions: {
    workflowOptions: {
      projenCredentials:
        GithubCredentials.fromPersonalAccessToken({ secret: 'GITHUB_TOKEN' }),
    },
  },
  githubOptions: { mergify: false },
  license: 'Apache-2.0',

  deps: ['projen'],
  devDeps: ['jsii-rosetta@~5.0.7'],
  description: 'A projen project for creating OVOS skills, or retrofitting Mycroft skills to OVOS',
});
project.compileTask.exec(
  'cp src/files/* lib/files',
);

const upgradeMain = project.tryFindObjectFile('.github/workflows/upgrade-main.yml');
upgradeMain?.addOverride('jobs.pr.steps.4.with.token', '${{ secrets.GITHUB_TOKEN }}');
upgradeMain?.addOverride('jobs.pr.permissions.pull-requests', 'write');
upgradeMain?.addOverride('jobs.pr.permissions.contents', 'write');


project.synth();
