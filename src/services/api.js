
const fetchData = async (fileName) => {
  try {
    const response = await fetch(`/data/${fileName}.json`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching ${fileName}:`, error);
    return [];
  }
};

export default fetchData;
