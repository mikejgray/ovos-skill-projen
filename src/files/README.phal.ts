interface readmePhalInterface {
  skillClass: string;
  authorName: string;
  authorHandle: string;
};

export const readmePhalMd = ({
  skillClass,
  authorName,
  authorHandle,
}: readmePhalInterface): string => {
  return `# ${skillClass}

Template for an OVOS PHAL plugin.

\`\`\`python
self.bus.on("mycroft.ready", self.on_mycroft_ready)
\`\`\`

## Credits

${authorName} (@${authorHandle})
`;
};
