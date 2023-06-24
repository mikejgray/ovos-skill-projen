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
});