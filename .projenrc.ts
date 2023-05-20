import { cdk } from 'projen';
import { GithubCredentials } from 'projen/lib/github';
import { NpmAccess } from 'projen/lib/javascript';

const project = new cdk.JsiiProject({
  author: 'Mike Gray',
  authorAddress: 'mike@graywind.org',
  defaultReleaseBranch: 'main',
  name: '@mikejgray/ovos-skill',
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
  // description: undefined,  /* The description is just a string that helps people understand the purpose of the package. */
  // packageName: undefined,  /* The "name" in package.json. */
});
project.compileTask.exec(
  'cp src/files/* lib/files',
);

project.synth();
