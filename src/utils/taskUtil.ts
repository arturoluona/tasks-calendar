import { PriorityEnum, StatusEnum, Task } from '@/models';

const tasks: Task[] = [
  {
    name: 'Test 1',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non, vitae.',
    date: '2022-12-03T19:55:27.002Z',
    id: '1',
    status: StatusEnum.Draft,
    priority: PriorityEnum.Normal,
  },
  {
    name: 'Test 2',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non, vitae.',
    date: '2022-12-03T19:55:27.002Z',
    id: '2',
    status: StatusEnum.Todo,
    priority: PriorityEnum.Low,
  },
  {
    name: 'Test 3',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non, vitae.',
    date: '2022-12-03T19:55:27.002Z',
    id: '3',
    status: StatusEnum.Progress,
    priority: PriorityEnum.High,
  },
  {
    name: 'Test 4',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non, vitae.',
    date: '2022-12-03T19:55:27.002Z',
    id: '4',
    status: StatusEnum.Completed,
    priority: PriorityEnum.HighNext,
  },
  {
    name: 'Test 5',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non, vitae.',
    date: '2022-12-03T19:55:27.002Z',
    id: '5',
    status: StatusEnum.Todo,
    priority: PriorityEnum.High,
  },
  {
    name: 'Test 6',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non, vitae.',
    date: '2022-12-03T19:55:27.002Z',
    id: '6',
    status: StatusEnum.Completed,
    priority: PriorityEnum.Low,
  },
  {
    name: 'Test 7',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non, vitae.',
    date: '2022-12-03T19:55:27.002Z',
    id: '7',
    status: StatusEnum.Draft,
    priority: PriorityEnum.HighNext,
  },
  {
    name: 'Test 8',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non, vitae.',
    date: '2022-12-03T19:55:27.002Z',
    id: '8',
    status: StatusEnum.Todo,
    priority: PriorityEnum.Low,
  },
  {
    name: 'Test 9',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non, vitae.',
    date: '2022-12-03T19:55:27.002Z',
    id: '9',
    status: StatusEnum.Todo,
    priority: PriorityEnum.High,
  },
  {
    name: 'Test 10',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non, vitae.',
    date: '2022-12-03T19:55:27.002Z',
    id: '10',
    status: StatusEnum.Todo,
    priority: PriorityEnum.Normal,
  },
];

/**
 * Parse enum to get name.
 *
 * @param enums The enum to be parsed.
 * @returns String with name of enum.
 */
function getNameByEnum(enums: PriorityEnum | StatusEnum): string {
  const name: string = enums.split('-').join(' ');
  return name[0].toUpperCase() + name.slice(1);
}

export { tasks, getNameByEnum };
