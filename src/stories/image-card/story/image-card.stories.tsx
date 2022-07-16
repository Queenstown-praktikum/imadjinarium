import { ComponentMeta, ComponentStory } from '@storybook/react';
import React, { ComponentProps } from 'react';
import { ImageCard } from '../image-card';

type Props = ComponentProps<typeof ImageCard>;

export default {
  title: 'Example/ImageCard',
  component: ImageCard,
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/24EUnEHGEDNLdOcxg7ULwV/Chat?node-id=0%3A1',
    },
  },
} as ComponentMeta<typeof ImageCard>;

const Template: ComponentStory<typeof ImageCard> = (args) => <ImageCard {...args} />;

export const Variant1 = Template.bind({});
Variant1.args = {
  caption: 'Вариант 1',
};

export const Variant2 = Template.bind({});
Variant2.args = { caption: 'Вариант 2' };
