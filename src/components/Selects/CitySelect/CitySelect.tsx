import { useAppSelector } from '../../../../utils/hooks.ts';
import Select from '../Select/Select.tsx';
import styles from '../../RegisterFormStepTwo/RegisterFormStepTwo.module.css';
import { selectAllCities } from '../../../../services/slices/citiesSlice.ts';

interface CitySelectProps {
  city: string;
  setCity: (city: string) => void;
}

export const CitySelect = ({ city, setCity }: CitySelectProps) => {
  const cities = useAppSelector(selectAllCities);

  const cityOptions = [
    { value: '', label: 'Не указан' },
    ...cities.map((city) => ({
      value: city.id.toString(),
      label: city.name
    }))
  ];
  return (
    <Select
      id='cityInput'
      label='Город'
      value={city}
      onChange={(e) => setCity(e.target.value)}
      options={cityOptions}
      rightIcon={
        <img
          src='/icons/chevron-down.svg'
          alt='Стрелка вниз'
          className={styles.arrow}
        />
      }
    ></Select>
  );
};
