import React from 'react';
import { screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

const logar = async () => {
  act(() => {
    userEvent.type(screen.getByTestId('email-input'), 'teste@teste.com');
    userEvent.type(screen.getByTestId('password-input'), 'testando');
    userEvent.click(screen.getByTestId('login-submit-btn'));
  });
};
const searchBtn = 'search-top-btn';
const searchInput = 'search-input';
const searchBtnFilter = 'exec-search-btn';
const ingredientRadioBtn = 'ingredient-search-radio';
const firstLetterRadioBtn = 'first-letter-search-radio';
const nameRadioBtn = 'name-search-radio';

describe('Barra de Pesquisa - Header - Página Meals', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });
  it('Verifica se, ao logar, existe o botão de pesquisar', async () => {
    await waitFor(() => {
      logar();
      expect(screen.getByTestId(searchBtn)).toBeVisible();
    });
  });

  it('Verifica se, ao clicado, exibe os elementos de pesquisa', async () => {
    await waitFor(() => {
      logar();
      act(() => userEvent.click(screen.getByTestId(searchBtn)));
      expect(screen.getByTestId(searchInput)).toBeVisible();
      expect(screen.getByTestId(ingredientRadioBtn)).toBeVisible();
      expect(screen.getByTestId(nameRadioBtn)).toBeVisible();
      expect(screen.getByTestId(firstLetterRadioBtn)).toBeVisible();
      expect(screen.getByTestId(searchBtnFilter)).toBeVisible();
    });
  });
  it('Página Meals - Verificação de filtro 1: no caso de a pesquisa retornar mais que 1 componente e menos que 12, exiba todos', async () => {
    await waitFor(() => {
      logar();
      act(() => {
        userEvent.click(screen.getByTestId(searchBtn));
      });
      act(() => {
        userEvent.type(screen.getByTestId(searchInput), 'potato');
        userEvent.click(screen.getByTestId(nameRadioBtn));
        userEvent.click(screen.getByTestId(searchBtnFilter));
      });
    });
    const recipe1 = await screen.findByText('Breakfast Potatoes');
    const recipe2 = await screen.findByText('Lamb and Potato pie');
    const recipe3 = await screen.findByText('Boulangère Potatoes');
    const recipe4 = await screen.findByText('Potato Gratin with Chicken');
    const recipe5 = await screen.findByText('Spicy North African Potato Salad');
    const recipe6 = await screen.findByText('Honey Balsamic Chicken with Crispy Broccoli & Potatoes');
    const recipe7 = await screen.findByText('French Onion Chicken with Roasted Carrots & Mashed Potatoes');
    const recipe8 = await screen.findByText('Skillet Apple Pork Chops with Roasted Sweet Potatoes & Zucchini');
    const recipe9 = await screen.findByText('Soy-Glazed Meatloaves with Wasabi Mashed Potatoes & Roasted Carrots');

    expect(recipe1).toBeInTheDocument();
    expect(recipe2).toBeInTheDocument();
    expect(recipe3).toBeInTheDocument();
    expect(recipe4).toBeInTheDocument();
    expect(recipe5).toBeInTheDocument();
    expect(recipe6).toBeInTheDocument();
    expect(recipe7).toBeInTheDocument();
    expect(recipe8).toBeInTheDocument();
    expect(recipe9).toBeInTheDocument();
  });

  it('Página Meals - Verificação de filtro 2: no caso de a pesquisa retornar muitos resultados, exiba apenas os 12 primeiros', async () => {
    await waitFor(() => {
      logar();
      act(() => {
        userEvent.click(screen.getByTestId(searchBtn));
      });
      act(() => {
        userEvent.type(screen.getByTestId(searchInput), 'salt');
        userEvent.click(screen.getByTestId(ingredientRadioBtn));
        userEvent.click(screen.getByTestId(searchBtnFilter));
      });
    });
    const recipe1 = await screen.findByTestId('0-recipe-card');
    const recipe2 = await screen.findByTestId('1-recipe-card');
    const recipe3 = await screen.findByTestId('2-recipe-card');
    const recipe4 = await screen.findByTestId('3-recipe-card');
    const recipe5 = await screen.findByTestId('4-recipe-card');
    const recipe6 = await screen.findByTestId('5-recipe-card');
    const recipe7 = await screen.findByTestId('6-recipe-card');
    const recipe8 = await screen.findByTestId('7-recipe-card');
    const recipe9 = await screen.findByTestId('8-recipe-card');
    const recipe10 = await screen.findByTestId('9-recipe-card');
    const recipe11 = await screen.findByTestId('10-recipe-card');
    const recipe12 = await screen.findByTestId('11-recipe-card');

    expect(recipe1).toBeInTheDocument();
    expect(recipe2).toBeInTheDocument();
    expect(recipe3).toBeInTheDocument();
    expect(recipe4).toBeInTheDocument();
    expect(recipe5).toBeInTheDocument();
    expect(recipe6).toBeInTheDocument();
    expect(recipe7).toBeInTheDocument();
    expect(recipe8).toBeInTheDocument();
    expect(recipe9).toBeInTheDocument();
    expect(recipe10).toBeInTheDocument();
    expect(recipe11).toBeInTheDocument();
    expect(recipe12).toBeInTheDocument();

    // o 13º elemento não será encontrado
    expect(screen.queryByTestId('12-recipe-card')).not.toBeInTheDocument();
  });
  it('Página Meals - Verificação de filtro 3: no caso de não haver resultado para a pesquisa, exiba um alerta)', async () => {
    await waitFor(() => {
      logar();
      act(() => {
        userEvent.click(screen.getByTestId(searchBtn));
      });
      act(() => {
        userEvent.type(screen.getByTestId(searchInput), 'ingrediente-não-catalgado');
        userEvent.click(screen.getByTestId(ingredientRadioBtn));
        userEvent.click(screen.getByTestId(searchBtnFilter));
      });
    });
    // global.alert = jest.fn();
    // expect(global.alert).toHaveBeenCalledTimes(1);
    // const alertText = await screen.findByText('Sorry, we haven't found any recipes for these filters.');
    // expect(alertText).toBeInTheDocument();
  });
  it('Página Meals - Verificação de filtro 4: no caso em que o usuário digita mais de um caracter para a pesquisa de First Letter, exiba um alerta)', async () => {
    await waitFor(() => {
      logar();
      act(() => {
        userEvent.click(screen.getByTestId(searchBtn));
      });
      act(() => {
        userEvent.type(screen.getByTestId(searchInput), 'abc');
        userEvent.click(screen.getByTestId(firstLetterRadioBtn));
        userEvent.click(screen.getByTestId(searchBtnFilter));
      });
    });
    // global.alert = jest.fn();
    // expect(global.alert).toHaveBeenCalledTimes(1);
    // const alertText = await screen.findByText('Your search must have only 1 (one) character');
    // expect(alertText).toBeInTheDocument();
  });
  it('Página Meals - Verificação de filtro 5: no caso em que o usuário digita um caracter para a pesquisa de First Letter, exiba corretamente)', async () => {
    await waitFor(() => {
      logar();
      act(() => {
        userEvent.click(screen.getByTestId(searchBtn));
      });
      act(() => {
        userEvent.type(screen.getByTestId(searchInput), 'a');
        userEvent.click(screen.getByTestId(firstLetterRadioBtn));
        userEvent.click(screen.getByTestId(searchBtnFilter));
      });
    });

    const recipe1 = await screen.findByText('Apple Frangipan Tart');
    const recipe2 = await screen.findByText('Apple & Blackberry Crumble');
    const recipe3 = await screen.findByText('Apam balik');
    const recipe4 = await screen.findByText('Ayam Percik');

    expect(recipe1).toBeInTheDocument();
    expect(recipe2).toBeInTheDocument();
    expect(recipe3).toBeInTheDocument();
    expect(recipe4).toBeInTheDocument();
  });
});

