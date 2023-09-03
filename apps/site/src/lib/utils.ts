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