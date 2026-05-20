import { NextRequest, NextResponse } from 'next/server';
import Replicate from 'replicate';

// Inicializar Replicate
const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const humanImage = formData.get('humanImage') as File;
    const garmentImage = formData.get('garmentImage') as File;
    const category = formData.get('category') as string || 'upper_body';

    if (!humanImage || !garmentImage) {
      return NextResponse.json(
        { error: 'Se requieren ambas imágenes: persona y prenda' },
        { status: 400 }
      );
    }

    // Convertir imágenes a Base64
    const humanBuffer = await humanImage.arrayBuffer();
    const garmentBuffer = await garmentImage.arrayBuffer();
    const humanBase64 = Buffer.from(humanBuffer).toString('base64');
    const garmentBase64 = Buffer.from(garmentBuffer).toString('base64');

    // Crear data URLs para Replicate
    const humanDataUrl = `data:${humanImage.type};base64,${humanBase64}`;
    const garmentDataUrl = `data:${garmentImage.type};base64,${garmentBase64}`;

    console.log('Generando Virtual Try-On...');

    // IDM-VTON en Replicate
    const output = await replicate.run(
      "cuuupid/idm-vton:0513734a452173b8173e907e3a59d19a36266e55b48528559432bd21c7d7e985",
      {
        input: {
          human_img: humanDataUrl,
          garm_img: garmentDataUrl,
          category: category,
          crop: false,
          steps: 30,
          seed: 42,
        },
      }
    );

    // Extraer la URL de la imagen generada
    let imageUrl: string | null = null;
    if (typeof output === 'string') {
      imageUrl = output;
    } else if (Array.isArray(output) && output.length > 0) {
      imageUrl = output[0];
    } else if (output && typeof output === 'object' && 'url' in output) {
      imageUrl = (output as any).url;
    } else if (output && typeof output === 'object' && 'output' in output) {
      const out = (output as any).output;
      if (Array.isArray(out) && out.length > 0) {
        imageUrl = out[0];
      } else if (typeof out === 'string') {
        imageUrl = out;
      }
    }

    if (!imageUrl) {
      console.error('Error: No se pudo obtener la URL de la imagen', output);
      return NextResponse.json(
        { error: 'No se pudo generar la imagen' },
        { status: 500 }
      );
    }

    console.log('Imagen generada:', imageUrl);

    return NextResponse.json({
      success: true,
      imageUrl: imageUrl,
    });

  } catch (error) {
    console.error('Virtual Try-On Error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Error interno del servidor' },
      { status: 500 }
    );
  }
}