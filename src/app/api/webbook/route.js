import { NextResponse } from "next/server";

// 1. WEBHOOK VERIFICATION (GET)
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  
  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  const verifyToken = process.env.WA_VERIFY_TOKEN;

  if (mode === "subscribe" && token === verifyToken) {
    // Meta requires the raw challenge string, not JSON
    return new NextResponse(challenge, { status: 200 });
  }

  return new NextResponse("Forbidden", { status: 403 });
}

// 2. RECEIVE MESSAGES & REPLY (POST)
export async function POST(request) {
  try {
    const body = await request.json();

    // Verify this is a WhatsApp event
    if (body.object === "whatsapp_business_account") {
      
      // The payload is deeply nested
      const entry = body.entry?.[0];
      const changes = entry?.changes?.[0];
      const value = changes?.value;

      // Ensure it is an actual incoming message
      if (value?.messages && value?.messages[0]) {
        const message = value.messages[0];
        
        // Extract the phone number and the message text from the webhook payload
        const from = message.from; 
        const msg_body = message.text?.body; 

        if (msg_body) {
          // Process the message and send a reply
          await sendWhatsAppMessage(from, `I received your message: "${msg_body}"`);
        }
      }
    }

    // Always return 200 OK immediately
    return NextResponse.json({ status: "success" }, { status: 200 });
  } catch (error) {
    console.error("Webhook Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// 3. HELPER FUNCTION TO SEND REPLIES
async function sendWhatsAppMessage(phoneNumber, messageText) {
  // Use the Cloud API endpoint
  const url = `https://graph.facebook.com/v21.0/${process.env.WA_PHONE_NUMBER_ID}/messages`;

  const payload = {
    messaging_product: "whatsapp",
    recipient_type: "individual",
    to: phoneNumber,
    type: "text",
    text: {
      preview_url: false,
      body: messageText
    }
  };

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.WA_ACCESS_TOKEN}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error("Failed to send WhatsApp message:", errorData);
  }
}