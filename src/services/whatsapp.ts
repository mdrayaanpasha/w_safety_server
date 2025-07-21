import axios from 'axios';
import qs from 'qs';

async function sendWhatsAppMessageTwilio(to: string, complaintId: any) {

    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const contentSid = process.env.TWILIO_CONTENT_SID;
    const fromNumber = process.env.TWILIO_WHATSAPP_FROM;

    const authToken = process.env.TWILIO_AUTH_TOKEN;

    const clientUrl = process.env.clienturl;

    const url = process.env.TWILLO_URI || "";

    const messageText = "🚨 You’ve been dispatched to a complaint.";
    const complaintLink = `${clientUrl}/dashboard`;

    const data = qs.stringify({
        'To': `whatsapp:${to}`,
        'From': fromNumber,
        'ContentSid': contentSid,
        'ContentVariables': JSON.stringify({
            "1": messageText,
            "2": complaintLink
        })
    });

    const auth = Buffer.from(`${accountSid}:${authToken}`).toString('base64');

    await axios.post(url, data, {
        headers: {
            'Authorization': `Basic ${auth}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
}

export default sendWhatsAppMessageTwilio;
