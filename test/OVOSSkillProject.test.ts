import { Testing } from 'projen';
import { OVOSSkillProject } from '../src';

test('snapshot', () => {
  const project = new OVOSSkillProject({
    name: 'test',
    skillClass: 'TestSkill',
  });

  const synth = Testing.synth(project);
  expect(synth).toMatchSnapshot();
});