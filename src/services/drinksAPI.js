export const getDrinks = async (type, search, filter = 'list', key) => {
  const response = await (await fetch(`https://www.thecocktaildb.com/api/json/v1/1/${filter}.php?${type}=${search}`)).json();
  const data = key ? await response[key] : await response;
  return data;
};
