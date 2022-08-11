export async function fetchData(url, source, options) {

  try {
    const response = await fetch(url, options);
    if (!response.ok) throw new Error('Could not fetch data!');

    const result = await response.json();

    return result;

  } catch (error) {
    console.log(`${source} error: ${error}`)
  }
 
}