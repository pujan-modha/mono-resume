"use server";

import { NextResponse } from "next/server";
import crypto from "crypto";

const PDF_SERVICE_URL = process.env.PDF_SERVICE_URL!;
const API_KEY = process.env.API_KEY!;

function createSignature(timestamp: string): string {
  const signature = crypto
    .createHmac("sha256", API_KEY)
    .update(`${timestamp}/`)
    .digest("hex");
  return signature;
}

export async function GET() {
  const timestamp = Math.floor(Date.now() / 1000).toString();

  if (!PDF_SERVICE_URL || !API_KEY) {
    return NextResponse.json(
      { error: "Server configuration error" },
      { status: 500 }
    );
  }

  const signature = createSignature(timestamp);

  try {
    const response = await fetch(`${PDF_SERVICE_URL}/pdf-count`, {
      method: "GET",
      headers: {
        "X-API-Key": API_KEY,
        "X-Timestamp": timestamp,
        "X-Signature": signature,
      },
      cache: "no-store",
    });

    const responseText = await response.text();

    if (!response.ok) {
      console.error(
        `Failed to fetch PDF count with status ${response.status}: ${responseText}`
      );
      return NextResponse.json(
        { error: `Failed to fetch PDF count: ${responseText}` },
        { status: response.status }
      );
    }

    let data;
    try {
      data = JSON.parse(responseText);
    } catch (parseError) {
      return NextResponse.json(
        { error: `Invalid JSON response: ${responseText}` },
        { status: 500 }
      );
    }

    return NextResponse.json({ count: data.count });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to fetch PDF count" },
      { status: 500 }
    );
  }
}
