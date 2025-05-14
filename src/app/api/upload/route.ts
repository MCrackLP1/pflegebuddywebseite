import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { writeFile } from 'fs/promises';

// Maximale Dateigröße: 2MB
const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB in Bytes

// Verhindern von statischem Rendering für API-Routen
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'Keine Datei hochgeladen' },
        { status: 400 }
      );
    }

    // Überprüfen des Dateityps
    if (!file.name.endsWith('.webp')) {
      return NextResponse.json(
        { error: 'Nur .webp-Dateien sind erlaubt' },
        { status: 400 }
      );
    }
    
    // Überprüfen der Dateigröße
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: 'Die Datei darf maximal 2MB groß sein' },
        { status: 400 }
      );
    }

    // Speicherpfad
    const uploadDir = path.join(process.cwd(), 'public', 'spline');

    // Sicherstellen, dass das Verzeichnis existiert
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Generiere einen sicheren Dateinamen basierend auf dem Original
    const sanitizedFilename = file.name
      .replace(/[^a-zA-Z0-9-_.]/g, '-')
      .toLowerCase();

    const filePath = path.join(uploadDir, sanitizedFilename);
    
    // Datei als ArrayBuffer lesen und speichern
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    await writeFile(filePath, buffer);
    
    // Relative URL zurückgeben
    const fileUrl = `/spline/${sanitizedFilename}`;
    
    return NextResponse.json({ 
      success: true, 
      url: fileUrl,
      message: 'Datei erfolgreich hochgeladen' 
    });
  } catch (error) {
    console.error('Fehler beim Hochladen:', error);
    return NextResponse.json(
      { error: 'Fehler beim Hochladen der Datei' },
      { status: 500 }
    );
  }
} 