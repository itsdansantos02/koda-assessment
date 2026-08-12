import { Meta, StoryObj } from '@storybook/react';
import SelectInput from './SelectInput';

const meta = {
  title: 'Atoms/SelectInput',
  component: SelectInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SelectInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: 'type-select',
    name: 'type',
    label: 'Type',
    placeholder: 'Select Type ',
    options: ['One', 'Two', 'Three'],
    optionLabel: 'label',
    optionValue: 'value',
  },
};
