import LeftSection from '../LeftSection/LeftSection.tsx';
import RightSection from '../RightSection/RightSection.tsx';
import styles from './App.module.css';

const App = () => {
  return (
    <div className={styles.appСontainer}>
      <LeftSection />
      <RightSection />
    </div>
  );
};

export default App;
