import { Meta, StoryObj } from '@storybook/react';
import CrudField from './CrudField';

const meta = {
  title: 'Atoms/CRUD/Field',
  component: CrudField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CrudField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Name',
    children: 'John',
  },
};
