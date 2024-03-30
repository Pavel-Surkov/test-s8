import { ChangeEvent, useEffect, useState } from 'react';
import z from 'zod';

const postSchema = z.object({
  id: z.number(),
  title: z.string(),
  body: z.string(),
});

const postsSchema = z.array(postSchema);

const responseSchema = z.object({
  posts: postsSchema,
});

// Лучше всего реализовать выбор количества подгржаемых элементов через select, но в задании написано через инпут
const MIN_ELEMENTS_COUNT = 1;
const MAX_ELEMENTS_COUNT = 20;
const INITIAL_ELEMENTS_COUNT = 10;

function App() {
  const [elementsCount, setElementsCount] = useState(INITIAL_ELEMENTS_COUNT);
  const [data, setData] = useState<z.infer<typeof postsSchema>>([
    {
      id: 1,
      title:
        'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
      body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
    },
  ]);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    let value = +e.target.value;

    if (value < MIN_ELEMENTS_COUNT) {
      value = MIN_ELEMENTS_COUNT;
    }

    if (value > MAX_ELEMENTS_COUNT) {
      value = MAX_ELEMENTS_COUNT;
    }

    setElementsCount(value);
  }

  return (
    <main className="flex flex-col items-center p-10 min-h-[100vh]">
      <div className="flex flex-col max-w-[500px] flex-grow w-full gap-10 items-center">
        <div className="flex-shrink-0">
          <input
            type="number"
            value={elementsCount}
            onChange={handleChange}
            className="border-2 border-black rounded-lg text-lg px-2"
          />
        </div>
        <ul className="border rounded-md flex-grow w-full overflow-scroll">
          {data.map((post) => (
            <li
              key={post.id}
              className="mx-4 py-4 border-b border-red-200 last:border-none"
            >
              <h2 className="mb-2 single whitespace-nowrap overflow-hidden text-ellipsis max-w-full text-black font-bold uppercase">
                {post.title}
              </h2>
              <div>
                <p className="two-line">{post.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}

export default App;
