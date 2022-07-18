import { ComponentMeta, ComponentStory } from '@storybook/react';
import React, { ComponentProps } from 'react';
import { withDesign } from 'storybook-addon-designs';
import { ImageCard } from '../image-card';
/* eslint-disable @typescript-eslint/no-unused-vars */
type Props = ComponentProps<typeof ImageCard>;

export default {
  title: 'Common/ImageCard',
  component: ImageCard,
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/24EUnEHGEDNLdOcxg7ULwV/Chat?node-id=0%3A1',
    },
  },
  decorators: [
    withDesign,
    (Story) => (
      <div style={{ width: '300px', height: '450px' }}>
        <Story />
      </div>
    ),
  ],
  args: {
    imageUrl: 'https://papik.pro/uploads/posts/2021-09/1631229101_2-papik-pro-p-imadzhinarium-illyustratsii-2.jpg',
  },
} as ComponentMeta<typeof ImageCard>;

const Template: ComponentStory<typeof ImageCard> = (args) => <ImageCard {...args} />;

export const Default = Template.bind({});

export const WithCaption = Template.bind({});
WithCaption.args = { caption: 'Ваша карта' };

export const WithLabel = Template.bind({});
WithLabel.args = {
  labelUrl: 'https://image.shutterstock.com/image-vector/elephant-icon-260nw-574537432.jpg',
  caption: 'Дмитрий',
};
