/**
 * A utility class for validating input fields in endpoints.
 */
export class endpointUtils {
  /**
   * Validates the input field.
   * @param input - The input field to be validated.
   * @param fieldName - The name of the input field.
   * @param type - The expected type of the input field.
   * @param error - An array to store any validation errors.
   * @returns An array of validation errors, if any.
   */
  static validateInput(
    input: any,
    fieldName: string,
    type: string,
    error: any[]
  ) {
    this.checkIfNull(input, fieldName, error);
    this.checkIfUndefined(input, fieldName, error);
    this.checkCorrectType(input, type, fieldName, error);
    return error;
  }

  /**
   * Checks if the input field is null or has no value.
   * @param input - The input field to be validated.
   * @param fieldName - The name of the input field.
   * @param error - An array to store any validation errors.
   */
  private static checkIfNull(input: any, fieldName: string, error: any[]) {
    if (input === "") {
      error.push(`${fieldName} is null/has no value`);
    }
  }

  /**
   * Checks if the input field is undefined or not provided.
   * @param input - The input field to be validated.
   * @param fieldName - The name of the input field.
   * @param error - An array to store any validation errors.
   */
  private static checkIfUndefined(input: any, fieldName: string, error: any[]) {
    if (input === null) {
      error.push(`${fieldName} is undefined/not provided`);
    }
  }

  /**
   * Checks if the input field is of the correct type.
   * @param input - The input field to be validated.
   * @param type - The expected type of the input field.
   * @param fieldName - The name of the input field.
   * @param error - An array to store any validation errors.
   */
  private static checkCorrectType(
    input: any,
    type: string,
    fieldName: string,
    error: any[]
  ) {
    if (typeof input !== type) {
      error.push(`${fieldName} is of invalid format/type`);
    }
  }
}
