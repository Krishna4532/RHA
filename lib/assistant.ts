export type AssistantMessage = {
  id: string;
  role: 'assistant' | 'user';
  content: string;
  createdAt: string;
  citations?: string[];
};

export type AssistantReply = {
  content: string;
  citations: string[];
};

const movementKnowledge = {
  overview: `The Movement is a premium civic platform focused on dignity, care, and public participation. It speaks with calm clarity, supports human dignity, and helps people understand why fairness matters in everyday life.`,
  reservationRemoval: `Reservation removal is discussed as a matter of protecting fairness, access, and representation. The movement frames this as a public question about care, inclusion, and long-term trust in institutions.`,
  campaigns: `Recent campaigns highlight community education, visible solidarity, and public storytelling. The work combines advocacy with thoughtful outreach to inspire participation across generations.`,
  contribute: `People can contribute by volunteering, joining community circles, sharing the movement’s message, or staying engaged with public updates and events.`,
  statements: `Official statements emphasize dignity, transparency, and a humane approach to public life. They are written to feel calm, precise, and deeply respectful of the people they address.`,
};

export function createAssistantReply(input: string): AssistantReply {
  const message = input.toLowerCase();

  if (message.includes('reservation') || message.includes('removal')) {
    return {
      content: `**Why Reservation Removal?**\n\n${movementKnowledge.reservationRemoval}\n\n1. It reframes fairness as a public responsibility.\n2. It brings attention to representation and access.\n3. It strengthens trust through clear and compassionate communication.`,
      citations: ['Movement overview', 'Public advocacy framework'],
    };
  }

  if (message.includes('campaign')) {
    return {
      content: `**Latest Campaigns**\n\n${movementKnowledge.campaigns}\n\n- Community education events\n- Public storytelling moments\n- Volunteer-led outreach\n\n| Focus | Purpose |\n| --- | --- |\n| Education | Build understanding |\n| Outreach | Expand participation |\n| Storytelling | Strengthen trust |`,
      citations: ['Campaign strategy', 'Community engagement notes'],
    };
  }

  if (message.includes('contribute') || message.includes('volunteer') || message.includes('support')) {
    return {
      content: `**How can I contribute?**\n\n${movementKnowledge.contribute}\n\n1. Join a local volunteer effort.\n2. Share the movement’s message with your community.\n3. Stay informed and help others feel included.`,
      citations: ['Community participation', 'Volunteer pathways'],
    };
  }

  if (message.includes('statement') || message.includes('official')) {
    return {
      content: `**Official Statements**\n\n${movementKnowledge.statements}\n\n- Dignity comes first.\n- Transparency builds trust.\n- Humane public life matters.`,
      citations: ['Official communications', 'Movement values'],
    };
  }

  return {
    content: `**About the Movement**\n\n${movementKnowledge.overview}\n\nIt is designed to feel calm, modern, and deeply human while helping people engage with important ideas in a respectful way.`,
    citations: ['Movement overview', 'Values and tone'],
  };
}
