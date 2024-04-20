import Welcome from './components/Welcome';
import Hangman from './components/Hangman';
import { getRandomCategory, getRandomWord } from './components/Categories';

const App: React.FC = () => {
  const selectedCategory: string = getRandomCategory();
  const selectedWord: string = getRandomWord(selectedCategory);
  console.log(selectedCategory);
  console.log(selectedWord);
  
  return (
    <div className='App'>
      <Welcome />
      <Hangman category={selectedCategory} word={selectedWord} />
    </div>
  );
}

export default App;
