import { ServiceInterface } from "./service_interface";

export abstract class SearchInterface extends ServiceInterface {
  /**
   * @brief Find all matching properties based on user preferences
   *        Supposed to emulate a virtual class member
   *
   * @param args any number of arguments
   * @returns Array of matching properties
   */
  abstract findMatchingProperties(...args: any[]): Promise<any[]>;
}
