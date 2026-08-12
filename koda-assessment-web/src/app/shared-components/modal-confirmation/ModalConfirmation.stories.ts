import { Meta, StoryObj } from '@storybook/react';
import ModalConfirmation from './ModalConfirmation';

const meta = {
  title: 'Atoms/ModalConfirmation',
  component: ModalConfirmation,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ModalConfirmation>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Confirm',
    children: 'Are you sure you want to process this?',
  },
};
