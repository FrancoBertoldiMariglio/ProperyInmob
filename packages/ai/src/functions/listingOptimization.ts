import type { BaseAIProvider } from '../providers/baseProvider';
import type { ListingOptimizationInput } from '../types';

/**
 * Analyze and optimize a property listing
 */
export async function optimizeListing(
  provider: BaseAIProvider,
  input: ListingOptimizationInput
): Promise<{
  titleSuggestions: string[];
  descriptionImprovements: string[];
  keywordSuggestions: string[];
  overallScore: number;
}> {
  const prompt = buildOptimizationPrompt(input);
  const response = await provider.generateText(prompt);

  // Parse the response (in a real implementation, use structured output)
  return parseOptimizationResponse(response);
}

function buildOptimizationPrompt(input: ListingOptimizationInput): string {
  const { title, description, propertyType, operation } = input;

  return `Analiza esta publicacion inmobiliaria y sugiere mejoras.

**Titulo actual:** ${title}
**Descripcion actual:** ${description}
**Tipo:** ${propertyType}
**Operacion:** ${operation === 'sale' ? 'Venta' : 'Alquiler'}

**Instrucciones:**
Genera un analisis en el siguiente formato:

PUNTUACION: [numero del 1 al 10]

SUGERENCIAS DE TITULO:
- [sugerencia 1]
- [sugerencia 2]

MEJORAS A LA DESCRIPCION:
- [mejora 1]
- [mejora 2]

PALABRAS CLAVE RECOMENDADAS:
- [keyword 1]
- [keyword 2]
- [keyword 3]`;
}

function parseOptimizationResponse(response: string): {
  titleSuggestions: string[];
  descriptionImprovements: string[];
  keywordSuggestions: string[];
  overallScore: number;
} {
  // Simple parsing - in production use structured output from AI
  const lines = response.split('\n');
  let score = 7;
  const titleSuggestions: string[] = [];
  const descriptionImprovements: string[] = [];
  const keywordSuggestions: string[] = [];

  let currentSection = '';

  for (const line of lines) {
    const trimmed = line.trim();

    if (trimmed.startsWith('PUNTUACION:')) {
      const match = trimmed.match(/\d+/);
      if (match) score = parseInt(match[0], 10);
    } else if (trimmed.includes('TITULO')) {
      currentSection = 'title';
    } else if (trimmed.includes('DESCRIPCION')) {
      currentSection = 'description';
    } else if (trimmed.includes('PALABRAS')) {
      currentSection = 'keywords';
    } else if (trimmed.startsWith('-')) {
      const content = trimmed.substring(1).trim();
      if (content) {
        switch (currentSection) {
          case 'title':
            titleSuggestions.push(content);
            break;
          case 'description':
            descriptionImprovements.push(content);
            break;
          case 'keywords':
            keywordSuggestions.push(content);
            break;
        }
      }
    }
  }

  return {
    titleSuggestions:
      titleSuggestions.length > 0 ? titleSuggestions : ['Agregar caracteristicas distintivas'],
    descriptionImprovements:
      descriptionImprovements.length > 0 ? descriptionImprovements : ['Incluir mas detalles'],
    keywordSuggestions:
      keywordSuggestions.length > 0 ? keywordSuggestions : ['luminoso', 'ubicacion', 'amenities'],
    overallScore: Math.max(1, Math.min(10, score)),
  };
}

/**
 * Generate SEO-optimized keywords for a listing
 */
export async function generateListingKeywords(
  provider: BaseAIProvider,
  propertyType: string,
  neighborhood: string,
  features: string[]
): Promise<string[]> {
  const prompt = `Genera 10 palabras clave SEO para una publicacion inmobiliaria.

Tipo: ${propertyType}
Barrio: ${neighborhood}
Caracteristicas: ${features.join(', ')}

Lista solo las palabras clave, una por linea, sin numeracion ni guiones.`;

  const response = await provider.generateText(prompt);
  return response
    .split('\n')
    .map((k) => k.trim())
    .filter((k) => k.length > 0)
    .slice(0, 10);
}
