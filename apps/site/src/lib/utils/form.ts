interface DataType {
    [k: string]: string | Blob | number;
  }
  
  /**
   *
   * @param data Datatype
   * @returns
   */
  export const wrapDataToFormData = (data: DataType) => {
    const formData = new FormData();
    Object.entries(data).forEach(([k, v]) => {
      formData.append(k, typeof v == "number" ? String(v) : v);
      // console.log({k})
    });
    return formData;
  };
  