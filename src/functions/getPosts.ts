import { postsSchema } from '../static/postsSchema';

export default async function getPosts(start: number, limit: number) {
  return fetch(`http://localhost:3000/posts?_start=${start}&_limit=${limit}`)
    .then((res) => res.json())
    .then((data) => postsSchema.parse(data))
    .catch(console.error);
}