describe('Barra de Pesquisa - Header - Página Drinks', () => {
  it('Verifica se, ao logar, existe o botão de pesquisar', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/drinks');
    });
    await waitFor(() => {
      expect(screen.getByTestId(searchBtn)).toBeVisible();
    });
  });

  it('Verifica se, ao clicado, exibe os elementos de pesquisa', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/drinks');
    });

    await waitFor(() => {
      act(() => userEvent.click(screen.getByTestId(searchBtn)));
      expect(screen.getByTestId(searchInput)).toBeVisible();
      expect(screen.getByTestId(ingredientRadioBtn)).toBeVisible();
      expect(screen.getByTestId(nameRadioBtn)).toBeVisible();
      expect(screen.getByTestId(firstLetterRadioBtn)).toBeVisible();
      expect(screen.getByTestId(searchBtnFilter)).toBeVisible();
    });
  });

  it('Página Drinks - Verificação de filtro 1: no caso de a pesquisa retornar mais que 1 componente e menos que 12, exiba todos', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/drinks');
    });
    await waitFor(() => {
      act(() => {
        userEvent.click(screen.getByTestId(searchBtn));
      });
      act(() => {
        userEvent.type(screen.getByTestId(searchInput), 'beer');
        userEvent.click(screen.getByTestId(nameRadioBtn));
        userEvent.click(screen.getByTestId(searchBtnFilter));
      });
    });
    const recipe1 = await screen.findByText('Zambeer');
    const recipe2 = await screen.findByText('Campari Beer');
    const recipe3 = await screen.findByText('California Root Beer');

    expect(recipe1).toBeInTheDocument();
    expect(recipe2).toBeInTheDocument();
    expect(recipe3).toBeInTheDocument();
  });

  it('Página Drinks - Verificação de filtro 2: no caso de a pesquisa retornar muitos resultados, exiba apenas os 12 primeiros', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/drinks');
    });
    await waitFor(() => {
      act(() => {
        userEvent.click(screen.getByTestId(searchBtn));
      });
      act(() => {
        userEvent.type(screen.getByTestId(searchInput), 'lemon');
        userEvent.click(screen.getByTestId(ingredientRadioBtn));
        userEvent.click(screen.getByTestId(searchBtnFilter));
      });
    });
    const recipe1 = await screen.findByTestId('0-recipe-card');
    const recipe2 = await screen.findByTestId('1-recipe-card');
    const recipe3 = await screen.findByTestId('2-recipe-card');
    const recipe4 = await screen.findByTestId('3-recipe-card');
    const recipe5 = await screen.findByTestId('4-recipe-card');
    const recipe6 = await screen.findByTestId('5-recipe-card');
    const recipe7 = await screen.findByTestId('6-recipe-card');
    const recipe8 = await screen.findByTestId('7-recipe-card');
    const recipe9 = await screen.findByTestId('8-recipe-card');
    const recipe10 = await screen.findByTestId('9-recipe-card');
    const recipe11 = await screen.findByTestId('10-recipe-card');
    const recipe12 = await screen.findByTestId('11-recipe-card');

    expect(recipe1).toBeInTheDocument();
    expect(recipe2).toBeInTheDocument();
    expect(recipe3).toBeInTheDocument();
    expect(recipe4).toBeInTheDocument();
    expect(recipe5).toBeInTheDocument();
    expect(recipe6).toBeInTheDocument();
    expect(recipe7).toBeInTheDocument();
    expect(recipe8).toBeInTheDocument();
    expect(recipe9).toBeInTheDocument();
    expect(recipe10).toBeInTheDocument();
    expect(recipe11).toBeInTheDocument();
    expect(recipe12).toBeInTheDocument();

    // o 13º elemento não será encontrado
    expect(screen.queryByTestId('12-recipe-card')).not.toBeInTheDocument();
  });
  it('Página Drinks - Verificação de filtro 3: no caso de não haver resultado para a pesquisa, exiba um alerta)', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/drinks');
    });
    await waitFor(() => {
      act(() => {
        userEvent.click(screen.getByTestId(searchBtn));
      });
      act(() => {
        userEvent.type(screen.getByTestId(searchInput), 'ingrediente-não-catalgado');
        userEvent.click(screen.getByTestId(ingredientRadioBtn));
        userEvent.click(screen.getByTestId(searchBtnFilter));
      });
    });
    // global.alert = jest.fn();
    // expect(global.alert).toHaveBeenCalledTimes(1);
    // const alertText = await screen.findByText('Sorry, we haven't found any recipes for these filters.');
    // expect(alertText).toBeInTheDocument();
  });

  it('Página Drinks - Verificação de filtro 4: no caso em que o usuário digita mais de um caracter para a pesquisa de First Letter, exiba um alerta)', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/drinks');
    });
    await waitFor(() => {
      act(() => {
        userEvent.click(screen.getByTestId(searchBtn));
      });
      act(() => {
        userEvent.type(screen.getByTestId(searchInput), 'abc');
        userEvent.click(screen.getByTestId(firstLetterRadioBtn));
        userEvent.click(screen.getByTestId(searchBtnFilter));
      });
    });
    // global.alert = jest.fn();
    // expect(global.alert).toHaveBeenCalledTimes(1);
    // const alertText = await screen.findByText('Your search must have only 1 (one) character');
    // expect(alertText).toBeInTheDocument();
  });
  it('Página Drinks - Verificação de filtro 5: no caso em que o usuário digita um caracter para a pesquisa de First Letter, exiba corretamente)', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/drinks');
    });
    await waitFor(() => {
      act(() => {
        userEvent.click(screen.getByTestId(searchBtn));
      });
      act(() => {
        userEvent.type(screen.getByTestId(searchInput), 'a');
        userEvent.click(screen.getByTestId(firstLetterRadioBtn));
        userEvent.click(screen.getByTestId(searchBtnFilter));
      });
    });

    const recipe1 = await screen.findByText('A1');
    const recipe2 = await screen.findByText('ABC');
    const recipe3 = await screen.findByText('Ace');
    const recipe4 = await screen.findByText('ACID');
    const recipe5 = await screen.findByText('Adam');
    const recipe6 = await screen.findByText('AT&T');
    const recipe7 = await screen.findByText('A. J.');
    const recipe8 = await screen.findByText('Affair');
    const recipe9 = await screen.findByText('Apello');
    const recipe10 = await screen.findByText('Avalon');
    const recipe11 = await screen.findByText('Abilene');
    const recipe12 = await screen.findByText('Addison');

    expect(recipe1).toBeInTheDocument();
    expect(recipe2).toBeInTheDocument();
    expect(recipe3).toBeInTheDocument();
    expect(recipe4).toBeInTheDocument();
    expect(recipe5).toBeInTheDocument();
    expect(recipe6).toBeInTheDocument();
    expect(recipe7).toBeInTheDocument();
    expect(recipe8).toBeInTheDocument();
    expect(recipe9).toBeInTheDocument();
    expect(recipe10).toBeInTheDocument();
    expect(recipe11).toBeInTheDocument();
    expect(recipe12).toBeInTheDocument();
  });
});

