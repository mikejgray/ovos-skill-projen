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
