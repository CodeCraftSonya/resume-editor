import { useAppSelector } from '../../../../utils/hooks.ts';
import { selectAllSkills } from '../../../../services/slices/skillsSlice.ts';
import Select from '../Select/Select.tsx';
import styles from '../../RegisterFormStepTwo/RegisterFormStepTwo.module.css';

interface SubCategorySelectProps {
  subcategory: string;
  setSubcategory: (value: string) => void;
  category: string;
}

export const SubCategorySelect = ({
  subcategory,
  setSubcategory,
  category
}: SubCategorySelectProps) => {
  const skillCategories = useAppSelector(selectAllSkills);

  const selectedCategory = skillCategories.find((cat) => cat.id === category);

  const subcategoryOptions = selectedCategory
    ? [
        { value: '', label: 'Выберите подкатегорию' },
        ...selectedCategory.skills.map((skill) => ({
          value: skill.id,
          label: skill.name
        }))
      ]
    : [{ value: '', label: 'Сначала выберите категорию' }];
  return (
    <Select
      id='subcategoryInput'
      label='Подкатегория навыка, которому хотите научиться'
      value={subcategory}
      onChange={(e) => setSubcategory(e.target.value)}
      options={subcategoryOptions}
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
