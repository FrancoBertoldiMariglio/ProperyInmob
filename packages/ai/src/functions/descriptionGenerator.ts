import type { BaseAIProvider } from '../providers/baseProvider';
import type { DescriptionGeneratorInput } from '../types';

/**
 * Generate a property description using AI
 */
export async function generatePropertyDescription(
  provider: BaseAIProvider,
  input: DescriptionGeneratorInput
): Promise<string> {
  const prompt = buildDescriptionPrompt(input);
  return provider.generateText(prompt);
}

function buildDescriptionPrompt(input: DescriptionGeneratorInput): string {
  const { propertyType, operation, neighborhood, features, amenities, tone, maxLength } = input;

  const lengthInstructions = {
    short: 'Genera una descripcion breve de 2-3 oraciones.',
    medium: 'Genera una descripcion de longitud media, 1-2 parrafos.',
    long: 'Genera una descripcion detallada de 3-4 parrafos.',
  };

  const toneInstructions = {
    formal: 'Usa un tono formal y profesional.',
    casual: 'Usa un tono amigable y cercano.',
    premium: 'Usa un tono sofisticado y exclusivo, destacando el lujo.',
  };

  return `Genera una descripcion atractiva para publicar una propiedad en portales inmobiliarios.

**Datos de la propiedad:**
- Tipo: ${propertyType}
- Operacion: ${operation === 'sale' ? 'Venta' : 'Alquiler'}
- Barrio: ${neighborhood}
- Superficie total: ${features.totalArea} m²
${features.coveredArea ? `- Superficie cubierta: ${features.coveredArea} m²` : ''}
${features.bedrooms ? `- Dormitorios: ${features.bedrooms}` : ''}
${features.bathrooms ? `- Banos: ${features.bathrooms}` : ''}
${features.age ? `- Antiguedad: ${features.age} anos` : ''}
${features.condition ? `- Estado: ${features.condition}` : ''}
${amenities.length > 0 ? `- Amenities: ${amenities.join(', ')}` : ''}

**Instrucciones:**
- ${toneInstructions[tone]}
- ${lengthInstructions[maxLength]}
- Destaca las caracteristicas mas atractivas
- No incluyas el precio
- Escribe en espanol
- Genera solo la descripcion, sin titulos ni encabezados`;
}

/**
 * Generate a property title using AI
 */
export async function generatePropertyTitle(
  provider: BaseAIProvider,
  propertyType: string,
  neighborhood: string,
  features: { bedrooms?: number; totalArea?: number }
): Promise<string> {
  const prompt = `Genera un titulo breve y atractivo (maximo 60 caracteres) para una publicacion inmobiliaria.

Tipo: ${propertyType}
Barrio: ${neighborhood}
${features.bedrooms ? `Ambientes: ${features.bedrooms + 1}` : ''}
${features.totalArea ? `Superficie: ${features.totalArea} m²` : ''}

El titulo debe ser conciso, incluir el tipo de propiedad, cantidad de ambientes si aplica, y una caracteristica destacada o el barrio.
Genera solo el titulo, sin comillas ni puntuacion final.`;

  return provider.generateText(prompt);
}
