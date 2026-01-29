import type { BaseAIProvider } from '../providers/baseProvider';
import type { MarketAnalysisInput } from '../types';

/**
 * Generate a market analysis report using AI
 */
export async function generateMarketAnalysis(
  provider: BaseAIProvider,
  input: MarketAnalysisInput,
  marketData?: {
    avgPricePerSqm: number;
    demandLevel: string;
    trendDirection: string;
    avgDaysOnMarket: number;
  }
): Promise<string> {
  const prompt = buildMarketAnalysisPrompt(input, marketData);
  return provider.generateText(prompt);
}

function buildMarketAnalysisPrompt(
  input: MarketAnalysisInput,
  marketData?: {
    avgPricePerSqm: number;
    demandLevel: string;
    trendDirection: string;
    avgDaysOnMarket: number;
  }
): string {
  const { zone, propertyType, operation } = input;

  let dataContext = '';
  if (marketData) {
    dataContext = `
**Datos de mercado actuales:**
- Precio promedio por m²: USD ${marketData.avgPricePerSqm}
- Nivel de demanda: ${marketData.demandLevel}
- Tendencia: ${marketData.trendDirection}
- Dias promedio de venta: ${marketData.avgDaysOnMarket}`;
  }

  return `Genera un analisis de mercado inmobiliario para la siguiente zona.

**Zona:** ${zone}
${propertyType ? `**Tipo de propiedad:** ${propertyType}` : ''}
${operation ? `**Operacion:** ${operation === 'sale' ? 'Venta' : 'Alquiler'}` : ''}
${dataContext}

**Instrucciones:**
- Genera un analisis profesional en espanol
- Incluye: situacion actual, tendencias, recomendaciones
- Usa formato con encabezados y bullet points
- Se conciso pero informativo
- Destaca oportunidades y riesgos`;
}

/**
 * Generate market insights summary
 */
export async function generateMarketInsights(
  provider: BaseAIProvider,
  zones: string[],
  comparativeData: Array<{
    zone: string;
    avgPricePerSqm: number;
    demandScore: number;
    priceChange30d: number;
  }>
): Promise<string> {
  const prompt = `Genera un resumen ejecutivo comparando el mercado inmobiliario de estas zonas.

**Zonas:**
${comparativeData
  .map(
    (d) =>
      `- ${d.zone}: USD ${d.avgPricePerSqm}/m², demanda ${d.demandScore}/100, cambio 30d: ${d.priceChange30d}%`
  )
  .join('\n')}

**Instrucciones:**
- Resumen breve (3-4 oraciones)
- Identifica la mejor opcion para invertir
- Identifica la mejor opcion para vender rapido
- Escribe en espanol`;

  return provider.generateText(prompt);
}
