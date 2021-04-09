const apiKey = "aKY1ovy9FbiGpfG0fB0lXFerosguGffs";
const baseUrl = "http://dataservice.accuweather.com";

export const getAPIUrl = (cityName) =>
  `${baseUrl}/locations/v1/cities/search?apikey=${apiKey}&q=${cityName}`;

export const dataCity = async (key) => {
  const response = await fetch(
    `${baseUrl}/currentconditions/v1/${key}?apikey=${apiKey}&language=pt-br`
  );
  const json = await response.json();
  return json;
};
