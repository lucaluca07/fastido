import Tasks from '@/pages/tasks';
import NotFound from '@/pages/404';

export default [
  { path: '/', component: Tasks },
  { path: '/calendar', component: Tasks },
  { path: '*', component: NotFound },
];
