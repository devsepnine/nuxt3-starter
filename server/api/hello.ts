import {useQuery} from 'h3';

export default req => (useQuery(req).lang === 'ko' ? '환영합니다' : 'Welcome');
