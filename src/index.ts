import { exec } from 'child_process';
import { existsSync, mkdirSync, readFileSync, readdirSync, renameSync, writeFileSync } from 'fs';
import { join } from 'path';
import { ProjenrcJson, SampleDir, SampleFile, TextFile } from 'projen';
import { GitHubProject, GitHubProjectOptions } from 'projen/lib/github';
import { parse } from 'yaml';
import { readmeMd } from './files/README';
import { readmePhalMd } from './files/README.phal';
import { setupPy } from './files/setup.py';
import { setupPhalPy } from './files/setup.py.phal';
import { LicenseTestsWorkflow, ProposeReleaseWorkflow, PublishAlphaWorkflow, PublishReleaseWorkflow, SkillTestsWorkflow, UpdateSkillJsonWorkflow } from './GithubWorkflows';

export interface OVOSSkillProjectOptions extends GitHubProjectOptions {
  /**
   * Add Github Actions workflows?
   * @default true
   */
  readonly githubWorkflows?: boolean;
  /**
   * The name of the skill class
   * @example HelloWorldSkill
   */
  readonly skillClass?: string;
  /**
   * The name of the skill's PyPi package
   * @example ovos-hello-world-skill
   */
  readonly pypiName?: string;
  /**
   * The name of the directory containing the skill's code.
   * @default "" (root)
   * @example "src"
   * @example "hello_world_skill"
   */
  readonly packageDir?: string;
  /**
   * Keywords for your skill package
   * @default "ovos skill plugin"
   */
  readonly skillKeywords?: string;
  /**
   * Include sample code?
   * @default true
   */
  readonly sampleCode?: boolean;
  /**
   * The name of the skill's author.
   * @default "TODO: Your Name"
   * @example "Mike Gray"
   */
  readonly author?: string;
  /**
   * The GitHub handle of the skill's author.
   * @default ""
   * @example "mikejgray"
   */
  readonly authorHandle?: string;
  /**
   * The email address of the skill's author.
   * @default "TODO: Your Email"
   * @example "mike@graywind.org"
   */
  readonly authorAddress?: string;
  /**
   * The URL of the skill's GitHub repository.
   * @default "TODO: PLACEHOLDER"
   * @example "https://github.com/OpenVoiceOS/ovos-hello-world-skill"
   */
  readonly repositoryUrl?: string;
  /**
   * Retrofit an existing Mycroft skill to OVOS?
   * @default false
   */
  readonly retrofit?: boolean;
  /**
   * Restructure locale folders to be more OVOS-like?
   * @default true
   */
  readonly condenseLocaleFolders?: boolean;
  /**
   * The license of the skill.
   * @default Apache-2.0
   * @example MIT
   */
  readonly license?: string;
  /**
   * The description of the skill. Used in setup.py.
   * @default ""
   * @example "A simple skill that says hello world"
   */
  readonly skillDescription?: string;
  /**
   * Include a test to check that the skill's license is FOSS?
   * @default true
   */
  readonly skillLicenseTest?: boolean;
}

export class OVOSSkillProject extends GitHubProject {
  /**
   * Load a Mycroft skill Python file and modernize it for OVOS.
   * @param file The file to modernize
   */
  static modernizeSkillCode(file: string) {
    let existingSkillFileContents = readFileSync(file).toString();
    let ovosImports = `# TODO: Remove unused OVOS imports
from ovos_workshop.decorators import intent_handler
from ovos_workshop.intents import IntentBuilder
from ovos_workshop.skills import OVOSSkill
from ovos_bus_client.message import Message`;
    // Replacements
    if (existingSkillFileContents.includes('AdaptIntent')) {
      ovosImports += '\nfrom ovos_workshop.intents import AdaptIntent';
    }
    let skillFileArray = existingSkillFileContents.split('\n');
    skillFileArray.forEach((line, index) => {
      // Comment out Mycroft imports
      if (line.startsWith('from mycroft')) {
        skillFileArray[index] = `# TODO: Remove all Mycroft imports\n# ${line}`;
      }
      // Replace Adapt IntentBuilder import
      if (line.startsWith('from adapt.intent import IntentBuilder')) {
        skillFileArray[index] = `# TODO: Replace Adapt IntentBuilder import\n# ${line}`;
      }
      // Convert to new style skill
      if (line.includes('def __init__(')) {
        skillFileArray[index] = `# TODO: Convert to new style skill\n# ${line}
# TODO: Replace args with \`*args, bus=None, skill_id='', **kwargs\``;
      };
      // Best practices for super().__init__
      if (line.includes('super().__init__') && line.includes('name=')) {
        skillFileArray[index] = `# TODO: Remove name= parameter from super().__init__
# TODO: Replace args with self, *args, bus=bus, skill_id=skill_id, **kwargs
${line}`;
      }
      // Deprecated create_skill()
      if (line.includes('def create_skill(')) {
        skillFileArray[index] = `# TODO: Remove create_skill() function\n${line}`;
      }
      // Replace MycroftSkill with OVOSSkill
      if (line.includes('(MycroftSkill)')) {
        skillFileArray[index] = line.replace('(MycroftSkill)', '(OVOSSkill)');
      }
    });
    // Overwrite file contents
    writeFileSync(file, `${ovosImports}\n${skillFileArray.join('\n')}`);
  }

