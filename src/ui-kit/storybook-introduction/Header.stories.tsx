import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Header } from '..';

export default {
  title: 'Common/Header',
  component: Header,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
    backgrounds: {
      default: 'black',
      values: [
        { name: 'black', value: '#101010' },
      ],
    },
  },
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = (args) => <Header {...args} />;

export const Default = Template.bind({});
Default.args = {
  avatarUrl: 'https://image.shutterstock.com/image-vector/elephant-icon-260nw-574537432.jpg'
};
