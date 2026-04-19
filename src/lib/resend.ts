import "server-only";

import { Resend } from "resend";

import type { ContactPayload } from "@/lib/validators/contact";

const apiKey = process.env.RESEND_API_KEY;
if (!apiKey) {
  throw new Error("RESEND_API_KEY is not set");
}

export const resend = new Resend(apiKey);

export type SendContactResult =
  | { success: true; id: string }
  | { success: false; error: string };

type ContactEmailInput = ContactPayload & { productName?: string };

function getFromEmail(): string {
  const value = process.env.FROM_EMAIL;
  if (!value) throw new Error("FROM_EMAIL is not set");
  return value;
}

function getContactEmail(): string {
  const value = process.env.CONTACT_EMAIL;
  if (!value) throw new Error("CONTACT_EMAIL is not set");
  return value;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildSubject(data: ContactEmailInput): string {
  if (data.productName) {
    return `[WaterVibe] New quote request from ${data.name}: ${data.productName}`;
  }
  return `[WaterVibe] New contact from ${data.name}`;
}

function buildTextBody(data: ContactEmailInput): string {
  const lines = [
    "New WaterVibe lead",
    "",
    `Name: ${data.name}`,
    `Email: ${data.email}`,
  ];
  if (data.phone) lines.push(`Phone: ${data.phone}`);
  lines.push(`Locale: ${data.locale}`);
  if (data.productName) {
    lines.push(`Product: ${data.productName}`);
  } else if (data.productSlug) {
    lines.push(`Product slug: ${data.productSlug}`);
  }
  lines.push("", "Message:", data.message);
  return lines.join("\n");
}

function buildHtmlBody(data: ContactEmailInput): string {
  const rows: Array<[string, string]> = [
    ["Name", escapeHtml(data.name)],
    ["Email", escapeHtml(data.email)],
  ];
  if (data.phone) rows.push(["Phone", escapeHtml(data.phone)]);
  rows.push(["Locale", escapeHtml(data.locale)]);
  if (data.productName) {
    rows.push(["Product", escapeHtml(data.productName)]);
  } else if (data.productSlug) {
    rows.push(["Product slug", escapeHtml(data.productSlug)]);
  }

  const rowsHtml = rows
    .map(
      ([label, value]) =>
        `<tr>` +
        `<td style="padding:6px 12px 6px 0;color:#6B7280;font-size:13px;white-space:nowrap;vertical-align:top;">${escapeHtml(label)}</td>` +
        `<td style="padding:6px 0;color:#0E1A24;font-size:14px;">${value}</td>` +
        `</tr>`,
    )
    .join("");

  const messageHtml = escapeHtml(data.message).replace(/\n/g, "<br />");
  const heading = data.productName
    ? "New quote request"
    : "New contact message";

  return `<!doctype html>
<html lang="en">
  <body style="margin:0;padding:24px;background:#FBFBF9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:#0E1A24;">
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width:560px;margin:0 auto;background:#FFFFFF;border:1px solid #E5E7EB;border-radius:16px;overflow:hidden;">
      <tr>
        <td style="padding:24px 28px;border-bottom:1px solid #E5E7EB;background:#E8F1F2;">
          <div style="font-size:12px;letter-spacing:0.2em;text-transform:uppercase;color:#0A6E8C;">WaterVibe</div>
          <div style="font-size:20px;font-weight:600;margin-top:4px;">${escapeHtml(heading)}</div>
        </td>
      </tr>
      <tr>
        <td style="padding:24px 28px;">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
            ${rowsHtml}
          </table>
          <div style="margin-top:20px;padding-top:16px;border-top:1px solid #E5E7EB;">
            <div style="font-size:12px;letter-spacing:0.15em;text-transform:uppercase;color:#6B7280;margin-bottom:8px;">Message</div>
            <div style="font-size:14px;line-height:1.6;color:#0E1A24;white-space:pre-wrap;">${messageHtml}</div>
          </div>
        </td>
      </tr>
      <tr>
        <td style="padding:16px 28px;background:#FBFBF9;border-top:1px solid #E5E7EB;font-size:12px;color:#6B7280;">
          Reply directly to this email to respond to ${escapeHtml(data.name)}.
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

export async function sendContactEmail(
  data: ContactEmailInput,
): Promise<SendContactResult> {
  try {
    const from = getFromEmail();
    const to = getContactEmail();

    const response = await resend.emails.send({
      from,
      to,
      replyTo: data.email,
      subject: buildSubject(data),
      text: buildTextBody(data),
      html: buildHtmlBody(data),
    });

    if (response.error) {
      return { success: false, error: response.error.message };
    }
    if (!response.data?.id) {
      return { success: false, error: "No id returned from Resend" };
    }
    return { success: true, id: response.data.id };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return { success: false, error: message };
  }
}
