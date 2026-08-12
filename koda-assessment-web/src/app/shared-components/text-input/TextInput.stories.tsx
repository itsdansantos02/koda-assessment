import { Meta, StoryObj } from '@storybook/react';
import TextInput from './TextInput';

const meta = {
  title: 'Atoms/TextInput',
  component: TextInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof TextInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Text :',
    placeholder: 'Enter input...',
    type: 'text',
  },
};
