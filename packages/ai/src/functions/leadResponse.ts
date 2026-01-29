import type { BaseAIProvider } from '../providers/baseProvider';
import type { LeadResponseInput } from '../types';

/**
 * Generate a suggested response for a lead inquiry
 */
export async function generateLeadResponse(
  provider: BaseAIProvider,
  input: LeadResponseInput
): Promise<string> {
  const prompt = buildLeadResponsePrompt(input);
  return provider.generateText(prompt);
}

function buildLeadResponsePrompt(input: LeadResponseInput): string {
  const { leadName, propertyTitle, leadMessage, context } = input;

  return `Genera una respuesta profesional y amigable para un cliente potencial interesado en una propiedad.

**Nombre del cliente:** ${leadName}
**Propiedad de interes:** ${propertyTitle}
**Mensaje del cliente:** "${leadMessage}"
${context ? `**Contexto adicional:** ${context}` : ''}

**Instrucciones:**
- Respuesta en espanol
- Tono profesional pero cercano
- Agradece el interes
- Responde a cualquier pregunta especifica
- Ofrece coordinar una visita
- No inventes informacion sobre la propiedad
- Cierra ofreciendo disponibilidad para mas consultas
- Longitud: 3-5 oraciones`;
}

/**
 * Generate follow-up message for a lead
 */
export async function generateFollowUpMessage(
  provider: BaseAIProvider,
  leadName: string,
  propertyTitle: string,
  daysSinceLastContact: number,
  lastInteraction: string
): Promise<string> {
  const prompt = `Genera un mensaje de seguimiento para un lead que no ha respondido.

**Cliente:** ${leadName}
**Propiedad:** ${propertyTitle}
**Dias desde ultimo contacto:** ${daysSinceLastContact}
**Ultima interaccion:** ${lastInteraction}

**Instrucciones:**
- Mensaje breve y no invasivo
- Recordar interes en la propiedad
- Ofrecer disponibilidad para visita o consultas
- Tono amigable, no presionar
- En espanol
- 2-3 oraciones`;

  return provider.generateText(prompt);
}

/**
 * Analyze lead quality and suggest actions
 */
export async function analyzeLead(
  provider: BaseAIProvider,
  leadData: {
    name: string;
    budget: number;
    timeline: string;
    hasFinancing: boolean;
    activities: string[];
  }
): Promise<string> {
  const prompt = `Analiza la calidad de este lead y sugiere acciones.

**Lead:** ${leadData.name}
**Presupuesto:** USD ${leadData.budget}
**Timeline:** ${leadData.timeline}
**Financiacion:** ${leadData.hasFinancing ? 'Si' : 'No'}
**Actividades recientes:** ${leadData.activities.join(', ')}

**Instrucciones:**
- Evalua la calidad del lead (alta/media/baja)
- Justifica brevemente
- Sugiere 2-3 acciones concretas
- En espanol, formato breve`;

  return provider.generateText(prompt);
}
