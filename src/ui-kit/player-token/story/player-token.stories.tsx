import { ComponentMeta, ComponentStory } from '@storybook/react';
import React, { ComponentProps } from 'react';
import { PlayerToken } from '../player-token';

type Props = ComponentProps<typeof PlayerToken>;

export default {
  title: 'Common/PlayerToken',
  component: PlayerToken,
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/24EUnEHGEDNLdOcxg7ULwV/Chat?node-id=0%3A1',
    },
  },
  args: {
    imageUrl: 'https://image.shutterstock.com/image-vector/elephant-icon-260nw-574537432.jpg',
  },
} as ComponentMeta<typeof PlayerToken>;

const Template: ComponentStory<typeof PlayerToken> = (args) => <PlayerToken {...args} />;

export const Default = Template.bind({});
