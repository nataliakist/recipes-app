import Header from '../components/Header';
import Footer from '../components/Footer';
import Recipes from '../components/Recipes';

function Drinks() {
  return (
    <div>
      <Header title="Drinks" pathname="/drinks" />
      <Recipes />
      <Footer />
    </div>
  );
}

export default Drinks;
