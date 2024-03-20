import {faker} from '@faker-js/faker';

import {FieldGroup, Fields, FieldTypes, fieldTypes} from './workspaceSlice';

interface Field {
  type: FieldTypes;
  value: string;
}

export const menuItems: Field[] = [
  {
    type: 'short_text',
    value: 'Short text',
  },
  {
    type: 'long_text',
    value: 'Long text',
  },
  {
    type: 'number',
    value: 'Phone Number',
  },

  {
    type: 'yes_no',
    value: 'Yes or No',
  },
  {
    type: 'multiple_choice',
    value: 'Multiple Choice',
  },

  {
    type: 'email',
    value: 'Email',
  },
  {
    type: 'dropdown',
    value: 'Dropdown',
  },
];

export const fieldGroupBuilder = (
  options: Partial<FieldGroup> = {}
): FieldGroup => ({
  id: faker.string.numeric(4),
  title: faker.lorem.sentence({min: 5, max: 10}),
  fields: [],
  ...options,
});

export const fieldBuilder = (options: Partial<Fields> = {}): Fields => ({
  id: faker.string.numeric(4),
  title: faker.lorem.sentence({min: 5, max: 10}),
  type: faker.helpers.arrayElement(fieldTypes),
  ...options,
  properties: {
    ...options.properties,
  },
  validations: {
    ...options.validations,
  },
});

export const fields = {
  fields: [
    {
      id: 'eTrKKYl8m6Um',
      title: 'What is your favorite candy?',
      ref: '01HFD6758ZMZYVR7EEEY1VGWHT',
      properties: {
        description: 'Which do you like more?',
        randomize: false,
        allow_multiple_selection: false,
        allow_other_choice: false,
        vertical_alignment: true,
        choices: [
          {
            id: 'WJ5Bucnc4cRQ',
            ref: '01HFD6758ZBWA99YQ2BXZBAN46',
            label: 'Gummies',
          },
          {
            ref: 'f1c3aea4-b0c4-4b4f-a171-06cafd5a8591',
            label: 'Starburst',
          },
        ],
      },
      validations: {
        required: false,
      },
      type: 'multiple_choice',
      attachment: {
        type: 'image',
        href: 'https://images.typeform.com/images/WMALzu59xbXQ',
      },
      layout: {
        type: 'split',
        attachment: {
          type: 'image',
          href: 'https://images.typeform.com/images/WMALzu59xbXQ',
        },
        placement: 'right',
      },
    },
    {
      title: 'Which country is the best?',
      ref: '2fbb04b4-c5b0-4cba-9c2d-19c10023c138',
      properties: {
        description: 'Please select your favorite country',
        randomize: false,
        alphabetical_order: true,
        choices: [
          {
            ref: 'fa87a77c-51ec-43d1-937b-eae7cf5f68c9',
            label: 'America',
          },
          {
            ref: '01aff4f0-d2a7-4fba-97ed-1308adb11428',
            label: 'Mexico',
          },
          {
            ref: '9dc3fdd3-2991-48c7-a57b-8a0031c2e42b',
            label: 'Canada',
          },
          {
            ref: '2f8cd4ee-c2aa-4156-b38a-e37750ffa2ac',
            label: 'Syria',
          },
        ],
      },
      validations: {
        required: true,
      },
      type: 'dropdown',
    },
    {
      title: 'What do you like about work?',
      ref: '155f111a-845f-40da-ab1a-0842ada16adb',
      properties: {
        description: 'Tell us a bit about what you like the most about work.',
      },
      validations: {
        required: false,
      },
      type: 'short_text',
    },
    {
      title: 'What is your email?',
      ref: 'b8e6671b-e628-47ca-bca5-274eac267505',
      properties: {
        description: 'Please type your email',
      },
      validations: {
        required: false,
      },
      type: 'email',
    },
    {
      title: 'Do you drink alcohol?',
      ref: 'd68283d2-221d-4f3d-8867-22f06932b47d',
      properties: {},
      validations: {
        required: true,
      },
      type: 'yes_no',
    },
  ],
};
