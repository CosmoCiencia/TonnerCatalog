const fallbackAdvisorWhatsApp = '573000000000';

function normalizeWhatsAppNumber(value: string | undefined): string {
  const digitsOnly = (value ?? '').replace(/\D/g, '');
  return digitsOnly || fallbackAdvisorWhatsApp;
}

export const TONNER_ADVISOR_WHATSAPP = normalizeWhatsAppNumber(
  import.meta.env.VITE_TONNER_ADVISOR_WHATSAPP,
);
