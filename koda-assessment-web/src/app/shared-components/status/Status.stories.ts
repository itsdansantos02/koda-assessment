import { Meta, StoryObj } from '@storybook/react';
import Status from './Status';

const meta = {
  title: 'Atoms/Status',
  component: Status,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Status>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Acknowledged',
    variant: 'text',
  },
};
