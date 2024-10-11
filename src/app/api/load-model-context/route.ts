// app/api/load-context/route.ts
import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function GET() {
    try {
        // Resolve the path to your text file (assumes the file is in the 'public' folder)
        const filePath = path.join(process.cwd(), 'public', 'context.txt');

        // Read the file content
        const fileContent = await fs.readFile(filePath, 'utf-8');

        // Respond with the file content
        return NextResponse.json({ context: fileContent });
    } catch (error) {
        console.error("Error loading the context:", error);
        return NextResponse.json({ error: "Failed to load context" }, { status: 500 });
    }
}
