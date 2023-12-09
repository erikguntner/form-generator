import {faker} from '@faker-js/faker';

const buildApplication = (num: number) => {
  return {
    id: faker.string.numeric(),
    name: `My Application ${num}`,
    created_at: faker.date.past().toString(),
    updated_at: faker.date.past().toString(),
  };
};

export const applications = Array.from(Array(3), (_, index) =>
  buildApplication(index)
);

export const formatDate = (date: string) => {
  const dateObj = new Date(date);

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

  const day = dateObj.getDay() + 1;
  const month = dateObj.getMonth();
  const year = dateObj.getFullYear();

  return `${day} ${months[month]} ${year}`;
};
