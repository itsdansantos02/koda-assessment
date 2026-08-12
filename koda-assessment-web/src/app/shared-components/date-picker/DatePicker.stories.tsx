import { Meta, StoryObj } from '@storybook/react';
import DatePicker from './DatePicker';

const meta = {
  title: 'Atoms/DatePicker',
  component: DatePicker,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Date :',
  },
};
