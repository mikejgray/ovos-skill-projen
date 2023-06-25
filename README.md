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

## Create a new skill template

In a new directory, run:

`projen new ovosskill --from "@mikejgray/ovos-skill-projen"`

You can also pass flags for supported projen options, such as `--author` and `--authorAddress`. For a full list of supported options, see [`API.md`](API.md)

## Retrofitting Mycroft skills

If you have an existing Mycroft skill that you'd like to convert to an OVOS skill, you can do so by running the following command in your skill directory:

`projen new ovosskill --from "@mikejgray/ovos-skill-projen" --retrofit`

This will:

- Add the OVOS skill requirements to your `requirements.txt` file, creating one if it does not exist
- Overwrite your .gitignore file with a standard Python .gitignore plus `node_modules` and `.DS_Store`
- Create a dev branch, if one does not exist, and commit the changes to it
- Add all of OVOS' standard GitHub Actions workflows to your `.github/workflows` directory
- Move files in `ui`, `intent`, `dialog`, etc. directories to `locale`, respecting the language folders within (WIP)
- Replace Mycroft imports with their OVOS replacements in your `__init__.py` file, assuming it is in the root of the repo

It will not:

- Overwrite your README.md file, if it exists, or create one if it does not exist
- Create sample code
- Touch your LICENSE file
  - Note that official OVOS and Neon skills have skill license requirements that may not be compatible with your existing license, if you want to submit it as part of one of those organizations. Please review the [OVOS skill license requirements](https://openvoiceos.github.io/ovos-technical-manual/license/).

Once the retrofit is complete, you can review the changes needed for modernization with `grep TODO __init__.py`. This project attempts to handle as many as possible, but due to differences in code style and structure, some changes will need to be made manually.
