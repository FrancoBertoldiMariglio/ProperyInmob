import { BaseAIProvider } from './baseProvider';
import type { AIConfig, ChatMessage, AIResponse } from '../types';
import { sleep } from '@propery-agents/config';

/**
 * Mock AI provider for development and testing
 * Returns pre-defined responses based on input patterns
 */
export class MockAIProvider extends BaseAIProvider {
  constructor(config: AIConfig) {
    super({ ...config, provider: 'mock' });
  }

  async chat(messages: ChatMessage[]): Promise<AIResponse> {
    await sleep(500); // Simulate API latency

    const lastMessage = messages[messages.length - 1];
    const response = this.generateMockResponse(lastMessage.content);

    return {
      content: response,
      usage: {
        promptTokens: Math.ceil(lastMessage.content.length / 4),
        completionTokens: Math.ceil(response.length / 4),
        totalTokens: Math.ceil((lastMessage.content.length + response.length) / 4),
      },
    };
  }

  async streamChat(messages: ChatMessage[], onChunk: (chunk: string) => void): Promise<AIResponse> {
    const lastMessage = messages[messages.length - 1];
    const response = this.generateMockResponse(lastMessage.content);

    // Simulate streaming by sending words one at a time
    const words = response.split(' ');
    for (const word of words) {
      await sleep(50);
      onChunk(word + ' ');
    }

    return {
      content: response,
      usage: {
        promptTokens: Math.ceil(lastMessage.content.length / 4),
        completionTokens: Math.ceil(response.length / 4),
        totalTokens: Math.ceil((lastMessage.content.length + response.length) / 4),
      },
    };
  }

  async generateText(prompt: string): Promise<string> {
    await sleep(300);
    return this.generateMockResponse(prompt);
  }

  private generateMockResponse(input: string): string {
    const lowerInput = input.toLowerCase();

    // Property description
    if (lowerInput.includes('descripcion') || lowerInput.includes('description')) {
      return `Espectacular propiedad ubicada en una de las zonas mas cotizadas de la ciudad. Este inmueble se destaca por su excelente ubicacion, amplios ambientes luminosos y terminaciones de primera calidad.

Cuenta con espacios cuidadosamente disenados que combinan funcionalidad y estetica, ideal para quienes buscan confort y distincion. Los ambientes principales gozan de abundante luz natural gracias a su orientacion estrategica.

Las areas comunes del edificio incluyen amenities de primer nivel, sumando valor a esta excepcional oportunidad. No pierda la chance de conocer esta propiedad que seguramente superara sus expectativas.`;
    }

    // Market analysis
    if (
      lowerInput.includes('mercado') ||
      lowerInput.includes('market') ||
      lowerInput.includes('analisis')
    ) {
      return `**Analisis de Mercado**

El mercado inmobiliario en esta zona muestra signales positivas de recuperacion. Los precios se han mantenido estables durante los ultimos 3 meses con una leve tendencia al alza del 2.3%.

**Puntos clave:**
- Demanda sostenida para unidades de 2-3 ambientes
- Tiempo promedio de venta: 45 dias
- Precio por m2: USD 3,200 - 3,800
- Tendencia: Estable con sesgo alcista

**Recomendacion:** Es un buen momento para publicar propiedades en esta zona, especialmente departamentos con amenities.`;
    }

    // Lead response
    if (
      lowerInput.includes('respuesta') ||
      lowerInput.includes('lead') ||
      lowerInput.includes('cliente')
    ) {
      return `Estimado/a,

Muchas gracias por su interes en la propiedad. Es un gusto poder asistirle en su busqueda.

La propiedad que consulta se encuentra disponible y con posibilidad de coordinacion de visitas en los proximos dias. Seria un placer mostrarle personalmente las caracteristicas y ventajas de este inmueble.

Por favor, indiqueme su disponibilidad horaria y coordinaremos una visita a su conveniencia. Quedo a su disposicion para cualquier consulta adicional.

Saludos cordiales`;
    }

    // Listing optimization
    if (
      lowerInput.includes('optimizar') ||
      lowerInput.includes('mejorar') ||
      lowerInput.includes('listing')
    ) {
      return `**Sugerencias de optimizacion:**

1. **Titulo:** Agregar caracteristicas distintivas (luminoso, esquina, vista)
2. **Descripcion:** Incluir palabras clave relevantes para SEO
3. **Orden de fotos:** Comenzar con la mejor imagen del living/salon
4. **Amenities:** Destacar aquellos mas buscados (balcon, cochera, gym)
5. **Precio:** Considerar ajuste segun comparables de la zona

**Palabras clave sugeridas:** luminoso, a estrenar, excelente ubicacion, amenities premium`;
    }

    // Default response
    return `Gracias por tu consulta. Como asistente de Propery Agents, estoy aqui para ayudarte con:

- Generacion de descripciones de propiedades
- Analisis de mercado por zona
- Sugerencias de respuestas a leads
- Optimizacion de publicaciones
- Reportes de valuacion

Por favor, especifica que necesitas y con gusto te asisto.`;
  }
}
