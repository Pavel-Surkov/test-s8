import { useEffect, useRef, useState } from 'react';
import z from 'zod';
import Input from './components/Input';
import PostItem from './components/PostItem';
import { postsSchema } from './static/postsSchema';

// Лучше всего реализовать выбор количества подгржаемых элементов через select, но в задании написано через инпут
const INITIAL_ELEMENTS_COUNT = 10;

function App() {
  const [elementsCount, setElementsCount] = useState(INITIAL_ELEMENTS_COUNT);
  const [data, setData] = useState<z.infer<typeof postsSchema>>([]);

  const scrollContainerRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    // Initial query
    (async () => {
      await fetch(
        `http://localhost:3000/posts?_start=0&_limit=${INITIAL_ELEMENTS_COUNT}`
      )
        .then((res) => res.json())
        .then((data) => postsSchema.parse(data))
        .then((parsedData) => setData([...parsedData]))
        .catch(console.error);
    })();
  }, []);

  return (
    <main className="flex flex-col items-center p-10 min-h-[100vh]">
      <div className="flex flex-col max-w-[500px] flex-grow w-full gap-10 items-center">
        <div className="flex-shrink-0">
          <Input
            elementsCount={elementsCount}
            setElementsCount={setElementsCount}
          />
        </div>
        <ul
          ref={scrollContainerRef}
          className="border rounded-md flex-grow w-full overflow-scroll"
        >
          {data.map((post) => (
            <PostItem key={post.id} post={post} />
          ))}
        </ul>
      </div>
    </main>
  );
}

export default App;
