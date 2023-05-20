import { existsSync, mkdirSync, readFileSync } from 'fs';
import { join } from 'path';
import { SampleDir, SampleFile } from 'projen';
import { GitHubProject, GitHubProjectOptions } from 'projen/lib/github';
import { setupPy } from './files/setup.py';
import { LicenseTestsWorkflow, PublishAlphaWorkflow, SkillTestsWorkflow, UpdateSkillJsonWorkflow } from './GithubWorkflows';

export interface OVOSSkillProjectOptions extends GitHubProjectOptions {
  /**
   * Add Github Actions for testing?
   * @default true
   */
  readonly githubTests?: boolean;
  /**
   * The name of the skill class
   * @example HelloWorldSkill
   */
  readonly skillClass: string;
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
}

export class OVOSSkillProject extends GitHubProject {
  constructor(options: OVOSSkillProjectOptions) {
    super({
      readme: { contents: readFileSync(join(__dirname, 'files', 'README.md')).toString() },
      ...options,
    });
    // gitignore
    this.gitignore.addPatterns('.DS_Store');
    this.addPythonGitIgnore();
    // Locale folders
    this.createLocaleFolders();
    // if (options.condenseLocaleFolders) {
    // this.restructureLocaleFolders();
    // };
    // Sample skill
    if (options.sampleCode ?? true) {
      this.createGenericSkillCode();
    }
    // Root files
    // TODO: Pass in actual values from project
    new SampleFile(this, 'setup.py', {
      contents: setupPy({
        repositoryUrl: 'PLACEHOLDER',
        packageDir: options.packageDir ?? '',
        author: 'Joe Placeholder',
        authorAddress: 'joe@placeholder.com',
      }),
    });
    new SampleFile(this, 'skill.json', {
      contents: '{}',
    });
    new SampleFile(this, 'requirements.txt', {
      contents: 'ovos-utils\novos-bus-client\novos-workshop',
    });
    // Github Actions
    if (options.githubTests ?? true) {
      this.createGithubWorkflows();
    }
  }

  // Methods
  createGenericSkillCode() {
    new SampleDir(this, 'src', {
      files: {
        '__init__.py': readFileSync(join(__dirname, 'files', '__init__.py')).toString(),
        'version.py': '__version__ = "0.0.1"\n',
        'settingsmeta.yaml': readFileSync(join(__dirname, 'files', 'settingsmeta.yaml')).toString(),
        'locale/en-us/dialog/hello_world.dialog': 'hello world!\nhullo world!',
        'locale/en-us/dialog/robotics.dialog': 'I am not bound by the laws of robotics',
        'locale/en-us/vocab/HelloWorldKeyword.voc': 'hello world\ngreetings',
        'locale/en-us/intents/HowAreYou.intent': 'how are you( doing|)\nhow have you been\nhow has your day been',
        'locale/en-us/regex/Law.rx': '(the|is) (?P<LawOfRobotics>.*) (law of robotic|law of robotics)',
      },
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

  createLocaleFolders() {
    try {
      if (!existsSync('src/locale')) {
        mkdirSync('src/locale');
      }
      mkdirSync('src/locale/en-us');
      mkdirSync('src/locale/en-us/vocab');
      mkdirSync('src/locale/en-us/dialog');
      mkdirSync('src/locale/en-us/regex');
      mkdirSync('src/locale/en-us/intents');
    } catch (err) {
      console.error(err);
    }
  }

  createGithubWorkflows() {
    new LicenseTestsWorkflow(this.github!);
    new PublishAlphaWorkflow(this.github!);
    // new PublishBuildWorkflow(this.github!); // TODO:
    new SkillTestsWorkflow(this.github!);
    new UpdateSkillJsonWorkflow(this.github!);
  }

  // Retrofitting methods
  // restructureLocaleFolders() { // TODO: Handle localization, this structure is wrong
  //   ['ui', 'vocab', 'dialog', 'regex', 'intents'].forEach((dir) => {
  //     try {
  //       if (!existsSync('src/locale')) {
  //         mkdirSync('src/locale');
  //       }
  //       // For each language code directory in ${dir}, rename it to `src/locale/${language_code}/${dir}`
  //       // TODO: The next line is wrong
  //       renameSync(dir, `src/locale/${dir}`);
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   });
  // }

  // addImports(file: File) {
  //   // Load a file and add imports to the top
  //   // from ovos_workshop.decorators import intent_handler
  //   // from ovos_workshop.skills import OVOSSkill
  //   // from ovos_utils.intents import IntentBuilder
  //   // from ovos_bus_client.message import Message ?
  //   const existingSkillFileContents = readSync(openSync(file, 'r')); // TODO:
  //   // Add imports to the top
  //   // Add TODO: comment to the top saying to remove old MycroftSkill imports
  //   // Add TODO: comment to the top saying to replace intent_handler with intent_file_handler
  //   // Don't pass `name=...` parameter to super()
  //   // For super init, use `*args, **kwargs`
  //   // Overwrite file contents
  // }

  // createDevBranch() {
  //   // TODO: If not exists
  // }
}
