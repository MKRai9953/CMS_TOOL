export const alphanumericRegex = /^[A-Za-z0-9\s]*$/;

export const validateAlphanumeric = (input: string): string | null => {
  if (!input.trim()) {
    return "This field is required.";
  }
  if (!alphanumericRegex.test(input)) {
    return "Only letters, numbers, and spaces are allowed.";
  }
  return null;
};

export const sanitizeInput = (input: string): string => {
  return input.replace(/<[^>]*>?/gm, "").trim();
};
