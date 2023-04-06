// categorias(c): https://www.themealdb.com/api/json/v1/1/list.php?c=list
// nacionalidades(a): https://www.themealdb.com/api/json/v1/1/list.php?a=list
// ingredientes(i): https://www.themealdb.com/api/json/v1/1/list.php?i=list

// filter: filter || search || list (para retornar tudo);
// type: c == categorias || a == nacionalidades || i == ingredientes;
// search: nome da categoria de pesquisa (ex: American);

export const getDrinks = async (type, search, filter = 'list', key) => {
  const response = await (await fetch(`https://www.thecocktaildb.com/api/json/v1/1/${filter}.php?${type}=${search}`)).json();
  const data = key ? await response[key] : await response;
  return data;
};

export const getRecomendedDrinks = async () => {
  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  const data = await response.json();
  return data;
};

export const getDetailedDrink = async (id) => {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
  const data = await response.json();
  return data;
};
