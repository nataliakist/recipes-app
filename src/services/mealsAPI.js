// categorias(c): https://www.themealdb.com/api/json/v1/1/list.php?c=list
// nacionalidades(a): https://www.themealdb.com/api/json/v1/1/list.php?a=list
// ingredientes(i): https://www.themealdb.com/api/json/v1/1/list.php?i=list

// filter: filter || search || list (para retornar tudo);
// type: c == categorias || a == nacionalidades || i == ingredientes;
// search: nome da categoria de pesquisa (ex: American);

export const getMeals = async (type, search, filter = 'list') => {
  const data = await (await fetch(`https://www.themealdb.com/api/json/v1/1/${filter}.php?${type}=${search}`)).json();
  return data;
};

export const getRecomendedMeals = async () => {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  const data = await response.json();
  return data;
};

export const getDetailedMeals = async (id) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
  const data = await response.json();
  return data;
};
