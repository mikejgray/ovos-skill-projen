interface readmeInterface {
  skillClass: string;
  authorName: string;
  authorHandle: string;
  skillKeywords: string;
};

export const readmeMd = ({
  skillClass,
  authorName,
  authorHandle,
  skillKeywords,
}: readmeInterface): string => {
  return `# ${skillClass}

Introductory Skill so that Skill Authors can see how an OVOS Skill is put together

## About

Information about your skill

## Examples

- "Hello world"
- "How are you?"
- "Thank you"

## Credits

${authorName} (@${authorHandle})

## Category

TODO:

## Tags

${skillKeywords}
`;
};
