import z from 'zod';
import { postSchema } from '../static/postsSchema';

type Props = {
  post: z.infer<typeof postSchema>;
};

export default function PostItem({ post }: Props) {
  return (
    <li className="mx-4 py-4 border-b border-red-200 last:border-none">
      <h2 className="mb-2 single whitespace-nowrap overflow-hidden text-ellipsis max-w-full text-black font-bold uppercase">
        {post.title}
      </h2>
      <div>
        <p className="two-line">{post.body}</p>
      </div>
    </li>
  );
}
