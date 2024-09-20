"use server";

import { NextResponse } from "next/server";
import Database from "better-sqlite3";
import PQueue from "p-queue";
import fs from 'fs';
import path from 'path';

const BROWSERLESS_URL = process.env.BROWSERLESS_URL!;
const BROWSERLESS_TOKEN = process.env.BROWSERLESS_TOKEN!;

// Initialize the queue
const queue = new PQueue({ concurrency: 3 });

// Use an environment variable for the database path, with a default that matches Coolify's volume path
const dbPath = process.env.DB_PATH || '/db/pdf_count.sqlite';

// Ensure the directory exists
const dbDir = path.dirname(dbPath);
if (!fs.existsSync(dbDir)) {
  console.log(`Creating directory: ${dbDir}`);
  fs.mkdirSync(dbDir, { recursive: true });
}

// Initialize the database
console.log(`Initializing database at: ${dbPath}`);
const db = new Database(dbPath);

// Initialize database schema
db.exec(`
  CREATE TABLE IF NOT EXISTS pdf_count (id INTEGER PRIMARY KEY, count INTEGER DEFAULT 0);
  INSERT OR IGNORE INTO pdf_count (id, count) VALUES (1, 0);
`);

// Prepare statements
const incrementCount = db.prepare(
  "UPDATE pdf_count SET count = count + 1 WHERE id = 1"
);
const getCount = db.prepare("SELECT count FROM pdf_count WHERE id = 1");

async function generatePDF(html: string): Promise<ArrayBuffer> {
  const response = await fetch(
    `${BROWSERLESS_URL}/pdf?token=${BROWSERLESS_TOKEN}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        html,
        options: {
          format: "a4",
          margin: { top: "0px", right: "0px", bottom: "0px", left: "0px" },
        },
      }),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    console.error(
      `PDF generation failed: ${response.status} ${response.statusText}`,
      errorText
    );
    throw new Error(
      `HTTP error! status: ${response.status}, message: ${errorText}`
    );
  }

  return response.arrayBuffer();
}

export async function POST(request: Request) {
  const { html } = await request.json();

  if (!html || typeof html !== "string") {
    return NextResponse.json(
      { error: "Invalid HTML content" },
      { status: 400 }
    );
  }

  try {
    const pdf = await queue.add(() => generatePDF(html));
    incrementCount.run();

    return new NextResponse(pdf as BodyInit, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=resume.pdf",
      },
    });
  } catch (error: any) {
    console.error("Error generating PDF:", error);
    return NextResponse.json(
      { error: error.message || "Failed to generate PDF" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const { count } = getCount.get() as { count: number };
    return NextResponse.json({ count });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to fetch PDF count" },
      { status: 500 }
    );
  }
}
