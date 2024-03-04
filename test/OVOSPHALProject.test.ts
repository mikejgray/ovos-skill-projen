import { Testing } from 'projen';
import { OVOSPHALProject } from '../src';

test('snapshot', () => {
  const project = new OVOSPHALProject({
    name: 'test',
    skillClass: 'TestPlugin',
    pypiName: 'test-plugin',
  });

  const synth = Testing.synth(project);
  expect(synth).toMatchSnapshot();
  expect(synth['requirements.txt']).toBeDefined();
  expect(synth['requirements.txt']).toContain('ovos-utils\novos-bus-client\novos-workshop');
});
