# ovos-skill-projen

This [projen](https://projen.io/) project template is used to create a new OVOS Skill, which can be used with both [OVOS](https://openvoiceos.com) and [Neon.AI](https://neon.ai) voice assistants.

## Installing projen

Projen was created by primarily TypeScript developers working in the AWS CDK ecosystem, so it is written in TypeScript and requires Node.js to run.

Generally, it is recommended to use `nvm` (Node Version Manager) to install Node.js on Linux and macOS. Instructions for installing `nvm` can be found at [github.com/nvm-sh/nvm](https://github.com/nvm-sh/nvm).

After you've installed Node, projen can be installed globally with:

`npm install -g projen`

Generally, most `projen` users alias the `npx projen` command to `pj` for convenience. This can be done with:

`alias pj='npx projen'`

Add that to your `~/.bashrc` or `~/.zshrc` file to make it permanent. Be sure to run `source ~/.bashrc` or `source ~/.zshrc` to reload your shell after adding the line above.

## Usage

In a new directory, run:

`projen new --skill-class OVOSSkillProject --from "@mikejgray/ovos-skill-projen"`

# API Reference <a name="API Reference" id="api-reference"></a>


## Structs <a name="Structs" id="Structs"></a>

### OVOSSkillProjectOptions <a name="OVOSSkillProjectOptions" id="@mikejgray/ovos-skill-projen.OVOSSkillProjectOptions"></a>

#### Initializer <a name="Initializer" id="@mikejgray/ovos-skill-projen.OVOSSkillProjectOptions.Initializer"></a>

```typescript
import { OVOSSkillProjectOptions } from '@mikejgray/ovos-skill-projen'

const oVOSSkillProjectOptions: OVOSSkillProjectOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@mikejgray/ovos-skill-projen.OVOSSkillProjectOptions.property.name">name</a></code> | <code>string</code> | This is the name of your project. |
| <code><a href="#@mikejgray/ovos-skill-projen.OVOSSkillProjectOptions.property.commitGenerated">commitGenerated</a></code> | <code>boolean</code> | Whether to commit the managed files by default. |
| <code><a href="#@mikejgray/ovos-skill-projen.OVOSSkillProjectOptions.property.gitIgnoreOptions">gitIgnoreOptions</a></code> | <code>projen.IgnoreFileOptions</code> | Configuration options for .gitignore file. |
| <code><a href="#@mikejgray/ovos-skill-projen.OVOSSkillProjectOptions.property.gitOptions">gitOptions</a></code> | <code>projen.GitOptions</code> | Configuration options for git. |
| <code><a href="#@mikejgray/ovos-skill-projen.OVOSSkillProjectOptions.property.logging">logging</a></code> | <code>projen.LoggerOptions</code> | Configure logging options such as verbosity. |
| <code><a href="#@mikejgray/ovos-skill-projen.OVOSSkillProjectOptions.property.outdir">outdir</a></code> | <code>string</code> | The root directory of the project. |
| <code><a href="#@mikejgray/ovos-skill-projen.OVOSSkillProjectOptions.property.parent">parent</a></code> | <code>projen.Project</code> | The parent project, if this project is part of a bigger project. |
| <code><a href="#@mikejgray/ovos-skill-projen.OVOSSkillProjectOptions.property.projenCommand">projenCommand</a></code> | <code>string</code> | The shell command to use in order to run the projen CLI. |
| <code><a href="#@mikejgray/ovos-skill-projen.OVOSSkillProjectOptions.property.projenrcJson">projenrcJson</a></code> | <code>boolean</code> | Generate (once) .projenrc.json (in JSON). Set to `false` in order to disable .projenrc.json generation. |
| <code><a href="#@mikejgray/ovos-skill-projen.OVOSSkillProjectOptions.property.projenrcJsonOptions">projenrcJsonOptions</a></code> | <code>projen.ProjenrcJsonOptions</code> | Options for .projenrc.json. |
| <code><a href="#@mikejgray/ovos-skill-projen.OVOSSkillProjectOptions.property.renovatebot">renovatebot</a></code> | <code>boolean</code> | Use renovatebot to handle dependency upgrades. |
| <code><a href="#@mikejgray/ovos-skill-projen.OVOSSkillProjectOptions.property.renovatebotOptions">renovatebotOptions</a></code> | <code>projen.RenovatebotOptions</code> | Options for renovatebot. |
| <code><a href="#@mikejgray/ovos-skill-projen.OVOSSkillProjectOptions.property.autoApproveOptions">autoApproveOptions</a></code> | <code>projen.github.AutoApproveOptions</code> | Enable and configure the 'auto approve' workflow. |
| <code><a href="#@mikejgray/ovos-skill-projen.OVOSSkillProjectOptions.property.autoMerge">autoMerge</a></code> | <code>boolean</code> | Enable automatic merging on GitHub. |
| <code><a href="#@mikejgray/ovos-skill-projen.OVOSSkillProjectOptions.property.autoMergeOptions">autoMergeOptions</a></code> | <code>projen.github.AutoMergeOptions</code> | Configure options for automatic merging on GitHub. |
| <code><a href="#@mikejgray/ovos-skill-projen.OVOSSkillProjectOptions.property.clobber">clobber</a></code> | <code>boolean</code> | Add a `clobber` task which resets the repo to origin. |
| <code><a href="#@mikejgray/ovos-skill-projen.OVOSSkillProjectOptions.property.devContainer">devContainer</a></code> | <code>boolean</code> | Add a VSCode development environment (used for GitHub Codespaces). |
| <code><a href="#@mikejgray/ovos-skill-projen.OVOSSkillProjectOptions.property.github">github</a></code> | <code>boolean</code> | Enable GitHub integration. |
| <code><a href="#@mikejgray/ovos-skill-projen.OVOSSkillProjectOptions.property.githubOptions">githubOptions</a></code> | <code>projen.github.GitHubOptions</code> | Options for GitHub integration. |
| <code><a href="#@mikejgray/ovos-skill-projen.OVOSSkillProjectOptions.property.gitpod">gitpod</a></code> | <code>boolean</code> | Add a Gitpod development environment. |
| <code><a href="#@mikejgray/ovos-skill-projen.OVOSSkillProjectOptions.property.mergify">mergify</a></code> | <code>boolean</code> | Whether mergify should be enabled on this repository or not. |
| <code><a href="#@mikejgray/ovos-skill-projen.OVOSSkillProjectOptions.property.mergifyOptions">mergifyOptions</a></code> | <code>projen.github.MergifyOptions</code> | Options for mergify. |
| <code><a href="#@mikejgray/ovos-skill-projen.OVOSSkillProjectOptions.property.projectType">projectType</a></code> | <code>projen.ProjectType</code> | Which type of project this is (library/app). |
| <code><a href="#@mikejgray/ovos-skill-projen.OVOSSkillProjectOptions.property.projenCredentials">projenCredentials</a></code> | <code>projen.github.GithubCredentials</code> | Choose a method of providing GitHub API access for projen workflows. |
| <code><a href="#@mikejgray/ovos-skill-projen.OVOSSkillProjectOptions.property.projenTokenSecret">projenTokenSecret</a></code> | <code>string</code> | The name of a secret which includes a GitHub Personal Access Token to be used by projen workflows. |
| <code><a href="#@mikejgray/ovos-skill-projen.OVOSSkillProjectOptions.property.readme">readme</a></code> | <code>projen.SampleReadmeProps</code> | The README setup. |
| <code><a href="#@mikejgray/ovos-skill-projen.OVOSSkillProjectOptions.property.stale">stale</a></code> | <code>boolean</code> | Auto-close of stale issues and pull request. |
| <code><a href="#@mikejgray/ovos-skill-projen.OVOSSkillProjectOptions.property.staleOptions">staleOptions</a></code> | <code>projen.github.StaleOptions</code> | Auto-close stale issues and pull requests. |
| <code><a href="#@mikejgray/ovos-skill-projen.OVOSSkillProjectOptions.property.vscode">vscode</a></code> | <code>boolean</code> | Enable VSCode integration. |
| <code><a href="#@mikejgray/ovos-skill-projen.OVOSSkillProjectOptions.property.skillClass">skillClass</a></code> | <code>string</code> | The name of the skill class. |
| <code><a href="#@mikejgray/ovos-skill-projen.OVOSSkillProjectOptions.property.githubTests">githubTests</a></code> | <code>boolean</code> | Add Github Actions for testing? |
| <code><a href="#@mikejgray/ovos-skill-projen.OVOSSkillProjectOptions.property.packageDir">packageDir</a></code> | <code>string</code> | The name of the directory containing the skill's code. |
| <code><a href="#@mikejgray/ovos-skill-projen.OVOSSkillProjectOptions.property.pypiName">pypiName</a></code> | <code>string</code> | The name of the skill's PyPi package. |
| <code><a href="#@mikejgray/ovos-skill-projen.OVOSSkillProjectOptions.property.sampleCode">sampleCode</a></code> | <code>boolean</code> | Include sample code? |
| <code><a href="#@mikejgray/ovos-skill-projen.OVOSSkillProjectOptions.property.skillKeywords">skillKeywords</a></code> | <code>string</code> | Keywords for your skill package. |

---

##### `name`<sup>Required</sup> <a name="name" id="@mikejgray/ovos-skill-projen.OVOSSkillProjectOptions.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string
- *Default:* $BASEDIR

This is the name of your project.

---

##### `commitGenerated`<sup>Optional</sup> <a name="commitGenerated" id="@mikejgray/ovos-skill-projen.OVOSSkillProjectOptions.property.commitGenerated"></a>

```typescript
public readonly commitGenerated: boolean;
```

- *Type:* boolean
- *Default:* true

Whether to commit the managed files by default.

---

##### `gitIgnoreOptions`<sup>Optional</sup> <a name="gitIgnoreOptions" id="@mikejgray/ovos-skill-projen.OVOSSkillProjectOptions.property.gitIgnoreOptions"></a>

```typescript
public readonly gitIgnoreOptions: IgnoreFileOptions;
```

- *Type:* projen.IgnoreFileOptions

Configuration options for .gitignore file.

---

##### `gitOptions`<sup>Optional</sup> <a name="gitOptions" id="@mikejgray/ovos-skill-projen.OVOSSkillProjectOptions.property.gitOptions"></a>

```typescript
public readonly gitOptions: GitOptions;
```

- *Type:* projen.GitOptions

Configuration options for git.

---

##### `logging`<sup>Optional</sup> <a name="logging" id="@mikejgray/ovos-skill-projen.OVOSSkillProjectOptions.property.logging"></a>

```typescript
public readonly logging: LoggerOptions;
```

- *Type:* projen.LoggerOptions
- *Default:* {}

Configure logging options such as verbosity.

---

##### `outdir`<sup>Optional</sup> <a name="outdir" id="@mikejgray/ovos-skill-projen.OVOSSkillProjectOptions.property.outdir"></a>

```typescript
public readonly outdir: string;
```

- *Type:* string
- *Default:* "."

The root directory of the project.

Relative to this directory, all files are synthesized.

If this project has a parent, this directory is relative to the parent
directory and it cannot be the same as the parent or any of it's other
sub-projects.

---

##### `parent`<sup>Optional</sup> <a name="parent" id="@mikejgray/ovos-skill-projen.OVOSSkillProjectOptions.property.parent"></a>

```typescript
public readonly parent: Project;
```

- *Type:* projen.Project

The parent project, if this project is part of a bigger project.

---

##### `projenCommand`<sup>Optional</sup> <a name="projenCommand" id="@mikejgray/ovos-skill-projen.OVOSSkillProjectOptions.property.projenCommand"></a>

```typescript
public readonly projenCommand: string;
```

- *Type:* string
- *Default:* "npx projen"

The shell command to use in order to run the projen CLI.

Can be used to customize in special environments.

---

##### `projenrcJson`<sup>Optional</sup> <a name="projenrcJson" id="@mikejgray/ovos-skill-projen.OVOSSkillProjectOptions.property.projenrcJson"></a>

```typescript
public readonly projenrcJson: boolean;
```

- *Type:* boolean
- *Default:* false

Generate (once) .projenrc.json (in JSON). Set to `false` in order to disable .projenrc.json generation.

---

##### `projenrcJsonOptions`<sup>Optional</sup> <a name="projenrcJsonOptions" id="@mikejgray/ovos-skill-projen.OVOSSkillProjectOptions.property.projenrcJsonOptions"></a>

```typescript
public readonly projenrcJsonOptions: ProjenrcJsonOptions;
```

- *Type:* projen.ProjenrcJsonOptions
- *Default:* default options

Options for .projenrc.json.

---

##### `renovatebot`<sup>Optional</sup> <a name="renovatebot" id="@mikejgray/ovos-skill-projen.OVOSSkillProjectOptions.property.renovatebot"></a>

```typescript
public readonly renovatebot: boolean;
```

- *Type:* boolean
- *Default:* false

Use renovatebot to handle dependency upgrades.

---

##### `renovatebotOptions`<sup>Optional</sup> <a name="renovatebotOptions" id="@mikejgray/ovos-skill-projen.OVOSSkillProjectOptions.property.renovatebotOptions"></a>

```typescript
public readonly renovatebotOptions: RenovatebotOptions;
```

- *Type:* projen.RenovatebotOptions
- *Default:* default options

Options for renovatebot.

---

##### `autoApproveOptions`<sup>Optional</sup> <a name="autoApproveOptions" id="@mikejgray/ovos-skill-projen.OVOSSkillProjectOptions.property.autoApproveOptions"></a>

```typescript
public readonly autoApproveOptions: AutoApproveOptions;
```

- *Type:* projen.github.AutoApproveOptions
- *Default:* auto approve is disabled

Enable and configure the 'auto approve' workflow.

---

##### `autoMerge`<sup>Optional</sup> <a name="autoMerge" id="@mikejgray/ovos-skill-projen.OVOSSkillProjectOptions.property.autoMerge"></a>

```typescript
public readonly autoMerge: boolean;
```

- *Type:* boolean
- *Default:* true

Enable automatic merging on GitHub.

Has no effect if `github.mergify`
is set to false.

---

##### `autoMergeOptions`<sup>Optional</sup> <a name="autoMergeOptions" id="@mikejgray/ovos-skill-projen.OVOSSkillProjectOptions.property.autoMergeOptions"></a>

```typescript
public readonly autoMergeOptions: AutoMergeOptions;
```

- *Type:* projen.github.AutoMergeOptions
- *Default:* see defaults in `AutoMergeOptions`

Configure options for automatic merging on GitHub.

Has no effect if
`github.mergify` or `autoMerge` is set to false.

---

##### `clobber`<sup>Optional</sup> <a name="clobber" id="@mikejgray/ovos-skill-projen.OVOSSkillProjectOptions.property.clobber"></a>

```typescript
public readonly clobber: boolean;
```

- *Type:* boolean
- *Default:* true, but false for subprojects

Add a `clobber` task which resets the repo to origin.

---

##### `devContainer`<sup>Optional</sup> <a name="devContainer" id="@mikejgray/ovos-skill-projen.OVOSSkillProjectOptions.property.devContainer"></a>

```typescript
public readonly devContainer: boolean;
```

- *Type:* boolean
- *Default:* false

Add a VSCode development environment (used for GitHub Codespaces).

---

##### `github`<sup>Optional</sup> <a name="github" id="@mikejgray/ovos-skill-projen.OVOSSkillProjectOptions.property.github"></a>

```typescript
public readonly github: boolean;
```

- *Type:* boolean
- *Default:* true

Enable GitHub integration.

Enabled by default for root projects. Disabled for non-root projects.

---

##### `githubOptions`<sup>Optional</sup> <a name="githubOptions" id="@mikejgray/ovos-skill-projen.OVOSSkillProjectOptions.property.githubOptions"></a>

```typescript
public readonly githubOptions: GitHubOptions;
```

- *Type:* projen.github.GitHubOptions
- *Default:* see GitHubOptions

Options for GitHub integration.

---

##### `gitpod`<sup>Optional</sup> <a name="gitpod" id="@mikejgray/ovos-skill-projen.OVOSSkillProjectOptions.property.gitpod"></a>

```typescript
public readonly gitpod: boolean;
```

- *Type:* boolean
- *Default:* false

Add a Gitpod development environment.

---

##### ~~`mergify`~~<sup>Optional</sup> <a name="mergify" id="@mikejgray/ovos-skill-projen.OVOSSkillProjectOptions.property.mergify"></a>

- *Deprecated:* use `githubOptions.mergify` instead

```typescript
public readonly mergify: boolean;
```

- *Type:* boolean
- *Default:* true

Whether mergify should be enabled on this repository or not.

---

##### ~~`mergifyOptions`~~<sup>Optional</sup> <a name="mergifyOptions" id="@mikejgray/ovos-skill-projen.OVOSSkillProjectOptions.property.mergifyOptions"></a>

- *Deprecated:* use `githubOptions.mergifyOptions` instead

```typescript
public readonly mergifyOptions: MergifyOptions;
```

- *Type:* projen.github.MergifyOptions
- *Default:* default options

Options for mergify.

---

##### ~~`projectType`~~<sup>Optional</sup> <a name="projectType" id="@mikejgray/ovos-skill-projen.OVOSSkillProjectOptions.property.projectType"></a>

- *Deprecated:* no longer supported at the base project level

```typescript
public readonly projectType: ProjectType;
```

- *Type:* projen.ProjectType
- *Default:* ProjectType.UNKNOWN

Which type of project this is (library/app).

---

##### `projenCredentials`<sup>Optional</sup> <a name="projenCredentials" id="@mikejgray/ovos-skill-projen.OVOSSkillProjectOptions.property.projenCredentials"></a>

```typescript
public readonly projenCredentials: GithubCredentials;
```

- *Type:* projen.github.GithubCredentials
- *Default:* use a personal access token named PROJEN_GITHUB_TOKEN

Choose a method of providing GitHub API access for projen workflows.

---

##### ~~`projenTokenSecret`~~<sup>Optional</sup> <a name="projenTokenSecret" id="@mikejgray/ovos-skill-projen.OVOSSkillProjectOptions.property.projenTokenSecret"></a>

- *Deprecated:* use `projenCredentials`

```typescript
public readonly projenTokenSecret: string;
```

- *Type:* string
- *Default:* "PROJEN_GITHUB_TOKEN"

The name of a secret which includes a GitHub Personal Access Token to be used by projen workflows.

This token needs to have the `repo`, `workflows`
and `packages` scope.

---

##### `readme`<sup>Optional</sup> <a name="readme" id="@mikejgray/ovos-skill-projen.OVOSSkillProjectOptions.property.readme"></a>

```typescript
public readonly readme: SampleReadmeProps;
```

- *Type:* projen.SampleReadmeProps
- *Default:* { filename: 'README.md', contents: '# replace this' }

The README setup.

---

*Example*

```typescript
"{ filename: 'readme.md', contents: '# title' }"
```


##### `stale`<sup>Optional</sup> <a name="stale" id="@mikejgray/ovos-skill-projen.OVOSSkillProjectOptions.property.stale"></a>

```typescript
public readonly stale: boolean;
```

- *Type:* boolean
- *Default:* false

Auto-close of stale issues and pull request.

See `staleOptions` for options.

---

##### `staleOptions`<sup>Optional</sup> <a name="staleOptions" id="@mikejgray/ovos-skill-projen.OVOSSkillProjectOptions.property.staleOptions"></a>

```typescript
public readonly staleOptions: StaleOptions;
```

- *Type:* projen.github.StaleOptions
- *Default:* see defaults in `StaleOptions`

Auto-close stale issues and pull requests.

To disable set `stale` to `false`.

---

##### `vscode`<sup>Optional</sup> <a name="vscode" id="@mikejgray/ovos-skill-projen.OVOSSkillProjectOptions.property.vscode"></a>

```typescript
public readonly vscode: boolean;
```

- *Type:* boolean
- *Default:* true

Enable VSCode integration.

Enabled by default for root projects. Disabled for non-root projects.

---

##### `skillClass`<sup>Required</sup> <a name="skillClass" id="@mikejgray/ovos-skill-projen.OVOSSkillProjectOptions.property.skillClass"></a>

```typescript
public readonly skillClass: string;
```

- *Type:* string

The name of the skill class.

---

*Example*

```typescript
HelloWorldSkill
```


##### `githubTests`<sup>Optional</sup> <a name="githubTests" id="@mikejgray/ovos-skill-projen.OVOSSkillProjectOptions.property.githubTests"></a>

```typescript
public readonly githubTests: boolean;
```

- *Type:* boolean
- *Default:* true

Add Github Actions for testing?

---

##### `packageDir`<sup>Optional</sup> <a name="packageDir" id="@mikejgray/ovos-skill-projen.OVOSSkillProjectOptions.property.packageDir"></a>

```typescript
public readonly packageDir: string;
```

- *Type:* string
- *Default:* "" (root)

The name of the directory containing the skill's code.

---

*Example*

```typescript
"hello_world_skill"
```


##### `pypiName`<sup>Optional</sup> <a name="pypiName" id="@mikejgray/ovos-skill-projen.OVOSSkillProjectOptions.property.pypiName"></a>

```typescript
public readonly pypiName: string;
```

- *Type:* string

The name of the skill's PyPi package.

---

*Example*

```typescript
ovos-hello-world-skill
```


##### `sampleCode`<sup>Optional</sup> <a name="sampleCode" id="@mikejgray/ovos-skill-projen.OVOSSkillProjectOptions.property.sampleCode"></a>

```typescript
public readonly sampleCode: boolean;
```

- *Type:* boolean
- *Default:* true

Include sample code?

---

##### `skillKeywords`<sup>Optional</sup> <a name="skillKeywords" id="@mikejgray/ovos-skill-projen.OVOSSkillProjectOptions.property.skillKeywords"></a>

```typescript
public readonly skillKeywords: string;
```

- *Type:* string
- *Default:* "ovos skill plugin"

Keywords for your skill package.

---

## Classes <a name="Classes" id="Classes"></a>

### OVOSSkillProject <a name="OVOSSkillProject" id="@mikejgray/ovos-skill-projen.OVOSSkillProject"></a>

#### Initializers <a name="Initializers" id="@mikejgray/ovos-skill-projen.OVOSSkillProject.Initializer"></a>

```typescript
import { OVOSSkillProject } from '@mikejgray/ovos-skill-projen'

new OVOSSkillProject(options: OVOSSkillProjectOptions)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@mikejgray/ovos-skill-projen.OVOSSkillProject.Initializer.parameter.options">options</a></code> | <code><a href="#@mikejgray/ovos-skill-projen.OVOSSkillProjectOptions">OVOSSkillProjectOptions</a></code> | *No description.* |

---

##### `options`<sup>Required</sup> <a name="options" id="@mikejgray/ovos-skill-projen.OVOSSkillProject.Initializer.parameter.options"></a>

- *Type:* <a href="#@mikejgray/ovos-skill-projen.OVOSSkillProjectOptions">OVOSSkillProjectOptions</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@mikejgray/ovos-skill-projen.OVOSSkillProject.addExcludeFromCleanup">addExcludeFromCleanup</a></code> | Exclude the matching files from pre-synth cleanup. |
| <code><a href="#@mikejgray/ovos-skill-projen.OVOSSkillProject.addGitIgnore">addGitIgnore</a></code> | Adds a .gitignore pattern. |
| <code><a href="#@mikejgray/ovos-skill-projen.OVOSSkillProject.addPackageIgnore">addPackageIgnore</a></code> | Exclude these files from the bundled package. |
| <code><a href="#@mikejgray/ovos-skill-projen.OVOSSkillProject.addTask">addTask</a></code> | Adds a new task to this project. |
| <code><a href="#@mikejgray/ovos-skill-projen.OVOSSkillProject.addTip">addTip</a></code> | Prints a "tip" message during synthesis. |
| <code><a href="#@mikejgray/ovos-skill-projen.OVOSSkillProject.annotateGenerated">annotateGenerated</a></code> | Marks the provided file(s) as being generated. |
| <code><a href="#@mikejgray/ovos-skill-projen.OVOSSkillProject.postSynthesize">postSynthesize</a></code> | Called after all components are synthesized. |
| <code><a href="#@mikejgray/ovos-skill-projen.OVOSSkillProject.preSynthesize">preSynthesize</a></code> | Called before all components are synthesized. |
| <code><a href="#@mikejgray/ovos-skill-projen.OVOSSkillProject.removeTask">removeTask</a></code> | Removes a task from a project. |
| <code><a href="#@mikejgray/ovos-skill-projen.OVOSSkillProject.runTaskCommand">runTaskCommand</a></code> | Returns the shell command to execute in order to run a task. |
| <code><a href="#@mikejgray/ovos-skill-projen.OVOSSkillProject.synth">synth</a></code> | Synthesize all project files into `outdir`. |
| <code><a href="#@mikejgray/ovos-skill-projen.OVOSSkillProject.tryFindFile">tryFindFile</a></code> | Finds a file at the specified relative path within this project and all its subprojects. |
| <code><a href="#@mikejgray/ovos-skill-projen.OVOSSkillProject.tryFindJsonFile">tryFindJsonFile</a></code> | Finds a json file by name. |
| <code><a href="#@mikejgray/ovos-skill-projen.OVOSSkillProject.tryFindObjectFile">tryFindObjectFile</a></code> | Finds an object file (like JsonFile, YamlFile, etc.) by name. |
| <code><a href="#@mikejgray/ovos-skill-projen.OVOSSkillProject.tryRemoveFile">tryRemoveFile</a></code> | Finds a file at the specified relative path within this project and removes it. |
| <code><a href="#@mikejgray/ovos-skill-projen.OVOSSkillProject.addPythonGitIgnore">addPythonGitIgnore</a></code> | *No description.* |
| <code><a href="#@mikejgray/ovos-skill-projen.OVOSSkillProject.createDevBranch">createDevBranch</a></code> | *No description.* |
| <code><a href="#@mikejgray/ovos-skill-projen.OVOSSkillProject.createGenericSkillCode">createGenericSkillCode</a></code> | *No description.* |
| <code><a href="#@mikejgray/ovos-skill-projen.OVOSSkillProject.createGithubWorkflows">createGithubWorkflows</a></code> | *No description.* |
| <code><a href="#@mikejgray/ovos-skill-projen.OVOSSkillProject.createLocaleFolders">createLocaleFolders</a></code> | *No description.* |

---

##### `addExcludeFromCleanup` <a name="addExcludeFromCleanup" id="@mikejgray/ovos-skill-projen.OVOSSkillProject.addExcludeFromCleanup"></a>

```typescript
public addExcludeFromCleanup(globs: string): void
```

Exclude the matching files from pre-synth cleanup.

Can be used when, for example, some
source files include the projen marker and we don't want them to be erased during synth.

###### `globs`<sup>Required</sup> <a name="globs" id="@mikejgray/ovos-skill-projen.OVOSSkillProject.addExcludeFromCleanup.parameter.globs"></a>

- *Type:* string

The glob patterns to match.

---

##### `addGitIgnore` <a name="addGitIgnore" id="@mikejgray/ovos-skill-projen.OVOSSkillProject.addGitIgnore"></a>

```typescript
public addGitIgnore(pattern: string): void
```

Adds a .gitignore pattern.

###### `pattern`<sup>Required</sup> <a name="pattern" id="@mikejgray/ovos-skill-projen.OVOSSkillProject.addGitIgnore.parameter.pattern"></a>

- *Type:* string

The glob pattern to ignore.

---

##### `addPackageIgnore` <a name="addPackageIgnore" id="@mikejgray/ovos-skill-projen.OVOSSkillProject.addPackageIgnore"></a>

```typescript
public addPackageIgnore(_pattern: string): void
```

Exclude these files from the bundled package.

Implemented by project types based on the
packaging mechanism. For example, `NodeProject` delegates this to `.npmignore`.

###### `_pattern`<sup>Required</sup> <a name="_pattern" id="@mikejgray/ovos-skill-projen.OVOSSkillProject.addPackageIgnore.parameter._pattern"></a>

- *Type:* string

The glob pattern to exclude.

---

##### `addTask` <a name="addTask" id="@mikejgray/ovos-skill-projen.OVOSSkillProject.addTask"></a>

```typescript
public addTask(name: string, props?: TaskOptions): Task
```

Adds a new task to this project.

This will fail if the project already has
a task with this name.

###### `name`<sup>Required</sup> <a name="name" id="@mikejgray/ovos-skill-projen.OVOSSkillProject.addTask.parameter.name"></a>

- *Type:* string

The task name to add.

---

###### `props`<sup>Optional</sup> <a name="props" id="@mikejgray/ovos-skill-projen.OVOSSkillProject.addTask.parameter.props"></a>

- *Type:* projen.TaskOptions

Task properties.

---

##### ~~`addTip`~~ <a name="addTip" id="@mikejgray/ovos-skill-projen.OVOSSkillProject.addTip"></a>

```typescript
public addTip(message: string): void
```

Prints a "tip" message during synthesis.

###### `message`<sup>Required</sup> <a name="message" id="@mikejgray/ovos-skill-projen.OVOSSkillProject.addTip.parameter.message"></a>

- *Type:* string

The message.

---

##### `annotateGenerated` <a name="annotateGenerated" id="@mikejgray/ovos-skill-projen.OVOSSkillProject.annotateGenerated"></a>

```typescript
public annotateGenerated(glob: string): void
```

Marks the provided file(s) as being generated.

This is achieved using the
github-linguist attributes. Generated files do not count against the
repository statistics and language breakdown.

> [https://github.com/github/linguist/blob/master/docs/overrides.md](https://github.com/github/linguist/blob/master/docs/overrides.md)

###### `glob`<sup>Required</sup> <a name="glob" id="@mikejgray/ovos-skill-projen.OVOSSkillProject.annotateGenerated.parameter.glob"></a>

- *Type:* string

the glob pattern to match (could be a file path).

---

##### `postSynthesize` <a name="postSynthesize" id="@mikejgray/ovos-skill-projen.OVOSSkillProject.postSynthesize"></a>

```typescript
public postSynthesize(): void
```

Called after all components are synthesized.

Order is *not* guaranteed.

##### `preSynthesize` <a name="preSynthesize" id="@mikejgray/ovos-skill-projen.OVOSSkillProject.preSynthesize"></a>

```typescript
public preSynthesize(): void
```

Called before all components are synthesized.

##### `removeTask` <a name="removeTask" id="@mikejgray/ovos-skill-projen.OVOSSkillProject.removeTask"></a>

```typescript
public removeTask(name: string): Task
```

Removes a task from a project.

###### `name`<sup>Required</sup> <a name="name" id="@mikejgray/ovos-skill-projen.OVOSSkillProject.removeTask.parameter.name"></a>

- *Type:* string

The name of the task to remove.

---

##### `runTaskCommand` <a name="runTaskCommand" id="@mikejgray/ovos-skill-projen.OVOSSkillProject.runTaskCommand"></a>

```typescript
public runTaskCommand(task: Task): string
```

Returns the shell command to execute in order to run a task.

By default, this is `npx projen@<version> <task>`

###### `task`<sup>Required</sup> <a name="task" id="@mikejgray/ovos-skill-projen.OVOSSkillProject.runTaskCommand.parameter.task"></a>

- *Type:* projen.Task

The task for which the command is required.

---

##### `synth` <a name="synth" id="@mikejgray/ovos-skill-projen.OVOSSkillProject.synth"></a>

```typescript
public synth(): void
```

Synthesize all project files into `outdir`.

1. Call "this.preSynthesize()"
2. Delete all generated files
3. Synthesize all sub-projects
4. Synthesize all components of this project
5. Call "postSynthesize()" for all components of this project
6. Call "this.postSynthesize()"

##### `tryFindFile` <a name="tryFindFile" id="@mikejgray/ovos-skill-projen.OVOSSkillProject.tryFindFile"></a>

```typescript
public tryFindFile(filePath: string): FileBase
```

Finds a file at the specified relative path within this project and all its subprojects.

###### `filePath`<sup>Required</sup> <a name="filePath" id="@mikejgray/ovos-skill-projen.OVOSSkillProject.tryFindFile.parameter.filePath"></a>

- *Type:* string

The file path.

If this path is relative, it will be resolved
from the root of _this_ project.

---

##### ~~`tryFindJsonFile`~~ <a name="tryFindJsonFile" id="@mikejgray/ovos-skill-projen.OVOSSkillProject.tryFindJsonFile"></a>

```typescript
public tryFindJsonFile(filePath: string): JsonFile
```

Finds a json file by name.

###### `filePath`<sup>Required</sup> <a name="filePath" id="@mikejgray/ovos-skill-projen.OVOSSkillProject.tryFindJsonFile.parameter.filePath"></a>

- *Type:* string

The file path.

---

##### `tryFindObjectFile` <a name="tryFindObjectFile" id="@mikejgray/ovos-skill-projen.OVOSSkillProject.tryFindObjectFile"></a>

```typescript
public tryFindObjectFile(filePath: string): ObjectFile
```

Finds an object file (like JsonFile, YamlFile, etc.) by name.

###### `filePath`<sup>Required</sup> <a name="filePath" id="@mikejgray/ovos-skill-projen.OVOSSkillProject.tryFindObjectFile.parameter.filePath"></a>

- *Type:* string

The file path.

---

##### `tryRemoveFile` <a name="tryRemoveFile" id="@mikejgray/ovos-skill-projen.OVOSSkillProject.tryRemoveFile"></a>

```typescript
public tryRemoveFile(filePath: string): FileBase
```

Finds a file at the specified relative path within this project and removes it.

###### `filePath`<sup>Required</sup> <a name="filePath" id="@mikejgray/ovos-skill-projen.OVOSSkillProject.tryRemoveFile.parameter.filePath"></a>

- *Type:* string

The file path.

If this path is relative, it will be
resolved from the root of _this_ project.

---

##### `addPythonGitIgnore` <a name="addPythonGitIgnore" id="@mikejgray/ovos-skill-projen.OVOSSkillProject.addPythonGitIgnore"></a>

```typescript
public addPythonGitIgnore(): void
```

##### `createDevBranch` <a name="createDevBranch" id="@mikejgray/ovos-skill-projen.OVOSSkillProject.createDevBranch"></a>

```typescript
public createDevBranch(): void
```

##### `createGenericSkillCode` <a name="createGenericSkillCode" id="@mikejgray/ovos-skill-projen.OVOSSkillProject.createGenericSkillCode"></a>

```typescript
public createGenericSkillCode(): void
```

##### `createGithubWorkflows` <a name="createGithubWorkflows" id="@mikejgray/ovos-skill-projen.OVOSSkillProject.createGithubWorkflows"></a>

```typescript
public createGithubWorkflows(): void
```

##### `createLocaleFolders` <a name="createLocaleFolders" id="@mikejgray/ovos-skill-projen.OVOSSkillProject.createLocaleFolders"></a>

```typescript
public createLocaleFolders(): void
```


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@mikejgray/ovos-skill-projen.OVOSSkillProject.property.buildTask">buildTask</a></code> | <code>projen.Task</code> | *No description.* |
| <code><a href="#@mikejgray/ovos-skill-projen.OVOSSkillProject.property.commitGenerated">commitGenerated</a></code> | <code>boolean</code> | Whether to commit the managed files by default. |
| <code><a href="#@mikejgray/ovos-skill-projen.OVOSSkillProject.property.compileTask">compileTask</a></code> | <code>projen.Task</code> | *No description.* |
| <code><a href="#@mikejgray/ovos-skill-projen.OVOSSkillProject.property.components">components</a></code> | <code>projen.Component[]</code> | Returns all the components within this project. |
| <code><a href="#@mikejgray/ovos-skill-projen.OVOSSkillProject.property.deps">deps</a></code> | <code>projen.Dependencies</code> | Project dependencies. |
| <code><a href="#@mikejgray/ovos-skill-projen.OVOSSkillProject.property.ejected">ejected</a></code> | <code>boolean</code> | Whether or not the project is being ejected. |
| <code><a href="#@mikejgray/ovos-skill-projen.OVOSSkillProject.property.files">files</a></code> | <code>projen.FileBase[]</code> | All files in this project. |
| <code><a href="#@mikejgray/ovos-skill-projen.OVOSSkillProject.property.gitattributes">gitattributes</a></code> | <code>projen.GitAttributesFile</code> | The .gitattributes file for this repository. |
| <code><a href="#@mikejgray/ovos-skill-projen.OVOSSkillProject.property.gitignore">gitignore</a></code> | <code>projen.IgnoreFile</code> | .gitignore. |
| <code><a href="#@mikejgray/ovos-skill-projen.OVOSSkillProject.property.logger">logger</a></code> | <code>projen.Logger</code> | Logging utilities. |
| <code><a href="#@mikejgray/ovos-skill-projen.OVOSSkillProject.property.name">name</a></code> | <code>string</code> | Project name. |
| <code><a href="#@mikejgray/ovos-skill-projen.OVOSSkillProject.property.outdir">outdir</a></code> | <code>string</code> | Absolute output directory of this project. |
| <code><a href="#@mikejgray/ovos-skill-projen.OVOSSkillProject.property.packageTask">packageTask</a></code> | <code>projen.Task</code> | *No description.* |
| <code><a href="#@mikejgray/ovos-skill-projen.OVOSSkillProject.property.postCompileTask">postCompileTask</a></code> | <code>projen.Task</code> | *No description.* |
| <code><a href="#@mikejgray/ovos-skill-projen.OVOSSkillProject.property.preCompileTask">preCompileTask</a></code> | <code>projen.Task</code> | *No description.* |
| <code><a href="#@mikejgray/ovos-skill-projen.OVOSSkillProject.property.projectBuild">projectBuild</a></code> | <code>projen.ProjectBuild</code> | Manages the build process of the project. |
| <code><a href="#@mikejgray/ovos-skill-projen.OVOSSkillProject.property.projenCommand">projenCommand</a></code> | <code>string</code> | The command to use in order to run the projen CLI. |
| <code><a href="#@mikejgray/ovos-skill-projen.OVOSSkillProject.property.root">root</a></code> | <code>projen.Project</code> | The root project. |
| <code><a href="#@mikejgray/ovos-skill-projen.OVOSSkillProject.property.subprojects">subprojects</a></code> | <code>projen.Project[]</code> | Returns all the subprojects within this project. |
| <code><a href="#@mikejgray/ovos-skill-projen.OVOSSkillProject.property.tasks">tasks</a></code> | <code>projen.Tasks</code> | Project tasks. |
| <code><a href="#@mikejgray/ovos-skill-projen.OVOSSkillProject.property.testTask">testTask</a></code> | <code>projen.Task</code> | *No description.* |
| <code><a href="#@mikejgray/ovos-skill-projen.OVOSSkillProject.property.defaultTask">defaultTask</a></code> | <code>projen.Task</code> | This is the "default" task, the one that executes "projen". |
| <code><a href="#@mikejgray/ovos-skill-projen.OVOSSkillProject.property.initProject">initProject</a></code> | <code>projen.InitProject</code> | The options used when this project is bootstrapped via `projen new`. |
| <code><a href="#@mikejgray/ovos-skill-projen.OVOSSkillProject.property.parent">parent</a></code> | <code>projen.Project</code> | A parent project. |
| <code><a href="#@mikejgray/ovos-skill-projen.OVOSSkillProject.property.projectType">projectType</a></code> | <code>projen.ProjectType</code> | *No description.* |
| <code><a href="#@mikejgray/ovos-skill-projen.OVOSSkillProject.property.autoApprove">autoApprove</a></code> | <code>projen.github.AutoApprove</code> | Auto approve set up for this project. |
| <code><a href="#@mikejgray/ovos-skill-projen.OVOSSkillProject.property.devContainer">devContainer</a></code> | <code>projen.vscode.DevContainer</code> | Access for .devcontainer.json (used for GitHub Codespaces). |
| <code><a href="#@mikejgray/ovos-skill-projen.OVOSSkillProject.property.github">github</a></code> | <code>projen.github.GitHub</code> | Access all github components. |
| <code><a href="#@mikejgray/ovos-skill-projen.OVOSSkillProject.property.gitpod">gitpod</a></code> | <code>projen.Gitpod</code> | Access for Gitpod. |
| <code><a href="#@mikejgray/ovos-skill-projen.OVOSSkillProject.property.vscode">vscode</a></code> | <code>projen.vscode.VsCode</code> | Access all VSCode components. |

---

##### `buildTask`<sup>Required</sup> <a name="buildTask" id="@mikejgray/ovos-skill-projen.OVOSSkillProject.property.buildTask"></a>

```typescript
public readonly buildTask: Task;
```

- *Type:* projen.Task

---

##### `commitGenerated`<sup>Required</sup> <a name="commitGenerated" id="@mikejgray/ovos-skill-projen.OVOSSkillProject.property.commitGenerated"></a>

```typescript
public readonly commitGenerated: boolean;
```

- *Type:* boolean

Whether to commit the managed files by default.

---

##### `compileTask`<sup>Required</sup> <a name="compileTask" id="@mikejgray/ovos-skill-projen.OVOSSkillProject.property.compileTask"></a>

```typescript
public readonly compileTask: Task;
```

- *Type:* projen.Task

---

##### `components`<sup>Required</sup> <a name="components" id="@mikejgray/ovos-skill-projen.OVOSSkillProject.property.components"></a>

```typescript
public readonly components: Component[];
```

- *Type:* projen.Component[]

Returns all the components within this project.

---

##### `deps`<sup>Required</sup> <a name="deps" id="@mikejgray/ovos-skill-projen.OVOSSkillProject.property.deps"></a>

```typescript
public readonly deps: Dependencies;
```

- *Type:* projen.Dependencies

Project dependencies.

---

##### `ejected`<sup>Required</sup> <a name="ejected" id="@mikejgray/ovos-skill-projen.OVOSSkillProject.property.ejected"></a>

```typescript
public readonly ejected: boolean;
```

- *Type:* boolean

Whether or not the project is being ejected.

---

##### `files`<sup>Required</sup> <a name="files" id="@mikejgray/ovos-skill-projen.OVOSSkillProject.property.files"></a>

```typescript
public readonly files: FileBase[];
```

- *Type:* projen.FileBase[]

All files in this project.

---

##### `gitattributes`<sup>Required</sup> <a name="gitattributes" id="@mikejgray/ovos-skill-projen.OVOSSkillProject.property.gitattributes"></a>

```typescript
public readonly gitattributes: GitAttributesFile;
```

- *Type:* projen.GitAttributesFile

The .gitattributes file for this repository.

---

##### `gitignore`<sup>Required</sup> <a name="gitignore" id="@mikejgray/ovos-skill-projen.OVOSSkillProject.property.gitignore"></a>

```typescript
public readonly gitignore: IgnoreFile;
```

- *Type:* projen.IgnoreFile

.gitignore.

---

##### `logger`<sup>Required</sup> <a name="logger" id="@mikejgray/ovos-skill-projen.OVOSSkillProject.property.logger"></a>

```typescript
public readonly logger: Logger;
```

- *Type:* projen.Logger

Logging utilities.

---

##### `name`<sup>Required</sup> <a name="name" id="@mikejgray/ovos-skill-projen.OVOSSkillProject.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

Project name.

---

##### `outdir`<sup>Required</sup> <a name="outdir" id="@mikejgray/ovos-skill-projen.OVOSSkillProject.property.outdir"></a>

```typescript
public readonly outdir: string;
```

- *Type:* string

Absolute output directory of this project.

---

##### `packageTask`<sup>Required</sup> <a name="packageTask" id="@mikejgray/ovos-skill-projen.OVOSSkillProject.property.packageTask"></a>

```typescript
public readonly packageTask: Task;
```

- *Type:* projen.Task

---

##### `postCompileTask`<sup>Required</sup> <a name="postCompileTask" id="@mikejgray/ovos-skill-projen.OVOSSkillProject.property.postCompileTask"></a>

```typescript
public readonly postCompileTask: Task;
```

- *Type:* projen.Task

---

##### `preCompileTask`<sup>Required</sup> <a name="preCompileTask" id="@mikejgray/ovos-skill-projen.OVOSSkillProject.property.preCompileTask"></a>

```typescript
public readonly preCompileTask: Task;
```

- *Type:* projen.Task

---

##### `projectBuild`<sup>Required</sup> <a name="projectBuild" id="@mikejgray/ovos-skill-projen.OVOSSkillProject.property.projectBuild"></a>

```typescript
public readonly projectBuild: ProjectBuild;
```

- *Type:* projen.ProjectBuild

Manages the build process of the project.

---

##### `projenCommand`<sup>Required</sup> <a name="projenCommand" id="@mikejgray/ovos-skill-projen.OVOSSkillProject.property.projenCommand"></a>

```typescript
public readonly projenCommand: string;
```

- *Type:* string

The command to use in order to run the projen CLI.

---

##### `root`<sup>Required</sup> <a name="root" id="@mikejgray/ovos-skill-projen.OVOSSkillProject.property.root"></a>

```typescript
public readonly root: Project;
```

- *Type:* projen.Project

The root project.

---

##### `subprojects`<sup>Required</sup> <a name="subprojects" id="@mikejgray/ovos-skill-projen.OVOSSkillProject.property.subprojects"></a>

```typescript
public readonly subprojects: Project[];
```

- *Type:* projen.Project[]

Returns all the subprojects within this project.

---

##### `tasks`<sup>Required</sup> <a name="tasks" id="@mikejgray/ovos-skill-projen.OVOSSkillProject.property.tasks"></a>

```typescript
public readonly tasks: Tasks;
```

- *Type:* projen.Tasks

Project tasks.

---

##### `testTask`<sup>Required</sup> <a name="testTask" id="@mikejgray/ovos-skill-projen.OVOSSkillProject.property.testTask"></a>

```typescript
public readonly testTask: Task;
```

- *Type:* projen.Task

---

##### `defaultTask`<sup>Optional</sup> <a name="defaultTask" id="@mikejgray/ovos-skill-projen.OVOSSkillProject.property.defaultTask"></a>

```typescript
public readonly defaultTask: Task;
```

- *Type:* projen.Task

This is the "default" task, the one that executes "projen".

Undefined if
the project is being ejected.

---

##### `initProject`<sup>Optional</sup> <a name="initProject" id="@mikejgray/ovos-skill-projen.OVOSSkillProject.property.initProject"></a>

```typescript
public readonly initProject: InitProject;
```

- *Type:* projen.InitProject

The options used when this project is bootstrapped via `projen new`.

It
includes the original set of options passed to the CLI and also the JSII
FQN of the project type.

---

##### `parent`<sup>Optional</sup> <a name="parent" id="@mikejgray/ovos-skill-projen.OVOSSkillProject.property.parent"></a>

```typescript
public readonly parent: Project;
```

- *Type:* projen.Project

A parent project.

If undefined, this is the root project.

---

##### `projectType`<sup>Required</sup> <a name="projectType" id="@mikejgray/ovos-skill-projen.OVOSSkillProject.property.projectType"></a>

```typescript
public readonly projectType: ProjectType;
```

- *Type:* projen.ProjectType

---

##### `autoApprove`<sup>Optional</sup> <a name="autoApprove" id="@mikejgray/ovos-skill-projen.OVOSSkillProject.property.autoApprove"></a>

```typescript
public readonly autoApprove: AutoApprove;
```

- *Type:* projen.github.AutoApprove

Auto approve set up for this project.

---

##### `devContainer`<sup>Optional</sup> <a name="devContainer" id="@mikejgray/ovos-skill-projen.OVOSSkillProject.property.devContainer"></a>

```typescript
public readonly devContainer: DevContainer;
```

- *Type:* projen.vscode.DevContainer

Access for .devcontainer.json (used for GitHub Codespaces).

This will be `undefined` if devContainer boolean is false

---

##### `github`<sup>Optional</sup> <a name="github" id="@mikejgray/ovos-skill-projen.OVOSSkillProject.property.github"></a>

```typescript
public readonly github: GitHub;
```

- *Type:* projen.github.GitHub

Access all github components.

This will be `undefined` for subprojects.

---

##### `gitpod`<sup>Optional</sup> <a name="gitpod" id="@mikejgray/ovos-skill-projen.OVOSSkillProject.property.gitpod"></a>

```typescript
public readonly gitpod: Gitpod;
```

- *Type:* projen.Gitpod

Access for Gitpod.

This will be `undefined` if gitpod boolean is false

---

##### `vscode`<sup>Optional</sup> <a name="vscode" id="@mikejgray/ovos-skill-projen.OVOSSkillProject.property.vscode"></a>

```typescript
public readonly vscode: VsCode;
```

- *Type:* projen.vscode.VsCode

Access all VSCode components.

This will be `undefined` for subprojects.

---

#### Constants <a name="Constants" id="Constants"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@mikejgray/ovos-skill-projen.OVOSSkillProject.property.DEFAULT_TASK">DEFAULT_TASK</a></code> | <code>string</code> | The name of the default task (the task executed when `projen` is run without arguments). |

---

##### `DEFAULT_TASK`<sup>Required</sup> <a name="DEFAULT_TASK" id="@mikejgray/ovos-skill-projen.OVOSSkillProject.property.DEFAULT_TASK"></a>

```typescript
public readonly DEFAULT_TASK: string;
```

- *Type:* string

The name of the default task (the task executed when `projen` is run without arguments).

Normally
this task should synthesize the project files.

---


