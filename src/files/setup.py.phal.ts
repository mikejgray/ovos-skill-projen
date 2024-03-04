interface setupPyInterface {
  /**
     * The URL of the plugin's GitHub repository.
  */
  repositoryUrl: string;
  /**
   * The name of the directory containing the plugin's code.
   * @default "" (root)
   */
  packageDir: string;
  /**
   * The name of the plugin's author.
   */
  author: string;
  /**
   * The email address of the plugin's author.
   */
  authorAddress: string;
  /**
   * The name of the plugin class.
   */
  pluginClass: string;
  /**
   * The name of the plugin's PyPi package.
   */
  pypiName: string;
  /**
   * The description of the plugin.
   */
  description: string;
  /**
   * The license of the plugin.
   */
  license: string;
  /**
   * Whether the plugin is an admin PHAL plugin, meaning it runs as root.
   * @default false
   */
  admin?: boolean;
}

export const setupPhalPy = ({
  repositoryUrl,
  packageDir,
  author,
  authorAddress,
  pypiName,
  pluginClass,
  description,
  license,
  admin,
}: setupPyInterface): string => {
  return `#!/usr/bin/env python3
from setuptools import setup
from os import walk, path

BASEDIR = path.abspath(path.dirname(__file__))
URL = "${repositoryUrl}"
plugin_CLAZZ = "${pluginClass}"  # needs to match __init__.py class name
PYPI_NAME = "${pypiName}"  # pip install PYPI_NAME

# below derived from github url to ensure standard plugin_id
plugin_AUTHOR, plugin_NAME = URL.split(".com/")[-1].split("/")
plugin_PKG = plugin_NAME.lower().replace("-", "_")
PLUGIN_ENTRY_POINT = f"{plugin_NAME.lower()}.{plugin_AUTHOR.lower()}={plugin_PKG}:{plugin_CLAZZ}"
# plugin_id=package_name:pluginClass
BASE_PATH = BASE_PATH = path.abspath(path.join(path.dirname(__file__), "${packageDir}"))


def get_version():
    """Find the version of the package"""
    version = None
    version_file = path.join(BASE_PATH, "version.py")
    major, minor, build, alpha = (None, None, None, None)
    with open(version_file) as f:
        for line in f:
            if "VERSION_MAJOR" in line:
                major = line.split("=")[1].strip()
            elif "VERSION_MINOR" in line:
                minor = line.split("=")[1].strip()
            elif "VERSION_BUILD" in line:
                build = line.split("=")[1].strip()
            elif "VERSION_ALPHA" in line:
                alpha = line.split("=")[1].strip()

            if (major and minor and build and alpha) or "# END_VERSION_BLOCK" in line:
                break
    version = f"{major}.{minor}.{build}"
    if alpha and int(alpha) > 0:
        version += f"a{alpha}"
    return version


def get_requirements(requirements_filename: str):
    requirements_file = path.join(path.dirname(__file__), requirements_filename)
    with open(requirements_file, "r", encoding="utf-8") as r:
        requirements = r.readlines()
    requirements = [r.strip() for r in requirements if r.strip() and not r.strip().startswith("#")]
    return requirements


def find_resource_files():
    resource_base_dirs = ("locale", "intents", "dialog", "vocab", "regex", "ui")
    package_data = ["*.json"]
    for res in resource_base_dirs:
        if path.isdir(path.join(BASE_PATH, res)):
            for directory, _, files in walk(path.join(BASE_PATH, res)):
                if files:
                    package_data.append(path.join(directory.replace(BASE_PATH, "").lstrip("/"), "*"))
    return package_data


with open("README.md", "r") as f:
    long_description = f.read()

setup(
    name=PYPI_NAME,
    version=get_version(),
    description="${description}",
    long_description=long_description,
    long_description_content_type="text/markdown",
    url=URL,
    author="${author}",
    author_email="${authorAddress}",
    license="${license}",
    package_dir={plugin_PKG: "${packageDir ?? '.'}"},
    package_data={plugin_PKG: find_resource_files()},
    packages=[plugin_PKG],
    include_package_data=True,
    install_requires=get_requirements("requirements.txt"),
    keywords="ovos plugin voice assistant",
    entry_points={${admin ? 'ovos.plugin.phal.admin' : 'ovos.plugin.phal'}: PLUGIN_ENTRY_POINT},
)
`;
};