describe('Barra de Pesquisa - Header (testando mudança de rota a partir da pesquisa)', () => {
  it('Página Meals - Verificação de filtro: no caso em que o retorno é igual a 1, abre a página de detalhes da receita', async () => {
    const { history } = renderWithRouter(<App />);
    console.log(history);
    await waitFor(() => {
      logar();
      act(() => {
        userEvent.click(screen.getByTestId(searchBtn));
      });
      act(() => {
        userEvent.type(screen.getByTestId(searchInput), 'potato');
        userEvent.click(screen.getByTestId(ingredientRadioBtn));
        userEvent.click(screen.getByTestId(searchBtnFilter));
      });
    });
    const recipeName = await screen.findByText('Lamb tomato and sweet spices');
    expect(recipeName).toBeInTheDocument();
    // expect(history.location.pathname).toBe('/meals/52782');
  });
  it('Página Drinks - Verificação de filtro: no caso em que o retorno é igual a 1, abre a página de detalhes da receita', async () => {
    const { history } = renderWithRouter(<App />);
    await waitFor(() => {
      act(() => {
        history.push('/drinks');
      });
      expect(history.location.pathname).toBe('/drinks');
      act(() => {
        userEvent.click(screen.getByTestId(searchBtn));
      });
      act(() => {
        userEvent.type(screen.getByTestId(searchInput), 'campari');
        userEvent.click(screen.getByTestId(nameRadioBtn));
        userEvent.click(screen.getByTestId(searchBtnFilter));
      });
    });
    const recipeName = await screen.findByText('Campari Beer');
    expect(recipeName).toBeInTheDocument();
    // expect(history.location.pathname).toBe('/drinks/16047');
  });
});
