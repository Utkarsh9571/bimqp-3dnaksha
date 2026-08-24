/**
 * Forms Configuration
 * 
 * Stores the Google Apps Script Web App endpoint URL for contact form submissions.
 * Replace GOOGLE_APPS_SCRIPT_URL with your deployed Web App URL from Google Sheets
 * (Extensions > Apps Script > Deploy > New Deployment > Web App > Anyone access).
 */

export const GOOGLE_APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyqCAY9Y1MCcY0t7jJ98-SyIugZ1jJr2wHLQaiL5dmWPVQvkxOkvVbKca-EtLDgeRug/exec';

export interface FormSubmissionPayload {
  formType: 'modal_consultation' | 'homepage_booking';
  firstName?: string;
  lastName?: string;
  name?: string;
  email: string;
  phone?: string;
  countryCode?: string;
  projectDetails?: string;
  referralSource?: string;
  [key: string]: any;
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
