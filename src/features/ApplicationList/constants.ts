import {faker} from '@faker-js/faker';

export interface Application {
  id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
}

const buildApplication = (num: number): Application => {
  return {
    id: faker.string.uuid(),
    title: `My Application ${num}`,
    createdAt: faker.date.past(),
    updatedAt: faker.date.past(),
  };
};

export const applications = Array.from(Array(3), (_, index) =>
  buildApplication(index)
);

export const formatDate = (date: Date) => {
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const day = date.getDay() + 1;
  const month = date.getMonth();
  const year = date.getFullYear();

  return `${day} ${months[month]} ${year}`;
};
