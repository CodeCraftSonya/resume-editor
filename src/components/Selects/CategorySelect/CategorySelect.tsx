import { useAppSelector } from '../../../../utils/hooks.ts';
import { selectAllSkills } from '../../../../services/slices/skillsSlice.ts';
import Select from '../Select/Select.tsx';
import styles from '../../RegisterFormStepTwo/RegisterFormStepTwo.module.css';

interface CategorySelectProps {
  category: string;
  setCategory: (category: string) => void;
}

export const CategorySelect = ({
  category,
  setCategory
}: CategorySelectProps) => {
  const skillCategories = useAppSelector(selectAllSkills);

  const skillCategoryOptions = [
    { value: '', label: 'Выберите категорию' },
    ...skillCategories.map((cat) => ({
      value: cat.id,
      label: cat.name
    }))
  ];
  return (
    <Select
      id='categoryInput'
      label='Категория навыка, которому хотите научиться'
      value={category}
      onChange={(e) => setCategory(e.target.value)}
      options={skillCategoryOptions}
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
