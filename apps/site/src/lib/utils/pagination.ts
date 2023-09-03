/**
 *
 * calculate the from and to
 * from the current page
 *
 * @param current
 * @param limit
 * @returns from, to
 */
export const getPaginationFromTo = (
    current: string | number,
    limit: number = 10
  ) => {
    const from = Math.max(0, Number(current)) * 10;
    const to = from + limit;
    return {
      from,
      to,
    };
  };
  
  /**
   * converts the search params to a string
   * or replace to the new params
   * // input: {a: '1', b: '2', c: undefined}
   * // output: 'a=1&b=2'
   * @param params
   * @returns
   */
  export const joinSearchParams = (params: {
    [k: string]: string | string[] | undefined;
  }) => {
    return Object.entries(params).reduce((acc, [key, value]) => {
      if (value) {
        var v = value;
        if (typeof value === "object") {
          v = value.join(",");
        }
        return `${acc}${key}=${v}&`;
      }
      return acc;
    }, "");
  };