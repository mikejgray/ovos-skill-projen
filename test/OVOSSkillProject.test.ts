import { rmSync, writeFileSync } from 'fs';
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