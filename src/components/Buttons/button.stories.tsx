import type { Meta, StoryObj } from '@storybook/react-vite';
import Button from './button';

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  tags: ['autodocs'],
  args: {
    children: 'Click me'
  }
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    type: 'primary'
  }
};

export const Secondary: Story = {
  args: {
    type: 'secondary'
  }
};

export const FullWidth: Story = {
  args: {
    fullWidth: true
  }
};
