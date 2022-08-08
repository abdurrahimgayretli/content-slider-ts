import { Router } from 'express';


import gallery from './gallery';


const router = Router();

router.get('/', (req, res) => {
  res.end('hey');
});

router.use('/gallery', gallery);

export default router;
