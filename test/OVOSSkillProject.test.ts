import { existsSync, mkdirSync, rm, rmSync, writeFileSync } from 'fs';
import { Testing } from 'projen';
import { OVOSSkillProject } from '../src';

test('snapshot', () => {
  const project = new OVOSSkillProject({
    name: 'test',
    skillClass: 'TestSkill',
    pypiName: 'test-skill',
  });

  const synth = Testing.synth(project);
  expect(synth).toMatchSnapshot();
  expect(synth['requirements.txt']).toBeDefined();
  expect(synth['requirements.txt']).toContain('ovos-utils\novos-bus-client\novos-workshop');
});

describe('packageDir snapshot', () => {
  test('old style package in root', () => {
    const project = new OVOSSkillProject({
      name: 'test',
      skillClass: 'TestSkill',
      pypiName: 'test-skill',
      packageDir: '.',
    });

    const synth = Testing.synth(project);
    expect(synth).toMatchSnapshot();
    expect(synth['setup.py']).toContain('package_dir={SKILL_PKG: "."},');
  });
  test('new style package in src', () => {
    const project = new OVOSSkillProject({
      name: 'test',
      skillClass: 'TestSkill',
      pypiName: 'test-skill',
    });

    const synth = Testing.synth(project);
    expect(synth).toMatchSnapshot();
    expect(synth['setup.py']).toContain('package_dir={SKILL_PKG: "src"},');
  });
});

test('snapshot retrofit', () => {
  const project = new OVOSSkillProject({
    name: 'test',
    skillClass: 'TestSkill',
    pypiName: 'test-skill',
    retrofit: true,
  });

  const synth = Testing.synth(project);
  expect(synth).toMatchSnapshot();
  expect(synth['requirements.txt']).toBeDefined();
  expect(synth['requirements.txt']).toContain('ovos-utils\novos-bus-client\novos-workshop');

  rmSync('TODO.md');
});

test('snapshot retrofit with manifest.yml', () => {
  writeFileSync('manifest.yml', `dependencies:
  python:
    - akinator
    - rapidfuzz
`);
  const project = new OVOSSkillProject({
    name: 'test',
    skillClass: 'TestSkill',
    pypiName: 'test-skill',
    retrofit: true,
  });

  const synth = Testing.synth(project);
  expect(synth).toMatchSnapshot();
  expect(synth['requirements.txt']).toBeDefined();
  expect(synth['requirements.txt']).toContain('akinator');
  expect(synth['requirements.txt']).toContain('rapidfuzz');
  expect(synth['requirements.txt']).toContain('ovos-utils\novos-bus-client\novos-workshop');

  rmSync('manifest.yml');
  rmSync('TODO.md');
});

test('snapshot refactoring locale', () => {
  try {

    // Create directories and example files
    mkdirSync('vocab/en-us', { recursive: true });
    mkdirSync('dialog/en-us', { recursive: true });
    mkdirSync('regex/en-us', { recursive: true });
    mkdirSync('intents/en-us', { recursive: true });
    writeFileSync('vocab/en-us/ExampleKeyword.voc', 'example', { flag: 'w' });
    writeFileSync('dialog/en-us/hello.dialog', 'example', { flag: 'w' });
    writeFileSync('regex/en-us/example.rx', '^example$', { flag: 'w' });
    writeFileSync('intents/en-us/hello.intent', 'example', { flag: 'w' });
    const project = new OVOSSkillProject({
      name: 'test',
      skillClass: 'TestSkill',
      pypiName: 'test-skill',
      retrofit: true,
    });

    const synth = Testing.synth(project);
    expect(synth).toMatchSnapshot();
    expect(existsSync('locale/en-us/vocab/ExampleKeyword.voc')).toBeTruthy();
    expect(existsSync('locale/en-us/dialog/hello.dialog')).toBeTruthy();
    expect(existsSync('locale/en-us/regex/example.rx')).toBeTruthy();
    expect(existsSync('locale/en-us/intents/hello.intent')).toBeTruthy();
  } finally {
    rm('vocab', { recursive: true, force: true }, () => {});
    rm('dialog', { recursive: true, force: true }, () => {});
    rm('regex', { recursive: true, force: true }, () => {});
    rm('intents', { recursive: true, force: true }, () => {});
    rm('locale', { recursive: true, force: true }, () => {});
  }

});