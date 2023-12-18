export const fetchPage = async (pageNumber: number): Promise<any | undefined> => {
  const abortController = new AbortController();

  try {
    const response = await fetch(`https://api.shabe.ir/role?page=${pageNumber}`, {
      signal: abortController.signal,
    });

    if (abortController.signal.aborted) {
      return;
    }

    const data = await response.json();
    // console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
