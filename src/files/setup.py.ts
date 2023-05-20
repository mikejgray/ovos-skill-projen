interface setupPyInterface {
  repositoryUrl: string;
  packageDir: string;
  author: string;
  authorAddress: string;
  skillClass?: string;
  pypiName?: string;
  description?: string;
  license?: string;
}

export const setupPy = ({
  repositoryUrl,
  packageDir,
  author,
  authorAddress,
  skillClass='HelloWorldSkill',
  pypiName='ovos-hello-world-skill',
  description='',
  license='Apache-2.0',
}: setupPyInterface): string => {
  return `#!/usr/bin/env python3
from setuptools import setup
import os
from os import walk, path

BASEDIR = path.abspath(path.dirname(__file__))
URL = "${repositoryUrl}"
SKILL_CLAZZ = "${skillClass}"  # needs to match __init__.py class name
PYPI_NAME = "${pypiName}"  # pip install PYPI_NAME

# below derived from github url to ensure standard skill_id
SKILL_AUTHOR, SKILL_NAME = URL.split(".com/")[-1].split("/")
SKILL_PKG = SKILL_NAME.lower().replace("-", "_")
PLUGIN_ENTRY_POINT = f"{SKILL_NAME.lower()}.{SKILL_AUTHOR.lower()}={SKILL_PKG}:{SKILL_CLAZZ}"
# skill_id=package_name:SkillClass


def get_requirements(requirements_filename: str):
    requirements_file = path.join(path.abspath(path.dirname(__file__)), requirements_filename)
    with open(requirements_file, "r", encoding="utf-8") as r:
        requirements = r.readlines()
    requirements = [r.strip() for r in requirements if r.strip() and not r.strip().startswith("#")]
    if "MYCROFT_LOOSE_REQUIREMENTS" in os.environ:
        print("USING LOOSE REQUIREMENTS!")
        requirements = [r.replace("==", ">=").replace("~=", ">=") for r in requirements]
    return requirements


def find_resource_files():
    resource_base_dirs = ("locale", "intents", "dialog", "vocab", "regex", "ui")
    base_dir = path.dirname(__file__)
    package_data = ["*.json"]
    for res in resource_base_dirs:
        if path.isdir(path.join(base_dir, res)):
            for directory, _, files in walk(path.join(base_dir, res)):
                if files:
                    package_data.append(path.join(directory.replace(base_dir, "").lstrip("/"), "*"))
    return package_data


with open("README.md", "r") as f:
    long_description = f.read()

with open("${packageDir}/version.py", "r", encoding="utf-8") as v:
    for line in v.readlines():
        if line.startswith("__version__"):
            if '"' in line:
                version = line.split('"')[1]
            else:
                version = line.split("'")[1]

setup(
    name=PYPI_NAME,
    version=version,
    description="${description}",
    long_description=long_description,
    url=URL,
    author="${author}",
    author_email="${authorAddress}",
    license="${license}",
    package_dir={SKILL_PKG: ""},
    package_data={SKILL_PKG: find_resource_files()},
    packages=[SKILL_PKG],
    include_package_data=True,
    install_requires=get_requirements("requirements.txt"),
    keywords="ovos skill voice assistant",
    entry_points={"ovos.plugin.skill": PLUGIN_ENTRY_POINT},
)
`;
};