import { cdk } from 'projen';
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
  releaseToNpm: true,
  npmAccess: NpmAccess.PUBLIC,
  depsUpgrade: false,
  githubOptions: { mergify: false },
  license: 'Apache-2.0',

  deps: ['projen'],
  bundledDeps: ['yaml'],
  devDeps: ['jsii-rosetta@~5.0.7'],
  gitignore: ['.DS_Store', 'TODO.md'],
  description: 'A projen project for creating OVOS skills, or retrofitting Mycroft skills to OVOS',
});
project.compileTask.exec(
  'cp src/files/* lib/files',
);
project.addDevDeps('eslint@^8');

const upgradeMain = project.tryFindObjectFile('.github/workflows/upgrade-main.yml');
upgradeMain?.addOverride('jobs.pr.steps.4.with.token', '${{ secrets.GITHUB_TOKEN }}');
upgradeMain?.addOverride('jobs.pr.permissions.pull-requests', 'write');
upgradeMain?.addOverride('jobs.pr.permissions.contents', 'write');

const release = project.tryFindObjectFile('.github/workflows/release.yml');
release?.addOverride('jobs.release_npm.steps.8', {
  name: 'Release to NPMJS',
  env: {
    NPM_DIST_TAG: 'latest',
    NPM_REGISTRY: 'https://registry.npmjs.org/',
    NPM_TOKEN: '${{ secrets.NPM_TOKEN }}',
  },
  run: 'npx -p publib@latest publib-npm',
});


project.synth();
