/**
 * Forms Configuration
 * 
 * Configures contact form submissions to HubSpot Forms API and Google Apps Script endpoints.
 */

export const HUBSPOT_PORTAL_ID = '247156656';
export const HUBSPOT_FORM_ID = 'bc7df255-6ea9-4a52-a1a7-9e2a5544c935';
export const HUBSPOT_FORM_SUBMISSION_URL = `https://api.hsforms.com/submissions/v3/integration/submit/${HUBSPOT_PORTAL_ID}/${HUBSPOT_FORM_ID}`;

export const HUBSPOT_NEWSLETTER_FORM_ID = 'b2d12ec8-97b8-4568-a306-a572f6ac2990';
export const HUBSPOT_NEWSLETTER_SUBMISSION_URL = `https://api.hsforms.com/submissions/v3/integration/submit/${HUBSPOT_PORTAL_ID}/${HUBSPOT_NEWSLETTER_FORM_ID}`;

export const GOOGLE_APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyqCAY9Y1MCcY0t7jJ98-SyIugZ1jJr2wHLQaiL5dmWPVQvkxOkvVbKca-EtLDgeRug/exec';

export interface FormSubmissionPayload {
  formType?: 'modal_consultation' | 'homepage_booking' | string;
  firstName?: string;
  lastName?: string;
  name?: string;
  email: string;
  phone?: string;
  countryCode?: string;
  projectDetails?: string;
  referralSource?: string;
  howHeard?: string;
  website?: string;
  honeypot?: string;
  [key: string]: any;
}

/**
 * Submit consultation modal data to HubSpot Forms API.
 */
export async function submitToHubSpot(
  payload: FormSubmissionPayload
): Promise<{ success: boolean; message?: string }> {
  // Honeypot check: If hidden honeypot field is filled, silently block submission
  if (payload.website || payload.honeypot) {
    console.warn('Spam detected via honeypot field.');
    return { success: true }; // Fake success for bots
  }

  const fields = [
    {
      objectTypeId: '0-1',
      name: 'firstname',
      value: (payload.firstName || '').trim()
    },
    {
      objectTypeId: '0-1',
      name: 'lastname',
      value: (payload.lastName || '').trim()
    },
    {
      objectTypeId: '0-1',
      name: 'email',
      value: (payload.email || '').trim()
    },
    {
      objectTypeId: '0-1',
      name: 'phone',
      value: (payload.phone || '').trim()
    },
    {
      objectTypeId: '0-1',
      name: 'message',
      value: (payload.projectDetails || '').trim()
    },
    {
      objectTypeId: '0-1',
      name: 'how_did_your_hear_about_us_',
      value: (payload.howHeard || payload.referralSource || '').trim()
    }
  ];

  try {
    const response = await fetch(HUBSPOT_FORM_SUBMISSION_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ fields })
    });

    if (response.ok) {
      return { success: true, message: 'Inquiry submitted successfully.' };
    } else {
      const errorData = await response.json().catch(() => null);
      console.error('Error submitting form to HubSpot Forms API:', response.status, errorData);
      return {
        success: false,
        message: 'Failed to submit form. Please check your information or try again later.'
      };
    }
  } catch (error) {
    console.error('Network or runtime error submitting form to HubSpot:', error);
    return {
      success: false,
      message: 'Failed to submit form. Please check your internet connection or try again.'
    };
  }
}

/**
 * Submit form data to Google Apps Script endpoint.
 * Note: 'Content-Type': 'text/plain' is required by Google Apps Script Web Apps
 * to avoid CORS preflight (OPTIONS) requests, which Google Apps Script does not support.
 */
export async function submitToGoogleAppsScript(payload: FormSubmissionPayload): Promise<{ success: boolean; message?: string }> {
  // Honeypot check: If hidden honeypot field is filled, silently block submission
  if (payload.website || payload.honeypot) {
    console.warn('Spam detected via honeypot field.');
    return { success: true }; // Fake success for bots
  }

  // If using placeholder URL, log payload and simulate successful submission
  if (!GOOGLE_APPS_SCRIPT_URL || GOOGLE_APPS_SCRIPT_URL.includes('YOUR_SCRIPT_ID')) {
    console.log('[Form Submission Demo Mode] Submitting payload to Google Apps Script placeholder:', payload);
    await new Promise(r => setTimeout(r, 1200)); // Simulate network latency
    return { success: true, message: 'Demo submission successful! Drop in your Google Apps Script URL in src/config/forms.ts when ready.' };
  }

  try {
    // IMPORTANT FOR GOOGLE APPS SCRIPT:
    // mode: 'no-cors' is REQUIRED because Google Apps Script responds to POST with a 302 redirect
    // to script.googleusercontent.com, which standard browser CORS policy blocks as "TypeError: Failed to fetch".
    // With mode: 'no-cors', the POST request payload is delivered successfully to Google Sheets.
    await fetch(GOOGLE_APPS_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8'
      },
      body: JSON.stringify(payload)
    });

    // In 'no-cors' mode, the response is opaque (type 'opaque', status 0).
    // If no network error was thrown by fetch(), the submission reached Google Apps Script.
    return { success: true, message: 'Inquiry submitted successfully.' };
  } catch (error) {
    console.error('Error submitting form to Google Apps Script:', error);
    return { success: false, message: 'Failed to submit form. Please check your internet connection or try again.' };
  }
}

/**
 * Submit newsletter email to HubSpot Forms API.
 */
export async function submitNewsletterToHubSpot(
  email: string
): Promise<{ success: boolean; message?: string }> {
  const fields = [
    {
      objectTypeId: '0-1',
      name: 'email',
      value: email.trim()
    }
  ];

  try {
    const response = await fetch(HUBSPOT_NEWSLETTER_SUBMISSION_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ fields })
    });

    if (response.ok) {
      return { success: true, message: 'Subscribed successfully.' };
    } else {
      const errorData = await response.json().catch(() => null);
      console.error('Error submitting newsletter to HubSpot Forms API:', response.status, errorData);
      return {
        success: false,
        message: 'Failed to subscribe. Please try again.'
      };
    }
  } catch (error) {
    console.error('Network or runtime error submitting newsletter to HubSpot:', error);
    return {
      success: false,
      message: 'Failed to subscribe. Please check your connection and try again.'
    };
  }
}
