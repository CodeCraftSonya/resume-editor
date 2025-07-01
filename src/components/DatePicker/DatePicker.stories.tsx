import type { Meta, StoryObj } from '@storybook/react-vite';
import DatePicker from './DatePicker.tsx';

const meta: Meta<typeof DatePicker> = {
  title: 'Ui/DatePicker',
  component: DatePicker,
  tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof DatePicker>;

export const Default: Story = {
  render: () => <DatePicker />
};
