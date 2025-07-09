import { NextRequest, NextResponse } from 'next/server';

// Diese Konfiguration verhindert statisches Rendering für API-Routen
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    // Validate request
    if (!username || !password) {
      return NextResponse.json(
        { error: 'Benutzername und Passwort sind erforderlich' },
        { status: 400 }
      );
    }

    // Get credentials from environment variables
    const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'tim';
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'Killingyou11';
    const ADMIN_USER_NAME = process.env.ADMIN_USER_NAME || 'Tim Werner';

    // Validate credentials
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      return NextResponse.json(
        { 
          success: true, 
          user: ADMIN_USER_NAME,
          message: 'Erfolgreich angemeldet' 
        },
        { status: 200 }
      );
    } else {
      // Add a small delay to prevent brute force attacks
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return NextResponse.json(
        { error: 'Ungültiger Benutzername oder Passwort' },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error('Admin login error:', error);
    return NextResponse.json(
      { error: 'Interner Serverfehler' },
      { status: 500 }
    );
  }
} 