  constructor(options: OVOSSkillProjectOptions) {
    // Default options
    const author = options.author ?? 'TODO: Add \'author\' to .projenrc.json and run pj';
    const repositoryUrl = options.repositoryUrl ?? 'TODO: Add \'repositoryUrl\' to .projenrc.json and run pj';
    const authorAddress = options.authorAddress ?? 'TODO: Add \'authorAddress\' to .projenrc.json and run pj';
    const license = options.license ?? '# TODO: Add \'license\' to .projenrc.json and run pj';
    const skillClass = options.skillClass ?? 'TODO: Add \'skillClass\' to .projenrc.json and run pj';
    const retrofit = options.retrofit ?? false;
    const pypiName = options.pypiName ?? process.cwd().split('/').pop()!;
    const sampleCode = options.sampleCode ?? true;
    const skillKeywords = options.skillKeywords ?? 'ovos skill';
    const condenseLocaleFolders = options.condenseLocaleFolders ?? true;
    const githubworkflows = options.githubWorkflows ?? true;
    const skillDescription = options.skillDescription ?? '';
    const skillLicenseTest = options.skillLicenseTest ?? true;
    let packageDir = options.packageDir ?? 'src';
    if (retrofit && packageDir === 'src') { packageDir = '';}

    // Super
    let superProps = { ...options };
    if (!retrofit) {
      superProps.readme = {
        contents: readmeMd({
          skillClass: options.skillClass ?? 'OVOSSkill',
          authorName: options.author ?? 'authorName',
          authorHandle: options.authorHandle ?? 'githubUsername',
          skillKeywords: skillKeywords,
        }),
      };
    };
    super(superProps);

    // projenrc.json
    new ProjenrcJson(this, {});
    // gitignore
    this.gitignore.addPatterns('.DS_Store', 'node_modules');
    this.addPythonGitIgnore();
    if (condenseLocaleFolders && retrofit) {
      this.restructureLocaleFolders(packageDir);
    };
    // Sample skill
    if (sampleCode && !retrofit) {
      this.createGenericSkillCode(packageDir);
    }
    // Root files
    new TextFile(this, 'setup.py', {
      lines: setupPy({
        repositoryUrl: repositoryUrl,
        packageDir: packageDir,
        pypiName: pypiName,
        author: author,
        authorAddress: authorAddress,
        license: license,
        description: skillDescription,
        skillClass: skillClass,
      }).split('\n'),
    });
    new SampleFile(this, 'skill.json', {
      contents: '{}',
    });
    let requirements = 'ovos-utils\novos-bus-client\novos-workshop\novos-plugin-manager\n# Your requirements here\n';
    let manifestReqs = '';
    if (existsSync('manifest.yml')) {
      // Load and parse YAML file
      console.debug('Found manifest.yml, trying to extract Python dependencies');
      const manifest = readFileSync('manifest.yml').toString();
      const manifestObject = parse(manifest);
      if (manifestObject.dependencies.python) {
        manifestReqs = manifestObject.dependencies.python.join('\n') + '\n';
      }
    }
    if (existsSync('requirements.txt')) {
      const existingRequirements = readFileSync('requirements.txt').toString();
      requirements = `${existingRequirements}\n${manifestReqs ?? ''}\n${requirements}`;
    } else {
      new SampleFile(this, 'requirements.txt', {
        contents: requirements + '\n' + manifestReqs,
      });
    }
    if (!existsSync('version.py') && retrofit) {
      new TextFile(this, 'version.py', {
        lines: 'VERSION_MAJOR = 0\nVERSION_MINOR = 0\nVERSION_BUILD = 1\nVERSION_ALPHA = 0'.split('\n'),
      });
    };
    if (retrofit) {
      if (existsSync('__init__.py') && !existsSync('setup.py')) {
        OVOSSkillProject.modernizeSkillCode('__init__.py');
      } else if (!existsSync('__init__.py') && !existsSync('setup.py')) {
        const todoMd = readFileSync(join(__dirname, 'files', 'TODO.md')).toString();
        writeFileSync('TODO.md', `Could not find __init__.py, please update your skill manually:\n${todoMd}`);
      }
    };
    // Github Actions
    if (githubworkflows) {
      this.createGithubWorkflows(skillLicenseTest);
    }
    this.createDevBranch();
  }

