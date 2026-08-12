import { Meta, StoryObj } from '@storybook/react';
import Panel from './Panel';

const meta = {
  title: 'Atoms/Panel',
  component: Panel,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Panel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Some Title Here',
    children: 'Child Component here',
    color: 'primary',
  },
};
