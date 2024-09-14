"use server";

import { NextResponse } from "next/server";
import crypto from "crypto";

const PDF_SERVICE_URL = process.env.PDF_SERVICE_URL!;
const API_KEY = process.env.API_KEY!;

function createSignature(timestamp: string): string {
  return crypto
    .createHmac("sha256", API_KEY)
    .update(`${timestamp}/`)
    .digest("hex");
}

export async function POST(request: Request) {
  const { html } = await request.json();

  const timestamp = Math.floor(Date.now() / 1000).toString();
  const signature = createSignature(timestamp);

  try {
    const response = await fetch(PDF_SERVICE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": API_KEY,
        "X-Timestamp": timestamp,
        "X-Signature": signature,
      },
      body: JSON.stringify({ html }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(
        `PDF generation failed with status ${response.status}: ${errorText}`
      );
      throw new Error(`Failed to generate PDF: ${errorText}`);
    }

    const pdf = await response.arrayBuffer();
    const totalPDFsGenerated = response.headers.get("X-Total-PDFs-Generated");

    return new NextResponse(pdf, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=resume.pdf",
        "X-Total-PDFs-Generated": totalPDFsGenerated || "0",
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