  // Methods
  /**
   * Create a generic skill with sample code.
   * @param dir The name of the directory to create sample code in
   * @default "src"
   * @example "hello_world_skill"
   */
  createGenericSkillCode(dir: string) {
    new SampleDir(this, dir, {
      files: {
        '__init__.py': readFileSync(join(__dirname, 'files', '__init__.py')).toString(),
        'version.py': 'VERSION_MAJOR = 0\nVERSION_MINOR = 0\nVERSION_BUILD = 1\nVERSION_ALPHA = 0',
        'settingsmeta.yaml': readFileSync(join(__dirname, 'files', 'settingsmeta.yaml')).toString(),
        'locale/en-us/dialog/hello_world.dialog': 'hello world!\nhullo world!',
        'locale/en-us/dialog/robotics.dialog': 'I am not bound by the laws of robotics',
        'locale/en-us/vocab/HelloWorldKeyword.voc': 'hello world\ngreetings',
        'locale/en-us/intents/HowAreYou.intent': 'how are you( doing|)\nhow have you been\nhow has your day been',
      },
    });
  }
  /**
   * Add a Python .gitignore file.
   */
  addPythonGitIgnore() {
    this.gitignore.exclude(
      '# Byte-compiled / optimized / DLL files',
      '__pycache__/',
      '*.py[cod]',
      '*$py.class',
      '',
      '# C extensions',
      '*.so',
      '',
      '# Distribution / packaging',
      '.Python',
      'build/',
      'develop-eggs/',
      'dist/',
      'downloads/',
      'eggs/',
      '.eggs/',
      'lib/',
      'lib64/',
      'parts/',
      'sdist/',
      'var/',
      'wheels/',
      'share/python-wheels/',
      '*.egg-info/',
      '.installed.cfg',
      '*.egg',
      'MANIFEST',
      '',
      '# PyInstaller',
      '#  Usually these files are written by a python script from a template',
      '#  before PyInstaller builds the exe, so as to inject date/other infos into it.',
      '*.manifest',
      '*.spec',
      '',
      '# Installer logs',
      'pip-log.txt',
      'pip-delete-this-directory.txt',
      '',
      '# Unit test / coverage reports',
      'htmlcov/',
      '.tox/',
      '.nox/',
      '.coverage',
      '.coverage.*',
      '.cache',
      'nosetests.xml',
      'coverage.xml',
      '*.cover',
      '*.py,cover',
      '.hypothesis/',
      '.pytest_cache/',
      'cover/',
      '',
      '# Translations',
      '*.mo',
      '*.pot',
      '',
      '# Django stuff:',
      '*.log',
      'local_settings.py',
      'db.sqlite3',
      'db.sqlite3-journal',
      '',
      '# Flask stuff:',
      'instance/',
      '.webassets-cache',
      '',
      '# Scrapy stuff:',
      '.scrapy',
      '',
      '# Sphinx documentation',
      'docs/_build/',
      '',
      '# PyBuilder',
      '.pybuilder/',
      'target/',
      '',
      '# Jupyter Notebook',
      '.ipynb_checkpoints',
      '',
      '# IPython',
      'profile_default/',
      'ipython_config.py',
      '',
      '# PEP 582; used by e.g. github.com/David-OConnor/pyflow',
      '__pypackages__/',
      '',
      '# Celery stuff',
      'celerybeat-schedule',
      'celerybeat.pid',
      '',
      '# SageMath parsed files',
      '*.sage.py',
      '',
      '# Environments',
      '.env',
      '.venv',
      'env/',
      'venv/',
      'ENV/',
      'env.bak/',
      'venv.bak/',
      '',
      '# Spyder project settings',
      '.spyderproject',
      '.spyproject',
      '',
      '# Rope project settings',
      '.ropeproject',
      '',
      '# mkdocs documentation',
      '/site',
      '',
      '# mypy',
      '.mypy_cache/',
      '.dmypy.json',
      'dmypy.json',
      '',
      '# Pyre type checker',
      '.pyre/',
      '',
      '# pytype static type analyzer',
      '.pytype/',
      '',
      '# Cython debug symbols',
      'cython_debug/',
    );
  }
  /**
   * Create OVOS standard Github Actions workflows.
   */
  createGithubWorkflows(skillLicenseTest: boolean) {
    if (skillLicenseTest) {
      new LicenseTestsWorkflow(this.github!);
    }
    new ProposeReleaseWorkflow(this.github!);
    new PublishAlphaWorkflow(this.github!);
    new PublishReleaseWorkflow(this.github!);
    new SkillTestsWorkflow(this.github!);
    new UpdateSkillJsonWorkflow(this.github!);
  }
  /**
   * Create a dev branch if it doesn't already exist, and set it as the default branch.
   */
  createDevBranch() {
    exec('git rev-parse --verify dev', (err) => {
      if (err) {
        exec('git checkout -b dev');
        exec('git branch -M dev');
      }
    });
  }
  /**
   * Restructure locale folders to be more OVOS-like.
   * @param sourceFolder The name of the directory containing the Mycroft skill's code.
   */
  restructureLocaleFolders(sourceFolder: string) {
    ['vocab', 'dialog', 'regex', 'intents'].forEach((dir) => {
      const dirPath = join(sourceFolder, dir);

      // Check if the directory exists before proceeding
      console.debug(`Checking if ${dirPath} folder exists in original skill...`);
      if (!existsSync(dirPath)) {
        console.warn(`${dir} folder not found in original skill; skipping.`);
        return; // Continue to the next iteration of the loop
      }

      const locale = join(sourceFolder, 'locale');
      try {
        mkdirSync(locale, { recursive: true });
        const languageDirs = readdirSync(join(sourceFolder, dir), { withFileTypes: true })
          .filter(dirent => dirent.isDirectory())
          .map(dirent => dirent.name);

        languageDirs.forEach((lang) => {
          if (!existsSync(join(locale, lang))) {
            mkdirSync(join(locale, lang), { recursive: true });
          }

          // Check if a directory already exists at the new path
          if (existsSync(join(locale, lang, dir))) {
            console.warn(`Directory already exists: ${join(locale, lang, dir)}. Skipping...`);
          } else {
            renameSync(join(sourceFolder, dir, lang), join(locale, lang, dir));
          }
        });
      } catch (err) {
        console.error(err);
      }
    });
  }

}

