declare global {
  interface Window {
    gtag: Gtag.Gtag;
    dataLayer: Record<string, any>[];
  }
}