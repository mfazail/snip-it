/**
 * Split user first and last name
 * and grab both first letter with uppercase
 *
 * Fazail Alam -> FA
 *
 * @param str user name
 * @returns
 */

export const userFallbackName = (str: string | null | undefined) => {
    if (!str) return "PF";
    const [fName, lName] = str.split(" ", 1);
  
    return (fName[0] + (lName ? lName[0] : fName[1])).toUpperCase();
  };
  
  /**
   * Set response message
   *
   * @param res response message
   * @param extra any other data (optional)
   * @returns object with message
   */
  export const responseMessage = (res: string, extra?: any) => {
    return {
      message: res,
      extra,
    };
  };
  
  /**
   *
   * Check every fields and return empty value keys
   * if all fields have value return empty []
   *
   * @param fields in object
   * @returns `string[]`
   */
  export const checkFields = (fields: { [k: string]: any }) => {
    var uFields: string[] = [];
    Object.entries(fields).forEach(([k, v]) => {
      if (!v) {
        uFields.push(k);
        // // console.log({ k, v });
      }
    });
    if (uFields.length == 0) return [];
    return uFields;
  };
  
  /**
   * Path to storage public bucket
   * `Note: ` Dont work with private bucket
   * @param path
   * @returns
   */
  
  export const publicAvatarUrl = (path: string | null) => {
    if (!path) return "";
    return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/avatars/${path}`;
  };
  
  export const salaryRange = (
    min: string | number | null = "0",
    max: string | number | null = "0"
  ) => {
    // $0-1000/-
    return `$${String(min)}-${String(max)}/-`;
  };
  