export interface OVOSPHALProjectOptions extends OVOSSkillProjectOptions {
  /**
   * Is this an admin PHAL plugin?
   * @default false
   */
  readonly admin?: boolean;
}
export class OVOSPHALProject extends GitHubProject {
  constructor(options: OVOSPHALProjectOptions) {
    let superProps = { ...options };
    superProps.readme = {
      contents: readmePhalMd({
        skillClass: options.skillClass ?? 'OVOSSkill',
        authorName: options.author ?? 'authorName',
        authorHandle: options.authorHandle ?? 'githubUsername',
      }),
    };
    super(superProps);

    const author = options.author ?? 'TODO: Add \'author\' to .projenrc.json and run pj';
    const repositoryUrl = options.repositoryUrl ?? 'TODO: Add \'repositoryUrl\' to .projenrc.json and run pj';
    const authorAddress = options.authorAddress ?? 'TODO: Add \'authorAddress\' to .projenrc.json and run pj';
    const license = options.license ?? '# TODO: Add \'license\' to .projenrc.json and run pj';
    const skillClass = options.skillClass ?? 'TODO: Add \'skillClass\' to .projenrc.json and run pj';
    const pypiName = options.pypiName ?? process.cwd().split('/').pop()!;
    const packageDir = options.packageDir ?? 'src';
    const skillDescription = options.skillDescription ?? '';
    const admin = options.admin ?? false;
    new TextFile(this, 'setup.py', {
      lines: setupPhalPy({
        repositoryUrl,
        packageDir,
        pypiName,
        author,
        authorAddress,
        license,
        description: skillDescription,
        pluginClass: skillClass,
        admin,
      }).split('\n'),
    });
    new TextFile(this, 'version.py', {
      lines: 'VERSION_MAJOR = 0\nVERSION_MINOR = 0\nVERSION_BUILD = 1\nVERSION_ALPHA = 0'.split('\n'),
    });
    // projenrc.json
    new ProjenrcJson(this, {});
    // gitignore
    this.gitignore.addPatterns('.DS_Store', 'node_modules');
    this.addPythonGitIgnore();
    this.createGenericSkillCode(packageDir);
    let requirements = 'ovos-utils\novos-bus-client\novos-workshop\novos-plugin-manager\n# Your requirements here\n';
    new SampleFile(this, 'requirements.txt', {
      contents: requirements,
    });
    this.createDevBranch();
  }
  // Methods
  /**
   * Create a generic skill with sample code.
   * @param dir The name of the directory to create sample code in
   * @default "src"
   * @example "neon_phal_plugin_audio_receiver"
   */
  createGenericSkillCode(dir: string) {
    new SampleDir(this, dir, {
      files: {
        '__init__.py': readFileSync(join(__dirname, 'files', '__init__.phal.py')).toString(),
        'version.py': 'VERSION_MAJOR = 0\nVERSION_MINOR = 0\nVERSION_BUILD = 1\nVERSION_ALPHA = 0',
      },
    });
  }
  /**
   * Create a dev branch if it doesn't already exist, and set it as the default branch.
   */
  createDevBranch() {
    exec('git rev-parse --verify dev', (err) => {
      if (err) {
        exec('git checkout -b dev');
        exec('git branch -M dev');
      }
    });
  }
  addPythonGitIgnore() {
    this.gitignore.exclude(
      '# Byte-compiled / optimized / DLL files',
      '__pycache__/',
      '*.py[cod]',
      '*$py.class',
      '',
      '# C extensions',
      '*.so',
      '',
      '# Distribution / packaging',
      '.Python',
      'build/',
      'develop-eggs/',
      'dist/',
      'downloads/',
      'eggs/',
      '.eggs/',
      'lib/',
      'lib64/',
      'parts/',
      'sdist/',
      'var/',
      'wheels/',
      'share/python-wheels/',
      '*.egg-info/',
      '.installed.cfg',
      '*.egg',
      'MANIFEST',
      '',
      '# PyInstaller',
      '#  Usually these files are written by a python script from a template',
      '#  before PyInstaller builds the exe, so as to inject date/other infos into it.',
      '*.manifest',
      '*.spec',
      '',
      '# Installer logs',
      'pip-log.txt',
      'pip-delete-this-directory.txt',
      '',
      '# Unit test / coverage reports',
      'htmlcov/',
      '.tox/',
      '.nox/',
      '.coverage',
      '.coverage.*',
      '.cache',
      'nosetests.xml',
      'coverage.xml',
      '*.cover',
      '*.py,cover',
      '.hypothesis/',
      '.pytest_cache/',
      'cover/',
      '',
      '# Translations',
      '*.mo',
      '*.pot',
      '',
      '# Django stuff:',
      '*.log',
      'local_settings.py',
      'db.sqlite3',
      'db.sqlite3-journal',
      '',
      '# Flask stuff:',
      'instance/',
      '.webassets-cache',
      '',
      '# Scrapy stuff:',
      '.scrapy',
      '',
      '# Sphinx documentation',
      'docs/_build/',
      '',
      '# PyBuilder',
      '.pybuilder/',
      'target/',
      '',
      '# Jupyter Notebook',
      '.ipynb_checkpoints',
      '',
      '# IPython',
      'profile_default/',
      'ipython_config.py',
      '',
      '# PEP 582; used by e.g. github.com/David-OConnor/pyflow',
      '__pypackages__/',
      '',
      '# Celery stuff',
      'celerybeat-schedule',
      'celerybeat.pid',
      '',
      '# SageMath parsed files',
      '*.sage.py',
      '',
      '# Environments',
      '.env',
      '.venv',
      'env/',
      'venv/',
      'ENV/',
      'env.bak/',
      'venv.bak/',
      '',
      '# Spyder project settings',
      '.spyderproject',
      '.spyproject',
      '',
      '# Rope project settings',
      '.ropeproject',
      '',
      '# mkdocs documentation',
      '/site',
      '',
      '# mypy',
      '.mypy_cache/',
      '.dmypy.json',
      'dmypy.json',
      '',
      '# Pyre type checker',
      '.pyre/',
      '',
      '# pytype static type analyzer',
      '.pytype/',
      '',
      '# Cython debug symbols',
      'cython_debug/',
    );
  }
}
